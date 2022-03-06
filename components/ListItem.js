import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json())

import Image from 'next/image';
import { useEffect } from 'react';
import styles from './listings.module.css';


export default function ListItem ({title, image, url, description}) {
    const imageSrc = image?.url || "";

    return(
            <div className={styles.list_item}>
            <div className={styles.image_ctn}>
            <Image src={imageSrc} width="1024" height="768" alt={image.title} />
            </div>
            <div className={styles.title}>
            <a href={url?.value || ""} target="_blank" rel="noreferrer" type="custom">{title}</a></div>
        </div>
 
    )
};
