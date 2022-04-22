const Library = ( () => {
  'use strict';

  let bookList = [];
  const mainContainer = document.querySelector('main');
  const libraryFromLocalStorage = localStorage.getItem('bookList');

  const placeholder = document.querySelector('.placeholder');

  const removeAll = document.getElementById('js-remove-all');
  removeAll.addEventListener('click', () => {
    _removeAll();
  });  

  const _checkStorage = () => {
    let restore = true;

    if (libraryFromLocalStorage && libraryFromLocalStorage.length) {
      bookList = JSON.parse(libraryFromLocalStorage);

      bookList.forEach((book, index) => {
        _createCard(book, index);
      });

      _checkList();
    }

    else {
      // load example data
      Library.addBook(
        'A Game of Thrones', 'George R.R. Martin', "Fantasy", 1996, 694, 
        "Amid plots and counterplots, tragedy and betrayal, victory and terror, the fate of the Starks, their allies, and their enemies hangs perilously in the balance, as each endeavors to win that deadliest of conflicts: the game of thrones.",
        "read", 5);

      Library.addBook(
        'Dracula', 'Bram Stoker', "Horror", 1897, 418, 
        "Dracula is a classic and genre-defining tale of horror from famed author Bram Stoker. This novel contains the chilling tales of those that encountered the monster Dracula on his quest to emigrate from Transylvania to England, as he seeks to consume blood and spread his undead curse to the innocent.", 
        "read", 4);

      Library.addBook(
        'Dune', 'Frank Herbert', "Sci-Fi", 1965, 412, 
        "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the “spice” melange, a drug capable of extending life and enhancing consciousness.", 
        "read", 4);


      Library.addBook(
        'A Dance with Dragons', 'George R.R. Martin', "Fantasy", 2011, 761,
        "From all corners, bitter conflicts reignite, intimate betrayals are perpetrated, and a grand cast of outlaws and priests, soldiers and skinchangers, nobles and slaves, will face seemingly insurmountable obstacles. Some will fail, others will grow in the strength of darkness.",
        "unread", 0);
        
      Library.addBook(
        'Outlander', 'Diana Gabaldon', "Fantasy", 1991, 850,
        "The year is 1945. Claire Randall, a former combat nurse, is just back from the war and reunited with her husband on a second honeymoon when she walks through a standing stone in one of the ancient circles that dot the British Isles. Suddenly she is a Sassenach—an “outlander”.",
        "read", 3);

      Library.addBook(
        'Pride & Prejudice', 'Jane Austen', "Romance", 1813, 761,
        "Pride and Prejudice follows the turbulent relationship between Elizabeth Bennet, the daughter of a country gentleman, and Fitzwilliam Darcy, a rich aristocratic landowner. They must overcome the titular sins of pride and prejudice in order to fall in love and marry.",
        "unread", 0);

      Library.addBook(
        'Have a Nice Day: A Tale of Blood and Sweatsocks', 'Mick Foley', "Biography", 1999, 554,
        "Mick Foley is a nice man, a family man who loves amusement parks and eating ice cream in bed. Here is an intimate glimpse into Mick Foley's mind, his history, his work and what some might call his pathology.",
        "read", 4);

      Library.addBook(
        'Nelson Mandela', 'Martin Meredith', "Educational", 1997, 653,
        "The riveting memoirs of the outstanding moral and political leader of our time, A Long Walk to Freedom brilliantly re-creates the drama of the experiences that helped shape Nelson Mandela's destiny.",
        "read", 5);
      
      _checkList();
      restore = false;
    }
    //restore ? console.log('session restored') : console.log('new session');
  }

  // private object data methods
  const _addBookToLibrary = (...objects) => {

    for(const object of objects) {

      bookList.push(object);
      localStorage.setItem('bookList', JSON.stringify(bookList));
      _createCard(object, bookList.length - 1);

    }
    _checkList();
  };

  // private dom methods
  const _createCard = (book, index) => {
    const interior = document.createElement('div');
    const bookCard = document.createElement('div');
    bookCard.classList.add('books-card');

    const bookTitle  = document.createElement('h2');
    const bookAuthor = document.createElement('h3');
    const bookGenre  = document.createElement('h4');
    const bookYear   = document.createElement('p');
    const bookPages  = document.createElement('p');
    const bookRead   = document.createElement('p');

    const bookIcon   = document.createElement('i');
    bookIcon.classList.add('fas');
    bookIcon.classList.add('fa-book-reader');
    bookIcon.classList.add(`icon-set_${index}`);

    const bookRemove = document.createElement('button');

    // Card Back
    const cardBack   = document.createElement('div');
    cardBack.classList.add('card__book--back');

    // Card Back --- Content
    const backTitle  = document.createElement('h5');
    backTitle.textContent = book.title;
    backTitle.style.color = 'white';
    backTitle.style.fontSize = '1.6rem';
    backTitle.style.textAlign = 'center';
    cardBack.appendChild(backTitle);

    const bookBlurb  = document.createElement('p');
    bookBlurb.textContent = book.blurb;
    cardBack.appendChild(bookBlurb);

    // Card Front
    const cardFront  = document.createElement('div');
    cardFront.classList.add('card__book--front');

    // Card Front -- Content
    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookGenre.textContent = book.genre;
    
    bookYear.textContent = book.year;
    bookPages.textContent = `${book.pages} pages`;
    bookRead.textContent = 'read';
    bookRemove.textContent = 'remove';

    // Card Style by Genre
    const background = _setBackground(book.genre);
    interior.style.background = `linear-gradient(45deg, rgb(255, 255, 255) 30%, ${background} 30%, rgb(75, 75, 75))`;
    cardBack.style.background = `linear-gradient(45deg, ${background} 30%, rgb(75, 75, 75))`;
    cardFront.appendChild(interior);

    // Append elements
    cardFront.appendChild(bookTitle);
    cardFront.appendChild(bookAuthor);
    cardFront.appendChild(bookGenre);

    // Set-up rating system
    const ratingHolder = document.createElement('div');
    ratingHolder.classList.add('star-rating');

    for (let i = 0; i < 5; i++) {
      const starRating = document.createElement('i');
      starRating.classList.add('far');
      starRating.classList.add('fa-star');
      starRating.classList.add(`set_${index}`);

      ratingHolder.appendChild(starRating);
    }

    cardFront.appendChild(ratingHolder);
    cardFront.appendChild(bookYear);
    cardFront.appendChild(bookPages);

    // read status
    const statusIcon = document.createElement('i');
    statusIcon.classList.add('far');

    book.read === 'read' 
    ? statusIcon.classList.add('fa-check-square')
    : statusIcon.classList.add('fa-sticky-note');
    
    // read status container
    const readStatus = document.createElement('div');
    readStatus.classList.add('status-box');
    readStatus.appendChild(bookRead);
    readStatus.appendChild(statusIcon);

    cardFront.appendChild(readStatus);
    cardFront.appendChild(bookRemove);

    cardFront.appendChild(bookIcon);
    cardBack.appendChild(bookIcon.cloneNode(true));
    
    // Front
    bookCard.appendChild(cardFront);

    // Back
    bookCard.appendChild(cardBack);

    // Add Card to Parent
    const firstNode = document.querySelector('.placeholder');
    mainContainer.insertBefore(bookCard, firstNode);

    bookCard.classList.add(_setFontStyle(book.genre));
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
      bookList[index].read = book.read;
      localStorage.setItem('bookList', JSON.stringify(bookList));
      //console.log(`${book.title} status: ${book.read}`);
    });

    // remove button listener
    bookRemove.addEventListener('click', () => {

      bookList.filter((item, index) => {
        if (item.title === bookTitle.textContent) {

          bookList.splice(index, 1);
          localStorage.setItem('bookList', JSON.stringify(bookList));

          //console.log(`${bookTitle.textContent} has been removed.`);

          mainContainer.removeChild(bookCard);
        }
      });       
      //console.table(bookList);
      _checkList();
    });

    // rating nodelist
    const stars = document.querySelectorAll(`.set_${index}`);

    _setRating(stars, book.rating);
    _updateRating(book, stars, book.rating, index);

    const icons = document.querySelectorAll(`.icon-set_${index}`);
    
    icons.forEach(icon => {
      icon.addEventListener('click', () => {
        bookCard.classList.toggle('is-flipped');

        cardFront.childNodes.forEach(child => {
          // console.dir(child);

          if (bookCard.classList.contains('is-flipped')) {
            child.classList.add('hidden');
          }
          else { 
            setTimeout(() => {
              child.classList.remove('hidden'); 
            }, 300); 
          }
          
        });
      });  
    });

    //console.log(`${index}: ${book.title} added to library`);
  };

  const _setRating = (array, number) => {

    for(let i = 0; i < number; i++) {
  
      array[i].classList.remove('far');
      array[i].classList.add('fas');
    }
  }
  
  const _resetRating = (array) => {
  
    for(let i = 0; i < array.length; i++) {
  
      array[i].classList.add('far');
      array[i].classList.remove('fas'); 
  
    }
  }
  
  const _updateRating = (book, stars, lastRating, arrayIndex) => {
    stars.forEach((star, index) => {
  
      star.addEventListener('click', () => {
        book.rating = index+1;
  
        _resetRating(stars);
        _setRating(stars, book.rating);
  
        if (lastRating === book.rating) {
          star.classList.toggle('far');
          star.classList.toggle('fas');
  
          book.rating -=1;
        }
  
        lastRating = book.rating;
  
        bookList[arrayIndex].rating = lastRating;
        localStorage.setItem('bookList', JSON.stringify(bookList));
  
        //console.log(`${book.title} rating: ${book.rating}`);
      });
    });
  }
  
  const _setFontStyle = (property) => {
    switch(property) {
      case 'Horror':
        return 'book-horror';
  
      case 'Comedy':
        return 'book-comedy';
         
      case 'Fantasy':
        return 'book-fantasy'; 
        
      case 'Romance':
        return 'book-romance';
        
      case 'Educational':
        return 'book-educational';
  
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
  
  const _setBackground = (string) => {
    switch(string) {
      case 'Horror':
        return 'rgb(130, 40, 40)';
  
      case 'Comedy':
        return 'rgb(130, 40, 111)';
         
      case 'Fantasy':
        return 'rgb(40, 80, 130)'; 
        
      case 'Romance':
        return 'rgb(40, 42, 130)';
        
      case 'Educational':
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

  const _checkList = () => {  
    if (bookList.length === 0) return placeholder.classList.add('dissolve-placeholder');
    placeholder.classList.remove('dissolve-placeholder');
  }

  const _removeAll = () => {
    const cards = document.querySelectorAll('.books-card'); 

    if (bookList.length > 0) {
  
      bookList.forEach(book => {
        //console.log(`${book.title} has been removed`);
      });
  
      cards.forEach((card, index) => {
  
        mainContainer.removeChild(card);
        bookList = [];
        localStorage.setItem('bookList', JSON.stringify(bookList));
      });
    }
    _checkList();
  }

  const _checkExists = (title) => {
    let exists = false;

    bookList.forEach(item => {
      if (String(item.title).toLowerCase() === String(title).toLowerCase()) {
        exists = true;
      }
    });

    return exists;
  }

  // public methods
  return {
    addBook: (title, author, genre, year, pages, blurb, read, rating = 0) => {
      
      const book = { 
        title, author, 
        genre, year, 
        pages, blurb, 
        read, rating 
      }

      _addBookToLibrary(book);
      
      return { book }

    },

    restore: () => {
      _checkStorage();
    },

    bookExists: (title) => {
      return _checkExists(title);
    }
  }

})();

Library.restore();

// Modal
const modal = document.querySelector('#js-modal');
const formButtons = document.querySelectorAll('.form-button');
const closeButton = document.querySelector('.js-close-button');

formButtons.forEach(button => {
  button.addEventListener('click', showForm);
});

closeButton.addEventListener('click', hideForm);

function showForm(e) {
  modal.showModal();
}
function hideForm(e) {
  modal.close();
}

// Form
const form = document.querySelector('form');
const inputs = form.elements;

// form message alert
const alertContainer = document.getElementById('js-form-alert');
const alertMessage = document.getElementById('js-form-alert-message');

form.addEventListener(('submit'), (e) => {
  e.preventDefault();

  // check if title exists - we don't want duplicates
  let exists = Library.bookExists(inputs["title"].value);

  if (exists) {
    alertMessage.textContent = `${inputs["title"].value} already added`;
        
    alertContainer.classList.remove('form-alert-success');
    alertContainer.classList.add('form-alert-error');

    setTimeout(() => {
      alertContainer.classList.remove('form-alert-error');
    }, 3000); 

    return;
  }

  // check all fields completed
  for(input of inputs) {

    if (input.nodeName === 'INPUT' && String(input.value).trim() === "") {

      alertMessage.textContent = 'Please complete all fields';

      alertContainer.classList.remove('form-alert-success');
      alertContainer.classList.add('form-alert-error');

      setTimeout(() => {
        alertContainer.classList.remove('form-alert-error');
      }, 3000); 

      return;
    }
  }

  let selectGenre;

  const options = document.querySelector('select');
  for ( option of options.selectedOptions ) {
    selectGenre = option.attributes.value.nodeValue

    if (selectGenre === '') selectGenre = 'Other';
  }

  const title  = inputs["title"].value;
  const author = inputs["author"].value;
  const year   = Number(inputs["year"].value);
  const genre  = selectGenre;
  const pages  = Number(inputs["pages"].value);
  const blurb  = inputs["blurb"].value;
  const status = inputs["status"].value;

  const userLibrary = Library.addBook(title, author, genre, year, pages, blurb, status);

  alertMessage.textContent = `${userLibrary.book.title} added to library!`;
  alertContainer.classList.remove('form-alert-error');
  alertContainer.classList.add('form-alert-success');

  setTimeout(() => {
    alertContainer.classList.remove('form-alert-success');
  }, 3000); 

});