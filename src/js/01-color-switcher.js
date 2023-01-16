const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;
stopBtn.disabled = true;
startBtn.disabled = false;

startBtn.addEventListener("click", () => {
    timerId = setInterval(() => {
    let color = getRandomHexColor ();
document.body.style.backgroundColor = color;
    }, 1000);
startBtn.disabled = true;
stopBtn.disabled = false;
});

function getRandomHexColor() {
return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  
stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
startBtn.disabled = false;
stopBtn.disabled = true;
  });

  

