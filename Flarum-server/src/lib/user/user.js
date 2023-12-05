const user = require("./../../models/users/user");

const insertUser = async (filter, userInfo) => {
  const options = { upsert: true };
  const updatedUser = {
    $set: {
      email: userInfo?.email,
      name: userInfo?.name,
      photoURL: userInfo?.photoURL,
      role: userInfo?.role,
      badge: userInfo?.badge,
    },
  };
  const result = await user.updateOne(filter, updatedUser, options);

  return result;
};

const findUser = async () => {
  const result = await user.find();
  return result;
};

const findSingleUser = async (query) => {
  const result = await user.findOne(query);
  return result;
};

const updateUser = async (filter, userInfo) => {
  const options = { upsert: true };
  const updatedUser = {
    $set: {
      role: userInfo?.role,
      badge: userInfo?.badge,
    },
  };
  const result = await user.updateOne(filter, updatedUser, options);
  return result;
};

module.exports = {insertUser, findUser, updateUser, findSingleUser};
