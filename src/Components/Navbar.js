import React, { useState } from 'react'
import "./Navbar.css"
import { Link, useNavigate } from "react-router-dom"
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../Pages/Cart';
import { useCart } from './ContextReducer';

export default function Navbar() {
    let data = useCart();
    const [cartView, setCartView] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken")
        navigate("/")

    }
    return (
        <div>
            <nav className={'navbar navbar-expand-lg navbar-dark bg-success'}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-2 fst-italic" to="/">Foodies</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav me-auto  mb-2">
                            <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            {(localStorage.getItem("authToken")) ?
                                <Link className="nav-link active fs-5" aria-current="page" to="/">My Orders</Link>
                                : ""

                            }

                        </div>


                        <div className='d-flex'>

                            {(localStorage.getItem("authToken")) ?
                                <div>
                                    <div className="btn bg-white text-success mx-2" onClick={() => { setCartView(true) }}>Cart {"   "}
                                      

                                        {data.length !== 0 && (
                                            <Badge pill bg="danger">
                                                {data.length}
                                            </Badge>
                                        )}


                                    </div>
                                    {
                                        cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null
                                    }
                                    <div className="btn bg-white text-danger mx-2" onClick={handleLogout} >Logout</div>

                                </div>
                                :
                                <div><Link className="btn bg-white text-success mx-1" to="/Login">Login</Link>
                                    <Link className="btn bg-white text-success mx-1" to="/SignUp">SignUp</Link></div>

                            }

                        </div>


                    </div>
                </div>
            </nav>
        </div>
    )
}
