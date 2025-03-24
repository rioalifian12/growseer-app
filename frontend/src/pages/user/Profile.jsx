import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";
import EditProfile from "../../components/EditProfile";

const Profile = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold text-center mb-6">Profil</h1>
          <div className="tabs tabs-border border-1 w-1/2 border-gray-100 rounded-lg flex justify-self-center">
            <input
              type="radio"
              name="my_tabs"
              className="tab font-bold focus:text-primary hover:text-primary"
              aria-label="Profil Saya"
              defaultChecked
            />
            <div className="tab-content border-base-300 bg-base-100 p-2">
              <EditProfile />
            </div>

            <input
              type="radio"
              name="my_tabs"
              className="tab font-bold focus:text-primary hover:text-primary"
              aria-label="Ubah Alamat"
            />
            <div className="tab-content border-base-300 bg-base-100 p-10">
              Tab content 2
            </div>

            <input
              type="radio"
              name="my_tabs"
              className="tab font-bold focus:text-primary hover:text-primary"
              aria-label="Ubah Password"
            />
            <div className="tab-content border-base-300 bg-base-100 p-10">
              Tab content 3
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
