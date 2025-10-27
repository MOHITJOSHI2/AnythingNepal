const Category = require('../../Models/admins/categories')

exports.addCategory = async (req, res) => {
    try {
        const { categoryName } = req.body
        if (categoryName) {
            const nameInfo = await Category.findOne({ categoryName: categoryName })
            if (nameInfo) {
                res.status(400).json({ err: "Category already exists" })
            } else {
                const newCategory = new Category({
                    categoryName: categoryName
                })

                await newCategory.save()
                res.status(201).json({ message: "Category added successfully" })
            }
        }
    } catch (error) {
        console.log("Error at addCategory", error)
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const { oldName, NewCategoryName } = req.body
        if (oldName && NewCategoryName) {
            const updateCategory = await Category.findOneAndUpdate({ categoryName: oldName }, { $set: { categoryName: NewCategoryName } })
            if (updateCategory) {
                res.status(201).json({ message: "Category updated successfully" })
            } else {
                res.status(400).json({ err: "Error occured" })

            }
        }
    } catch (error) {
        console.log("Error at update Category", error)
    }
}