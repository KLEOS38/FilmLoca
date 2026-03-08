
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Clapperboard, BarChart, BookOpen, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const ForFilmmakers = () => {
  return (
    <>
      <Helmet>
        <title>For Filmmakers | Film Loca</title>
        <meta name="description" content="Discover how Film Loca can help you find the perfect locations for your next production." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative">
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <div 
              className="h-[400px] bg-cover bg-center"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')" 
              }}
            ></div>
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Find Perfect Locations for Your Next Production</h1>
                  <p className="text-xl text-white mb-8">Film Loca helps filmmakers discover, book, and manage amazing filming locations.</p>
                  <Link to="/locations">
                    <Button size="lg" className="bg-nollywood-primary hover:bg-[#e5e5e5] text-white">
                      Browse Locations
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          
          {/* Benefits Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Why Filmmakers Choose Us</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-nollywood-primary/10 p-4 rounded-full mb-4">
                      <Clapperboard className="h-8 w-8 text-nollywood-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Verified Locations</h3>
                    <p className="text-muted-foreground">
                      Every premium listing is verified by our team to ensure accuracy. What you see is what you get.
                    </p>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-nollywood-secondary/10 p-4 rounded-full mb-4">
                      <Clock className="h-8 w-8 text-nollywood-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Save Time</h3>
                    <p className="text-muted-foreground">
                      Filter locations by type, area, amenities, and price to quickly find exactly what your production needs.
                    </p>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-nollywood-accent/20 p-4 rounded-full mb-4">
                      <BarChart className="h-8 w-8 text-nollywood-accent" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Budget Control</h3>
                    <p className="text-muted-foreground">
                      Transparent pricing with no hidden fees helps you stay within your production budget.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </section>
          
          {/* How It Works */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How It Works</h2>
              
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <ol className="relative border-l border-nollywood-primary">
                      <li className="mb-10 ml-6">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-nollywood-primary rounded-full -left-4 text-white">1</span>
                        <div className="pl-6">
                          <h3 className="text-lg font-semibold mb-2">Search for Locations</h3>
                          <p className="text-muted-foreground">
                            Browse our extensive database of filming locations. Filter by location type, area, amenities, and budget.
                          </p>
                        </div>
                      </li>
                      <li className="mb-10 ml-6">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-nollywood-primary rounded-full -left-4 text-white">2</span>
                        <div className="pl-6">
                          <h3 className="text-lg font-semibold mb-2">Request to Book</h3>
                          <p className="text-muted-foreground">
                            Once you find the perfect location, check availability and booking the property.
                          </p>
                        </div>
                      </li>
                      <li className="mb-10 ml-6">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-nollywood-primary rounded-full -left-4 text-white">3</span>
                        <div className="pl-6">
                          <h3 className="text-lg font-semibold mb-2">Confirm Details</h3>
                          <p className="text-muted-foreground">
                            Discuss specific requirements with the property owner through our secure messaging system.
                          </p>
                        </div>
                      </li>
                      <li className="ml-6">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-nollywood-primary rounded-full -left-4 text-white">4</span>
                        <div className="pl-6">
                          <h3 className="text-lg font-semibold mb-2">Shoot Your Film</h3>
                          <p className="text-muted-foreground">
                            Arrive at the location, meet the host, and start filming. Our support team is always available if needed.
                          </p>
                        </div>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="flex items-center">
                    <img 
                      src="/3030.jpg" 
                      alt="Film crew on location" 
                      className="rounded-lg shadow-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          
          {/* Testimonials */}
          <section className="py-16 bg-nollywood-primary/5">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">What Filmmakers Say</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <blockquote className="flex-grow mb-4 italic text-muted-foreground">
                      "Film Loca saved us so much time on our last production. We found exactly what we needed within hours instead of days of scouting."
                    </blockquote>
                    <div className="mt-auto">
                      <p className="font-semibold">Sarah Johnson</p>
                      <p className="text-sm text-muted-foreground">Producer, "Urban Nights"</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <blockquote className="flex-grow mb-4 italic text-muted-foreground">
                      "The verification process gives me peace of mind. I know that what I see in the photos is what I'll get when I arrive at the location."
                    </blockquote>
                    <div className="mt-auto">
                      <p className="font-semibold">David Oyelowo</p>
                      <p className="text-sm text-muted-foreground">Director, "Magic Stories"</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <blockquote className="flex-grow mb-4 italic text-muted-foreground">
                      "As a small independent filmmaker, the budget templates and resources have been invaluable for planning our productions."
                    </blockquote>
                    <div className="mt-auto">
                      <p className="font-semibold">Chioma Adegoke</p>
                      <p className="text-sm text-muted-foreground">Independent Filmmaker</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-16 bg-nollywood-primary text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect Filming Location?</h2>
              <p className="text-xl max-w-2xl mx-auto mb-8">
                Join hundreds of filmmakers who are discovering amazing locations for their productions.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/auth?tab=signup">
                  <Button size="lg" variant="outline" className="border-white hover:bg-white/20 text-black">
                    Sign Up Now
                  </Button>
                </Link>
                <Link to="/locations">
                  <Button size="lg" className="bg-white text-nollywood-primary hover:bg-white/90">
                    Browse Locations
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

export default ForFilmmakers;
