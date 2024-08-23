let currentEditBox = null;
function addBox() {
    const txt1 = document.getElementById('tbuser');
    const noteContent = document.getElementById('noteContent').value;
    if (txt1.value.trim() === "" || noteContent.trim() === "") {
        alert("Please fill in both title and content.");
        return;
    }
    const container = document.getElementById('container');
    const newBox = document.createElement('div');
    newBox.className = 'box';
    newBox.setAttribute('onclick', 'editBox(this)');
    const fullDate = getFullDate();
    const shortDate = getShortDate(fullDate);
    const note = {
        title: txt1.value,
        content: noteContent,
        date: fullDate
    };
    newBox.innerHTML = `<p class="title">${note.title}</p><p class="date">${shortDate}</p>`;
    newBox.dataset.title = note.title;
    newBox.dataset.content = note.content;
    newBox.dataset.date = fullDate;
    const boxCount = container.getElementsByClassName('box').length;
    if (boxCount % 2 === 1) {
        newBox.classList.add('even');
    }
    container.appendChild(newBox);
    txt1.value = '';
    document.getElementById('noteContent').value = '';
    setCurrentDate();
    saveNotesToLocalStorage();
}
function saveNotesToLocalStorage() {
    const notes = [];
    const boxes = document.querySelectorAll('#container .box');
    boxes.forEach(box => {
        notes.push({
            title: box.dataset.title,
            content: box.dataset.content,
            date: box.dataset.date
        });
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}
function loadNotesFromLocalStorage() {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const container = document.getElementById('container');
    notes.forEach((note, index) => {
        const newBox = document.createElement('div');
        newBox.className = 'box';
        newBox.setAttribute('onclick', 'editBox(this)');

        const shortDate = getShortDate(note.date);

        newBox.innerHTML = `<p class="title">${note.title}</p><p class="date">${shortDate}</p>`;
        newBox.dataset.title = note.title;
        newBox.dataset.content = note.content;
        newBox.dataset.date = note.date;
        if (index % 2 === 1) {
            newBox.classList.add('even');
        }
        container.appendChild(newBox);
    });
}
window.onload = function () {
    setCurrentDate();
    loadNotesFromLocalStorage();
};
function editBox(box) {
    currentEditBox = box;
    const editTitle = document.getElementById('editTitle');
    const editContent = document.getElementById('editContent');
    const editTime = document.getElementById('editTime');
    editTitle.value = box.dataset.title;
    editContent.value = box.dataset.content;
    editTime.textContent = box.dataset.date;
    document.getElementById('notebox').style.display = 'none';
    document.getElementById('editbox').style.display = 'block';
}
function saveEdit() {
    if (currentEditBox) {
        const editTitle = document.getElementById('editTitle').value;
        const editContent = document.getElementById('editContent').value;
        const editTime = document.getElementById('editTime').textContent;
        const shortDate = getShortDate(editTime);
        currentEditBox.dataset.title = editTitle;
        currentEditBox.dataset.content = editContent;
        currentEditBox.dataset.date = editTime;
        currentEditBox.innerHTML = `<p class="title">${editTitle}</p><p class="date">${shortDate}</p>`;
        document.getElementById('notebox').style.display = 'block';
        document.getElementById('editbox').style.display = 'none';
        currentEditBox = null;
        saveNotesToLocalStorage();
    }
}
function deleteNote() {
    if (currentEditBox) {
        currentEditBox.remove();
        document.getElementById('notebox').style.display = 'block';
        document.getElementById('editbox').style.display = 'none';
        currentEditBox = null;
        saveNotesToLocalStorage();
    }
}
function getFullDate() {
    const today = new Date();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = dayNames[today.getDay()];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[today.getMonth()];
    const date = today.getDate();
    let hour = today.getHours();
    let minutes = today.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${day}, ${month} ${date} at ${hour}:${minutes}`;
}
function getShortDate(fullDate) {
    const parts = fullDate.split(' ');
    return `${parts[1]} ${parts[2]}`;
}
function setCurrentDate() {
    const today = new Date();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = dayNames[today.getDay()];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[today.getMonth()];
    const date = today.getDate();
    let hour = today.getHours();
    let minutes = today.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedDate = `${day}, ${month} ${date} at ${hour}:${minutes}`;
    document.getElementById('time').textContent = formattedDate;
}