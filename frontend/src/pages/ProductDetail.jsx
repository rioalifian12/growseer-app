import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../services/ServiceProduct";
const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center text-red-500">Produk tidak ditemukan.</p>;
  }

  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={`${API_URL}${product.imageUrl}`}
          alt={product.name}
          className="w-full"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl text-primary font-semibold">
            Rp {product.pricePerBox}
          </p>
          <p className="text-gray-600 mt-4">{product.description}</p>
          <button
            className="btn btn-primary mt-6"
            onClick={() => addToCart(product)}
          >
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
