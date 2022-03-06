
import styles from './pagination.module.css';

export default function PaginationControls({goToPreviousPage, goToNextPage, currentPage, totalPages}) {
    let hasNoPreviousPage = currentPage === 1;
    let hasNoNextPage = currentPage === totalPages;

    return (
        <div className={styles.pagination_btns}>
            <button className={`${styles.pagination_button} ${hasNoPreviousPage ? styles.disabled : ''}`} onClick={() => goToPreviousPage()} disabled={hasNoPreviousPage}>Previous</button>
            <div className={styles.pagination_info}><span>{currentPage}</span> / <span>{totalPages}</span></div>
            <button className={`${styles.pagination_button} ${hasNoNextPage ? styles.disabled : ''}`} onClick={() => goToNextPage()} disabled={hasNoNextPage}>Next</button>
        </div>
    )
}