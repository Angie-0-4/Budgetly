const mongoose = require('mongoose');
const Transaction = require('./models/Transaction');

const sampleTransaction = [
    { title: 'Gehalt', amount: 2500, type: 'income', category: 'Gehalt' },
    { title: 'Supermarkt Einkaud', amount: 85.50, type: 'expense', category: 'Lebensmittel' },
    { title: 'Fitnessstudio', amount: 30, type: 'expense', category: 'Freizeit' },
    { title: 'Stromrechnung', amount: 65, type: 'expense', category: 'Haushalt' }
];

const seedDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/budgetly');
        console.log('MongoDB für Seeding verbunden...');

        // Alte Daten löschen
        await Transaction.deleteMany({});

        // Neue Testdaten einfügen
        await Transaction.insertMany(sampleTransaction);
        console.log('Testdaten erfolgreich geladen!');

        await mongoose.disconnect();
        process.exit(0);
    }   catch (err) {
        console.error('Fehler beim Seeding:', err);
        process.exit(1);
    }
};

seedDB();