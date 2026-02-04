require("dotenv").config()

const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const parkingRoutes = require("./routes/parkingRoutes")



const authRoutes = require("./routes/authRoutes")



const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/parking", parkingRoutes)
app.use(cors({ origin: "http://localhost:5173" }))


app.get("/", (req, res) => {
  res.send("Parking Management System API running")
})

const PORT = process.env.PORT || 5000

const { protect } = require("./middleware/authMiddleware")

app.get("/api/test/protected", protect, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user })
})

const ParkingSlot = require("./models/ParkingSlot")

app.get("/api/debug/slots", async (req, res) => {
  const slots = await ParkingSlot.find()
  res.json(slots)
})




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
