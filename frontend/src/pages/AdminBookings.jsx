import { useEffect, useState } from "react"
import api from "../services/api"
import Navbar from "../components/Navbar"

function AdminBookings() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    const res = await api.get("/parking/bookings")
    setBookings(res.data)
  }

  return (
    <>
      <Navbar />

      <div className="p-6 bg-slate-100 dark:bg-slate-900 min-h-screen">
        <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
          Admin Bookings
        </h2>

        <table className="w-full bg-white dark:bg-slate-800 rounded text-slate-900 dark:text-slate-100">
          <thead className="bg-slate-200 dark:bg-slate-700">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Slot</th>
              <th className="p-3 text-left">Vehicle</th>
              <th className="p-3 text-left">Hours</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr
                key={b._id}
                className="border-t dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
              >
                <td className="p-3">{b.userId?.email}</td>
                <td className="p-3">{b.slotId?.slotNumber}</td>
                <td className="p-3">{b.vehicleNumber}</td>
                <td className="p-3">{b.totalHours ?? "-"}</td>
                <td className="p-3 font-semibold">
                  {b.amount ? `₹${b.amount}` : "-"}
                </td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      b.exitTime
                        ? "bg-emerald-600 text-white"
                        : "bg-amber-500 text-black"
                    }`}
                  >
                    {b.exitTime ? "Exited" : "Active"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AdminBookings
