import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = {
    superadmin: [
      { path: "/superadmin", label: "Dashboard" },
      { path: "/users", label: "Users" },
      { path: "/app-log", label: "App Log" },
    ],
    inventory: [
      { path: "/products", label: "Products" },
      { path: "/inventory-flow", label: "Inventory Flow" },
    ],
    sales: [
      { path: "/customers", label: "Customers" },
      { path: "/orders", label: "Orders" },
    ],
  };

  const role = user?.role;
  const menus = menuItems[role] || [];

  return (
    <div
      className={`h-screen bg-gray-900 text-white transition-all duration-300 
                  ${isOpen ? "w-64 p-5" : "w-0 p-0 overflow-hidden"}`}
    >
      {isOpen && (
        <>
          <h2 className="text-2xl font-bold mb-6 capitalize">Growseer</h2>
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
