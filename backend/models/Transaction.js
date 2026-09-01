const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['income', 'expense']
    },
    category: {
        type: String,
        default: 'Allgemein'
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
    }, 
{ timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);