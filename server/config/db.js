const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  writeConcern: {
    w: 'majority' // or another valid write concern mode
  }
});


const db = mongoose.connection;
module.exports = db;