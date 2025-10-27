const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/home/spyner/Documents/final_year_project/server/assets')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})

const upload = multer({ storage: storage })

module.exports = { upload }