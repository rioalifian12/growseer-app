import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { createProduct } from "../../services/ServiceProduct";
import Swal from "sweetalert2";

const AddProduct = ({ onProductAdded }) => {
  const [error, setError] = useState([]);
  const { register, handleSubmit } = useForm();
  const modalRef = useRef(null);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("pricePerCarton", data.pricePerCarton);
      formData.append("pricePerBox", data.pricePerBox);
      formData.append("boxPerCarton", data.boxPerCarton);
      formData.append("stockCarton", data.stockCarton);
      formData.append("description", data.description);
      formData.append("imageUrl", data.imageUrl[0]);

      const newProduct = await createProduct(formData);
      Swal.fire({
        title: "Tambah produk berhasil!",
        icon: "success",
      });

      onProductAdded(newProduct.product);
    } catch (error) {
      setError(error.response?.data?.errors || []);
    }
  };

  const getErrorMessage = (fieldName) => {
    const errorObj = error.find((err) => err.path === fieldName);
    return errorObj ? errorObj.msg : "";
  };

  return (
    <>
      <button
        className="btn btn-info text-white rounded-box my-3"
        onClick={() => modalRef.current.showModal()}
      >
        Tambah
      </button>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box max-w-xl">
          <h3 className="font-bold text-lg">
            <button
              className="cursor-pointer flex justify-self-end top-1/2"
              onClick={() => modalRef.current.close()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            Tambah
          </h3>
          <div className="modal-action">
            <form
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
              className="w-full"
            >
              <label className="fieldset-label font-semibold text-black my-2">
                Nama
              </label>
              <input
                type="text"
                className={`input rounded-box w-full ${
                  getErrorMessage("name")
                    ? "input-error"
                    : "focus:input-primary"
                } focus:outline-0`}
                {...register("name", { required: true })}
                placeholder="Nama"
              />
              {getErrorMessage("name") && (
                <div className="text-error text-sm">
                  {getErrorMessage("name")}
                </div>
              )}

              <label className="fieldset-label font-semibold text-black my-2">
                Harga Per Kardus
              </label>
              <input
                type="text"
                className={`input rounded-box w-full ${
                  getErrorMessage("pricePerCarton")
                    ? "input-error"
                    : "focus:input-primary"
                } focus:outline-0`}
                {...register("pricePerCarton", { required: true })}
                placeholder="Harga Per Kardus"
              />
              {getErrorMessage("pricePerCarton") && (
                <div className="text-error text-sm">
                  {getErrorMessage("pricePerCarton")}
                </div>
              )}

              <label className="fieldset-label font-semibold text-black my-2">
                Harga Per Box
              </label>
              <input
                type="text"
                className={`input rounded-box w-full ${
                  getErrorMessage("pricePerBox")
                    ? "input-error"
                    : "focus:input-primary"
                } focus:outline-0`}
                {...register("pricePerBox", { required: true })}
                placeholder="Harga Per Box"
              />
              {getErrorMessage("pricePerBox") && (
                <div className="text-error text-sm">
                  {getErrorMessage("pricePerBox")}
                </div>
              )}

              <label className="fieldset-label font-semibold text-black my-2">
                Box Per Kardus
              </label>
              <input
                type="text"
                className={`input rounded-box w-full ${
                  getErrorMessage("boxPerCarton")
                    ? "input-error"
                    : "focus:input-primary"
                } focus:outline-0`}
                {...register("boxPerCarton", { required: true })}
                placeholder="Box Per Kardus"
              />
              {getErrorMessage("boxPerCarton") && (
                <div className="text-error text-sm">
                  {getErrorMessage("boxPerCarton")}
                </div>
              )}

              <label className="fieldset-label font-semibold text-black my-2">
                Stok
              </label>
              <input
                type="text"
                className={`input rounded-box w-full ${
                  getErrorMessage("stockCarton")
                    ? "input-error"
                    : "focus:input-primary"
                } focus:outline-0`}
                {...register("stockCarton", { required: true })}
                placeholder="Stok"
              />
              {getErrorMessage("stockCarton") && (
                <div className="text-error text-sm">
                  {getErrorMessage("stockCarton")}
                </div>
              )}

              <label className="fieldset-label font-semibold text-black my-2">
                Deksripsi
              </label>
              <textarea
                type="text"
                className={`textarea rounded-box w-full ${
                  getErrorMessage("description")
                    ? "textarea-error"
                    : "focus:textarea-primary"
                } focus:outline-0`}
                {...register("description", { required: true })}
                placeholder="Deskripsi"
              ></textarea>
              {getErrorMessage("description") && (
                <div className="text-error text-sm">
                  {getErrorMessage("description")}
                </div>
              )}

              <label className="fieldset-label font-semibold text-black my-2">
                Gambar
              </label>
              <input
                type="file"
                className={`file-input rounded-box w-full ${
                  getErrorMessage("imageUrl")
                    ? "input-error"
                    : "focus:input-primary"
                } focus:outline-0`}
                {...register("imageUrl")}
              />
              {getErrorMessage("imageUrl") && (
                <div className="text-error text-sm">
                  {getErrorMessage("imageUrl")}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary text-white rounded-box mt-4 w-full"
                onClick={() => modalRef.current.close()}
              >
                Simpan
              </button>
            </form>
          </div>
        </div>
        <button
          className="modal-backdrop"
          onClick={() => modalRef.current.close()}
        >
          Close
        </button>
      </dialog>
    </>
  );
};

export default AddProduct;
