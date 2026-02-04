const express = require("express")
const {
  getAvailableSlots,
  bookSlot,
  exitParking,
  forceExitParking,
  getAllBookings,
  getParkingStats
} = require("../controllers/parkingController")

const { protect, adminOnly } = require("../middleware/authMiddleware")

const router = express.Router()

// User routes
router.get("/available", protect, getAvailableSlots)
router.post("/book", protect, bookSlot)
router.post("/exit", protect, exitParking)

// Admin routes
router.post("/force-exit", protect, adminOnly, forceExitParking)
router.get("/bookings", protect, adminOnly, getAllBookings)
router.get("/stats", protect, adminOnly, getParkingStats)

module.exports = router
