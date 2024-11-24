import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import Login from './Login';
import ThemeMode from './ThemeMode';
import { useAuth } from '../context/AuthProvider';
import Logout from './Logout';
import Filter from './Filter';

const Navbar = ({ cartQuantity }) => {
  const [authUser, setAuthUser] = useAuth();
  const [navbarSticky, setNavbarSticky] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get current route

  const handleFilter = async (filters) => {
    const { category, minPrice, maxPrice, name } = filters;

    // Build query parameters
    const queryParams = new URLSearchParams();
    if (category) queryParams.append('Category', category);
    if (minPrice) queryParams.append('minPrice', minPrice);
    if (maxPrice) queryParams.append('maxPrice', maxPrice);
    if (name) queryParams.append('name', name);

    try {
      const response = await fetch(`http://localhost:4001/shop/filter?${queryParams.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch products');

      const data = await response.json();
      console.log(data); // Log the filtered product data to the console

      // Navigate to the FilteredData route and pass the data as state
      navigate('/FilteredData', { state: { filteredData: data } });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    const handleNavbarScroll = () => {
      setNavbarSticky(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleNavbarScroll);
    return () => window.removeEventListener('scroll', handleNavbarScroll);
  }, []);

  const Navitems = (
    <>
      <li><a href='/'>Home</a></li>
      <li><a href='/Men'>Mens</a></li>
      <li><a href='/Girl'>Girls</a></li>
      <li><a href='/Kids'>Kids</a></li>
      <li><a href='/Contact'>Contact</a></li>
    </>
  );

  // Check if the current route matches the pages where the filter should be visible
  const showFilter = ['/', '/Men', '/Girl', '/Kids'].includes(location.pathname);

  return (
    <div
      className={`max-w-screen-2xl container mx-auto md:px-16 px-2 dark:bg-slate-900 dark:text-white fixed top-0 left-0 right-0 z-50 ${navbarSticky ? 'sticky-navbar shadow-md bg-base-200 dark:bg-slate-600 dark:text-white duration-300 transition-all ease-in-out' : ''
        }`}
    >
      <div className="navbar ">
        <div className="navbar-start">
          <div className="dropdown ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden sm:bg-slate-950 sm:text-white "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow dark:bg-slate-950"
            >
              {Navitems}
            </ul>
          </div>
          <a href="/" className="text-2xl font-bold cursor-pointer">PkMart</a>
        </div>
        <div className="navbar-end space-x-3">
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{Navitems}</ul>
          </div>
          <div className="hidden md:block">
            <SearchBar />
          </div>
          {/* Cart Icon */}
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
                onClick={() => navigate('/OrderPage')}
              >
                <div className="indicator">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span id="cart-quantity" className="badge badge-sm indicator-item">{cartQuantity || 0}</span>
                </div>
              </div>
            </div>
          </div>

          <ThemeMode />
          {authUser ? (
            <Logout />
          ) : (
            <div>
              <a
                className="bg-black text-white px-3 py-2 rounded-md hover:bg-pink-500 dark:bg-pink-500 dark:hover:bg-pink-600 duration-300 cursor-pointer"
                onClick={() => document.getElementById('login_modal').showModal()}
              >
                Login
              </a>
              <Login />
            </div>
          )}
        </div>
      </div>
      {showFilter && <Filter onFilter={handleFilter} />}
    </div>
  );
};

export default Navbar;

