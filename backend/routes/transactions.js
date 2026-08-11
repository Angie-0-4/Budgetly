const express = require('express');
const router = express.Router();
const Transaction = require('../models/Trabsaction');

//READ: Alle Einträge abrufen
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ date: -1 });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: 'Serverfehler beim Abrufen der daten' });
    }
});

// 2. CREATE: Neuen Eintrag erstellen
router.post('/', async (req, res) => {
    try {
        const { title, amount, type, category } = req.body;

        const newTransaction = new Transaction({
            title,
            amount,
            type,
            category,
        });
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (err) {
        resizeTo.status(400).json({ message: 'Ungültige Daten übergeben', error: err.message });
    }
});

// Delete: Eintrag löschen
router.delete('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Eintrag nicht gefunden '});
        }
        await Transaction.findByIdAndDelete(req.params.id);
        res.json({ message: 'Eintrag erfolgreich gelöscht' });
    } catch (err) {
        res.status(500).json({ message: 'Fehler beim Löschen des eintrages' })
    }
});

module.exports = router;