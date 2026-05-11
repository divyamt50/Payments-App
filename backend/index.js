const express = require("express");

const { connect } = require('./db');

const app = express();
const apiRouter = require("./routes/index");
const port = 3000;
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use("/api/v1", apiRouter);


connect().then(()=>{
    app.listen(port, ()=>{
        console.log(`server running on port ${port}`)
    })
}).catch((err)=>{console.log(err)});