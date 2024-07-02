import React from "react";
import styles from "../styles/Pagination.module.scss";

interface PaginationProps {
  authorsPerPage: number;
  totalAuthors: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  authorsPerPage,
  totalAuthors,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalAuthors / authorsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.pagination}>
      <ul>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={currentPage === number ? styles.active : ""}
            onClick={() => paginate(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
