import axios from 'axios';

const url = 'http://localhost:8080/api/students';
//mode can be "any","good","bad" 

export const findAllToStudentList = (mode) => axios.get(`${url}/smallList/${mode}`);
export const findAll = (mode) => axios.get(`${url}/list/${mode}`);
    //Get student by their manager

export const findByMod = (mode, managedBy) => axios.get(`${url}/list/mod/${mode}&${managedBy}`);

export const findByID = (studentID) => axios.get(`${url}/${studentID}`);


export const findStudentsFromClass = (baseClass) => axios.get(`${url}/class/${baseClass}`);

export const getAllClass = () => axios.get(`${url}/class/list`);

export const update = (studentID) => axios.put(`${url}/update/${studentID}`);
export const updateByID = (id, updatedStudent) => axios.put(`${url}/update/id/${id}`, updatedStudent);

export const createStudent = (newStudent) => axios.post(`${url}/createStudent`, newStudent);
export const createStudentAndRegisterNewAccount = (newStudent) => axios.post(`${url}/createStudentAndRegisterNewAccount`, newStudent);

export const deleteStudent = (studentID) => axios.delete(`${url}/id/${studentID}`);
//export const deleteAllStudent = () => axios.delete(url);
