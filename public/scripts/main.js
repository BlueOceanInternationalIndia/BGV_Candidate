import userServices from './services/user_Services.js';

window.addEventListener('load', async () => {
    const iframe = document.getElementById('indexFrame');

    //Validating User
    const validUser = await userServices.userValidate();
    // console.log('ValidUser = ', validUser);
    
    if(validUser.auth == false) {
        iframe.src = './pages/login.html';
    } else {
        // iframe.src = `./pages/landing.html?uid=${validUser.user.uid}&id=${validUser.user.id}&user=${validUser.user.name}`;
        iframe.src = './pages/landing.html';
    }
});


