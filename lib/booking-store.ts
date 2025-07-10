// Simple in-memory store for demo purposes
// In production, this would be replaced with a database

export interface Booking {
  id: number
  venueName: string
  venueId: number
  customerName: string
  email: string
  phone: string
  eventDate: string
  guestCount: number
  status: "pending" | "approved" | "rejected"
  message: string
  submittedAt: string
  price: string
  rejectionReason?: string
}

// Initial mock data
const bookings: Booking[] = [
  {
    id: 1,
    venueName: "Kigali Serena Hotel",
    venueId: 1,
    customerName: "Sarah Johnson",
    email: "sarah@email.com",
    phone: "+250 788 123 456",
    eventDate: "2024-08-15",
    guestCount: 150,
    status: "pending",
    message: "Looking for an elegant venue for our wedding. We'd like to include outdoor ceremony space if possible.",
    submittedAt: "2024-01-10T10:30:00Z",
    price: "$2,500",
  },
  {
    id: 2,
    venueName: "Kigali Serena Hotel",
    venueId: 1,
    customerName: "David Uwimana",
    email: "david@email.com",
    phone: "+250 788 987 654",
    eventDate: "2024-09-22",
    guestCount: 200,
    status: "approved",
    message: "Traditional wedding ceremony with modern reception. Need catering recommendations.",
    submittedAt: "2024-01-08T14:15:00Z",
    price: "$2,500",
  },
  {
    id: 3,
    venueName: "Kigali Serena Hotel",
    venueId: 1,
    customerName: "Marie Mukamana",
    email: "marie@email.com",
    phone: "+250 788 456 789",
    eventDate: "2024-07-30",
    guestCount: 300,
    status: "rejected",
    message: "Large family wedding with traditional ceremonies.",
    submittedAt: "2024-01-05T09:45:00Z",
    rejectionReason: "Venue is already booked for that date.",
    price: "$2,500",
  },
]

// Get all bookings
export const getAllBookings = (): Booking[] => {
  return [...bookings]
}

// Get bookings by status
export const getBookingsByStatus = (status: Booking["status"]): Booking[] => {
  return bookings.filter((booking) => booking.status === status)
}

// Add new booking
export const addBooking = (bookingData: Omit<Booking, "id" | "submittedAt" | "status">): Booking => {
  const newBooking: Booking = {
    ...bookingData,
    id: Math.max(...bookings.map((b) => b.id), 0) + 1,
    submittedAt: new Date().toISOString(),
    status: "pending",
  }

  bookings.push(newBooking)
  return newBooking
}

// Update booking status
export const updateBookingStatus = (
  id: number,
  status: Booking["status"],
  rejectionReason?: string,
): Booking | null => {
  const bookingIndex = bookings.findIndex((b) => b.id === id)
  if (bookingIndex === -1) return null

  bookings[bookingIndex] = {
    ...bookings[bookingIndex],
    status,
    ...(rejectionReason && { rejectionReason }),
  }

  return bookings[bookingIndex]
}

// Get booking by ID
export const getBookingById = (id: number): Booking | null => {
  return bookings.find((b) => b.id === id) || null
}

// Get venue pricing (mock data)
export const getVenuePricing = (venueId: number): string => {
  const pricingMap: Record<number, string> = {
    1: "$2,500",
    2: "$1,800",
    3: "$2,200",
    4: "$3,000",
  }
  return pricingMap[venueId] || "$2,000"
}
