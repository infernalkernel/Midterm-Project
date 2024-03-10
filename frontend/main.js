// DOM elements
let titleInput = document.getElementById('title');
let isbnInput = document.getElementById('isbn');
let descInput = document.getElementById('desc');
let textbooks = document.getElementById('textbooks');
let msg = document.getElementById('msg');
let titleEditInput = document.getElementById('title-edit');
let isbnEditInput = document.getElementById('isbn-edit');
let descEditInput = document.getElementById('desc-edit');
let textbookId = document.getElementById('textbook-id');
let msgEdit = document.getElementById('msg-edit');

// API endpoint
const api = 'http://127.0.0.1:8000';

// Data array to store textbooks
let data = [];
let selectedTextbook = {};

// Function to add a textbook
let addTextbook = (title, isbn, description) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status == 201) {
        const newTextbook = JSON.parse(xhr.responseText);
        data.push(newTextbook);
        refreshTextbooks();
      } else {
        console.error('Error adding textbook:', xhr.status);
        // Display error message to the user
        if (msg) {
          msg.innerHTML = 'Error adding textbook';
        }
      }
    }
  };
  xhr.open('POST', `${api}/textbooks`, true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify({ title, ISBN: isbn, description }));
};

// Function to edit a textbook
let editTextbook = (title, ISBN, description) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Update the selected textbook in the data array
        selectedTextbook.title = title;
        selectedTextbook.description = description;
        selectedTextbook.ISBN = ISBN;
        refreshTextbooks();
        // Clear form fields after successful edit
        resetForm();
      } else {
        console.error('Error editing textbook:', xhr.status);
        // Display error message to the user
        if (msgEdit) {
          msgEdit.innerHTML = 'Error editing textbook';
        }
      }
    }
  };
  xhr.open('PUT', `${api}/textbooks/${selectedTextbook.id}`, true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify({ title, ISBN, description }));
};

// Function to delete a textbook
let deleteTextbook = (id) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 204) {
        // Remove the deleted textbook from the data array
        data = data.filter((textbook) => textbook.id !== id);
        refreshTextbooks();
      } else {
        console.error('Error deleting textbook:', xhr.status);
        // Display error message to the user
        if (msg) {
          msg.innerHTML = 'Error deleting textbook';
        }
      }
    }
  };
  xhr.open('DELETE', `${api}/textbooks/${id}`, true);
  xhr.send();
};

// Function to refresh the textbooks displayed on the page
let refreshTextbooks = () => {
  textbooks.innerHTML = '';
  data.forEach((textbook) => {
    textbooks.innerHTML += `
      <div id="textbook-${textbook.id}" class="textbook">
        <span class="fw-bold fs-4">${textbook.title}</span>
        <span>ISBN: ${textbook.ISBN}</span>
        <pre class="text-secondary ps-3">${textbook.description}</pre>
        <div class="options">
          <i onClick="tryEditTextbook(${textbook.id})" data-bs-toggle="modal" data-bs-target="#modal-edit" class="fas fa-edit"></i>
          <i onClick="deleteTextbook(${textbook.id})" class="fas fa-trash-alt"></i>
        </div>
      </div>
    `;
  });
};

// Function to reset form fields
let resetForm = () => {
  titleInput.value = '';
  isbnInput.value = '';
  descInput.value = '';
};

// Function to handle adding a textbook form submission
document.getElementById('form-add').addEventListener('submit', (e) => {
  e.preventDefault();
  if (!titleInput.value) {
    msg.innerHTML = 'Textbook title cannot be blank';
  } else {
    addTextbook(titleInput.value, isbnInput.value, descInput.value);
    // Close modal after adding textbook
    let add = document.getElementById('add');
    add.setAttribute('data-bs-dismiss', 'modal');
    add.click();
    add.setAttribute('data-bs-dismiss', '');
  }
});

// Function to handle editing a textbook form submission
document.getElementById('form-edit').addEventListener('submit', (e) => {
  e.preventDefault();
  if (!titleEditInput.value) {
    msgEdit.innerHTML = 'Textbook title cannot be blank';
  } else {
    editTextbook(titleEditInput.value, isbnEditInput.value, descEditInput.value);
    // Close modal after editing textbook
    let edit = document.getElementById('edit');
    edit.setAttribute('data-bs-dismiss', 'modal');
    edit.click();
    edit.setAttribute('data-bs-dismiss', '');
  }
});

// Function to retrieve textbooks from the server
let getTextbooks = () => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        data = JSON.parse(xhr.responseText) || [];
        refreshTextbooks();
      } else {
        console.error('Error fetching textbooks:', xhr.status);
        // Display error message to the user
        if (msg) {
          msg.innerHTML = 'Error fetching textbooks';
        }
      }
    }
  };
  xhr.open('GET', `${api}/textbooks`, true);
  xhr.send();
};

// Initialize the application
(() => {
  getTextbooks();
})();