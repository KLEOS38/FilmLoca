
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Check, AlertTriangle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SafetyInfo = () => {
  return (
    <>
      <Helmet>
        <title>Safety Information | Film Loca</title>
        <meta name="description" content="Learn about our safety measures and guidelines to ensure a secure filming experience." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-nollywood-primary/10 py-12">
            <div className="container mx-auto px-4 text-center">
              <Shield className="h-16 w-16 text-nollywood-primary mx-auto mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Safety Is Our Priority</h1>
              <p className="text-lg max-w-2xl mx-auto">
                At Film Loca, we've implemented comprehensive measures to ensure the safety and security of all our users.
              </p>
            </div>
          </section>
          
          {/* Safety Features */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8 text-center">Our Safety Measures</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="bg-nollywood-primary/10 p-4 rounded-full mb-4 inline-block">
                    <Check className="h-6 w-6 text-nollywood-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Verified Listings</h3>
                  <p className="text-muted-foreground">
                    All premium listings are verified by our team to ensure accuracy and legitimacy. We check that the location matches the description and photos.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="bg-nollywood-primary/10 p-4 rounded-full mb-4 inline-block">
                    <Check className="h-6 w-6 text-nollywood-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>
                  <p className="text-muted-foreground">
                    All transactions are processed through our secure payment system. Funds are only released to property owners after you've confirmed check-in.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="bg-nollywood-primary/10 p-4 rounded-full mb-4 inline-block">
                    <Check className="h-6 w-6 text-nollywood-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Identity Verification</h3>
                  <p className="text-muted-foreground">
                    We verify the identity of both filmmakers and property owners to reduce the risk of fraud.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Safety Guidelines */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-1/2">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Safety Guidelines for Filmmakers</h2>
                  <p className="mb-6">
                    We recommend following these guidelines to ensure a safe and productive filming experience:
                  </p>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">Always Do a Site Visit</h3>
                        <p className="text-muted-foreground">When possible, visit the location before booking to ensure it meets your production needs.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">Check Reviews</h3>
                        <p className="text-muted-foreground">Read reviews from other filmmakers who have used the location before booking.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">Get Everything in Writing</h3>
                        <p className="text-muted-foreground">Ensure all agreements, permissions, and restrictions are clearly documented.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">Secure Insurance</h3>
                        <p className="text-muted-foreground">Always have proper production insurance to cover potential incidents during filming.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="md:w-1/2">
                  <img 
                    src="/2020.jpg" 
                    alt="Safety guidelines for filmmakers" 
                    className="rounded-lg shadow-xl w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8 text-center">Safety FAQs</h2>
              
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How does Film Loca verify locations?</AccordionTrigger>
                    <AccordionContent>
                      Our verification process includes checking property ownership documents, physical inspection of premium listings, and verification of the property owner's identity. We ensure that locations match their descriptions and photos.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What should I do if there's a safety issue at a location?</AccordionTrigger>
                    <AccordionContent>
                      If you encounter any safety issues, contact our support team immediately. For emergencies, contact local authorities first, then inform us about the situation so we can take appropriate action.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Is my payment secure?</AccordionTrigger>
                    <AccordionContent>
                      Yes, all payments are processed through our secure payment system with industry-standard encryption. Funds are held securely until you check in at the location, providing protection against fraud.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>What insurance is recommended for filming?</AccordionTrigger>
                    <AccordionContent>
                      We recommend having general liability insurance, equipment insurance, and production insurance. Some locations may require specific coverage amounts, which will be listed in their requirements.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-10 bg-nollywood-primary/5">
            <div className="container mx-auto px-4 text-center">
              <HelpCircle className="h-12 w-12 text-nollywood-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Hello There!</h2>
              <p className="max-w-2xl mx-auto mb-6">
                If you have any questions or concerns about safety, our team is here to help you.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/help">
                  <Button variant="outline">Contact Support</Button>
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

export default SafetyInfo;
