import axios from 'axios';

const articleApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/order/'
});

export const getCotiz = () => {
    return articleApi.get('/quotation')
};

export const cotizCreate = (data) => {
    return articleApi.post('/quotation', data)
};

export const cotizTotal = (data) => {
    return articleApi.post('/quotation_detail', data)
};

export const cotizEdit = (data, pk) => {
    return articleApi.patch('/quotationDetail/'+pk, data)
};

export const cotizDelete = (data, pk) => {
    return articleApi.delete('/quotationDetail/'+pk, data)
};

export const editCotizDetail = (data, pk) => {
    return articleApi.patch('/quotation_detailDetail/'+pk, data)
};

export const deleteCotizDetail = (data, pk) => {
    return articleApi.delete('/quotation_detailDetail/'+pk, data)
};

export const getCars = (branch) => {
    return articleApi.get('/car_stock/'+branch)
};

export const carEdit = (data, pk, branch) => {
    return articleApi.patch('/carDetail/'+pk+'/'+branch, data)
};

export const carDelete = (data, pk, branch) => {
    return articleApi.delete('/carDetail/'+pk+'/'+branch, data)
};

export const carCreate = (data) => {
    return articleApi.post('/car', data);
};

export const getStock = (branch) => {
    return articleApi.get('/replacement_stock/'+branch)
};

export const stockEdit = (data, pk, branch) => {
    return articleApi.patch('/replacementDetail/'+pk+'/'+branch, data)
};

export const stockDelete = (data, pk, branch) => {
    return articleApi.delete('/replacementDetail/'+pk+'/'+branch, data)
};

export const stockCreate = (data) => {
    return articleApi.post('/replacement', data);
};