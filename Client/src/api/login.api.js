import axios from 'axios';

const loginApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/login/'
});

export const getCustomers = () => {
    return loginApi.get('/customer')
};

export const getEmployees = () => {
    return loginApi.get('/employee')
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

export const employeeEdit = (data, pk) => {
    return loginApi.patch('employeeDetail/'+pk, data)
};

export const customerDelete = (data, pk) => {
    return loginApi.delete('customerDetail/'+pk, data)
};

export const employeeDelete = (data, pk) => {
    return loginApi.delete('employeeDetail/'+pk, data)
};

export const customerCreate = (data) => {
    return loginApi.post('/customer', data)
};

export const employeeCreate = (data) => {
    return loginApi.post('/employee', data)
};

export const employeeDetail = (pk) => {
    return loginApi.get('/employeeDetail/'+pk)
};

export const customerDetail = (pk) => {
    return loginApi.get('/customerDetail/'+pk)
};

export const branchDetail = (pk) => {
    return loginApi.get('/branch/'+pk)
};

export const branchEdit = (data, pk) => {
    return loginApi.patch('/branch/'+pk, data)
};