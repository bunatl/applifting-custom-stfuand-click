const Joi = require('joi');

const schema = Joi.object({
    team: Joi.string()
        .required(),
});

module.exports = schema;