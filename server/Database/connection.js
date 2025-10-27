const mongoose = require("mongoose")
require("dotenv").config({ path: "/home/spyner/Documents/final_year_project/server/.env", quiet: true })

mongoose.connect(process.env.DATABASE)
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.log(err))