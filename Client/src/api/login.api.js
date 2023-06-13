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