import { useState, useEffect } from "react"
import axios from 'axios';
import { ProductCard } from "../Components/ProductCard/ProductCard";
export const Home = () => {
    const [product, setProduct] = useState([]);
    useEffect(()=>{
        const getProduct = async ()=>{
            const response = await axios.get("https://dummyjson.com/products/category/mens-shoes");
            setProduct(response.data.products);
        }
        getProduct();
    }, []);
    console.log(product);
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
                        product.map((item) => (
                            <ProductCard key={item.id} id={item.id} title={item.title} price={item.price} imagePath={item.thumbnail}/>
                        ))
                    }
                </div>
            </div>
                
                
            
            
            
        </>
    )
}
