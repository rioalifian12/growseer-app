import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { fetchUserById } from "../services/ServiceUser";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [name, setValueName] = useState({});
  const id = user?.id;

  useEffect(() => {
    const getUserById = async () => {
      if (!id) return;
      const userDetail = await fetchUserById(id);

      if (userDetail) {
        setValueName(userDetail);
      }
    };
    getUserById();
  }, [id, setValueName]);

  return (
    <div className="navbar bg-white border-b-1 border-gray-200">
      <div className="container mx-auto">
        <div className="navbar">
          <div className="navbar-start">
            <Link
              to="/"
              className="text-2xl md:text-3xl pb-2 font-semibold text-primary"
            >
              Growseer
            </Link>
          </div>
          <input
            type="text"
            placeholder="Cari di Growseer"
            className="input input-bordered rounded-box w-full lg:w-full focus:input-primary focus:outline-0 mx-5"
          />
          <div className="navbar-end gap-3">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="10" cy="20.5" r="1" />
                  <circle cx="18" cy="20.5" r="1" />
                  <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" />
                </svg>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-10 mt-3 w-52 shadow"
              >
                <div className="card-body">
                  <span className="text-lg font-bold">8 Produk</span>
                  <span className="text-primary">Subtotal: Rp. 230000</span>
                  <div className="card-actions">
                    <Link
                      to="/cart"
                      className="btn btn-primary btn-block text-white rounded-box"
                    >
                      Lihat Keranjang
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-8 w-px bg-gray-300"></div>

            {/* Tombol Profil atau Login/Register */}
            <div className="hidden lg:flex gap-3">
              {user ? (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="flex cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span className="font-semibold ml-1">{name.name}</span>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                  >
                    <li className="text-black">
                      <Link to="/profile" className="text-sm">
                        Profil
                      </Link>
                    </li>
                    <li>
                      <Link to="/order" className="text-sm">
                        Pesanan Saya
                      </Link>
                    </li>
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
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn btn-outline btn-primary rounded-box hover:text-white"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-primary rounded-box text-white"
                  >
                    Daftar
                  </Link>
                </>
              )}
            </div>

            {/* Menu Mobile */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="cursor-pointer lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </div>
              <div
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-4 w-52 p-5 shadow flex flex-col gap-2"
              >
                {user ? (
                  <ul>
                    <li>
                      <Link to="/profile" className="text-sm">
                        Profil
                      </Link>
                    </li>
                    <li>
                      <Link to="/order" className="text-sm">
                        Pesanan Saya
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={logout}
                        className="text-sm text-error hover:bg-red-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/login"
                      className="btn btn-outline btn-primary rounded-box hover:text-white"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="btn btn-primary rounded-box text-white"
                    >
                      Daftar
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
