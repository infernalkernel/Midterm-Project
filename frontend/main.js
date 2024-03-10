let titleInput = document.getElementById('title');
let isbnInput = document.getElementById('isbn');
let descInput = document.getElementById('desc');
let textbookId = document.getElementById('textbook-id');
let titleEditInput = document.getElementById('title-edit');
let isbnEditInput = document.getElementById('isbn-edit');
let descEditInput = document.getElementById('desc-edit');
let textbooks = document.getElementById('textbooks');
let data = [];
let selectedTextbook = {};
const api = 'http://127.0.0.1:8000';

function tryAdd() {
  let msg = document.getElementById('msg');
  msg.innerHTML = '';
}

document.getElementById('form-add').addEventListener('submit', (e) => {
  e.preventDefault();

  if (!titleInput.value || !isbnInput.value) {
    document.getElementById('msg').innerHTML = 'Title and ISBN cannot be blank';
  } else {
    addTextbook(titleInput.value, isbnInput.value, descInput.value);

    // close modal
    let add = document.getElementById('add');
    add.setAttribute('data-bs-dismiss', 'modal');
    add.click();
    (() => {
      add.setAttribute('data-bs-dismiss', '');
    })();
  }
});

let addTextbook = (title, isbn, description) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 201) {
      const newTextbook = JSON.parse(xhr.responseText);
      data.push(newTextbook);
      refreshTextbooks();
    }
  };
  xhr.open('POST', `${api}/textbooks`, true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify({ title, ISBN: isbn, description }));
};

let refreshTextbooks = () => {
  textbooks.innerHTML = '';
  data
    .sort((a, b) => b.id - a.id)
    .map((x) => {
      return (textbooks.innerHTML += `
        <div id="textbook-${x.id}">
          <span class="fw-bold fs-4">${x.title}</span>
          <p>ISBN: ${x.ISBN}</p>
          <pre class="text-secondary ps-3">${x.description}</pre>
  
          <span class="options">
            <i onClick="tryEditTextbook(${x.id})" data-bs-toggle="modal" data-bs-target="#modal-edit" class="fas fa-edit"></i>
            <i onClick="deleteTextbook(${x.id})" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
    });

  resetForm();
};
let tryEditTextbook = (id) => {
  const textbook = data.find((x) => x.id === id);
  selectedTextbook = textbook;
  textbookId.innerText = textbook.id;
  titleEditInput.value = textbook.title;
  isbnEditInput.value = textbook.ISBN;
  descEditInput.value = textbook.description;
  document.getElementById('msg-edit').innerHTML = '';
};

document.getElementById('form-edit').addEventListener('submit', (e) => {
  e.preventDefault();

  if (!titleEditInput.value || !isbnEditInput.value) {
    document.getElementById('msg-edit').innerHTML = 'Title and ISBN cannot be blank';
  } else {
    editTextbook(titleEditInput.value, isbnEditInput.value, descEditInput.value);

    // close modal
    let edit = document.getElementById('edit');
    edit.setAttribute('data-bs-dismiss', 'modal');
    edit.click();
    (() => {
      edit.setAttribute('data-bs-dismiss', '');
    })();
  }
});
let editTextbook = (title, isbn, description) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      selectedTextbook.title = title;
      selectedTextbook.ISBN = isbn;
      selectedTextbook.description = description;
      refreshTextbooks();
    }
  };
  xhr.open('PUT', `${api}/textbooks/${selectedTextbook.id}`, true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify({ title, ISBN: isbn, description }));
};

let deleteTextbook = (id) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      data = data.filter((x) => x.id !== id);
      refreshTextbooks();
    }
  };
  xhr.open('DELETE', `${api}/textbooks/${id}`, true);
  xhr.send();
};

let resetForm = () => {
  titleInput.value = '';
  isbnInput.value = '';
  descInput.value = '';
};

let getTextbooks = () => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      data = JSON.parse(xhr.responseText) || [];
      refreshTextbooks();
    }
  };
  xhr.open('GET', `${api}/textbooks`, true);
  xhr.send();
};

(() => {
  getTextbooks();
})();