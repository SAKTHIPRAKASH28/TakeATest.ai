const express=require('express')
const firebase= require('../config/firebaseConnection')

const authHandler = (req,res,next)=>{
    try{
    const authHeader= req.headers.authorization;
    if (!authHeader){
        res.status(401)
        throw new Error("User is Unauthorized")
    }
    const token= authHeader.split(" ")[1]
    const decodedToken = firebase.auth().verifyIdToken(token)
    req.userID=decodedToken
    next()
    }
    catch(err){
        next(err)
    } 

}

module.exports = authHandler