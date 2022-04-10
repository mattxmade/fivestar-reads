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
const buttons = [];

function Book(title, author, genre, year, pages, read, rating = 0) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.year = year;
  this.pages = pages;
  this.read = read;
  this.rating = rating;

  this.info = function() {
    return `${title} by ${author}, year: ${year}, genre: ${genre} ${pages} pages, ${read}, rating: ${rating}`;
  }
}

function addBookToLibrary(...objects) {
  for(object of objects) {
    myLibrary.push(object);
  }
}

const mainContainer = document.querySelector('main');

function displayBook(book, index) {

  const interior = document.createElement('div');
  const bookCard = document.createElement('div');
  bookCard.classList.add('books-card');

  const bookTitle  = document.createElement('h2');
  const bookAuthor = document.createElement('h3');
  const bookGenre  = document.createElement('h4');
  const bookYear   = document.createElement('p');
  const bookPages  = document.createElement('p');
  const bookRead   = document.createElement('p');

  const bookRemove = document.createElement('button');

  bookTitle.textContent = book.title;
  bookAuthor.textContent = book.author;

  if (book.genre === '') {
    book.genre = 'other';
  }
  bookGenre.textContent = book.genre;
  
  bookYear.textContent = book.year;
  bookPages.textContent = book.pages;
  bookRead.textContent = 'read';
  bookRemove.textContent = 'remove';

  bookCard.appendChild(interior);

  interior.style.background = `linear-gradient(45deg, rgb(255, 255, 255) 30%, ${setBackground(book.genre)} 30%, rgb(110, 140, 180))`;

  bookCard.appendChild(bookTitle);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(bookGenre);

  const ratingHolder = document.createElement('div');
  ratingHolder.classList.add('star-rating');

  for (let i = 0; i < 5; i++) {
    const starRating = document.createElement('i');
    starRating.classList.add('far');
    starRating.classList.add('fa-star');
    starRating.classList.add(`set_${index}`);

    ratingHolder.appendChild(starRating);
  }

  bookCard.appendChild(ratingHolder);

  bookCard.appendChild(bookYear);
  bookCard.appendChild(bookPages);

  // read status
  const statusIcon = document.createElement('i');
  statusIcon.classList.add('far');

  if (book.read === 'read') {
    statusIcon.classList.add('fa-check-square');
  }
  else {
    statusIcon.classList.add('fa-sticky-note');
  }
  
  // read status container
  const readStatus = document.createElement('div');
  readStatus.classList.add('status-box');
  readStatus.appendChild(bookRead);
  readStatus.appendChild(statusIcon);

  bookCard.appendChild(readStatus);
  bookCard.appendChild(bookRemove);
  
  const firstNode = document.querySelector('.placeholder');
  mainContainer.insertBefore(bookCard, firstNode);

  bookCard.classList.add(setFontStyle(book.genre));
  interior.classList.add('book-card-bg');

  // readStatus listener
  statusIcon.addEventListener('click', () => {

    statusIcon.classList.toggle('fa-check-square');
    statusIcon.classList.toggle('fa-sticky-note');

    if (statusIcon.classList.contains('fa-check-square')) {
      book.read = 'read';
    }
    else {
      book.read = 'unread';
    }
  });

  // remove button listener
  bookRemove.addEventListener('click', () => {
    mainContainer.removeChild(bookCard);
    
    myLibrary.splice(index, index+1);
  });

  // rating nodelist
  const stars = document.querySelectorAll(`.set_${index}`);

  setRating(stars, book.rating);
  updateRating(book, stars, book.rating);
}

function setBackground(string) {
  switch(string) {
    case 'Horror':
      return 'rgb(130, 40, 40)';

    case 'Comedy':
      return 'rgb(130, 40, 111)';
       
    case 'Fantasy':
      return 'rgb(40, 80, 130)'; 
      
    case 'Romance':
      return 'rgb(40, 42, 130)';
      
    case 'Historical':
      return 'rgb(130, 73, 40)';

    case 'Biography':
      return 'rgb(72, 40, 130)'; 
      
    case 'Sci-Fi':
      return 'rgb(40, 130, 123)';

    case 'Crime-Mystery':
      return 'rgb(40, 109, 130)';
    
    case 'Action-Adventure':
      return 'rgb(163, 89, 89)';
    
    default:
      return 'rgb(40, 80, 130)';
  }
}

function setRating(array, number) {

  for(let i = 0; i < number; i++) {

    array[i].classList.remove('far');
    array[i].classList.add('fas');
  }
}

function resetRating(array) {

  for(let i = 0; i < array.length; i++) {

    array[i].classList.add('far');
    array[i].classList.remove('fas'); 

  }
}

function updateRating(book, stars, lastRating) {
  stars.forEach((star, index) => {

    star.addEventListener('click', () => {
      book.rating = index+1;

      resetRating(stars);
      setRating(stars, book.rating);

      if (lastRating === book.rating) {
        star.classList.toggle('far');
        star.classList.toggle('fas');

        book.rating -=1;
      }

      lastRating = book.rating;
      // console.log(book.rating);
    });
  });
}

function setFontStyle(property) {
  switch(property) {
    case 'Horror':
      return 'book-horror';

    case 'Comedy':
      return 'book-comedy';
       
    case 'Fantasy':
      return 'book-fantasy'; 
      
    case 'Romance':
      return 'book-romance';
      
    case 'Historical':
      return 'book-historical';

    case 'Biography':
      return 'book-biography'; 
      
    case 'Sci-Fi':
      return 'book-science-fiction';

    case 'Crime-Mystery':
      return 'book-crime-mystery';
    
    case 'Action-Adventure':
      return 'book-action-adventure';
  }
}

const modal = document.querySelector('#js-modal');
const formButtons = document.querySelectorAll('.form-button');
const backButton = document.querySelector('#js-back-button');

formButtons.forEach(button => {
  button.addEventListener('click', showForm);
});

backButton.addEventListener('click', hideForm);

function showForm(e) {
  modal.showModal();
}
function hideForm(e) {
  modal.close();
}

const form = document.querySelector('form');
const inputs = form.elements;

form.addEventListener(('submit'), (e) => {
  e.preventDefault();

  let selectGenre;

  const options = document.querySelector('select');
  for ( option of options.selectedOptions ) {
    selectGenre = option.attributes.value.nodeValue
    // console.log(genre);
  }

  const title  = inputs["title"].value;
  const author = inputs["author"].value;
  const year   = inputs["year"].value;
  const genre  = selectGenre;
  const pages  = inputs["pages"].value;
  const blurb  = inputs["blurb"].value;
  const status = inputs["status"].value;

  console.table({
    title, author, year, genre, pages, blurb, status
  });

  const userBook = new Book(title, author, genre, year, pages, status);
  console.log(userBook.info());
  
  addBookToLibrary(userBook);
  console.table(myLibrary);

  displayBook(myLibrary[myLibrary.length - 1], myLibrary.length - 1);

});

const AGOT = new Book(
  'A Game Of Thrones', 'George R.R. Martin', "Fantasy", 1996, 694, "read", 4);

addBookToLibrary(AGOT);
displayBook(myLibrary[myLibrary.length - 1], myLibrary.length - 1);

const removeAll = document.getElementById('js-remove-all');

removeAll.addEventListener('click', () => {
  const cards = document.querySelectorAll('.books-card');  

  if (myLibrary.length > 0) {

    console.log(cards)
    cards.forEach((card, index) => {

      myLibrary.splice(index, index+1);
      mainContainer.removeChild(card);

    });

  }
});