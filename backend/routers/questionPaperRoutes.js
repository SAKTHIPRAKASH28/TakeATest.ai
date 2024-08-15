const express = require('express')
const router = express.Router()
const questionPapers=require('../models/papersModel')



router.get("/:paper_id",async (req,res,next)=>{
    try{
        const id = req.params.paper_id
        const paper=await questionPapers.findById(id)
        res.json(paper)
    }
    catch(err){
        res.status(404)
        next(err)
    }
})

module.exports=router 