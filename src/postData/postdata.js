import axios from "axios";


export const addToCart = (payload) => {
    return axios.post('http://localhost:4001/carts', payload);
}

export const cartDelete = (id) => {
    return axios.delete(`http://localhost:4001/carts/${id}`);
}