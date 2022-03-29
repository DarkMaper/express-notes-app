/* const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URI);

(async function() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: false });
        console.log('Connected to database');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()

module.exports = sequelize; */
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Database is connected'))
.catch(err => console.error(err));

module.exports = mongoose.connection.getClient();