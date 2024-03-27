import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">My Website</span>
            </div>
            <div className="flex items-center flex-grow">
                <div className="text-sm flex-grow">
                    <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4">
                        Home
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;