const userService = require("../services/userService");

const getAllUsers = async (req, res) => {
  try {
    const getAllUsers = await userService.getAllUsers();
    res.send(getAllUsers);
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
const getUser = async (req, res) => {
  const {
    params: { emailID },
  } = req;
  try {
    if (!emailID) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "User ID can not be empty!" },
      });
    }
    const getUser = await userService.getUser(emailID);
    res.send(getUser);
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
const createNewUser = async (req, res) => {
  const { body } = req;
  if (
    !body.firstName ||
    !body.emailID
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "Request body missing some of the properties",
      },
    });
    return;
  }
  try {
    const user = {
      id: body.id,
      firstName: body.firstName,
      lastName: body.lastName,
      emailID: body.emailID,
      checked: body.checked,
    };
    const createNewUser = await userService.createNewUser(user);
    res.status(201).send(createNewUser);
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
const updateUser = async (req, res) => {
  try {
    const {
      body,
      params: { emailID },
    } = req;
    if (!emailID) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "User ID can not be empty!" },
      });
    }
    const updateUser = await userService.updateUser(body, emailID);
    res.status(202).send(updateUser);
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
const deleteUser = async (req, res) => {
  const {
    params: { emailID },
  } = req;
  if (!emailID) {
    res
      .status(400)
      .send({ status: "FAILED", data: { error: "Email ID can not be empty!" } });
  }
  try {
    const deleteUser = await userService.deleteUser(emailID);
    res
      .status(200)
      .send( deleteUser);
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createNewUser,
  updateUser,
  deleteUser,
};