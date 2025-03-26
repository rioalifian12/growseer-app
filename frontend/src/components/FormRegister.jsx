import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const FormRegister = () => {
  const { register, handleSubmit } = useForm();
  const { signup, login } = useAuth();
  const [error, setError] = useState([]);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        console.error("Error getting location:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const onSubmit = async (userData) => {
    try {
      const updatedUserData = { ...userData, ...location };
      await signup(updatedUserData);
      await login({ email: userData.email, password: userData.password });
    } catch (error) {
      setError(error.response?.data?.errors || []);
    }
  };

  const getErrorMessage = (fieldName) => {
    const errorObj = error.find((err) => err.path === fieldName);
    return errorObj ? errorObj.msg : "";
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm sm:w-96 md:max-w-md lg:max-w-lg">
        <div className="fieldset w-full">
          <legend className="fieldset-legend text-2xl md:text-3xl font-bold mb-5 text-center">
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <label
              htmlFor="email"
              className="fieldset-label font-semibold text-black"
            >
              Email
            </label>
            <input
              type="email"
              className={`input rounded-box w-full ${
                getErrorMessage("email") ? "input-error" : "focus:input-primary"
              } focus:outline-0`}
              id="email"
              {...register("email", { required: true })}
              placeholder="Email"
            />
            {getErrorMessage("email") && (
              <div className="text-error">{getErrorMessage("email")}</div>
            )}

            <label
              htmlFor="password"
              className="fieldset-label font-semibold text-black mt-2"
            >
              Password
            </label>
            <input
              type="password"
              className={`input rounded-box w-full ${
                getErrorMessage("password")
                  ? "input-error"
                  : "focus:input-primary"
              } focus:outline-0`}
              id="password"
              {...register("password", { required: true })}
              placeholder="Password"
            />
            {getErrorMessage("password") && (
              <div className="text-error">{getErrorMessage("password")}</div>
            )}

            <label
              htmlFor="name"
              className="fieldset-label font-semibold text-black mt-2"
            >
              Nama
            </label>
            <input
              type="text"
              className={`input rounded-box w-full ${
                getErrorMessage("name") ? "input-error" : "focus:input-primary"
              } focus:outline-0`}
              id="name"
              {...register("name", { required: true })}
              placeholder="Nama"
            />
            {getErrorMessage("name") && (
              <div className="text-error">{getErrorMessage("name")}</div>
            )}

            <label
              htmlFor="phone"
              className="fieldset-label font-semibold text-black mt-2"
            >
              No HP
            </label>
            <input
              type="tel"
              className={`input rounded-box w-full ${
                getErrorMessage("phone") ? "input-error" : "focus:input-primary"
              } focus:outline-0`}
              id="phone"
              {...register("phone", { required: true })}
              placeholder="No HP"
            />
            {getErrorMessage("phone") && (
              <div className="text-error">{getErrorMessage("phone")}</div>
            )}

            <label
              htmlFor="address"
              className="fieldset-label font-semibold text-black mt-2"
            >
              Alamat
            </label>
            <input
              type="text"
              className={`input rounded-box w-full ${
                getErrorMessage("address")
                  ? "input-error"
                  : "focus:input-primary"
              } focus:outline-0`}
              id="address"
              {...register("address", { required: true })}
              placeholder="Alamat Lengkap"
            />
            {getErrorMessage("address") && (
              <div className="text-error">{getErrorMessage("address")}</div>
            )}

            <button
              type="button"
              onClick={handleGetLocation}
              className="btn btn-secondary text-white rounded-box mt-4 w-full"
            >
              Ambil Lokasi
            </button>

            {location.latitude && location.longitude ? (
              <div className="mt-4">
                <strong>Lokasi Anda : </strong>
                <iframe
                  src={`https://maps.google.com/maps?q=${location.latitude},${location.longitude}&hl=id&z=14&output=embed`}
                  width="100%"
                  height="200"
                ></iframe>
              </div>
            ) : (
              <p className="text-error mt-4">
                Pastikan koneksi yang digunakan stabil!
              </p>
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
