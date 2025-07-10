import { type NextRequest, NextResponse } from "next/server"
import { getAllBookings, addBooking, getVenuePricing } from "@/lib/booking-store"

// GET - Fetch all bookings
export async function GET() {
  try {
    const bookings = getAllBookings()
    return NextResponse.json({ bookings })
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}

// POST - Create new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { venueName, venueId, customerName, email, phone, eventDate, guestCount, message } = body

    // Validate required fields
    if (!venueName || !venueId || !customerName || !email || !phone || !eventDate || !guestCount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get venue pricing
    const price = getVenuePricing(venueId)

    // Create new booking
    const newBooking = addBooking({
      venueName,
      venueId,
      customerName,
      email,
      phone,
      eventDate,
      guestCount: Number.parseInt(guestCount),
      message: message || "",
      price,
    })

    return NextResponse.json({
      success: true,
      booking: newBooking,
      message: "Booking request submitted successfully",
    })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}
