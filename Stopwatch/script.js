function modeChange() {
  document.body.classList.toggle("light-mode");
}
const resetButton = document.getElementById("reset");
const playButton = document.getElementById("play");
const lapButton = document.getElementById("lap");
const clearButton = document.getElementById("clear");
const min = document.getElementById("minute");
const sec = document.getElementById("second");
const mlsec = document.getElementById("millisecond");
const laps = document.getElementById("laps");
let isPlay = false;
let minCounter = 0;
let minute;
let secCounter = 0;
let second;
let mlsecCounter = 0;
let millisecond;
let isReset = false;
const toggleButton = () => {
  lapButton.classList.remove("lap-btn");
  resetButton.classList.remove("reset-btn");
};
const play = () => {
  if (!isPlay && !isReset) {
    playButton.innerHTML = "Pause";
    playMin();
    playSec();
    playMlSec();
    isPlay = true;
    isReset = true;
  } else {
    playButton.innerHTML = "Play";
    clearInterval(minute);
    clearInterval(second);
    clearInterval(millisecond);
    isPlay = false;
    isReset = false;
  }
  toggleButton();
};
const playMin = () => {
  minute = setInterval(() => {
    minCounter++;
    if (minCounter < 10) {
      min.innerHTML = `&nbsp;0${minCounter}&nbsp;:`;
    } else {
      min.innerHTML = `&nbsp;${minCounter}&nbsp;:`;
    }
  }, 60 * 1000);
};
const playSec = () => {
  second = setInterval(() => {
    secCounter++;
    if (secCounter === 60) {
      secCounter = 0;
    }
    if (secCounter < 10) {
      sec.innerHTML = `&nbsp;0${secCounter}&nbsp;:`;
    } else {
      sec.innerHTML = `&nbsp;${secCounter}&nbsp;:`;
    }
  }, 1000);
};
const playMlSec = () => {
  millisecond = setInterval(() => {
    mlsecCounter++;
    if (mlsecCounter === 10) {
      mlsecCounter = 0;
    }
    if (mlsecCounter < 10) {
      mlsec.innerHTML = `&nbsp;0${mlsecCounter}`;
    } else {
      mlsec.innerHTML = `&nbsp;${mlsecCounter}`;
    }
  }, 100);
};
const reset = () => {
  isReset = true;
  play();
  lapButton.classList.add("lap-btn");
  resetButton.classList.add("reset-btn");
  minute.innerHTML = "00 : ";
  sec.innerHTML = "00 : ";
  mlsec.innerHTML = "00";
  laps.remove();
  clearButton.classList.add("clear-btn");
};
const lap = () => {
  const li = document.createElement("li");
  const timestamp = document.createElement("span");
  li.setAttribute("class", "lap-item");
  timestamp.setAttribute("class", "time-stamp");
  const mins = minCounter < 10 ? "0" + minCounter : minCounter;
  const secs = secCounter < 10 ? "0" + secCounter : secCounter;
  const mls = mlsecCounter < 10 ? "0" + mlsecCounter : mlsecCounter;
  timestamp.innerHTML = `${mins} : ${secs} : ${mls}`;
  li.append(timestamp);
  laps.append(li);
  const lapCount = laps.getElementsByTagName("li").length;
  clearButton.classList.remove("clear-btn");
  clearButton.innerText = lapCount === 1 ? "Clear" : "Clear All";
};
const clear = () => {
  laps.innerHTML = "";
  clearButton.classList.add("clear-btn");
};
playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
clearButton.addEventListener("click", clear);
