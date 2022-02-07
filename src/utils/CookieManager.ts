import jwt_decode from "jwt-decode";
import configs from "configs";
import { CookieName, getCookie, eraseCookie } from "./cookie";

export default class CookieManager {
    static setAuthToken(token: string) {
        const payload = jwt_decode(token) as any;
        const tokenExpTime = payload.exp * 1000;
        this.setCookie(CookieName.NWAYPLAY_AUTH_TOKEN, token, tokenExpTime);
    }
    static deleteAuthToken() {
        this.deleteCookie(CookieName.NWAYPLAY_AUTH_TOKEN);
    }

    static setNwayAuthToken(token: string) {
        const payload = jwt_decode(token) as any;
        const tokenExpTime = payload.ts + payload.expiry;
        this.setCookie(CookieName.NWAYPLAY_NWAY_AUTH_TOKEN, token, tokenExpTime);
    }
    static deleteNwayAuthToken() {
        this.deleteCookie(CookieName.NWAYPLAY_NWAY_AUTH_TOKEN);
    }
    static deleteNwayAuth() {
        this.deleteCookie(CookieName.NWAYPLAY_NWAY_AUTH_TOKEN);
        this.deleteCookie(CookieName.NWAYPLAY_NWAY_PID);
        this.deleteCookie(CookieName.NWAYPLAY_DISPLAY_NAME);
        this.deleteCookie(CookieName.NWAYPLAY_EMAIL);
    }

    private static setCookie = (name: string, value: string, time: number) => {
        var expires = "";
        if (time) {
            var date = new Date();
            // date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            date.setTime(time);
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

    public static getCookie = (name: string) => {
        return getCookie(name);
    }

    public static deleteCookie = (name: string) => {
        eraseCookie(name);
    }
}