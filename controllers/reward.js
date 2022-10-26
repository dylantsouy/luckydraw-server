const { Reward } = require('../models');
const { errorHandler } = require('../helpers/responseHelper');
const cloudinary = require('cloudinary').v2;
const { v4: uuidv4 } = require('uuid');
const { numberRegex } = require('../helpers/regex');
const { Op } = require('sequelize');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env['CLOUDINARY_CLOUD_NAME'],
    api_key: process.env['CLOUDINARY_API_KEY'],
    api_secret: process.env['CLOUDINARY_API_SECRECT'],
});

const uploadReward = async (req, res) => {
    try {
        if (req.file == undefined) {
            return res.status(400).json({ message: 'You must select a file.', success: false });
        }
        if (!req.body.name) {
            return res.status(400).json({ message: 'Name is required', success: false });
        }
        if (!req.body.count) {
            return res.status(400).json({ message: 'Count is required', success: false });
        }
        if (!req.body.order) {
            return res.status(400).json({ message: 'Order is required', success: false });
        }
        if (!numberRegex(req.body.count)) {
            return res.status(400).json({ message: 'Count should be number', success: false });
        }
        if (!numberRegex(req.body.order)) {
            return res.status(400).json({ message: 'Order should be number', success: false });
        }
        let id = uuidv4();
        cloudinary.uploader.upload(req.file.path, { public_id: id }, async (error, result) => {
            if (result?.url) {
                let createResult = await Reward.create({
                    id,
                    name: req.body.name,
                    size: result.bytes,
                    count: req.body.count,
                    order: req.body.order,
                    url: result.url,
                    winning: req.body.winning,
                });
                if (createResult) {
                    return res.status(200).json({ message: 'Reward has been uploaded.', success: true });
                }
                return res.status(500).json({ message: `Error when trying upload images: ${error}`, success: false });
            }
        });
    } catch (error) {
        return res.status(500).json({ message: `Error when trying upload images: ${error}`, success: false });
    }
};

const createAdditionalReward = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).json({ message: 'Name is required', success: false });
        }
        if (!req.body.count) {
            return res.status(400).json({ message: 'Count is required', success: false });
        }
        if (!req.body.order) {
            return res.status(400).json({ message: 'Order is required', success: false });
        }
        if (!numberRegex(req.body.count)) {
            return res.status(400).json({ message: 'Count should be number', success: false });
        }
        if (!numberRegex(req.body.order)) {
            return res.status(400).json({ message: 'Order should be number', success: false });
        }
        let id = uuidv4();
        let createResult = await Reward.create({
            id,
            name: req.body.name,
            size: 0,
            count: req.body.count,
            order: req.body.order,
            url: '',
            winning: req.body.winning,
        });
        if (createResult) {
            return res.status(200).json({ message: 'Reward has been uploaded.', success: true });
        }
        return res.status(500).json({ message: `Error when trying upload images`, success: false });
    } catch (error) {
        return res.status(500).json({ message: `Error when trying upload images: ${error}`, success: false });
    }
};

const updateReward = async (req, res) => {
    try {
        const { id } = req.params;
        const { order } = req.body;
        const updateData = await Reward.findOne({ where: { id } });
        const orderData = await Reward.findOne({ where: { order, id: { [Op.not]: id } } });
        if (orderData) {
            await Reward.update(
                { order: updateData.order },
                {
                    where: { id: orderData.id },
                }
            );
        }
        const [updated] = await Reward.update(req.body, {
            where: { id },
        });
        const data = await Reward.findOne({ where: { id } });
        if (updated) {
            return res.status(200).json({ message: 'update success', success: true });
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

const getAllRewards = async (req, res) => {
    try {
        const data = await Reward.findAll({
            order: [['order', 'ASC']],
        });
        return res.status(200).json({ data, success: true });
    } catch (error) {
        return res.status(500).send({ message: errorHandler(error), success: false });
    }
};

const getRewardById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Reward.findOne({
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
    updateReward,
    createAdditionalReward,
};
