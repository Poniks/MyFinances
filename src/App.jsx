import { useState } from "react";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  TrendingUp,
} from "lucide-react";

function App() {
  return (
    /* Główny kontener "telefonu" */
    <div className="container">
      {/* 1. GÓRA: Stały nagłówek z powitaniem i saldem */}
      <header className="app-header">
        <div className="user-profile">
          <h2>Witaj, Jakub!</h2>
          <div className="avatar">TO DO</div>
        </div>
        <div className="balance-display">
          <p>Ogólne Saldo</p>
          <h1>23 450,00 PLN</h1>
        </div>
      </header>

      {/* 2. ŚRODEK: Przewijana treść (scrollable) */}
      <main className="content-area">
        <section className="stats-section">
          <h3>Przychody vs Wydatki</h3>
          {/* Tu wejdzie Twój wykres "Przychody vs Wydatki" */}
        </section>

        <section className="transactions-section">
          <h3>Ostatnie Transakcje</h3>
          <div className="transaction-item">
            {/* 1. Lewa strona: Ikona w małym kwadracie */}
            <div className="icon-wrapper">X</div>
            <div className="details">
              <span className="title">Płaca</span>
            </div>
            <div className="amount">12 000,00</div>
          </div>
        </section>
      </main>

      {/* 3. DÓŁ: Stała nawigacja */}
      <footer className="app-footer">
        <nav className="bottom-nav">
          <button className="nav-item active">Przegląd</button>
          <button className="nav-item">+</button> {/* Przycisk akcji */}
          <button className="nav-item">Statystyki</button>
        </nav>
      </footer>
    </div>
  );
}

export default App;
