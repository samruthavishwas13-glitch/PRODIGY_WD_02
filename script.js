let startTime;
let elapsedTime = 0;
let timerInterval;

function formatTime(time) {
    let diffInMin = time / 60000;
    let mm = Math.floor(diffInMin);
    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);
    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");

    return `${formattedMM}:${formattedSS}<span>.${formattedMS}</span>`;
}

function print(txt) {
    document.getElementById("display").innerHTML = txt;
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        print(formatTime(elapsedTime));
    }, 10);
    toggleButtons(true);
    setStatus("RUNNING", true);
}

function pauseTimer() {
    clearInterval(timerInterval);
    toggleButtons(false);
    setStatus("PAUSED", false);
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    print("00:00<span>.00</span>");
    document.getElementById("laps").innerHTML = "";
    toggleButtons(false);
    setStatus("IDLE", false);
}

function recordLap() {
    const lapList = document.getElementById("laps");
    const lapCount = lapList.children.length + 1;
    const currentTime = document.getElementById("display").innerHTML;

    const lapDiv = document.createElement("div");
    lapDiv.classList.add("lap-item");
    lapDiv.innerHTML = `
        <span class="lap-meta">VECTOR ${lapCount.toString().padStart(2, '0')}</span>
        <span class="lap-time">${currentTime}</span>
    `;
    lapList.prepend(lapDiv);
}

function toggleButtons(running) {
    document.getElementById("startBtn").disabled = running;
    document.getElementById("pauseBtn").disabled = !running;
    document.getElementById("lapBtn").disabled = !running;
    // Reset is always available unless we want to enforce specific states
}

function setStatus(text, active) {
    const statusEl = document.getElementById("status");
    statusEl.innerText = text;
    if (active) {
        statusEl.classList.add("active");
    } else {
        statusEl.classList.remove("active");
    }
}