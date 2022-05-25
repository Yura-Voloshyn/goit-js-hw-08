import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const dataStorage = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};
savedTextArea();

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener(
  'input',
  throttle(evt => {
    dataStorage[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataStorage));
  }, 500),
);
// refs.textarea.addEventListener('input', throttle(onMessageInput, 500));

// function onMessageInput(evt) {
//   const message = evt.target.value;
//   //   localStorage.setItem(STORAGE_KEY, message);
//   //   console.log(message);
// }

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log(dataStorage);
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function savedTextArea() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  //   const parsedMessage = JSON.parse(savedMessage);
  if (savedMessage) {
    refs.email.value = savedMessage.email;
    refs.textarea.value = savedMessage.message;
  }
}
