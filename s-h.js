
const searchButton = document.querySelector('.intcontanier button');
const clearButton = document.querySelector('.passcontainer button');
const searchInput = document.querySelector('.intbox');
const paragraphArea = document.getElementById('passid');

// Function to highlight text
function highlightText() {
    const searchTerm = searchInput.value.trim();
    const paragraph = paragraphArea.value;

    if (searchTerm === '') {
        alert('Please enter a word to search.');
        return;
    }

    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const highlightedText = paragraph.replace(regex, '<mark>$1</mark>');

    paragraphArea.style.display = 'none';
    const displayDiv = document.createElement('div');
    displayDiv.innerHTML = highlightedText;
    displayDiv.id = 'highlightedText';
    displayDiv.style.padding = '10px';
    displayDiv.style.border = '1px solid #ccc';
    displayDiv.style.borderRadius = '15px';
    displayDiv.style.backgroundColor = 'white';
    displayDiv.style.marginTop = '10px';
    document.querySelector('.passcontainer').appendChild(displayDiv);
}

// Function to clear highlights
function clearHighlights() {
    const highlightedDiv = document.getElementById('highlightedText');
    if (highlightedDiv) {
        highlightedDiv.remove();
    }
    paragraphArea.style.display = 'block';
    searchInput.value = '';
}

// Event Listeners
searchButton.addEventListener('click', highlightText);
clearButton.addEventListener('click', clearHighlights);
