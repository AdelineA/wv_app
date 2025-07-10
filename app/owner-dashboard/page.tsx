"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar, Users, Mail, Phone, Clock, CheckCircle, XCircle, Eye, RefreshCw } from "lucide-react"
import { useState, useEffect } from "react"
import type { Booking } from "@/lib/booking-store"

export default function OwnerDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [rejectionReason, setRejectionReason] = useState("")
  const [processingBookingId, setProcessingBookingId] = useState<number | null>(null)

  // Fetch bookings from API
  const fetchBookings = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/bookings")
      const data = await response.json()

      if (response.ok) {
        setBookings(data.bookings)
      } else {
        console.error("Failed to fetch bookings:", data.error)
      }
    } catch (error) {
      console.error("Error fetching bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  // Load bookings on component mount
  useEffect(() => {
    fetchBookings()
  }, [])

  const handleApprove = async (bookingId: number) => {
    try {
      setProcessingBookingId(bookingId)

      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "approved" }),
      })

      const result = await response.json()

      if (response.ok) {
        // Update local state
        setBookings((prev) =>
          prev.map((booking) => (booking.id === bookingId ? { ...booking, status: "approved" as const } : booking)),
        )

        if (result.emailSent) {
          alert("Booking approved! Customer has been notified via email.")
        } else {
          alert("Booking approved! However, there was an issue sending the email notification.")
        }
      } else {
        throw new Error(result.error || "Failed to approve booking")
      }
    } catch (error) {
      console.error("Error approving booking:", error)
      alert("Error approving booking. Please try again.")
    } finally {
      setProcessingBookingId(null)
    }
  }

  const handleReject = async (bookingId: number, reason: string) => {
    try {
      setProcessingBookingId(bookingId)

      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "rejected",
          rejectionReason: reason,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        // Update local state
        setBookings((prev) =>
          prev.map((booking) =>
            booking.id === bookingId ? { ...booking, status: "rejected" as const, rejectionReason: reason } : booking,
          ),
        )

        if (result.emailSent) {
          alert("Booking rejected! Customer has been notified via email with the reason.")
        } else {
          alert("Booking rejected! However, there was an issue sending the email notification.")
        }

        setRejectionReason("")
      } else {
        throw new Error(result.error || "Failed to reject booking")
      }
    } catch (error) {
      console.error("Error rejecting booking:", error)
      alert("Error rejecting booking. Please try again.")
    } finally {
      setProcessingBookingId(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "approved":
        return "bg-green-500 hover:bg-green-600"
      case "rejected":
        return "bg-red-500 hover:bg-red-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  const pendingBookings = bookings.filter((b) => b.status === "pending")
  const approvedBookings = bookings.filter((b) => b.status === "approved")
  const rejectedBookings = bookings.filter((b) => b.status === "rejected")

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading bookings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">WV</span>
              </div>
              <span className="text-xl font-bold">Venue Owner Dashboard</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={fetchBookings}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline">Logout</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingBookings.length}</div>
              <p className="text-xs text-muted-foreground">Awaiting your response</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Bookings</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedBookings.length}</div>
              <p className="text-xs text-muted-foreground">Confirmed events</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <span className="h-4 w-4 text-muted-foreground">$</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                $
                {approvedBookings
                  .reduce((total, booking) => {
                    const price = Number.parseInt(booking.price.replace("$", "").replace(",", ""))
                    return total + price
                  }, 0)
                  .toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">From approved bookings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  bookings.filter((b) => {
                    const submittedDate = new Date(b.submittedAt)
                    const currentDate = new Date()
                    return (
                      submittedDate.getMonth() === currentDate.getMonth() &&
                      submittedDate.getFullYear() === currentDate.getFullYear()
                    )
                  }).length
                }
              </div>
              <p className="text-xs text-muted-foreground">New booking requests</p>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Tabs */}
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending">Pending ({pendingBookings.length})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({approvedBookings.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedBookings.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingBookings.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">No pending booking requests</p>
                </CardContent>
              </Card>
            ) : (
              pendingBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{booking.customerName}</CardTitle>
                        <CardDescription>
                          Submitted on {new Date(booking.submittedAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span>Event Date: {new Date(booking.eventDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span>Guests: {booking.guestCount}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="w-4 h-4 mr-2 text-muted-foreground">$</span>
                          <span>Price: {booking.price}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span>{booking.email}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span>{booking.phone}</span>
                        </div>
                      </div>
                    </div>

                    {booking.message && (
                      <div className="mb-4">
                        <Label className="text-sm font-medium">Customer Message:</Label>
                        <p className="text-sm text-muted-foreground mt-1">{booking.message}</p>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleApprove(booking.id)}
                        className="bg-green-600 hover:bg-green-700"
                        disabled={processingBookingId === booking.id}
                      >
                        {processingBookingId === booking.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        ) : (
                          <CheckCircle className="w-4 h-4 mr-2" />
                        )}
                        Approve
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="destructive" disabled={processingBookingId === booking.id}>
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Reject Booking Request</DialogTitle>
                            <DialogDescription>
                              Please provide a reason for rejecting this booking request. This will be sent to the
                              customer.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="reason">Rejection Reason</Label>
                              <Textarea
                                id="reason"
                                placeholder="e.g., Venue is already booked for that date, Under construction, etc."
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                              />
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline">Cancel</Button>
                              <Button
                                variant="destructive"
                                onClick={() => handleReject(booking.id, rejectionReason)}
                                disabled={!rejectionReason.trim() || processingBookingId === booking.id}
                              >
                                {processingBookingId === booking.id ? (
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                ) : null}
                                Reject Booking
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            {approvedBookings.map((booking) => (
              <Card key={booking.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{booking.customerName}</CardTitle>
                      <CardDescription>Event on {new Date(booking.eventDate).toLocaleDateString()}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(booking.status)}>Approved</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span>Guests: {booking.guestCount}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="w-4 h-4 mr-2 text-muted-foreground">$</span>
                        <span>Revenue: {booking.price}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span>{booking.email}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span>{booking.phone}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {rejectedBookings.map((booking) => (
              <Card key={booking.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{booking.customerName}</CardTitle>
                      <CardDescription>
                        Requested for {new Date(booking.eventDate).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(booking.status)}>Rejected</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <Label className="text-sm font-medium">Rejection Reason:</Label>
                      <p className="text-sm text-muted-foreground">{booking.rejectionReason}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
