const { decryptId } = require("../../Functions/sellers/idEncryption");
const cart = require("../../Models/users/cart");
const payment = require("../../Models/users/payment");
const users = require("../../Models/users/users");

exports.savePayment = async (req, res) => {
    const userId = req.query.id

    const { amount } = req.body

    try {
        let productArr = []
        const userData = await users.findOne({ _id: decryptId(userId) })
        const userCartData = await cart.find({ user: decryptId(userId) })

        if (userCartData.length > 0) {
            productArr = userCartData.map((elem) => elem.products)
        }

        if (productArr.length > 0) {
            const date = new Date();
            const options = {
                timeZone: 'Asia/Kathmandu',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                timeZoneName: 'shortOffset'
            };

            const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
            if (userData && amount && productArr.length > 0) {
                const newPayment = new payment({
                    paymentTime: `${formattedDate}`,
                    userId: decryptId(userId),
                    amount: amount,
                    products: productArr

                })
                await newPayment.save()
                res.status(201).json({ message: "Payment done Successfully" })
            } else {
                res.status(400).json({ err: "Cannot proceed at the moment" })

            }
        } else {
            res.status(400).json({ err: "Cannot proceed at the moment" })

        }
    } catch (error) {
        console.log("Error at savePayments: ", error)

    }
}




// for both users and sellers
exports.getPayments = async (req, res) => {
    let userId, shopId

    if (req.query.s) {
        shopId = decryptId(req.query.s)
    } else if (req.query.u) {
        userId = decryptId(req.query.u)
    }
    try {
        if (userId.length > 0) {
            const userData = await payment.find({ userId: userId })
            if (userData.length > 0) {
                res.status(200).json({ userPaymentData: userData })
            } else {
                res.status(200).json({ message: "No data to show" })
            }
        } else if (shopId.length > 0) {
            const sellerData = await payment.find({ shopId: shopId })
            if (sellerData.length > 0) {
                res.status(200).json({ sellerPayment: sellerData })
            } else {
                res.status(200).json({ message: "No data to show" })
            }
        } else {
            res.status(400).json({ err: "Error" })
        }
    } catch (error) {
        console.log("Error at getPayments: ", error)
    }
}