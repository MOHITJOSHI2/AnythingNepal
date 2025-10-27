const Admin = require("../../Models/admins/admin")

exports.addAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const findAdmin = await Admin.find({ username: username })
        if (findAdmin.length > 0) {
            res.status(400).json({ err: "Admin already exists" })
        } else {
            const addAdmin = new Admin({
                username: username,
                password: password
            })

            await addAdmin.save()
            console.log("Admin Added successfully")
            res.status(201).json({ message: "Admin Added successfully" })
        }

    } catch (error) {
        console.log("Error occurred", error)
    }
}