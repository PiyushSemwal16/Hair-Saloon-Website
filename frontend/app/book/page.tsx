import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookingForm } from "@/components/booking-form";
import {
  MapPin,
  Phone,
  Clock,
  Sparkles,
  ShieldCheck,
  Star,
  ExternalLink,
  MessageCircle,
} from "lucide-react";

export const metadata = {
  title: "Book Appointment | MG STUDIO",
  description: "Schedule your appointment or tuition class at MG STUDIO. Share your details and continue to Calendly to confirm your date and time.",
};

const bookingSteps = [
  {
    title: "Fill Quick Details",
    description: "Share your name, service choice, and any notes in under a minute.",
  },
  {
    title: "Open Calendly",
    description: "You will continue to Calendly to choose your preferred date and time.",
  },
  {
    title: "Get Ready",
    description: "Arrive a few minutes early and enjoy a premium grooming session.",
  },
];

export default function BookPage() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Header */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 border-b border-border reveal-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary uppercase tracking-widest text-sm mb-4">Schedule Your Visit</p>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-bright mb-5 sm:mb-6">
            Book an Appointment
          </h1>
          <p className="text-white/75 max-w-2xl mx-auto leading-relaxed text-base sm:text-lg">
            Share your details and service preference, then continue to Calendly to pick your date and time. We also offer unisex salon services for ladies and professional tuition classes.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
            <div className="rounded-md border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-foreground flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Premium Styling
            </div>
            <div className="rounded-md border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-foreground flex items-center justify-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Hygienic Tools
            </div>
            <div className="rounded-md border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-foreground flex items-center justify-center gap-2">
              <Star className="h-4 w-4 text-primary" />
              Trusted By Locals
            </div>
          </div>
        </div>
      </section>

      {/* Booking Steps */}
      <section className="pt-8 sm:pt-10 pb-2 reveal-up reveal-delay-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-4">
            {bookingSteps.map((step, index) => (
              <div key={step.title} className="rounded-lg border border-border bg-card p-5 transition-smooth hover-lift">
                <p className="text-primary text-xs uppercase tracking-widest mb-2">Step {index + 1}</p>
                <h3 className="text-white font-serif text-xl mb-2">{step.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-12 sm:py-16 reveal-up reveal-delay-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 sm:gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <BookingForm />
            </div>

            {/* Info Sidebar */}
            <div className="space-y-8">
              {/* Location */}
              <div className="bg-card border border-border rounded-lg p-6 transition-smooth hover-lift reveal-up reveal-delay-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-bright">Location</h3>
                </div>
                <p className="text-white/70 leading-relaxed">
                 MG Studio , Kansapur Road<br />
                  Near Bal Bhawan School , Yamuna Nagar
                </p>
                <Link
                  href="https://maps.app.goo.gl/CDFdrdBTLFG2csrLA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline mt-4"
                >
                  Open in Maps <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Contact */}
              <div className="bg-card border border-border rounded-lg p-6 transition-smooth hover-lift reveal-up reveal-delay-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-bright">Contact</h3>
                </div>
                <p className="text-white/70">Mohit : 9996715504</p>
              </div>

              {/* Hours */}
              <div className="bg-card border border-border rounded-lg p-6 transition-smooth hover-lift reveal-up reveal-delay-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-bright">Hours</h3>
                </div>
                <div className="text-white/70 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span>Monday - Sunday</span>
                    <span className="text-white">9AM - 10PM</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span>Tuesday</span>
                    <span className="text-white">Closed</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card border border-primary/30 rounded-lg p-6 transition-smooth hover-lift reveal-up reveal-delay-5">
                <h3 className="text-lg font-serif font-bold text-bright mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <a
  href="tel:+919996715504"
  className="w-full inline-flex items-center justify-between rounded-md border border-border px-4 py-3 text-sm text-foreground hover:border-primary/60 transition-smooth"
>
  Call Now
  <Phone className="h-4 w-4 text-primary" />
</a>
                  <Link
                    href="https://www.instagram.com/mg_studio_11?igsh=MTNydXJ0dWx5dzNrZQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-between rounded-md border border-border px-4 py-3 text-sm text-white hover:border-primary/60 transition-smooth"
                  >
                    Message on Instagram
                    <MessageCircle className="h-4 w-4 text-primary" />
                  </Link>
                </div>
              </div>

              {/* Note */}
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 transition-smooth reveal-up reveal-delay-6">
                <p className="text-white text-sm leading-relaxed">
                  <strong className="text-primary">Note:</strong> Please arrive 5-10 minutes before 
                  your scheduled appointment. Late arrivals may result in shortened service time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
