const { User } = require('../models');
const { v4: uuidv4 } = require('uuid');
const { errorHandler } = require('../helpers/responseHelper');
const readXlsxFile = require('read-excel-file/node');

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

const deleteUsers = async (req, res) => {
    try {
        const { ids } = req.body;
        const deleted = await User.destroy({
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

const deleteAllUser = async (req, res) => {
    try {
        await User.destroy({
            truncate: true,
        });
        return res.status(200).send({ message: 'Successful deleted', success: true });
    } catch (error) {
        return res.status(500).send({ message: errorHandler(error), success: false });
    }
};

const uploaduser = async (req, res) => {
    try {
        if (req.file == undefined) {
            return res.status(400).send('Please upload an excel file!');
        }
        let path = './resources/static/assets/uploads/' + req.file.filename;
        readXlsxFile(path).then((rows) => {
            // skip header
            rows.shift();
            let users = [];
            rows.forEach((row) => {
                let user = {
                    id: uuidv4(),
                    code: row[0],
                    name: row[1],
                };
                users.push(user);
            });
            User.bulkCreate(users)
                .then(() => {
                    res.status(200).send({
                        message: 'Uploaded the file successfully: ' + req.file.originalname,
                    });
                })
                .catch((error) => {
                    res.status(500).send({
                        message: 'Fail to import data into database!',
                        error: error.message,
                    });
                });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Could not upload the file: ' + req.file.originalname,
        });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    deleteUsers,
    deleteAllUser,
    uploaduser
};
