const express=require('express')
const {registerUser,loginUser,logout,getUser,getUsers,deleteUser} =require("../controllers/usersControlers")
const authUser=require("../middlewares/authUser")
const usersRoutes=express.Router()

//middlewares
usersRoutes.post("/register",registerUser);
usersRoutes.post("/login",loginUser);
usersRoutes.post("/logout",logout);
usersRoutes.get("/users",getUsers);
usersRoutes.get("/users/:id",authUser,getUser);
usersRoutes.delete("/users",deleteUser);


module.exports=usersRoutes;