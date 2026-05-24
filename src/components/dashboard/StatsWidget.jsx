import styles from "./StatsWidget.module.scss";

const StatsWidget = ({ data }) => {
  return (
    <main className={styles.content_area}>
      <section className={styles.stats_section}>
        <h3>Przychody vs Wydatki</h3>
        {/* wykres "Przychody vs Wydatki" */}
      </section>

      <section className={styles.transactions_section}>
        <h3>Ostatnie Transakcje</h3>
        {data.map((t) => (
          <div key={t.id} className={styles.transaction_item}>
            <div className={styles.icon_wrapper}>
              <t.icon size={20} />
            </div>
            <div className={styles.details}>
              <span className={styles.title}>{t.title}</span>
            </div>
            <div
              className={`${styles.amount} ${t.amount > 0 ? styles.positive : styles.negative}`}
            >
              {t.amount > 0
                ? `+${t.amount.toLocaleString("pl-PL")}`
                : t.amount.toLocaleString("pl-PL")}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default StatsWidget;
