const validator = require('../helper/model-validation');
const validateScripture = async (req, res, next) => {
    const validationRule = {
        "volume": "required|string",
        "book": "required|string",
        "chapter": "required|numeric",
        "verse": "required|numeric",
        "verse_title": "required|string",
        "scripture_text": "required|string",
        "link": "string",
        "image":"string",
        "topic":"required|array"
    };
    await validator(req, res, next, validationRule);
}

module.exports = {
    validateScripture
};