import { Link, useNavigate } from "react-router-dom"
import { toggleTheme } from "../utils/theme"

function Navbar() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">🚗 Parking System</h1>

      <div className="flex items-center gap-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/admin/bookings">Bookings</Link>

        <button onClick={toggleTheme}>🌙</button>

        <button
          onClick={logout}
          className="bg-rose-600 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar
