import Cors from 'cors'

import initMiddleware from '../../lib/init-middleware'

import { LISTINGS_PAGE_SIZE } from '../../constants/listings';

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET and OPTIONS
        methods: ['GET', 'HEAD', 'OPTIONS'],
    })
);

let listingsCache = [];

export default async function handler(req, res) {
    // Run cors
    await cors(req, res);

    if (listingsCache.length === 0) {
        const listings = await fetch("https://www.bigcommerce.com/actions/bcCore/interview/getShowcaseEntryIds");
        listingsCache = await listings.json();
    }

    const { page } = req.query;
    const paginatedItems = listingsCache.slice(page * LISTINGS_PAGE_SIZE, (page * LISTINGS_PAGE_SIZE) + LISTINGS_PAGE_SIZE);

    const requests = paginatedItems.map(id => fetch(`https://www.bigcommerce.com/actions/bcCore/interview/getShowcaseEntryById?id=${id}`));;
    let responses = await Promise.all(requests);
    const errors = responses.filter((response) => !response.ok);

    if (errors.length > 0) {
        errors.forEach((response) => console.error('Error occured for request: ', response.url, ' Error Message: ', response.statusText));
        responses = responses.filter((response) => response.ok);
    }

    const json = responses.map((response) => response.json());

    const data = await Promise.all(json);
    res.status(200).json(data);
    
}