const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Cart", cartSchema)