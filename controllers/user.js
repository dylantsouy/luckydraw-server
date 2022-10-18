const { User } = require("../models");

const createUser = async (req, res) => {
  try {
    const resutlt = await User.create(req.body);
    return res.status(200).json({ resutlt, success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const resutlt = await User.findAll();
    return res.status(200).json({ resutlt, success: true });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await result.findOne({
      where: { id: id },
    });
    if (result) {
      return res.status(200).json({ result, success: true });
    }
    return res.status(400).send({
      message: "ID does not exists",
      success: false,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
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
      where: { id: id },
    });
    if (updated) {
      console.log(updated);
      const resutlt = await User.findOne({ where: { id: id } });
      return res.status(200).json({ resutlt, success: true });
    }
    return res.status(400).send({
      message: "ID does not exists",
      success: false,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({
      where: { id: id },
    });
    if (deleted) {
      return res
        .status(200)
        .send({ message: "Successful deleted", success: true });
    }
    return res.status(400).send({
      message: "ID does not exists",
      success: false,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
