const { Router } = require('express');
const { listAllNotes, renderCreateNote, createNote, deleteNote, renderEditNote, editNote } = require('../controllers/notes.controllers');
const { isLoggedIn } = require('../middlewares/auth');

const router = Router();

router.get('/', isLoggedIn, listAllNotes);
router.get('/create', isLoggedIn, renderCreateNote);
router.post('/create', isLoggedIn, createNote);
router.delete('/delete/:id', deleteNote);

router.get('/edit/:id', renderEditNote);
router.put('/edit/:id', editNote);

module.exports = router;