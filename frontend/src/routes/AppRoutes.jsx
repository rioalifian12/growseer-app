import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Layout from "../layouts/Layout";
import FormLogin from "../components/FormLogin";
import FormRegister from "../components/FormRegister";
import Home from "../pages/Home";
import SuperadminPage from "../pages/superadmin/SuperadminPage";
import InventoryPage from "../pages/inventory/InventoryPage";
import SalesPage from "../pages/sales/SalesPage";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import { useAuth, AuthProvider } from "../context/AuthContext";

const PrivateRoute = ({ children, role, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (role && user.role !== role) return <Navigate to="/" />;

  if (allowedRoles && !allowedRoles.includes(user.role))
    return <Navigate to="/" />;

  return children;
};

const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    if (user.role === "superadmin") return <Navigate to="/superadmin" />;
    if (user.role === "inventory") return <Navigate to="/inventory" />;
    if (user.role === "sales") return <Navigate to="/sales" />;
    return <Navigate to="/" />;
  }

  return children;
};

const AppRoutes = () => {
  const [cart, setCart] = useState([]);
  const addToCart = (product) => setCart([...cart, product]);
  const removeFromCart = (id) => setCart(cart.filter((item) => item.id !== id));

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <FormLogin />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <FormRegister />
              </PublicRoute>
            }
          />

          <Route
            path="/superadmin"
            element={
              <PrivateRoute role="superadmin">
                <Layout>
                  <SuperadminPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/inventory"
            element={
              <PrivateRoute role="inventory">
                <Layout>
                  <InventoryPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/sales"
            element={
              <PrivateRoute role="sales">
                <Layout>
                  <SalesPage />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route path="/" element={<Home />} />

          <Route
            path="/product/:id"
            element={
              <PrivateRoute>
                <ProductDetail addToCart={addToCart} />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart cart={cart} removeFromCart={removeFromCart} />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
