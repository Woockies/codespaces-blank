// Select DOM elements
const startButton = document.querySelector("#start-btn");
const resetButton = document.querySelector("#reset-btn");
const exerciseTimeInput = document.querySelector("#exercise-time");
const restTimeInput = document.querySelector("#rest-time");
const cyclesInput = document.querySelector("#cycles");
const timerLabel = document.querySelector("#timer-label");
const timeLeftDisplay = document.querySelector("#time-left");

let timeLeft, interval;

// Set up the timer
function setupTimer() {
  const exerciseTime = exerciseTimeInput.value;
  const restTime = restTimeInput.value;
  const cycles = cyclesInput.value;

  timeLeft = exerciseTime;
  timerLabel.textContent = "Exercise Time";
  timeLeftDisplay.textContent = formatTime(exerciseTime);

  let cycleCount = 0;
  interval = setInterval(() => {
    countdown();
    if (timeLeft === 0) {
      cycleCount++;
      if (cycleCount < cycles) {
        if (timerLabel.textContent === "Exercise Time") {
          timeLeft = restTime;
          timerLabel.textContent = "Rest Time";
        } else {
          timeLeft = exerciseTime;
          timerLabel.textContent = "Exercise Time";
        }
        timeLeftDisplay.textContent = formatTime(timeLeft);
      } else {
        clearInterval(interval);
        timerLabel.textContent = "Finished!";
      }
    }
  }, 1000);
}

// Start the timer
function startTimer() {
  setupTimer();
  startButton.disabled = true;
}

// Reset the timer
function resetTimer() {
  clearInterval(interval);
  startButton.disabled = false;
  timeLeftDisplay.textContent = "00:00";
  timerLabel.textContent = "";
}

// Format time in seconds to mm:ss format
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainderSeconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
}

// Countdown function
function countdown() {
  timeLeft--;
  timeLeftDisplay.textContent = formatTime(timeLeft);
}
  
// Add event listeners to buttons
startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);