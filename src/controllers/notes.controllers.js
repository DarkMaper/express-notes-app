const Note = require('../models/Notes');

const listAllNotes = async (req, res) => {
    const userId = req.user._id;

    const notes = await Note.find({ user: userId }).lean();

    res.render('notes', { notes });
}

const renderCreateNote = (req, res) => {
    res.render('createNote');
}

const createNote = async (req, res) => {
    const {title, body} = req.body;
    const userId = req.user._id;

    const newNote = Note({
        title,
        body,
        user: userId
    });

    await newNote.save();

    res.redirect('/');
}

const deleteNote = async (req, res) => {
    const noteId = req.params.id;
    const userId = req.user._id;
    await Note.deleteOne({ _id: noteId, user: userId });
    res.redirect('/');
}

const renderEditNote = async (req, res) => {
    const noteId = req.params.id;
    const userId = req.user._id;

    const note = await Note.findOne({ user: userId, _id: noteId }).lean();

    res.render('editNote', { note });
}

const editNote = async (req, res) => {
    const noteId = req.params.id;
    const userId = req.user._id;

    const { title, body } = req.body;

    const note = await Note.findOne({ user: userId, _id: noteId });

    note.title = title;
    note.body = body;

    await note.save();

    res.redirect('/');
}

module.exports = {
    listAllNotes,
    renderCreateNote,
    createNote,
    deleteNote,
    renderEditNote,
    editNote
}