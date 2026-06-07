import { useState } from "react";
import {
  ShoppingCart,
  Utensils,
  Car,
  Home,
  GraduationCap,
  PartyPopper,
  Heart,
  Banknote,
  Briefcase,
  ChevronDown,
} from "lucide-react";
import styles from "./Statistics.module.scss";

const Statistics = ({ transactions = [] }) => {
  const [timeframe, setTimeframe] = useState("month"); // 'week' | 'month' | 'year'

  // Słownik ikon i kolorów dla kategorii
  const categoryConfig = {
    zakupy: {
      label: "Zakupy",
      icon: <ShoppingCart size={20} />,
      color: "#9ca3af",
    }, // Szary
    jedzenie: {
      label: "Jedzenie",
      icon: <Utensils size={20} />,
      color: "#3b82f6",
    }, // Niebieski
    transport: {
      label: "Transport",
      icon: <Car size={20} />,
      color: "#6b7280",
    }, // Ciemny szary
    dom: { label: "Dom", icon: <Home size={20} />, color: "#ef4444" }, // Czerwony
    edukacja: {
      label: "Edukacja",
      icon: <GraduationCap size={20} />,
      color: "#d1d5db",
    }, // Jasnoszary
    rozrywka: {
      label: "Rozrywka",
      icon: <PartyPopper size={20} />,
      color: "#a3a3a3",
    },
    zdrowie: { label: "Zdrowie", icon: <Heart size={20} />, color: "#e5e5e5" },
    wyplata: {
      label: "Wypłata",
      icon: <Briefcase size={20} />,
      color: "#10b981",
    },
  };

  // Logika filtrowania transakcji po wybranym czasie (Zakładamy format daty: YYYY-MM-DD)
  const filteredTransactions = transactions.filter((tx) => {
    if (tx.type !== "expense") return false;
    const txDate = new Date(tx.date);
    const now = new Date();

    if (timeframe === "week") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      return txDate >= oneWeekAgo;
    }
    if (timeframe === "month") {
      return (
        txDate.getMonth() === now.getMonth() &&
        txDate.getFullYear() === now.getFullYear()
      );
    }
    if (timeframe === "year") {
      return txDate.getFullYear() === now.getFullYear();
    }
    return true;
  });

  //  Sumowanie wydatków dla każdej kategorii
  const categoryTotals = filteredTransactions.reduce((acc, tx) => {
    const cat = tx.category || "inne";
    acc[cat] = (acc[cat] || 0) + Number(tx.amount);
    return acc;
  }, {});

  // Zamiana zgrupowanych danych na tablicę i obliczenie całkowitej sumy wydatków
  const totalExpenses = Object.values(categoryTotals).reduce(
    (sum, val) => sum + val,
    0,
  );

  const statsData = Object.entries(categoryTotals)
    .map(([key, value]) => {
      const config = categoryConfig[key] || {
        label: "Inne",
        icon: <Banknote size={20} />,
        color: "#cbd5e1",
      };
      return {
        id: key,
        label: config.label,
        icon: config.icon,
        color: config.color,
        amount: value,
        percentage:
          totalExpenses > 0 ? Math.round((value / totalExpenses) * 100) : 0,
      };
    })
    .sort((a, b) => b.amount - a.amount); // Sortowanie od największych wydatków

  // Logika generowania wykresu Donut (SVG)
  let accumulatedPercentage = 0;
  const donutSlices = statsData.map((slice) => {
    const startPercent = accumulatedPercentage;
    accumulatedPercentage += slice.percentage;

    // Obliczanie współrzędnych dla SVG stroke-dasharray/stroke-dashoffset
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = `${(slice.percentage * circumference) / 100} ${circumference}`;
    const strokeDashoffset = `${-(startPercent * circumference) / 100}`;

    return {
      ...slice,
      dashArray: strokeDasharray,
      dashOffset: strokeDashoffset,
      radius,
    };
  });

  // Formatowanie waluty na styl polski
  const formatCurrency = (value) => {
    return value.toLocaleString("pl-PL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className={styles.statistics_container}>
      {/* NAGŁÓWEK Z WYBOREM CZASU */}
      <header className={styles.stats_header}>
        <h2>Analiza Finansowa</h2>
        <div className={styles.select_wrapper}>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="week">Ostatni tydzień</option>
            <option value="month">Ten miesiąc</option>
            <option value="year">Ten rok</option>
          </select>
          <ChevronDown size={16} className={styles.select_icon} />
        </div>
      </header>

      {/* SEKCJA WYKRESU */}
      <section className={styles.chart_section}>
        <h3>Gdzie wydajesz? (Wydatki)</h3>

        <div className={styles.chart_layout}>
          {/* Wykres Donut wykonany w czystym SVG */}
          <div className={styles.donut_chart}>
            <svg viewBox="0 0 120 120" className={styles.svg_container}>
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="transparent"
                stroke="#f1f4f9"
                strokeWidth="14"
              />
              {totalExpenses > 0 ? (
                donutSlices.map((slice, index) => (
                  <circle
                    key={slice.id}
                    cx="60"
                    cy="60"
                    r={slice.radius}
                    fill="transparent"
                    stroke={slice.color}
                    strokeWidth="14"
                    strokeDasharray={slice.dashArray}
                    strokeDashoffset={slice.dashOffset}
                    transform="rotate(-90 60 60)" // Obrót, aby wykres zaczynał się od góry
                  />
                ))
              ) : (
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="transparent"
                  stroke="#cbd5e1"
                  strokeWidth="14"
                />
              )}
            </svg>
            <div className={styles.donut_center}>
              <span className={styles.center_label}>Suma</span>
              <span className={styles.center_value}>
                -{formatCurrency(totalExpenses)}
              </span>
            </div>
          </div>

          {/* LEGENDA PROCENTOWA OBOK WYKRESU */}
          <div className={styles.chart_legend}>
            {statsData.slice(0, 5).map((item) => (
              <div key={item.id} className={styles.legend_item}>
                <span
                  className={styles.color_dot}
                  style={{ backgroundColor: item.color }}
                />
                <span className={styles.legend_label}>{item.label}</span>
                <span className={styles.legend_percent}>
                  {item.percentage}%
                </span>
              </div>
            ))}
            {statsData.length === 0 && (
              <p className={styles.no_data}>Brak wydatków</p>
            )}
          </div>
        </div>
      </section>

      {/* PODSUMOWANIE KATEGORII */}
      <section className={styles.categories_section}>
        <h3>Podsumowanie Kategorii</h3>
        <div className={styles.categories_list}>
          {statsData.map((item) => (
            <div key={item.id} className={styles.category_card}>
              <div className={styles.category_info}>
                <div className={styles.icon_box}>{item.icon}</div>
                <span className={styles.category_name}>{item.label}</span>
              </div>
              <span className={styles.category_amount}>
                -{formatCurrency(item.amount)} PLN
              </span>
            </div>
          ))}
          {statsData.length === 0 && (
            <div className={styles.empty_state}>
              W tym okresie nie dodano żadnych wydatków.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Statistics;
