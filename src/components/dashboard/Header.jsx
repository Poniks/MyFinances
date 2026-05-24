import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.app_header}>
      <div className={styles.user_profile}>
        <h2>Witaj, Jakub!</h2>
      </div>
      <div className="balance-display">
        <p>Ogólne Saldo</p>
        <h1>28 450,00 PLN</h1>
      </div>
    </header>
  );
};

export default Header;
