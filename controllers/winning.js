const { Winning, User, Reward } = require('../models');
const { errorHandler } = require('../helpers/responseHelper');

const createWinning = async (req, res) => {
    try {
        const data = await Winning.create(req.body);
        return res.status(200).json({ data, success: true });
    } catch (error) {
        return res.status(500).json({ message: errorHandler(error), success: false });
    }
};

const getAllWinnings = async (req, res) => {
    try {
        const data = await Winning.findAll({
            include: [
                { association: 'User', attributes: ['name', 'code'], paranoid: false },
                {
                    association: 'Reward',
                    attributes: ['name'],
                    paranoid: false,
                },
            ],
        });
        return res.status(200).json({ data, success: true });
    } catch (error) {
        return res.status(500).send({ message: errorHandler(error), success: false });
    }
};

const deleteWinning = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Winning.destroy({
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

const deleteWinnings = async (req, res) => {
    try {
        const { ids } = req.body;
        const deleted = await Winning.destroy({
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

const deleteAllWinning = async (req, res) => {
    try {
        await Winning.destroy({
            truncate: true,
        });
        return res.status(200).send({ message: 'Successful deleted', success: true });
    } catch (error) {
        return res.status(500).send({ message: errorHandler(error), success: false });
    }
};
module.exports = {
    createWinning,
    getAllWinnings,
    deleteAllWinning,
    deleteWinning,
    deleteWinnings,
};
