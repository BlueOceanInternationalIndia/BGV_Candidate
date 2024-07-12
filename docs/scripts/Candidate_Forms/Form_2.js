import { DATA_SERVER_URI } from "../config/config.js";

const form2 = {
    async onLoad(activeUser) {
        if(activeUser.log.form2.form == true) {
            const FormSubmitBtn = document.getElementsByClassName('formSubmitBtn'),
                FormResetBtn = document.getElementsByClassName('formResetBtn'),
                FormData = document.getElementById('Form2');

            FormSubmitBtn[0].disabled = true;
            FormResetBtn[0].disabled = true;

            try {
                await axios.get(`${DATA_SERVER_URI}/candidate/addressdetails/${activeUser.uid}`).then((resp) => {
                console.log("Candidate Address Details Extracted", resp.data);
                    
                    for(let i = 0; i < FormData.elements.length; i++) {
                        // console.log(i, FormData.elements[i]);
                        FormData.elements[i].disabled = true
                    }
                    FormData.elements[0].placeholder = resp.data.data.curr_address.split(',\n')[0];
                    FormData.elements[1].placeholder = resp.data.data.curr_address.split(',\n')[1];
                    FormData.elements[2].placeholder = resp.data.data.curr_address.split(',\n')[2];
                    FormData.elements[3].placeholder = resp.data.data.curr_city;
                    FormData.elements[4].placeholder = resp.data.data.curr_post;
                    FormData.elements[5].placeholder = resp.data.data.curr_district;
                    FormData.elements[6].placeholder = resp.data.data.curr_state;
                    FormData.elements[7].placeholder = resp.data.data.curr_pincode;
                    FormData.elements[8].placeholder = resp.data.data.curr_stay;
                    FormData.elements[9].placeholder = resp.data.data.curr_police;
                    FormData.elements[10].checked = resp.data.data.curr_owner == 'Self';
                    FormData.elements[11].checked = resp.data.data.curr_owner == 'Family';
                    FormData.elements[12].checked = resp.data.data.curr_owner == 'Rented';
                    FormData.elements[13].checked = resp.data.data.curr_type == 'Free Hold';
                    FormData.elements[14].checked = resp.data.data.curr_type == 'Flat';
                    FormData.elements[15].checked = resp.data.data.curr_type == 'Bungalow';
                    FormData.elements[16].checked = resp.data.data.curr_location == 'Residential';
                    FormData.elements[17].checked = resp.data.data.curr_location == 'Commercial';
                    FormData.elements[18].checked = resp.data.data.checkbox;
                    FormData.elements[19].placeholder = resp.data.data.per_address.split(',\n')[0];
                    FormData.elements[20].placeholder = resp.data.data.per_address.split(',\n')[1];
                    FormData.elements[21].placeholder = resp.data.data.per_address.split(',\n')[2];
                    FormData.elements[22].placeholder = resp.data.data.per_city;
                    FormData.elements[23].placeholder = resp.data.data.per_post;
                    FormData.elements[24].placeholder = resp.data.data.per_district;
                    FormData.elements[25].placeholder = resp.data.data.per_state;
                    FormData.elements[26].placeholder = resp.data.data.per_pincode;
                    FormData.elements[27].placeholder = resp.data.data.per_stay;
                    FormData.elements[28].placeholder = resp.data.data.per_police;
                    FormData.elements[29].checked = resp.data.data.per_owner == 'Self';
                    FormData.elements[30].checked = resp.data.data.per_owner == 'Family';
                    FormData.elements[31].checked = resp.data.data.per_owner == 'Rented';
                    FormData.elements[32].checked = resp.data.data.per_type == 'Free Hold';
                    FormData.elements[33].checked = resp.data.data.per_type == 'Flat';
                    FormData.elements[34].checked = resp.data.data.per_type == 'Bungalow';
                    FormData.elements[35].checked = resp.data.data.per_location == 'Residential';
                    FormData.elements[36].checked = resp.data.data.per_location == 'Commercial';
                }).catch((err) => {
                    console.log('Form Value Assignment Failed', err);
                }) 
            } catch (err) {
                console.log('Database Connection Failed', err);
            }
        }
    },

    async onSubmit(formData, activeUser) {        
        console.log("Form 2 Submitted");

        const AV_Data = {
            uid: activeUser.uid,
            id : activeUser.id,
            user: activeUser.name,
            curr_address: `${formData.Curr_Address1},\n${formData.Curr_Address2},\n${formData.Curr_Landmark}`,
            curr_city: formData.Curr_City,
            curr_district: formData.Curr_District,
            curr_state: formData.Curr_State,
            curr_pincode: formData.Curr_Pincode,
            curr_stay: new Date(formData.Curr_Since),
            curr_post: formData.Curr_Post,
            curr_police: formData.Curr_Police,
            curr_owner: formData.Curr_Owner,
            curr_type: formData.Curr_Type,
            curr_location: formData.Curr_Location,
            per_address: (formData.checkbox == 'on')? `${formData.Curr_Address1},\n${formData.Curr_Address2},\n${formData.Curr_Landmark}` : `${formData.Per_Address1},\n${formData.Per_Address2},\n${formData.Per_Landmark}`,
            per_city: (formData.checkbox == 'on')? formData.Curr_City: formData.Per_City,
            per_district: (formData.checkbox == 'on')? formData.Curr_District : formData.Per_District,
            per_state: (formData.checkbox == 'on')? formData.Curr_State : formData.Per_State,
            per_pincode: (formData.checkbox == 'on')? formData.Curr_Pincode : formData.Per_Pincode,
            per_stay: (formData.checkbox == 'on')? new Date(formData.Curr_Since) : new Date(formData.Per_Since),
            per_post: (formData.checkbox == 'on')? formData.Curr_Post : formData.Per_Post,
            per_police: (formData.checkbox == 'on')? formData.Curr_Police : formData.Per_Police,
            per_owner: (formData.checkbox == 'on')? formData.Curr_Owner: formData.Per_Owner,
            per_type: (formData.checkbox == 'on')? formData.Curr_Type : formData.Per_Type,
            per_location: (formData.checkbox == 'on')? formData.Curr_Location : formData.Per_Location
        }
        
        // console.log("AV Data",AV_Data);
        try {
            const resp = await axios.post(`${DATA_SERVER_URI}/candidate/addressdetails`, AV_Data)
            console.log(resp.data);
            activeUser.log.form2.form = true;
            return true;
        } catch (err) {
            console.log('Database Connection Failed', err);
        }
        return false;    
    },

    async checkbox(FormData) {
        // console.log(FormData);
        for(let i = 19; i < FormData.elements.length-10; i++) {
            // console.log(i, FormData.elements[i], i - 19, FormData.elements[i-19].value);
            FormData.elements[i].disabled = true;
            FormData.elements[i].value = FormData.elements[i-19].value;
            FormData.elements[i].placeholder = FormData.elements[i-19].value;
        }

        // console.log(FormData.elements[29], FormData.elements[10]);
        for(let i = 29; i < FormData.elements.length-2; i++) {
            FormData.elements[i].disabled = true;
            FormData.elements[i].checked = FormData.elements[i-19].checked
        }
        
    }
}

export default form2