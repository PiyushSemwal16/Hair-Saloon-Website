import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border reveal-up reveal-delay-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3 transition-smooth hover:opacity-90">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-j718O0uiquGiSyiG0P9QNeD7S10PaP.png"
                alt="MG STUDIO Logo"
                width={80}
                height={80}
                className="object-contain transition-smooth hover:scale-105"
              />
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Premium grooming experience with expert barbers dedicated to crafting your perfect look.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-primary font-serif text-lg mb-4">Quick Links</h3>
            <div className="flex flex-col gap-3">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-smooth">
                Home
              </Link>
              <Link href="/team" className="text-muted-foreground hover:text-primary transition-smooth">
                Our Team
              </Link>
              <Link href="/book" className="text-muted-foreground hover:text-primary transition-smooth">
                Book Appointment
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-primary font-serif text-lg mb-4">Contact Us</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <span>MG Studio , Kansapur Road , Near Bal Bhawan School</span>
                  <Link
                    href="https://maps.app.goo.gl/CDFdrdBTLFG2csrLA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-primary hover:underline transition-smooth"
                  >
                    Open in Google Maps
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+919996715504</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Instagram className="h-5 w-5 text-primary shrink-0" />
                <Link
                  href="https://www.instagram.com/mg_studio_11?igsh=MTNydXJ0dWx5dzNrZQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary hover:underline transition-smooth"
                >
                  @mg_studio_11
                </Link>
              </div>
              <div className="flex items-start gap-3 text-muted-foreground">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p>Mon - Sunday : 9AM - 10PM</p>
                  <p>Tue: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} MG STUDIO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
