import userValidate from './services/userValidate.js';
import getCookie from './services/cookie.js';

const Tab = document.getElementsByClassName("navigationBar_Tab"),
        Menu = document.getElementById("TopBar_Menu"),
        ProfileImage = document.getElementById("TopBar_Profile"),
        ProfileImageMenu = document.getElementById("TopBar_ProfileMenu"),
        ProfileImageMenu_Tab = document.getElementsByClassName("TopBar_ProfileMenu_Tab"),
        formSpace = document.getElementById('CandidateFormSpace'),
        urlParams = new URLSearchParams(window.location.search),
        User_UID = urlParams.get('uid'),
        User_ID = urlParams.get('id'),
        User_Name = urlParams.get('user'),
        SECTIONS = 9
var formData = null;

window.addEventListener('load', async () => {
    if(User_ID == null || User_Name == null) {
        console.log("Invalid User");
        window.location.href = ("../index.html");
    } else {
        const User = document.getElementById('CandidateName');
        User.innerHTML = User_Name.toString();
    }

    const activeUser = {
        uid: User_UID,
        id: User_ID,
        name: User_Name.toString()
    }

    await validate();
    formData = document.getElementsByTagName('form');
    // console.log("FormData =>", formData)

    formData[0].addEventListener('submit', async (e) => {
        e.preventDefault();
        await validate();
        const activeForm = formSpace.dataset.status;
        // console.log("Active Form -> ", activeForm);

        switch(activeForm) {
            case "Consent Form": 
                onSubmit_Form0(e, activeUser);
                break;
            case "Personal Details": 
                onSubmit_Form1(e, activeUser);
                break;
            case "Address Verification": 
                onSubmit_Form2(e, activeUser);
                break;
            case "Identity Verification": 
                onSubmit_Form3(e, activeUser);
                break;
            case "Court Record Verification": 
                onSubmit_Form4(e, activeUser);
                break;
            case "Education Verification": 
                onSubmit_Form5(e, activeUser);
                break;
            case "Employment Verification": 
                onSubmit_Form6(e, activeUser);
                break;            
            case "Professional Reference Verification": 
                onSubmit_Form7(e, activeUser);
                break;
            case "Personal Reference Verification": 
                onSubmit_Form8(e, activeUser);
                break;
        }
    })
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
observer.observe(formSpace, config);

const form = {
    // formSpace: document.getElementById("CandidateFormSpace"),

    init() {
        tabMouseClick(0) ;
        // form.load(0);
        // Checking if page had finished loading its html
        // document.addEventListener('DOMContentLoaded', form.load(0));
    },

    async load(formNumber) {
        await form.showLoading();
        await form.getData(formNumber);
        return;
    },

    async getData(formNumber) {
        await axios.get(`../pages/Candidate_Forms/Form_${formNumber}.html`).then((res) => {
            if(!res.data) {
                console.log(`Could not fetch Form_${formNumber} data`);
            } else {
                console.log('Form data fetch successful');
                this.create(res.data);
            }
        }).catch((err) => {
            console.log(`Error in connecting to Form_${formNumber}.html`, err);
        });
        return
    },

    async update(formNumber) {
        await this.load(formNumber);
        console.log("Form Updated");        
    },

    create(data) {
        try {
            formSpace.innerHTML = data;
            console.log('Form Loaded onto Page');
        }catch(err){
            console.log('Cannot Load Form on Page');
        }
        return
    },

    async showLoading() {
        await axios.get(`../pages/loading.html`).then((res) => {
            if(!res.data) {
                console.log(`Could not fetch Loading data`);
            } else {
                console.log('Loading fetch successful');
                this.create(res.data);
            }
        }).catch((err) => {
            console.log('Error in connecting to loading.html', err);
        });
        return
    }
}



for(let i = 0; i < Tab.length; i++) Tab[i].addEventListener("click", e => tabMouseClick(i));
for(let i = 0; i < ProfileImageMenu_Tab.length; i++) ProfileImageMenu_Tab[i].addEventListener("click", e => ProfileImageMenu_TabMouseClick(i));
Menu.addEventListener("click", e => menuOnClick());
ProfileImage.addEventListener("click", e => profileImageOnClick());

function profileImageOnClick() {
    if(ProfileImageMenu.dataset.status != "active") ProfileImageMenu.dataset.status = "active";
    else ProfileImageMenu.dataset.status = "unactive";
}

function menuOnClick() {
    const SideNav = document.getElementById("NavigationBar");
    
    // console.log(SideNav.classList=="_active");
    if(Menu.dataset.status !="active") {
        Menu.dataset.status = "active";
        SideNav.dataset.status = "active"
    } else {
        Menu.dataset.status = "inactive";
        SideNav.dataset.status = "inactive"
    }
}

function tabMouseClick(TabIndex) { 
    const heading = document.getElementById("formSpace_Heading"),
        SideNav = document.getElementById("NavigationBar");

    if(Tab[TabIndex].dataset.enabled == "false") return;

    // Add below code in initialization too
    for(let i = 0; i < Tab.length; i++) if(Tab[i].dataset.status == "active") Tab[i].dataset.status = "inactive";
    Tab[TabIndex].dataset.status = "active";

    switch(TabIndex) {
        case 0: 
            heading.innerText = "Candidate Form > Section 1 of "+SECTIONS;
            formSpace.dataset.status = "Consent Form";
            form.update(0);
            break;
        case 1: 
            heading.innerText = "Candidate Form > Section 2 of "+SECTIONS;
            formSpace.dataset.status = "Personal Details";;
            form.update(1);
            break;
        case 2: 
            heading.innerText = "Candidate Form > Section 3 of "+SECTIONS;
            formSpace.dataset.status = "Address Verification";
            form.update(2);
            break;
        case 3: 
            heading.innerText = "Candidate Form > Section 4 of "+SECTIONS;
            formSpace.dataset.status = "Identity Verification";
            form.update(3);
            break;
        case 4: 
            heading.innerText = "Candidate Form > Section 5 of "+SECTIONS;
            formSpace.dataset.status = "Court Record Verification";
            form.update(4);
            break;
        case 5: 
            heading.innerText = "Candidate Form > Section 6 of "+SECTIONS;
            formSpace.dataset.status = "Education Verification";
            form.update(5);
            break;            
        case 6: 
            heading.innerText = "Candidate Form > Section 7 of "+SECTIONS;
            formSpace.dataset.status = "Employment Verification";
            form.update(6);
            break;
        case 7: 
            heading.innerText = "Candidate Form > Section 8 of "+SECTIONS;
            formSpace.dataset.status = "Professional Reference Verification";
            form.update(7);
            break;
        case 8: 
            heading.innerText = "Candidate Form > Section 9 of "+SECTIONS;
            formSpace.dataset.status = "Personal Reference Verification";
            form.update(8);
            break;            
        // case 9: heading.innerText = "Candidate Form > Section 10 of "+SECTIONS;
        //     formSpace[1].dataset.status = "Address Verification"
        //     form.update(9);
        //     break;
}

    Menu.dataset.status = "unactive";
    SideNav.dataset.status = "unactive";

}

function ProfileImageMenu_TabMouseClick(TabIndex) {
    switch(TabIndex) {
        case 0: 
            break;
        case 1: 
            break;
        case 2: 
            userLogout();
            break;
    }
}

async function userLogout() {

    try {
        const rTa = await getCookie('rTa'),
            session = {
                auth: `Bearer ${rTa}`
            };

        const resp = await axios.post(`http://localhost:5555/login/logout`, session, {withCredentials: true});
        if(resp.data.auth == false) {
            console.log('User Logged Out');
            window.location.href = '../index.html'
        } else {
            console.log('Error Logging Out, Try again');
        }
        

    } catch(err) {
        console.log('Auth Server Connection Failed', err);
    }
}

class CandidateForm extends HTMLElement {
    connectedCallback() {
        form.init();

        // console.log("Form->", loadForm);
        // console.log("Data->", formData);
        // this.innerHTML=loadForm;
        // loadForm();
        // console.log("A", this.innerHTML);

    }
}

customElements.define('candidate-form', CandidateForm);

async function validate() {
    const validUser = await userValidate();
    console.log('validUser = ', validUser);
    if(validUser == false) {
        window.location.href = ("../index.html");
    }
}