import { useState } from "react";
import { useNavigate, NavLink } from "react-router";
import { useForm } from "react-hook-form";
import { addRole } from "../../services/ServiceRole";

const RoleAdd = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  const onSubmit = async (role) => {
    try {
      await addRole(role);
      navigate("/role");
    } catch (error) {
      setError(error.response.data.errors);
    }
  };

  const getErrorMessage = (fieldName) => {
    const errorObj = error.find((err) => err.path === fieldName);
    return errorObj ? errorObj.msg : "";
  };

  return (
    <>
      <div className="container mx-auto mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset border border-base-300 p-4 rounded-box">
            <legend className="fieldset-legend text-xl">Add Data Role</legend>

            <label className="block fieldset-label text-sm text-black">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`input ${
                getErrorMessage("name") ? "input-error" : ""
              } text-sm w-full`}
              id="name"
              required
              {...register("name", { required: true })}
            />
            {getErrorMessage("name") && (
              <p className="text-red-500 text-sm mt-1">
                {getErrorMessage("name")}
              </p>
            )}
            <div className="flex gap-4">
              <button className="btn btn-primary w-25 mt-4">Add Role</button>
              <NavLink to="/role" className="btn w-25 mt-4">
                Cancel
              </NavLink>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
};
export default RoleAdd;
