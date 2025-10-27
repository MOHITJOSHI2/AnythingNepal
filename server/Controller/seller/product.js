const { decryptId } = require('../../Functions/sellers/idEncryption')
const Products = require('../../Models/sellers/products')
const Seller = require('../../Models/sellers/sellers')

exports.addProduct = async (req, res) => {
    const productImage = req.file.filename
    const { productName, productPrice, productQuantity, productCategory, productDescription } = req.body
    try {
        const id = decryptId(req.params.id)
        const seller = await Seller.findOne({ _id: id })
        if (seller) {
            const saveData = new Products({
                productName: productName,
                productImage: productImage,
                productPrice: productPrice,
                productQuantity: productQuantity,
                productCategory: productCategory,
                productDescription: productDescription,
                shop: id
            })
            await saveData.save()
            res.status(200).json({ message: "Successful added product" })
        } else {
            res.status(400).json({ err: "Unsuccessful" })
        }
    } catch (error) {
        console.log("Error occured", error)
    }
}


exports.getProduct = async (req, res) => {
    const id = decryptId(req.params.id)
    const product = await Products.find({ shop: id })
    if (product) {
        res.status(200).json({ message: product })
    } else {
        res.status(400).json({ err: "no id found" })
    }
}

exports.getTotalProduct = async (req, res) => {
    const product = await Products.find()
    if (product) {
        res.status(200).json({ message: product })
    } else {
        res.status(400).json({ err: "no product found" })
    }
}

exports.getSingleProduct = async (req, res) => {
    const id = req.params.id
    const product = await Products.find({ _id: id })
    if (product) {
        res.status(200).json({ message: product })
    } else {
        res.status(400).json({ err: "no id found" })
    }
}

exports.deleteProduct = async (req, res) => {
    const id = req.params.id
}
