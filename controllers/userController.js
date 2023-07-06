const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateAccessToken} = require('../JWT/JWT_generate');
const {User} = require('../models');
const {send_Mail} = require('../mailer');
const SECRET = process.env.SECRET;
const {regValidSchema, logValidSchema} = require('../validators');



exports.register = async (req,res) => {
    try{
        const {error} = regValidSchema.validate(req.body);
            if(error){
                return res.status(400).json({err: error.details[0].message});
            }
        const {userName,email,password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const emailExists = await User.findOne({where: {email}});
            if(emailExists){
                return res.status(400).json({err: "Account with this email already exists"});
            }
        const data = await User.create({userName,email,password:hashedPassword});
        const token = generateAccessToken(email,data.role,data.id);
            send_Mail(email,token);
        res.status(201).json({message: "User created!", jwt:token})
    }catch(err){
        res.status(500).json({err: "Something went wrong!"})
    }
}

exports.verified = async (req,res) => {
    try{
        const {token} = req.params;
        const decoded = jwt.verify(token,SECRET);
        await User.update({is_verified:1},{where:{email:decoded.email}});
        res.status(200).json({message: "Verified"})
    }catch(err){
        res.status(500).json({error: err.message})
    }
}


exports.login = async (req,res) => {
    try{
        const {error} = logValidSchema.validate(req.body);
        if(error){
            return res.status(400).json({err: error.details[0].message});
        }
        const {email,password} = req.body;
        const data = await User.findOne({where:{email:email}});
        if(email === data.email && bcrypt.compare(password,data.password) && data.is_verified === 1){
            const token = generateAccessToken(email,data.role,data.id);
            res.status(200).json({message: "Logged in", jwt:token, role:data.role, id:data.id})
        }
    }catch(err){
        res.status(403).json({err: "Login credentials are not correct!"})
    }
}

exports.getVerifiedUsers = async (req,res) => {
    try{
        const data = await User.findAll({where:{is_verified:1}});
        res.status(200).json({data:data})
    }catch(err){
        res.status(500).json({message: "Something went wrong"})
    }
} 

exports.updateUser = async (req,res) => {
    try{
        const {id} = req.params;
        const {role,userName,email,password} = req.body;
        await User.update({role,userName,email,password},{where:{id}})
        res.status(200).json({message:"User updated"}) 
    }
    catch(err){
        res.status(500).json({message:"Something went wrong"}) 
    }
}

exports.deleteUser = async (req,res) => {
    try{
        const {id} = req.params;
        await User.destroy({where:{id}})
        res.status(204).json({message:"User deleted"}) 
    }
    catch(err){
        res.status(500).json({message:"Something went wrong"}) 
    }
}


