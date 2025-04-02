import { useState, useEffect } from "react";
import { fetchProducts, deleteProduct } from "../../services/ServiceProduct";
import AddProduct from "../../components/inventory/AddProduct";
import EditProduct from "../../components/inventory/EditProduct";
import Swal from "sweetalert2";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetchProducts();
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleProductAdded = (newProduct) => {
    setProducts((prevProduct) => [...prevProduct, newProduct]);
  };

  const handleProductUpdated = (updatedProduct) => {
    setProducts((prevProduct) =>
      prevProduct.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Apakah anda yakin?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#422ad5",
        cancelButtonColor: "#f43098",
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        await deleteProduct(id);
        await getProducts();
        Swal.fire({
          title: "Hapus produk berhasil!",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex-grow">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold">Produk List</h1>
          <AddProduct onProductAdded={handleProductAdded} />
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th></th>
                  <th>Nama</th>
                  <th>Harga Per Karton</th>
                  <th>Harga Per Box</th>
                  <th>Isi Per Karton</th>
                  <th>Stok</th>
                  <th>Satuan</th>
                  <th>Deskripsi</th>
                  <th>Gambar</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((data, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{data.name}</td>
                      <td>{data.pricePerCarton}</td>
                      <td>{data.pricePerBox}</td>
                      <td>{data.boxPerCarton}</td>
                      <td>{data.stockCarton}</td>
                      <td>{data.unitType}</td>
                      <td>{data.description}</td>
                      <td>{data.imageUrl ? data.imageUrl : "-"}</td>
                      <td className="flex gap-1">
                        <EditProduct
                          id={data.id}
                          onProductUpdated={handleProductUpdated}
                        />
                        <button
                          className="btn btn-error text-white rounded-box"
                          onClick={() => handleDelete(data.id)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center">
                      No products found.
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

export default ProductList;
