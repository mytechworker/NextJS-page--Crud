import Link from "next/link";
import styles from "../styles/Home.module.scss";

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to the CRUD Application</h1>
      <Link href="/crud/">
        <div className={styles.link}>Go to CRUD Table</div>
      </Link>
    </div>
  );
};

export default Home;
