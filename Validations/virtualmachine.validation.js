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
const deleteVirtualMachine = {
    params: Joi.object()
    .options({ abortEarly: true })
    .keys({
      id: Joi.string().required().label('virtualmachine id'),
    }),
}

module.exports = {
    addVirtualMachine,
    deleteVirtualMachine,
  }