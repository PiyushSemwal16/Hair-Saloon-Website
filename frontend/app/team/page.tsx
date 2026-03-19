import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BarberCard } from "@/components/barber-card";
import { barbers } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Our Team | MG STUDIO",
  description: "Meet the expert barbers at MG STUDIO. Our skilled team is dedicated to crafting your perfect look.",
};

export default function TeamPage() {
  const owner = barbers.find((barber) => barber.isOwner);
  const workers = barbers.filter((barber) => !barber.isOwner);
  const instagramByName: Record<string, string> = {
    "Mohit gaiswal": "https://www.instagram.com/mohitgaiswal?igsh=MTd3ZXI1ZnR1NmpnZw==",
    Rishab: "https://www.instagram.com/hair_artist_rishabh?igsh=bHpsN2M5Z3k1YWxh",
  };

  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Header */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 border-b border-border reveal-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary uppercase tracking-widest text-sm mb-4">The Experts</p>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-bright mb-5 sm:mb-6">
            Meet Our Team
          </h1>
          <p className="text-white/75 max-w-2xl mx-auto leading-relaxed text-base sm:text-lg">
            Our talented barbers bring years of experience and passion to every cut. 
            Get to know the artists behind the chair.
          </p>
        </div>
      </section>

      {/* Owner Section */}
      <section className="py-12 sm:py-16 reveal-up reveal-delay-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 reveal-up reveal-delay-2">
            <p className="text-primary uppercase tracking-widest text-sm mb-2">Founder</p>
            <h2 className="text-2xl font-serif font-bold text-bright">The Master Behind It All</h2>
          </div>
          
          {owner && (
            <BarberCard
              id={owner.id}
              name={owner.name}
              title={owner.title}
              specialty={owner.specialty}
              bio={owner.bio}
              instagram={instagramByName[owner.name]}
              image={owner.image}
              isOwner={owner.isOwner}
            />
          )}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 border-t border-border reveal-up reveal-delay-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary uppercase tracking-widest text-sm mb-2">Our Barbers</p>
            <h2 className="text-2xl font-serif font-bold text-bright">The Skilled Team</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 lg:gap-8">
            {workers.map((barber) => (
              <div key={barber.id} className="h-full">
                <div className={barber.name === "Rishab" ? "lead-highlight h-full relative" : "h-full"}>
                  <BarberCard
                    id={barber.id}
                    name={barber.name}
                    title={barber.title}
                    specialty={barber.specialty}
                    instagram={instagramByName[barber.name]}
                    image={barber.image}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 sm:py-20 border-t border-border bg-card reveal-up reveal-delay-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-bright mb-5 sm:mb-6">
            Ready to Book with Our <span className="text-primary">Experts</span>?
          </h2>
          <p className="text-white/75 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed">
            Choose your preferred barber and schedule your appointment today.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto px-6 sm:px-10 h-12 sm:h-14 text-base sm:text-lg font-medium transition-smooth hover:-translate-y-0.5"
          >
            <Link href="/book">
              Book Appointment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
