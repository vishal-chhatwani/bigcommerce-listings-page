import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json())

import { useEffect, useState } from "react";

import styles from './listings.module.css';

import ListItem from "./ListItem";

export default function Listings({pageIndex}) {
    
    const { data, error } = useSWR(`/api/listings?page=${pageIndex}`, fetcher)
    
    if (error) {
        console.error('Failed to load: ', error);
        return <div>Failed to load</div>
    }

    if (!data) return (
        <div className={styles.listings_ctn}>
            <div className={styles.loader}/>
        </div>
        )

    if(data.error) return null;
    
    return(
    <div className={styles.listings_ctn}>
        {data.map(item => item.error ? null : <ListItem key={item.id} {...item}/>)}
    </div>
    )
}