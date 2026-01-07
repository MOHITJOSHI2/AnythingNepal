const { addToCart, viewCart } = require('../../Controller/user/cart')
const { getFilteredProduct, getProductSearch } = require('../../Controller/user/product')
const { addUser, userLogin } = require('../../Controller/user/user')

const express = require("express")
const router = express.Router()

// User routes
router.post('/addUser', addUser)
router.post('/userLogin', userLogin)

//Product Routes
router.get('/getFilteredProducts', getFilteredProduct)
router.get('/getProductSearch', getProductSearch)

//Cart routes
router.post('/addToCart', addToCart)
router.get('/viewCart', viewCart)

module.exports = router