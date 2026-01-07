const { ecnryptId } = require('../../Functions/sellers/idEncryption')
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