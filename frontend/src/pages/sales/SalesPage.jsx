import { useState, useEffect } from "react";
import { fetchCustomers } from "../../services/ServiceSales";
import { Link } from "react-router-dom";

const SalesPage = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const response = await fetchCustomers();

        setCustomers(response);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    getCustomers();
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <div className="grid grid-flow-col grid-rows-1 gap-4">
            <div className="card max-w-full bg-base-100 card-md shadow-sm">
              <Link to="/customers" className="card-body">
                <h1 className="card-title justify-center">Customer</h1>
                <div className="h-px w-full bg-gray-300"></div>
                <h3 className="text-2xl font-semibold text-center">
                  {customers.length}
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesPage;
