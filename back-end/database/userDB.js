const User = require("./userModel");

const getAllUsers = async () => {
  try {
    const result = await User.find({});
    return result;
  } catch (err) {
    throw err;
  }
};

const getUser = async (id) => {
  try {
    const retrivedUser = await User.findOne({id: id});
    if (!retrivedUser) {
      return ({
        status: 404,
        message: `User not found`,
      });
    }
    return retrivedUser;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewUser = async (newUser) => {
  try {
    // const isPresent = DB.users.findIndex((user) => user.userName == newUser.userName) > -1;
    const isUserPresent = await User.findOne({ id: newUser.id });
    if (isUserPresent) {
      return ({
        status: 400,
        message: `User with id ${newUser.id} already exists`,
      });
    }
    // DB.users.push(newUser);
    const createdUser = await User.create(newUser);
    return createdUser;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const updateUser = async (user, id) => {
  try {
    // const retrivedUser = DB.users.findIndex((user) => user.id == id);
    // const retrivedUser = await getUser(id);
    // if (!retrivedUser) {
    //   return ({
    //     status: 404,
    //     message: `User with Email ID: ${id} doesn't exist`,
    //   });
    // }
    // DB.users[retrivedUser] = updatedUser;
    const updatedUser = await User.findOneAndUpdate({ id: id } , user, {new: true} );
    return updatedUser;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const deleteUser = async (id) => {
  try {
    // const retrivedUser = DB.users.findIndex((user) => user.id == id);
    const retrivedUser = getUser(id);
    if (!retrivedUser) {
      throw {
        status: 404,
        message: `User with Email ID: ${id} doesn't exist`,
      };
    }
    // DB.users.splice(retrivedUser, 1);
    const deletedUser = await User.findOneAndDelete({ id: id }, { new: true});
    return deletedUser;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createNewUser,
  updateUser,
  deleteUser,
};