import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MapPin, Users, Star, Search, Filter, ArrowLeft } from "lucide-react"
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
    reviews: 124,
    image: "/images/kigali-serena-main.jpg",
    status: "available",
    description: "Elegant ballroom with panoramic city views and professional service",
    features: ["Air Conditioning", "Bridal Suite", "Garden Space", "Professional Lighting"],
  },
  {
    id: 2,
    name: "Ubumwe Grande Hotel",
    location: "Kimihurura, Kigali",
    capacity: 200,
    price: "$1,800",
    rating: 4.6,
    reviews: 89,
    image: "/images/ubumwe-grande-main.jpg",
    status: "available",
    description: "Modern venue with beautiful garden setting and intimate atmosphere",
    features: ["Garden Ceremony", "Modern Facilities", "Catering Kitchen", "Parking"],
  },
  {
    id: 3,
    name: "Lemigo Hotel",
    location: "Nyarutarama, Kigali",
    capacity: 250,
    price: "$2,200",
    rating: 4.7,
    reviews: 156,
    image: "/images/lemigo-hotel-main.jpg",
    status: "construction",
    description: "Luxury venue with stunning lake views (Currently under renovation)",
    features: ["Lake Views", "Luxury Amenities", "Waterfront Ceremony", "Premium Service"],
  },
  {
    id: 4,
    name: "Marriott Hotel Kigali",
    location: "City Center, Kigali",
    capacity: 400,
    price: "$3,000",
    rating: 4.9,
    reviews: 203,
    image: "/images/marriott-kigali-main.jpg",
    status: "available",
    description: "Premium venue in the heart of Kigali with world-class facilities",
    features: ["City Center", "Premium Service", "Large Capacity", "Modern Facilities"],
  },
]

export default function VenuesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild>
              <Link href="/" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
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

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/wedding-couple-dancing.jpg"
            alt="Wedding couple dancing"
            fill
            className="object-cover opacity-10"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Wedding Venues in Kigali</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover the perfect venue for your special day from our curated collection of premium wedding locations
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search venues..." className="pl-10" />
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="flex items-center bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <select className="px-3 py-2 border rounded-md bg-background">
                <option>Sort by Price</option>
                <option>Sort by Rating</option>
                <option>Sort by Capacity</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Venues Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venues.map((venue) => (
              <Card key={venue.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <Image
                    src={venue.image || "/placeholder.svg"}
                    alt={venue.name}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge
                    className={`absolute top-4 right-4 ${
                      venue.status === "available"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-orange-500 hover:bg-orange-600"
                    }`}
                  >
                    {venue.status === "available" ? "Available" : "Under Construction"}
                  </Badge>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="font-semibold">{venue.rating}</span>
                          <span className="text-sm text-muted-foreground ml-1">({venue.reviews})</span>
                        </div>
                        <span className="text-lg font-bold text-primary">{venue.price}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{venue.name}</CardTitle>
                  <CardDescription className="flex items-center text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    {venue.location}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{venue.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>Up to {venue.capacity} guests</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {venue.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {venue.features.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{venue.features.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <Button
                      className="w-full mt-4"
                      disabled={venue.status === "construction"}
                      asChild={venue.status === "available"}
                    >
                      {venue.status === "available" ? (
                        <Link href={`/venues/${venue.id}`}>View Details & Book</Link>
                      ) : (
                        "Under Construction"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't See Your Perfect Venue?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're constantly adding new venues to our platform. Contact us to suggest a venue or get personalized
            recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/owner-dashboard">List Your Venue</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
