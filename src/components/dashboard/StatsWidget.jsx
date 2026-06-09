import styles from "./StatsWidget.module.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Trash2 } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const StatsWidget = ({ data, onDelete }) => {
  const chartDataComputed = Array.from({ length: 3 }).map((_, i) => {
    const d = new Date();
    d.setDate(1); // Ustawianie dnia od 1st
    d.setMonth(d.getMonth() - (2 - i)); // Pobiera 2 miesiace wstecz
    const monthIndex = d.getMonth();
    const year = d.getFullYear(); // Pobieramy też rok dla pewności
    const monthLabel = d.toLocaleString("pl-PL", { month: "long" }); // Pelna nazwa miesiaca

    const monthTransactions = data.filter((t) => {
      const transDate = new Date(t.date);
      return (
        transDate.getMonth() === monthIndex && transDate.getFullYear() === year
      );
    });

    const income = monthTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = monthTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return { label: monthLabel, income, expense };
  });

  const chartData = {
    labels: chartDataComputed.map((m) => m.label),
    datasets: [
      {
        label: "Przychody",
        data: chartDataComputed.map((m) => m.income),
        backgroundColor: "#3b82f6",
        borderRadius: 6,
      },
      {
        label: "Wydatki",
        data: chartDataComputed.map((m) => m.expense),
        backgroundColor: "#ef4444",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Pozwala nam kontrolować wysokość przez CSS
    plugins: {
      legend: { display: false }, // legenda
    },
    scales: {
      y: { display: true }, // oś Y
      x: {
        grid: { display: false }, // Ukrywamy siatkę w tle
        border: { display: false },
      },
    },
  };

  return (
    <main className={styles.content_area}>
      <section className={styles.stats_section}>
        <h3>Przychody vs. Wydatki</h3>
        <div style={{ height: "150px" }}>
          <Bar data={chartData} options={options} />
        </div>
      </section>

      <section className={styles.transactions_section}>
        <h3>Ostatnie Transakcje</h3>
        {data.map((t) => {
          const typeClasses = {
            income: styles.positive,
            expense: styles.negative,
            investment: styles.neutral,
          };

          let prefix = "";
          if (t.type === "income") prefix = "+";
          if (t.type === "expense") prefix = "-";

          return (
            <div key={t.id} className={styles.transaction_item}>
              <div className={styles.icon_wrapper}>
                <t.icon size={20} />
              </div>

              <div className={styles.details}>
                <span className={styles.title}>{t.title}</span>
              </div>

              <div className={styles.action_group}>
                <div
                  className={`${styles.amount} ${typeClasses[t.type] || ""}`}
                >
                  {prefix}
                  {t.amount.toLocaleString("pl-PL", {
                    minimumFractionDigits: 2,
                  })}
                </div>

                <button
                  onClick={() => onDelete(t.id)}
                  className={styles.delete_btn}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default StatsWidget;
