const Cart = require("../../Models/users/cart");
const product = require("../../Models/sellers/products")
const user = require("../../Models/users/users")
const { decryptId } = require('../../Functions/sellers/idEncryption');


exports.addToCart = async (req, res) => {
    const { productId, userId, shopId, quantity } = req.body;
    try {
        const decryptedUser = decryptId(userId);
        const shopData = await product.findOne({ shop: shopId });
        const productData = await product.findOne({ _id: productId });

        const cartProductData = await Cart.findOne({ products: productId, user: decryptedUser });

        if (cartProductData) {
            await Cart.findByIdAndUpdate(cartProductData._id, {
                quantity: cartProductData.quantity + Number(quantity)
            });
            return res.status(200).json({ message: "Added data to already existing data" });
        }

        if (shopData && productData) {
            const cartData = new Cart({
                user: decryptedUser,
                shop: shopId,
                products: productId,
                quantity: quantity
            });

            await cartData.save();
            res.status(201).json({ message: "Product added successfully" });
        } else {
            res.status(404).json({ err: "Data not found" });
        }
    } catch (error) {
        console.log("Error at addToCart: ", error);
        res.status(500).json({ err: "Internal server error" }); // Added error response
    }
};

exports.viewCart = async (req, res) => {
    const userId = req.query.userId;
    try {
        const userData = await user.findOne({ _id: decryptId(userId) })
        const cartItems = await Cart.find({ user: decryptId(userId) }, { products: 1, quantity: 1 })

        const productIds = cartItems.map(item => item.products);
        const productArr = await product.find({ _id: { $in: productIds } });

        if (userData) {
            res.status(200).json({ message: "Data successfully fetched", items: productArr, qty: cartItems })
        } else {
            res.status(404).json({ err: "User not found" })
        }
    } catch (error) {
        console.log("error at viewcart: ", error)
    }

}

exports.deleteCart = async (req, res) => {
    if (!req.query.s) {
        return res.status(404).json({ err: "No id" })
    }
    const string = req.query.s
    try {
        const cartData = await Cart.find({ _id: string })
        if (cartData) {
            await Cart.findByIdAndDelete(string)
            res.status(200).json({ message: "Deleted successfully" })
        } else {
            res.status(400).json({ err: "Data missing" })
        }

    } catch (error) {
        console.log("Error at deleteCart: ", error)
    }
}

exports.updateCart = async (req, res) => {

}