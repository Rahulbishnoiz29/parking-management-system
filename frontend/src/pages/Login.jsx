import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../services/api"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await api.post("/auth/login", { email, password })
      localStorage.setItem("token", res.data.token)
      navigate("/dashboard")
    } catch (err) {
      alert(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 animate-fade">
        <h2 className="text-2xl font-bold text-center text-blue-600">
          🚗 Parking System
        </h2>
        <p className="text-center text-slate-500 mt-1">
          Login to your account
        </p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-slate-700 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-slate-700 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
