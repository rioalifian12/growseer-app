import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const FormRegister = () => {
  const { register, handleSubmit } = useForm();
  const { signup, login } = useAuth();
  const [error, setError] = useState([]);

  const onSubmit = async (userData) => {
    try {
      await signup(userData);
      await login({ email: userData.email, password: userData.password });
    } catch (error) {
      setError(error.response.data.errors);
    }
  };

  const getErrorMessage = (fieldName) => {
    const errorObj = error.find((err) => err.path === fieldName);
    return errorObj ? errorObj.msg : "";
  };

  return (
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <label htmlFor="email" className="fieldset-label text-black">
              Email
            </label>
            <input
              type="email"
              className={`input rounded-box w-full ${
                getErrorMessage("email") ? "input-error" : "focus:input-primary"
              }  focus:outline-0`}
              id="email"
              {...register("email", { required: true })}
              placeholder="Email"
            />
            {getErrorMessage("email") && (
              <div className="text-error">{getErrorMessage("email")}</div>
            )}

            <label
              htmlFor="password"
              className="fieldset-label text-black mt-2"
            >
              Password
            </label>
            <input
              type="password"
              className={`input rounded-box w-full ${
                getErrorMessage("password")
                  ? "input-error"
                  : "focus:input-primary"
              }  focus:outline-0`}
              id="password"
              {...register("password", { required: true })}
              placeholder="Password"
            />
            {getErrorMessage("password") && (
              <div className="text-error">{getErrorMessage("password")}</div>
            )}

            <label htmlFor="name" className="fieldset-label text-black mt-2">
              Nama
            </label>
            <input
              type="text"
              className={`input rounded-box w-full ${
                getErrorMessage("name") ? "input-error" : "focus:input-primary"
              }  focus:outline-0`}
              id="name"
              {...register("name", { required: true })}
              placeholder="Nama"
            />
            {getErrorMessage("name") && (
              <div className="text-error">{getErrorMessage("name")}</div>
            )}

            <label htmlFor="phone" className="fieldset-label text-black mt-2">
              No HP
            </label>
            <input
              type="tel"
              className={`input rounded-box w-full ${
                getErrorMessage("phone") ? "input-error" : "focus:input-primary"
              }  focus:outline-0`}
              id="phone"
              {...register("phone", { required: true })}
              placeholder="No HP"
            />
            {getErrorMessage("phone") && (
              <div className="text-error">{getErrorMessage("phone")}</div>
            )}

            <label
              htmlFor="referredBy"
              className="fieldset-label text-black mt-2"
            >
              Kode Referal
            </label>
            <input
              type="text"
              className={`input rounded-box w-full ${
                getErrorMessage("referredBy")
                  ? "input-error"
                  : "focus:input-primary"
              }  focus:outline-0`}
              id="referredBy"
              {...register("referredBy", { required: true })}
              placeholder="Kode Referal"
            />
            {getErrorMessage("referredBy") && (
              <div className="text-error">{getErrorMessage("referredBy")}</div>
            )}

            <button
              type="submit"
              className="btn btn-primary rounded-box mt-4 w-full text-white"
            >
              Daftar
            </button>

            <p className="fieldset-label text-sm text-black mt-4 text-center">
              Sudah punya akun?
              <Link to="/login" className="text-primary font-medium">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormRegister;
