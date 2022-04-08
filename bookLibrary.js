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

function Book(title, author, genre, year, pages, read) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.year = year;
  this.pages = pages;
  this.read = read;

  this.info = function() {
    return `${title} by ${author}, year: ${year}, genre: ${genre} ${pages} pages, ${read}`;
  }
}

function addBookToLibrary(...objects) {
  for(object of objects) {
    myLibrary.push(object);
  }
}

// function removeBook() 

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
  bookGenre.textContent = book.genre;
  bookYear.textContent = book.year;
  bookPages.textContent = book.pages;
  bookRead.textContent = book.read;
  bookRemove.textContent = 'remove';

  bookCard.appendChild(bookTitle);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(bookGenre);

  const ratingHolder = document.createElement('div');
  ratingHolder.classList.add('star-rating');

  for (let i = 0; i < 5; i++) {
    const starRating = document.createElement('i');
    starRating.classList.add('far');
    starRating.classList.add('fa-star');

    ratingHolder.appendChild(starRating);
  }

  bookCard.appendChild(ratingHolder);

  bookCard.appendChild(bookYear);
  bookCard.appendChild(bookPages);
  bookCard.appendChild(bookRead);
  bookCard.appendChild(bookRemove);

  //mainContainer.appendChild(bookCard);
  
  const firstNode = document.querySelector('.placeholder');
  mainContainer.insertBefore(bookCard, firstNode);
  bookCard.appendChild(interior);

  bookCard.classList.add(setCardStyle(book.genre));
  interior.classList.add('book-card-bg');

  bookRemove.addEventListener('click', () => {
    mainContainer.removeChild(bookCard);
    
    myLibrary.splice(index, index+1);
  });

  const stars = document.querySelectorAll('.fa-star');

  stars.forEach((star, index) => {
    star.addEventListener('click', (e) => {

      switch(index) {
        case 0:
          star.classList.toggle('far');
          star.classList.toggle('fas');

          stars[1].classList.add('far');
          stars[1].classList.remove('fas');

          stars[2].classList.add('far');
          stars[2].classList.remove('fas');

          stars[3].classList.add('far');
          stars[3].classList.remove('fas');

          stars[4].classList.add('far');
          stars[4].classList.remove('fas');
          break;

        case 1:
          star.classList.toggle('far');
          star.classList.toggle('fas');

          stars[0].classList.remove('far');
          stars[0].classList.add('fas');

          stars[2].classList.add('far');
          stars[2].classList.remove('fas');

          stars[3].classList.add('far');
          stars[3].classList.remove('fas');

          stars[4].classList.add('far');
          stars[4].classList.remove('fas');
          break;

          case 2:
            star.classList.toggle('far');
            star.classList.toggle('fas');
  
            stars[0].classList.remove('far');
            stars[0].classList.add('fas');
  
            stars[1].classList.remove('far');
            stars[1].classList.add('fas');
  
            stars[3].classList.add('far');
            stars[3].classList.remove('fas');
  
            stars[4].classList.add('far');
            stars[4].classList.remove('fas');
            break;

          case 3:
            star.classList.toggle('far');
            star.classList.toggle('fas');
  
            stars[0].classList.remove('far');
            stars[0].classList.add('fas');
  
            stars[1].classList.remove('far');
            stars[1].classList.add('fas');
  
            stars[2].classList.remove('far');
            stars[2].classList.add('fas');
  
            stars[4].classList.add('far');
            stars[4].classList.remove('fas');
            break;

          case 4:
            star.classList.toggle('far');
            star.classList.toggle('fas');
  
            stars[0].classList.remove('far');
            stars[0].classList.add('fas');
  
            stars[1].classList.remove('far');
            stars[1].classList.add('fas');
  
            stars[2].classList.remove('far');
            stars[2].classList.add('fas');
  
            stars[3].classList.remove('far');
            stars[3].classList.add('fas');
            break;
      }


    });
  });

}

function setCardStyle(property) {
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
const formButton = document.querySelector('#js-form-button');
const backButton = document.querySelector('#js-back-button');

formButton.addEventListener('click', showForm);
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
  'A Game Of Thrones', 'George R.R. Martin', "Fantasy", 1996, 694, "read" );

addBookToLibrary(AGOT);
displayBook(myLibrary[myLibrary.length - 1], myLibrary.length - 1);

