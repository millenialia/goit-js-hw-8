import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form')
const email = document.querySelector('input')
const message = document.querySelector('textarea')

const FORMSTATE = "feedback-form-state"



formEl.addEventListener('submit', onFormSubmit)

populateInput()

formEl.addEventListener('input', throttle(onFormInput, 500))

let formData = JSON.parse(localStorage.getItem(FORMSTATE)) || {};

function onFormSubmit(event) {
  event.preventDefault();
  console.log(formData);
  if (email.value === '' || message.value === '') {
    return alert('Please fill in all the fields!');
  }
  localStorage.removeItem(FORMSTATE)
  event.target.reset()
  formData = {}
}

function onFormInput(event) {
  formData[event.target.name] = event.target.value
  localStorage.setItem(FORMSTATE, JSON.stringify(formData))
  return formData
}


function populateInput() {

        const savedMessage = JSON.parse(localStorage.getItem(FORMSTATE))
  if (savedMessage) {
    email.value = savedMessage.email || ''
    message.value = savedMessage.message || ''
  }

}