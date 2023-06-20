import axios from 'axios';

const loginApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/login/'
});

export const getCustomers = () => {
    return loginApi.get('/customer')
};

export const login = (data) => {
    return loginApi.post('/customer/login',data)
};

export const otpLogin = (data) => {
    return loginApi.post('/customer/otp',data)
};

export const customerEdit = (data, pk) => {
    return loginApi.patch('customerDetail/'+pk, data)
};

export const customerDelete = (data, pk) => {
    return loginApi.delete('customerDetail/'+pk, data)
};

export const customerCreate = (data) => {
    return loginApi.post('/customer', data)
};