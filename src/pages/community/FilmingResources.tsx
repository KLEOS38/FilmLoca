
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, FileText, Film, Book, Users, ShieldCheck, ClipboardList, DollarSign, Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const FilmingResources = () => {
  const [activeResource, setActiveResource] = useState<'filmmaker' | 'owner' | null>(null);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Resources | Film Loca</title>
        <meta name="description" content="Access guides, templates, and resources for filmmakers and property owners." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow pt-14 pb-12">
          <div className="container mx-auto px-4">
            <div className="mb-8 mt-6 text-center">
              <h1 className="text-3xl font-bold mb-2">Resources</h1>
              <p className="text-muted-foreground">Guides, templates, and tools for filmmakers and property owners</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <Card className="p-6 flex flex-col gap-4 border-nollywood-primary/30 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-nollywood-primary/10 p-3 rounded-full">
                    <Film className="h-6 w-6 text-nollywood-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Filmmaker Resources</h2>
                    <p className="text-sm text-muted-foreground">
                      Explore production guides, templates, and directories covering location scouting, budgeting, and on-set logistics.
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    setActiveResource('filmmaker');
                    scrollToSection('resource-content');
                  }}
                >
                  View Filmmaker Resources
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Card>

              <Card className="p-6 flex flex-col gap-4 border-nollywood-primary/30 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-nollywood-primary/10 p-3 rounded-full">
                    <Home className="h-6 w-6 text-nollywood-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Property Owner Resources</h2>
                    <p className="text-sm text-muted-foreground">
                      Access checklists, protection guides, and earning tips crafted for loca owners hosting productions.
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    setActiveResource('owner');
                    scrollToSection('resource-content');
                  }}
                >
                  View Property Owner Resources
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Card>
            </div>
            
            {/* Resource Content */}
            <div id="resource-content">
              {activeResource === 'filmmaker' ? (
                <Tabs defaultValue="guides" className="w-full mb-12">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="guides">Guides</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="directory">Directory</TabsTrigger>
              </TabsList>
              
              {/* Guides Tab */}
              <TabsContent value="guides" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="overflow-hidden">
                    <div className="h-48 bg-muted overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                        alt="Location scouting" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <Book className="h-4 w-4 mr-2 text-nollywood-primary" />
                        <span className="text-sm text-muted-foreground">Production Guide</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Location Scouting: A Complete Guide</h3>
                      <p className="text-muted-foreground mb-4">
                        Learn how to effectively scout locations for your next film project, including what to look for and questions to ask.
                      </p>
                      <Button variant="outline" className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        Read Guide
                      </Button>
                    </div>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <div className="h-48 bg-muted overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1609190235242-5ce6fd470bb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                        alt="Film permits" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <FileText className="h-4 w-4 mr-2 text-nollywood-primary" />
                        <span className="text-sm text-muted-foreground">Legal Guide</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Film Permits & Regulations in Nigeria</h3>
                      <p className="text-muted-foreground mb-4">
                        Everything you need to know about obtaining film permits, regulations, and legal requirements for filming in Nigeria.
                      </p>
                      <Button variant="outline" className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        Read Guide
                      </Button>
                    </div>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <div className="h-48 bg-muted overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                        alt="Budget planning" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <Book className="h-4 w-4 mr-2 text-nollywood-primary" />
                        <span className="text-sm text-muted-foreground">Financial Guide</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Location Budgeting for Filmmakers</h3>
                      <p className="text-muted-foreground mb-4">
                        Tips and strategies for effectively budgeting location costs for your film production.
                      </p>
                      <Button variant="outline" className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        Read Guide
                      </Button>
                    </div>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <div className="h-48 bg-muted overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                        alt="Set design" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <Film className="h-4 w-4 mr-2 text-nollywood-primary" />
                        <span className="text-sm text-muted-foreground">Production Guide</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Set Design on a Budget</h3>
                      <p className="text-muted-foreground mb-4">
                        Practical tips for transforming filming locations with cost-effective set design techniques.
                      </p>
                      <Button variant="outline" className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        Read Guide
                      </Button>
                    </div>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <div className="h-48 bg-muted overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1598387846148-47e82ee120cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                        alt="Lighting setup" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <Film className="h-4 w-4 mr-2 text-nollywood-primary" />
                        <span className="text-sm text-muted-foreground">Technical Guide</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Lighting Techniques for On-Location Filming</h3>
                      <p className="text-muted-foreground mb-4">
                        Essential lighting setups and techniques to achieve professional results when filming on location.
                      </p>
                      <Button variant="outline" className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        Read Guide
                      </Button>
                    </div>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <div className="h-48 bg-muted overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                        alt="Location contracts" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <FileText className="h-4 w-4 mr-2 text-nollywood-primary" />
                        <span className="text-sm text-muted-foreground">Legal Guide</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Understanding Location Contracts</h3>
                      <p className="text-muted-foreground mb-4">
                        A breakdown of location contracts, including key terms, negotiation tips, and potential red flags.
                      </p>
                      <Button variant="outline" className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        Read Guide
                      </Button>
                    </div>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Templates Tab */}
              <TabsContent value="templates" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-muted p-3 rounded-lg mr-4">
                        <FileText className="h-6 w-6 text-nollywood-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Location Budget Template</h3>
                        <p className="text-sm text-muted-foreground">Excel, Google Sheets</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      A comprehensive spreadsheet to plan and track all your location-related expenses, including rental fees, permits, travel, and more.
                    </p>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Template
                    </Button>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-muted p-3 rounded-lg mr-4">
                        <FileText className="h-6 w-6 text-nollywood-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Location Agreement Template</h3>
                        <p className="text-sm text-muted-foreground">Word, PDF</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      A legally reviewed location agreement template that you can customize for your specific production needs.
                    </p>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Template
                    </Button>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-muted p-3 rounded-lg mr-4">
                        <FileText className="h-6 w-6 text-nollywood-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Location Scouting Checklist</h3>
                        <p className="text-sm text-muted-foreground">PDF, Word</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      A detailed checklist to help you evaluate potential filming locations, including technical, logistical, and aesthetic considerations.
                    </p>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Checklist
                    </Button>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-muted p-3 rounded-lg mr-4">
                        <FileText className="h-6 w-6 text-nollywood-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Call Sheet Template</h3>
                        <p className="text-sm text-muted-foreground">Excel, Google Sheets</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      A professional call sheet template with specific sections for location details, directions, and on-site logistics.
                    </p>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Template
                    </Button>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-muted p-3 rounded-lg mr-4">
                        <FileText className="h-6 w-6 text-nollywood-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Location Release Form</h3>
                        <p className="text-sm text-muted-foreground">PDF, Word</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      A standard release form granting permission to film at a location and use the footage in your production.
                    </p>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Form
                    </Button>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-muted p-3 rounded-lg mr-4">
                        <FileText className="h-6 w-6 text-nollywood-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Production Insurance Checklist</h3>
                        <p className="text-sm text-muted-foreground">PDF</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      A comprehensive checklist of insurance considerations for on-location filming to ensure proper coverage.
                    </p>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Checklist
                    </Button>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Directory Tab */}
              <TabsContent value="directory" className="mt-6">
                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Film Production Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Equipment Rental</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>CineGear Equipment Rentals</li>
                          <li>FilmEquip Services</li>
                          <li>LightCraft Production Services</li>
                        </ul>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Catering Services</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>FilmFeast Catering</li>
                          <li>On-Set Meals</li>
                          <li>CrewBites Nigeria</li>
                        </ul>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Transport & Logistics</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>FilmMoves Transport</li>
                          <li>SetLogistics Nigeria</li>
                          <li>Production Vehicles Ltd</li>
                        </ul>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Set Design & Construction</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>Creative Spaces Nigeria</li>
                          <li>SetCraft Designs</li>
                          <li>FilmBuild Construction</li>
                        </ul>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Costume & Wardrobe</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>FilmFashion Rentals</li>
                          <li>Costume Creations</li>
                          <li>Wardrobe Warriors</li>
                        </ul>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Makeup & Hair</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>On-Set Glamour</li>
                          <li>Film Face Artistry</li>
                          <li>Production Beauty Pros</li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Industry Organizations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Film Commissions & Regulatory Bodies</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>Nigerian Film Commission</li>
                          <li>National Film Commissions</li>
                          <li>National Film and Video Censors Board</li>
                        </ul>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Industry Associations</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>Directors Guild of Nigeria</li>
                          <li>Association of Movie Producers</li>
                          <li>Nigerian Society of Cinematographers</li>
                        </ul>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Education & Training</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>Nigerian Film Institute</li>
                          <li>PEFTI Film Institute</li>
                          <li>Del-York Creative Academy</li>
                        </ul>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Funding Organizations</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>Bank of Industry - NollyFund</li>
                          <li>Nigerian Film Corporation</li>
                          <li>Creative Industry Funding Programs</li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>
                </Tabs>
              ) : activeResource === 'owner' ? (
                <div className="border-t pt-10 mt-10">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">Property Owner Resources</h2>
                    <p className="text-muted-foreground">Toolkits and guides to help loca owners manage listings, protect their homes, and maximize earnings.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="p-6 flex flex-col gap-4">
                      <div className="bg-nollywood-primary/10 p-3 rounded-lg w-fit mx-auto">
                        <ClipboardList className="h-6 w-6 text-nollywood-primary" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-2">Host Playbook</h3>
                        <p className="text-sm text-muted-foreground">
                          Step-by-step guide that covers vetting bookings, preparing your property, and managing on-set expectations.
                        </p>
                      </div>
                      <Button variant="outline" className="mt-auto">
                        <FileText className="h-4 w-4 mr-2" />
                        Read Guide
                      </Button>
                    </Card>

                    <Card className="p-6 flex flex-col gap-4">
                      <div className="bg-nollywood-primary/10 p-3 rounded-lg w-fit mx-auto">
                        <ShieldCheck className="h-6 w-6 text-nollywood-primary" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-2">Protection & FUP</h3>
                        <p className="text-sm text-muted-foreground">
                          Understand the Filmloca Usage Protection (FUP) Program, damage deposits, and how to handle incident reports.
                        </p>
                      </div>
                      <Link to="/fup-program">
                        <Button variant="outline" className="w-full">
                          <ShieldCheck className="h-4 w-4 mr-2" />
                          Learn About FUP
                        </Button>
                      </Link>
                    </Card>

                    <Card className="p-6 flex flex-col gap-4">
                      <div className="bg-nollywood-primary/10 p-3 rounded-lg w-fit mx-auto">
                        <DollarSign className="h-6 w-6 text-nollywood-primary" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-2">Pricing & Earnings</h3>
                        <p className="text-sm text-muted-foreground">
                          Tips for setting daily rates, using damage deposits, and planning for maintenance or upgrade budgets.
                        </p>
                      </div>
                      <Button variant="outline" className="mt-auto">
                        <FileText className="h-4 w-4 mr-2" />
                        View Pricing Tips
                      </Button>
                    </Card>

                    <Card className="p-6 flex flex-col gap-4">
                      <div className="bg-nollywood-primary/10 p-3 rounded-lg w-fit mx-auto">
                        <Home className="h-6 w-6 text-nollywood-primary" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-2">Property Prep Checklist</h3>
                        <p className="text-sm text-muted-foreground">
                          A ready-to-use checklist that covers staging, safety, and hospitality touches before each slate.
                        </p>
                      </div>
                      <Button variant="outline" className="mt-auto">
                        <Download className="h-4 w-4 mr-2" />
                        Download Checklist
                      </Button>
                    </Card>
                  </div>
                </div>
              ) : (
                <div className="border border-dashed border-nollywood-primary/40 rounded-xl p-8 text-center text-muted-foreground">
                  <p>Select a resource category above to reveal tailored content for filmmakers or property owners.</p>
                </div>
              )}
            </div>

            {/* Anchor for direct navigation */}
            <div id="owner-resources" />
            
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default FilmingResources;
