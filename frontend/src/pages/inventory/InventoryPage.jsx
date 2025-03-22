import { useAuth } from "../../context/AuthContext";

const InventoryPage = () => {
  const { user, logout } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Inventory Dashboard</h1>
      <p className="mt-2">
        Halo, {user?.name} ({user?.email})
      </p>
      <button onClick={logout} className="btn btn-error mt-4">
        Logout
      </button>
    </div>
  );
};

export default InventoryPage;
