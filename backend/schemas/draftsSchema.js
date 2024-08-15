const Joi= require('joi')

exports.saveDraftSchema= Joi.object(
    {
        paper_id:Joi.string().required(),
        questions:Joi.array().items(
            Joi.object({
                section:Joi.string().required(),
                question:Joi.string().required(),
                marks:Joi.number().greater(0)

            })
        )
    }
)

