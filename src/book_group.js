class BookGroup {
  static allGroups = [];

  constructor(group) {
    this.name = group.name;
    this.id = group.id;
    BookGroup.allGroups.push(this);

    this.books = group.books;
    this.suggestions = group.suggestions.map(
      (suggestion) => new Suggestion(suggestion)
    );
    this.gatherings = group.gatherings.map(
      (gathering) => new Gathering(gathering)
    );
    this.members = group.members.map((member) => new Member(member));
  }

  static async fetchClubNamesandBooks() {
    let [groupsResponse, booksResponse] = await Promise.all([
      fetch("http://localhost:3000/book_groups"),
      fetch("http://localhost:3000/books"),
    ]);

    let groups = await groupsResponse.json();
    let books = await booksResponse.json();

    for (let book of books) {
      let newBook = new Book(book);
    }
    for (let group of groups) {
      let newGroup = new BookGroup(group);
    }
    this.renderGroups();
  }

  static renderGroups() {
    document.getElementById("app-container").style.display = "block";

    search.style.display = "none";
    document
      .getElementById("nav-select-club")
      .addEventListener("click", () => BookGroup.renderGroups());

    grpSugs.innerHTML = "";

    grpContainer.innerHTML = "";

    let loginForm = document.getElementById("login-form-container");

    if (loginForm) {
      loginForm.style.display = "none";
    }

    // non-destructively exclude first group - this is a default group for members
    // that do not currently belong to a group and does not need to be rendered
    let memberedBookGroup = BookGroup.allGroups.slice(1);

    for (let group of memberedBookGroup) {
      group.renderGroup();
    }
  }

  renderGroup() {
    let pgh = document.createElement("p");
    pgh.id = `group-${this.id}`;
    pgh.setAttribute("class", "group-name");
    pgh.innerText = this.name;

    grpContainer.append(pgh);
    appContainer.append(grpContainer);
    let groupId = this.id - 1;

    pgh.addEventListener("click", () => {
      let bg = BookGroup.allGroups.find((group) => group.id === groupId + 1);

      bg.showGroup();
    });
  }

  showGroup() {
    search.style.display = "block";

    grpContainer.innerHTML = `<h2 class="group-header-name">${this.name}</h2>`;
    grpContainer.id = `${this.id} - group`;
    grpContainer.append(sugContainer);

    let groupSuggestedBookIds = [];
    let groupSuggestedBooks = [];

    for (let suggestion of this.suggestions) {
      groupSuggestedBookIds.push(suggestion.book_id);
    }

    for (let bookId of groupSuggestedBookIds) {
      for (let book of Book.allBooks) {
        if (bookId === book.id) {
          groupSuggestedBooks.push(book);
        }
      }
    }

    for (let book of groupSuggestedBooks) {
      Suggestion.renderSuggestion(book);
    }
  }

  resetGroupSuggestions() {
    let sugIds = this.suggestions.map((sug) => sug.id);

    for (let sug of sugIds) {
      return fetch(`http://localhost:3000/suggestions/${sug}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            return;
          } else {
            throw new Error(
              `Hmmm, looks like there was a ${response.status} error.  Your bookclub's suggestions were not able to be deleted.`
            );
          }
        })
        .then((resp) => {
          console.log(this);
        })
        .catch((error) => alert(error));
    }
  }

  deleteGroupSuggestions() {
    debugger;
    console.log(suggestions);
    // const updatedBookGroup = this.map(({suggestions, ...}))
    // for delete post - create forloop to delete all at once (restfully)
    // once deleted (and confirmed), set this.suggestions = []
  }
}
