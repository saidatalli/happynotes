// Sidebar - Mobile Menu
document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.sidenav');
    const instances = M.Sidenav.init(elems, 'left');
})

// Input field - Select
document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('select');
    const instances = M.FormSelect.init(elems);
});
