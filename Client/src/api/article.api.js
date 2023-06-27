import axios from 'axios';

const articleApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/inventory/'
});

export const getAllCars = () => {
    return articleApi.get('/car')
};

export const getCars = (branch) => {
    return articleApi.get('/car_stock/'+branch)
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

export const getStock = (branch) => {
    return articleApi.get('/replacement_stock/'+branch)
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

export const getCotiz = () => {
    return articleApi.get('/replacement');
};

export const cotizCreate = (data) => {
    return articleApi.post('/replacement', data)
};

export const cotizEdit = (data, pk) => {
    return articleApi.patch('/replacementDetail/'+pk, data)
};

export const cotizDelete = (data, pk) => {
    return articleApi.delete('/replacementDetail/'+pk, data)
};