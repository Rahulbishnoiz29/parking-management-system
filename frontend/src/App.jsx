import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import AdminDashboard from "./pages/AdminDashboard"
import AdminBookings from "./pages/AdminBookings"

import PrivateRoute from "./routes/PrivateRoute"
import AdminRoute from "./routes/AdminRoute"

function App() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/bookings"
            element={
              <AdminRoute>
                <AdminBookings />
              </AdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
