"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, PhoneCall, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/team", label: "Team" },
    { href: "/book", label: "Book Appointment" },
    { href: "/admin", label: "Admin" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-smooth">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 transition-smooth hover:opacity-90">
            <Image
              src="/logo.png"
              alt="MG STUDIO Logo"
              width={52}
              height={52}
              className="object-contain transition-smooth hover:scale-105 sm:w-[60px] sm:h-[60px]"
            />
            <span className="text-lg sm:text-xl font-serif font-bold text-primary tracking-wide hidden min-[420px]:block">
              MG STUDIO
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-2 sm:gap-4">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 mr-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground/80 hover:text-primary transition-smooth font-medium tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Call Button */}
            <a
              href="tel:+919996715504"
              aria-label="Call MG STUDIO"
              title="Call now"
              className="relative inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-smooth hover:scale-105 hover:shadow-lg"
            >
              <span className="absolute inset-0 rounded-full bg-primary/35 animate-ping" aria-hidden="true" />
              <PhoneCall className="relative z-10 h-4 w-4 sm:h-5 sm:w-5" />
            </a>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground transition-smooth h-10 w-10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden border-t border-border transition-all duration-300 ease-out ${
            isMenuOpen ? "max-h-72 py-4 opacity-100" : "max-h-0 py-0 opacity-0 border-t-transparent"
          }`}
        >
          {isMenuOpen && (
            <div className="flex flex-col gap-2 pb-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground/85 hover:text-primary transition-smooth font-medium py-2.5 px-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
