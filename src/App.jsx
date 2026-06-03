import { useState } from "react";
import styles from "./App.module.scss";
import Header from "./components/dashboard/Header";
import StatsWidget from "./components/dashboard/StatsWidget";
import BottomNav from "./components/navigation/BottomNav";
import { Briefcase, ShoppingCart, Coffee, Car } from "lucide-react";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  TrendingUp,
} from "lucide-react";

const transactionsData = [
  {
    id: 1,
    title: "Płaca",
    amount: 600,
    icon: Briefcase,
    type: "income",
    date: "2026-04-10",
  },
  {
    id: 2,
    title: "Zakupy",
    amount: 250.5,
    icon: ShoppingCart,
    type: "expense",
    date: "2026-06-10",
  },
  {
    id: 3,
    title: "Kawa",
    amount: 18.0,
    icon: Coffee,
    type: "expense",
    date: "2026-05-15",
  },
  {
    id: 4,
    title: "Paliwo",
    amount: 300.0,
    icon: Car,
    type: "expense",
    date: "2026-04-15",
  },
  {
    id: 5,
    title: "XTB",
    amount: 500.0,
    icon: TrendingUp,
    type: "investment",
    date: "2026-04-20",
  },
];

function App() {
  return (
    <div className={styles.container}>
      {/* GÓRA: Stały nagłówek z powitaniem i saldem */}
      <Header />
      {/* ŚRODEK: Przewijana treść */}
      <StatsWidget data={transactionsData} />
      {/* DÓŁ: Stała nawigacja */}
      <BottomNav />
    </div>
  );
}

export default App;
