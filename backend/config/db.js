const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://anjelikavasic_db_user:Anjelika2004.@m0.sbuonn7.mongodb.net/budgetly?appName=M0');
        console.log(`MongoDB verbunden: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Fehler bei der DB-Verbindung: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;