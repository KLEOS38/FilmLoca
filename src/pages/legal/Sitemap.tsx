
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";

const Sitemap = () => {
  return (
    <>
      <Helmet>
        <title>Sitemap | FilmLoca</title>
        <meta name="description" content="Explore all the pages and sections of the FilmLoca website with our comprehensive sitemap." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1">
          <section className="bg-nollywood-primary/10 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Sitemap</h1>
                <p className="text-lg text-muted-foreground mb-6">A complete map of our website to help you find what you need</p>
                <div className="flex justify-center">
                  <MapPin className="h-16 w-16 text-nollywood-primary" />
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Main Pages</h2>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/" className="hover:text-gray-600 hover:underline">Home</Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/locations" className="hover:text-gray-600 hover:underline">Browse Locations</Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/list-property" className="hover:text-gray-600 hover:underline">List Your Property</Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/about" className="hover:text-gray-600 hover:underline">About Us</Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/auth" className="hover:text-gray-600 hover:underline">Login/Sign Up</Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/profile" className="hover:text-gray-600 hover:underline">My Profile</Link>
                      </li>
                    </ul>
                    
                    <Separator className="my-6" />
                    
                    <h2 className="text-2xl font-bold mb-6">Support</h2>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/help" className="hover:text-nollywood-primary hover:underline">Help Center</Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/safety" className="hover:text-nollywood-primary hover:underline">Safety Information</Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/cancellation" className="hover:text-nollywood-primary hover:underline">Cancellation Options</Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/fup-program" className="hover:text-nollywood-primary hover:underline">FUP Program</Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/covid" className="hover:text-nollywood-primary hover:underline">COVID-19 Guidelines</Link>
                      </li>
                    </ul>
                    
                    <Separator className="my-6" />
                    
                    <h2 className="text-2xl font-bold mb-6">Legal</h2>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/privacy" className="hover:text-nollywood-primary hover:underline">Privacy Policy</Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/terms" className="hover:text-nollywood-primary hover:underline">Terms of Service</Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/sitemap" className="hover:text-nollywood-primary hover:underline">Sitemap</Link>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Community</h2>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/filmmakers" className="hover:text-nollywood-primary hover:underline">For Filmmakers</Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/homeowners" className="hover:text-nollywood-primary hover:underline">For Property Owners</Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/forum" className="hover:text-nollywood-primary hover:underline">Community Forum</Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/resources" className="hover:text-nollywood-primary hover:underline">Filming Resources</Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/damage-deposit" className="hover:text-nollywood-primary hover:underline">Damage Deposit</Link>
                      </li>
                    </ul>
                    
                    <Separator className="my-6" />
                    
                    <h2 className="text-2xl font-bold mb-6">About</h2>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/how-it-works" className="hover:text-nollywood-primary hover:underline">How it Works</Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/news" className="hover:text-nollywood-primary hover:underline">Newsroom</Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/investors" className="hover:text-nollywood-primary hover:underline">Investors</Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/careers" className="hover:text-nollywood-primary hover:underline">Careers</Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/our-company" className="hover:text-nollywood-primary hover:underline">Our Company</Link>
                      </li>
                    </ul>
                    
                    <Separator className="my-6" />
                    
                    <h2 className="text-2xl font-bold mb-6">Location Categories</h2>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/locations?type=residential" className="hover:text-nollywood-primary hover:underline">Residential</Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/locations?type=commercial" className="hover:text-nollywood-primary hover:underline">Commercial</Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/locations?type=outdoor" className="hover:text-nollywood-primary hover:underline">Outdoor</Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/locations?type=specialized" className="hover:text-nollywood-primary hover:underline">Specialized</Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/locations?area=lagos-island" className="hover:text-nollywood-primary hover:underline">Lagos Island</Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/locations?area=lagos-mainland" className="hover:text-nollywood-primary hover:underline">Lagos Mainland</Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/locations?area=lekki" className="hover:text-nollywood-primary hover:underline">Lekki</Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/locations?area=ikoyi" className="hover:text-nollywood-primary hover:underline">Ikoyi</Link>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                        <Link to="/locations?area=victoria-island" className="hover:text-nollywood-primary hover:underline">Victoria Island</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <Separator className="my-10" />
                
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold mb-6">XML Sitemap</h2>
                  <p>For search engines and automated tools, we provide an XML sitemap that lists all publicly accessible pages on our website.</p>
                  <p>You can access our XML sitemap at: <a href="#" className="text-nollywood-primary hover:underline">https://www.nollywoodlocations.com/sitemap.xml</a></p>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Sitemap;
