import axios from 'axios';
import keys from '../constants/keys'
export const url = 'http://localhost:8080/api/topic';

// Nhận vào string id trả về object topic
export const getTopic = (id) => axios.get(`${url}/get/${id}`);

// Nhận vào object gồm {title, detail, poster(username - tên người đăng)}
export const createTopic = (newTopic) => axios.post(`${url}/create/`, newTopic);

// Nhận vào object chứa các thông tin cần cập nhật cho Topic
export const updateTopic = (id, updatedAccount) => axios.post(`${url}/update/${id}`, updatedAccount);

// Nhận vào string _id xóa object
export const deleteTopic = (id) => axios.delete(`${url}/delete/${id}`);

// Nhận vào object gồm {detail, poster: username - họ và tên}
export const createComment = (id, comment) => axios.post(`${url}/createComment/${id}`, comment);

// Nhận vào không gì cả trả về array chứa các đối tượng thuộc model accounts
export const getAllTopic = () => axios.get(`${url}/getAll/`);

// Nhận vào id trả về Array chứa các object Comment của 1 Topic.
export const getAllCommentOf = (id) => axios.get(`${url}/get/${id}`)
    .then(data => {
        return data.data.comment;
    })

// xóa tất cả các topic
export const deleteAllTopic = () => axios.delete(`${url}/deleteAll/`);

// Nhận vào body {topicId, commentId}
export const deleteComment = (body) => axios.delete(`${url}/deleteComment/`, body);