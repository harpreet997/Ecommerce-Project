import axios from 'axios';

export const getProductList = () => {
    return axios.get("http://localhost:4000/products")
}