require('dotenv').config();
const mongoose = require('mongoose');

let isConnected = false;

const connect = async()=>{
    try{
        if(isConnected){
        return;
        }
        console.log("connecting to DB");
        await mongoose.connect(process.env.MONGO_URL,{
            dbName:process.env.DB_NAME
        });
        isConnected = true;
        console.log("connected to the db");
    }
    catch(err){
        console.log("error connecting to DB",err);
        process.exit(1);
    }
}

const disconnect = async()=>{
    try{
        if(!isConnected)return;
        await mongoose.connection.close();
        isConnected = false;
        console.log("disconnected from DB");
    }
    catch(err){
        console.log("error disconnecting from db", err);
    }
}

const getDB = ()=> mongoose.connection;

module.exports = {connect, disconnect, getDB};