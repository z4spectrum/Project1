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

// Helper function to escape regex special characters
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Function to highlight text (updated to highlight all matches)
function highlightText(searchTerm) {
  if (!searchTerm) return;
  const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
  const walker = document.createTreeWalker(textContainer, NodeFilter.SHOW_TEXT, null);
  let node;
  while ((node = walker.nextNode())) {
    // Use split to get all parts, including matches
    const parts = node.nodeValue.split(regex);
    if (parts.length > 1) {
      const fragment = document.createDocumentFragment();
      parts.forEach((part) => {
        if (part.toLowerCase() === searchTerm.toLowerCase()) {
          const highlightSpan = document.createElement('span');
          highlightSpan.classList.add('highlight');
          highlightSpan.textContent = part;
          fragment.appendChild(highlightSpan);
        } else {
          fragment.appendChild(document.createTextNode(part));
        }
      });
      node.parentNode.replaceChild(fragment, node);
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
