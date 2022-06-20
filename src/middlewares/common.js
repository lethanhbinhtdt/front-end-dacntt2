// return the user data from the session storage
import { Cookies  } from 'react-cookie'
const cookies = new Cookies();

export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
}

// return the token from the session storage
export const getToken = () => {
    return sessionStorage.getItem('token') || null;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
}

// set the token and user from the session storage
export const setUserSession = (token, user) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
}


// export const setUserCookie = (token)=>{
//     const [cookies, setCookie] = useCookies(['access_token'])
//     let expires = new Date()
//     expires.setTime(expires.getTime() + (60*60*4)) // hết hạn sau 4h 
//     setCookie('access_token', token, { path: '/',  expires})
// }

export const getCookieToken = () => {
    return cookies.get('access_token') || null;
}

// export const removeCookieToken = () =>{
//     return removeCookie("access_token")||null;
// }