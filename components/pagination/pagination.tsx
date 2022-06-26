import { memo } from "react";
import styles from "./pagination.module.scss";

interface Props {
  pages: number;
  currentPage: number;
  setPage: (page: number) => void;
}

const Pagination = memo(({ pages, currentPage, setPage }: Props) => {
  return (
    <section className={styles.pagination}>
      {Array.from(Array(pages).keys()).map((page, key) => (
        <button
          key={key}
          onClick={() => page !== currentPage && setPage(page)}
          className={`${styles.pagination__button} ${
            page === currentPage ? styles.pagination__button__active : ""
          }`}
        >
          {page + 1}
        </button>
      ))}
    </section>
  );
});

Pagination.displayName = "Pagination";

export default Pagination;
