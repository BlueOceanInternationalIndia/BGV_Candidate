// import activeUser from '../landing.js'

const form3 = {
    async onLoad(activeUser) {
        console.log(activeUser.log.form0);
        if(activeUser.log.form3 == true) {
            // const checkbox = document.getElementById('ConsentForm_Comp_Buttons_Checkbox'),
            //     submit = document.getElementById('ConsentForm_Submit');
            // checkbox.checked = true;
            // checkbox.disabled = true;
            // submit.style.display = 'none';
        } 
    },

    async onSubmit(formData, activeUser) {        
        console.log("Form 1 Submitted");

        const IV_Data = {
            uid: activeUser.uid,
            id : activeUser.id,
            user: activeUser.name,
            adhaar: formData.Aadhar_ID,
            adhaar_mobile: `${formData.Aadhar_Number_Code} ${formData.Aadhar_Number}`,
            pan: formData.PAN_ID,
            pan_mobile: `${formData.PAN_Number_Code} ${formData.PAN_Number}`
        }

        console.log("IV Data",IV_Data);
        if(activeUser.log.form3 == true) {
            try {
                const resp = await axios.put("http://localhost:7777/candidate/identitydetails", IV_Data)
                console.log(resp.data);
                return true;
            } catch (err) {
                console.log('Database Connection Failed', err);
            }
            return false;
        } else {
            try {
                const resp = await axios.post("http://localhost:7777/candidate/identitydetails", IV_Data)
                console.log(resp.data);
                activeUser.log.form3 = true;
                return true;
            } catch (err) {
                console.log('Database Connection Failed', err);
            }
            return false;
        }        
    }
}

export default form3