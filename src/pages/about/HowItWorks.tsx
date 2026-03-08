
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Clapperboard, Home, ThumbsUp, DollarSign, Shield, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  return (
    <>
      <Helmet>
        <title>How It Works | FilmLoca</title>
        <meta name="description" content="Learn how FilmLoca connects filmmakers with perfect filming locations." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-nollywood-primary/10 py-16">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">How FilmLoca Works</h1>
              <p className="text-xl max-w-2xl mx-auto">
                FilmLoca is the marketplace that connects filmmakers with filming locations. Here's everything you need to know about our platform.
              </p>
            </div>
          </section>
          
          {/* For Filmmakers */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">For Filmmakers</h2>
                <p className="text-lg max-w-3xl mx-auto">
                  Find and book the perfect location for your next production in just a few simple steps.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-nollywood-primary/10 p-4 rounded-full mb-4">
                    <Search className="h-8 w-8 text-nollywood-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">1. Search Locations</h3>
                  <p className="text-muted-foreground">
                    Browse our extensive database of filming locations. Filter by location type, area, amenities, and budget.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="bg-nollywood-secondary/10 p-4 rounded-full mb-4">
                    <Home className="h-8 w-8 text-nollywood-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">2. Book with Confidence</h3>
                  <p className="text-muted-foreground">
                    Review location details, check availability, and submit a booking request. All premium listings are verified by our team.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="bg-nollywood-accent/20 p-4 rounded-full mb-4">
                    <Clapperboard className="h-8 w-8 text-nollywood-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">3. Shoot Your Film</h3>
                  <p className="text-muted-foreground">
                    Arrive at the location, meet the host, and start filming. After your shoot, leave a review to help the community.
                  </p>
                </div>
              </div>
              
              <div className="text-center mt-10">
                <Link to="/filmmakers">
                  <Button className="bg-nollywood-primary hover:bg-[#e5e5e5] text-white">
                    Learn More for Filmmakers
                  </Button>
                </Link>
              </div>
            </div>
          </section>
          
          {/* For Property Owners */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">For Property Owners</h2>
                <p className="text-lg max-w-3xl mx-auto">
                  List your property as a filming location and earn additional income.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-nollywood-primary/10 p-4 rounded-full mb-4">
                    <Home className="h-8 w-8 text-nollywood-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">1. List Your Property</h3>
                  <p className="text-muted-foreground">
                    Create a detailed listing with high-quality photos, description, amenities, and house rules for filming.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="bg-nollywood-secondary/10 p-4 rounded-full mb-4">
                    <ThumbsUp className="h-8 w-8 text-nollywood-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">2. Approve Bookings</h3>
                  <p className="text-muted-foreground">
                    Review booking requests from filmmakers and approve those that match your requirements and availability.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="bg-nollywood-accent/20 p-4 rounded-full mb-4">
                    <DollarSign className="h-8 w-8 text-nollywood-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">3. Earn Income</h3>
                  <p className="text-muted-foreground">
                    Host the film crew and receive payment securely through our platform once the filming is complete.
                  </p>
                </div>
              </div>
              
              <div className="text-center mt-10">
                <Link to="/homeowners">
                  <Button className="bg-nollywood-primary hover:bg-[#e5e5e5] text-white">
                    Learn More for Property Owners
                  </Button>
                </Link>
              </div>
            </div>
          </section>
          
          {/* Trust & Safety */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Trust & Safety</h2>
                <p className="text-lg max-w-3xl mx-auto">
                  FilmLoca is built on a foundation of trust and safety for both filmmakers and property owners.
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-1/2">
                  <ul className="space-y-6">
                    <li className="flex items-start">
                      <Shield className="h-6 w-6 text-nollywood-primary mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">Verified Listings</h3>
                        <p className="text-muted-foreground">Premium listings are physically verified by our team to ensure accuracy.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-6 w-6 text-nollywood-primary mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">Secure Payments</h3>
                        <p className="text-muted-foreground">Payments are processed securely and held until the filming is completed satisfactory.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-6 w-6 text-nollywood-primary mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">Insurance Requirements</h3>
                        <p className="text-muted-foreground">We nudge filmmakers to have appropriate insurance coverage for their shoots.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-6 w-6 text-nollywood-primary mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">User Verification</h3>
                        <p className="text-muted-foreground">We verify the identity of both filmmakers and property owners to create a trusted community.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="md:w-1/2">
                  <img 
                    src="/filmloca-12.jpg" 
                    alt="Trust & Safety" 
                    className="rounded-lg shadow-xl w-full h-auto"
                  />
                </div>
              </div>
              
              <div className="text-center mt-10">
                <Link to="/safety">
                  <Button className="bg-nollywood-primary hover:bg-[#e5e5e5] text-white">
                    Learn More About Safety
                  </Button>
                </Link>
              </div>
            </div>
          </section>
          
          {/* Fees & Pricing */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Fees & Pricing</h2>
                <p className="text-lg max-w-3xl mx-auto">
                  Transparent pricing with no hidden fees.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <Clapperboard className="h-8 w-8 text-nollywood-primary mr-3" />
                    <h3 className="text-xl font-semibold">For Filmmakers</h3>
                  </div>
                  
                  <ul className="space-y-4">
                    <li className="flex justify-between">
                      <span>Account Creation</span>
                      <span className="font-semibold">Free</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Service Fee</span>
                      <span className="font-semibold">Free</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Booking Processing</span>
                      <span className="font-semibold">Free</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Cancellation Fee</span>
                      <span className="font-semibold">Varies by policy</span>
                    </li>
                  </ul>
                  
                  <p className="text-sm text-muted-foreground mt-6">
                    The service fee helps us maintain the platform and provide customer support.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <Home className="h-8 w-8 text-nollywood-primary mr-3" />
                    <h3 className="text-xl font-semibold">For Property Owners</h3>
                  </div>
                  
                  <ul className="space-y-4">
                    <li className="flex justify-between">
                      <span>Listing Fee</span>
                      <span className="font-semibold">Free</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Commission</span>
                      <span className="font-semibold">15% of booking</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Property Verification</span>
                      <span className="font-semibold">Free</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Premium Listing</span>
                      <span className="font-semibold">Optional upgrade</span>
                    </li>
                  </ul>
                  
                  <p className="text-sm text-muted-foreground mt-6">
                    You only pay when you earn. Our commission is deducted automatically when you receive payment from a filmmaker.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              </div>
              
              <div className="max-w-3xl mx-auto">
                <div className="space-y-6">
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-semibold mb-2">How do I book a location?</h3>
                    <p className="text-muted-foreground">
                      Browse our listings and select the location you're interested in. Check the availability calendar, then click "Request to Book." The property owner will review your request and confirm if the location is available for your dates.
                    </p>
                  </div>
                  
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-semibold mb-2">How much can I earn from my property?</h3>
                    <p className="text-muted-foreground">
                      Earnings vary based on your property's size, location, uniqueness, and condition. Rates vary by location and market, with properties in major film production cities typically commanding higher rates. Visit our <Link to="/homeowners" className="text-nollywood-primary hover:underline">For Property Owners</Link> page for more details.
                    </p>
                  </div>
                  
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-semibold mb-2">What insurance is required for filming?</h3>
                    <p className="text-muted-foreground">
                      Filmmakers are encouraged to have general liability insurance that covers property damage and personal injury. Some locations may have specific insurance requirements, which will be listed on the location's page.
                    </p>
                  </div>
                  
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-semibold mb-2">How are payments handled?</h3>
                    <p className="text-muted-foreground">
                      All payments are processed securely through our platform. Filmmakers pay when their booking is confirmed, and funds are released to property owners after the filming is completed.
                    </p>
                  </div>
                  
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-semibold mb-2">Can I list multiple properties?</h3>
                    <p className="text-muted-foreground">
                      Yes, property owners can list multiple properties on FilmLoca. Each property will have its own listing, calendar, and settings.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">What if there's damage to my property?</h3>
                    <p className="text-muted-foreground">
                      All filmmakers are responsible to cover potential damages while shooting.
                    </p>
                  </div>
                </div>
                
                <div className="text-center mt-10">
                  <Link to="/help">
                    <Button variant="outline">
                      View All FAQs
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-16 bg-nollywood-primary text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-xl max-w-2xl mx-auto mb-8">
                Join FilmLoca today and be part of the community connecting filmmakers with amazing filming locations.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/locations">
                  <Button size="lg" variant="outline" className="border-white hover:bg-white/20 text-black">
                    Browse Locations
                  </Button>
                </Link>
                <Link to="/list-property">
                  <Button size="lg" className="bg-white text-nollywood-primary hover:bg-white/90">
                    List Your Property
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

export default HowItWorks;
