import axios from 'axios'

export const getCustomers = () => {
    return axios.get('http://127.0.0.1:8000/login/customer')
}