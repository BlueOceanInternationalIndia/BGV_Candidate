import getCookie from "./cookieGrab_Service.js";
import { DATA_SERVER_URI } from "../config/config.js";
import { AUTH_SERVER_URI } from "../config/config.js";


const userServices = {
    async getLog(user) {
        // console.log("BBB", user);
        try {
            const resp = await axios.get(`${DATA_SERVER_URI}/candidate/log/${user.uid}`);
            if(resp.data.log == null) console.log('User Does Not Exist');
            else console.log('Log Retrieved');
            return resp.data.log;
        } catch(err) {
            console.log('Error Connecting to Database', err);
        }
    },

    async login(e, form, loginMessage) {
        e.preventDefault();
        console.log(`User ${e.target[0].value} trying to login`);

        const loginData = {
                            user_name__: e.target[0].value,
                            pass_word__: e.target[1].value
                        };
                

        if(loginMessage[0].style.visibility == 'visible') loginMessage[0].style.visibility = 'hidden';
        if(loginMessage[1].style.visibility == 'visible') loginMessage[1].style.visibility = 'hidden';

        // console.log(loginData);

        try {
            const resp = await axios.post(`${AUTH_SERVER_URI}/login/auth`, loginData, {withCredentials: true});
            if(resp.data.auth == true) {
                console.log("Login Success");
                form.reset();
                window.location.href = (`landing.html?uid=${resp.data.user.uid}&id=${resp.data.user.id}&user=${resp.data.user.name}`);
            } else {
                console.log("Login Failed, ",  resp.data.message);
                // console.log(loginMessage, loginMessage[0].style.visibility);
                loginMessage[0].style.visibility = 'visible';
                form.reset();
            }

        } catch(err) {
            console.log('Auth Server Connection Failed', err);
                loginMessage[1].style.visibility = 'visible';
        }
    },

    async logout() {
        try {
            const rTa = await getCookie('rTa'),
                session = {
                    auth: `Bearer ${rTa}`
                };
    
            const resp = await axios.post(`${AUTH_SERVER_URI}/login/logout`, session, {withCredentials: true});
            if(resp.data.auth == false) {
                console.log('User Logged Out');
                window.location.href = '../index.html'
            } else {
                console.log('Error Logging Out, Try again');
            }
            
    
        } catch(err) {
            console.log('Auth Server Connection Failed', err);
        }
    },

    async userValidate() {
        const rTa = await getCookie('rTa'),
        returnObj = {
            auth: false,
            user: {
                uid: null,
                id: null,
                name: null
            }
        }

        if(rTa == null) {
            return returnObj;
        } else {
            try {
                const auth = {
                    auth: `Bearer ${rTa}`
                }

                const resp = await axios.post(`${AUTH_SERVER_URI}/login/valid`, auth);
                if(resp.data.auth == true) {
                    returnObj.auth = true;
                    returnObj.user.uid = resp.data.user.uid;
                    returnObj.user.id = resp.data.user.id;
                    returnObj.user.name = resp.data.user.name;
                    return returnObj;
                } else {
                    return returnObj;
                }
        
            } catch(err) {
                
                console.log('Auth Server Connection Failed', err);
                return returnObj;
            }
        }
    },

    async loginValidate() {
        const validUser = await this.userValidate();
        // console.log('validUser = ', validUser);
        if(validUser.auth == false) {
            window.location.href = ("../index.html");
        }
        return validUser
    }
}

export default userServices