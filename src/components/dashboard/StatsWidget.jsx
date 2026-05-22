const StatsWidget = ({ data }) => {
  return (
    <main className="content-area">
      <section className="stats-section">
        <h3>Przychody vs Wydatki</h3>
        {/* wykres "Przychody vs Wydatki" */}
      </section>

      <section className="transactions-section">
        <h3>Ostatnie Transakcje</h3>
        {data.map((t) => (
          <div key={t.id} className="transaction-item">
            <div className="icon-wrapper">
              <t.icon size={20} />
            </div>
            <div className="details">
              <span className="title">{t.title}</span>
            </div>
            <div className={`amount ${t.amount > 0 ? "positive" : "negative"}`}>
              {t.amount.toLocaleString("pl-PL")} PLN
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default StatsWidget;
