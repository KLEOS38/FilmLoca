
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, CheckCircle, AlertCircle, Info, TrendingUp, Clock, FileCheck, DollarSign } from "lucide-react";
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

const FUPProgram = () => {
  return (
    <>
      <Helmet>
        <title>FUP Program for Property Owners - Filmloca Usage Protection | Film Loca</title>
        <meta name="description" content="Learn about the Filmloca Usage Protection (FUP) Program that helps property owners cover accidental damages during approved bookings." />
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
                A goodwill program that helps property owners cover the cost of accidental damages caused by filmmakers during approved bookings.
              </p>
              <Badge variant="secondary" className="mt-2">Property Owner Edition</Badge>
            </div>
          </section>
          
          {/* What FUP Is */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">What FUP Is</h2>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
                  <p className="text-muted-foreground mb-4">
                    The Filmloca Usage Protection (FUP) Program is a goodwill program that helps hosts (loca owners) cover the cost of accidental damages caused by filmmakers during approved bookings ("slates").
                  </p>
                  <p className="text-muted-foreground">
                    It's not insurance, but a support fund that rewards verified and active Filmloca users with coverage against damage to their property specifically furniture, fixtures, and walls after standard investigation and verification. FUP does not replace or diminish the primary financial responsibility of the filmmaker for damages they cause.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* What It Covers */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">What It Covers</h2>
                <p className="text-muted-foreground mb-6">FUP covers:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Wall marks, holes, or repainting needs</h3>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Spoils or stains on chairs, tables, or sofas</h3>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Dents or scratches on furniture and appliances</h3>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Other physical damage within the shooting area</h3>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-amber-900 mb-1">Important:</p>
                      <p className="text-amber-800">
                        FUP coverage applies only after the damage deposit (paid by the filmmaker) has been used. FUP steps in only for damages beyond the value of the deposit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Who Qualifies */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Who Qualifies</h2>
                <p className="text-muted-foreground mb-6">To qualify for FUP:</p>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground">Your location must be <strong>FUP verified</strong> (checked by Filmloca's team).</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground">You must have <strong>no active disputes</strong> or fraud reports.</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground">You must have completed at least <strong>5 successful slates</strong> (confirmed, completed bookings).</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FUP Tiers */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">FUP Tiers and Payouts</h2>
                <p className="text-muted-foreground mb-8">Protection and rewards increase as you grow on the platform.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Tier 1 (Starter)</span>
                        <Badge variant="secondary">Entry</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-nollywood-primary" />
                          <span className="text-sm text-muted-foreground">5+ successful slates</span>
                        </div>
                        <div className="text-2xl font-bold text-nollywood-primary">₦150,000</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Tier 2 (Growth)</span>
                        <Badge className="bg-nollywood-primary">Popular</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-nollywood-primary" />
                          <span className="text-sm text-muted-foreground">10+ successful slates</span>
                        </div>
                        <div className="text-2xl font-bold text-nollywood-primary">₦500,000</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Tier 3 (Platinum)</span>
                        <Badge variant="secondary" className="bg-purple-100 text-purple-800">Premium</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-nollywood-primary" />
                          <span className="text-sm text-muted-foreground">20+ successful slates</span>
                        </div>
                        <div className="text-2xl font-bold text-nollywood-primary">₦1,000,000</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <p className="text-sm text-muted-foreground mt-6 text-center">
                  Each "slate" refers to one completed booking that ends without disputes or cancellations.
                </p>
              </div>
            </div>
          </section>

          {/* When Payments Are Made */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">When Payments Are Made</h2>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <p className="text-muted-foreground mb-4">
                    FUP payouts are made only <strong>twice a year (biannually)</strong>, after internal review. Payments are not automatic each claim is investigated and must be supported with a verified invoice. All invoices must be cross-checked by Filmloca technicians to confirm that the cost of repair matches the actual damage.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Cooldown Rule */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                  <Clock className="h-8 w-8 text-nollywood-primary" />
                  Cooldown Rule (Protection Buffer)
                </h2>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <p className="text-muted-foreground">
                    After receiving one FUP payout, a host must complete <strong>6 new successful bookings</strong> before they can access FUP again. This period is called the cooldown period or buffer period.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Co-Pay */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                  <DollarSign className="h-8 w-8 text-nollywood-primary" />
                  Co-Pay (Shared Contribution)
                </h2>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
                  <p className="text-muted-foreground mb-4">
                    On your second FUP payout, you must contribute <strong>15% of the approved claim amount</strong>. This co-pay can either be deducted from your payout (Filmloca pays 85%), or paid upfront before your payout is processed.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                    <p className="font-semibold text-blue-900 mb-2">Example:</p>
                    <p className="text-blue-800">
                      If your approved claim is ₦200,000, Filmloca pays ₦170,000 and you contribute ₦30,000.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Example Scenario */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Example Scenario</h2>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <p className="text-muted-foreground">
                    Host A gets their first FUP payout of ₦150,000 for wall damage. They must complete 6 new bookings before qualifying for another payout. After the 6 bookings, they claim ₦200,000 in new damages. Filmloca verifies the invoice, approves it, and applies a 15% co-pay, paying ₦170,000.
                  </p>
                </div>
              </div>
            </div>
          </section>


          {/* Verification & Invoicing */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                  <FileCheck className="h-8 w-8 text-nollywood-primary" />
                  Verification & Invoicing
                </h2>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <p className="text-muted-foreground mb-4">Before any payout:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Damage must be verified by Filmloca's inspection team.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Repairs or replacements must be supported by an invoice.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Technicians review all invoices to ensure no inflation or false claims.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Only the verified invoice value is covered.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Disclaimers */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Disclaimers</h2>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>FUP is a privilege, not a right.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>Filmloca reserves the right to deny, reduce, or delay any claim after investigation.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>FUP does not cover personal items, cash, theft, or non-accidental damages.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>Repeated false claims or negligence can lead to loss of eligibility or delisting.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>All payouts are subject to verification and discretion by Filmloca.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Key Summary */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Key Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <p className="font-semibold mb-1">Damage Coverage:</p>
                    <p className="text-sm text-muted-foreground">Furniture, fixtures, walls only after deposit use</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <p className="font-semibold mb-1">Payout Frequency:</p>
                    <p className="text-sm text-muted-foreground">Twice a year</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <p className="font-semibold mb-1">Cooldown:</p>
                    <p className="text-sm text-muted-foreground">6 successful bookings between payouts</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <p className="font-semibold mb-1">Co-Pay (Second Payout):</p>
                    <p className="text-sm text-muted-foreground">15% host contribution</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <p className="font-semibold mb-1">Verification:</p>
                    <p className="text-sm text-muted-foreground">Technician-inspected invoice required</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <p className="font-semibold mb-1">Emergency Exception:</p>
                    <p className="text-sm text-muted-foreground">Allowed, still counts as first payout</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <p className="font-semibold mb-1">Tiers:</p>
                    <p className="text-sm text-muted-foreground">₦150k, ₦500k, ₦1m (based on bookings)</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <p className="font-semibold mb-1">Eligibility:</p>
                    <p className="text-sm text-muted-foreground">FUP-verified property, no disputes</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mt-4">
                  <p className="font-semibold mb-1">Disclaimer:</p>
                  <p className="text-sm text-muted-foreground">Not a right; depends on investigation and approval.</p>
                </div>
              </div>
            </div>
          </section>

          {/* In Plain Language */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">In Plain Language</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <p className="text-muted-foreground mb-4">
                    FUP is like Filmloca's promise to have your back when something goes wrong but only after you've proven reliability and used your deposit first.
                  </p>
                  <p className="text-muted-foreground">
                    It rewards trust, accountability, and good partnership on the platform not carelessness. The more you host successfully, the more protection you earn.
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

export default FUPProgram;

