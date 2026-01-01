import React from "react";

function Footer() {
    return (
        <footer className="bg-light border-top mt-5">
            <div className="container py-4">
                <div className="row align-items-center">

                    {/* Left */}
                    <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
                        <span className="text-body-secondary">
                            © 2025 DyFun.vn
                        </span>
                    </div>

                    {/* Center */}
                    <ul className="nav col-md-4 justify-content-center mb-3 mb-md-0">
                        <li className="nav-item">
                            <a href="#" className="nav-link px-2 text-body-secondary">Home</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link px-2 text-body-secondary">Features</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link px-2 text-body-secondary">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link px-2 text-body-secondary">About</a>
                        </li>
                    </ul>

                    {/* Right */}
                    <div className="col-md-4 text-center text-md-end">
                        <a href="#" className="text-body-secondary me-3">Instagram</a>
                        <a href="#" className="text-body-secondary">Facebook</a>
                    </div>

                </div>
            </div>
        </footer>
    );
}

export default Footer;
