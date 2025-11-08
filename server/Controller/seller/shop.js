const { decryptId } = require("../../Functions/sellers/idEncryption");
const shop = require("../../Models/sellers/shop");

exports.addShop = async (req, res) => {
    const shopImage = req.file.filename
    const id = decryptId(req.params.id)
    const { shopName, shopDescription } = req.body
    try {
        const checkShop = await shop.findOne({ shopName: shopName })
        if (checkShop) {
            res.status(400).json({ shopErr: "Shop name already exists" })
        } else {
            const newShop = new shop({
                shopName: shopName,
                shopImage: shopImage,
                shopDescription: shopDescription,
                shopKeeper: id
            })
            await newShop.save()
            const shopId = await shop.findOne({ shopName: shopName }, { _id: 1 })
            if (shopId) {
                res.status(201).json({ message: "Shop created successfully", shopId })

            } else {
                res.status(201).json({ err: "Shop cannot be created" })

            }
        }
    } catch (error) {
        console.log("Error occured at addShop\n", error)
    }
}

exports.updateShop = async (req, res) => {

}
