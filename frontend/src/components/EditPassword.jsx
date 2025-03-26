import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { updatePassword } from "../services/ServiceUser";

const EditPassword = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit } = useForm();
  const { user, logout } = useAuth();
  const id = user?.id;

  const onSubmit = async (data) => {
    try {
      await updatePassword(id, data);
      setSuccess(true);
      setError("");
      setTimeout(() => {
        setSuccess(false);
        logout();
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError("Password tidak cocok!");
      }
    }
  };

  return (
    <div className="overflow-x-auto mx-4 my-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-2-xl mx-auto"
      >
        <h2 className="text-lg text-center font-bold">Ubah Password</h2>
        {success && (
          <div className="alert alert-success alert-soft">
            <span>Ubah password berhasil, Silahkan login!</span>
          </div>
        )}
        {error && (
          <div role="alert" className="alert alert-error alert-soft">
            <span>{error}</span>
          </div>
        )}
        <table className="table border-collapse border-transparent">
          <tbody className="border-transparent">
            <tr className="border-transparent">
              <td className="font-semibold">Password Lama</td>
              <td>
                <input
                  type="password"
                  className="input rounded-box focus:input-primary focus:outline-0"
                  id="oldPassword"
                  {...register("oldPassword", { required: true })}
                  required
                />
              </td>
            </tr>

            <tr className="border-transparent">
              <td className="font-semibold">Password Baru</td>
              <td>
                <input
                  type="password"
                  className="input rounded-box focus:input-primary focus:outline-0"
                  id="newPassword"
                  {...register("newPassword", { required: true })}
                  required
                />
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

export default EditPassword;
