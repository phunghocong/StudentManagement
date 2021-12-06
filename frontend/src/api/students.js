import axios, { Axios } from 'axios';

const url = 'http://localhost:8080/api/students';
//mode can be "any","good","bad" 

export const findAllToStudentList = (mode) => axios.get(`${url}/smallList/${mode}`);
export const findAll = (mode) => axios.get(`${url}/list/${mode}`);
//Get student by their manager
export const findByMod = (mode, managedBy) => axios.get(`${url}/list/mod/${mode}&${managedBy}`);

export const findStudentsFromClass = (mode, baseClass) => axios.get(`${url}/list/class/${mode}&${baseClass}`);

export const findByID = (studentID) => axios.get(`${url}/${studentID}`);

export const importData = (path) => axios.post(`${url}/importData`,path);

//export const exportToCsvAll = (mode) => axios.get(`${url}/list/export/${mode}`);
export const exportToCsvAll = (mode) => axios({
    url: `${url}/list/export/${mode}`, //your url
    method: 'GET',
    responseType: 'blob', // 
}).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'danh_sach_sinh_vien.xlsx'); //or any other extension
    document.body.appendChild(link);
    link.click();
});


export const exportToCsvByMod = (mode, managedBy) => axios({
    url: `${url}/list/mod/export/${mode}&${managedBy}`, //your url
    method: 'GET',
    responseType: 'blob', // 
}).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `danh_sach_sv_quan_ly_boi_${managedBy}.xlsx`); //or any other extension
    document.body.appendChild(link);
    link.click();
});
export const exportToCsvByClass = (mode, baseClass) => axios({
    url: `${url}/list/class/export/${mode}&${baseClass}`, //your url
    method: 'GET',
    responseType: 'blob', // 
}).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `danh_sach_sinh_vien_lop_${baseClass}.xlsx`); //or any other extension
    document.body.appendChild(link);
    link.click();
});

export const getAllClass = () => axios.get(`${url}/class/list`);

export const update = (studentID) => axios.put(`${url}/update/${studentID}`);
export const updateByID = (id, updatedStudent) => axios.put(`${url}/update/id/${id}`, updatedStudent);

export const createStudent = (newStudent) => axios.post(`${url}/createStudent`, newStudent);
export const createStudentAndRegisterNewAccount = (newStudent) => axios.post(`${url}/createStudentAndRegisterNewAccount`, newStudent);

export const deleteStudent = (studentID) => axios.delete(`${url}/id/${studentID}`);
//export const deleteAllStudent = () => axios.delete(url);
export const graphStudentCountEachYear = (from, to) => axios.get(`${url}/graph/graphStudentCountEachYear/${from}&${to}`);
export const graphGenderCount = () => axios.get(`${url}/graph/graphGenderCount/`);