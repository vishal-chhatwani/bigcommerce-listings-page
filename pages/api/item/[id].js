import Cors from 'cors'
import initMiddleware from '../../../lib/init-middleware'

   

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'HEAD', 'OPTIONS'],
  })
);


export default async function handler(req, res) {
  // Run cors
  await cors(req, res);

  const {id} = req.query
  let item = await fetch(`https://www.bigcommerce.com/actions/bcCore/interview/getShowcaseEntryById?id=${id}`);
  item = await item.json();
  console.log('api route response: ', item);
  res.status(200).json(item);
}