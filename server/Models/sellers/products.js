const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true, },
    productImage: { type: String, required: true, },
    productPrice: { type: String, required: true, },
    productQuantity: { type: Number, required: true },
    productCategory: { type: String, required: true },
    productDescription: { type: String, required: true, },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema)