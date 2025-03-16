document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('userInput').value = '';
    document.getElementById('searchBox').value = '';
    document.getElementById('highlightedText').innerHTML = '';
});

document.getElementById('highlightButton').addEventListener('click', function() {
    const text = document.getElementById('userInput').value;
    const searchTerm = document.getElementById('searchBox').value;
    if (searchTerm.trim() === '') {
        alert('Please enter a search term.');
        return;
    }
    const highlightedText = text.replace(new RegExp(`(${searchTerm})`, 'gi'), '<span class="highlight">$1</span>');
    document.getElementById('highlightedText').innerHTML = highlightedText;
});
