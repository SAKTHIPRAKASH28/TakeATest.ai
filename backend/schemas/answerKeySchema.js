const Joi = require('joi');

exports.answerKeyResponseSchema = Joi.object({
  paper_id: Joi.string().required(),
  answer_key: Joi.array().items(
    Joi.object({
      section: Joi.string().required(),
      question_index: Joi.number().integer().required(),
      answer: Joi.string().required()
    })
  ).required()
});

