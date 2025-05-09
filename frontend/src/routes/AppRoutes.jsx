import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "../layouts/Layout";
import FormLogin from "../components/FormLogin";
import FormRegister from "../components/FormRegister";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";

import Profile from "../pages/user/Profile";
import Order from "../pages/user/Order";

import SuperadminPage from "../pages/superadmin/SuperadminPage";
import UserList from "../pages/superadmin/UserList";
import AppLogList from "../pages/superadmin/AppLogList";

import InventoryPage from "../pages/inventory/InventoryPage";
import ProductList from "../pages/inventory/ProductList";
import InventoryFlowList from "../pages/inventory/InventoryFlowList";

import SalesPage from "../pages/sales/SalesPage";
import CustomerList from "../pages/sales/CustomerList";

import { AuthProvider } from "../context/AuthContext";

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<FormLogin />} />
          <Route path="/register" element={<FormRegister />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/order" element={<Order />} />

          <Route
            path="/superadmin"
            element={
              <Layout>
                <SuperadminPage />
              </Layout>
            }
          />
          <Route
            path="/users"
            element={
              <Layout>
                <UserList />
              </Layout>
            }
          />
          <Route
            path="/app-log"
            element={
              <Layout>
                <AppLogList />
              </Layout>
            }
          />

          <Route
            path="/inventory"
            element={
              <Layout>
                <InventoryPage />
              </Layout>
            }
          />
          <Route
            path="/products"
            element={
              <Layout>
                <ProductList />
              </Layout>
            }
          />
          <Route
            path="/inventory-flow"
            element={
              <Layout>
                <InventoryFlowList />
              </Layout>
            }
          />

          <Route
            path="/sales"
            element={
              <Layout>
                <SalesPage />
              </Layout>
            }
          />
          <Route
            path="/customers"
            element={
              <Layout>
                <CustomerList />
              </Layout>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
