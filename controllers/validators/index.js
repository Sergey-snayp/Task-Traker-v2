module.exports = {
  authValidators: require('./authValidators'),
  userValidators: require('./userValidators'),
  taskValidators: require('./taskValidators'),
  validate: (data, schema) => {
    const result = schema.validate(data, { abortEarly: false });

    if (result.error) return { validationError: result.error };

    return { params: result.value };
  },
};
