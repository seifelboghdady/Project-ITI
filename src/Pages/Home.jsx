import { useState, useEffect } from "react"
import axios from 'axios';
import { ProductCard } from "../Components/ProductCard/ProductCard";
export const Home = ({search, setSearch}) => {
    console.log(search);
    const [product, setProduct] = useState([]);
    const filteredProducts = product.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );
    useEffect(()=>{
        const getProduct = async ()=>{
            const menResponse = await axios.get("https://dummyjson.com/products/category/mens-shoes");
            const womenResponse = await axios.get("https://dummyjson.com/products/category/womens-shoes");
            const allShoes = [
                ...menResponse.data.products,
                ...womenResponse.data.products];
            setProduct(allShoes);
        }
        getProduct();
    }, []);
    if (!product.length) {
        return (<div className="d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
                <div className="spinner-border text-warning" role="status"></div>
            </div>);
    }
    if (filteredProducts.length === 0) {
        return (
            <div className="container py-5">
            <div className="text-center py-5">
                <div
                className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
                style={{ width: "100px", height: "100px" }}
                >
                <i className="bi bi-search fs-1 text-secondary"></i>
                {/* <span className="fs-1">🔍</span> */}
                </div>

                <h2 className="fw-bold text-dark">
                No Products Found
                </h2>

                <p className="text-muted mb-4">
                Sorry, we couldn't find any product matching your search.
                </p>

                <button
                className="btn btn-primary px-4 py-2"
                onClick={() => setSearch("")}
                >
                <i className="bi bi-arrow-left me-2"></i>
                Clear Search
                </button>
            </div>
            </div>
        );
        }
    return (
        <>
            <div className="hero py-5 text-center">
                <div className="container d-flex flex-column align-items-center">
                    <h1 className="fw-bold  mb-2" style={{ color: 'var(--primary-color)' }}>Step Into Style</h1>
                    <p className="  m-0" style={{ maxWidth: '350px',fontSize:'14px' }}>Discover our latest collection of premium sneakers — comfort, design, and performance in every pair.</p>
                </div>
            </div>
            {/* <ProductPage/> */}
            <div className="container">
                <div className="row">

                    {
                        filteredProducts.map((item) => (
                            <ProductCard key={item.id} id={item.id} title={item.title} price={item.price} imagePath={item.thumbnail}/>
                        ))
                    }
                </div>
            </div>
        </>
    )
}
