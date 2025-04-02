import { useState, useEffect } from "react";
import { fetchProducts } from "../../services/ServiceProduct";
import { fetchInventoryFlows } from "../../services/ServiceInventoryFlow";
import { Link } from "react-router-dom";

const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [flows, setFlows] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const getFlows = async () => {
      try {
        const response = await fetchInventoryFlows();
        setFlows(response);
      } catch (error) {
        console.error("Error fetching flows:", error);
      }
    };

    getProducts();
    getFlows();
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <div className="grid grid-flow-col grid-rows-1 gap-4">
            <div className="card max-w-full bg-base-100 card-md shadow-sm">
              <Link to="/products" className="card-body">
                <h1 className="card-title justify-center">Produk</h1>
                <div className="h-px w-full bg-gray-300"></div>
                <h3 className="text-2xl font-semibold text-center">
                  {products.length}
                </h3>
              </Link>
            </div>
            <div className="card max-w-full bg-base-100 card-md shadow-sm">
              <Link to="/inventory-flow" className="card-body">
                <h1 className="card-title justify-center">Flow Produk</h1>
                <div className="h-px w-full bg-gray-300"></div>
                <h3 className="text-2xl font-semibold text-center">
                  {flows.length}
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryPage;
