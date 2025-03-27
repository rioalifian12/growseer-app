import { useState, useEffect } from "react";
import { fetchAppLogs } from "../../services/ServiceAppLog";

const AppLogList = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchAppLogs();
        setLogs(response);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex-grow">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold">App Log List</h1>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th></th>
                  <th>User ID</th>
                  <th>Aksi</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                {logs.length > 0 ? (
                  logs.map((data, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{data.userId}</td>
                      <td>{data.action}</td>
                      <td>{data.details}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center">
                      No logs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLogList;
