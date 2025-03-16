// Check browser support for SpeechRecognition
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition; 
let isRecording = false;

// If the browser supports speech recognition, create an instance
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  recognition = new window.SpeechRecognition();
  recognition.lang = 'en-US';          // Set language
  recognition.interimResults = false;  // Only return final results
  recognition.continuous = false;      // Stop automatically after speaking
} else {
  alert('Sorry, your browser does not support Speech Recognition.');
}

// Grab DOM elements
const recordBtn = document.getElementById('recordBtn');
const clearBtn = document.getElementById('clearBtn');
const textInput = document.getElementById('textInput');

// Toggle recording on button click
recordBtn.addEventListener('click', () => {
  if (!recognition) return; // If not supported, do nothing

  if (!isRecording) {
    // Start recording
    recognition.start();
    isRecording = true;
    recordBtn.textContent = 'Stop Recording';
  } else {
    // Stop recording
    recognition.stop();
    isRecording = false;
    recordBtn.textContent = 'Start Recording';
  }
});

// When we get a speech recognition result
if (recognition) {
  recognition.addEventListener('result', (event) => {
    const transcript = event.results[0][0].transcript;
    // Append recognized text to the textarea
    textInput.value += transcript + ' ';
  });

  // When speech recognition ends (user stops talking, or manually stopped)
  recognition.addEventListener('end', () => {
    // If user didn't click "Stop Recording" manually, 
    // recognition will end after a pause in speech.
    // We reset the button text if it’s still set to "Stop Recording".
    if (isRecording) {
      isRecording = false;
      recordBtn.textContent = 'Start Recording';
    }
  });
}

// Clear the text area
clearBtn.addEventListener('click', () => {
  textInput.value = '';
});
