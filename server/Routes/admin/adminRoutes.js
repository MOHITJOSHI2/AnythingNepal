const { addAdmin } = require("../../Controller/admin/admin")
const { addCategory, updateCategory } = require("../../Controller/admin/categories")

const express = require("express")
const router = express.Router()

router.post('/addAdmin', addAdmin)

router.post('/addCategory', addCategory)
router.post('/updateCategory', updateCategory)


module.exports = router;