/* ====== Lógica ====== */
let counter = 0;            // centésimas (100 centésimas = 1 segundo)
let interval = null;
let mode = "";
let timerDuration = 0;     // para recordar el valor seteado del timer (centésimas)

function startStopwatch() {
  if (interval !== null) return;
  interval = setInterval(() => {
    counter++;
    document.getElementById("num").textContent = formatSimpleTime(counter);
  }, 10);
}

function addNum() { startStopwatch(); } // alias si lo necesitas

function setMode(newMode) {
  // Parar si hay algo corriendo
  stopAllIntervals();

  mode = newMode;
  counter = 0;
  document.getElementById("num").textContent = "00:00:00:00";

  // Mostrar/ocultar inputs de timer si existen
  const timerInputs = document.getElementById("timerInputs");
  if (timerInputs) {
    if (mode === "timer") timerInputs.classList.remove("hidden");
    else timerInputs.classList.add("hidden");
  }
}

function setTimerFromInputs() {
  const h = parseInt(document.getElementById("hours").value) || 0;
  const m = parseInt(document.getElementById("minutes").value) || 0;
  const s = parseInt(document.getElementById("seconds").value) || 0;

  timerDuration = (h * 3600 + m * 60 + s) * 100; // centésimas
  counter = timerDuration;
  document.getElementById("num").textContent = formatSimpleTime(counter);
}

function startTimer() {
  if (interval !== null) return;
  if (!timerDuration || timerDuration <= 0) {
    alert("Configura un tiempo válido y presiona 'Set' antes de iniciar.");
    return;
  }

  // aseguramos que la cuenta comience desde el valor actual (timerDuration o counter)
  if (!counter) counter = timerDuration;

  interval = setInterval(() => {
    counter--;
    document.getElementById("num").textContent = formatSimpleTime(counter);

    if (counter <= 0) {
      clearInterval(interval);
      interval = null;
      counter = 0;
      document.getElementById("num").textContent = formatSimpleTime(0);
      alert("⏰ ¡Tiempo terminado!");
    }
  }, 10);
}

function start() {
  if (interval !== null) return;

  if (mode === "stopwatch") {
    startStopwatch();
  } else if (mode === "timer") {
    startTimer();
  } else {
    alert("Selecciona primero un modo: Cronómetro o Temporizador");
  }
}

function stopAllIntervals() {
  if (interval !== null) {
    clearInterval(interval);
    interval = null;
  }
}
function stopStopwatch() { stopAllIntervals(); }

function resetStopwatch() {
  stopAllIntervals();
  if (mode === "timer") {
    // reset al valor seteado del timer (si existe), o a 0
    counter = timerDuration || 0;
    document.getElementById("num").textContent = formatSimpleTime(counter);
  } else {
    counter = 0;
    document.getElementById("num").textContent = "00:00:00:00";
  }
}

function formatSimpleTime(count) {
  if (!Number.isFinite(count) || count < 0) count = 0;
  const centiseconds = Math.floor(count % 100);
  const seconds = Math.floor(count / 100) % 60;
  const minutes = Math.floor(count / 6000) % 60;
  const hours = Math.floor(count / 360000);
  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}:${padZero(centiseconds)}`;
}
function padZero(num) { return String(num).padStart(2, '0'); }


const toggleBtn = document.getElementById("themesToggle");
  const themesMenu = document.getElementById("themesMenu");

  // Toggle menu when clicking Themes button
  toggleBtn.addEventListener("click", () => {
    themesMenu.classList.toggle("hidden");
  });

  // Optional: close menu if you click outside
  document.addEventListener("click", (e) => {
    if (!themesMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      themesMenu.classList.add("hidden");
    }
  });