const Joi = require('joi')

module.exports.generatePaperRequestSchema=Joi.object(
    {
        topic:Joi.string()
        .required()
        .min(3)
        .max(50),
        syllabus:Joi.string()
        .min(1000),
        sections:Joi.array()
        .items(Joi.object({
            mark: Joi.number().integer().required(),
            number_of_questions: Joi.number().integer().required()
         }))
        .max(10).required()   
    }
)

module.exports.modifyQuestionSchema=Joi.object(
    {
        section: Joi.string().required().max(1),
        question_index:Joi.number().greater(0)
        ,
        new_question:Joi.string().required()

          }
)

module.exports.generatePaperResponseSchema =Joi.object({
    paper_id: Joi.string().required(),
    questions: Joi.array().items(
      Joi.object({
        section: Joi.string().required(),
        question: Joi.string().required(),
        marks: Joi.number().integer().required()
      })
    ).required()
  });