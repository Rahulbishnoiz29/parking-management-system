import jsPDF from "jspdf"

export const downloadInvoice = (booking) => {
  const doc = new jsPDF()

  doc.setFontSize(18)
  doc.text("Parking Invoice", 20, 20)

  doc.setFontSize(12)
  doc.text(`Slip ID: ${booking.slipId}`, 20, 40)
  doc.text(`Vehicle Number: ${booking.vehicleNumber}`, 20, 50)

  doc.text(
    `Entry Time: ${new Date(booking.entryTime).toLocaleString()}`,
    20,
    60
  )

  doc.text(
    `Exit Time: ${new Date(booking.exitTime).toLocaleString()}`,
    20,
    70
  )

  doc.text(`Total Hours: ${booking.totalHours}`, 20, 80)

  doc.setFontSize(14)
  doc.text(`Amount Paid: ₹${booking.amount}`, 20, 100)

  doc.setFontSize(10)
  doc.text("Thank you for using Parking Management System", 20, 130)

  doc.save(`Invoice-${booking.slipId}.pdf`)
}
