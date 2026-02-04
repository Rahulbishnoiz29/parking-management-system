const ParkingSlot = require("../models/ParkingSlot")
const Booking = require("../models/Booking")

// 🔢 Billing helper
const calculateBilling = (entryTime, exitTime, vehicleType) => {
  const diffMs = exitTime - entryTime
  const hours = Math.ceil(diffMs / (1000 * 60 * 60))
  const rate = vehicleType === "car" ? 20 : 10

  return {
    totalHours: hours,
    amount: hours * rate
  }
}

// ✅ Get available slots
exports.getAvailableSlots = async (req, res) => {
  try {
    const slots = await ParkingSlot.find({ status: "available" })
    res.json({ slots })
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch slots" })
  }
}

// ✅ Book slot
exports.bookSlot = async (req, res) => {
  const { slotId, vehicleNumber } = req.body

  const slot = await ParkingSlot.findById(slotId)
  if (!slot || slot.status === "occupied") {
    return res.status(400).json({ message: "Slot not available" })
  }

  const booking = await Booking.create({
    userId: req.user.id,
    slotId,
    vehicleNumber,
    slipId: `SLIP-${Date.now()}`
  })

  slot.status = "occupied"
  await slot.save()

  res.json({
    message: "Parking slot booked successfully",
    booking
  })
}

// ✅ Exit parking (USER)
exports.exitParking = async (req, res) => {
  const { bookingId } = req.body

  const booking = await Booking.findById(bookingId)
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" })
  }

  const slot = await ParkingSlot.findById(booking.slotId)
  const exitTime = new Date()

  const billing = calculateBilling(
    booking.entryTime,
    exitTime,
    slot.vehicleType
  )

  booking.exitTime = exitTime
  booking.totalHours = billing.totalHours
  booking.amount = billing.amount
  await booking.save()

  slot.status = "available"
  await slot.save()

  res.json({
    message: "Parking exited successfully",
    booking
  })
}

// ✅ Force exit (ADMIN)
exports.forceExitParking = async (req, res) => {
  const { bookingId } = req.body

  const booking = await Booking.findById(bookingId)
  if (!booking || booking.exitTime) {
    return res.status(400).json({ message: "Invalid booking" })
  }

  const slot = await ParkingSlot.findById(booking.slotId)
  const exitTime = new Date()

  const billing = calculateBilling(
    booking.entryTime,
    exitTime,
    slot.vehicleType
  )

  booking.exitTime = exitTime
  booking.totalHours = billing.totalHours
  booking.amount = billing.amount
  await booking.save()

  slot.status = "available"
  await slot.save()

  res.json({
    message: "Parking force exited",
    booking
  })
}

// ✅ Admin bookings
exports.getAllBookings = async (req, res) => {
  const bookings = await Booking.find()
    .populate("userId", "email")
    .populate("slotId", "slotNumber vehicleType")

  res.json(bookings)
}

// ✅ Admin stats
exports.getParkingStats = async (req, res) => {
  const totalSlots = await ParkingSlot.countDocuments()
  const occupiedSlots = await ParkingSlot.countDocuments({
    status: "occupied"
  })
  const availableSlots = await ParkingSlot.countDocuments({
    status: "available"
  })

  res.json({
    totalSlots,
    occupiedSlots,
    availableSlots
  })
}
