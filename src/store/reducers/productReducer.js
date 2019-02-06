import { GET_ERRORS, PRODUCT_SUCCESS } from '../types';

const initState = {
  allProducts : [],
  categoryProducts: [],
  adminProducts : []
}

const productReducer = (state= initState, action) => {
  switch (action.type){
    case GET_ERRORS:
      console.log("can not got data");
      return state;
    case PRODUCT_SUCCESS:
      return {
        ...state,
        allProducts : action.res.data.data.products,
      }
    case 'ADMIN_PRODUCT_SUCCESS':
      return {
        ...state,
        adminProducts : action.res.data.data.adminProducts
      }
    case 'CATEGORY_PRODUCT_SUCCESS':
      return {
        ...state,
        categoryProducts : action.res.data.data.productsCategory
      }
    default:
      return state;
  }
}

export default productReducer;