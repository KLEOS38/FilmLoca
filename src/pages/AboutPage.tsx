
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Camera, Users, Shield, Award, Clock, CreditCard } from 'lucide-react';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About FilmLoca | How We Connect Filmmakers with Perfect Venues</title>
        <meta name="description" content="Learn how FilmLoca verifies filming locations and ensures a safe, reliable experience for filmmakers across Nigeria." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-nollywood-primary/5 py-12 md:py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">About FilmLoca</h1>
                <p className="text-xl text-muted-foreground mb-8">
                  We're on a mission to transform how Nollywood filmmakers discover and secure perfect filming locations across Nigeria.
                </p>
              </div>
            </div>
          </section>
          
          {/* Our Story */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Story</h2>
                  <p className="mb-4">
                    FilmLoca was born from a simple observation: Nigeria's film industry, the second largest film industry in the world by volume, lacked a reliable marketplace for filming locations.
                  </p>
                  <p className="mb-4">
                    Founded in 2023 by a team of film industry veterans and tech entrepreneurs, we've built a global platform dedicated to connecting filmmakers with verified, high-quality filming locations across the world.
                  </p>
                  <p>
                    Our platform makes it easy for filmmakers to discover unique locations while giving property owners a simple way to earn income by renting their spaces to production teams.
                  </p>
                </div>
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1585951237318-9ea5e175b891?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                    alt="Nollywood film crew" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </section>
          
          {/* Our Process */}
          <section className="py-12 md:py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Process</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  We've developed a thorough process to ensure every location on our platform meets the needs of Nollywood filmmakers.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="bg-nollywood-primary/10 p-4 rounded-full inline-flex mb-4">
                    <Camera className="h-8 w-8 text-nollywood-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Verification</h3>
                  <p className="text-muted-foreground">
                    Every premium location is physically inspected by our team to ensure photos accurately represent the space.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="bg-nollywood-primary/10 p-4 rounded-full inline-flex mb-4">
                    <Users className="h-8 w-8 text-nollywood-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Filmmaker Feedback</h3>
                  <p className="text-muted-foreground">
                    We collect reviews from industry professionals who have filmed at each location to help you make informed decisions.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="bg-nollywood-primary/10 p-4 rounded-full inline-flex mb-4">
                    <Shield className="h-8 w-8 text-nollywood-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Secure Booking</h3>
                  <p className="text-muted-foreground">
                    Our platform handles all payments and contracts, protecting both filmmakers and property owners.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Why Choose Us */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Choose FilmLoca</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  We've built features specifically designed for the unique needs of the Nigerian film industry.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="mx-auto bg-nollywood-secondary/10 p-4 rounded-full inline-flex mb-4">
                    <Award className="h-6 w-6 text-nollywood-secondary" />
                  </div>
                  <h3 className="font-semibold mb-2">Industry Expertise</h3>
                  <p className="text-sm text-muted-foreground">Created by film industry veterans who understand production needs</p>
                </div>
                
                <div className="text-center">
                  <div className="mx-auto bg-nollywood-secondary/10 p-4 rounded-full inline-flex mb-4">
                    <Shield className="h-6 w-6 text-nollywood-secondary" />
                  </div>
                  <h3 className="font-semibold mb-2">Verified Locations</h3>
                  <p className="text-sm text-muted-foreground">Every premium listing is physically verified by our team</p>
                </div>
                
                <div className="text-center">
                  <div className="mx-auto bg-nollywood-secondary/10 p-4 rounded-full inline-flex mb-4">
                    <Clock className="h-6 w-6 text-nollywood-secondary" />
                  </div>
                  <h3 className="font-semibold mb-2">Save Time</h3>
                  <p className="text-sm text-muted-foreground">Find locations faster with our detailed search and filters</p>
                </div>
                
                <div className="text-center">
                  <div className="mx-auto bg-nollywood-secondary/10 p-4 rounded-full inline-flex mb-4">
                    <CreditCard className="h-6 w-6 text-nollywood-secondary" />
                  </div>
                  <h3 className="font-semibold mb-2">Secure Payments</h3>
                  <p className="text-sm text-muted-foreground">Funds only released to hosts after successful check-in</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* CTA */}
          <section className="py-12 md:py-16 bg-nollywood-dark text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Production Process?</h2>
              <p className="text-lg max-w-2xl mx-auto mb-8">
                Join hundreds of Nollywood filmmakers who are discovering perfect filming locations with ease.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/locations">
                  <Button size="lg" className="bg-nollywood-primary hover:bg-[#e5e5e5] text-white">
                    Browse Locations
                  </Button>
                </Link>
                <Link to="/auth?tab=signup">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Sign Up Now
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
