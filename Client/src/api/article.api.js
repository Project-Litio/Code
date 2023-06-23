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

export const uploadCar = async (carData) => {
    const response = await articleApi.post('/car', carData);
    return response.data;
  };
  