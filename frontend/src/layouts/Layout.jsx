import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} />

      <div className="flex flex-col flex-grow">
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex-grow p-4 bg-gray-100 h-[calc(100vh-74px)] overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
