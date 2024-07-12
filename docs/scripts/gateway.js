import userServices from "./services/user_Services.js";

const activeUser = {
        uid: null,
        id: null,
        name: null
    }

console.log("ActiveUser => ", activeUser);

window.addEventListener('load', async () => {
    const validUser = await userServices.loginValidate();
    console.log("Valid User", validUser);

    activeUser.uid = validUser.user.uid;
    activeUser.id = validUser.user.id;
    activeUser.name = validUser.user.name;

    const userLog = await userServices.getLog(activeUser);
    // console.log(userLog.form0);

    window.location.href = `landing_.html?uid=${userLog.uid}&id=${userLog.id}&user=${userLog.user}&e0=${userLog.form0.enabled}&0=${userLog.form0.form}&e1=${userLog.form1.enabled}&1=${userLog.form1.form}&1f1=${userLog.form1.file1}&e2=${userLog.form2.enabled}&2=${userLog.form2.form}&e3=${userLog.form3.enabled}&3=${userLog.form3.form}&e4=${userLog.form4.enabled}&4=${userLog.form4.form}&e5=${userLog.form5.enabled}&5=${userLog.form5.form}&e6=${userLog.form6.enabled}&6=${userLog.form6.form}&e7=${userLog.form7.enabled}&7=${userLog.form7.form}&e8=${userLog.form8.enabled}&8=${userLog.form8.form}`

});


