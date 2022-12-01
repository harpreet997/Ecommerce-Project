import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';

const Cart = () => {
    const [cartdata, setCartData] = useState([]);
    const [itemPrice, setItemPrice] = useState();
    const deliveryCost = 50;

    useEffect(() => {
        axios.get("http://localhost:4001/carts")
            .then((response) => {
                setCartData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);


    const handleIncrement = (quantity) => {
        return quantity+1;
    }
    const handleDelete = (id) => {

        console.log(id);
        axios.delete(`http://localhost:4001/carts/${id}`)
            .then(() => {
                alert("Item deleted successfully");
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <>
            <h1>Cart Page</h1>
            <div className="card mt-5 mb-3">
                <div className='scroll'>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        {cartdata.length > 0 ?
                            <tbody>

                                {cartdata.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>
                                                <img className='product-image' src={item.image}
                                                    alt="productImage" />
                                            </td>
                                            <td>{item.name}</td>
                                            <td><button style={{width: 50, height: 50, marginRight: 5}}>-</button>{item.quantity}
                                            <button style={{marginLeft: 5, width: 50, height: 50}} onClick={() => handleIncrement(item.quantity)}>+</button></td>
                                            <td>&#8377;{item.price}</td>
                                            <td>
                                                <button className="btn btn-primary px-3 pb-2 ms-2"
                                                    onClick={() => handleDelete(item.id)}>
                                                    <MdDelete />
                                                </button>
                                            </td>

                                        </tr>
                                    )
                                })}

                            </tbody>
                            : <div className='row mx-3'>
                                <p className='fs-5 pt-2'>Cart is Empty</p>
                            </div>}
                    </table>
                </div>
            </div>
            <div className="card">

                <div className="card-body">
                    <h5 className="card-title">Cart Summary</h5>
                    <div className="row">
                        <div className="col-lg-6">
                            <p>Item Cost :</p>
                        </div>
                        <div className="col-lg-6">
                            <p>&#8377;2000/-</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <p>Delivery Cost :</p>
                        </div>
                        <div className="col-lg-6">
                            <p>&#8377;{deliveryCost}/-</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <p>Order Cost :</p>
                        </div>
                        <div className="col-lg-6">
                            <p>Item Cost :</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Cart;