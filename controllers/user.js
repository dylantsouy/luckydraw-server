const { User } = require('../models');
const { v4: uuidv4 } = require('uuid');
const { errorHandler } = require('../helpers/responseHelper');

const createUser = async (req, res) => {
    try {
        req.body.id = uuidv4();
        const result = await User.create(req.body);
        return res.status(200).json({ result, success: true });
    } catch (error) {
        return res.status(500).json({ message: errorHandler(error), success: false });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const result = await User.findAll();
        return res.status(200).json({ result, success: true });
    } catch (error) {
        return res.status(500).send({ message: errorHandler(error), success: false });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await result.findOne({
            where: { id },
        });
        if (result) {
            return res.status(200).json({ result, success: true });
        }
        return res.status(400).send({
            message: 'ID does not exists',
            success: false,
        });
    } catch (error) {
        return res.status(500).send({ message: errorHandler(error), success: false });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.body.id) {
            return res.status(400).send({
                message: "Can't update id",
                success: false,
            });
        }
        const [updated] = await User.update(req.body, {
            where: { id },
        });
        const result = await User.findOne({ where: { id } });
        if (updated) {
            return res.status(200).json({ result, success: true });
        } else {
            if (result) {
                return res.status(400).send({
                    message: 'Error',
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

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await User.destroy({
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

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
