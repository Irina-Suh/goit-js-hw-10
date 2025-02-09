// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  fulfilledRadio: document.querySelector('input[name="state"][value="fulfilled"]'),
  rejectedRadio: document.querySelector('input[name="state"][value="rejected"]'),
  btn: document.querySelector('button'),
};

refs.form.addEventListener('submit', (event) => {
    event.preventDefault();

    const delay = Number(refs.delay.value);
    const state = refs.fulfilledRadio.checked ? 'fulfilled' : 'rejected';

createPromise(delay, state)
    .then((message) => {
      iziToast.success({
        title: 'OK',
        message: `✅ Fulfilled promise in ${message}ms`,
      });
    })
    .catch((message) => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${message}ms`,
      });
    });

});
function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state !== 'fulfilled') {
                reject(delay);
                
            } else { resolve(delay); }
            
      
        }, delay);
    });

};
