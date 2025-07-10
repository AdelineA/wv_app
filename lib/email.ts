// Email service configuration and functions
export interface EmailTemplate {
  to: string
  subject: string
  html: string
  text: string
}

export interface BookingApprovalEmailData {
  customerName: string
  customerEmail: string
  venueName: string
  eventDate: string
  guestCount: number
  price: string
  venueOwnerName?: string
  venueContact?: string
}

export interface BookingRejectionEmailData {
  customerName: string
  customerEmail: string
  venueName: string
  eventDate: string
  rejectionReason: string
  venueOwnerName?: string
}

// Email templates
export const createApprovalEmailTemplate = (data: BookingApprovalEmailData): EmailTemplate => {
  const subject = `🎉 Your Wedding Venue Booking is Confirmed - ${data.venueName}`

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmed</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #eee; }
        .detail-label { font-weight: bold; color: #555; }
        .detail-value { color: #333; }
        .success-badge { background: #10b981; color: white; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin: 10px 0; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px; }
        .button { background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🎉 Congratulations!</h1>
        <h2>Your Wedding Venue Booking is Confirmed</h2>
      </div>
      
      <div class="content">
        <p>Dear ${data.customerName},</p>
        
        <p>We're thrilled to inform you that your wedding venue booking request has been <span class="success-badge">APPROVED</span>!</p>
        
        <div class="booking-details">
          <h3>📋 Booking Details</h3>
          <div class="detail-row">
            <span class="detail-label">Venue:</span>
            <span class="detail-value">${data.venueName}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Event Date:</span>
            <span class="detail-value">${new Date(data.eventDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Guest Count:</span>
            <span class="detail-value">${data.guestCount} guests</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Total Price:</span>
            <span class="detail-value">${data.price}</span>
          </div>
          ${
            data.venueContact
              ? `
          <div class="detail-row">
            <span class="detail-label">Venue Contact:</span>
            <span class="detail-value">${data.venueContact}</span>
          </div>
          `
              : ""
          }
        </div>
        
        <h3>🎯 Next Steps:</h3>
        <ul>
          <li>The venue owner will contact you within 24 hours to discuss details</li>
          <li>Please prepare any specific requirements or questions you may have</li>
          <li>Consider scheduling a venue visit if you haven't already</li>
          <li>Start planning other aspects of your special day!</li>
        </ul>
        
        <p>We're excited to be part of your wedding journey. If you have any questions, please don't hesitate to contact us.</p>
        
        <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://weddingvenueskigali.rw"}/bookings" class="button">View My Bookings</a>
        
        <p>Best wishes for your upcoming celebration!</p>
        
        <p>Warm regards,<br>
        <strong>Wedding Venues Kigali Team</strong></p>
      </div>
      
      <div class="footer">
        <p>Wedding Venues Kigali | Kigali, Rwanda</p>
        <p>Email: info@weddingvenueskigali.rw | Phone: +250 788 123 456</p>
        <p>This is an automated message. Please do not reply to this email.</p>
      </div>
    </body>
    </html>
  `

  const text = `
    Congratulations! Your Wedding Venue Booking is Confirmed
    
    Dear ${data.customerName},
    
    We're thrilled to inform you that your wedding venue booking request has been APPROVED!
    
    Booking Details:
    - Venue: ${data.venueName}
    - Event Date: ${new Date(data.eventDate).toLocaleDateString()}
    - Guest Count: ${data.guestCount} guests
    - Total Price: ${data.price}
    ${data.venueContact ? `- Venue Contact: ${data.venueContact}` : ""}
    
    Next Steps:
    - The venue owner will contact you within 24 hours to discuss details
    - Please prepare any specific requirements or questions you may have
    - Consider scheduling a venue visit if you haven't already
    - Start planning other aspects of your special day!
    
    We're excited to be part of your wedding journey. If you have any questions, please don't hesitate to contact us.
    
    Best wishes for your upcoming celebration!
    
    Wedding Venues Kigali Team
    info@weddingvenueskigali.rw | +250 788 123 456
  `

  return {
    to: data.customerEmail,
    subject,
    html,
    text,
  }
}

export const createRejectionEmailTemplate = (data: BookingRejectionEmailData): EmailTemplate => {
  const subject = `Update on Your Wedding Venue Booking Request - ${data.venueName}`

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Update</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b; }
        .reason-box { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 6px; margin: 15px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #eee; }
        .detail-label { font-weight: bold; color: #555; }
        .detail-value { color: #333; }
        .status-badge { background: #f59e0b; color: white; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin: 10px 0; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px; }
        .button { background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 15px 0; }
        .alternative-button { background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 15px 10px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>📋 Booking Update</h1>
        <h2>Regarding Your Wedding Venue Request</h2>
      </div>
      
      <div class="content">
        <p>Dear ${data.customerName},</p>
        
        <p>Thank you for your interest in booking our venue for your special day. We've carefully reviewed your request for <strong>${data.venueName}</strong>.</p>
        
        <p>Unfortunately, we're unable to accommodate your booking request at this time. <span class="status-badge">REQUEST NOT APPROVED</span></p>
        
        <div class="booking-details">
          <h3>📋 Your Request Details</h3>
          <div class="detail-row">
            <span class="detail-label">Venue:</span>
            <span class="detail-value">${data.venueName}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Requested Date:</span>
            <span class="detail-value">${new Date(data.eventDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</span>
          </div>
        </div>
        
        <div class="reason-box">
          <h3>📝 Reason:</h3>
          <p><strong>${data.rejectionReason}</strong></p>
        </div>
        
        <h3>🌟 Don't Give Up on Your Dream Wedding!</h3>
        <p>While this particular venue isn't available, we have many other beautiful options in Kigali that might be perfect for your special day.</p>
        
        <h3>💡 What You Can Do Next:</h3>
        <ul>
          <li>Browse our other available wedding venues</li>
          <li>Consider alternative dates if your schedule is flexible</li>
          <li>Contact us directly for personalized venue recommendations</li>
          <li>Set up alerts for when your preferred venue becomes available</li>
        </ul>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://weddingvenueskigali.rw"}/venues" class="button">Browse Other Venues</a>
          <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://weddingvenueskigali.rw"}/contact" class="alternative-button">Contact Us</a>
        </div>
        
        <p>We're committed to helping you find the perfect venue for your wedding. Our team is here to assist you every step of the way.</p>
        
        <p>Thank you for choosing Wedding Venues Kigali, and we look forward to helping you create your dream wedding.</p>
        
        <p>Best regards,<br>
        <strong>Wedding Venues Kigali Team</strong></p>
      </div>
      
      <div class="footer">
        <p>Wedding Venues Kigali | Kigali, Rwanda</p>
        <p>Email: info@weddingvenueskigali.rw | Phone: +250 788 123 456</p>
        <p>This is an automated message. Please do not reply to this email.</p>
      </div>
    </body>
    </html>
  `

  const text = `
    Booking Update - Wedding Venue Request
    
    Dear ${data.customerName},
    
    Thank you for your interest in booking our venue for your special day. We've carefully reviewed your request for ${data.venueName}.
    
    Unfortunately, we're unable to accommodate your booking request at this time.
    
    Your Request Details:
    - Venue: ${data.venueName}
    - Requested Date: ${new Date(data.eventDate).toLocaleDateString()}
    
    Reason: ${data.rejectionReason}
    
    Don't Give Up on Your Dream Wedding!
    While this particular venue isn't available, we have many other beautiful options in Kigali that might be perfect for your special day.
    
    What You Can Do Next:
    - Browse our other available wedding venues
    - Consider alternative dates if your schedule is flexible
    - Contact us directly for personalized venue recommendations
    - Set up alerts for when your preferred venue becomes available
    
    We're committed to helping you find the perfect venue for your wedding. Our team is here to assist you every step of the way.
    
    Thank you for choosing Wedding Venues Kigali, and we look forward to helping you create your dream wedding.
    
    Best regards,
    Wedding Venues Kigali Team
    info@weddingvenueskigali.rw | +250 788 123 456
  `

  return {
    to: data.customerEmail,
    subject,
    html,
    text,
  }
}

// Email sending function (using a service like Resend, SendGrid, or Nodemailer)
export const sendEmail = async (template: EmailTemplate): Promise<boolean> => {
  try {
    // Example using fetch to send email via API route
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(template),
    })

    if (!response.ok) {
      throw new Error("Failed to send email")
    }

    console.log("Email sent successfully to:", template.to)
    return true
  } catch (error) {
    console.error("Error sending email:", error)
    return false
  }
}

// Convenience functions
export const sendBookingApprovalEmail = async (data: BookingApprovalEmailData): Promise<boolean> => {
  const template = createApprovalEmailTemplate(data)
  return await sendEmail(template)
}

export const sendBookingRejectionEmail = async (data: BookingRejectionEmailData): Promise<boolean> => {
  const template = createRejectionEmailTemplate(data)
  return await sendEmail(template)
}
