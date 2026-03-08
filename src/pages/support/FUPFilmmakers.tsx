import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, CheckCircle, AlertCircle, Info, TrendingUp, Clock, FileCheck, DollarSign, Video, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FUPFilmmakers = () => {
  return (
    <>
      <Helmet>
        <title>FUP Program for Filmmakers - Filmloca Usage Protection | Film Loca</title>
        <meta name="description" content="Learn about the Filmloca Usage Protection (FUP) Program for filmmakers that helps cover accidental damages during approved bookings." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-nollywood-primary/10 py-12">
            <div className="container mx-auto px-4 text-center">
              <Shield className="h-16 w-16 text-nollywood-primary mx-auto mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Filmloca Usage Protection (FUP) Program</h1>
              <p className="text-lg max-w-2xl mx-auto">
                A goodwill program funded by Filmloca to help responsible filmmakers cover accidental damage during a confirmed Filmloca booking.
              </p>
              <Badge variant="secondary" className="mt-2">Filmmaker Edition</Badge>
            </div>
          </section>
          
          {/* What FUP Is */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">What FUP Is</h2>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
                  <p className="text-muted-foreground mb-4">
                    FUP is a goodwill program funded by Filmloca to help responsible filmmakers cover accidental damage during a confirmed Filmloca booking.
                  </p>
                  <div className="space-y-2">
                    <p className="text-muted-foreground flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      It is not insurance.
                    </p>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      It is not a guaranteed right.
                    </p>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      It can be paused or stopped at any time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* When FUP Applies */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">When FUP Applies</h2>
                <p className="text-muted-foreground mb-6">FUP only applies to damage that happens:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Inside a verified loca</h3>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">During an active slate (booking)</h3>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Inside a loca listed on Filmloca</h3>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-red-900 mb-1">Important:</p>
                      <p className="text-red-800">
                        No booking = No FUP
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mandatory Video Evidence */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                  <Video className="h-8 w-8 text-nollywood-primary" />
                  Mandatory Video Evidence
                </h2>
                <p className="text-muted-foreground mb-6">To qualify, you must show:</p>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <Video className="h-5 w-5 text-nollywood-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground">A <strong>pre-shoot video</strong> showing the clean condition of the item.</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <Video className="h-5 w-5 text-nollywood-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground">A <strong>post-shoot video</strong> showing the damage to the same item.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-amber-900 mb-1">Critical:</p>
                      <p className="text-amber-800">
                        If an item is not shown in the pre-shoot video, FUP cannot cover it.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What FUP Covers */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">What FUP Covers</h2>
                <p className="text-muted-foreground mb-6">Accidental damage to:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Furniture</h3>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Appliances</h3>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Fixtures and fittings</h3>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Doors, windows, handles, locks</h3>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Walls (holes, stains, cracks)</h3>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Any loca property visible in your pre-shoot video</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What FUP Does NOT Cover */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">What FUP Does NOT Cover</h2>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground">Items not shown in the pre-shoot video</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground">Crew or personal items</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground">Missing items / theft</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground">Reckless or intentional damage</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground">Damage outside the booked loca</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground">Cleaning fees</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground">Fake or inflated invoices</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Deposit Comes First */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                  <DollarSign className="h-8 w-8 text-nollywood-primary" />
                  Deposit Comes First
                </h2>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <p className="text-muted-foreground">
                    Your security deposit is used before FUP activates. FUP only covers the remaining verified balance.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FUP Tiers */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">FUP Tier Limits</h2>
                <p className="text-muted-foreground mb-8">This is a maximum limit, not a guaranteed payout.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Tier 1</span>
                        <Badge variant="secondary">Entry</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-nollywood-primary" />
                          <span className="text-sm text-muted-foreground">10+ successful slates</span>
                        </div>
                        <div className="text-2xl font-bold text-nollywood-primary">₦150,000</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Tier 2</span>
                        <Badge className="bg-nollywood-primary">Popular</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-nollywood-primary" />
                          <span className="text-sm text-muted-foreground">20+ successful slates</span>
                        </div>
                        <div className="text-2xl font-bold text-nollywood-primary">₦500,000</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Tier 3</span>
                        <Badge variant="secondary" className="bg-purple-100 text-purple-800">Premium</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-nollywood-primary" />
                          <span className="text-sm text-muted-foreground">30+ successful slates</span>
                        </div>
                        <div className="text-2xl font-bold text-nollywood-primary">₦1,000,000</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Second Payout Co-Pay */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Second Payout Onward — 15% Co-Pay</h2>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
                  <p className="text-muted-foreground mb-4">From your second FUP payout:</p>
                  <div className="space-y-2">
                    <p className="text-muted-foreground flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Filmloca pays 85%
                    </p>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      You pay 15%
                    </p>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Deposit is applied first
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Verification Process */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                  <FileCheck className="h-8 w-8 text-nollywood-primary" />
                  Verification Process
                </h2>
                <p className="text-muted-foreground mb-6">Filmloca must confirm:</p>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground">Clear video evidence</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground">Valid booking</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground">Real repair invoice</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground">Technician confirmation (if needed)</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="font-semibold text-blue-900 mb-1">Payment Schedule:</p>
                  <p className="text-blue-800">
                    Payouts are processed twice a year.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Cooldown */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                  <Clock className="h-8 w-8 text-nollywood-primary" />
                  Cooldown
                </h2>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <p className="text-muted-foreground">
                    After receiving FUP, you must complete <strong>8 successful new slates</strong> before requesting again.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Discretion Notice */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Discretion Notice</h2>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <p className="text-muted-foreground mb-4">
                    FUP is a goodwill program. Filmloca may approve, reduce, delay, or deny any request. FUP is not insurance or guaranteed protection.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-10 bg-nollywood-primary/5">
            <div className="container mx-auto px-4 text-center">
              <Info className="h-12 w-12 text-nollywood-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Have Questions About FUP?</h2>
              <p className="max-w-2xl mx-auto mb-6">
                If you have any questions about the FUP Program or need assistance, our team is here to help.
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

export default FUPFilmmakers;
