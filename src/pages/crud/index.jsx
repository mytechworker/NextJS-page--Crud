import Sidebar from "../../components/Sidebar";
import styles from "../../styles/Crud.module.scss";

const Crud = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>
        <h2>Please select an option from the sidebar</h2>
      </main>
    </div>
  );
};

export default Crud;
