import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const FormLogin = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <div className="fieldset w-full">
            <legend className="fieldset-legend text-3xl font-bold mb-7">
              Login
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
            <form onSubmit={handleSubmit(login)} className="space-y-2">
              <label htmlFor="email" className="fieldset-label text-black">
                Email
              </label>
              <input
                type="email"
                className="input rounded-box w-full focus:input-primary focus:outline-0"
                id="email"
                name="email"
                {...register("email", { required: true })}
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
                {...register("password", { required: true })}
                placeholder="Password"
              />

              <button className="btn btn-primary rounded-box mt-4 w-full text-white">
                Login
              </button>

              <p className="fieldset-label text-sm text-black mt-4 justify-center">
                Belum punya akun?
                <Link to="/register" className="text-primary font-medium">
                  Daftar
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormLogin;
