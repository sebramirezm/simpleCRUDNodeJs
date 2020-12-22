const mongoose = require('mongoose');

const strCon = 'mongodb+srv://${user}:${pass}@${dbIRL/endpoint}?retryWrites=true&w=majority';

const dbConn = mongoose.connect(strCon, { useNewUrlParser: true, useUnifiedTopology: true }, console.log('Database connections success.'));

module.exports = { dbConn }