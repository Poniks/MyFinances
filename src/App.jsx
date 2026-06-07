import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.scss";
import Dashboard from "./components/dashboard/Dashboard";
import Statistics from "./components/statistics/Statistics";
import New_Transaction from "./components/new_transaction/New_Transaction";
import BottomNav from "./components/navigation/BottomNav";
import { Briefcase } from "lucide-react";

function App() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      title: "Wypłata",
      amount: 600,
      icon: Briefcase,
      type: "income",
      date: "2026-04-10",
    },
  ]);

  const addTransaction = (newTr) => {
    console.log("Aktualizuję stan w App o:", newTr);
    setTransactions((prev) => [newTr, ...prev]);
  };

  return (
    <Router>
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<Dashboard data={transactions} />} />
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
