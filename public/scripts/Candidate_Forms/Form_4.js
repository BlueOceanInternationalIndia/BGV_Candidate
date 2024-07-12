// import activeUser from '../landing.js'

const form4 = {
    async onLoad(activeUser) {
        console.log(activeUser.log.form0);
        if(activeUser.log.form0 == true) {
            // const checkbox = document.getElementById('ConsentForm_Comp_Buttons_Checkbox'),
            //     submit = document.getElementById('ConsentForm_Submit');
            // checkbox.checked = true;
            // checkbox.disabled = true;
            // submit.style.display = 'none';
        } 
    },

    async onSubmit(e, activeUser) {        
        console.log("Form 1 Submitted");

        const consentData = {
            uid: activeUser.uid,
            id : activeUser.id,
            user: activeUser.name,
            consent : e.target[0].checked
        }

        // try {
        //     const resp = await axios.post("http://localhost:7777/candidate/consent", consentData)
        //     activeUser.log.form0 = true;
        //     console.log("AAA", activeUser.log.form0);
        //     return true;
        // } catch (err) {
        //     console.log('Database Connection Failed', err);
        // }
        // return false;
        
    }
}

export default form4