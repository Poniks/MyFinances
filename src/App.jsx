import { useState } from "react";
import Header from "./components/dashboard/Header";
import StatsWidget from "./components/dashboard/StatsWidget";
import { Briefcase, ShoppingCart, Coffee, Car } from "lucide-react";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  TrendingUp,
} from "lucide-react";

function App() {
  const transactionsData = [
    { id: 1, title: "Płaca", amount: 12000, icon: Briefcase },
    { id: 2, title: "Zakupy", amount: -250.5, icon: ShoppingCart },
    { id: 3, title: "Kawa", amount: -18.0, icon: Coffee },
    { id: 4, title: "Paliwo", amount: -300.0, icon: Car },
  ];

  return (
    <div className="container">
      {/* GÓRA: Stały nagłówek z powitaniem i saldem */}
      <Header />
      {/* ŚRODEK: Przewijana treść */}
      <StatsWidget data={transactionsData} />
      {/* DÓŁ: Stała nawigacja */}
      <footer className="app-footer">
        <nav className="bottom-nav">
          <button className="nav-item active">Przegląd</button>
          <button className="nav-item">+</button>
          <button className="nav-item">Statystyki</button>
        </nav>
      </footer>
    </div>
  );
}

export default App;
