import Sidebar from "../../components/Sidebar";
import Table from "../../components/Table";
import styles from "../../styles/CrudTable.module.scss";

const TablePage = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>
        <Table />
      </main>
    </div>
  );
};

export default TablePage;
