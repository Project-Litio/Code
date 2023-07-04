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

export const getBills = () => {
    return articleApi.get('/bill')
};

export const billCreate = (data) => {
    return articleApi.post('/bill', data)
};

export const billTotal = (data) => {
    return articleApi.post('/bill_detail', data)
};

export const billEdit = (data, pk) => {
    return articleApi.patch('/billDetail/'+pk, data)
};

export const billDelete = (data, pk) => {
    return articleApi.delete('/billDetail/'+pk, data)
};

export const editBillDetail = (data, pk) => {
    return articleApi.patch('/bill_detailDetail/'+pk, data)
};

export const deleteBillDetail = (data, pk) => {
    return articleApi.delete('/bill_detailDetail/'+pk, data)
};