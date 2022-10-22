const { Reward } = require('../models');
const { errorHandler } = require('../helpers/responseHelper');
const fs = require("fs");

const uploadReward = async (req, res) => {
    try {
        if (req.file == undefined) {
            return  res.status(400).json({ message: 'You must select a file.', success: false });
        }
        Reward.create({
            type: req.file.mimetype,
            name: req.file.originalname,
            data: fs.readFileSync(__basedir + '/resources/static/assets/uploads/' + req.file.filename),
        }).then((image) => {
            fs.writeFileSync(__basedir + '/resources/static/assets/tmp/' + image.name, image.data);

            return  res.status(200).json({ message: 'Reward has been uploaded.', success: true });
        });
    } catch (error) {
        return  res.status(500).json({ message: `Error when trying upload images: ${error}`, success: false });
    }
};

const getAllRewards = async (req, res) => {
    try {
        const result = await Reward.findAll();
        return res.status(200).json({ result, success: true });
    } catch (error) {
        return res.status(500).send({ message: errorHandler(error), success: false });
    }
};

const getRewardById = async (req, res) => {
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

const deleteReward = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Reward.destroy({
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

const deleteRewards = async (req, res) => {
    try {
        const { ids } = req.body;
        const deleted = await Reward.destroy({
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

const deleteAllReward = async (req, res) => {
    try {
        await Reward.destroy({
            truncate: true,
        });
        return res.status(200).send({ message: 'Successful deleted', success: true });
    } catch (error) {
        return res.status(500).send({ message: errorHandler(error), success: false });
    }
};

module.exports = {
    uploadReward,
    getAllRewards,
    getRewardById,
    deleteReward,
    deleteRewards,
    deleteAllReward,
};