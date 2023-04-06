// @ts-ignore
const validator = require('../helper/model-validation');
// @ts-ignore
const validateSetting = async (req, res, next) => {
    const validationRule = {
        "name": "required|string",
        "code": "required|string",
        "options":"required|array"
    };
    await validator(req, res, next, validationRule);
}

module.exports = {
    validateSetting
};