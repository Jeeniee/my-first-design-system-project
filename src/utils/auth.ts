import jwt_decode from "jwt-decode";

export interface JWTPayload {
    iat: number;
    pid: string;
    role: number;
    title: string;
    ts: number;
    userId: number;
}

const getJWTPayload = (jwt: string): JWTPayload | null => {
    try {
        const decoded: JWTPayload = jwt_decode(jwt);
        return decoded;
    } catch (error) {
        return null;
    }
};

// const checkExpiredJWT = (jwt: string): boolean => {
//     const payload = getJWTPayload(jwt);
//     if (payload === null) {
//         return true;
//     }

//     const expiredDate = new Date(payload.exp * 1000);
//     const currentDate = new Date();
//     return currentDate >= expiredDate;
// }   


export {
    getJWTPayload
}