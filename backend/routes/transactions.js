const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Alle Einträge abrufen
router.get('/', async (req, res) => {
    try {
        const userId = req.headers['user-id'];
        const transactions = await Transaction.find({ user: userId }).sort({ date: -1 });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: 'Serverfehler beim Abrufen der Daten' });
    }
});

//  Neuen Eintrag erstellen
router.post('/', async (req, res) => {
    try {
        const { title, amount, type, category } = req.body;
        const userId = req.headers['user-id'];

        const newTransaction = new Transaction({
            title,
            amount,
            type,
            category,
            user: userId
        });
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (err) {
        res.status(400).json({ message: 'Ungültige Daten übergeben', error: err.message });
    }
});

// Einzrag Bearbeiten
router.put('/:id', async (req, res) => {
    try {
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
  
      if (!updatedTransaction) {
        return res.status(404).json({ message: 'Eintrag nicht gefunden' });
      }
  
      res.json(updatedTransaction);
    } catch (err) {
      res.status(400).json({ message: 'Fehler beim Aktualisieren', error: err.message });
    }
  });

// Eintrag löschen
router.delete('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Eintrag nicht gefunden' });
        }
        await Transaction.findByIdAndDelete(req.params.id);
        res.json({ message: 'Eintrag erfolgreich gelöscht' });
    } catch (err) {
        res.status(500).json({ message: 'Fehler beim Löschen des Eintrages' });
    }
});

module.exports = router;