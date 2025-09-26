
let counter = 0;
let interval = null; // Para controlar el intervalo

function addNum() {
    // Si ya está corriendo, no hacer nada
    if (interval !== null) return;
    
    // Iniciar el intervalo que se ejecuta cada 10 milisegundos
    interval = setInterval(() => {
        counter++;
        document.getElementById("num").innerHTML = formatSimpleTime(counter);
        
    }, 10);
    
}

function formatSimpleTime(count) {
    // Cada count representa 10 centésimas de segundo
    const centiseconds = count % 100;
    const seconds = Math.floor(count / 100) % 60;
    const minutes = Math.floor(count / 6000) % 60;
    const hours = Math.floor(count / 360000);
    
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}:${padZero(centiseconds)}`;
}
function stopStopwatch() {
    if (interval !== null) {
        clearInterval(interval);
        interval = null;
    }
}
function resetStopwatch() {
    stopStopwatch();
    counter = 0;
    document.getElementById("num").innerHTML = "00:00:00:00";
}

function padZero(num) {
    return num.toString().padStart(2, '0');
}


