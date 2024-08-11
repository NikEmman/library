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
  event.preventDefault();
  addBookToLibrary();
  form.reset();
  appendBooks();
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
