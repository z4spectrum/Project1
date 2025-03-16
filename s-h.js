document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchBox");
    const searchButton = document.getElementById("searchBtn");
    const clearButton = document.getElementById("clearBtn");
    const resultDiv = document.getElementById("result");

    searchButton.addEventListener("click", function () {
        let searchText = searchInput.value.trim();
        let content = resultDiv.innerHTML;

        if (searchText === "") {
            alert("Please enter a word to search!");
            return;
        }

        // Remove previous highlights before adding new ones
        resultDiv.innerHTML = content.replace(/<span class="highlight">(.*?)<\/span>/gi, "$1");

        // Use regex to wrap matching words with a <span> for highlighting
        let regex = new RegExp(`(${searchText})`, "gi");
        let highlightedText = resultDiv.innerHTML.replace(regex, `<span class="highlight">$1</span>`);

        // Update the div with highlighted text
        resultDiv.innerHTML = highlightedText;
    });

    clearButton.addEventListener("click", function () {
        searchInput.value = "";
        resultDiv.innerHTML = ""; // Clear content
    });
});
