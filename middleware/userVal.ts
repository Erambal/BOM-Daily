// @ts-ignore
const validator = require('../helper/validateUser');
const valUser = async (req, res, next) => {
    const validationRule = {
        "username": "required|string",
        "fname": "required|string",
        "lname": "required|string",
        "street": "required|string",
        "city": "required|string",
        "state": "required|string",
        "zipcode": "required|string",
        "email": "required|email",
        "phone": "required|string",
        "img_url": "required|string",
        "admin":"boolean"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}
module.exports = {
    valUser
};