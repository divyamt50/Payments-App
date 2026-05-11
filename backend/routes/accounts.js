const express = require('express');
const authMiddleware = require('../middleware');
const router = express.Router();
const User = require('../models/userModel');
const Account = require('../models/bankModel');
const mongoose = require('mongoose');

router.get('/',(req, res)=>{
    res.send("account router");
});

router.get('/balance', authMiddleware,async(req, res)=>{
    try{
        const account = await Account.findOne({userId:req.userId});
        return res.status(200).json({balance:account.balance});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({msg:"error"});
    }
})

router.post('/transfer', authMiddleware,async (req, res)=>{
    try{
        const session = await mongoose.startSession();

        session.startTransaction();
        const {amount, to} = req.body;

        const fromAccount = await Account.findOne({userId:req.userId}).session(session);

        if(!fromAccount || fromAccount.balance < amount){
            await session.abortTransaction();
            return res.status(400).json({msg:"Insufficient Balance"});
        }

        const toAccount = await Account.findOne({userId:to}).session(session);

        if(!toAccount){
            await session.abortTransaction()
            return res.status(500).json({msg:"Invalid receiver's account"});
        }

        await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session);
        await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);

        await session.commitTransaction();

        return res.status(200).json({
            msg:"Transaction complete"
        });
    }
    catch(err){
        console.log(err);
        return res.status(400).json({msg:`Error in transaction ${err}`});
    }
});

module.exports = router;