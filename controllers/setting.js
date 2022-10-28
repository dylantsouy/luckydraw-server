const { Setting } = require('../models');
const { errorHandler } = require('../helpers/responseHelper');

const createSetting = async (req, res) => {
    try {
        const count = await Setting.count();
        if (count > 0) {
            return res.status(400).json({ message: 'setting already exist', success: false });
        }
        req.body.id = 0;
        const data = await Setting.create(req.body);
        return res.status(200).json({ data, success: true });
    } catch (error) {
        return res.status(500).json({ message: errorHandler(error), success: false });
    }
};

const getSettingById = async (req, res) => {
    try {
        const data = await Setting.findOne({
            where: { id: 0 },
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

const updateSetting = async (req, res) => {
    try {
        req.body.id = 0;
        const [updated] = await Setting.update(req.body, {
            where: { id : 0 },
        });
        const data = await Setting.findOne({ where: { id : 0 } });
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

module.exports = {
    createSetting,
    getSettingById,
    updateSetting,
};
