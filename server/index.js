const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json()); // Pozwala serwerowi czytać dane JSON wysyłane z Reacta

// TESTOWY ROUTE - Sprawdzenie czy serwer działa
app.get("/test", async (req, res) => {
  try {
    res.send("Serwer MyFinances działa!");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("Serwer wystartował na porcie 5000");
});
