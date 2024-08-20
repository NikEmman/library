const myLibrary = [];
const form = document.querySelector("form");

function Book(title, author, pages, read, comments) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.comments = comments;
}
function getFormValues() {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let read = document.getElementsByName("read");
  let comments = document.getElementById("comments").value;

  let readValue;
  for (let i = 0; i < read.length; i++) {
    if (read[i].checked) {
      readValue = read[i].value;
      break;
    }
  }
  return { title, author, pages, readValue, comments };
}

document.getElementById("submit").addEventListener("click", function (event) {
  if (checkError()) {
    event.preventDefault();
  } else {
    addBookToLibrary();
    form.reset();
    appendBooks();
  }
});

function addBookToLibrary() {
  const { title, author, pages, readValue, comments } = getFormValues();
  myLibrary.push(new Book(title, author, pages, readValue, comments));
}

const addBtn = document.getElementById("addBook");
addBtn.addEventListener("click", () => {
  form.classList.toggle("hidden");
  addBtn.textContent = form.classList.contains("hidden")
    ? "+ Add book"
    : "Hide";
});

function appendBooks() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    cardContainer.innerHTML += `<div data-index-number= ${i} class="card">
            <h3>Book Title: ${myLibrary[i].title}</h3>
            <p>Author: ${myLibrary[i].author}</p>
            <p>Number of Pages: ${myLibrary[i].pages}</p>
            <p id=read-${i}>Have read it: ${myLibrary[i].read}</p>
            <p>Comment: ${myLibrary[i].comments}</p>
            <button id="readBtn">Change read status</button>
            <button id="delBook">X</button>
        </div>`;
  }
}

const cardContainer = document.getElementById("card-container");

cardContainer.addEventListener("click", (e) => {
  if (e.target.id === "delBook") {
    const parent = e.target.parentNode;
    const index = parseInt(parent.getAttribute("data-index-number"));

    myLibrary.splice(index, 1);

    parent.remove();
  }
});

cardContainer.addEventListener("click", (e) => {
  const parent = e.target.parentNode;
  const index = parseInt(parent.getAttribute("data-index-number"));

  if (e.target.id === "readBtn") {
    let read = document.getElementById(`read-${index}`);
    read.textContent =
      read.textContent === "Have read it: Yes"
        ? "Have read it: No"
        : "Have read it: Yes";
    myLibrary[index].read = myLibrary[index].read === "Yes" ? "No" : "Yes";
  }
});
// form validations
const title = document.getElementById("title");
const author = document.getElementById("author");
const comments = document.getElementById("comments");
const pages = document.getElementById("pages");
const titleError = document.getElementById("titleError");
const authorError = document.getElementById("authorError");
const pagesError = document.getElementById("pagesError");
const commentsError = document.getElementById("commentsError");

title.addEventListener("input", (e) => {
  if (title.validity.valid) {
    titleError.textContent = "";
    titleError.className = "hidden";
  } else {
    showTitleError();
  }
});

function showTitleError() {
  if (title.validity.valueMissing) {
    titleError.textContent = "You must to enter a title";
    titleError.className = "error";
  } else if (title.validity.tooShort) {
    titleError.textContent = `Title must be at least ${title.minLength} characters long`;
    titleError.className = "error";
  }
}
author.addEventListener("input", (e) => {
  if (author.validity.valid) {
    authorError.textContent = "";
    authorError.className = "hidden";
  } else {
    showAuthorError();
  }
});

function showAuthorError() {
  if (author.validity.valueMissing) {
    authorError.textContent = "You must to enter a author";
    authorError.className = "error";
  } else if (author.validity.tooShort) {
    authorError.textContent = `Author must be at least ${author.minLength} characters long`;
    authorError.className = "error";
  }
}
comments.addEventListener("input", (e) => {
  if (comments.validity.valid) {
    commentsError.textContent = "";
    commentsError.className = "hidden";
  } else {
    showCommentsError();
  }
});

function showCommentsError() {
  if (comments.validity.valueMissing) {
    commentsError.textContent = "You must to enter a comment";
    commentsError.className = "error";
  } else if (comments.validity.tooShort) {
    commentsError.textContent = `Comments must be at least ${comments.minLength} characters long`;
    commentsError.className = "error";
  }
}
pages.addEventListener("input", (e) => {
  if (pages.validity.valid) {
    pagesError.textContent = "";
    pagesError.className = "hidden";
  } else {
    showPagesError();
  }
});

function showPagesError() {
  if (pages.validity.valueMissing) {
    pagesError.textContent = "Please enter a number";
    pagesError.className = "error";
  } else if (pages.validity.badInput) {
    pagesError.textContent = "Please enter a number";
    pagesError.className = "error";
  } else if (pages.validity.rangeOverflow || pages.validity.rangeUnderflow) {
    pagesError.textContent = `Enter an integer between ${pages.min} and ${pages.max}`;
    pagesError.className = "error";
  }
}
// fix me
const fieldset = document.querySelector("fieldset");

const yesRadio = document.querySelector('input[name="read"][value="Yes"]');
const noRadio = document.querySelector('input[name="read"][value="No"]');
const radioIsValid = yesRadio.checked || noRadio.checked;
function checkError() {
  return (
    showPagesError() ||
    showTitleError() ||
    showAuthorError() ||
    showCommentsError() ||
    radioIsValid //fixme
  );
}
