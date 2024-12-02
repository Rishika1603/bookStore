const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchResults = document.getElementById("search-results");
const booksList = document.getElementById("books-list");

searchButton.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (!query) {
    alert("Please enter a search term!");
    return;
  }

  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}`
  );
  const data = await response.json();

  searchResults.innerHTML = "";

  if (data.items && data.items.length > 0) {
    data.items.forEach((item) => {
      const book = item.volumeInfo;
      const bookElement = document.createElement("div");
      bookElement.classList.add("col-12", "col-md-6", "col-lg-4");

      bookElement.innerHTML = `
        <div class="book-item card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">${book.authors ? book.authors.join(", ") : "Unknown Author"}</p>
            <button class="btn btn-success add-button">Add</button>
          </div>
        </div>
      `;

      bookElement.querySelector(".add-button").addEventListener("click", () => {
        addBookToList(book);
      });

      searchResults.appendChild(bookElement);
    });
  } else {
    searchResults.innerHTML = `<p class="text-danger">No results found for "${query}".</p>`;
  }
});

function addBookToList(book) {
  const listItem = document.createElement("li");
  listItem.classList.add("list-group-item");
  listItem.textContent = `${book.title} by ${
    book.authors ? book.authors.join(", ") : "Unknown Author"
  }`;

  booksList.appendChild(listItem);
}
