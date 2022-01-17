import configs from "../configs";

// enum CookieName {
//     NWAYPLAY_AUTH_TOKEN = `${configs.ENV}_NWAYPLAY_AUTH_TOKEN`,
//     NWAYPLAY_EMAIL = `${configs.ENV}_NWAYPLAY_EMAIL`,
//     NWAYPLAY_DISPLAY_NAME = `${configs.ENV}_NWAYPLAY_DISPLAY_NAME`
// }

const CookieName = {
    NWAYPLAY_AUTH_TOKEN: `${configs.ENV}_NWAYPLAY_AUTH_TOKEN`,
    NWAYPLAY_EMAIL: `${configs.ENV}_NWAYPLAY_EMAIL`,
    NWAYPLAY_DISPLAY_NAME: `${configs.ENV}_NWAYPLAY_DISPLAY_NAME`,
    NWAYPLAY_NWAY_AUTH_TOKEN: `${configs.ENV}_NWAYPLAY_NWAY_AUTH_TOKEN`,
    NWAYPLAY_NWAY_PID: `${configs.ENV}_NWAYPLAY_NWAY_PID`
}

const setCookie = (name: string, value: string, days: number) => {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }

    if (configs.ENV === "LOCAL") {
        // local
        document.cookie = name + "=" + (value || "") + expires + ";path=/";
    } else {
        // server
        document.cookie = name + "=" + (value || "") + expires + ";domain=.nwayplay.com;SameSite=Strict;Secure;path=/";
    }
}
const getCookie = (name: string) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
const eraseCookie = (name: string) => {
    if (configs.ENV === "LOCAL") {
        // local
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    } else {
        // server
        document.cookie = name + '=; domain=.nwayplay.com; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}

export {
    CookieName,
    setCookie,
    getCookie,
    eraseCookie
}