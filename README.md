<a name="readme-top"></a>
<a href="#"><img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="html-badge"/></a>
<a href="#"><img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="css-badge"/></a>
<a href="#"><img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="javascript-badge"/></a>

# <a href="#"><img src="favicon.ico" width="24"/></a> 5 Star Reads | <a href="https://mattxmade.github.io/fivestarreads/" target="_blank"> <strong>Live</strong></a>

> ### Library books web app

<br>
<div align="center">
  <a href="#"><img src="docs/readme_hero.jpg" width="900"/></a>

  ####

  #### Add and delete books, rate titles and update their read status all in one place
</div>

<br>

## Features
<table>
  <tbody>
    <tr><td colspan=2></td></tr>
    <tr>
      <td align=center><strong>Create, update and delete titles from lirabry</strong></td>
      <td align=center width=50%><strong>Form validation</strong></td>
    </tr>
    <tr><td colspan=2></td></tr>
    <tr>
      <td align=center><strong>Dynamic star rating system</strong></td>
      <td align=center width=50%><strong>Update read status</strong></td>
    </tr>
    <tr><td colspan=2></td></tr>
    <tr>
      <td align=center><strong>Responsive web design</strong></td>
      <td align=center width=50%><strong>Data persistence using LocalStorage API</strong></td>
    </tr>
     <tr><td colspan=2></td></tr>
    <tr>
      <td colspan=2>
        <a href="#" >
          <img  src="docs/table.svg"/>
        </a>
      </td>
    </tr>   
  </tbody>
</table>

<br>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Overview
### Book Objects
Book objects are created via the "Add a new book" form and have the following properties:

#### Example Book Object
```js
{
  title: "Dune",
  author: "Frank Herbert",
  genre: "Sci-Fi",
  year: 1965,
  pages: 412,
  blurb: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the “spice” melange, a drug capable of extending life and enhancing consciousness.",
  read: "read",
  rating: 4
 }
```

<br>

### Dom Manipulation
Card elements are created through JavaScript using the createElement Document object method.

 ```js
 /*
  bookLibrary.js
   ¬ simplified
 */

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
 
  {...}
 
  // Add Card to Parent
  const firstNode = document.querySelector('.placeholder');
  mainContainer.insertBefore(bookCard, firstNode);
}
```

<br>

### Callbacks
Through eventListeners callbacks, card elements have access to several functions and can directly interact with book data.

#### Delete Book Card
```js
bookRemove.addEventListener('click', () => {
  bookList.filter((item, index) => {
    if (item.title === bookTitle.textContent) {
      bookList.splice(index, 1);
      localStorage.setItem('bookList', JSON.stringify(bookList));

      mainContainer.removeChild(bookCard);
    }
  });
});
```

#### Update Book Rating
```js
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
    });
  });
}
```

#### Update Read Status
```js
statusIcon.addEventListener('click', () => {
  statusIcon.classList.toggle('fa-check-square');
  statusIcon.classList.toggle('fa-sticky-note');

  if (statusIcon.classList.contains('fa-check-square')) {
    book.read = 'read';
  }
  else { book.read = 'unread'; }

  bookList[index].read = book.read;
  localStorage.setItem('bookList', JSON.stringify(bookList));
});
```

<br>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

##

### Style Themes

Card element theming is determined by genre. Modifiers are set via helper function.

###

> #### Theme Example: Sci-Fi
>
>  #### Background-Color Modifier
> 
> ```js
> const _setBackground = (string) => {
>   switch(string) {
>     {...}
> 
>     case 'Sci-Fi':
>     return 'rgb(40, 130, 123)';
> 
>     {...}
>   }
> }
> 
> ```
> 
> #### Font-Family Modifier
> 
> ```js
> /*
>  bookLibrary.js
>    ¬ _setFontStyle
>      ¬ minimal 
> */
> const _setFontStyle = (property) => {
>   switch(property) {
>     {...}
> 
>     case 'Sci-Fi':
>     return 'book-science-fiction';
> 
>     {...}
>   }
> }
> ```
> 
> #### Attached Class
> 
> ```css
> .book-science-fiction {
>   font-family: "Rubik Moonrocks", cursive;
> }
> ```

##

### CSS

To achieve uniformity and reduce repetition, card elements share CSS classes.

#### Group Class
```css
/*
  style.css
    ¬ extract
*/

.card__book--front,
.card__book--back {
  padding: 2rem;
  max-width: 25rem;
  min-height: 35rem;
  position: relative;
  border-radius: 2rem;
  background-color: lightblue;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
```

##

### HTML
HTML is written using semantic tags. Semantic tags are descriptive, offer improved Search Engine Optimisation (SEO) and improve accessibility.

#### Header element
```html
<header>
  <div class="branding">
    <h1>5 <i class="fas fa-star"></i> Reads</h1>
    <p>A place to rate your books.</i></p>        
  </div>

  <div class="account-options">
    <button id="js-form-button" class="form-button" type="menu">NEW BOOK</button>
    <button id="js-remove-all" class="remove-all-btn" type="menu">REMOVE ALL</button>      
  </div>
</header> 
```

#### Dom Elements
Elements created using JavaScript Dom manipulation are rendered inside the main element, replacing placeholder elements.

#### Main element
```html
<main>
  <div class="placeholder">
    <i class="fas fa-plus-circle form-button"></i>
  </div>
</main>
```

<br>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

##

 ### Project Roadmap
 - [x] Create data using JavaScript objects 
- [x] Create elements through Dom manipulation
- [x] Implement caching using LocalStorage API
- [x] Create responsive layouts
  - [x] Implement CSS Flexbox
  - [x] Add media query breakpoints

##

### Deployment
<a href="#"><img src="https://img.shields.io/badge/github%20pages-121013?style=for-the-badge&logo=github&logoColor=white" alt="github-pages-badge"/></a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
