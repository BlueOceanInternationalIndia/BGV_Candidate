// import elements from "../landing.js";
import form from "./form_Services.js";
import userServices from "./user_Services.js";

const onClick = {
    navMenu(NavMenuButton, SideNav) {
        userServices.loginValidate();
        if(NavMenuButton.dataset.status !="active") {
            NavMenuButton.dataset.status = "active";
            SideNav.dataset.status = "active"
        } else {
            NavMenuButton.dataset.status = "inactive";
            SideNav.dataset.status = "inactive"
        }
    },

    navMenuTabs(Tab, elements, activeUser) {
        userServices.loginValidate();
        if(elements.SideNavTab[Tab].dataset.enabled == "false") return false;

            // Add below code in initialization too
            for(let i = 0; i < elements.SideNavTab.length; i++) if(elements.SideNavTab[i].dataset.status == "active") elements.SideNavTab[i].dataset.status = "inactive";
            elements.SideNavTab[Tab].dataset.status = "active";

            elements.FormHeading.innerText = `Candidate Form > Section ${Tab+1} of ${elements.SECTIONS}`;
            elements.FormSpace.dataset.form = 
            (Tab == 0)? "Consent Form" : 
            (Tab == 1)? "Personal Details" : 
            (Tab == 2)? "Address Verification" : 
            (Tab == 3)? "Identity Verification" : 
            (Tab == 4)? "Court Record Verification" : 
            (Tab == 5)? "Education Verification" : 
            (Tab == 6)? "Employment Verification" : 
            (Tab == 7)? "Professional Reference Verification" : 
            (Tab == 8)? "Personal Reference Verification" : "Error"
            elements.FormSpace.dataset.id = Tab;
            form.update(Tab, elements.FormSpace, activeUser);

            elements.ActiveForm = Tab;
            // elements.FormData = document.getElementById(`Form${Tab}`)
            // console.log("TAB FORMDATA", elements.FormData, `Form${Tab}`, document.getElementById(`Form${Tab}`));

        elements.NavMenuButton.dataset.status = "unactive";
        elements.SideNav.dataset.status = "unactive";
        return true

    },

    userMenu(UserMenu) {
        userServices.loginValidate();
        if(UserMenu.dataset.status != "active") UserMenu.dataset.status = "active";
        else UserMenu.dataset.status = "unactive";
    },

    userMenuTabs(Tab) {
        userServices.loginValidate();
        switch(Tab) {
            case 0: 
                break;
            case 1: 
                break;
            case 2: 
                userServices.logout();
                break;
        }
    }
}

export default onClick