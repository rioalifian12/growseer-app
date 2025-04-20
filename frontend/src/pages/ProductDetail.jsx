import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../services/ServiceProduct";

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetchProductById(id);
        setProduct(response);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center text-red-500">Produk tidak ditemukan.</p>;
  }

  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <div className="container mx-auto p-4">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <img
                src={`${API_URL}${product.imageUrl}`}
                alt={product.name}
                className="object-cover w-96 h-w-96"
              />
            </div>

            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <h1 className="text-2xl font-normal mb-2">{product.name}</h1>
                <p className="text-2xl text-primary font-bold">
                  Rp {product.pricePerBox}
                </p>
                <p className="text-gray-600 mt-4">{product.description}</p>

                <div className="flex items-center mt-6 ">
                  <span className="mr-6 font-normal">Satuan</span>
                  <select
                    defaultValue="Pilih"
                    className="select w-full rounded-box focus:input-primary focus:outline-0"
                  >
                    <option disabled={true}>Pilih</option>
                    <option>Kardus</option>
                    <option>Box</option>
                  </select>
                </div>

                <div className="flex items-center mt-6">
                  <span className="mr-6 font-normal">Jumlah</span>
                  <div className="flex items-center border border-gray-300 rounded-box overflow-hidden h-10">
                    <button
                      onClick={decreaseQuantity}
                      className="btn w-10 h-10 content-start text-xl font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      readOnly
                      value={quantity}
                      className="w-12 h-10 content-center text-center border-x border-gray-300 focus:outline-none"
                    />
                    <button
                      onClick={increaseQuantity}
                      className="btn w-10 h-10 content-end text-xl font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button className="btn btn-primary text-white mt-8 py-3 rounded-box">
                Tambah ke Keranjang
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
