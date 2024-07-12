// import elements from "../landing.js";
import userServices from "./user_Services.js";
import onClick from "./onClick_Services.js";
import codePopulate from './mobile_country_codes.js';
import mobileCodePopulate from "./countryPhoneCode_Service.js";
import { MAX_File_SIZE_MB } from "../config/config.js";
import form0 from "../Candidate_Forms/Form_0.js";
import form1 from "../Candidate_Forms/Form_1.js";
import form2 from "../Candidate_Forms/Form_2.js";
import form3 from "../Candidate_Forms/Form_3.js";
import form5 from "../Candidate_Forms/Form_5.js";

const form = {
    async init(elements, activeUser) {
        // console.log(elements, activeUser, Object.keys(activeUser.log).length);
        elements.ActiveForm = 0;
        for (const [key, val] of Object.entries(activeUser.log)) {
            if(val.enabled == true && val.form == false) {
                elements.ActiveForm = Number(key.split('form')[1]);
                break;
            }
            if(elements.ActiveForm == 8 && val.form == false) elements.ActiveForm = 0;
        }
        // console.log(elements.ActiveForm);
        return onClick.navMenuTabs(elements.ActiveForm, elements, activeUser);
    },

    async update(formNumber, FormSpace, activeUser) {
        await this.load(formNumber, FormSpace, activeUser);
        // var formData = document.getElementsByClassName('mobileCountryCodes');
        // console.log("FORMDATA", formData);
        // codePopulate(formData);
        // mobileCodePopulate(formData);
        console.log("Form Updated"); 
        // const formData = document.getElementById(`Form${formNumber}`);
        // console.log("Form Data->",formData);       
        // return formData;
    },

    async load(formNumber, FormSpace, activeUser) {
        // console.log("Loading");
        await this.showLoading(FormSpace);
        await this.getData(formNumber, FormSpace);
        await this.onLoad(formNumber, activeUser);
        return;
    },

    async getData(formNumber, FormSpace) {
        // console.log("Retrieving data");
        await axios.get(`../pages/Candidate_Forms/Form_${formNumber}.html`).then((res) => {
            if(!res.data) {
                console.log(`Could not fetch Form_${formNumber} data`);
            } else {
                // console.log('Form data fetch successful');
                this.create(res.data, FormSpace);
            }
        }).catch((err) => {
            console.log(`Error in connecting to Form_${formNumber}.html`, err);
        });
        return
    },

    create(data, FormSpace) {
        try {
            FormSpace.innerHTML = data;
            // console.log("FormSpace", FormSpace);
            // elements.formSpace.addEventListener('load', async e => {return})
            // console.log('Form Loaded onto Page');
        }catch(err){
            console.log('Cannot Load Form on Page');
        }
        // return
    },

    async showLoading(FormSpace) {
        await axios.get(`../pages/loading.html`).then((res) => {
            if(!res.data) {
                console.log(`Could not fetch Loading data`);
            } else {
                // console.log('Loading fetch successful');
                this.create(res.data, FormSpace);
            }
        }).catch((err) => {
            console.log('Error in connecting to loading.html', err);
        });
        return
    },

    async onLoad(formNumber, activeUser) {
        switch(formNumber) {
            case 0:
                form0.onLoad(activeUser);
                break;
            case 1:
                form1.onLoad(activeUser);
                break;
            case 2:
                form2.onLoad(activeUser);
                // onLoad_Form2();
                break;
            case 3:
                form3.onLoad(activeUser);
                // onLoad_Form3();
                break;
            case 4:
                // onLoad_Form4();
                break;
            case 5:
                form5.onLoad(activeUser);
                break;
            case 6:
                // onLoad_Form6();
                break;
            case 7:
                // onLoad_Form7();
                break;
            case 8:
                // onLoad_Form8();
                break;
                                                                                                                                                            
        }

    },

    async fileOnSubmit(ActiveForm, ActiveFile, FormFileData, formMessage, successMessage, activeUser) {
        // console.log("File being uploaded", ActiveForm, FormFileData, formMessage);
        
        if(FormFileData[ActiveFile].files.length == 0) {
            formMessage[0].style.visibility = 'visible';
            return false;
        }

        if(FormFileData[ActiveFile].files[0].size >= MAX_File_SIZE_MB * 1024 * 1024) {
            formMessage[1].style.visibility = 'visible';
            return false;
        }

        successMessage.innerHTML = 'Uploading...'
        successMessage.style.visibility = 'visible'

        var resp = null;
        (ActiveForm == 0)? null : 
        (ActiveForm == 1)? resp = form1.fileOnSubmit(FormFileData[ActiveFile].files[0], FormFileData[ActiveFile].name, activeUser) : 
        (ActiveForm == 2)? "": 
        (ActiveForm == 3)? "": 
        (ActiveForm == 4)? "": 
        (ActiveForm == 5)? "": 
        (ActiveForm == 6)? "": 
        (ActiveForm == 7)? "": 
        (ActiveForm == 8)? "" : 
        console.log('Invalid Form Number Passed to form.fileOnSubmit');

        return resp;
    },

    async onSubmit(formData, FormSpace, activeUser) {
        await userServices.loginValidate();
        const activeForm = Number(FormSpace.dataset.id);
        // console.log("Active Form -> ", activeForm, activeUser);
        var resp = null;
        switch(activeForm) {
            case 0: 
                resp = await form0.onSubmit(formData, activeUser);
                break;
            case 1: 
                // console.log("Case 1");
                resp = await form1.onSubmit(formData, activeUser);
                break;
            case 2: 
                resp = await form2.onSubmit(formData, activeUser);
                break;
            case 3: 
                resp = await form3.onSubmit(formData, activeUser);
                break;
            case 4: 
                // onSubmit_Form4(e, activeUser);
                break;
            case 5: 
                resp = await form5.onSubmit(formData, activeUser);
                break;
            case 6: 
                // onSubmit_Form6(e, activeUser);
                break;            
            case 7: 
                // onSubmit_Form7(e, activeUser);
                break;
            case 8: 
                // onSubmit_Form8(e, activeUser);
                break;
        }
        return resp;
    },

    async onCheck(ActiveForm, FormData) {

        (ActiveForm == 2)? form2.checkbox(FormData):null;

    }
}

export default form