import { useEffect, useState } from 'react';

import ListItem from '../components/ListItem'
import Header from "../components/Header.js";
import Listings from '../components/Listings';
import PaginationControls from "../components/PaginationControls.js";

import styles from '../components/layout.module.css';

import { LISTINGS_PAGE_SIZE } from '../constants/listings';


export async function getServerSideProps(context) {
  const res = await fetch("https://www.bigcommerce.com/actions/bcCore/interview/getShowcaseEntryIds");
  const listingsIdx = await res.json();

  return {
    props: {listings: listingsIdx}
  }
}

export default function Home({listings = []}) {
  const [pageIndex, setPageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(pageIndex + 1);
  const [totalPages, setTotalPages] = useState(listings.length / LISTINGS_PAGE_SIZE);

  console.log('totalPages: ', totalPages);

  useEffect(() => {
    setCurrentPage(pageIndex + 1);
  }, [pageIndex]);

  const goToPreviousPage = () => setPageIndex(pageIndex - 1);

  const goToNextPage = () => setPageIndex(pageIndex + 1);


  return (
    <div className="app_container">
      <Header />
      <Listings pageIndex={pageIndex}/>
      <PaginationControls goToNextPage={goToNextPage} goToPreviousPage={goToPreviousPage} currentPage={currentPage} totalPages={totalPages}/>
    </div>
  )
}
