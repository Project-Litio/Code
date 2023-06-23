import axios from 'axios';

const articleApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/inventory/'
});

export const getCars = () => {
    return articleApi.get('/car')
};

export const carEdit = (data, pk) => {
    return articleApi.patch('/carDetail/'+pk, data)
};

export const carDelete = (data, pk) => {
    return articleApi.delete('/carDetail/'+pk, data)
};

export const carCreate = (data) => {
    return articleApi.post('/car', data);
};

export const getStock = () => {
    return articleApi.get('/replacement');
};

export const stockEdit = (data, pk) => {
    return articleApi.patch('/replacementDetail/'+pk, data)
};

export const stockDelete = (data, pk) => {
    return articleApi.delete('/replacementDetail/'+pk, data)
};

export const stockCreate = (data) => {
    return articleApi.post('/replacement', data);
};