// netlify/functions/mongodb.js
const mongoose = require('mongoose');

const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  await mongoose.connect(process.env.URL_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
};

module.exports = connectToDatabase;
