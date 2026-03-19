import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HaircutCard } from "@/components/haircut-card";
import { haircutStyles, ladiesSalonServices, academyTuitionClasses } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowRight, Scissors, Award, Clock } from "lucide-react";
import HairAnalyzer from "@/components/HairAnalyzer";

export default function HomePage() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920&h=1080&fit=crop"
            alt="Barber shop interior"
            fill
            className="object-cover opacity-12 blur-[1px] scale-[1.02]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/88 via-background/72 to-background" />
          <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-primary/12 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-muted/45 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 sm:py-24 md:py-28 reveal-up">
          {/* Logo */}
          <div className="flex justify-center mb-6 sm:mb-8 reveal-up reveal-delay-1">
            <Image
              src="/logo.png"
              alt="MG STUDIO Logo"
              width={160}
              height={160}
              className="object-contain w-32 h-32 sm:w-40 sm:h-40 md:w-[180px] md:h-[180px]"
              priority
              loading="eager"
            />
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif font-bold text-bright mb-6 sm:mb-8 reveal-up reveal-delay-2">
            <span className="text-primary">Premium</span> Grooming
            <br />
            Experience
          </h1>

          <p className="text-base sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed reveal-up reveal-delay-3">
            Where traditional craftsmanship meets modern style. Experience luxury barbering 
            at its finest with our master barbers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal-up reveal-delay-4">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto px-6 sm:px-8 h-12 sm:h-14 text-base sm:text-lg font-medium transition-smooth hover:-translate-y-0.5"
            >
              <Link href="/book">
                Book Appointment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary/50 text-foreground hover:bg-primary/10 w-full sm:w-auto px-6 sm:px-8 h-12 sm:h-14 text-base sm:text-lg transition-smooth hover:-translate-y-0.5"
            >
              <Link href="/team">Meet Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
{/* AI Hairstyle Analyzer */}
<section className="py-14 sm:py-20 border-t border-border bg-background">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Section Heading */}
    <div className="text-center mb-12">
      <p className="text-primary uppercase tracking-widest text-sm mb-4">
        AI Feature
      </p>
      <h2 className="text-3xl sm:text-4xl font-serif font-bold text-bright mb-4">
        Try AI Hairstyle Analyzer
      </h2>
      <p className="text-white/75 max-w-2xl mx-auto">
        Upload your photo and discover hairstyles that suit your face shape instantly.
      </p>
    </div>

    {/* Component */}
    <div className="max-w-5xl mx-auto">
      <HairAnalyzer />
    </div>

  </div>
</section>
      {/* Features Section */}
      <section className="py-20 border-t border-border reveal-up reveal-delay-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-card rounded-lg border border-border hover-lift transition-smooth">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <Scissors className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold text-bright mb-3">Expert Barbers</h3>
              <p className="text-white/70 leading-relaxed">
                Our skilled team brings years of experience and precision to every cut.
              </p>
            </div>

            <div className="text-center p-8 bg-card rounded-lg border border-border hover-lift transition-smooth reveal-up reveal-delay-1">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold text-bright mb-3">Premium Quality</h3>
              <p className="text-white/70 leading-relaxed">
                We use only the finest products and tools for exceptional results.
              </p>
            </div>

            <div className="text-center p-8 bg-card rounded-lg border border-border hover-lift transition-smooth reveal-up reveal-delay-2">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold text-bright mb-3">Easy Booking</h3>
              <p className="text-white/70 leading-relaxed">
                Schedule your appointment online anytime, hassle-free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Styles Section */}
      <section className="py-20 border-t border-border reveal-up reveal-delay-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-up reveal-delay-1">
            <p className="text-primary uppercase tracking-widest text-sm mb-4">Our Expertise</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-bright mb-4">
              Trending Styles
            </h2>
            <p className="text-white/75 max-w-2xl mx-auto leading-relaxed">
              Discover our most popular cuts and styles, crafted to perfection by our master barbers.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {haircutStyles.map((style) => (
              <HaircutCard
                key={style.id}
                name={style.name}
                description={style.description}
                image={style.image}
              />
            ))}
          </div>

          <div className="text-center mt-12 reveal-up reveal-delay-3">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth hover:-translate-y-0.5"
            >
              <Link href="/book">
                Book Your Style
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Unisex Salon For Ladies Section */}
      <section className="py-14 sm:py-20 border-t border-border reveal-up reveal-delay-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-up reveal-delay-1">
            <p className="text-white/65 uppercase tracking-widest text-sm mb-4">Unisex Salon</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-bright mb-4">
              Ladies Services
            </h2>
            <p className="text-white/75 max-w-2xl mx-auto leading-relaxed">
              Hair, skin, and nail care crafted for modern women with premium in-salon treatments.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ladiesSalonServices.map((service) => (
              <div
                key={service.id}
                className="bg-card border border-border rounded-lg p-6 transition-smooth hover-lift hover:border-primary/50 reveal-up"
              >
                <h3 className="text-xl font-serif font-bold text-bright mb-3">{service.name}</h3>
                <p className="text-white/70 leading-relaxed text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academy Training Section */}
      <section className="py-20 border-t border-border bg-card reveal-up reveal-delay-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-up reveal-delay-1">
            <p className="text-white/65 uppercase tracking-widest text-sm mb-4">MG Studio Academy</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-bright mb-4">
              Tuition Classes
            </h2>
            <p className="text-white/75 max-w-2xl mx-auto leading-relaxed">
              Learn professional barbering and unisex salon skills with practical, chair-side training from our experienced team.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {academyTuitionClasses.map((course) => (
              <div
                key={course.id}
                className="bg-background border border-border rounded-lg p-6 transition-smooth hover-lift hover:border-primary/50 reveal-up"
              >
                <h3 className="text-lg font-serif font-bold text-bright mb-3">{course.name}</h3>
                <p className="text-white/70 leading-relaxed text-sm">{course.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border bg-card reveal-up reveal-delay-2">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-bright mb-6">
            Ready for a <span className="text-primary">Transformation</span>?
          </h2>
          <p className="text-white/75 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed">
            Book your appointment today and experience the MG STUDIO difference. 
            Premium grooming awaits.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto px-6 sm:px-10 h-12 sm:h-14 text-base sm:text-lg font-medium transition-smooth hover:-translate-y-0.5"
          >
            <Link href="/book">
              Book Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
