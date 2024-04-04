const playBtn = document.querySelector(".playbtn");
const lapBtn = document.querySelector(".lapbtn");
const resetBtn = document.querySelector(".resetbtn");
const lapsList = document.querySelector(".laps");
const clearLapsBtn = document.querySelector(".clearbtn");

let timer;
let isRunning = false;
let lapNumber = 1;

playBtn.addEventListener("click", togglePlay);
lapBtn.addEventListener("click", recordLap);
resetBtn.addEventListener("click", resetStopwatch);
clearLapsBtn.addEventListener("click", clearLaps);

function togglePlay() {
    if (!isRunning) {
        startTimer();
        playBtn.textContent = "Pause";
        lapBtn.classList.remove("visibility");
        resetBtn.classList.remove("visibility");
        clearLapsBtn.classList.add("laptime");
    } else {
        pauseTimer();
        playBtn.textContent = "Start";
        lapBtn.classList.add("visibility");
        resetBtn.classList.add("visibility");
        clearLapsBtn.classList.remove("laptime");
    }
    isRunning = !isRunning;
}

function startTimer() {
    let startTime = Date.now();
    timer = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        displayTime(elapsedTime);
    }, 10);
}

function pauseTimer() {
    clearInterval(timer);
}

function displayTime(elapsedTime) {
    const milliseconds = Math.floor(elapsedTime % 1000 / 10);
    const seconds = Math.floor(elapsedTime / 1000 % 60);
    const minutes = Math.floor(elapsedTime / 60000 % 60);

    const formattedMilliseconds = milliseconds < 10 ? `0${milliseconds}` : milliseconds;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const progressCircle = document.querySelector(".progress-circle");
    const timeDisplay = document.querySelector(".time-display");

    const progress = elapsedTime / 60000 * 100; // Convert milliseconds to minutes and calculate percentage progress

    progressCircle.style.clip = `rect(0, 200px, 200px, ${100 - progress}% )`;
    timeDisplay.innerHTML = `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
}

function recordLap() {
    const lapTime = document.querySelector(".time-display").textContent;
    const lapItem = document.createElement("li");
    lapItem.classList.add("lap-item");
    lapItem.textContent = `Lap ${lapNumber++}: ${lapTime}`;
    lapsList.appendChild(lapItem);
}

function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    playBtn.textContent = "Start";
    lapBtn.classList.add("visibility");
    resetBtn.classList.add("visibility");
    clearLapsBtn.classList.remove("laptime");
    lapNumber = 1;
    displayTime(0);
    lapsList.innerHTML = "";
}

function clearLaps() {
    lapsList.innerHTML = "";
    lapNumber = 1;
}
