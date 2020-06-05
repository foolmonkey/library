class Book {
    constructor(title, authorName, pages, readStatus = false) {
        this.title = title;
        this.author = authorName;
        this.numOfPages = pages;
        this.isRead = readStatus;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    get books() { return this._books; }

    set books(value) { this._books = value; }

    addBookToLibrary(title, authorName, pages, readStatus = false) {
        this.books.push(new Book(title, authorName, pages, readStatus));

        window.localStorage.setItem("library", JSON.stringify(this.books));
    }

    addExampleBooks() {
        this.addBookToLibrary("Harry Potter", "J.K. Rowling", 309);
        this.addBookToLibrary("The Fundamentals of Web Development", "Randy Connolly and Ricardo Hoar", 1184);
        this.addBookToLibrary("Dune", "Frank Herbert", 384, true);
    }

    addLibraryToLocalStorage() {
        if (window.localStorage.length == 0) {
            window.localStorage.setItem("library", JSON.stringify(this.library));
            this.addExampleBooks();
        } else {
            let libraryCopy = JSON.parse(window.localStorage.getItem("library"));

            this.books = libraryCopy;
        }
    }
}

// takes an array of books and appends its values to a container
function render(library) {
    let container = document.getElementById("container");

    container.innerHTML = "";

    for (let i = 0, len = library.length; i < len; i++) {
        let bookDisplay = document.createElement("div");
        bookDisplay.classList.add("book");

        let bookInfo = document.createElement("div");
        bookInfo.classList.add("bookInfo");

        let title = document.createElement("h2");
        title.classList.add("bookTitle");
        title.textContent = library[i].title;

        let author = document.createElement("p");
        author.classList.add("author");
        author.textContent = "By " + library[i].author;

        let numOfPages = document.createElement("p");
        numOfPages.classList.add("numOfPages");
        numOfPages.textContent = library[i].numOfPages + " pages";

        let isReadDiv = document.createElement("div");
        isReadDiv.classList.add("isReadDiv");

        let isReadLabel = document.createElement("p");
        isReadLabel.classList.add("isReadLabel");
        isReadLabel.textContent = "Has read:";

        let isRead = document.createElement("input");
        isRead.classList.add("isRead");
        isRead.setAttribute("type", "checkbox");
        if (library[i].isRead == true) {
            isRead.setAttribute("checked", "");
        }

        let deleteButton = document.createElement("div");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("delete");

        deleteButton.addEventListener("click", function () {
            library.splice(i, 1);

            // update local storage
            window.localStorage.setItem("library", JSON.stringify(library));
            render(library);
        });

        isReadDiv.appendChild(isReadLabel);
        isReadDiv.appendChild(isRead);

        bookInfo.append(title);
        bookInfo.appendChild(author);
        bookInfo.appendChild(numOfPages);
        bookDisplay.appendChild(bookInfo);
        bookDisplay.appendChild(isReadDiv);
        bookDisplay.appendChild(deleteButton);

        container.appendChild(bookDisplay);

        let readButton = document.getElementsByClassName("isRead")[i];

        readButton.addEventListener("click", function () {
            if (library[i].isRead == true) {
                library[i].isRead = false;
            } else {
                library[i].isRead = true;
            }

            // update local storage
            window.localStorage.setItem("library", JSON.stringify(library));
        });
    }
}

window.onload = function (e) {
    let library = new Library();
    library.addLibraryToLocalStorage();

    // add books to library
    render(library.books);

    // add form functionality
    let popup = document.getElementById("popup");
    let inputFields = document.getElementsByClassName("bookData");

    // add book button
    let addButton = document.getElementById("addBook");
    addButton.addEventListener("click", function (e) {
        addButton.style.visibility = "hidden";
        popup.style.visibility = "visible";
    });

    // close window button
    let closeWindow = document.getElementById("cancel");
    closeWindow.addEventListener("click", function (e) {
        popup.style.visibility = "hidden";
        addButton.style.visibility = "visible";

        // empty all the fields
        for (let i = 0; i < 3; i++) {
            inputFields[i].value = "";
        }
    });

    let submitButton = document.getElementById("add");

    submitButton.addEventListener("click", function (e) {
        let itemsFilled = true;

        for (let i = 0; i < 3; i++) {
            if (inputFields[i].value.trim() == "") {
                itemsFilled = false;
            }
        }

        if (itemsFilled) {
            console.log('items filled');
            library.addBookToLibrary(
                inputFields[0].value,
                inputFields[1].value,
                inputFields[2].value,
                inputFields[3].checked
            );

            popup.style.visibility = "hidden";
            addButton.style.visibility = "visible";
            location.reload();
        }
    });
};
