import styles from "./Header.module.scss";

const Header = ({ transactions = [] }) => {
  const totalBalance = transactions.reduce((balance, transaction) => {
    if (transaction.type === "income") {
      return balance + Number(transaction.amount);
    } else if (transaction.type === "expense") {
      return balance - Number(transaction.amount);
    }
    return balance;
  }, 0);

  const formattedBalance = totalBalance.toLocaleString("pl-PL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <header className={styles.app_header}>
      <div className={styles.user_profile}>
        <h2>Witaj!</h2>
      </div>
      <div className="balance-display">
        <p>Ogólne Saldo</p>
        <h1>{formattedBalance} PLN</h1>
      </div>
    </header>
  );
};

export default Header;
