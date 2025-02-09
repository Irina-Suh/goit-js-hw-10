// // Описаний в документації
import flatpickr from "flatpickr";
// // Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// // Описаний у документації
import iziToast from "izitoast";
// // Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const datetimePicker = document.getElementById('datetime-picker');
const dataStart = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
let userSelectedDate;

dataStart.disabled = true;   
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      
      if (selectedDates[0]<= new Date()) {
          
     iziToast.error({
      title: 'Error',
         message: 'Please choose a date in the future',
     }) 
       dataStart.disabled = true;   
       
          return;
      }
      userSelectedDate = selectedDates[0];
      dataStart.disabled = false;
  },
};



flatpickr(datetimePicker, options);

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
console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


  function addLeadingZero(value) {
            return value.toString().padStart(2, '0');
        }

dataStart.addEventListener('click', () => {
    if (!userSelectedDate) return;
    datetimePicker.disabled = true;
    dataStart.disabled = true;
 
 
    let timerInterval = setInterval(() => {
        const now = new Date();
        const timeLeft = userSelectedDate.getTime() - now.getTime();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            datetimePicker.disabled = false;
            return;
        }
      const time = convertMs(timeLeft);

  
    dataDays.textContent = addLeadingZero(time.days);
    dataHours.textContent = addLeadingZero(time.hours);
    dataMinutes.textContent = addLeadingZero(time.minutes);
    dataSeconds.textContent = addLeadingZero(time.seconds);
    }, 1000);
});




       

       

    