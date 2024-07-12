const form1 = {
    async onLoad(activeUser) {
        // console.log(activeUser.log.form0);
        if(activeUser.log.form1.form == true) {
            const FormSubmitBtn = document.getElementById('Form1_Submit'),
                FormResetBtn = document.getElementById('Form1_Reset'),
                FormData = document.getElementById('Form1');

            FormSubmitBtn.disabled = true;
            FormResetBtn.disabled = true;

            try {
                await axios.get(`http://localhost:7777/candidate/personaldetails/${activeUser.uid}`).then((resp) => {
                console.log("Candidate Personal Details Extracted", resp.data);
                    
                    for(let i = 0; i < FormData.elements.length; i++) {
                        // console.log(i, FormData.elements[i]);
                        FormData.elements[i].disabled = true
                    }
                    FormData.elements[0].placeholder = resp.data.data.fullName
                    FormData.elements[1].placeholder = resp.data.data.fatherName
                    FormData.elements[2].placeholder = resp.data.data.motherName
                    FormData.elements[3].placeholder = resp.data.data.spouseName
                    FormData.elements[4].checked = resp.data.data.gender == 'Male'
                    FormData.elements[5].checked = resp.data.data.gender == 'Female'
                    FormData.elements[6].checked = resp.data.data.gender == 'Others'
                    FormData.elements[7].value = resp.data.data.dob.split("T")[0]
                    
                    for(let i = 0; i < FormData.elements[8].length; i++) FormData.elements[8][i].selected = (FormData.elements[8][i].value == resp.data.data.contact.split(' ')[0])

                    FormData.elements[9].placeholder = resp.data.data.contact.split(' ')[1]
                    
                    for(let i = 0; i < FormData.elements[10].length; i++) FormData.elements[10][i].selected = (FormData.elements[10][i].value == resp.data.data.whatsapp.split(' ')[0])

                    FormData.elements[11].placeholder = resp.data.data.whatsapp.split(' ')[1]
                    FormData.elements[12].placeholder = resp.data.data.email
                    FormData.elements[13].placeholder = resp.data.data.altEmail

                    for(let i = 0; i < FormData.elements[14].length; i++) FormData.elements[14][i].selected = (FormData.elements[14][i].value == resp.data.data.stateResi)
                    for(let i = 0; i < FormData.elements[15].length; i++) FormData.elements[15][i].selected = (FormData.elements[15][i].value == resp.data.data.placeResi)
                    for(let i = 0; i < FormData.elements[16].length; i++) FormData.elements[16][i].selected = (FormData.elements[16][i].value == resp.data.data.nationality)
                    for(let i = 0; i < FormData.elements[17].length; i++) FormData.elements[17][i].selected = (FormData.elements[17][i].value == resp.data.data.highestQual)
                }).catch((err) => {
                    console.log('Form Value Assignment Failed', err);
                }) 
            } catch (err) {
                console.log('Database Connection Failed', err);
            }
        } 
        if(activeUser.log.form1.file1 == true) {
            console.log("FILE1 TRUE");
            const FormFileUploadBtn = document.getElementsByClassName('formFileUploadBtn'),
                successMessage = document.getElementsByClassName('formMessage_Success'),
                FileInput = document.getElementById('IdentityVerification_ImageInfo_Image');

                FormFileUploadBtn[0].disabled = true;
                successMessage[0].innerHTML = 'File Uploaded &#x2705;';
                successMessage[0].style.visibility = 'visible'
                FileInput.disabled = true;
        }
    },

    async fileOnSubmit(FormFileData, FileName, activeUser) {
        console.log("Form1 File Submitted");
        const formData = new FormData();
        formData.append("uid", activeUser.uid);
        formData.append("id", activeUser.id);
        formData.append("user", activeUser.name);
        formData.append("filename", FileName);
        formData.append("form1", activeUser.log.form1.form);
        formData.append("File", FormFileData);

        try {
            const resp = await axios.post("http://localhost:7777/candidate/files/upload", formData)
            console.log("File Upload Success", resp.data);
            activeUser.log.form1.file1 = true;
            return resp.data.success
        } catch (err) {
            console.log('Database Connection Failed', err);
        }

    },

    async onSubmit(formData, activeUser) {        
        console.log("Form 1 Submitted");

        const PD_Data = {
            uid: activeUser.uid,
            id : activeUser.id,
            user: activeUser.name,
            fullName: formData.Full_Name,
            fatherName: formData.Father_Name,
            motherName: formData.Mother_Name,
            spouseName: formData.Spouse_Name,
            gender: formData.Gender,
            dob: new Date(formData.DOB),
            contact: `${formData.Contact_Code} ${formData.Contact}`,
            whatsapp: `${formData.Whatsapp_Code} ${formData.Whatsapp}`,
            email: formData.Email,
            altEmail: formData.Alt_Email,
            stateResi: formData.State,
            placeResi: formData.Place,
            nationality: formData.Nationality,
            highestQual: formData.Qualification,
            image: activeUser.log.form1.file1
        }
        
        // console.log("PD Data",PD_Data);
        try {
            const resp = await axios.post("http://localhost:7777/candidate/personaldetails", PD_Data)
            console.log(resp.data);
            activeUser.log.form1.form = true;
            return true;
        } catch (err) {
            console.log('Database Connection Failed', err);
        }
        return false;   
    }
}

export default form1