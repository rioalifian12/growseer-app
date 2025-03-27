import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { createUser } from "../../services/ServiceUser";
import Swal from "sweetalert2";

const AddUser = ({ setUser }) => {
  const [error, setError] = useState([]);
  const { register, handleSubmit } = useForm();
  const modalRef = useRef(null);

  const onSubmit = async (data) => {
    try {
      const newUser = await createUser(data);
      setUser((prevUsers) => [...prevUsers, newUser]);
      Swal.fire({
        title: "Tambah user berhasil!",
        icon: "success",
      });
      modalRef.current.close();
    } catch (error) {
      setError(error.response?.data?.errors || []);
    }
  };

  const getErrorMessage = (fieldName) => {
    const errorObj = error.find((err) => err.path === fieldName);
    return errorObj ? errorObj.msg : "";
  };

  return (
    <>
      <button
        className="btn btn-info text-white rounded-box my-3"
        onClick={() => modalRef.current.showModal()}
      >
        Tambah Admin
      </button>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box max-w-xl">
          <h3 className="font-bold text-lg">
            <button
              className="cursor-pointer flex justify-self-end top-1/2"
              onClick={() => modalRef.current.close()}
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
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            Tambah Admin
          </h3>
          <div className="modal-action">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <label
                htmlFor="email"
                className="fieldset-label font-semibold text-black my-2"
              >
                Email
              </label>
              <input
                type="email"
                className={`input rounded-box w-full ${
                  getErrorMessage("email")
                    ? "input-error"
                    : "focus:input-primary"
                } focus:outline-0`}
                id="email"
                {...register("email", { required: true })}
                placeholder="Email"
              />
              {getErrorMessage("email") && (
                <div className="text-error text-sm">
                  {getErrorMessage("email")}
                </div>
              )}

              <label
                htmlFor="password"
                className="fieldset-label font-semibold text-black my-2"
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
                <div className="text-error text-sm">
                  {getErrorMessage("password")}
                </div>
              )}

              <label
                htmlFor="name"
                className="fieldset-label font-semibold text-black my-2"
              >
                Nama
              </label>
              <input
                type="text"
                className={`input rounded-box w-full ${
                  getErrorMessage("name")
                    ? "input-error"
                    : "focus:input-primary"
                } focus:outline-0`}
                id="name"
                {...register("name", { required: true })}
                placeholder="Name"
              />
              {getErrorMessage("name") && (
                <div className="text-error text-sm">
                  {getErrorMessage("name")}
                </div>
              )}

              <label
                htmlFor="phone"
                className="fieldset-label font-semibold text-black my-2"
              >
                No HP
              </label>
              <input
                type="tel"
                className={`input rounded-box w-full ${
                  getErrorMessage("phone")
                    ? "input-error"
                    : "focus:input-primary"
                } focus:outline-0`}
                id="phone"
                {...register("phone", { required: true })}
                placeholder="No HP"
              />
              {getErrorMessage("phone") && (
                <div className="text-error text-sm">
                  {getErrorMessage("phone")}
                </div>
              )}

              <label
                htmlFor="role"
                className="fieldset-label font-semibold text-black my-2"
              >
                Role
              </label>
              <select
                defaultValue="Pilih Role"
                className={`select rounded-box w-full ${
                  getErrorMessage("role")
                    ? "select-error"
                    : "focus:select-primary"
                } focus:outline-0`}
                id="role"
                {...register("role", { required: true })}
              >
                <option disabled={true}>Pilih Role</option>
                <option value="inventory">Inventory</option>
                <option value="sales">Sales</option>
              </select>
              {getErrorMessage("role") && (
                <div className="text-error text-sm">
                  {getErrorMessage("role")}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary text-white rounded-box mt-4 w-full"
              >
                Simpan
              </button>
            </form>
          </div>
        </div>
        <button
          className="modal-backdrop"
          onClick={() => modalRef.current.close()}
        >
          Close
        </button>
      </dialog>
    </>
  );
};

export default AddUser;
