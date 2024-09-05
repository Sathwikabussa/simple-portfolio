let searchInputEl = document.getElementById("searchInput");
let spinnerEl = document.getElementById("spinner");
let searchResultsEl = document.getElementById("searchResults");

function createAndAppendResult(result) {
    let {
        title,
        link,
        description
    } = result;

    // CREATING RESULT ITEM
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl);
    //CREATING TITLE ELEMENT
    let resultTitle = document.createElement("a");
    resultTitle.classList.add("result-title");
    resultTitle.textContent = title;
    resultTitle.href = link;
    resultTitle.target = "_blank";
    searchResultsEl.appendChild(resultTitle);
    // CREATING BREAK ELEMENT
    let breakEl = document.createElement("br");
    resultTitle.appendChild(breakEl);
    // CREATING URL ELEMENT
    let resultUrlEl = document.createElement("url");
    resultUrlEl.classList.add("result-url");
    resultUrlEl.textContent = link;
    resultUrlEl.href = link;
    resultUrlEl.target = "_blank";
    searchResultsEl.appendChild(resultUrlEl);
    // CREATING BREAK ELEMENT
    let breakEle = document.createElement("br");
    searchResultsEl.appendChild(breakEle);
    // CREATING DESCRIPTION ELEMENT
    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = description;
    searchResultsEl.appendChild(descriptionEl);
}

function displayResults(searchResults) {
    for (let result of searchResults) {
        spinnerEl.classList.add("d-none");
        createAndAppendResult(result);
    }
}

function searchResults(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        let searchInput = searchInputEl.value;
        searchResultsEl.textContent = "";
        let options = {
            method: "GET",
        };

        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        fetch(url, options)
            .then(function(response) {
                return response.json()
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}
searchInputEl.addEventListener("keydown", searchResults);