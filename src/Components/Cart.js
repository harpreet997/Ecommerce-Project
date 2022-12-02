import React, { useEffect, useState } from 'react';
import { MdDelete,  MdShoppingBag  } from 'react-icons/md';
import Sidebar from './Sidebar';
import { BsSearch } from 'react-icons/bs';
import { Link} from 'react-router-dom';
import { cartDelete } from '../postData/postdata';
import { getCartList } from '../getData/getdata';
import '../styles/cart.css';
import axios from 'axios';
const Cart = () => {
    const [cartdata, setCartData] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    let [itemCost, setItemCost] = useState(0);
    const deliveryCost = 50;

    useEffect(() => {
        getCartList()
            .then((response) => {
                setCartData(response.data);
                setCartCount(response.data.length);
                let itemCost = 0;
                response.data.forEach((v) => {
                    itemCost= itemCost+ Number(v.price);
                    setItemCost(itemCost)
                })
            })
            .catch((error) => {
                console.log(error);
            })

        
    }, []);


    const handleIncrement = (item, id) => {
        item.quantity = item.quantity +1
        let payload = {
            name: item.name,
            image: item.image,
            price: item.quantity * item.originalPrice,
            quantity: item.quantity,
            id: item.id,
            originalPrice: item.originalPrice,
        }
        axios.put(`http://localhost:4001/carts/${id}`, payload)
        .then((response) => {
            alert("Quantity added successfully");
                    itemCost= Number(response.data.price) * Number(response.data.quantity);
                    console.log("itemcost", itemCost)
                    setItemCost(itemCost)
                    window.location.reload(false);
                })
        .catch((error) => {
            console.log(error);
        })
        
    }

    const handleDecrement = (item, id) => {
        if(item.quantity === 1) 
        {
            cartDelete(id)
            alert("Item deleted successfully");
            window.location.reload(false);
        }
        else
        {
        item.quantity = item.quantity -1
        let payload = {
            name: item.name,
            image: item.image,
            price: item.quantity * item.originalPrice,
            quantity: item.quantity,
            id: item.id,
            originalPrice: item.originalPrice,
        }
        axios.put(`http://localhost:4001/carts/${id}`, payload)
        .then(() => {
            alert("Quantity deleted successfully");
            window.location.reload(false);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    }

    const handleDelete = (id) => {
        cartDelete(id)
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
        <Sidebar />
        <div className="content">
        <div className="row mt-4 mb-4">
                    <div className="col-md-10 col-lg-11">
                        <input className="w-100 ps-3 search-input" type="text" name="Search" placeholder='Enter your Product Name'
                             />
                        <BsSearch className='search-icon' />
                    </div>
                    <div className="col-md-2 col-lg-1">
                        <MdShoppingBag className="shopping-bag" style={{ width: 30, height: 40 }} />
                        <Link to="/cart"><button className='rounded-circle bg-warning'>{cartCount}</button></Link>
                    </div>
        </div>
        <div className="row">
            <div className="col-lg-9">
            <h1>Cart Page</h1>
            </div>
            <div className="col-lg-3">
            <Link to="/"><button className='shopping-button'>Back to Shopping Page</button></Link>
            </div>
        </div>
           
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
                                            <td><button style={{width: 50, height: 50, marginRight: 5}}
                                            onClick={() => handleDecrement(item, item.id)}>-</button>{item.quantity}
                                            <button style={{marginLeft: 5, width: 50, height: 50}} onClick={() => handleIncrement(item, item.id)}>+</button></td>
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
                    {cartdata.length > 0 ? 
                    (
                    <>
                    <div className="row">
                        <div className="col-lg-6">
                            <p>Item Cost :</p>
                        </div>
                        <div className="col-lg-6">
                           <p>&#8377;{itemCost}/-</p>
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
                            <p>&#8377;{itemCost+ deliveryCost}/-</p>
                        </div>
                    </div>
                    </>
                    ):<div>Cart Summary is Empty</div>}
                </div>
            </div>
            
            </div>
        </>
    );
}

export default Cart;