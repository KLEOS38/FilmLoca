
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Info, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DamageDeposit = () => {
  return (
    <>
      <Helmet>
        <title>Damage Deposit | Film Loca</title>
        <meta name="description" content="Learn about damage deposits and how they protect property owners during filming bookings." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-nollywood-primary/10 py-12">
            <div className="container mx-auto px-4 text-center">
              <Shield className="h-16 w-16 text-nollywood-primary mx-auto mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Damage Deposit</h1>
              <p className="text-lg max-w-2xl mx-auto">
                A refundable security deposit that protects property owners and ensures accountability during filming.
              </p>
            </div>
          </section>
          
          {/* What is Damage Deposit */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">What is a Damage Deposit?</h2>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
                  <p className="text-muted-foreground mb-4">
                    A damage deposit is a <strong>refundable security deposit</strong> that filmmakers pay <strong>directly to property owners on the day of the shoot</strong>. This deposit serves as financial protection for property owners in case of accidental damage during filming.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                    <p className="text-blue-800 text-sm">
                      <strong>Important:</strong> The damage deposit is a <strong>direct transaction between filmmakers and property owners</strong>. FilmLoca is not involved in the collection, holding, or refund of damage deposits. The deposit amount is set by the property owner and is clearly displayed on each listing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">How It Works</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        For Filmmakers
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="font-semibold">1.</span>
                          <span>Review the damage deposit amount listed on the property</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-semibold">2.</span>
                          <span>Pay the damage deposit <strong>directly to the property owner on the day of the shoot</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-semibold">3.</span>
                          <span>After filming, property owner inspects for damage</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-semibold">4.</span>
                          <span>If no damage, property owner refunds the full deposit</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-semibold">5.</span>
                          <span>If damage occurs, repair costs are deducted from deposit by property owner</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-nollywood-primary" />
                        For Property Owners
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="font-semibold">1.</span>
                          <span>Set your damage deposit amount when listing your property</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-semibold">2.</span>
                          <span><strong>Collect the damage deposit directly from the filmmaker on the day of the shoot</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-semibold">3.</span>
                          <span>Inspect property after filming is complete</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-semibold">4.</span>
                          <span>If no damage, refund the full deposit to the filmmaker</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-semibold">5.</span>
                          <span>If damage occurs, deduct repair costs from deposit and refund the remainder</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Important Information */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Important Information</h2>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-blue-900 mb-1">Deposit Amount</p>
                        <p className="text-blue-800">
                          Damage deposit amounts vary by property and are set by the property owner. The amount is clearly displayed on each property listing.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-amber-900 mb-1">Payment on Day of Shoot</p>
                        <p className="text-amber-800">
                          The damage deposit is paid <strong>directly to the property owner on the day of the shoot</strong>, before filming begins. This is a direct transaction between the filmmaker and property owner. FilmLoca is not involved in this payment process.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-purple-900 mb-1">Damage Assessment</p>
                        <p className="text-purple-800">
                          After filming is complete, the property owner will inspect the property for any damage. If damage is found, the property owner and filmmaker should discuss and agree on repair costs. The property owner may deduct repair costs from the deposit and refund the remainder.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-green-900 mb-1">Refund Process</p>
                        <p className="text-green-800">
                          If no damage is found, the property owner should refund the full deposit to the filmmaker. The refund timeline and method are agreed upon between the filmmaker and property owner. FilmLoca does not handle or process these refunds.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What's Covered */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">What's Covered by Damage Deposit</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Accidental Damage</h3>
                      <p className="text-sm text-muted-foreground">Scratches, dents, stains, or marks caused during filming</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Wall Damage</h3>
                      <p className="text-sm text-muted-foreground">Holes, marks, or paint damage from equipment or props</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Furniture Damage</h3>
                      <p className="text-sm text-muted-foreground">Damage to furniture, fixtures, or decorative items</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Flooring Damage</h3>
                      <p className="text-sm text-muted-foreground">Scratches, stains, or damage to floors and carpets</p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-red-900 mb-1">Not Covered</p>
                      <p className="text-red-800 text-sm">
                        Normal wear and tear, pre-existing damage, or damage from natural disasters.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Additional Protection */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Additional Protection</h2>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <p className="text-muted-foreground mb-4">
                    Property owners who qualify may also be eligible for the <strong>Filmloca Usage Protection (FUP) Program</strong>, which provides additional coverage beyond the damage deposit for verified and active hosts. The FUP Program is separate from the damage deposit and is handled by FilmLoca.
                  </p>
                  <Link to="/fup-program">
                    <Button variant="outline">Learn More About FUP Program</Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-10 bg-nollywood-primary/5">
            <div className="container mx-auto px-4 text-center">
              <Info className="h-12 w-12 text-nollywood-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Have Questions About Damage Deposits?</h2>
              <p className="max-w-2xl mx-auto mb-6">
                If you have any questions about damage deposits or need assistance, our support team is here to help.
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

export default DamageDeposit;

