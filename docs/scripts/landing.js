import form0 from "./Candidate_Forms/Form_0.js";
import form from "./services/form_Services.js";
import onClick from "./services/onClick_Services.js";
import userServices from "./services/user_Services.js"



const elements = {
        NavMenuButton: document.getElementById("TopBar_Menu"),
        SideNav: document.getElementById("NavigationBar"),
        SideNavTab: document.getElementsByClassName("navigationBar_Tab"),
        UserMenuButton: document.getElementById("TopBar_Profile"),
        UserMenu: document.getElementById("TopBar_ProfileMenu"),
        UserMenuTab: document.getElementsByClassName("TopBar_ProfileMenu_Tab"),
        FormHeading: document.getElementById("formSpace_Heading"),
        FormSpace: document.getElementById('CandidateFormSpace'),
        FormData: null,
        FormFileData: null,
        ActiveForm: null,
        SECTIONS: 9
    },
    urlParams = new URLSearchParams(window.location.search),
    activeUser = {
        uid: String(urlParams.get('uid')),
        id: Number(urlParams.get('id')),
        name: String(urlParams.get('user')),
        log: {
            form0: {
                enabled: urlParams.get('e0') == 'true',
                form: urlParams.get('0') == 'true'
            },
            form1: {
                enabled: urlParams.get('e1') == 'true',
                form: urlParams.get('1') == 'true',
                file1: urlParams.get('1f1') == 'true'
            },
            form2: {
                enabled: urlParams.get('e2') == 'true',
                form: urlParams.get('2') == 'true'
            },
            form3: {
                enabled: urlParams.get('e3') == 'true',
                form: urlParams.get('3') == 'true'
            },
            form4: {
                enabled: urlParams.get('e4') == 'true',
                form: urlParams.get('4') == 'true'
            },
            form5: {
                enabled: urlParams.get('e5') == 'true',
                form: urlParams.get('5') == 'true'
            },
            form6: {
                enabled: urlParams.get('e6') == 'true',
                form: urlParams.get('6') == 'true'
            },
            form7: {
                enabled: urlParams.get('e7') == 'true',
                form: urlParams.get('7') == 'true'
            },
            form8: {
                enabled: urlParams.get('e8') == 'true',
                form: urlParams.get('8') == 'true'
            }            
        }
    }

    console.log("LOG", activeUser, urlParams.get('0'));

    

    window.addEventListener('load', async () => {
        // console.log('LOAD');

        if( activeUser.uid == null || activeUser.id == null || activeUser.name == null || 
            activeUser.uid == 'null' || activeUser.id == 'null' || activeUser.name == 'null') {
            console.log("Invalid User");
            window.location.href = ("../index.html");
        } else {
            console.log("Valid User");
            const User = document.getElementById('CandidateName');
            User.innerHTML = activeUser.name.toString();
        }

        for(const [key, value] of Object.entries(activeUser.log)) {
            const formNum = Number(key.split('form')[1]) 
            // console.log(key, value, formNum);
            elements.SideNavTab[formNum].dataset.enabled = value.enabled;
        }

        //Initiating Form
        await form.init(elements, activeUser);

        //Validating User Login
        await userServices.loginValidate();

        elements.FormData = document.getElementById(`Form${elements.ActiveForm}`);
        elements.FormFileData = document.getElementsByClassName('form_File');
        // elements.FormFileUploadBtn = document.getElementsByClassName('formFileUploadBtn');
        // console.log("1.FORMDATA", elements.FormData, elements.FormFileData, elements.FormFileUploadBtn);
        
        //Detecting Form Submit
        elements.FormData?.addEventListener('submit', async (e) => {
            console.log(e);
            await e.preventDefault();
            const formData = new FormData(e.target),
                formDataObj = {};
            for (const [key, value] of formData) formDataObj[key] = value;
            console.log('Submit Pressed', formDataObj);
            const resp = await form.onSubmit(formDataObj, elements.FormSpace, activeUser);
            console.log("Task Complete", Number(e.target.dataset.form)+1, resp);
            if(resp != null && resp != false) onClick.navMenuTabs(Number(e.target.dataset.form)+1 < 9? Number(e.target.dataset.form)+1 : 0, elements, activeUser);
            else console.log("Error Submitting form", resp);
        });

        elements.FormSpace.addEventListener('click', async (e) => {
            // console.log("FORMSPACE CLICK", elements.FormSpace, e.target.id);

            if(e.target.id == 'AddVeri_Per_Check') {
                // console.log("CHECKED", elements.ActiveForm, elements.FormData);
                form.onCheck(elements.ActiveForm, elements.FormData)
            }

            if(e.target.className == 'formFileUploadBtn') {
                const formMessage = document.getElementsByClassName('formMessage_Hidden');
                const successMessage = document.getElementsByClassName('formMessage_Success')[e.target.dataset.file];
                for(let i = 0; i < formMessage.length; i++ ) (formMessage[i].style.visibility == 'visible')? formMessage[i].style.visibility = 'hidden': null;

                const resp = await form.fileOnSubmit(elements.ActiveForm, e.target.dataset.file, elements.FormFileData, formMessage, successMessage, activeUser);
                if(resp == true) {
                    console.log("File Uploaded");
                    successMessage.innerHTML = 'File Uploaded &#x2705;';
                    e.target.disabled = true;
                } else {
                    successMessage.style.visibility = 'hidden';
                    formMessage[2].style.visibility = 'visible';
                }
            }
        })

        //Detecting Active Menu
        elements.NavMenuButton.addEventListener("click", () => onClick.navMenu(elements.NavMenuButton, elements.SideNav));
        elements.UserMenuButton.addEventListener("click", () => onClick.userMenu(elements.UserMenu));

        for(let i = 0; i < elements.SideNavTab.length; i++) elements.SideNavTab[i].addEventListener("click", () => onClick.navMenuTabs(i, elements, activeUser));
        for(let i = 0; i < elements.UserMenuTab.length; i++) elements.UserMenuTab[i].addEventListener("click", () => onClick.userMenuTabs(i));
        // document.addEventListener('click', () => {
        //     console.log('DOM lOADED');
        // })
    });

    

    const observer = new MutationObserver(async () => {
        elements.FormData = document.getElementById(`Form${elements.ActiveForm}`);
        elements.FormFileData = document.getElementsByClassName('form_File');
        // elements.FormFileUploadBtn = document.getElementsByClassName('formFileUploadBtn');
        // console.log('2.FORMDATA', elements.FormData, elements.FormFileData, elements.FormFileUploadBtn, elements.FormFileUploadBtn?.length);
    });
    observer.observe(elements.FormSpace, { attributes: false, childList: true, characterData: false });

    class CandidateForm extends HTMLElement {async connectedCallback() {
        await form.showLoading(elements.FormSpace)
    }}
    customElements.define('candidate-form', CandidateForm);

    // export default activeUser

