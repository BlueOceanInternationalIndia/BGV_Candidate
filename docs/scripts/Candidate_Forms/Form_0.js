import { DATA_SERVER_URI } from "../config/config.js";

const form0 = {
    async onLoad(activeUser) {
        console.log(activeUser);
        if(activeUser.log.form0.form == true) {
            const checkbox = document.getElementById('ConsentForm_Comp_Buttons_Checkbox'),
                submit = document.getElementById('ConsentForm_Submit');
            checkbox.checked = true;
            checkbox.disabled = true;
            submit.style.display = 'none';
        } 
    },

    async onSubmit(formData, activeUser) {        
        console.log("Form 0 Submitted");

        const consentData = {
            uid: activeUser.uid,
            id : activeUser.id,
            user: activeUser.name,
            consent: formData.checkbox == 'on'
        }

        // console.log(consentData);

        try {
            const resp = await axios.post(`${DATA_SERVER_URI}/candidate/consent`, consentData)
            activeUser.log.form0.form = true;
            return true;
        } catch (err) {
            console.log('Database Connection Failed', err);
        }
        return false;
        
    }
}

export default form0