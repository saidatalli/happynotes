const Note = require('../models/Note')

module.exports = {
    getNotes: async (req,res)=>{
        console.log(req.user)
        try{
            const noteItems = await Note.find({userId:req.user.id})
            const itemsLeft = await Note.countDocuments({userId:req.user.id,completed: false})
            res.render('notes', 
            {layout: 'layout/notes', notes: noteItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createNote: async (req, res)=>{
        try{
            await Note.create({note: req.body.noteItem, completed: false, userId: req.user.id})
            console.log('Note has been added!')
            res.redirect('/notes')
        }catch(err){
            console.log(err)
        }
    },
    editNote: async (req, res)=>{
        try{
            await Note.findOneAndUpdate({_id:req.body.noteIdFromJSFile}, {
                note: req.body.noteItem
            }, {
                new: true
            })
            console.log('Note Updated')
            res.redirect('/notes')
        }catch(err){
            console.log(err)
        }
    },
    // markComplete: async (req, res)=>{
    //     try{
    //         await Note.findOneAndUpdate({_id:req.body.noteIdFromJSFile},{
    //             completed: true
    //         })
    //         console.log('Marked Complete')
    //         res.json('Marked Complete')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    // markIncomplete: async (req, res)=>{
    //     try{
    //         await Note.findOneAndUpdate({_id:req.body.noteIdFromJSFile},{
    //             completed: false
    //         })
    //         console.log('Marked Incomplete')
    //         res.json('Marked Incomplete')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    deleteNote: async (req, res)=>{
        console.log(req.body.noteIdFromJSFile)
        try{
            await Note.findOneAndDelete({_id:req.body.noteIdFromJSFile})
            console.log('Deleted Note')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    