import { Link } from "react-router-dom";
const FormRegister = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <div className="fieldset w-full">
            <legend className="fieldset-legend text-3xl font-bold mb-7">
              Daftar
              <Link to="/" className="cursor-pointer">
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
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </Link>
            </legend>

            <form className="space-y-2">
              <label htmlFor="email" className="fieldset-label text-black">
                Email
              </label>
              <input
                type="email"
                className="input rounded-box w-full focus:input-primary focus:outline-0"
                id="email"
                name="email"
                placeholder="Email"
              />

              <label
                htmlFor="password"
                className="fieldset-label text-black mt-2"
              >
                Password
              </label>
              <input
                type="password"
                className="input rounded-box w-full focus:input-primary focus:outline-0"
                id="password"
                name="password"
                placeholder="Password"
              />

              <button className="btn btn-primary rounded-box mt-4 w-full text-white">
                Daftar
              </button>
              <p className="fieldset-label text-sm text-black mt-4 justify-center">
                Sudah punya akun Growseer?
                <Link to="/login" className="text-primary font-medium">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormRegister;
