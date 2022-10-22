const { Admin } = require('../models');
const { errorHandler } = require('../helpers/responseHelper');
const config = require('../config/auth.config');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const signup = async (req, res) => {
    try {
        if (!/^[a-z0-9]{8,50}$/i.test(req?.body?.password))
            return res.status(400).json({ message: "Validation is on password failed", success: false });
        req.body.password = bcrypt.hashSync(req.body.password, 8);
        await Admin.create(req.body);
        return res.status(200).json({ message:"Successful Created", success: true });
    } catch (error) {
        return res.status(500).json({ message: errorHandler(error), success: false });
    }
};

const signin = async (req, res) => {
    try {
        const data = await Admin.findOne({
            where: {
                username: req.body.username,
            },
        });
        if (!data) {
            return res.status(400).send({ message: 'username error', success: false });
        }

        let passwordIsValid = bcrypt.compareSync(req.body.password, data.password);

        if (!passwordIsValid) {
            return res.status(401).send({
                token: null,
                message: 'Invalid Password!',
                success: false,
            });
        }

        let token = jwt.sign({ id: data.id }, config.secret, {
            expiresIn: 86400, // 24 hours
        });

        res.status(200).send({
            data: {
                id: data.id,
                username: data.username,
                email: data.email,
            },
            token,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({ message: errorHandler(error), success: false });
    }
};
module.exports = {
    signup,
    signin,
};
