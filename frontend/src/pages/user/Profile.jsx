import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";
import EditProfile from "../../components/EditProfile";
import EditAddress from "../../components/EditAddress";

const Profile = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <div className="container mx-auto p-4">
          <div className="w-full max-w-xl mx-auto">
            <div className="tabs tabs-border border-gray-200 bg-gray-100 rounded-lg flex flex-wrap justify-center">
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
                Tab content 3
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
