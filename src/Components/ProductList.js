import React, { useState, useEffect } from 'react';
import { MdShoppingBag } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
import axios from 'axios';
import '../App.css';
import '../styles/productlist.css';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getProductList } from '../getData/getdata';
import { addToCart } from '../postData/postdata';
import {Modal } from 'react-bootstrap';
import ProductModal from './ProductModal';

const ProductList = () => {
    const [searchProduct, setSearchProduct] = useState('');
    const [cartCount, setCartCount] = useState(0);
    const [productdata, setProductData] = useState([]);
    const [productItem, setProductItem] = useState();
    const [cartdata, setCartData] = useState([]);
    const [productModal, setProductModal] = useState(false);

    const handleProductModal = (id) => setProductModal(id);
    useEffect(() => {
        getProductList()
            .then((response) => {
                setProductData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })

            axios.get("http://localhost:4001/carts")
            .then((response) => {
                setCartCount(response.data.length);
                setCartData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const AddToCart = (item) => {
        
        let payload = {
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: 1,
            id: item.id,
            originalPrice: item.price,
        }
        let data1 = cartdata.find(v => (v.id === payload.id))
        if(data1)
        {
            alert("Item already added");
        }
        else
        {
        addToCart(payload)
        .then(() => {
            alert("Item added successfully");
            setCartCount(cartCount+1)
        })
        .catch((error) => {
            console.log(error);
        })
        
    }
    }

    return (
        <>
            <Sidebar />
            <div className="content">

                <div className="row mt-4 mb-4">
                    <div className="col-xs-6 col-sm-6 col-md-10 col-lg-11">
                        <input className="w-100 ps-3 search-input" type="text" name="Search" placeholder='Search Products...'
                            onChange={(e) => setSearchProduct(e.target.value)} />
                        <BsSearch className='search-icon' />
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-2 col-lg-1">
                        <MdShoppingBag className="shopping-bag" style={{ width: 30, height: 40 }} />
                        <Link to="/cart"><button className='rounded-circle bg-warning'>{cartCount}</button></Link>
                    </div>
                </div>
                <div className='row'>
                    {
                        productdata.filter((val) => {
                            return val.name.toLowerCase().includes(searchProduct.toLowerCase())
                        }).map((item) => {
                            return (
                                <div className='col-lg-4'>
                                    <div className='card'>
                                        <img className="card-img-top" src={item.image} alt="product-images" />
                                        <div className="card-body">
                                            <h5 className="card-title" style={{ textAlign: "left" }}>{item.name}</h5>
                                            <p className='price'>&#8377;{item.price}</p>
                                            <del><p className='original-price'>&#8377;{item.originalPrice}</p></del>
                                            <span className="ms-2 fa fa-star checked"></span>
                                            <span className="fa fa-star checked"></span>
                                            <span className="fa fa-star checked"></span>
                                            <span className="fa fa-star"></span>
                                            <span className="fa fa-star"></span>
                                            <br />
                                            <button className='preview'
                                                onClick={() => {
                                                    handleProductModal(item.id)
                                                    setProductItem(item)
                                                    }}>Preview</button>
                                            <button className='addToCart'
                                                onClick={() => AddToCart(item)}>Add to Cart</button>
                                                <Modal show={productModal === item.id ? true : false}
                                                    onHide={() => setProductModal(false)}>
                                                    <ProductModal data={productItem} />
                                                </Modal>
                                        </div>
                                    </div>
                                    <br />
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </>
    );
}

export default ProductList;
