import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

let dataStorage;

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};
//
savedTextArea();
refs.form.addEventListener('submit', onFormSubmit);
// addEventListener('DOMContentLoaded', savedTextArea);
refs.form.addEventListener('input', throttle(onInputExist, 500));

function onInputExist(evt) {
  dataStorage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  dataStorage[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataStorage));

  //   const inputStorage = localStorage.getItem(STORAGE_KEY);
  //   const inputStorageData = inputStorage ? JSON.parse(inputStorage) : {};
}

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function savedTextArea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  const parsedMessage = savedMessage ? JSON.parse(savedMessage) : {};

  refs.email.value = parsedMessage.email || '';
  refs.textarea.value = parsedMessage.message || '';

  const updatedMessage = JSON.stringify(parsedMessage);
  localStorage.setItem(STORAGE_KEY, updatedMessage);
}
