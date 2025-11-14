const { sendMail } = require("../../Functions/app/sendMail");
const { ecnryptId, decryptId } = require("../../Functions/sellers/idEncryption");
const Seller = require("../../Models/sellers/sellers")

exports.addSeller = async (req, res) => {
    const { fullName, phone, gender, panNumber, district, city, address, email, password } = req.body;
    try {
        const findSellerPhone = await Seller.find({ phone: phone })
        const findSellerPan = await Seller.find({ panNumber: panNumber })
        const findSellerEmail = await Seller.find({ email: email })

        if (findSellerEmail.length > 0) {
            res.status(400).json({ emailErr: "Email already exists" })
        }
        else if (findSellerPhone.length > 0) {
            res.status(400).json({ phoneErr: "Phone already exists" })

        }
        else if (findSellerPan.length > 0) {
            res.status(400).json({ panErr: "PanNumber already exists" })

        }
        else {
            const addSeller = new Seller({
                fullName: fullName,
                phone: phone,
                gender: gender,
                panNumber: panNumber,
                district: district,
                city: city,
                address: address,
                email: email,
                password: password,
            })

            await addSeller.save()
            console.log("Seller Added successfully")
            res.status(201).json({ message: "Seller Added successfully" })
        }

    } catch (error) {
        console.log("Error occurred", error)
    }
}

exports.sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const seller = await Seller.findOne({ email: email })
        if (seller) {
            if (seller.password === password) {
                const id = ecnryptId(seller.id)
                res.status(200).json({ message: "Successfully log onto account", id })
            } else {
                res.status(400).json({ err: "Password didn't match" })
            }
        } else {
            res.status(400).json({ err: "Account not found" })
        }
    } catch (error) {
        console.log("Error occured", error)
    }
}

exports.getSeller = async (req, res) => {
    try {
        const id1 = req.params.id
        const id = decryptId(id1)
        const getData = await Seller.findOne({ _id: id })
        if (!getData) {
            res.status(401).json({ err: "Cannot find the data with the id" })
        } else {
            res.status(200).json({ message: "Data found successfully", getData })
        }
    } catch (error) {
        console.log("Error occured wrong id")
    }
}


exports.sendMail = async (req, res) => {
    const { email, subject, body } = req.body
    try {
        if (email && subject && body) {
            const info = await sendMail(email, subject, body)
            if (info) {
                res.status(200).json({ message: "Mail send", info })
            } else {
                res.status(400).json({ err: "Mail cannot be sent at the moment" })

            }
        }
    } catch (error) {
        console.log("Error at mailing", error)
    }
}