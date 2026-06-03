import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.scss";
import Dashboard from "./components/dashboard/Dashboard";
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
    <Router>
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<Dashboard data={transactionsData} />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
