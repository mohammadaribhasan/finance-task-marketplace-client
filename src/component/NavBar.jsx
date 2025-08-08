import React, { useContext, useState, useRef } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { valueConText } from '../rootlayout/RootLayout';

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, handleLogOut } = useContext(valueConText);

    const [isMainDropdownOpen, setMainDropdownOpen] = useState(false);
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const timeoutRef = useRef(null);

    const toggleMainDropdown = () => setMainDropdownOpen(prev => !prev);
    const toggleProfileDropdown = () => setProfileDropdownOpen(prev => !prev);

    const handleProfileMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setProfileDropdownOpen(true);
    };
    const handleProfileMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setProfileDropdownOpen(false), 300);
    };

    const handleLogOutAndRedirect = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!',
        }).then((result) => {
            if (result.isConfirmed) {
                handleLogOut();
                navigate('/');
                Swal.fire('Logged out!', 'You have been logged out.', 'success');
            }
        });
    };

    const navLinkClasses = ({ isActive }) =>
        `text-lg font-medium ${isActive
            ? 'text-purple-500 underline'
            : 'text-foreground dark:text-foreground-dark'
        }`;

    const navItems = (
        <>
            <li><NavLink to="/" className={navLinkClasses}>Home</NavLink></li>
            <li><NavLink to="/addTask" className={navLinkClasses}>Add Task</NavLink></li>
            <li><NavLink to="/browseTasks" className={navLinkClasses}>Browse Tasks</NavLink></li>
            <li><NavLink to="/myPostedTasks" className={navLinkClasses}>My Posted Tasks</NavLink></li>
        </>
    );

    const toggleTheme = () => {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        html.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
    };
    console.log(user)

    return (
        <div className="navbar max-w-screen-2xl mx-auto pr-8 pl-4 md:px-12 lg:px-16 xl:px-24 
            sticky top-0 z-50 bg-base-700 bg-background dark:bg-background-dark backdrop-blur-md">
            <div className="navbar-start flex items-center">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navItems}
                    </ul>
                </div>
                <NavLink to="/" className="text-3xl flex items-center gap-1 ml-2 lg:ml-0">
                    <span className="font-medium bg-gradient-to-r from-blue-300 to-gray-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-gray-300">
                        TaskCrowd
                    </span>
                </NavLink>
            </div>

            <div className="hidden lg:flex navbar-center">
                <ul className="menu menu-horizontal px-1">{navItems}</ul>
            </div>

            <div className="navbar-end flex items-center gap-4 relative">
                {isMainDropdownOpen && (
                    <div className="absolute top-14 left-4 bg-background rounded shadow-lg w-52 p-3 z-30 dark:bg-background-dark">
                        <ul className="flex flex-col gap-2">{navItems}</ul>
                    </div>
                )}

                <label className="swap swap-rotate">
                    <input type="checkbox" onChange={toggleTheme} />
                    <svg className="swap-on fill-current w-7 h-7 text-foreground dark:text-foreground-dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M5.64 17.66l-1.41 1.41 1.06 1.06 1.41-1.41-1.06-1.06zm12.02-12.02l1.41-1.41-1.06-1.06-1.41 1.41 1.06 1.06zM12 4V1h-1v3h1zm0 19v-3h-1v3h1zm8.66-11h3v-1h-3v1zm-19 0v-1h-3v1h3zm15.36 7.66l1.41 1.41 1.06-1.06-1.41-1.41-1.06 1.06zM4.34 6.34L2.93 4.93 1.87 6l1.41 1.41 1.06-1.06zM12 7a5 5 0 100 10 5 5 0 000-10z" />
                    </svg>
                    <svg className="swap-off fill-current w-7 h-7 text-foreground dark:text-foreground-dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M21.64 13.36A9 9 0 1110.64 2.36a7 7 0 1011 11z" />
                    </svg>
                </label>


                {user ? (
                    <div className="relative" onMouseEnter={handleProfileMouseEnter} onMouseLeave={handleProfileMouseLeave}>
                        <button onClick={toggleProfileDropdown} className="focus:outline-none" aria-label="Toggle profile menu">
                            <img
                                className={`w-10 h-10 cursor-pointer object-cover rounded-full border-2 transition-all duration-300 ${location.pathname === '/profile'
                                    ? 'border-purple-500 ring-2 ring-purple-300'
                                    : 'border-border dark:border-border-dark'
                                    }`}
                                src={user.photoURL}
                                alt="Profile"
                            />
                        </button>

                        {isProfileDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-gradient-to-r from-blue-300 to-gray-900 rounded shadow-lg text-center z-40 p-4 dark:from-blue-700 dark:to-gray-800">
                                <p className="font-semibold mb-3 text-foreground dark:text-foreground-dark">
                                    {user.displayName || 'User'}
                                </p>
                                <button
                                    onClick={handleLogOutAndRedirect}
                                    className="mx-auto block px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded hover:bg-red-700 dark:hover:bg-red-800 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="gap-3 flex">
                        <Link to="/login" className="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500">
                            <span className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
                            <span className="absolute bottom-0 right-0 w-64 h-64 mb-32 mr-4 transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 transition duration-500 group-hover:rotate-90"></span>
                            <span className="relative">Login</span>
                        </Link>
                        <Link to="/registration" className="hidden sm:inline-flex relative items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500">
                            <span className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
                            <span className="absolute bottom-0 right-0 w-64 h-64 mb-32 mr-4 transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 transition duration-500 group-hover:rotate-90"></span>
                            <span className="relative">Registration</span>
                        </Link>

                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;


<div className="navbar bg-base-100 shadow-sm">
    <div className="navbar-start">

        <a className="btn btn-ghost text-xl">daisyUI</a>
    </div>
    <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
            <li><a>Item 1</a></li>
            <li>
                <details>
                    <summary>Parent</summary>
                    <ul className="p-2">
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                    </ul>
                </details>
            </li>
            <li><a>Item 3</a></li>
        </ul>
    </div>
    <div className="navbar-end">
        <a className="btn">Button</a>
    </div>
</div>