import axios from 'axios';

export const url = 'http://localhost:8080/api/accounts';

//
export const getAccount = (id) => axios.get(`${url}/get/${id}/`);


export const createAccount = (newAccount) => axios.post(`${url}/create/`, newAccount);


export const updateAccount = (id, updatedAccount) => axios.post(`${url}/${id}`, updateAccount);


export const deleteAccount = (id) => axios.delete(`${url}/${id}`);