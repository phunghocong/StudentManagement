import axios from 'axios';

const url = 'http://localhost:8080/api/accounts';

export const getAccount = () => axios.get(url);
export const createAccount = (newAccount) => axios.post(url, newAccount);
export const updateAccount = (id, updatedAccount) => axios.post(`${url}/${id}`, updateAccount);
export const deleteAccount = (id) => axios.delete(`${url}/${id}`);