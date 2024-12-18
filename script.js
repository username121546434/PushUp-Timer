const timerText = document.getElementById("timerText");
const circle = document.getElementById("circle");
const body = document.body;
const startBtn = document.getElementById("startBtn");
const cancelBtn = document.getElementById("cancelBtn");
const configSection = document.getElementById("configSection");
const title = document.getElementById("title");

let pushUps = 10;
let secondsPerPushUp = 3;
let intervalId;

startBtn.addEventListener("click", () => {
  pushUps = parseInt(document.getElementById("pushups").value);
  secondsPerPushUp = parseInt(document.getElementById("seconds").value);

  if (isNaN(pushUps) || isNaN(secondsPerPushUp) || pushUps <= 0 || secondsPerPushUp <= 0) {
    alert("Please enter valid numbers!");
    return;
  }
  startTimer(pushUps, secondsPerPushUp);
});

cancelBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  resetUI();
});

function startTimer(pushUps, secondsPerPushUp) {
  clearInterval(intervalId); // Clear any previous timers

  // Hide UI elements
  configSection.classList.add("hidden");
  title.classList.add("hidden");
  cancelBtn.style.display = "block";

  let remainingPushUps = pushUps;
  let phase = "Down";
  let timePerPhase = (secondsPerPushUp / 2) * 1000;

  updateUI(phase);
  intervalId = setInterval(() => {
    if (phase === "Down") {
      phase = "Up";
      remainingPushUps -= 1;
      updateUI(phase);
    } else {
      phase = "Down";
      updateUI(phase);
    }

    if (remainingPushUps <= 0) {
      clearInterval(intervalId);
      timerText.textContent = "Done! Well Done!";
      body.classList.remove("dim");
      circle.style.transform = "scale(1)";
      cancelBtn.style.display = "none";
    }
  }, timePerPhase);
}

function updateUI(phase) {
  if (phase === "Down") {
    timerText.textContent = "Down";
    body.classList.add("dim");
    circle.style.transform = "scale(0.3)";
  } else {
    timerText.textContent = "Up";
    body.classList.remove("dim");
    circle.style.transform = "scale(1)";
  }
}

function resetUI() {
  clearInterval(intervalId);
  timerText.textContent = "Get Ready";
  body.classList.remove("dim");
  circle.style.transform = "scale(1)";
  configSection.classList.remove("hidden");
  title.classList.remove("hidden");
  cancelBtn.style.display = "none";
}
