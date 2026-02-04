import { useEffect, useState } from "react"
import api from "../services/api"
import Navbar from "../components/Navbar"
import { downloadInvoice } from "../utils/invoice"

 function Dashboard() {
  const [slots, setSlots] = useState([])
  const [vehicle, setVehicle] = useState("")
  const [active, setActive] = useState(null)
  const [slip, setSlip] = useState(null)

  useEffect(() => {
    api.get("/parking/available").then(res => setSlots(res.data.slots))
  }, [])

  const book = async (id) => {
    const res = await api.post("/parking/book", { slotId: id, vehicleNumber: vehicle })
    setActive(res.data.booking)
    setVehicle("")
  }

  const exit = async () => {
    const res = await api.post("/parking/exit", { bookingId: active._id })
    setSlip(res.data.booking)
    setActive(null)
  }

  return (
    <div className="page">
      <Navbar />
      <div className="p-6 space-y-6">
        {!active && !slip && (
          <>
            <input className="input max-w-sm" placeholder="Vehicle Number"
              value={vehicle} onChange={e => setVehicle(e.target.value)} />

            <div className="grid md:grid-cols-4 gap-4">
              {slots.map(s => (
                <div key={s._id} className="card hover:scale-105 transition">
                  <p className="font-bold">Slot {s.slotNumber}</p>
                  <p className="text-sm text-slate-500">{s.vehicleType}</p>
                  <button onClick={() => book(s._id)} className="btn-primary w-full mt-3">
                    Book
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {active && (
          <div className="card bg-warning/20">
            <p><b>Slip:</b> {active.slipId}</p>
            <p><b>Entry:</b> {new Date(active.entryTime).toLocaleString()}</p>
            <button onClick={exit} className="btn-danger mt-3">Exit Parking</button>
          </div>
        )}

       {slip && (
  <div className="mt-6 p-6 rounded bg-emerald-100 dark:bg-emerald-900">
    <h3 className="text-xl font-bold mb-3">🧾 Parking Invoice</h3>

    <p><b>Slip ID:</b> {slip.slipId}</p>
    <p><b>Vehicle:</b> {slip.vehicleNumber}</p>
    <p>
      <b>Entry Time:</b>{" "}
      {new Date(slip.entryTime).toLocaleString()}
    </p>
    <p>
      <b>Exit Time:</b>{" "}
      {new Date(slip.exitTime).toLocaleString()}
    </p>
    <p><b>Total Hours:</b> {slip.totalHours}</p>

    <p className="text-lg font-bold mt-2">
      Amount Paid: ₹{slip.amount}
    </p>

    <button
      onClick={() => downloadInvoice(slip)}
      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
    >
      Download Invoice (PDF)
    </button>
  </div>
)}

      </div>
    </div>
  )
}

export default Dashboard
