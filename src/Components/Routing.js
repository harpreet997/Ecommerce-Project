import { Route, Routes } from "react-router-dom";
import Cart from "./Cart";
import ProductList from "./ProductList";
const Routing = () => {
    
    return (
        <Routes>
            <Route exact path="/" element={<ProductList/>}/>
            <Route exact path="/cart" element={<Cart/>}/>
        </Routes>
    );
}

export default Routing;