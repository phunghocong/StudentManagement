import axios from 'axios';

export const url = 'http://localhost:8080/api/accounts';

// Nhận vào {username: username, password: password} trả về thông tin đăng nhập cho phiên giao dịch
// JSON {username, isStudent: có phải là sinh viên không, _id của đối tượng acocunt trên database, jwtoken sử dụng cho phiên làm việc}.

export const login = (username, password) => axios
    .post(`${url}/login/`, { username: username, password: password })
    .then(res => {
        if (res.data.token) {
            localStorage.setItem("user", JSON.stringify(res.data));
        }
        return res.data;
    });
export const logout = () => {
    localStorage.removeItem("user")
};
export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"))
};
// Nhận vào string id trả về object accounts
export const getAccount = (id) => axios.get(`${url}/get/${id}`);

// Nhận vào object gồm {username, password, firstName, surName, email}
export const createAccount = (newAccount) => axios.post(`${url}/create/`, newAccount);

// Nhận vào object chứa các thông tin cần cập nhật cho tài khoản
export const updateAccount = (id, updatedAccount) => axios.post(`${url}/update/${id}`, updatedAccount);

// Nhận vào string _id xóa object
export const deleteAccount = (id) => axios.delete(`${url}/delete/${id}`);

// Nhận vào object gồm {destinationID(id tài khoản cần tạo thông báo), message}
export const createNotification = (notification) => axios.post(`${url}/createNotification/`, notification);

// Nhận vào không gì cả trả về array chứa các đối tượng thuộc model accounts
export const getAllAccount = () => axios.get(`${url}/getAll/`);
