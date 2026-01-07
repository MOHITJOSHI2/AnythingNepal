const { decryptId } = require('../../Functions/sellers/idEncryption')
const Products = require('../../Models/sellers/products')
const Seller = require('../../Models/sellers/sellers')
const Shop = require('../../Models/sellers/shop')
const fs = require('fs')

exports.addProduct = async (req, res) => {
    const productImage = req.file.filename
    const { productName, productPrice, productQuantity, productCategory, productDescription } = req.body
    try {
        const id = decryptId(req.params.id)
        const shop = await Shop.findOne({ _id: id })
        if (shop) {
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
        console.log("Error occured at addProduct", error)
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Products.findById(id);
        if (!product) {
            return res.status(404).json({ err: "Product not found" });
        }

        const updateData = {
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            productQuantity: req.body.productQuantity,
            productCategory: req.body.productCategory,
            productDescription: req.body.productDescription,
        };
        if (req.file) {
            updateData.productImage = req.file.filename;

            const oldImagePath = `/home/spyner/Documents/final_year_project/server/assets/${product.productImage}`;
            if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
        }

        await Products.findByIdAndUpdate(id, updateData);
        res.status(200).json({ message: "Successfully updated product" });
    } catch (error) {
        console.error("Error occurred at updateProduct", error);
        res.status(500).json({ err: "Server error" });
    }
};



exports.getProduct = async (req, res) => {
    const id = decryptId(req.params.id)
    try {
        const product = await Products.find({ shop: id })
        if (product) {
            res.status(200).json({ message: product })
        } else {
            res.status(400).json({ err: "no id found" })
        }
    } catch (error) {
        console.log("Error at getProduct", error)

    }
}


exports.getTotalProduct = async (req, res) => {
    try {
        const product = await Products.find()

        if (product) {
            res.status(200).json({ message: product })
        } else {
            res.status(400).json({ err: "no product found" })
        }
    } catch (error) {
        console.log("Error at getTotalProduct", error)


    }
}

exports.getSingleProduct = async (req, res) => {
    const id = req.params.id
    try {
        const product = await Products.find({ _id: id })
        if (product) {
            res.status(200).json({ message: product })
        } else {
            res.status(400).json({ err: "no id found" })
        }
    } catch (error) {
        console.log("Error at getSingleProduct", error)

    }
}

exports.deleteProduct = async (req, res) => {
    const id = req.params.id
    try {
        const product = await Products.findOne({ _id: id })
        if (product) {
            const deleteProduct = await Products.findByIdAndDelete(id)
            if (deleteProduct) {
                fs.unlinkSync(`/home/spyner/Documents/final_year_project/server/assets/${product.productImage}`);
                res.status(200).json({ message: "Product Deleted Successfully" })
            }
        } else {
            res.status(400).json({ err: "Product cannot be Deleted" })

        }
    } catch (error) {
        console.log("Error at deleteProduct", error)
    }
}
