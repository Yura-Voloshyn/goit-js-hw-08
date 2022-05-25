import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const dataStorage = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};

refs.form.addEventListener(
  'input',
  throttle(evt => {
    dataStorage[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataStorage));
  }, 500),
);
refs.form.addEventListener('submit', onFormSubmit);

savedTextArea();

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log(dataStorage);
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function savedTextArea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  //   console.log(savedMessage);
  const parsedMessage = JSON.parse(savedMessage);
  if (parsedMessage) {
    refs.email.value = parsedMessage.email;
    refs.textarea.value = parsedMessage.message;
    // console.log(parsedMessage);
  }
}
