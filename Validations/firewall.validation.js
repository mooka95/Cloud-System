const Joi = require('joi')

const addVirtualMachine = {
  body: Joi.object().keys({
    hostname: Joi.string()
      .required(),
      isActive: Joi.boolean()
      .required(),
      OperatingSystem: Joi.string()
      .required(),
  }),
}

module.exports = {
    addVirtualMachine,

  }