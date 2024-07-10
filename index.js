const myLibrary = []
const form = document.querySelector("form");

function Book(title, author, pages, read, comments) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.comments = comments
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
};

const addBtn = document.getElementById("addBook")
addBtn.addEventListener("click", () => {
    form.classList.toggle("hidden");
})

function appendBooks() {
    const cardContainer = document.getElementById("card-container")
    let i;
    cardContainer.innerHTML = ""
    for (let i = 0; i < myLibrary.length; i++) {
        cardContainer.innerHTML += `<div data-index-number= ${i} class="card">
            <h3>Book Title: ${myLibrary[i].title}</h3>
            <p>Author: ${myLibrary[i].author}</p>
            <p>Number of Pages: ${myLibrary[i].pages}</p>
            <p>Have read it: ${myLibrary[i].pages}</p>
            <p>Comment: ${myLibrary[i].comments}</p>
        </div>`
    }
}

//next is implement a delete book button on each card, will remove dom item and myLibrary index