document.addEventListener("DOMContentLoaded", () => {

  /* ====== Variables ====== */
  let counter = 0;            // centésimas (100 centésimas = 1 segundo)
  let interval = null;
  let mode = "";
  let timerDuration = 0;      // valor seteado del timer (centésimas)

  const numDisplay = document.getElementById("num");
  const timerInputs = document.getElementById("timerInputs");

  /* ====== Funciones de tiempo ====== */
  function padZero(num) { return String(num).padStart(2, "0"); }

  function formatSimpleTime(count) {
    if (!Number.isFinite(count) || count < 0) count = 0;
    const centiseconds = Math.floor(count % 100);
    const seconds = Math.floor(count / 100) % 60;
    const minutes = Math.floor(count / 6000) % 60;
    const hours = Math.floor(count / 360000);
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}:${padZero(centiseconds)}`;
  }

  function stopAllIntervals() {
    if (interval !== null) {
      clearInterval(interval);
      interval = null;
    }
  }

  /* ====== Cronómetro ====== */
  function startStopwatch() {
    if (interval !== null) return;
    interval = setInterval(() => {
      counter++;
      numDisplay.textContent = formatSimpleTime(counter);
    }, 10);
  }

  function stopStopwatch() { stopAllIntervals(); }

  function resetStopwatch() {
    stopAllIntervals();
    if (mode === "timer") {
      counter = timerDuration || 0;
    } else {
      counter = 0;
    }
    numDisplay.textContent = formatSimpleTime(counter);
  }

  /* ====== Temporizador ====== */
  function setTimerFromInputs() {
    const h = parseInt(document.getElementById("hours").value) || 0;
    const m = parseInt(document.getElementById("minutes").value) || 0;
    const s = parseInt(document.getElementById("seconds").value) || 0;

    timerDuration = (h * 3600 + m * 60 + s) * 100; // centésimas
    counter = timerDuration;
    numDisplay.textContent = formatSimpleTime(counter);
  }

  function startTimer() {
    if (interval !== null) return;
    if (!timerDuration || timerDuration <= 0) {
      alert("Configura un tiempo válido y presiona 'Set' antes de iniciar.");
      return;
    }

    if (!counter) counter = timerDuration;

    interval = setInterval(() => {
      counter--;
      numDisplay.textContent = formatSimpleTime(counter);

      if (counter <= 0) {
        clearInterval(interval);
        interval = null;
        counter = 0;
        numDisplay.textContent = formatSimpleTime(0);
        alert("⏰ ¡Tiempo terminado!");
      }
    }, 10);
  }

  /* ====== Modo ====== */
  function setMode(newMode) {
    stopAllIntervals();
    mode = newMode;
    counter = 0;
    numDisplay.textContent = "00:00:00:00";

    if (timerInputs) {
      if (mode === "timer") timerInputs.classList.remove("hidden");
      else timerInputs.classList.add("hidden");
    }
  }

  /* ====== Botón Start ====== */
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

  /* ====== Toggle menú Themes ====== */
  const toggleBtn = document.getElementById("themesToggle");
  const themesMenu = document.getElementById("themesMenu");

  toggleBtn.addEventListener("click", () => {
    themesMenu.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!themesMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      themesMenu.classList.add("hidden");
    }
  });

  /* ====== Listeners de botones ====== */
  document.getElementById("btnStart").addEventListener("click", start);
  document.getElementById("btnStop").addEventListener("click", stopStopwatch);
  document.getElementById("btnReset").addEventListener("click", resetStopwatch);

  document.getElementById("btnStopwatch").addEventListener("click", () => setMode("stopwatch"));
  document.getElementById("btnTimer").addEventListener("click", () => setMode("timer"));
  document.getElementById("btnSetTimer")?.addEventListener("click", setTimerFromInputs);

});