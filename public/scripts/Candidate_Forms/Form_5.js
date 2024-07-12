const form5 = {
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
        console.log("Form 5 Submitted");
            try {
                const resp = await axios.post("http://localhost:7777/candidate/educationdetails/log", IV_Data)
                console.log(resp.data);
                activeUser.log.form5 = true;
                return true;
            } catch (err) {
                console.log('Database Connection Failed', err);
            }
            return false;  
    },

    async onSubmit_School(formData, activeUser) {        
        console.log("Form 5 School Submitted");

        const EduV_School_Data = {
            uid: activeUser.uid,
            id : activeUser.id,
            user: activeUser.name,
            level: formData.Level,
            board: formData.Board,
            school: formData.School,
            completion: new Date(formData.Completion),
            max: formData.Max,
            total: formData.Marks,
            percent: formData.Percent
        }

        console.log("EduV School Data",EduV_School_Data);
            try {
                const resp = await axios.post("http://localhost:7777/candidate/educationdetails/school", IV_Data)
                console.log(resp.data);
                return true;
            } catch (err) {
                console.log('Database Connection Failed', err);
            }
            return false;
    },

    async onSubmit_Higher(formData, activeUser) {        
        console.log("Form 5 Higher Submitted");

        const EduV_Higher_Data = {
            uid: activeUser.uid,
            id : activeUser.id,
            user: activeUser.name,
            level: formData.Level,
            university: formData.University,
            college: formData.College,
            state: formData.State,
            duration: formData.Duration,
            commence: formData.Commencement,
            completion: formData.Completion,
            degree: formData.Degree,
            discipline: formData.Discipline,
            stream: formData.Stream,
            max: formData.Max,
            total: formData.Marks,
            percent: formData.Percent
        }

        console.log("EduV School Data",EduV_School_Data);
        try {
            const resp = await axios.post("http://localhost:7777/candidate/educationdetails/higher", EduV_Higher_Data)
            console.log(resp.data);
            return true;
        } catch (err) {
            console.log('Database Connection Failed', err);
        }
        return false;
    }
}

export default form5