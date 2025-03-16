// Grab elements from the DOM
const speakBtn = document.getElementById('speakBtn');
const textInput = document.getElementById('textInput');

// Add click event to the Speak button
speakBtn.addEventListener('click', () => {
  const text = textInput.value.trim();
  if (text !== '') {
    // Create a new SpeechSynthesisUtterance
    const utterance = new SpeechSynthesisUtterance(text);
    // Speak the text
    speechSynthesis.speak(utterance);
  }
});
