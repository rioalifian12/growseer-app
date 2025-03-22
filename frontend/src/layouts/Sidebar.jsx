import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const location = useLocation(); // Untuk mendapatkan path saat ini

  return (
    <div
      className={`h-screen bg-gray-900 text-white p-5 transition-all duration-300 ${
        isOpen ? "w-64" : "w-0 overflow-hidden"
      }`}
    >
      {isOpen && (
        <>
          <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
          <ul>
            <li
              className={`mb-4 p-2 rounded ${
                location.pathname === "/superadmin" ? "bg-gray-700" : ""
              }`}
            >
              <Link to="/superadmin" className="block">
                🏠 Dashboard
              </Link>
            </li>
            <li
              className={`mb-4 p-2 rounded ${
                location.pathname === "/users" ? "bg-gray-700" : ""
              }`}
            >
              <Link to="/users" className="block">
                👥 Users
              </Link>
            </li>
            <li
              className={`mb-4 p-2 rounded ${
                location.pathname === "/categories" ? "bg-gray-700" : ""
              }`}
            >
              <Link to="/categories" className="block">
                📂 Categories
              </Link>
            </li>
            <li
              className={`mb-4 p-2 rounded ${
                location.pathname === "/app-log" ? "bg-gray-700" : ""
              }`}
            >
              <Link to="/app-log" className="block">
                📝 App Log
              </Link>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default Sidebar;
