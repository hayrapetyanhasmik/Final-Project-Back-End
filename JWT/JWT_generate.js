const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET;


exports.generateAccessToken = (email,role,id) => {
    return jwt.sign({email,role,id},SECRET,{expiresIn:"3600s"});
}