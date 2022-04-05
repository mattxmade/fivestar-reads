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