import { useEffect, useState } from "react"
import api from "../services/api"
import Navbar from "../components/Navbar"

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalSlots: 0,
    availableSlots: 0,
    occupiedSlots: 0
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await api.get("/parking/stats")
      setStats(res.data)
    } catch {
      alert("Failed to load dashboard stats")
    }
  }

  return (
    <>
      <Navbar />

      <div className="p-6 bg-slate-100 dark:bg-slate-900 min-h-screen text-slate-900 dark:text-white">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="p-6 rounded bg-white dark:bg-slate-800 shadow">
            <p className="text-sm text-slate-500">Total Slots</p>
            <p className="text-3xl font-bold">{stats.totalSlots}</p>
          </div>

          <div className="p-6 rounded bg-white dark:bg-slate-800 shadow">
            <p className="text-sm text-slate-500">Available Slots</p>
            <p className="text-3xl font-bold text-green-600">
              {stats.availableSlots}
            </p>
          </div>

          <div className="p-6 rounded bg-white dark:bg-slate-800 shadow">
            <p className="text-sm text-slate-500">Occupied Slots</p>
            <p className="text-3xl font-bold text-rose-600">
              {stats.occupiedSlots}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard
