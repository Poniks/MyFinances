const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json()); // Pozwala czytać dane JSON wysyłane z Reacta

// 1. POBIERANIE TRANSAKCJI (GET)
app.get("/api/transactions", async (req, res) => {
  try {
    const allTransactions = await pool.query(
      "SELECT * FROM transactions ORDER BY date DESC, id DESC",
    );
    res.json(allTransactions.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Błąd serwera podczas pobierania danych" });
  }
});

// 2. DODAWANIE TRANSAKCJI (POST)
app.post("/api/transactions", async (req, res) => {
  try {
    const { title, description, amount, category, type, date } = req.body;

    const newTransaction = await pool.query(
      "INSERT INTO transactions (title, description, amount, category, type, date) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [title, description, amount, category, type, date],
    );

    res.json(newTransaction.rows[0]);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: "Błąd serwera podczas dodawania transakcji" });
  }
});

// 3. USUWANIE TRANSAKCJI (DELETE)
app.delete("/api/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM transactions WHERE id = $1", [id]);
    res.json({ message: "Transakcja pomyślnie usunięta" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Błąd serwera podczas usuwania transakcji" });
  }
});

// Nasłuchiwanie
app.listen(5000, () => {
  console.log("Serwer MyFinances śmiga na porcie 5000!");
});
