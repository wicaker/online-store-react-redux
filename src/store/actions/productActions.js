import { axiosInstance } from '../../config/api';
import { GET_ERRORS, PRODUCT_SUCCESS } from '../types';

export const getAllProducts = requestBody => dispacth => {
  axiosInstance
    .post("/graphql", requestBody)
    .then(res => {
      if(res.status !== 200 && res.status !== 201){
        throw new Error('failed');
      }
      dispacth({ type: PRODUCT_SUCCESS, res})
    })
    .catch(err => {
      dispacth({ type: GET_ERRORS, err})
    })
} 

export const getCategoryProduct = requestBody => dispacth => {
  axiosInstance
    .post("/graphql", requestBody)
    .then(res => {
      if(res.status !== 200 && res.status !== 201){
        throw new Error('failed');
      }
      dispacth({ type: 'CATEGORY_PRODUCT_SUCCESS', res})
    })
    .catch(err => {
      dispacth({ type: GET_ERRORS, err})
    })
} 

export const getAdminProducts = requestBody => dispacth => {
  axiosInstance
    .post("/graphql", requestBody)
    .then(res => {
      if(res.status !== 200 && res.status !== 201){
        throw new Error('failed');
      }
      dispacth({ type: 'ADMIN_PRODUCT_SUCCESS', res})
    })
    .catch(err => {
      dispacth({ type: GET_ERRORS, err})
    })
} 