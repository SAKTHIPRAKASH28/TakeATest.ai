const express=require('express')
const firebase= require('../config/firebaseConnection')

const authHandler = async (req,res,next)=>{
    try{
    const authHeader= req.headers.authorization;
    if (!authHeader){
        throw new Error("User is Unauthorized")
    }
    const token= authHeader.split(" ")[1]
    const decodedToken = await firebase.auth().verifyIdToken(token)
    req.userID=decodedToken
    next()
    }
    catch(err){
        res.status(401)
        next(err)
    } 

}

module.exports = authHandler