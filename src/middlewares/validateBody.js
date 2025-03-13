const { celebrate, Joi } = require('celebrate');  

const validateBody = (schema) => celebrate({ body: schema });  

module.exports = validateBody;  