const { decryptId, ecnryptId } = require("../../Functions/sellers/idEncryption");
const shop = require("../../Models/sellers/shop");
const fs = require('fs');
const payment = require("../../Models/users/payment");
const Product = require("../../Models/sellers/products")

exports.addShop = async (req, res) => {
    const shopImage = req.file.filename
    const id = decryptId(req.params.id)
    const { shopName, shopDescription } = req.body
    try {
        const checkShop = await shop.findOne({ shopName: shopName })
        if (checkShop) {
            res.status(400).json({ shopErr: "Shop name already exists" })
        } else {
            const newShop = new shop({
                shopName: shopName,
                shopImage: shopImage,
                shopDescription: shopDescription,
                shopKeeper: id
            })
            await newShop.save()
            const shopId1 = await shop.findOne({ shopName: shopName }, { _id: 1 })
            if (shopId1) {
                const shopId = ecnryptId(shopId1._id)
                res.status(201).json({ message: "Shop created successfully", shopId })

            } else {
                res.status(201).json({ err: "Shop cannot be created" })

            }
        }
    } catch (error) {
        console.log("Error occured at addShop\n", error)
    }
}

exports.updateShop = async (req, res) => {
    const id = decryptId(req.params.id)
    const { shopName, shopDescription } = req.body
    try {
        const checkShop = await shop.findOne({ _id: id })
        if (!checkShop) {
            res.status(200).json({ err: "Shop cannot be found" })
        }
        const updateData = {
            shopName: shopName,
            shopDescription: shopDescription,
            shopKeeper: id
        }
        if (req.file) {
            updateData.shopImage = req.file.filename
            const oldPath = `/home/spyner/Documents/final_year_project/server/assets/${checkShop.shopImage}`
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
        }
        await shop.findByIdAndUpdate(id, updateData)
        res.status(200).json({ message: "Successfully updated shop" });

    } catch (error) {
        console.log("Error at upDateShop")
    }
}

exports.getSingleShop = async (req, res) => {
    const shopId = decryptId(req.params.id)
    try {
        const shopData = await shop.findOne({ _id: shopId })
        if (shopData) {
            res.status(200).json({ message: shopData })
        } else {
            res.status(404).json({ err: "No shop found" })
        }
    } catch (error) {
        console.log("Error occured at getSingleShop\n", error)
    }
}

exports.findShopBySellerId = async (req, res) => {
    const userId = decryptId(req.params.id)
    try {
        const shopData = await shop.findOne({ shopKeeper: userId })
        if (shopData) {
            const encryptedShopId = ecnryptId(shopData._id)
            if (encryptedShopId) {
                res.status(200).json({ message: "User found", encryptedShopId })
            } else {
                res.status(404).json({ err: "User cannot be found" })
            }
        } else {
            res.status(404).json({ shopMessage: "cannot find shop that belongs to this seller" })
        }
    } catch (error) {
        console.log("Error at find shop by seller id \n", error)
    }
}

exports.getActiveOrders = async (req, res) => {
    let shopId = ""
    if (req.params) {
        shopId = decryptId(req.params.id)
    }
    if (shopId.length > 0) {
        try {
            let count = 0
            const products = await Product.find({ shop: shopId })
            const productIds = products.map((elem) => elem._id)
            const payedProducts = await payment.find({ products: { $in: productIds } })

            res.status(200).json({ message: payedProducts })
        } catch (error) {
            console.log(error)
        }
    }

}
