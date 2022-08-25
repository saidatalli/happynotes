const deleteBtn = document.querySelectorAll('.deleteButton')
const editBtn = document.querySelectorAll('.editButton')
// const noteItem = document.querySelectorAll('span.not')
// const noteComplete = document.querySelectorAll('span.completed')
const item = document.querySelector('.noteItem')



Array.from(editBtn).forEach((el)=>{
    el.addEventListener('click', editNote)
})
Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteNote)
})

// Array.from(noteItem).forEach((el)=>{
//     el.addEventListener('click', markComplete)
// })

// Array.from(noteComplete).forEach((el)=>{
//     el.addEventListener('click', markIncomplete)
// })

async function editNote(){
    const dataID = item.getAttribute('data-id')
    const noteId = dataID
    console.log(noteId)
    try {
        const response = await fetch('notes/editNote', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'noteIdFromJSFile': noteId
            })
        })
        const data = await response.json()
        console.log(data)
        // location.reload()
    } catch(err){
        console.log(err)
    }
} 
async function deleteNote(){
    const dataID = item.getAttribute('data-id')
    const noteId = dataID
    console.log(noteId)
    try {
        const response = await fetch('notes/deleteNote', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'noteIdFromJSFile': noteId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err){
        console.log(err)
    }
}

// async function markComplete(){
//     const dataID = item.getAttribute('data-id')
//     const noteId = dataID
//     try {
//         const response = await fetch('notes/markComplete', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'noteIdFromJSFile': noteId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     } catch(err){
//         console.log(err)
//     }
// }

// async function markIncomplete(){
//     const dataID = item.getAttribute('data-id')
//     const noteId = dataID
//     try {
//         const response = await fetch('notes/markIncomplete', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'noteIdFromJSFile': noteId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     } catch(err){
//         console.log(err)
//     }
// }

// Sidebar - Mobile Menu
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, 'left');
})

// Modal
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, 0.5);
});