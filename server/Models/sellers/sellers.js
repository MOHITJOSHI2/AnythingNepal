const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    fullName: { type: String, required: true, },
    phone: { type: String, required: true, },
    gender: { type: String, required: true, },
    panNumber: { type: String, required: true, },
    district: { type: String, required: true, },
    city: { type: String, required: true, },
    address: { type: String, required: true, },
    email: { type: String, required: true, },
    password: { type: String, required: true, },
}, { timestamps: true })

module.exports = mongoose.model("Seller", sellerSchema)