const questionPapers = require('../models/papersModel');
const mongoose= require('mongoose')
const model = require('../config/geminiConnection')
const {toJson} = require('json-joi-converter')
const Joi = require('joi')
const schemas = require('../schemas/papersSchema')
const {extractJson} = require('../utils/customJsonParser')
module.exports.getPaperController=async (req, res, next) => {
    try {
        const paper_id = req.params.paper_id;
        if (!mongoose.Types.ObjectId.isValid(paper_id)) {
            const err = new Error('Invalid ID format');
            res.status(400)
            throw err;
        }
        const paper = await questionPapers.findById(paper_id);
        if (!paper) {
            const err = new Error('Paper was not found in the db');
            res.status = 404;
            throw err;
        }
        res.json(paper);
    } catch (err) {
        next(err);
    }
}

module.exports.generatePaperController=async(req,res,next)=>{
    try{
        const { error } = schemas.generatePaperRequestSchema.validate(req.body);
        if(error){
            res.status(400)
            throw new Error("Invalid request body")
        }
        var chatHistory= []
        const chat=model.startChat({history:chatHistory})
        const responseSchema = toJson(schemas.generatePaperResponseSchema);
        const prompt = `Generate a question paper on the topic ${req.body.topic} with syllabus, ${req.body.syllabus || 'Not provided'},with the sections format as ${JSON.stringify(req.body.sections)} make sure that the response follows this schema ${JSON.stringify(responseSchema)}`

        const result = await chat.sendMessage(prompt)
        const response = await result.response;
        const text = response.text();
        chatHistory.push({ role: "model", parts: text });
        res.send(await extractJson(text))
    }
    catch(err){
        next(err)

    }
}