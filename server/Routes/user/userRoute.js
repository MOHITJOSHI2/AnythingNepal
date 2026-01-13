const { addToCart, viewCart, deleteCart, updateCart } = require('../../Controller/user/cart')
const { savePayment, getPayments } = require('../../Controller/user/payment')
const { getFilteredProduct, getProductSearch } = require('../../Controller/user/product')
const { addUser, userLogin, checkUser, updateUser, getUserData } = require('../../Controller/user/user')

const express = require("express")
const router = express.Router()

// User routes
router.post('/addUser', addUser)
router.post('/userLogin', userLogin)
router.post('/updateUser', updateUser)
router.get('/checkUser/:string', checkUser)
router.get('/getUserData/:id', getUserData)

//Product Routes
router.get('/getFilteredProducts', getFilteredProduct)
router.get('/getProductSearch', getProductSearch)

//Cart routes
router.post('/addToCart', addToCart)
router.get('/deleteCart', deleteCart)
router.post('/updateCart', updateCart)
router.get('/viewCart', viewCart)

//Payment routes
router.post('/savePayment', savePayment)
router.get("/getPayment", getPayments)

module.exports = router