import axios from 'axios';

const url = 'http://localhost:8080/api/students';
export const findAllToStudentList = () => axios.get(`${url}/smallList`);
export const findAll = () => axios.get(url);
export const findByID = (studentID) => axios.get(`${url}/${studentID}`);
 
export const update = (studentID) => axios.put(`${url}/update/${studentID}`);

export const createStudent = (newStudent) => axios.post(`${url}/createStudent`, newStudent);
export const createStudentAndRegisterNewAccount = (newStudent) => axios.post(`${url}/createStudentAndRegisterNewAccount`, newStudent);

export const deleteStudent = (studentID) => axios.delete(`${url}/${studentID}`);
export const deleteAllStudent = () => axios.delete(url);