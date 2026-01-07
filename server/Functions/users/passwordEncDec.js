const bcrypt = require("bcrypt")
require("dotenv").config({ path: "/home/spyner/Documents/final_year_project/server/.env", quiet: true })

const passwordEncryption = (password) => {
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    return hashedPassword
}

const checkPassword = (password, saltedPassword) => {
    const verifyPassword = bcrypt.compareSync(password, saltedPassword)
    return verifyPassword
}

module.exports = { passwordEncryption, checkPassword }