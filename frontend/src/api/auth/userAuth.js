import axios from 'axios';


const url = 'http://localhost:8080/api/accounts';
export const login = (username, password) => 
    axios.post(url + "/login/", { username: username, password: password })
        .then(res => {
            if (res.data.token) {
                localStorage.setItem("user", JSON.stringify(res.data));
            }
            return res.data;
        });
export const logout = () => {
    localStorage.removeItem("user")
}
export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"))
}
export const register = (newAccount) => axios.post(url, newAccount);
