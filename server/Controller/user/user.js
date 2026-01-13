const { ecnryptId, decryptId } = require('../../Functions/sellers/idEncryption')
const { checkPassword, passwordEncryption } = require('../../Functions/users/passwordEncDec')
const User = require('../../Models/users/users')

exports.addUser = async (req, res) => {
    try {
        const { fullName, phone, gender, age, district, city, address, email, password, } = req.body

        const userPhone = await User.find({ phone: phone })
        const userEmail = await User.find({ email: email })

        if (userPhone.length > 0) {
            res.status(400).json({ phoneErr: "User phone already Exists" })
        } else if (userEmail.length > 0) {
            res.status(400).json({ emailErr: "User email already Exists" })
        }
        else {
            const addUser = new User({
                fullName: fullName,
                phone: phone,
                gender: gender,
                age: age,
                district: district,
                city: city,
                address: address,
                email: email,
                password: passwordEncryption(password)
            })

            await addUser.save()
            console.log("User added successfully")
            res.status(201).json({ message: "User added successfully" })
        }

    } catch (error) {
        console.log("Error occured", error)
    }
}

exports.userLogin = async (req, res) => {
    const { email, password } = req.body
    const checkUser = await User.findOne({ email: email })
    if (!checkUser) {
        res.status(404).json({ emailErr: "Email cannot be found" })
    } else {
        const savedPassword = checkUser.password
        const verifyPassword = checkPassword(password, savedPassword)
        if (!verifyPassword) {
            res.status(400).json({ passwordErr: "Password didn't match" })
        } else {
            res.status(200).json({ message: "User logined successfullt", encryptedId: ecnryptId(checkUser._id), name: checkUser.fullName })
        }
    }
}

exports.updateUser = async (req, res) => {
    const { fullName, phone, gender, age, district, city, address, email, password, } = req.body
    if (!req.params.id) {
        return res.status(400).json({ err: "Id not found" })
    }

    const userId = decryptId(req.params.id)
    const findUser = await User.findOne({ _id: userId })

    const findUserEmail = await User.find({ email: email })
    const findUserPhone = await User.find({ phone: phone })

    if (findUserEmail.length > 0 && (findUserEmail[0].email !== findUser.email)) {
        res.status(400).json({ emailErr: "Email already exists" })
    }

    else if (findUserPhone.length > 0 && (findUserPhone[0].phone !== findUser.phone)) {
        res.status(400).json({ phoneErr: "Phone already exists" })
    }
    else {
        await User.findByIdAndUpdate(userId, {
            fullName: fullName,
            phone: phone,
            gender: gender,
            age: age,
            district: district,
            city: city,
            address: address,
            email: email,
            password: passwordEncryption(password)
        })
        res.status(201).json({ message: "Data updated successfully" })
    }

}

exports.checkUser = async (req, res) => {
    const string = req.params.string
    const userId = string.split("^")[0]
    const password = string.split("^")[1]

    const checkUser = await User.findOne({ _id: decryptId(userId) })
    if (checkUser) {
        const verifyPassword = checkPassword(password, checkUser.password)
        if (!verifyPassword) {
            res.status(400).json({ passwordErr: "Password didn't match" })
        } else {
            res.status(200).json({ message: "Password matched" })
        }
    } else {
        res.status(404).json({ err: "User not found" })
    }
}

exports.getUserData = async (req, res) => {
    if (!req.params.id) {
        res.status(404).json({ err: "Cannot find id" })
    } else {
        const userId = decryptId(req.params.id)
        const findUser = await User.findOne({ _id: userId })
        if (findUser) {
            res.status(200).json({ message: findUser })
        } else {
            res.status(404).json({ err: "Cannnot find user" })
        }
    }
}