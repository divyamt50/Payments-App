const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const accountRouter = require('./accounts');

router.get('/', (req, res)=>{
    res.send("router is working");
});

router.use('/users', userRouter);

router.use('/accounts', accountRouter);

module.exports = router;