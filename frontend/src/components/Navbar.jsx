import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-700 text-white p-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold">
        E-Library
      </h1>

      <div className="space-x-5">
        <Link to="/home">Home</Link>

        <Link to="/categories">
          Categories
        </Link>

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/login">Login</Link>

        <Link to="/register">
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;