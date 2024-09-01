const Joi = require('joi')

const loginUser = {
  body: Joi.object().keys({
    email: Joi.string().email()
      .required(),
      password: Joi.string().required(),
  }),
}
const registerUser = {
  body: Joi.object().keys({
    email: Joi.string().email()
      .required(),
      password: Joi.string().required(),
      firstName: Joi.string().required().allow(),
      lastName: Joi.string().required(),
  }),
}

module.exports={
    loginUser,
    registerUser,
}