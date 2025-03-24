import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import { useState, useEffect } from "react";
import { fetchProducts } from "../services/ServiceProduct";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold text-center mb-6">Produk Kami</h1>

          {loading ? (
            <span className="loading loading-spinner loading-xl flex justify-self-center"></span>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {products.length > 0 ? (
                products.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="card bg-base-100 shadow-sm border-1 border-gray-100 cursor-pointer"
                  >
                    <figure>
                      <img
                        src={`${API_URL}${product.imageUrl}`}
                        alt={product.name}
                        className="w-full h-65 object-cover"
                      />
                    </figure>
                    <div className="card-body p-4">
                      <h1 className="card-title font-normal">{product.name}</h1>
                      <p className="text-primary text-lg font-bold">
                        Rp. {product.pricePerBox}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center col-span-5 text-gray-500">
                  Produk tidak ditemukan.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
