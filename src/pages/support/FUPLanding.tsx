import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Users, Home, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FUPLanding = () => {
  return (
    <>
      <Helmet>
        <title>FUP Program - Filmloca Usage Protection | Film Loca</title>
        <meta name="description" content="Choose the right Filmloca Usage Protection (FUP) Program for you - whether you're a property owner or filmmaker." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-nollywood-primary/10 py-12">
            <div className="container mx-auto px-4 text-center">
              <Shield className="h-16 w-16 text-nollywood-primary mx-auto mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Filmloca Usage Protection (FUP) Program</h1>
              <p className="text-lg max-w-2xl mx-auto mb-6">
                Choose the right protection plan for your role on Filmloca
              </p>
              <Badge variant="secondary" className="mb-8">Select Your Program</Badge>
            </div>
          </section>
          
          {/* Program Selection */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Property Owners Card */}
                  <Link to="/fup-program/property-owners">
                    <Card className="border-2 hover:border-nollywood-primary transition-colors cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-4">
                          <Home className="h-8 w-8 text-nollywood-primary" />
                          <CardTitle className="text-2xl">For Property Owners</CardTitle>
                        </div>
                        <p className="text-muted-foreground">
                          Protection plan that helps hosts cover the cost of accidental damages caused by filmmakers during approved bookings.
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4 mb-6">
                          <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm">Coverage for furniture, fixtures, and walls</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm">Tier-based protection up to ₦1,000,000</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm">Biannual payout schedule</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm">5+ successful bookings to qualify</p>
                            </div>
                          </div>
                        </div>
                        
                        <Button className="w-full">
                          View Property Owner FUP
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>

                  {/* Filmmakers Card */}
                  <Link to="/fup-program/filmmakers">
                    <Card className="border-2 hover:border-nollywood-primary transition-colors cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-4">
                          <Users className="h-8 w-8 text-nollywood-primary" />
                          <CardTitle className="text-2xl">For Filmmakers</CardTitle>
                        </div>
                        <p className="text-muted-foreground">
                          Goodwill program funded by Filmloca to help responsible filmmakers cover accidental damage during confirmed bookings.
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4 mb-6">
                          <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm">Mandatory video evidence required</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm">Tier-based limits up to ₦1,000,000</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm">15% co-pay from second payout</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm">10+ successful slates to qualify</p>
                            </div>
                          </div>
                        </div>
                        
                        <Button className="w-full">
                          View Filmmaker FUP
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                </div>

                {/* CTA Section */}
                <div className="mt-12">
                  <section className="py-10 bg-nollywood-primary/5">
                    <div className="container mx-auto px-4 text-center">
                      <h2 className="text-2xl font-bold mb-4">Have Questions About FUP?</h2>
                      <p className="max-w-2xl mx-auto mb-6">
                        If you have any questions about the FUP Program or need assistance, our team is here to help.
                      </p>
                      <Link to="/help">
                        <Button variant="outline">Contact Support</Button>
                      </Link>
                    </div>
                  </section>
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

export default FUPLanding;
