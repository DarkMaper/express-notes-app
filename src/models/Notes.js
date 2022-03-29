/* const { DataTypes } = require('sequelize');
const db = require('../database');
const User = require('./Users');

const Note = db.define('Note', {
    title: { type: DataTypes.STRING },
    body: { type: DataTypes.STRING }
})

User.hasMany(Note); */
const { Schema, model } = require('mongoose');

const NoteSchema = new Schema({
    title: { type: String },
    body: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = model('Note', NoteSchema);