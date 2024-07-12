import form from './services/form_Services.js';
import onClick from './services/onClick_Services.js'
import userServices from './services/user_Services.js';

const ProfileImage = document.getElementById("TopBar_Profile"),
    ProfileImageMenu_Tab = document.getElementsByClassName("TopBar_ProfileMenu_Tab"),
    urlParams = new URLSearchParams(window.location.search),
    User_UID = urlParams.get('uid'),
    User_ID = urlParams.get('id'),
    User_Name = urlParams.get('user'),
    SECTIONS = 9

var elements = {
    formSpace : document.getElementById('CandidateFormSpace'),
    tab : document.getElementsByClassName("navigationBar_Tab"),
    menu: document.getElementById("TopBar_Menu"),
    profileImageMenu: document.getElementById("TopBar_ProfileMenu"),
    heading: document.getElementById("formSpace_Heading"),
    sideNav: document.getElementById("NavigationBar"),
    activeUser: null,
    userLog: null,
    sections: SECTIONS
}

var formData = null;



window.addEventListener('DOMContentLoaded', async () => {
    if(User_UID == null || User_ID == null || User_Name == null) {
        console.log("Invalid User");
        window.location.href = ("../index.html");
    } else {
        console.log("Valid User");
        const User = document.getElementById('CandidateName');
        User.innerHTML = User_Name.toString();
    }
    
    const activeUser = {
        uid: User_UID,
        id: User_ID,
        name: User_Name.toString()
    };
    elements.activeUser = activeUser;

    //Extracting user log
    elements.userLog = await userServices.getLog(activeUser);
    // console.log(elements.userLog);
    
})

window.addEventListener('load', async () => {

    //Initiating First Form
    await form.init();
        
    //Validating Login
    await userServices.loginValidate();

    //Grabbing form 
    formData = document.getElementsByTagName('form');
    // console.log("FormData =>", formData)

    //EventListeners
    formData[0].addEventListener('submit', async e => await form.onSubmit(e));
    for(let i = 0; i < elements.tab.length; i++) elements.tab[i].addEventListener("click", e => onClick.navMenuTabs(i));
    for(let i = 0; i < ProfileImageMenu_Tab.length; i++) ProfileImageMenu_Tab[i].addEventListener("click", e => onClick.userMenuTabs(i));
    elements.menu.addEventListener("click", e => onClick.navMenu());
    ProfileImage.addEventListener("click", e => onClick.userMenu());
});

// create an observer instance
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    // console.log(mutation.type);
    // console.log('--------Form Changed---------');
    formData = document.getElementsByTagName('form');
  });    
});
// configuration of the observer:
var config = { attributes: true, childList: true, characterData: true };
// pass in the target node, as well as the observer options
observer.observe(elements.formSpace, config);

class CandidateForm extends HTMLElement {
    async connectedCallback() {
        await form.showLoading();

        // console.log("Form->", loadForm);
        // console.log("Data->", formData);
        // this.innerHTML=loadForm;
        // loadForm();
        // console.log("A", this.innerHTML);

    }
}

customElements.define('candidate-form', CandidateForm);

export {elements as default}
