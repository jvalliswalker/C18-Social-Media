const { connect, connection} = require('mongoose');

connect();

module.exports = connection;