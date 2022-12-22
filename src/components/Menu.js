import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
    const toggleMenu = () =>  {
        const navbarSupportedContent = document.getElementById('navbarSupportedContent');
        navbarSupportedContent.classList.remove('show');
    }
    return (
        <>
            <nav className="navbar navbar-expand-md bg-warning fixed-top">
                <div className="container">
                    <NavLink className="appTitle" to="/" exact><h3 className='m-0 me-2' onClick={toggleMenu}>CRUD-APP</h3></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <   span className="navbar-toggler-icon"></span>
                    </button>
    <               div className="collapse navbar-collapse" id="navbarSupportedContent" onClick={toggleMenu}>
                    <ul className="navbar-nav me-auto mb-lg-0">
                        <li className='nav-item'><NavLink className="nav-link" exact to="/">Dashboard</NavLink></li>
                        <li className='nav-item'><NavLink className="nav-link" to="/active">Active</NavLink></li>
                        <li className='nav-item'><NavLink className="nav-link" to="/deactive">Deactive</NavLink></li>
                    </ul>
                    <div className="d-flex">
                        <NavLink to="/create" className="createStudent"><i className="fa fa-user-o" aria-hidden="true"></i> Create Student</NavLink>
                    </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Menu;