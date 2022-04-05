// create book constructor                        DONE
// create array to store books                    DONE
// create function to add book to array           DONE
// create function that loops through book array  
// display each item as a card
// add a "NEW BOOK" button that displays a form
  // inputs:
    // author
    // title
    // number of pages
    // read / unread
    // year of release
    // genre

// Add remove button on book card to allow user to 
// delete book from library

// Add button to change read status
  // function of book - read / unread

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${read}`;
  }
}

function addBookToLibrary(...objects) {
  for(object of objects) {
    myLibrary.push(object);
  }
}

function displayBook(array) {
  for(item of array) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('books-card');

    const bookTitle = document.createElement('h2');
    const bookAuthor = document.createElement('h3');
    const bookPages = document.createElement('p');
    const bookRead = document.createElement('p');

    bookTitle.textContent = item.title;
    bookAuthor.textContent = item.author;
    bookPages.textContent = item.pages;
    bookRead.textContent = item.read;

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(bookRead);

    const mainContainer = document.querySelector('main');
    mainContainer.appendChild(bookCard);
  }
}

const AGOT = new Book('A Game Of Thrones', 'George R.R. Martin', 694, true);
const ACOK = new Book('A Clash Of Kings', 'George R.R. Martin', 761, false);

console.log(AGOT.info());
console.log(ACOK.info());

addBookToLibrary(AGOT, ACOK);
console.table(myLibrary);

displayBook(myLibrary);
