import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";

const Order = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <div className="container mx-auto p-4">
            <div className="overflow-x-auto">
              <div className="w-full max-w-5xl mx-auto">
                <div
                  tabIndex={0}
                  className="collapse collapse-arrow bg-base-100 border-base-300 border mb-2"
                >
                  <div className="collapse-title">
                    <div className="grid grid-flow-col grid-rows-1 gap-4">
                      <div>26/03/2025</div>
                      <div>asdjl0923=23</div>
                      <div>Rp. 85000</div>
                      <div>
                        <div className="badge badge-soft badge-warning">
                          Proses
                        </div>
                        <div className="badge badge-soft badge-success">
                          Kirim
                        </div>
                        <div className="badge badge-soft badge-info">
                          Selesai
                        </div>
                        <div className="badge badge-soft badge-error">
                          Batal
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="collapse-content text-sm border-t-1 border-gray-100">
                    <div className="grid grid-flow-col grid-rows-1 mt-4">
                      <div className="flex items-center gap-2">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          alt="Avatar Tailwind CSS Component"
                          className="rounded-box"
                        />
                        <p className="font-bold">Beng beng chocolate</p>
                      </div>
                      <div className="flex items-center">3</div>
                      <div className="flex items-center">Box</div>
                      <div className="flex items-center">Rp. 85000</div>
                    </div>
                    <div className="grid grid-flow-col grid-rows-1 mt-4">
                      <div className="flex items-center gap-2">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          alt="Avatar Tailwind CSS Component"
                          className="rounded-box"
                        />
                        <p className="font-bold">Beng beng</p>
                      </div>
                      <div className="flex items-center">3</div>
                      <div className="flex items-center">Box</div>
                      <div className="flex items-center">Rp. 85000</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Order;
