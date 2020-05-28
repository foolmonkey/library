let aLibrary = [];

function Book(title, authorName, pages){
    this.title = title;
    this.author = authorName;
    this.numOfPages = pages;
    this.isRead = false;
}

function addBookToLibrary(aLibrary, title, authorName, pages){
    aLibrary.push(new Book(title, authorName, pages));
}