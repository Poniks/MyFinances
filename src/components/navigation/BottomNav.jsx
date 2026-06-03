import styles from "./BottomNav.module.scss";
import { LayoutDashboard, Plus, TrendingUp } from "lucide-react";

const BottomNav = () => {
  return (
    <footer className={styles.app_footer}>
      <nav className={styles.bottom_nav}>
        <button className={`${styles.nav_item} ${styles.active}`}>
          <LayoutDashboard size={24} />
          <span>Przegląd</span>
        </button>

        <button className={styles.plus_button}>
          <Plus size={32} />
        </button>

        <button className={styles.nav_item}>
          <TrendingUp size={24} />
          <span>Stats</span>
        </button>
      </nav>
    </footer>
  );
};

export default BottomNav;
