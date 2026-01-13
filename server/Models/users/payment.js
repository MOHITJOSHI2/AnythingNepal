const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    paymentTime: { type: String, required: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        require: true
    },
    products: {
        type: Array
    }
})

module.exports = mongoose.model("Payment", paymentSchema)