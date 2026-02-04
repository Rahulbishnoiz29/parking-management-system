const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    slotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParkingSlot",
      required: true
    },
    vehicleNumber: {
      type: String,
      required: true
    },
    slipId: {
      type: String,
      required: true
    },
    entryTime: {
      type: Date,
      default: Date.now
    },
    exitTime: {
      type: Date
    },
    totalHours: {
      type: Number
    },
    amount: {
      type: Number
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Booking", bookingSchema)
