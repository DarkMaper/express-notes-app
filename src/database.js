require('dotenv').config()
const mongoose = require('mongoose');

const client = mongoose.connect(process.env.MONGODB_URI)
.then(db => {
    console.log('Database is connected');
    return db.connection.getClient();
})
.catch(err => console.error(err));

module.exports = client;