let aLibrary = [];

if (window.localStorage.length == 0) {
    addBookToLibrary(aLibrary, "Harry Potter", "J.K. Rowling", 300);
    addBookToLibrary(aLibrary, "The Fundamentals of Web Development", "Randy Connolly and Ricardo Hoar", 1184);
    addBookToLibrary(aLibrary, "Dune", "Frank Herbert", 384, true);

    window.localStorage.setItem("aLibrary", JSON.stringify(aLibrary));
} else {
    let aLibraryCopy = JSON.parse(window.localStorage.getItem("aLibrary"));

    aLibrary = aLibraryCopy;
}

// constructor for book object
function Book(title, authorName, pages, readStatus = false) {
    this.title = title;
    this.author = authorName;
    this.numOfPages = pages;
    this.isRead = readStatus;
    this.index = aLibrary.length;
}

// adds a book object to an array of books
function addBookToLibrary(aLibrary, title, authorName, pages, readStatus = false) {
    aLibrary.push(new Book(title, authorName, pages, readStatus));

    window.localStorage.setItem("aLibrary", JSON.stringify(aLibrary));
}

// takes an array of books and appends its values to a container
function render(aLibrary) {
    let container = document.getElementById('container');

    container.innerHTML = "";

    for (let i = 0, len = aLibrary.length; i < len; i++) {
        let bookDisplay = document.createElement('div');
        bookDisplay.classList.add('book');

        let bookInfo = document.createElement('div');
        bookInfo.classList.add('bookInfo');

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
        if (aLibrary[i].isRead == true) {
            isRead.setAttribute('checked', "");
        }

        isReadDiv.appendChild(isReadLabel);
        isReadDiv.appendChild(isRead);

        bookInfo.append(title);
        bookInfo.appendChild(author);
        bookInfo.appendChild(numOfPages);
        bookDisplay.appendChild(bookInfo);
        bookDisplay.appendChild(isReadDiv);

        container.appendChild(bookDisplay);

        let readButton = document.getElementsByClassName("isRead")[i];

        readButton.addEventListener('click', function () {
            if (aLibrary[i].isRead == true) {
                aLibrary[i].isRead = false;
            } else {
                aLibrary[i].isRead = true;
            }
            console.log("running");

            // update local storage
            window.localStorage.setItem("aLibrary", JSON.stringify(aLibrary));
        });
    }
}

window.onload = function (e) {
    // add books to library
    render(aLibrary);

    // add form functionality
    let popup = document.getElementById('popup');
    let inputFields = document.getElementsByClassName('bookData');

    // add book button
    let addButton = document.getElementById('addBook');
    addButton.addEventListener('click', function (e) {
        addButton.style.visibility = 'hidden';
        popup.style.visibility = 'visible';
    });

    // close window button
    let closeWindow = document.getElementById("cancel");
    closeWindow.addEventListener('click', function (e) {
        popup.style.visibility = 'hidden';
        addButton.style.visibility = 'visible';

        // empty all the fields
        for (let i = 0; i < 3; i++) {
            inputFields[i].value = ' ';
        }
    });

    let submitButton = document.getElementById('add');

    submitButton.addEventListener('click', function (e) {
        let itemsFilled = true;

        for (let i = 0; i < 3; i++) {
            if (inputFields[i].value == ' ') {
                itemsFilled = false;
            }
        }

        if (itemsFilled) {
            addBookToLibrary(aLibrary, inputFields[0].value, inputFields[1].value, inputFields[2].value, inputFields[3].checked);

            popup.style.visibility = 'hidden';
            addButton.style.visibility = 'visible';

            render(aLibrary);
        }
    });
};
