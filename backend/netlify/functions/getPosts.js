// netlify/functions/posts.js
const mongoose = require('mongoose');
const Posts = require('../../model/postModel'); // Adjust the import path if needed

exports.handler = async function(event, context) {
    const category = req.params.id;
    try {
        const categoryPosts = await posts.find({category:category}).populate("author");
        res.status(200).json(categoryPosts);
      } catch (error) {
        res.json(error);
      }
};
