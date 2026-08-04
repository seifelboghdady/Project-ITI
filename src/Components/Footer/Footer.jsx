import { Link } from "react-router-dom"
import "./Footer.css"
import {
  BsGeoAlt,
  BsTelephone,
  BsEnvelope,
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsGithub,
  BsHeartFill
} from "react-icons/bs";

export const Footer = () => {
    return (
        <>
        <footer>
            <div className="container py-2">
            <hr className="text-muted mb-5"/>
            <div className="row g-4">
                <div className="col-12 col-lg-4 col-md-6">
                    <div className="text-uppercase  mb-2">
                        <Link to="/" className="navbar-brand fs-5">
                        bloom<span style={{ color: 'var(--primary-color)' }}>shop</span>
                        </Link>
                    </div>
                <p className="text-muted  pe-lg-4">
                    Discover unique products that inspire your lifestyle. Quality craftsmanship meets modern design.
                </p>
                
                <div className="d-flex flex-column gap-2 text-muted  mb-3">
                    <div className="d-flex align-items-center gap-2">
                    <BsGeoAlt style={{ color: 'var(--primary-color)' }} />
                    <span>123 Fashion Street, Style City, SC 12345</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                    <BsTelephone style={{ color: 'var(--primary-color)' }} />
                    <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                    <BsEnvelope style={{ color: 'var(--primary-color)' }} />
                    <span>hello@bloomshop.com</span>
                    </div>
                </div>

                <div className="d-flex gap-2">
                    <a href="#" className="social-btn btn  rounded-circle p-0 d-flex align-items-center justify-content-center text-muted">
                    <BsFacebook />
                    </a>
                    <a href="#" className="social-btn btn  rounded-circle p-0 d-flex align-items-center justify-content-center text-muted">
                    <BsTwitter />
                    </a>
                    <a href="#" className="social-btn btn  rounded-circle p-0 d-flex align-items-center justify-content-center text-muted">
                    <BsInstagram />
                    </a>
                    <a href="#" className="social-btn btn  rounded-circle p-0 d-flex align-items-center justify-content-center text-muted">
                    <BsGithub />
                    </a>
                </div>
                </div>

                <div className="col-12  col-md-6 col-lg-2">
                <h6 className="fw-bold text-uppercase text-dark mb-3">Shop</h6>
                <ul className="list-unstyled d-flex flex-column gap-2 small">
                    <li><Link to="/" className="text-decoration-none text-muted">All Products</Link></li>
                    <li><Link to="/" className="text-decoration-none text-muted">New Arrivals</Link></li>
                    <li><Link to="/" className="text-decoration-none text-muted">Sale</Link></li>
                    <li><Link to="/" className="text-decoration-none text-muted">Featured</Link></li>
                </ul>
                </div>

                <div className="col-12  col-md-6 col-lg-2">
                <h6 className="fw-bold text-uppercase text-dark mb-3">Customer Care</h6>
                <ul className="list-unstyled d-flex flex-column gap-2 small">
                    <li><Link to="/" className="text-decoration-none text-muted">Contact Us</Link></li>
                    <li><Link to="/" className="text-decoration-none text-muted">Help Center</Link></li>
                    <li><Link to="/" className="text-decoration-none text-muted">Shipping Info</Link></li>
                    <li><Link to="/" className="text-decoration-none text-muted">Returns & Exchanges</Link></li>
                </ul>
                </div>

                <div className="col-12  col-md-6 col-lg-2">
                <h6 className="fw-bold text-uppercase text-dark mb-3">Company</h6>
                <ul className="list-unstyled d-flex flex-column gap-2 small">
                    <li><Link to="/" className="text-decoration-none text-muted">About Us</Link></li>
                    <li><Link to="/" className="text-decoration-none text-muted">Careers</Link></li>
                    <li><Link to="/" className="text-decoration-none text-muted">Blog</Link></li>
                    <li><Link to="/" className="text-decoration-none text-muted">Press</Link></li>
                </ul>
                </div>

                <div className="col-12  col-md-6 col-lg-2">
                <h6 className="fw-bold text-uppercase text-dark mb-3">Legal</h6>
                <ul className="list-unstyled d-flex flex-column gap-2 small">
                    <li><Link to="/" className="text-decoration-none text-muted">Privacy Policy</Link></li>
                    <li><Link to="/" className="text-decoration-none text-muted">Terms & Conditions</Link></li>
                    <li><Link to="/" className="text-decoration-none text-muted">Cookie Policy</Link></li>
                    <li><Link to="/" className="text-decoration-none text-muted">Accessibility</Link></li>
                </ul>
                </div>

            </div>
            <hr className="text-muted mt-5"/>
            <div className="d-flex flex-column flex-lg-row flex-md-row justify-content-between align-items-center pt-4 small">
                <p className="text-muted">© 2025 BloomShop™. Made with <BsHeartFill className="text-danger"/> All Rights Reserved.</p>
                <p className="d-flex gap-4 text-muted">
                    <span>Privacy</span>
                    <span>Terms</span>
                    <span>Cookies</span>
                </p>
            </div>
            </div> 
        </footer>
        </>
    )
}
