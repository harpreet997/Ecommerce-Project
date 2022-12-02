import { Modal } from "react-bootstrap";
import '../styles/productlist.css';
const ProductModal = ({ data }) => {
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Product Preview</Modal.Title>
            </Modal.Header>

            <img src={data.image} alt="product" />
            <table className="table table-striped">

                <tr>
                    <th scope="col" className="ps-4">Name</th>
                    <td >{data.name}</td>
                </tr>
                <tr>
                    <th scope="col" className="ps-4">Original Price</th>
                    <td >&#8377;{data.originalPrice}</td>
                </tr>
                <tr>
                    <th scope="col" className="ps-4">Discount Price</th>
                    <td >&#8377;{data.price}</td>
                </tr>
                <tr>
                    <th scope="col" className="ps-4">Rating</th>
                    <td ><span className="ms-2 fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span></td>
                </tr>
                <tr>
                    <th scope="col" className="ps-4">Description</th>
                    <td >{data.description}</td>
                </tr>


            </table>
            <Modal.Body>

            </Modal.Body>


        </>
    );
}

export default ProductModal;