"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { MapPin, Users, Star, CalendarIcon, Wifi, Car, Music, Camera, Utensils, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { format } from "date-fns"

// Mock venue data - in a real app, this would come from a database
const venue = {
  id: 1,
  name: "Kigali Serena Hotel",
  location: "Kiyovu, Kigali",
  capacity: 300,
  price: "$2,500",
  rating: 4.8,
  reviews: 124,
  images: [
    "/images/kigali-serena-main.jpg",
    "/images/kigali-serena-ballroom.jpg",
    "/images/kigali-serena-garden.jpg",
    "/images/kigali-serena-ceremony.jpg",
  ],
  status: "available",
  description:
    "The Kigali Serena Hotel offers an elegant ballroom with panoramic city views, perfect for your dream wedding. Our experienced team will ensure every detail is perfect for your special day.",
  amenities: [
    { icon: Wifi, name: "Free WiFi" },
    { icon: Car, name: "Parking" },
    { icon: Music, name: "Sound System" },
    { icon: Camera, name: "Photography Area" },
    { icon: Utensils, name: "Catering Kitchen" },
  ],
  features: [
    "Air conditioning",
    "Bridal suite",
    "Dance floor",
    "Stage area",
    "Garden ceremony space",
    "Professional lighting",
  ],
}

export default function VenueDetailsPage() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guestCount: "",
    eventDate: "",
    message: "",
  })

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const bookingData = {
        venueName: venue.name,
        venueId: venue.id,
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        eventDate: selectedDate?.toISOString() || formData.eventDate,
        guestCount: formData.guestCount,
        message: formData.message,
      }

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })

      const result = await response.json()

      if (response.ok) {
        alert("Booking request submitted successfully! The venue owner will review and respond within 24 hours.")
        setIsBookingOpen(false)
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          guestCount: "",
          eventDate: "",
          message: "",
        })
        setSelectedDate(undefined)
      } else {
        throw new Error(result.error || "Failed to submit booking")
      }
    } catch (error) {
      console.error("Booking submission error:", error)
      alert("Failed to submit booking request. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild>
              <Link href="/" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Venues
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="col-span-2">
                <Image
                  src={venue.images[0] || "/placeholder.svg"}
                  alt={venue.name}
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
              {venue.images.slice(1, 4).map((image, index) => (
                <Image
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`${venue.name} ${index + 2}`}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover rounded-lg"
                />
              ))}
            </div>

            {/* Venue Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-bold">{venue.name}</h1>
                  <Badge className="bg-green-500 hover:bg-green-600">
                    {venue.status === "available" ? "Available" : "Under Construction"}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {venue.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    Up to {venue.capacity} guests
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    {venue.rating} ({venue.reviews} reviews)
                  </div>
                </div>
                <p className="text-muted-foreground">{venue.description}</p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {venue.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <amenity.icon className="w-5 h-5 text-primary" />
                      <span>{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Features</h2>
                <div className="grid grid-cols-2 gap-2">
                  {venue.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{venue.price}</span>
                  <span className="text-sm font-normal text-muted-foreground">per event</span>
                </CardTitle>
                <CardDescription>Book this venue for your special day</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-semibold uppercase text-muted-foreground">Capacity</Label>
                    <p className="font-semibold">{venue.capacity} guests</p>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold uppercase text-muted-foreground">Rating</Label>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-semibold">{venue.rating}</span>
                    </div>
                  </div>
                </div>

                <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full" size="lg">
                      Request Booking
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Book {venue.name}</DialogTitle>
                      <DialogDescription>
                        Fill out the form below to request a booking. The venue owner will review and respond within 24
                        hours.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleBookingSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="guests">Guest Count</Label>
                          <Input
                            id="guests"
                            type="number"
                            max={venue.capacity}
                            value={formData.guestCount}
                            onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Event Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal bg-transparent"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label htmlFor="message">Additional Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your event, special requirements, etc."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Submit Booking Request
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <p className="text-xs text-muted-foreground text-center">
                  You won't be charged until the booking is confirmed
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
