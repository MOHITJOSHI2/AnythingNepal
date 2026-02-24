const { search } = require("../../Functions/users/searchProduct")
const Products = require("../../Models/sellers/products")
require('../../Database/connection')

exports.getFilteredProduct = async (req, res) => {
    const productArr = []
    let uniqueArr = []
    try {
        const product = await Products.find()
        if (product.length > 0) {
            for (let i = 0; i < 10; i++) {
                const random = Math.floor(Math.random() * product.length)
                productArr.push(product[random])
                if (product[i] == null)
                    break
            }
            uniqueArr = [... new Map(productArr.map(e => [e._id, e])).values()]
            if (uniqueArr.length > 0) {
                res.status(200).json({ message: "Successfully fetched data", products: uniqueArr })
            }
        } else {
            res.status(400).json({ err: "No products to show" })
        }
    } catch (error) {
        console.log("Error at filtered product", error)
    }
}


exports.getProductSearch = async (req, res) => {
    try {
        const query = req.query.query;
        const resultData = await search(query);

        return res.status(200).json({
            data: resultData || []
        });

    } catch (error) {
        console.log("Error at get product search", error);
        return res.status(500).json({ err: "Server error" });
    }
};

exports.payedProducts = async (req, res) => {
    try {
        const { data } = req.body;
        if (!data) {
            return res.status(400).json({ err: "Data None" })
        }
        const productsId = data.map((elem) => elem.products)
        let productIds = productsId[0]

        const fetchProductsData = await Products.find({ _id: { $in: productIds } })
        if (fetchProductsData.length > 0) {
            res.status(200).json({ message: fetchProductsData })
        } else {
            res.status(404).json({ err: "data not found" })

        }
    } catch (error) {
        console.log("Error at payedProduct: ", error)
    }
}

exports.getSingleCategory = async (req, res) => {
    try {
        if (req.query) {
            const category = req.query.category;
            const getData = await Products.find({ productCategory: category })
            if (getData.length > 0) {
                res.status(200).json({ message: getData })
            } else {
                res.status(400).json({ err: "no data found" })
            }
        }
    } catch (error) {
        console.log("Error at get single category: ", error)
    }
}



