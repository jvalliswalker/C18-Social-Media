const { connect, connection} = require('mongoose');

connect('mongodb://localhost:27017/socialMediaAPI');

module.exports = connection;