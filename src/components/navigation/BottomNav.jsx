import styles from "./BottomNav.module.scss";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Plus, TrendingUp } from "lucide-react";

const BottomNav = () => {
  return (
    <footer className={styles.app_footer}>
      <nav className={styles.bottom_nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${styles.nav_item} ${isActive ? styles.active : ""}`
          }
        >
          <LayoutDashboard size={24} />
          <span>Przegląd</span>
        </NavLink>

        <NavLink
          to="/add_transaction"
          className={({ isActive }) =>
            `${styles.plus_button} ${isActive ? styles.active : ""}`
          }
        >
          <Plus size={32} />
        </NavLink>

        <NavLink
          to="/statistics"
          className={({ isActive }) =>
            `${styles.nav_item} ${isActive ? styles.active : ""}`
          }
        >
          <TrendingUp size={24} />
          <span>Stats</span>
        </NavLink>
      </nav>
    </footer>
  );
};

export default BottomNav;
