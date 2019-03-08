import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://electronshop.herokuapp.com',
});

//export const urlName = 'https://bitlyclonerefactory.herokuapp.com/'
