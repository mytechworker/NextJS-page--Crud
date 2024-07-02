import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/Sidebar.module.scss";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/crud/table") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [router.pathname]);

  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.sidebar}>
      <h2 onClick={toggleSubMenu} className={styles.mainCategory}>
        CRUD &#8595;
      </h2>
      {isOpen && (
        <ul className={styles.subMenu}>
          <li>
            <Link href="/crud/table">
              <div className={styles.subCategory}>Table</div>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
