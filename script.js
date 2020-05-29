// constructor for book object
function Book(title, authorName, pages, readStatus = false){
    this.title = title;
    this.author = authorName;
    this.numOfPages = pages;
    this.isRead = readStatus;
}

// adds a book object to an array of books
function addBookToLibrary(aLibrary, title, authorName, pages, readStatus = false){
    aLibrary.push(new Book(title, authorName, pages, readStatus));
}

// takes an array of books and appends its values to a container
function render(aLibrary){
    let container = document.getElementById('container');

    for(let i = 0, len = aLibrary.length; i < len; i++){
        let bookDisplay = document.createElement('div');
        bookDisplay.classList.add('book');
        
        let title = document.createElement('h2');
        title.classList.add('bookTitle');
        title.textContent = aLibrary[i].title;

        let author = document.createElement('p');
        author.classList.add('author');
        author.textContent = "By " + aLibrary[i].author;

        let numOfPages = document.createElement('p');
        numOfPages.classList.add('numOfPages');
        numOfPages.textContent = aLibrary[i].numOfPages + " pages";

        let isReadDiv = document.createElement('div');
        isReadDiv.classList.add('isReadDiv');

        let isReadLabel = document.createElement('p');
        isReadLabel.classList.add('isReadLabel');
        isReadLabel.textContent = 'Has read:';
        
        let isRead = document.createElement('input')
        isRead.classList.add('isRead');
        isRead.setAttribute('type', 'checkbox');
        if(aLibrary[i].isRead == true){
            console.log("e");
            isRead.setAttribute('checked', "");
        }

        isReadDiv.appendChild(isReadLabel);
        isReadDiv.appendChild(isRead);

        bookDisplay.append(title);
        bookDisplay.appendChild(author);
        bookDisplay.appendChild(numOfPages);
        bookDisplay.appendChild(isReadDiv);

        container.appendChild(bookDisplay);
    }
}

window.onload = function(e){    
    let aLibrary = [];

    addBookToLibrary(aLibrary, "Harry Potter", "J.K. Rowling", 300);
    addBookToLibrary(aLibrary, "The Fundamentals of Web Development", "Randy Connolly and Ricardo Hoar", 1184);
    addBookToLibrary(aLibrary, "Dune", "Frank Herbert", 384, true);

    render(aLibrary);
};