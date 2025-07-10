import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Star, Phone, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const venues = [
  {
    id: 1,
    name: "Kigali Serena Hotel",
    location: "Kiyovu, Kigali",
    capacity: 300,
    price: "$2,500",
    rating: 4.8,
    image: "/images/kigali-serena-main.jpg",
    status: "available",
    description: "Elegant ballroom with panoramic city views",
  },
  {
    id: 2,
    name: "Ubumwe Grande Hotel",
    location: "Kimihurura, Kigali",
    capacity: 200,
    price: "$1,800",
    rating: 4.6,
    image: "/images/ubumwe-grande-main.jpg",
    status: "available",
    description: "Modern venue with beautiful garden setting",
  },
  {
    id: 3,
    name: "Lemigo Hotel",
    location: "Nyarutarama, Kigali",
    capacity: 250,
    price: "$2,200",
    rating: 4.7,
    image: "/images/lemigo-hotel-main.jpg",
    status: "construction",
    description: "Luxury venue with lake views (Under renovation)",
  },
  {
    id: 4,
    name: "Marriott Hotel Kigali",
    location: "City Center, Kigali",
    capacity: 400,
    price: "$3,000",
    rating: 4.9,
    image: "/images/marriott-kigali-main.jpg",
    status: "available",
    description: "Premium venue in the heart of Kigali",
  },
]

export default function HomePage() {
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
              <span className="text-xl font-bold">Wedding Venues Kigali</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium hover:text-primary">
                Home
              </Link>
              <Link href="/venues" className="text-sm font-medium hover:text-primary">
                Venues
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary">
                About
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:text-primary">
                Contact
              </Link>
            </nav>
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

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/10 to-primary/5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-wedding-venue.jpg"
            alt="Beautiful wedding venue"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
            Find Your Perfect Wedding Venue in Kigali
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Discover and book the most beautiful wedding venues in Rwanda's capital city. From intimate gardens to grand
            ballrooms, we have the perfect setting for your special day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/venues">Browse Venues</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/owner-dashboard">Venue Owner?</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Venues */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Wedding Venues</h2>
            <p className="text-muted-foreground">Handpicked venues for your dream wedding</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {venues.map((venue) => (
              <Card key={venue.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={venue.image || "/placeholder.svg"}
                    alt={venue.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <Badge
                    className={`absolute top-2 right-2 ${
                      venue.status === "available"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-orange-500 hover:bg-orange-600"
                    }`}
                  >
                    {venue.status === "available" ? "Available" : "Under Construction"}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{venue.name}</CardTitle>
                  <CardDescription>{venue.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      {venue.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-1" />
                      Up to {venue.capacity} guests
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{venue.rating}</span>
                      </div>
                      <span className="text-lg font-bold text-primary">{venue.price}</span>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4"
                    disabled={venue.status === "construction"}
                    asChild={venue.status === "available"}
                  >
                    {venue.status === "available" ? (
                      <Link href={`/venues/${venue.id}`}>View Details</Link>
                    ) : (
                      "Under Construction"
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">Simple steps to book your dream venue</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Venues</h3>
              <p className="text-muted-foreground">
                Explore our curated collection of wedding venues in Kigali with detailed photos and information.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Submit Booking Request</h3>
              <p className="text-muted-foreground">
                Fill out our simple booking form with your wedding details and preferred dates.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Confirmation</h3>
              <p className="text-muted-foreground">
                Venue owners will review your request and confirm availability within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">WV</span>
                </div>
                <span className="text-xl font-bold">Wedding Venues Kigali</span>
              </div>
              <p className="text-muted-foreground">
                Your trusted partner for finding the perfect wedding venue in Kigali, Rwanda.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/venues" className="hover:text-primary">
                    Browse Venues
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-primary">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Venue Owners</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/owner-dashboard" className="hover:text-primary">
                    Owner Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/list-venue" className="hover:text-primary">
                    List Your Venue
                  </Link>
                </li>
                <li>
                  <Link href="/owner-support" className="hover:text-primary">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+250 788 123 456</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>info@weddingvenueskigali.rw</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Kigali, Rwanda</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Wedding Venues Kigali. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
