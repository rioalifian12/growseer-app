import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Konten utama */}
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Konten halaman */}
        <div className="flex-grow p-4 bg-gray-100">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
