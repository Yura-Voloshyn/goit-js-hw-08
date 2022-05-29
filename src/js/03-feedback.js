import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};

savedTextArea();
refs.form.addEventListener('submit', onFormSubmit);
// addEventListener('DOMContentLoaded', savedTextArea);
refs.form.addEventListener('input', throttle(onInputExist, 500));
// refs.form.addEventListener('input', onInputExist);

function onInputExist(evt) {
  evt.preventDefault();

  const logStorage = {
    email: refs.email.value,
    message: refs.textarea.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logStorage));
}

function savedTextArea() {
  const dataStorage = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

  refs.email.value = dataStorage.email || '';
  refs.textarea.value = dataStorage.message || '';

  const updatedStorage = JSON.stringify(dataStorage);
  localStorage.setItem(STORAGE_KEY, updatedStorage);
}

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
//   console.log(logStorage);
//   logStorage[evt.target.name] = evt.target.value;

//   dataStorage = JSON.parse(localStorage.getItem(STORAGE_KEY));
//   refs.email.value = dataStorage.email || '';
//   refs.textarea.value = dataStorage.message || '';

//   dataStorage[evt.target.name] = evt.target.value;
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(dataStorage));

//   const inputStorage = localStorage.getItem(STORAGE_KEY);
//   const inputStorageData = inputStorage ? JSON.parse(inputStorage) : {};

// function savedTextArea() {
//   const savedMessage = localStorage.getItem(STORAGE_KEY);

//   const parsedMessage = savedMessage ? JSON.parse(savedMessage) : {};

//   refs.email.value = parsedMessage.email || '';
//   refs.textarea.value = parsedMessage.message || '';

//   const updatedMessage = JSON.stringify(parsedMessage);
//   localStorage.setItem(STORAGE_KEY, updatedMessage);
// }
