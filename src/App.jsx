import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.scss";
import Dashboard from "./components/dashboard/Dashboard";
import Statistics from "./components/statistics/Statistics";
import New_Transaction from "./components/new_transaction/New_Transaction";
import BottomNav from "./components/navigation/BottomNav";
import {
  Briefcase,
  ShoppingCart,
  Utensils,
  Car,
  Home,
  PartyPopper,
  Heart,
  Banknote,
} from "lucide-react";

const iconMap = {
  wyplata: Briefcase,
  zakupy: ShoppingCart,
  jedzenie: Utensils,
  transport: Car,
  dom: Home,
  rozrywka: PartyPopper,
  zdrowie: Heart,
};

function App() {
  const [transactions, setTransactions] = useState([]);

  // 1. POBIERANIE TRANSAKCJI Z BAZY (GET)
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/transactions");
        const dbData = await response.json();

        // Mapujemy dane z bazy, doklejając do każdego wiersza odpowiedni komponent ikony
        const mappedData = dbData.map((tx) => ({
          ...tx,
          amount: Number(tx.amount),
          icon: iconMap[tx.category] || Banknote,
        }));

        setTransactions(mappedData);
      } catch (err) {
        console.error("Błąd podczas pobierania danych z bazy:", err.message);
      }
    };

    fetchTransactions();
  }, []);

  // 2. DODAWANIE TRANSAKCJI DO BAZY (POST)
  const addTransaction = async (newTr) => {
    try {
      const response = await fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTr.title,
          description: newTr.description || "",
          amount: newTr.amount,
          category: newTr.category,
          type: newTr.type,
          date: newTr.date,
        }),
      });

      const savedTxFromDb = await response.json();

      // Doklejamy ikonę do nowo zapisanego wiersza z PostgreSQL
      const mappedSavedTx = {
        ...savedTxFromDb,
        amount: Number(savedTxFromDb.amount),
        icon: iconMap[savedTxFromDb.category] || Banknote,
      };

      // Aktualizujemy stan lokalny w React, wrzucając nową transakcję na początek listy
      setTransactions((prev) => [mappedSavedTx, ...prev]);
      console.log("Pomyślnie dodano do bazy i stanu:", mappedSavedTx);
    } catch (err) {
      console.error("Błąd podczas wysyłania transakcji do bazy:", err.message);
    }
  };

  // 3. USUWANIE TRANSAKCJI (DELETE)
  const deleteTransaction = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/transactions/${id}`, {
        method: "DELETE",
      });

      // Aktualizujemy stan Reacta - wywalamy usuniętą transakcję z tablicy
      setTransactions((prev) => prev.filter((tx) => tx.id !== id));
      console.log("Usunięto transakcję o ID:", id);
    } catch (err) {
      console.error("Błąd podczas usuwania z bazy:", err.message);
    }
  };

  return (
    <Router>
      <div className={styles.container}>
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard data={transactions} onDelete={deleteTransaction} />
            }
          />
          <Route
            path="/add_transaction"
            element={<New_Transaction onAdd={addTransaction} />}
          />
          <Route
            path="/statistics"
            element={<Statistics transactions={transactions} />}
          />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
