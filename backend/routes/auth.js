const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Transaction = require('../models/Transaction');
const JWT_SECRET = 'budgetly_secret_key_123';

// Hilfefunktion
function isPasswordValid(password) {
  const isLengthOk = password.length >= 8 && password.length <= 30;
  const hasUpperCase = password !== password.toLowerCase(); // Hat mind. einen Großbuchstaben
  const hasNumber = /\d/.test(password);                   // Hat mind. eine Zahl
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password); // Hat ein Sonderzeichen

  return isLengthOk && hasUpperCase && hasNumber && hasSpecialChar;
}

// registrieren
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Bitte Benutzername und Passwort angeben.' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Benutzername existiert bereits.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    
     // abfrage
    if (!isPasswordValid(password)) {
      return res.status(400).json({ 
        message: 'Passwort muss 8–30 Zeichen lang sein und mind. einen Großbuchstaben, eine Zahl und ein Sonderzeichen enthalten.' 
      });
    }

    const sampleTransactions = [
      {
        title: 'Gehalt / Taschengeld',
        amount: 850,
        type: 'income',
        category: 'Gehalt',
        user: user._id
      },
      {
        title: 'Supermarkt Einkauf',
        amount: 45.50,
        type: 'expense',
        category: 'Lebensmittel',
        user: user._id
      }
    ];

    await Transaction.insertMany(sampleTransactions);

    res.status(201).json({ message: 'Konto erfolgreich erstellt!' });
  } catch (err) {
    res.status(500).json({ message: 'Fehler bei der Registrierung.', error: err.message });
  }
});

// anmelden
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Ungültige Anmeldedaten.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Ungültige Anmeldedaten' });
    }

    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '2h' });

    res.json({ message: 'Erfolgreich angemeldet!', token, userId: user._id, username: user.username });
  } catch (err) {
    res.status(500).json({ message: 'Fehler beim Login', error: err.message });
  }
});

module.exports = router;