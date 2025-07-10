import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, Award, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
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
      <section className="relative py-20 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/wedding-couple-dancing.jpg"
            alt="Wedding celebration"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Wedding Venues Kigali</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            We're passionate about helping couples find their perfect wedding venue in Rwanda's beautiful capital city.
            Your dream wedding starts with the perfect location.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2024, Wedding Venues Kigali was born from a simple observation: finding the perfect wedding
                venue in Kigali was unnecessarily complicated and time-consuming for couples planning their special day.
              </p>
              <p className="text-muted-foreground mb-4">
                We set out to create a platform that would connect couples with the most beautiful venues in Rwanda's
                capital, making the booking process simple, transparent, and stress-free.
              </p>
              <p className="text-muted-foreground">
                Today, we're proud to work with the finest hotels, gardens, and event spaces in Kigali, helping hundreds
                of couples celebrate their love in stunning locations.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/images/kigali-serena-ballroom.jpg"
                alt="Beautiful wedding venue"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              To make wedding venue booking in Kigali simple, transparent, and delightful for every couple.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Passion for Love</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We believe every couple deserves a perfect wedding day, and it starts with finding the right venue
                  that reflects their unique love story.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Community Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We're committed to supporting local businesses and helping Kigali's hospitality industry thrive by
                  connecting them with couples.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We maintain the highest standards by partnering only with venues that meet our criteria for quality,
                  service, and reliability.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/images/ubumwe-grande-reception.jpg"
                alt="Wedding reception"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose Wedding Venues Kigali?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-foreground text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Curated Selection</h3>
                    <p className="text-muted-foreground text-sm">
                      Every venue on our platform is personally vetted for quality, service, and reliability.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-foreground text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Transparent Pricing</h3>
                    <p className="text-muted-foreground text-sm">
                      No hidden fees or surprises. See exact pricing upfront and make informed decisions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-foreground text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Local Expertise</h3>
                    <p className="text-muted-foreground text-sm">
                      Our team knows Kigali inside and out, providing personalized recommendations for your needs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-foreground text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Seamless Booking</h3>
                    <p className="text-muted-foreground text-sm">
                      Our streamlined process makes booking your venue quick, easy, and stress-free.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Venue?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join hundreds of couples who have found their dream wedding venue through our platform. Start your journey
            today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/venues">Browse Venues</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
