const User = require('../../Models/users/users')

exports.addUser = async (req, res) => {
    try {
        const { fullName, phone, gender, age, district, city, address, email, password, } = req.body

        const userPhone = await User.find({ phone: phone })
        const userEmail = await User.find({ email: email })

        if (userPhone.length > 0 || userEmail.length > 0) {
            res.status(400).json({ message: "User already Exists" })
        } else {
            const addUser = new User({
                fullName: fullName,
                phone: phone,
                gender: gender,
                age: age,
                district: district,
                city: city,
                address: address,
                email: email,
                password: password
            })

            await addUser.save()
            console.log("User added successfully")
            res.status(201).json({ message: "User added successfully" })
        }

    } catch (error) {
        console.log("Error occured", error)
    }
}