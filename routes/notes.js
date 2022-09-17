const express = require('express')
const router = express.Router()
const notesController = require('../controllers/notes') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureAuth, notesController.getNotes)

router.get('/createNote', notesController.showCreateNoteForm)

router.post('/createNote', notesController.createNote)

router.get('/editNote/:id', notesController.showEditForm)

router.post('/editNote/:id', notesController.editNote)

router.get('/deleteNote/:id', notesController.showDeleteNoteForm)


router.post('/deleteNote/:id', notesController.deleteNote)

module.exports = router