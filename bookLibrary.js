// create book constructor                        DONE
// create array to store books
// create function to add book to array
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

const AGOT = new Book('A Game Of Thrones', 'George R.R. Martin', 694, false);

console.log(AGOT.info());
