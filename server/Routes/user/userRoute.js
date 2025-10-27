const { addUser } = require('../../Controller/user/user')

const express = require("express")
const router = express.Router()

router.post('/addUser', addUser)

module.exports = router