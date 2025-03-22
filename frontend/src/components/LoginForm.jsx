import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const { login, user } = useAuth();

  if (user) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit(login)} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="input input-bordered w-full"
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
