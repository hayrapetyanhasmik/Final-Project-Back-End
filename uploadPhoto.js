const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"./static/images")
    },
    filename: (req,file,cb)=>{
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null,uniqueSuffix + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    //limits: {fileSize: 3000}  bytes 
})

module.exports = {storage,upload}