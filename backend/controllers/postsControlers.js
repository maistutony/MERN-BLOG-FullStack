const { response } = require("express");
const posts = require("../model/postModel");
const users = require("../model/usersModel");

const createPost = async (req, res) => {
  const { title, description, content, category,imageUrl } = req.body;
  if (!title && content && category) {
    return res.json("supply a title");
  }
  const user = req.userId;
   const postToSave = new posts({
     title,
     category,
     content,
     imageUrl,
     description,
     author: user,
     timePublished: new Date().toLocaleString(),
   });
  try {
    const postSaved = await postToSave.save()
    return res.status(200).json(postSaved);
  } catch (error) {
    console.log(error.message);
  }
};
const getPosts = async (req, res) => {
  try {
    const allPosts = await posts.find({ });
    res.json(allPosts);
  } catch (error) {
    res.json(error);
  }
};
const getPostsByCategory = async (req, res) => {
  const category = req.params.id
  try {
    const categoryPosts = await posts.find({category:category}).populate("author");
    res.status(200).json(categoryPosts);
  } catch (error) {
    res.json(error);
  }
};
const getSinglePost = async (req, res) => {
  const id = req.params.id;
  try {
    const post=await posts.find({_id:id})
    res.status(200).json(post);
  } catch (error) {
    res.json(error.message);
  }
};
const deletePost = async (req, res) => {
  const id = req.params.id;
  const verifiedId = req.userId;
  try {
    const postToDelete = await posts.findOne({ _id: id })
    if (!postToDelete) {
      return res.status(404).json("post not found");
    } 
    const postAuthorId = postToDelete.author.toString();
    if (postAuthorIds !== verifiedId) {
      return res.status(200).json("not authorized");
    }
            postToDelete.remove();
    const userPosts = await posts.find({ author: verifiedId });
    res.status(200).json(userPosts);
  } catch (error) {
    res.json(error.message);
  }
};
const editPost = async (req, res) => {
  const id = req.params.id;
  const { title, description, content, category,imageUrl } = req.body;
  const newPost = {
    title,
    category,
    imageUrl,
    content,
    description,
    timeUpdated: new Date().toLocaleString(),
  };
  const verifiedId = req.userId;
  try {
    const postToEdit = await posts.findOne({ _id: id });
    if (!postToEdit) {
      return res.status(404).json("post not found");
    }
    console.log(postToEdit);
    if (postToEdit.author.toLocaleString() !== verifiedId) {
      return res.status(403).json("not the author");
    }

    const editedPost = await posts.updateMany(
      { _id: id },
       newPost ,
      { new: true },
    );
    if (editedPost.nModified === 0) {
      // Check nModified for success
      res.status(401).json("Not edited");
    } else {
      res.status(200).json("updated");
    }
  } catch (error) {
    res.json(error.message);
  }
};
const queryDataBase = async (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(403).json("no query string");
  }
  try {
  const searched = await posts.find({
    $text: { $search: query },
  });
    if (searched) {
      res.status(200).json(searched)
  }
  } catch (error) {
    return res
      .status(500)
      .json({ message:error.message });
}
  

}
module.exports = {queryDataBase,getSinglePost,getPosts,getPostsByCategory, deletePost, createPost, editPost };
