// Require Only
require("./Database/connection")
require("dotenv").config({ path: ".env", quiet: true })

// Libraries
const express = require("express")
const cors = require("cors")
const path = require('path')

// Objects
const app = express()

// Server modifications
app.use(express.json())
app.use(cors({
    origin: "*",
    credentials: true,
}))
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Routes Directories
const adminRoute = require("./Routes/admin/adminRoutes")
const sellerRoute = require("./Routes/seller/sellerRoutes")
const userRoute = require("./Routes/user/userRoute")

// Server Routes
app.use('/admin', adminRoute)
app.use('/seller', sellerRoute)
app.use('/user', userRoute)

app.get("/", (req, res) => {
    res.send("✅ Express backend is working fine!");
});

// Running Server
app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${process.env.PORT}`)
})

