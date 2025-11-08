const mongoose = require('mongoose');

const shopScema = new mongoose.Schema({
    shopName: { type: String, required: true },
    shopImage: { type: String, required: true },
    shopDescription: { type: String, required: true },
    shopKeeper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('Shop', shopScema)