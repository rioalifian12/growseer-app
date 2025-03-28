import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { fetchUserById, updateUser } from "../../services/ServiceUser";
import Swal from "sweetalert2";

const EditUser = ({ id, onUserUpdated }) => {
  const [error, setError] = useState([]);
  const { register, handleSubmit, setValue } = useForm();
  const modalRef = useRef(null);

  useEffect(() => {
    const getUserById = async () => {
      const user = await fetchUserById(id);
      if (user) {
        setValue("name", user.name);
        setValue("phone", user.phone);
        setValue("role", user.role);
      }
    };
    getUserById();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const updatedUser = await updateUser(id, data);

      Swal.fire({
        title: "Edit user berhasil!",
        icon: "success",
      });

      onUserUpdated(updatedUser.user);
      modalRef.current.close();
    } catch (error) {
      console.error(
        "Error updating user:",
        error.response?.data || error.message
      );
    }
  };

  const getErrorMessage = (fieldName) => {
    const errorObj = error.find((err) => err.path === fieldName);
    return errorObj ? errorObj.msg : "";
  };

  return (
    <>
      <button
        className="btn btn-warning text-white rounded-box"
        onClick={() => modalRef.current.showModal()}
      >
        Ubah
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
            Ubah
          </h3>
          <div className="modal-action">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
                name="name"
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
                name="phone"
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
                name="role"
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
                onClick={() => modalRef.current.close()}
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

export default EditUser;
