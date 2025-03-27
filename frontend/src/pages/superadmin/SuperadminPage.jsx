import { useState, useEffect } from "react";
import { fetchUsers } from "../../services/ServiceUser";
import { fetchAppLogs } from "../../services/ServiceAppLog";
import { Link } from "react-router-dom";

const SuperadminPage = () => {
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const getLogs = async () => {
      try {
        const response = await fetchAppLogs();
        setLogs(response);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    getUsers();
    getLogs();
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <div className="grid grid-flow-col grid-rows-1 gap-4">
            <div className="card max-w-full bg-base-100 card-md shadow-sm">
              <Link to="/users" className="card-body">
                <h1 className="card-title justify-center">User</h1>
                <div className="h-px w-full bg-gray-300"></div>
                <h3 className="text-2xl font-semibold text-center">
                  {users.length}
                </h3>
              </Link>
            </div>
            <div className="card max-w-full bg-base-100 card-md shadow-sm">
              <Link to="/app-log" className="card-body">
                <h1 className="card-title justify-center">App Log</h1>
                <div className="h-px w-full bg-gray-300"></div>
                <h3 className="text-2xl font-semibold text-center">
                  {logs.length}
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperadminPage;
