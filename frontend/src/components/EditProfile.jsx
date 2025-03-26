import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { fetchUserById, updateUser } from "../services/ServiceUser";

const EditProfile = () => {
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, setValue } = useForm();
  const [email, setEmail] = useState(null);
  const { user } = useAuth();
  const id = user?.id;

  useEffect(() => {
    const getUserById = async () => {
      if (!id) return;
      const userDetail = await fetchUserById(id);
      if (userDetail) {
        setValue("name", userDetail.name);
        setValue("phone", userDetail.phone);
        setEmail(userDetail.email);
        setValue("referredBy", userDetail.referredBy);
      }
    };
    getUserById();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateUser(id, data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (error) {
      setError(error.response.data.errors);
    }
  };

  const getErrorMessage = (fieldName) => {
    const errorObj = error.find((err) => err.path === fieldName);
    return errorObj ? errorObj.msg : "";
  };

  return (
    <div className="overflow-x-auto mx-4 my-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-2-xl mx-auto"
      >
        <h2 className="text-lg text-center font-bold">Ubah Biodata</h2>
        {success && (
          <div className="alert alert-success alert-soft">
            <span>Ubah biodata berhasil !</span>
          </div>
        )}
        <table className="table border-collapse border-transparent">
          <tbody className="border-transparent">
            <tr className="border-transparent">
              <td className="font-semibold">Name</td>
              <td>
                <input
                  type="text"
                  className={`input rounded-box  ${
                    getErrorMessage("name")
                      ? "input-error"
                      : "focus:input-primary"
                  } focus:outline-0`}
                  id="name"
                  {...register("name", { required: true })}
                />
                {getErrorMessage("name") && (
                  <div className="text-error">{getErrorMessage("name")}</div>
                )}
              </td>
            </tr>

            <tr className="border-transparent">
              <td className="font-semibold">No HP</td>
              <td>
                <input
                  type="tel"
                  className={`input rounded-box  ${
                    getErrorMessage("phone")
                      ? "input-error"
                      : "focus:input-primary"
                  } focus:outline-0`}
                  id="phone"
                  {...register("phone", { required: true })}
                />
                {getErrorMessage("phone") && (
                  <div className="text-error">{getErrorMessage("phone")}</div>
                )}
              </td>
            </tr>

            <tr className="border-transparent">
              <td className="font-semibold">Email</td>
              <td>{email}</td>
            </tr>

            <tr className="border-transparent">
              <td className="font-semibold">Kode Referal</td>
              <td>
                <input
                  type="text"
                  className={`input rounded-box  ${
                    getErrorMessage("referredBy")
                      ? "input-error"
                      : "focus:input-primary"
                  } focus:outline-0`}
                  id="referredBy"
                  {...register("referredBy", { required: true })}
                />
                {getErrorMessage("referredBy") && (
                  <div className="text-error">
                    {getErrorMessage("referredBy")}
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <button
          type="submit"
          className="btn btn-primary text-white rounded-box mt-4 flex justify-self-center"
        >
          Simpan
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
