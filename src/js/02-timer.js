import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const picker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
let intervalId = null;
startBtn.disabled = true;
startBtn.disabled = false;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date() ) {
            startBtn.disabled = true;
            return Notiflix.Notify.failure('Please choose a date in the future');
          } else {
            startBtn.disabled = false;
        }   
    }
  };
 const flp = flatpickr(picker, options);
startBtn.addEventListener('click', onStartBtn);

function onStartBtn() {
    intervalId = setInterval(() => {
    startBtn.disabled = true;
    const diff = flp.selectedDates[0]  - Date.now();
      
      if (diff <= 0) {
        clearInterval(intervalId);
        startBtn.disabled = false;
        return;
      }

      const {days, hours, minutes, seconds} = convertMs(diff);
      dataDays.textContent = addLeadingZero(days);
      dataHours.textContent = addLeadingZero(hours);
      dataMinutes.textContent = addLeadingZero(minutes);
      dataSeconds.textContent = addLeadingZero(seconds);
    }, 1000);
  }

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  function addLeadingZero(value) {
    return String(value).padStart(2, 0);
  }


  