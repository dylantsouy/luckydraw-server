const { User } = require('../models');
const { v4: uuidv4 } = require('uuid');
const { errorHandler } = require('../helpers/responseHelper');
const readXlsxFile = require('read-excel-file/node');

const createUser = async (req, res) => {
    try {
        const data = await User.create(req.body);
        return res.status(200).json({ data, success: true });
    } catch (error) {
        return res.status(500).json({ message: errorHandler(error), success: false });
    }
};

const getAllUsers = async (req, res) => {
    const { companyId } = req.params;
    try {
        const data = await User.findAll({ where: { companyId } });
        return res.status(200).json({ data, success: true });
    } catch (error) {
        return res.status(500).send({ message: errorHandler(error), success: false });
    }
};

const getUserCount = async (req, res) => {
    try {
        const data = await User.count();
        return res.status(200).json({ data, success: true });
    } catch (error) {
        return res.status(500).send({ message: errorHandler(error), success: false });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await User.findOne({
            where: { id },
        });
        if (data) {
            return res.status(200).json({ data, success: true });
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
        const [updated] = await User.update(req.body, {
            where: { id },
        });
        const data = await User.findOne({ where: { id } });
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

const uploadUser = async (req, res) => {
    try {
        if (req.file == undefined) {
            return res.status(400).send('Please upload an excel file!');
        }
        if(req.file.size > 1048576){
            return res.status(400).json({ message: 'File size over 1MB', success: false });
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
                    companyId: req.body.companyId,
                };
                users.push(user);
            });
            User.bulkCreate(users)
                .then(() => {
                    res.status(200).send({
                        message: 'Uploaded the file successfully: ' + req.file.originalname,
                        success: true,
                    });
                })
                .catch((error) => {
                    res.status(500).send({
                        message: error,
                        success: false,
                    });
                });
        });
    } catch (error) {
        res.status(500).send({
            message: 'Could not upload the file: ' + req.file.originalname,
            success: false,
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
    uploadUser,
    getUserCount
};
