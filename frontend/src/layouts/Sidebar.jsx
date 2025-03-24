import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const { user } = useAuth(); // Dapatkan user dari context

  // **Menu berdasarkan role pengguna**
  const menuItems = {
    superadmin: [
      { path: "/users", label: "👥 Users" },
      { path: "/app-log", label: "📝 App Log" },
      { path: "/categories", label: "📂 Categories" },
    ],
    inventory: [
      { path: "/products", label: "📦 Products" },
      { path: "/inventory-flow", label: "🔄 Inventory Flow" },
    ],
    sales: [
      { path: "/customers", label: "👥 Customers" },
      { path: "/orders", label: "📃 Orders" },
    ],
  };

  // **Ambil menu sesuai role pengguna**
  const role = user?.role || "guest"; // Jika tidak ada user, anggap sebagai "guest"
  const menus = menuItems[role] || [];

  return (
    <div
      className={`h-screen bg-gray-900 text-white transition-all duration-300 
                  ${isOpen ? "w-64 p-5" : "w-0 p-0 overflow-hidden"}`}
    >
      {isOpen && (
        <>
          <h2 className="text-2xl font-bold mb-6 capitalize">
            {role} Dashboard
          </h2>
          <ul>
            {menus.map((menu) => (
              <li
                key={menu.path}
                className={`mb-4 p-2 rounded ${
                  location.pathname === menu.path ? "bg-gray-700" : ""
                }`}
              >
                <Link to={menu.path} className="block">
                  {menu.label}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Sidebar;
