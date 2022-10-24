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
            return res.status(400).send({ message: 'Username Error', success: false });
        }

        let passwordIsValid = bcrypt.compareSync(req.body.password, data.password);

        if (!passwordIsValid) {
            return res.status(401).send({
                token: null,
                message: 'Invalid Password',
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


const getAllAdmins = async (req, res) => {
    try {
        const data = await Admin.findAll();
        return res.status(200).json({ data, success: true });
    } catch (error) {
        return res.status(500).send({ message: errorHandler(error), success: false });
    }
};

const updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Admin.update(req.body, {
            where: { id },
        });
        const data = await Admin.findOne({ where: { id } });
        if (updated) {
            return res.status(200).json({ data, success: true });
        } else {
            if (data) {
                return res.status(400).send({
                    message: 'unexpected error',
                    success: false,
                });
            } else {
                return res.status(400).send({
                    message: 'ID does not exists',
                    success: false,
                });
            }
        }
    } catch (error) {
        return res.status(500).send({ message: errorHandler(error), success: false });
    }
};

const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Admin.destroy({
            where: { id },
        });
        if (deleted) {
            return res.status(200).send({ message: 'Successful deleted', success: true });
        }
        return res.status(400).send({
            message: 'ID does not exists',
            success: false,
        });
    } catch (error) {
        return res.status(500).send({ message: errorHandler(error), success: false });
    }
};

const deleteAdmins = async (req, res) => {
    try {
        const { ids } = req.body;
        const deleted = await Admin.destroy({
            where: { id: ids },
        });
        if (deleted) {
            return res.status(200).send({ message: 'Successful deleted', success: true });
        }
        return res.status(400).send({
            message: 'ID does not exists',
            success: false,
        });
    } catch (error) {
        return res.status(500).send({ message: errorHandler(error), success: false });
    }
};

const deleteAllAdmin = async (req, res) => {
    try {
        await Admin.destroy({
            truncate: true,
        });
        return res.status(200).send({ message: 'Successful deleted', success: true });
    } catch (error) {
        return res.status(500).send({ message: errorHandler(error), success: false });
    }
};

module.exports = {
    signup,
    signin,
    getAllAdmins,
    deleteAllAdmin,
    updateAdmin,
    deleteAdmin,
    deleteAdmins
};
