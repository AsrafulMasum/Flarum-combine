
const { insertUser, findUser, updateUser, findSingleUser } = require("../../lib/user/user");
const user = require("./../../models/users/user");

const userInsertController = async (req, res) => {
  const userInfo = req.body;
  const filter = { email: userInfo?.email };
  const isExists = await user.findOne(filter);
  if (isExists) {
    return res.send({ exists: true });
  }
  const result = await insertUser(filter,userInfo);
  res.send(result);
};

const userFindController = async (req, res) => {
  const result = await findUser()
  res.send(result)
}

const singleUserFindController = async (req, res) => {
  const userEmail = req.params.email
  const query = {email: userEmail}
  const result = await findSingleUser(query)
  res.send(result)
}

const isAdmin = async (req, res) => {
  try {
    const requestedEmail = req.params.email;
    const loggedInUserEmail = req.decoded.email;

    if (requestedEmail !== loggedInUserEmail) {
      return res.status(403).send({ message: 'Forbidden access' });
    }

    const dbUser = await user.findOne({ email: requestedEmail });
    let isAdmin = false;

    if (dbUser) {
      isAdmin = dbUser.role === 'admin';
    }

    res.send({ admin: isAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
}

const updateUserController = async (req, res) => {
  const userInfo = req.body
  const userEmail = req.params.email
  const filter = {email: userEmail}
  const result = await updateUser(filter,userInfo);
  res.send(result)
}

module.exports = {userInsertController, userFindController, updateUserController, singleUserFindController, isAdmin};
