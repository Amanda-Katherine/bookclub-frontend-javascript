class Suggestion {
  static allSuggestions = [];

  constructor(suggestion) {
    this.id = suggestion.id;
    this.vote = suggestion.vote;
    this.book_id = suggestion.book_id;
    this.book_group_id = suggestion.book_group_id;

    Suggestion.allSuggestions.push(this);
  }

  static createSuggestion(sugInfo) {
    let book_id = sugInfo;
    let book_group_id = parseInt(grpContainer.id);
    let vote;

    let sugFinder = Suggestion.allSuggestions.find(
      (sug) => sug.book_id === book_id && sug.book_group_id === book_group_id
    );

    if (!!sugFinder) {
      let bg = BookGroup.allGroups.find((group) => (group.id = book_group_id));

      grpSugs.style.display = "block";
      return;
    } else {
      let vote = "0";
    }

    let suggestion = { suggestion: { book_id, book_group_id, vote } };

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(suggestion),
    };

    //used for development phase
    // fetch(`${LOCALHOST_URL}/suggestions`, options);

    //used for post-deployment
    fetch(`${HEROKU_URL}/suggestions`, options)
      .then((resp) => resp.json())
      .then((suggestion) => new Suggestion(suggestion))
      .then((sug) => {
        let bookGroup = BookGroup.allGroups.find(
          (bg) => bg.id === sug.book_group_id
        );
        bookGroup.suggestions.push(sug);
        let suggestedBook = Book.allBooks.find(
          (book) => book.id === sug.book_id
        );

        this.renderSuggestion(suggestedBook);
      });
  }

  static fetchSuggestionOptions() {
    possibleSugs.innerHTML = "";

    let search = document.getElementById("search").value;

    if (search.trim() === "") {
      alert("Search bar may not be blank");
      return;
    }
    return fetch("https://www.googleapis.com/books/v1/volumes?q=" + search)
      .then((response) => response.json())
      .then((data) => Suggestion.renderSuggestions(data.items));
  }

  static renderSuggestions(data) {
    search.firstElementChild.value = "";

    grpContainer.append(sugContainer);

    for (let suggestion of data) {
      this.renderSuggestion(suggestion);
    }
  }

  static renderSuggestion(data) {
    let bookContainer = document.createElement("section");
    let title = document.createElement("div");
    let author = document.createElement("div");
    let description = document.createElement("div");
    let img = document.createElement("img");
    let button = document.createElement("button");
    let voteContainer = document.createElement("div");
    let voteCount = document.createElement("p");

    let sugCount = document.getElementsByClassName("sug-card").length;

    this.setPageHeader(data);

    bookContainer.append(title, author, description, img, voteContainer);
    voteContainer.append(voteCount);
    sugContainer.append(possibleSugs, grpSugs);

    let bookInfo;
    let suggestion;

    if (data.volumeInfo) {
      bookInfo = data.volumeInfo;

      possibleSugs.append(bookContainer);
      possibleSugs.style.display = "block";
      grpSugs.style.display = "none";

      bookContainer.append(button);
      button.id = `button-${sugCount + 1}`;
      button.type = "click";
      button.innerHTML = "Suggest this Book";

      button.addEventListener("click", function () {
        Book.createBook(bookInfo);
      });
    } else {
      bookInfo = data;

      possibleSugs.style.display = "none";
      grpSugs.style.display = "block";

      grpSugs.append(bookContainer);

      suggestion = Suggestion.allSuggestions.find((sug) => {
        return (
          sug.book_id === data.id &&
          sug.book_group_id === parseInt(grpContainer.id)
        );
      });

      voteCount.innerText = `${suggestion.vote} vote(s) for this book`;
      voteContainer.append(button);

      button.id = `${suggestion.id}-sug-id`;
      button.type = "click";
      button.innerHTML = "Vote for this Book";

      button.addEventListener("click", () => {
        suggestion.postFetchAddVote();
      });
    }

    title.id = "title";
    author.id = "author";
    description.id = "description";
    img.id = "cover-image";
    bookContainer.id = `${sugCount + 1}-sug`;

    possibleSugs.setAttribute("class", "possible-suggestions");
    grpSugs.setAttribute("class", "suggested-books");
    title.setAttribute("class", "book-details");
    author.setAttribute("class", "book-details");
    description.setAttribute("class", "book-details");
    img.setAttribute("class", "book-details");
    voteContainer.setAttribute("class", "vote-container");
    voteCount.setAttribute("class", "vote-count");
    bookContainer.setAttribute("class", "sug-card");

    title.innerHTML += "<p class='title'>" + bookInfo.title + "</p>";

    if (!!bookInfo.authors) {
      author.innerHTML +=
        "<h4><strong>Written by: </strong>" + bookInfo.authors[0] + "</h2>";
    } else if (!!bookInfo.author) {
      author.innerHTML +=
        "<h4><strong>Written by: </strong>" + bookInfo.author + "</h2>";
    } else {
      author.innerHTML += "<h4>No known author</h2>";
    }

    if (!!bookInfo.description) {
      description.innerHTML += "<p>" + bookInfo.description;
    } else {
      description.innerHTML +=
        "<p><strong>Description:</strong> No Description Available</p>";
    }

    if (!!bookInfo.imageLinks) {
      img.src += bookInfo.imageLinks.thumbnail;
    } else if (!!bookInfo.image) {
      img.src += bookInfo.image;
    } else {
      img.src +=
        "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101065/112815953-stock-vector-no-image-available-icon-flat-vector.jpg?ver=6";
    }
  }

  static setPageHeader(data) {
    if (!!data.volumeInfo) {
      sugContainer.innerHTML =
        "<p class='suggestion-tagline'> Suggest a Book to Read </p>";
    } else {
      sugContainer.innerHTML =
        "<p class='suggestion-tagline'> Current Club Suggestions </p>";
    }
  }

  postFetchAddVote() {
    let newVoteCount = this.vote + 1;

    //used for development phase
    // fetch(`${LOCALHOST_URL}/suggestions/${this.id}`, {

    // used for post-deployment
    fetch(`${HEROKU_URL}/suggestions/${this.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id: this.id,
        vote: newVoteCount,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            `Hmmm, looks like there was a ${response.status} error.  This did not save to the database`
          );
        }
      })
      .then((suggestionResp) => {
        let sug = Suggestion.allSuggestions.find((s) => {
          return s.id === suggestionResp.id;
        });
        sug.vote = suggestionResp.vote;

        let sugVoteButton = document.getElementById(`${sug.id}-sug-id`);
        let voteText = sugVoteButton.parentElement;

        voteText.innerText = `${sug.vote} vote(s) for this book`;
      })
      .catch((error) => alert(error));
  }
}
