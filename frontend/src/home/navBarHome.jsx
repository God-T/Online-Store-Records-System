import React from 'react';
import { NavLink, Link } from 'react-router-dom'; //prevent full page reload

const NavBarHome = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
            <Link className='navbar-brand' to='/'>
                Online Store Records
            </Link>
            <button
                className='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#navbarNav'
                aria-controls='navbarNav'
                aria-expanded='false'
                aria-label='Toggle navigation'
            >
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarNav'>
                <ul className='navbar-nav'>
                    <li className='nav-item'>
                        <NavLink className='nav-item nav-link' to='/products'>
                            All Products
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-item nav-link' to='/customers'>
                            All Customers
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBarHome;
