"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createApprovalEmailTemplate, createRejectionEmailTemplate } from "@/lib/email"

// Demo component to preview email templates
export default function EmailPreview() {
  const sampleApprovalData = {
    customerName: "Sarah Johnson",
    customerEmail: "sarah@example.com",
    venueName: "Kigali Serena Hotel",
    eventDate: "2024-08-15",
    guestCount: 150,
    price: "$2,500",
    venueOwnerName: "Hotel Manager",
    venueContact: "+250 788 123 456",
  }

  const sampleRejectionData = {
    customerName: "David Uwimana",
    customerEmail: "david@example.com",
    venueName: "Kigali Serena Hotel",
    eventDate: "2024-07-30",
    rejectionReason: "The venue is already booked for that date. We apologize for any inconvenience.",
    venueOwnerName: "Hotel Manager",
  }

  const approvalTemplate = createApprovalEmailTemplate(sampleApprovalData)
  const rejectionTemplate = createRejectionEmailTemplate(sampleRejectionData)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Email Template Preview</h1>
        <p className="text-muted-foreground">Preview of automated emails sent to customers</p>
      </div>

      <Tabs defaultValue="approval" className="space-y-4">
        <TabsList>
          <TabsTrigger value="approval">Approval Email</TabsTrigger>
          <TabsTrigger value="rejection">Rejection Email</TabsTrigger>
        </TabsList>

        <TabsContent value="approval">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">✅ Booking Approval Email</CardTitle>
              <div className="text-sm text-muted-foreground">
                <p>
                  <strong>To:</strong> {approvalTemplate.to}
                </p>
                <p>
                  <strong>Subject:</strong> {approvalTemplate.subject}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div
                className="border rounded-lg p-4 bg-white max-h-96 overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: approvalTemplate.html }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejection">
          <Card>
            <CardHeader>
              <CardTitle className="text-orange-600">❌ Booking Rejection Email</CardTitle>
              <div className="text-sm text-muted-foreground">
                <p>
                  <strong>To:</strong> {rejectionTemplate.to}
                </p>
                <p>
                  <strong>Subject:</strong> {rejectionTemplate.subject}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div
                className="border rounded-lg p-4 bg-white max-h-96 overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: rejectionTemplate.html }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
