import React from "react";
import { Link } from "react-router-dom";

export function Header(){

    return (
        <>
        <div className="container">
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <span className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    <span className="fs-4">Music App</span>
                </span>

                <ul className="nav nav-pills">
                    <li className="nav-item"><Link to={"/"} className="nav-link" >Home</Link></li>
                    <li className="nav-item"><Link to={"/albums-webapi"} className="nav-link" >Bands</Link></li>
                </ul>
            </header>
        </div>
        </>
    )
}
export default Header