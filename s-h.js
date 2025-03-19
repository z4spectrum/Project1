// Get references to elements
const userParagraph = document.getElementById('userParagraph');
const updateBtn = document.getElementById('updateBtn');
const textContainer = document.getElementById('textContainer');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');

// When user clicks "Update Paragraph", put the text into textContainer
updateBtn.addEventListener('click', () => {
  const userText = userParagraph.value;
  textContainer.textContent = userText;
  removeHighlights();
});

// Function to remove existing highlights
function removeHighlights() {
  const highlightedElements = textContainer.querySelectorAll('.highlight');
  highlightedElements.forEach((el) => {
    const parent = el.parentNode;
    parent.replaceChild(document.createTextNode(el.textContent), el);
    parent.normalize();
  });
}

// Function to highlight text
function highlightText(searchTerm) {
  if (!searchTerm) return;
  const walker = document.createTreeWalker(textContainer, NodeFilter.SHOW_TEXT, null);
  let node;
  while ((node = walker.nextNode())) {
    const nodeText = node.nodeValue;
    const searchIndex = nodeText.toLowerCase().indexOf(searchTerm.toLowerCase());
    if (searchIndex !== -1) {
      const matchText = nodeText.substring(searchIndex, searchIndex + searchTerm.length);
      const beforeText = document.createTextNode(nodeText.substring(0, searchIndex));
      const afterText = document.createTextNode(nodeText.substring(searchIndex + searchTerm.length));
      const highlightSpan = document.createElement('span');
      highlightSpan.classList.add('highlight');
      highlightSpan.textContent = matchText;
      const parent = node.parentNode;
      parent.replaceChild(afterText, node);
      parent.insertBefore(highlightSpan, afterText);
      parent.insertBefore(beforeText, highlightSpan);
    }
  }
}

// Click event for "Search" button
searchBtn.addEventListener('click', () => {
  removeHighlights();
  const searchTerm = searchInput.value.trim();
  highlightText(searchTerm);
});

// Click event for "Clear Highlights" button
clearBtn.addEventListener('click', () => {
  removeHighlights();
  searchInput.value = '';
});
