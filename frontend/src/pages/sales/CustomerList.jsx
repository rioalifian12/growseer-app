import { useState, useEffect } from "react";
import { fetchCustomers } from "../../services/ServiceSales";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    try {
      const response = await fetchCustomers();
      setCustomers(response);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex-grow">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold">Customer List</h1>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th></th>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>No HP</th>
                  <th>Alamat</th>
                  <th>Maps</th>
                </tr>
              </thead>
              <tbody>
                {customers.length > 0 ? (
                  customers.map((data, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.phone}</td>
                      <td>{data.address ? data.address : "-"}</td>
                      <td>{data.mapsUrl ? data.mapsUrl : "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center">
                      No customers found.
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

export default CustomerList;
