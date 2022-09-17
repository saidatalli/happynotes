const Note = require('../models/Note')

module.exports = {
    // GET all notes
    getNotes: async (req,res)=>{
        console.log(req.user)
        try{
            const noteItems = await Note.find({userId:req.user.id})
            const itemsLeft = await Note.countDocuments({userId:req.user.id})
            res.render('notes', 
            {layout: 'layout/notes', notes: noteItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    // GET form to add a new note
    showCreateNoteForm: async (req, res)=>{
        try{
            res.render('createNote', {
                layout: 'layout/login'
            })
        }catch(err){
            console.log(err)
        }
    },
     // POST - add a new note
    createNote: async (req, res)=>{
        try{
            await Note.create({note: req.body.noteItem, userId: req.user.id})
            console.log('Note has been added!')
            res.redirect('/notes')
        }catch(err){
            console.log(err)
        }
    },
    // GET edit form to edit note
    showEditForm: async (req,res)=>{
        try {
            const id = req.params.id
            const oneNote = await Note.findById(id).exec()
            res.render('editNote', {
                layout: 'layout/login',
                note: oneNote
            })
        } catch(err){
            console.log(err)
        }
    },
    // POST - edit note
    editNote: async (req, res)=>{
        try{
            const id = req.params.id
            const data = req.body
            await Note.findByIdAndUpdate(id, {
                note: data.noteItem
            }, { new: true })
            console.log('Note Updated')
            res.redirect('/notes')
        }catch(err){
            console.log(err)
        }
    },
    // GET delete form to delete note
    showDeleteNoteForm: async (req, res)=>{
        try{
            const id = req.params.id
            const oneNote = await Note.findById(id).exec()
            res.render('deleteNote', {
                layout: 'layout/login',
                note: oneNote
            })
        }catch(err){
            console.log(err)
        }
    },
    // POST - delete note
    deleteNote: async (req, res)=>{
        try{
            const id = req.params.id
            const note = await Note.findByIdAndRemove(id)
            if(!note) {
                console.log('Note with the given ID not found')
                res.redirect('/notes')
            } else {
                console.log('Deleted Note')
                res.redirect('/notes')
            }
        }catch(err){
            console.log(err)
        }
    }
}    