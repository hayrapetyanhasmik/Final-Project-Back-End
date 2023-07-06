const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET;

exports.authenticateTokenAdmin = (req,res,next) => {
    const token = req.headers.authorization;
    if(token === null){
        res.status(401).json({message: "Not allowed"})
    } 
    jwt.verify(token,SECRET, (err,data)=>{
        if(err){
            res.status(403).json({message: "Forbidden"})
        }
        if(data.role === 1){
            next()
        }else{
            res.status(401).json({message: "Requires authentication"})
        }
    }) 
}