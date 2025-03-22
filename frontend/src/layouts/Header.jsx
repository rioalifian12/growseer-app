import { useAuth } from "../context/AuthContext";

const Header = ({ toggleSidebar }) => {
  const { logout } = useAuth();

  return (
    <div className="flex justify-between items-center bg-primary text-white p-4">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="mr-4 p-2 bg-ghost rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 3v18" />
          </svg>
        </button>
      </div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
            <circle cx="12" cy="10" r="3" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
        >
          <li>
            <button
              onClick={logout}
              className="text-sm text-error hover:bg-red-100"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
