import userServices from './services/user_Services.js'

window.addEventListener('load', () => {
    const form = document.getElementsByTagName('form');
    console.log(form);
    const loginMessage = document.getElementsByClassName('formMessage_Hidden');
    form[0].addEventListener('submit', (e)=> userServices.login(e, form[0], loginMessage));

});