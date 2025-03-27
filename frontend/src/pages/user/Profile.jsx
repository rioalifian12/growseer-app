import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";
import EditProfile from "../../components/EditProfile";
import EditAddress from "../../components/EditAddress";
import EditPassword from "../../components/EditPassword";

const Profile = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <div className="container mx-auto p-4">
          <div className="w-full max-w-5xl mx-auto">
            <div className="tabs tabs-border bg-gray-100 rounded-lg flex flex-wrap justify-center">
              <input
                type="radio"
                name="my_tabs"
                className="tab font-bold w-1/3"
                aria-label="Biodata"
                defaultChecked
              />
              <div className="tab-content border-base-300 bg-base-100 p-2">
                <EditProfile />
              </div>

              <input
                type="radio"
                name="my_tabs"
                className="tab font-bold w-1/3"
                aria-label="Alamat"
              />
              <div className="tab-content border-base-300 bg-base-100 p-2">
                <EditAddress />
              </div>

              <input
                type="radio"
                name="my_tabs"
                className="tab font-bold w-1/3"
                aria-label="Password"
              />
              <div className="tab-content border-base-300 bg-base-100 p-2">
                <EditPassword />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
