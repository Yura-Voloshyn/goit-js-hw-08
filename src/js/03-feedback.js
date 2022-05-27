import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const dataStorage = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};
// savedTextArea();

refs.form.addEventListener('submit', onFormSubmit);
addEventListener('DOMContentLoaded', savedTextArea);
refs.form.addEventListener('input', throttle(onInputExist, 500));

function onInputExist(evt) {
  evt.preventDefault();

  dataStorage[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataStorage));
}

// refs.textarea.addEventListener('input', throttle(onMessageInput, 500));
function onFormSubmit(evt) {
  evt.preventDefault();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function savedTextArea() {
  //   const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  //   const parsedMessage = JSON.parse(savedMessage);
  if (savedMessage) {
    try {
      const parsedMessage = JSON.parse(savedMessage);
      refs.email.value = parsedMessage.email || '';
      refs.textarea.value = parsedMessage.message || '';
    } catch (error) {
      console.log('error', error);
    }
  }
}
