import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { fetchUserById, updateUser } from "../services/ServiceUser";

const EditAddress = () => {
  const [error, setError] = useState([]);
  const { register, handleSubmit, setValue } = useForm();
  const [userAddress, setValueAddress] = useState({});
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const { user } = useAuth();
  const id = user?.id;
  const modalRef = useRef(null);

  useEffect(() => {
    const getUserById = async () => {
      if (!id) return;
      const userDetail = await fetchUserById(id);
      if (userDetail) {
        setValue("address", userDetail.address);
        setValueAddress(userDetail);
      }
    };
    getUserById();
  }, [id, setValue]);

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        };
        setLocation(newLocation);
        setValueAddress((prev) => ({
          ...prev,
          latitude: newLocation.latitude,
          longitude: newLocation.longitude,
        }));
      },
      (error) => {
        console.error("Error getting location:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const onSubmit = async (data) => {
    try {
      const updatedData = {
        ...data,
        latitude: userAddress.latitude,
        longitude: userAddress.longitude,
      };

      await updateUser(id, updatedData);
      const updatedUser = await fetchUserById(id);
      setValue("address", updatedUser.address);
      setValueAddress(updatedUser);

      modalRef.current.close();
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
      <div className="overflow-x-auto mx-4 my-4">
        <h2 className="text-lg text-center font-bold">Alamat Saya</h2>
        <div className="card card-border border-primary overflow-x-auto mx-4 my-4">
          <div className="card-body">
            <div className="badge badge-soft badge-primary font-semibold">
              Toko
            </div>
            <h2 className="card-title">{userAddress.name}</h2>
            <p>{userAddress.phone}</p>
            <p className="mb-4">{userAddress.address}</p>
            <iframe
              src={`https://maps.google.com/maps?q=${userAddress.latitude},${userAddress.longitude}&hl=id&z=14&output=embed`}
              width="100%"
              height="200"
            ></iframe>
            <div className="card-actions justify-center">
              <button
                className="btn btn-primary text-white rounded-box mt-4"
                onClick={() => modalRef.current.showModal()}
              >
                Ubah
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
                    Ubah Alamat
                  </h3>
                  <div className="modal-action">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                      <label
                        htmlFor="address"
                        className="fieldset-label font-semibold text-black my-2"
                      >
                        Alamat
                      </label>
                      <input
                        type="text"
                        className={`input rounded-box w-full ${
                          getErrorMessage("address")
                            ? "input-error"
                            : "focus:input-primary"
                        } focus:outline-0`}
                        id="address"
                        {...register("address", { required: true })}
                        placeholder="Alamat Lengkap"
                      />
                      {getErrorMessage("address") && (
                        <div className="text-error">
                          {getErrorMessage("address")}
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={handleGetLocation}
                        className="btn btn-secondary text-white rounded-box mt-4 w-full"
                      >
                        Ambil Lokasi
                      </button>

                      {location.latitude && location.longitude ? (
                        <div className="mt-4">
                          <strong>Lokasi Anda : </strong>
                          <iframe
                            src={`https://maps.google.com/maps?q=${location.latitude},${location.longitude}&hl=id&z=14&output=embed`}
                            width="100%"
                            height="200"
                          ></iframe>
                        </div>
                      ) : (
                        <p className="text-error mt-4">
                          Pastikan koneksi yang digunakan stabil!
                        </p>
                      )}

                      <button
                        type="submit"
                        className="btn btn-primary text-white rounded-box mt-4 w-full"
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAddress;
