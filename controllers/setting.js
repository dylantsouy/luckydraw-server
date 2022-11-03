const { Setting } = require('../models');
const { errorHandler } = require('../helpers/responseHelper');
const cloudinary = require('cloudinary').v2;
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env['CLOUDINARY_CLOUD_NAME'],
    api_key: process.env['CLOUDINARY_API_KEY'],
    api_secret: process.env['CLOUDINARY_API_SECRECT'],
});

const createSetting = async (req, res) => {
    const { companyId } = req.body;
    try {
        const count = await Setting.count({ where: { companyId } });
        if (count > 0) {
            return res.status(400).json({ message: 'setting already exist', success: false });
        }
        const data = await Setting.create(req.body);
        return res.status(200).json({ data, success: true });
    } catch (error) {
        return res.status(500).json({ message: errorHandler(error), success: false });
    }
};

const getSettingById = async (req, res) => {
    const { companyId } = req.params;
    try {
        const data = await Setting.findOne({
            where: { companyId },
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
    const { companyId } = req.body;
    try {
        if (req.file) {
            if (req.file.size > 1048576) {
                return res.status(400).json({ message: 'File size over 1MB', success: false });
            }
            cloudinary.uploader.destroy(`background_${companyId}`, function (result) {
                cloudinary.uploader.upload(
                    req.file.path,
                    { public_id: `background_${companyId}` },
                    async (error, result) => {
                        if (result?.url) {
                            let createResult = await Setting.update(
                                {
                                    ...req.body,
                                    background: result.url,
                                },
                                {
                                    where: { companyId },
                                }
                            );
                            if (createResult) {
                                const data = await Setting.findOne({ where: { companyId } });
                                if (data) {
                                    return res.status(200).json({ data, success: true });
                                } else {
                                    return res.status(400).send({
                                        message: 'unexpected error',
                                        success: false,
                                    });
                                }
                            }
                            return res
                                .status(500)
                                .json({ message: `Error when trying upload images: ${error}`, success: false });
                        }
                    }
                );
            });
        } else {
            const [updated] = await Setting.update(req.body, {
                where: { companyId },
            });
            const data = await Setting.findOne({ where: { companyId } });
            if (updated) {
                return res.status(200).json({ data, success: true });
            } else {
                return res.status(400).send({
                    message: 'unexpected error',
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
