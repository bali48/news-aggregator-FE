import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUserCircle, FaTimes } from "react-icons/fa";
import { useAuth } from "../auth/AuthContext";
import { useSearch } from "../context/filterContext";
import "../App.css";

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { searchTerm, setSearchTerm, isSearchActive, handleSearchToggle } =
    useSearch();

  return (
    <nav className='navbar navbar-expand-lg bg-dark navbar-dark sticky-top'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          NewsHub
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link className='nav-link active' aria-current='page' to='/'>
                Home
              </Link>
            </li>

            <li className='nav-item'>
              <Link className='nav-link' to='/health'>
                Health
              </Link>
            </li>

            <li className='nav-item'>
              <Link className='nav-link' to='/sports'>
                Sports
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/technology'>
                Technology
              </Link>
            </li>
          </ul>
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
            {isAuthenticated ? (
              <li className='nav-item d-flex align-items-center'>
                {isSearchActive ? (
                  <>
                    <input
                      type='text'
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder='Search...'
                      className='form-control me-2'
                    />
                    <button
                      className='btn btn-outline-light'
                      onClick={handleSearchToggle}
                    >
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <button
                    className='btn btn-outline-light'
                    onClick={handleSearchToggle}
                  >
                    <FaSearch size={20} />
                  </button>
                )}
                <Link className='nav-link ms-1' to='/profile'>
                  <FaUserCircle size={24} />
                </Link>
                <span onClick={logout} className='text-white curser-pointer'>
                  Logout
                </span>
              </li>
            ) : (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/login'>
                    Login
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/signup'>
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
