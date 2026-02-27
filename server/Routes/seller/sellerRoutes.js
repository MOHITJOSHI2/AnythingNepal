const { addSeller, sellerLogin, getSeller, sendMail, updateSeller } = require('../../Controller/seller/seller')
const { addProduct, getProduct, getSingleProduct, getTotalProduct, deleteProduct, updateProduct } = require('../../Controller/seller/product')
const { addShop, getSingleShop, updateShop, findShopBySellerId, getActiveOrders } = require('../../Controller/seller/shop')

const upload = require("../../Middleware/sellers/product")

const express = require("express")
const router = express.Router()
// Seller Routes
router.post("/addSeller", addSeller)
router.post("/sellerLogin", sellerLogin)
router.get("/sellerData/:id", getSeller)
router.post("/updateSeller/:id", updateSeller)


// Product routes
router.post("/addProduct/:id", upload.upload.single('productImage'), addProduct)
router.post("/updateProduct/:id", upload.upload.single('productImage'), updateProduct)
router.get("/getProduct/:id", getProduct)
router.get("/getSingleProduct/:id", getSingleProduct)
router.get("/getTotalProduct", getTotalProduct)
router.delete("/deleteProduct/:id", deleteProduct)

// Shop routes
router.post('/addShop/:id', upload.upload.single('shopImage'), addShop)
router.get('/getSingleShop/:id', getSingleShop)
router.get('/getShopBySellerId/:id', findShopBySellerId)
router.post('/updateShop/:id', upload.upload.single('shopImage'), updateShop)
router.get('/getActiveOrders/:id', getActiveOrders)

// Email
router.post('/sendEmail', sendMail)


module.exports = router;