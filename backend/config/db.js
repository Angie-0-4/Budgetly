
const momgoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.conect('mongodb://127.0.0.1:27017/budgetly');
        console.log(`MongoDB verbunden: ${conn.connection.host}`);
    } catch (error) {
        console.error
    }
}