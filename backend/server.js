const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Datenbankverbindung herstellen
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routen
app.use('/api/transactions', require('./routes/transactions'));

// Test Startseite
app.get('/', (req, res) => {
  res.send('Budgetly Backend läuft!');
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});