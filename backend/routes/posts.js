const express=require('express');
const {queryDataBase,getSinglePost,createPost,getPosts,deletePost, editPost,getPostsByCategory}=require("../controllers/postsControlers")
const authUser=require("../middlewares/authUser")
const routes=express.Router()

routes.get("/posts", getPosts);
routes.get("/post/:id", getPostsByCategory);
routes.get("/posts/:id", getSinglePost);
routes.post("/posts", authUser, createPost)
routes.put("/posts/:id", authUser, editPost);
routes.delete("/posts/:id", authUser, deletePost)
routes.get("/search", queryDataBase);
//export the routes instance for post routes
module.exports=routes;