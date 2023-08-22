const mongoose= require("mongoose");

const PostSchema = mongoose.Schema({
  title: String,
  category: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timePublished: {
    type: Date,
    required: true,
  },
  description: String,
  imageUrl: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  comments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

//create the athiBlog model instance then export it to routes folder
module.exports=mongoose.model("posts",PostSchema);