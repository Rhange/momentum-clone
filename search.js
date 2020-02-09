const searchForm = document.querySelector(".js-search"),
  searchInput = searchForm.querySelector("input");

function handleSearch(e) {
  e.preventDefault();
  const currentValue = searchInput.value;
  console.log(searchInput.value);
  location.href = "https://www.google.com/search?q=" + currentValue;
  searchInput.value = "";
}

function init() {
  searchForm.addEventListener("submit", handleSearch);
}

init();
