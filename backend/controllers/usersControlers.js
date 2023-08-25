const bcrypt = require("bcrypt");
const { generated } = require("../controllers/generateToken");
const postModel = require("../model/postModel");
const userModel = require("../model/usersModel");

//register new user
const registerUser = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    if (!email || !password) { return res.status(400).json("please enter password and email") };
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser){
      return res.status(400).json("user already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userToSave=new userModel({
      password: hashedPassword,
      email:email,
      userName:username
    });
    const saveUser=await userToSave.save()
    return res.status(200).json("successfully registerd");
  } catch (error) {
    console.log(error.message)
   res.status(500).json({ error: 'Internal server error.' });
  }
};

//Verify logged in details
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) { return res.status(400).json("email or password cannot be empty") };
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(401).json("user not found")
    } 
      const decoded = await bcrypt.compare(password, existingUser.password);
      if (!decoded) {
        return res.status(401).json("invalid password");
      } 
        existingUser.password = undefined;
        const userPosts = await postModel.find({ author: existingUser._id });
        let combinedObject = {
          user: existingUser,
          userPosts: userPosts,
          token: generated(existingUser._id),
        };
        res.set("Authorization", `Bearer ${generated(existingUser._id)}`);
        return res.status(200).json(combinedObject);
  } catch (error) {
    return res.json(error.message);
  }
};
const logout = async (req, res) => {
  const tokenExists = req.headers["authorization"];
  if (tokenExists) {
    return res.status(403).json("no token")
  } 
     req.header["authorization"] = null;
    res.status(200).json("logged out successfully");
};
//getting all users
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json(users);
  } catch (err) {
    res.json(err);
  }
};

const getUser = async (req, res) => {
  try {
    const user = req.params.id;
    if (user === req.userId) {
      const userLogged = await userModel.find({ _id: user });
      res.json(userLogged);
    } else {
      res.json("user not authorised");
    }
  } catch (error) {
    res.json(error);
  }
};
// Creating a new user
const createUser = async (req, res) => {
  const { firstName, lastName, country, password, email } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      password: hashedPassword,
      email,
      firstName,
      lastName,
      country,
    });
    res.status(200).header["authorization"] = "Token " + token(user._id);
    res.json(user);
  } catch (err) {
    res.json(err);
  }
};

//Deleting existing user
const deleteUser = async (req, res) => {
  const { userName } = req.body;
  try {
    const deleted = await userModel.deleteOne({ userName: userName });
    res.json(deleted);
  } catch (err) {
    res.json(err);
  }
};
module.exports = {
  getUsers,
  createUser,
  deleteUser,
  registerUser,
  loginUser,
  logout,
  getUser,
};
