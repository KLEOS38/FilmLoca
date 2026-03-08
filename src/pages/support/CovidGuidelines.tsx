
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AlertTriangle, ShieldCheck, Thermometer, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const CovidGuidelines = () => {
  return (
    <>
      <Helmet>
        <title>COVID-19 Guidelines | Film Loca</title>
        <meta name="description" content="Learn about our COVID-19 safety protocols and guidelines for safe filming." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-nollywood-primary/10 py-12">
            <div className="container mx-auto px-4 text-center">
              <ShieldCheck className="h-16 w-16 text-nollywood-primary mx-auto mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold mb-4">COVID-19 Safety Guidelines</h1>
              <p className="text-lg max-w-2xl mx-auto">
                Keeping our film community safe with comprehensive health and safety protocols for on-location filming.
              </p>
            </div>
          </section>
          
          {/* Alert Banner */}
          <section className="py-6">
            <div className="container mx-auto px-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-amber-800">Important Notice</h3>
                    <p className="text-sm text-amber-800">
                      These guidelines are regularly updated to align with the latest health authority recommendations. Last updated: April 2025.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Core Guidelines */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8 text-center">Core Safety Measures</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-nollywood-primary/10 p-4 rounded-full mb-4">
                      <Thermometer className="h-8 w-8 text-nollywood-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Health Screening</h3>
                    <p className="text-muted-foreground">
                      Conduct daily health checks for cast and crew. Anyone with symptoms should not attend the shoot and should get tested.
                    </p>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-nollywood-secondary/10 p-4 rounded-full mb-4">
                      <Droplets className="h-8 w-8 text-nollywood-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Sanitization</h3>
                    <p className="text-muted-foreground">
                      Regular sanitization of equipment, props, and high-touch surfaces. Hand sanitizing stations should be available throughout the location.
                    </p>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-nollywood-accent/20 p-4 rounded-full mb-4">
                      <AlertTriangle className="h-8 w-8 text-nollywood-accent" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Risk Assessment</h3>
                    <p className="text-muted-foreground">
                      Complete a COVID-19 risk assessment for each production to identify and mitigate potential exposure risks.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </section>
          
          {/* Detailed Guidelines */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8 text-center">Detailed Guidelines for Film Productions</h2>
              
              <div className="max-w-4xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Pre-Production Planning</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Designate a COVID-19 compliance officer for productions with more than 10 people</li>
                        <li>Develop a health and safety plan specific to your production</li>
                        <li>Consider remote work for pre-production meetings when possible</li>
                        <li>Plan for extended timeframes to account for additional safety protocols</li>
                        <li>Create pods or zones to limit interaction between different departments</li>
                        <li>Establish clear protocols for what happens if someone develops symptoms</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>On Set Protocols</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Implement daily health screenings for all cast and crew</li>
                        <li>Maintain physical distancing when possible, especially during breaks</li>
                        <li>Wear appropriate PPE when physical distancing isn't possible</li>
                        <li>Sanitize equipment, props, and surfaces regularly</li>
                        <li>Limit the number of people on set to essential personnel only</li>
                        <li>Consider testing requirements based on production size and duration</li>
                        <li>Provide adequate ventilation in indoor filming locations</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Cast and Performers</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Consider testing requirements for performers who cannot wear PPE during filming</li>
                        <li>Minimize scenes requiring close physical contact when possible</li>
                        <li>Use consistent teams for scenes requiring close contact</li>
                        <li>Allow extra time for costume, hair, and makeup with enhanced protocols</li>
                        <li>Reduce the number of background performers when possible</li>
                        <li>Consider quarantine requirements for high-risk scenes</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Catering and Craft Services</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Avoid buffet-style service; provide individually packaged meals</li>
                        <li>Stagger meal times to reduce crowding</li>
                        <li>Set up outdoor eating areas when possible</li>
                        <li>Use disposable cutlery and plates</li>
                        <li>Ensure catering staff follow strict hygiene protocols</li>
                        <li>Provide individually wrapped snacks instead of open containers</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Location Guidelines</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Request thorough cleaning of the location before and after filming</li>
                        <li>Ensure adequate ventilation in indoor spaces</li>
                        <li>Provide multiple handwashing or sanitizing stations</li>
                        <li>Create one-way traffic flow when possible to minimize contact</li>
                        <li>Designate separate entry and exit points</li>
                        <li>Consider location size when determining crew capacity</li>
                        <li>Follow any additional protocols specific to the location</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </section>
          
          {/* Local Regulations */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8 text-center">Local Regulations and Resources</h2>
              
              <div className="bg-white p-6 rounded-lg shadow-sm max-w-4xl mx-auto">
                <p className="mb-4">
                  In addition to our guidelines, all productions must comply with local health authority regulations, which may vary by location.
                </p>
                
                <h3 className="text-lg font-semibold mb-2">Official Resources:</h3>
                <ul className="list-disc pl-5 space-y-2 mb-6">
                  <li><a href="#" className="text-nollywood-primary hover:underline">Nigerian Film Commission COVID-19 Guidelines</a></li>
                  <li><a href="#" className="text-nollywood-primary hover:underline">Local Health Departments</a></li>
                  <li><a href="#" className="text-nollywood-primary hover:underline">National Center for Disease Control (NCDC)</a></li>
                  <li><a href="#" className="text-nollywood-primary hover:underline">World Health Organization Guidelines</a></li>
                </ul>
                
                <div className="bg-nollywood-primary/5 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Production Insurance</h3>
                  <p className="mb-2">
                    We strongly recommend obtaining production insurance that includes COVID-19 coverage. Some insurance providers now offer specific policies for film productions during the pandemic.
                  </p>
                  <p>
                    Contact our partner insurance providers for quotes and information on available coverage options.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-10 bg-nollywood-primary/5">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl font-bold mb-4">Questions About COVID-19 Guidelines?</h2>
              <p className="max-w-2xl mx-auto mb-6">
                Our support team can help you navigate the current protocols and requirements for your production.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/help">
                  <Button variant="outline">Contact Support</Button>
                </Link>
                <Link to="/safety">
                  <Button>General Safety Guidelines</Button>
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

export default CovidGuidelines;
