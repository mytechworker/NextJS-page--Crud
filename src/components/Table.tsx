import { useState } from "react";
import styles from "../styles/Table.module.scss";
import BookTable from "./BookTable";
import AuthorTable from "./AuthorTable";

const Table = () => {
  const [activeTab, setActiveTab] = useState<"Book" | "Author">("Book");

  return (
    <div className={styles.container}>
      <div className={styles.pills}>
        <button
          className={activeTab === "Book" ? styles.tabBtnActive : styles.tabBtn}
          onClick={() => setActiveTab("Book")}
        >
          Book
        </button>
        <button
          className={
            activeTab === "Author" ? styles.tabBtnActive : styles.tabBtn
          }
          onClick={() => setActiveTab("Author")}
        >
          Author
        </button>
      </div>
      <div className={styles.tableContainer}>
        {activeTab === "Book" && <BookTable />}
        {activeTab === "Author" && <AuthorTable />}
      </div>
    </div>
  );
};

export default Table;
