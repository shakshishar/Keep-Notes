const addButton = document.getElementById('add');

// Function to add a new note
const addNewNote = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('note');
    const htmlData = `
        <div class="operation">
            <button class="save">Save</button>
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main">
            <textarea class="">${text}</textarea>
        </div>`;
      
    note.insertAdjacentHTML('afterbegin', htmlData);

    // Getting the references
    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const maindiv = note.querySelector('.main');
    const textarea = note.querySelector('textarea');
    const saveButton = note.querySelector('.save');
    
    // Delete a note
    delButton.addEventListener('click', () => {
        note.remove();
        updateLSData();
    });

    // Toggle edit mode using the edit button
    editButton.addEventListener('click', () => {
        textarea.removeAttribute('readonly');
    });
    
    // Make textarea non-editable when the save button is clicked
    saveButton.addEventListener('click', () => {
        textarea.setAttribute('readonly', true);
        updateLSData();
    });

    document.body.appendChild(note);
};

// Function to update local storage data
const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];

    textAreaData.forEach((note) => {
        notes.push(note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes));
};

// Get data from local storage and populate the textareas
const notes = JSON.parse(localStorage.getItem('notes'));
if (notes) {
    notes.forEach((noteText) => {
        addNewNote(noteText);
    });
}

addButton.addEventListener('click', () => addNewNote());
