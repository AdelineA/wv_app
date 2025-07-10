import { type NextRequest, NextResponse } from "next/server"
import { updateBookingStatus, getBookingById } from "@/lib/booking-store"
import { sendBookingApprovalEmail, sendBookingRejectionEmail } from "@/lib/email"

// PATCH - Update booking status
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const bookingId = Number.parseInt(params.id)
    const body = await request.json()
    const { status, rejectionReason } = body

    if (!status || !["approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    // Get the booking before updating
    const booking = getBookingById(bookingId)
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    // Update booking status
    const updatedBooking = updateBookingStatus(bookingId, status, rejectionReason)
    if (!updatedBooking) {
      return NextResponse.json({ error: "Failed to update booking" }, { status: 500 })
    }

    // Send email notification
    let emailSent = false
    try {
      if (status === "approved") {
        emailSent = await sendBookingApprovalEmail({
          customerName: updatedBooking.customerName,
          customerEmail: updatedBooking.email,
          venueName: updatedBooking.venueName,
          eventDate: updatedBooking.eventDate,
          guestCount: updatedBooking.guestCount,
          price: updatedBooking.price,
          venueOwnerName: "Venue Owner",
          venueContact: updatedBooking.phone,
        })
      } else if (status === "rejected") {
        emailSent = await sendBookingRejectionEmail({
          customerName: updatedBooking.customerName,
          customerEmail: updatedBooking.email,
          venueName: updatedBooking.venueName,
          eventDate: updatedBooking.eventDate,
          rejectionReason: rejectionReason || "No reason provided",
          venueOwnerName: "Venue Owner",
        })
      }
    } catch (emailError) {
      console.error("Error sending email:", emailError)
    }

    return NextResponse.json({
      success: true,
      booking: updatedBooking,
      emailSent,
      message: `Booking ${status} successfully`,
    })
  } catch (error) {
    console.error("Error updating booking:", error)
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 })
  }
}
