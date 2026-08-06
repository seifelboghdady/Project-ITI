import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import axios from "axios";
import { useCart } from "../Cart/useCart";

export const ProductDetail= ()=>{
    const {id} = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        const getRelatedProducts = async (category) => {
            const response = await axios.get(
                `https://dummyjson.com/products/category/${category}`
            );

            setRelatedProducts(response.data.products.slice(0,3));
        };
        const getProduct = async () => {
           const response =  await axios.get(`https://dummyjson.com/products/${id}`);
            //console.log(response.data);
           setProduct(response.data);
           setMainImage(response.data.thumbnail);
           getRelatedProducts(response.data.category);
        }
        getProduct();

        
    },[id])
    // console.log(id);

    if (!product) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
                <div className="spinner-border text-warning" role="status"></div>
            </div>
        );
    }
    return (
        
        <div className="container py-5">
            <div className="row">
                {/* Left Side - Image */}
                <div className="col-lg-6">
                   <img
                        src={mainImage}
                        alt={product.title}
                        className="img-fluid rounded shadow-sm"
                    />
                </div>

                {/* Right Side - Product Info */}
                <div className="col-lg-6">

                    <h2>{product.title}</h2>
                    <p>⭐ {product.rating}</p>
                    <h3>${product.price}</h3>
                    <p>{product.description}</p>
                    <div className="d-flex gap-2">

                        <span className="badge bg-dark">

                            {product.brand}

                        </span>

                        <span className="badge bg-warning text-dark">

                            {product.category}

                        </span>

                    </div>
                    <p><strong>Stock:</strong> {product.stock}</p>
                    <div className="d-flex gap-2 mt-3">
                        {product.images.map((image, index) => (

                            <img
                                key={index}
                                src={image}
                                alt={product.title}
                                width="80"
                                className="border rounded"
                                style={{
                                    cursor: "pointer",
                                    objectFit: "cover"
                                }}
                                onClick={() => setMainImage(image)}
                            />

                        ))}

                    </div>
                    <button
                        className="btn btn-warning px-5 py-2 rounded-pill mt-3"
                        onClick={() => addToCart(product)}
                    >
                        Add To Cart
                    </button>

                </div>
                <div className="container my-5">

                    <div className="row g-4">
                        {/* Shipping */}
                        <div className="col-md-4">
                            <div className="border rounded-4 p-4 h-100 shadow-sm">
                                <h5>🚚 Free Shipping</h5>
                                <p className="text-secondary mb-0">
                                    {product.shippingInformation}
                                </p>
                            </div>
                        </div>
                        {/* Warranty */}
                        <div className="col-md-4">
                            <div className="border rounded-4 p-4 h-100 shadow-sm">
                                <h5>🛡 Warranty</h5>
                                <p className="text-secondary mb-0">
                                    {product.warrantyInformation}
                                </p>
                            </div>
                        </div>

                        {/* Return Policy */}
                        <div className="col-md-4">
                            <div className="border rounded-4 p-4 h-100 shadow-sm">
                                <h5>↩ Easy Returns</h5>
                                <p className="text-secondary mb-0">
                                    {product.returnPolicy}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                <h2 className="fw-bold mb-4">Related Products</h2>
                <div className="row">
                    {relatedProducts.map((item) => (
                        <ProductCard
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            imagePath={item.thumbnail}
                        />
                    ))}
                </div>

            </div>

        </div>

        
    );
}
