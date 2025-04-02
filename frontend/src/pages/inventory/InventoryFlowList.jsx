import { useState, useEffect } from "react";
import { fetchInventoryFlows } from "../../services/ServiceInventoryFlow";

const AppLogList = () => {
  const [flows, setFlow] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchInventoryFlows();
        setFlow(response);
      } catch (error) {
        console.error("Error fetching flows:", error);
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
                  <th>Produk ID</th>
                  <th>Tipe</th>
                  <th>Quantity</th>
                  <th>Deskripsi</th>
                </tr>
              </thead>
              <tbody>
                {flows.length > 0 ? (
                  flows.map((data, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{data.productId}</td>
                      <td>{data.type}</td>
                      <td>{data.quantity}</td>
                      <td>{data.description}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center">
                      No flows found.
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
