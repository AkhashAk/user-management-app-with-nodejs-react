// const { customID } = require("../database/utils");
const user = require("../database/userDB")

const getAllUsers = async () => {
  try {
    const getAllUsers = await user.getAllUsers();
    return getAllUsers;
  } catch (error) {
    throw error;
  }
};

const getUser = async(emailID) => {
  try {
    const getUser = await user.getUser(emailID);
    return getUser;
  } catch (error) {
    throw error;
  }
};

const createNewUser = async(newUser) => {
  try {
    const createdUser = await user.createNewUser(newUser);
    return createdUser;
  } catch (error) {
    throw error;
  }
};

const updateUser = async(body, emailID) => {
  try {
    const updateUser = await user.updateUser(body, emailID);
    return updateUser;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async(emailID) => {
  try {
    const deletedUser = await user.deleteUser(emailID);
    return deletedUser;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createNewUser,
  updateUser,
  deleteUser,
};