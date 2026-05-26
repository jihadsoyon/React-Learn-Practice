import { ShoppingCart } from "lucide-react";

const Navbar = ({ cartCount }) => {
  return (
    <nav className="navbar bg-white shadow-sm px-6 md:px-16 sticky top-0 z-50">
      <div className="navbar-start">
        <a className="text-2xl font-bold text-violet-600">DigiTools</a>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 text-sm font-medium text-gray-600">
          <li><a className="hover:text-violet-600">Products</a></li>
          <li><a className="hover:text-violet-600">Features</a></li>
          <li><a className="hover:text-violet-600">Pricing</a></li>
          <li><a className="hover:text-violet-600">Testimonials</a></li>
          <li><a className="hover:text-violet-600">FAQ</a></li>
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-3">
        {/* Cart Icon */}
        <div className="indicator cursor-pointer">
          <ShoppingCart className="text-gray-600 w-6 h-6" />
          {cartCount > 0 && (
            <span className="badge badge-xs badge-primary indicator-item bg-violet-600 text-white border-none">
              {cartCount}
            </span>
          )}
        </div>

       <a className="text-sm text-gray-800 hidden cursor-pointer md:flex">Login</a>
        <a className="btn bg-violet-600 hover:bg-violet-700 text-white btn-sm rounded-full px-5">
          Get Started
        </a>

        {/* Mobile Menu */}
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
            <li><a>Products</a></li>
            <li><a>Features</a></li>
            <li><a>Pricing</a></li>
            <li><a>Testimonials</a></li>
            <li><a>FAQ</a></li>
            <li><a>Login</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;