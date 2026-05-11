const express = require('express');
const router = express.Router();
const { z } = require('zod');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const authMiddleware = require('../middleware');
const Account = require('../models/bankModel');

const zodUserSchema = z.object({
    username:z.string().email(),
    firstname:z.string(),
    lastname:z.string(),
    password:z.string().min(6)
});

router.post('/signup', async(req, res)=>{
    const { username,firstname,lastname,password } = req.body;
    const { success } = zodUserSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({msg:"Email already taken / Incorrect inputs"});
    }
    const existingUser = await User.findOne({
        username:req.body.username
    });

    if(existingUser){
        return res.status(411).json({msg:"Email already taken / Incorrect inputs"});
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create(
        {
            username,
            firstname,
            lastname,
            password:hashedPassword
        }
    );
    console.log("User created");

    const userAccount = await Account.create(
        {
            userId:user._id,
            balance: 1 + Math.random() * 10000
        }
    );

    const userId = user._id;

    return res.status(200).json({msg:"User create"});
});

const zodSigninBody = z.object({
    username:z.string().email(),
    password:z.string().min(6)
});

router.post('/signin', async(req,res)=>{
    //1 - first check = zod
    //2 - second check = username
    //3 - password matching
    // generate a jwt
    const parsed = zodSigninBody.safeParse(req.body);
    if(!parsed.success){
        return res.status(403).json({msg:"Invalid credentials, please try again"});
    }
    console.log("zod cleared")

    const {username, password} = parsed.data;

    const user = await User.findOne({username:username});
    if(!user){
        return res.status(403).json({msg:"Invalid credentials, please try again"});
    }
    console.log("user found");
    const passwordMatching = await bcrypt.compare(password, user.password);
    if(!passwordMatching)
    {
        return res.status(403).json({msg:"Invalid credentials, please try again"});
    }
    const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn:"2h"});
    return res.status(200).json({msg:"signed in", token:token});
});

router.put('/update', authMiddleware,async(req, res)=>{
    try{
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({msg:"No data provided"});
        }
        const userId = req.userId;
        const {firstname, lastname, password} = req.body;
        let result = {};

        if(firstname)
        {
            result.firstname = firstname;
        }
        if(lastname){
            result.lastname = lastname;
        }
        if(password){
            const hashedPassword = await bcrypt.hash(password, 10);
            result.password = hashedPassword;
        }
        
        await User.updateOne({_id:userId},{$set:result});
        res.status(200).json({msg:"User's details updated"});
        console.log("Updated the user details");
    }
    catch(err){
        console.log(err);
    }
});

router.get('/bulk', async(req, res)=>{
    try{
        const filter = req.query.filter || "";

        const usersList = await User.find(
            {
                $or:[
                    {
                        firstname: {
                            $regex:filter,
                            $options:"i"
                        }
                    },
                    {
                        lastname:{
                            $regex:filter,
                            $options:"i"
                        }
                    }
                ],
            }
        ).select("firstname lastname _id username");

        return res.status(200).json({users:usersList.map((user)=>({
            username:user.username,
            firstname:user.firstname,
            lastname:user.lastname,
            _id:user._id
        }))})
    }
    catch(err){
        console.log("Error finding one user", err);
        return res.status(500).json({msg:"Error finding user"});
    }    
});

module.exports = router;
