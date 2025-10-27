const { addSeller, sellerLogin, getSeller } = require('../../Controller/seller/seller')
const { addProduct, getProduct, getSingleProduct, getTotalProduct } = require('../../Controller/seller/product')

const upload = require("../../Middleware/sellers/product")

const express = require("express")
const router = express.Router()

router.post("/addSeller", addSeller)
router.post("/sellerLogin", sellerLogin)
router.get("/sellerData/:id", getSeller)

router.post("/addProduct/:id", upload.upload.single('productImage'), addProduct)
router.get("/getProduct/:id", getProduct)
router.get("/getSingleProduct/:id", getSingleProduct)
router.get("/getTotalProduct", getTotalProduct)


module.exports = router;