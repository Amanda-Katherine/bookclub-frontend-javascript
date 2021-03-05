class Book {
  static allBooks = [];

  constructor(book) {
    this.title = book.title;
    this.author = book.author;
    this.image = book.image;
    this.description = book.description;
    this.id = book.id;

    Book.allBooks.push(this);
  }

  static async createBook(bookInfo) {
    search.firstElementChild.value = "";
    possibleSugs.innerHTML = "";
    let title = bookInfo.title;
    let author = "No known author"; //initialize in case book doesn't have author
    let description;

    //set author
    !!bookInfo.authors ? (author = bookInfo.authors[0]) : null;

    //determine if book is already in database
    this.checkBookDatabase(title, author);

    if (!!bookInfo.description) {
      description = bookInfo.description;
    } else {
      description = "No preview given";
    }

    let bookFinder = Book.allBooks.find((bk) => {
      return bk.title === title && bk.author === author;
    });

    if (!!bookFinder) {
      console.log("this book already exists in the database");

      let bkGrpId = parseInt(grpContainer.id);
      let bkGrp = BookGroup.allGroups.find((group) => group.id === bkGrpId);
      let bkGrpSugBookIds = bkGrp.suggestions.map(
        (suggestion) => suggestion.book_id
      );
      let alreadySuggestedBooks = [];

      for (let bkId of bkGrpSugBookIds) {
        let sugBook = Book.allBooks.find((book) => book.id === bkId);
        alreadySuggestedBooks.push(sugBook);
      }

      let sugAlreadyMade = alreadySuggestedBooks.find(
        (book) => book === bookFinder
      );

      if (!!sugAlreadyMade) {
        alert(
          "Excellent choice. It looks like someone in your group already selected it!"
        );
        grpSugs.style.display = "block";

        return;
      }

      let readBooksbyGrp = bkGrp.books;
      let sugAlreadyRead = readBooksbyGrp.find(
        (book) => book.id === bookFinder.id
      );

      if (!!sugAlreadyRead) {
        alert(
          "Excellent choice. It looks like your group has read that one already!"
        );
        grpSugs.style.display = "block";
        return;
      }
    }

    if (!!bookInfo.description) {
      description = bookInfo.description;
    } else {
      description = "No preview given";
    }

    let image = bookInfo.imageLinks.thumbnail;

    let book = { book: { title, author, description, image } };

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(book),
    };
    document.getElementById("search").value = "";

    //used for development phase
    // fetch(`${LOCALHOST_URL}/books`, options);

    //used for post=deployment
    fetch(`${HEROKU_URL}/books`, options)
      .then((resp) => resp.json())
      .then((book) => new Book(book))
      .then((book) => Suggestion.createSuggestion(book.id));
  }
}
