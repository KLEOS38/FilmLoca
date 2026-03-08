
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Clock, AlertTriangle, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CancellationOptions = () => {
  return (
    <>
      <Helmet>
        <title>Cancellation Options | Film Loca</title>
        <meta name="description" content="Learn about our cancellation policies and how to cancel your slate." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-nollywood-primary/10 py-12">
            <div className="container mx-auto px-4 text-center">
              <Calendar className="h-16 w-16 text-nollywood-primary mx-auto mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Cancellation</h1>
              <p className="text-lg max-w-2xl mx-auto">
                We understand that plans can change. Learn about our cancellation policy below to help you manage your slates.
              </p>
            </div>
          </section>
          
          {/* Cancellation Types */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8 text-center">Our Cancellation Policy</h2>
              
              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Only cancellations that fall within our stated tiers will be approved.
                  </p>
                </div>
              </div>

              {/* Cancellation Tiers */}
              <div className="mt-12 max-w-4xl mx-auto">
                <h3 className="text-xl font-semibold mb-6 text-center">Simple Cancellation Tiers</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <h4 className="font-semibold text-green-800 mb-3">72+ Hours Notice</h4>
                    <p className="text-2xl font-bold text-green-700 mb-2">85% Refund</p>
                    <p className="text-sm text-green-600">15% processing fee only</p>
                    <div className="mt-3 text-xs text-green-500">✓ Promptly processed</div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                    <h4 className="font-semibold text-yellow-800 mb-3">24-72 Hours Notice</h4>
                    <p className="text-2xl font-bold text-yellow-700 mb-2">50% Refund</p>
                    <p className="text-sm text-yellow-600">Property compensation</p>
                    <div className="mt-3 text-xs text-yellow-500">✓ Promptly processed</div>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <h4 className="font-semibold text-red-800 mb-3">Less than 24 Hours</h4>
                    <p className="text-2xl font-bold text-red-700 mb-2">No Refund</p>
                    <p className="text-sm text-red-600">Property reserved</p>
                    <div className="mt-3 text-xs text-red-500">✗ No refund available</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* How to Cancel */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8 text-center">How to Cancel a Slate</h2>
              
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-6 flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-nollywood-primary" />
                      For Filmmakers
                    </h3>
                    
                    <ol className="list-decimal ml-5 space-y-4">
                      <li className="pl-2">
                        <span className="font-medium">Go to your account dashboard</span>
                        <p className="text-muted-foreground mt-1">Sign in to your Film Loca account and click on "My Slates" in your dashboard.</p>
                      </li>
                      <li className="pl-2">
                        <span className="font-medium">Find the slate you want to cancel</span>
                        <p className="text-muted-foreground mt-1">Locate the specific slate in your list of upcoming reservations.</p>
                      </li>
                      <li className="pl-2">
                        <span className="font-medium">Click the edit button</span>
                        <p className="text-muted-foreground mt-1">Click the edit icon on the slate card to reveal cancellation options.</p>
                      </li>
                      <li className="pl-2">
                        <span className="font-medium">Click "Cancellation" button</span>
                        <p className="text-muted-foreground mt-1">Select the cancellation button to proceed with refund calculation.</p>
                      </li>
                      <li className="pl-2">
                        <span className="font-medium">Confirm cancellation</span>
                        <p className="text-muted-foreground mt-1">Review the refund amount and confirm the cancellation in the popup dialog.</p>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-6 flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-nollywood-primary" />
                      For Property Owners
                    </h3>
                    
                    <ol className="list-decimal ml-5 space-y-4">
                      <li className="pl-2">
                        <span className="font-medium">Access your host dashboard</span>
                        <p className="text-muted-foreground mt-1">Sign in to your Film Loca account and go to "Upcoming Slates".</p>
                      </li>
                      <li className="pl-2">
                        <span className="font-medium">Select the relevant slate</span>
                        <p className="text-muted-foreground mt-1">Find the slate you need to cancel in your upcoming reservations.</p>
                      </li>
                      <li className="pl-2">
                        <span className="font-medium">Choose "Cancel Reservation"</span>
                        <p className="text-muted-foreground mt-1">Select a cancellation reason from the available options.</p>
                      </li>
                      <li className="pl-2">
                        <span className="font-medium">Provide additional information</span>
                        <p className="text-muted-foreground mt-1">Explain the circumstances of the cancellation to the filmmaker.</p>
                      </li>
                      <li className="pl-2">
                        <span className="font-medium">Review cancellation terms</span>
                        <p className="text-muted-foreground mt-1">Understand any penalties that may apply for host cancellations.</p>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How quickly will I receive my refund?</AccordionTrigger>
                    <AccordionContent>
                      Refunds are processed according to our discretion and documentation requirements. Standard cancellations (72+ hours) typically process faster, while industry exceptions require proper documentation review. All refunds are issued to the original payment method.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Can I get a full refund if I need to cancel due to an emergency?</AccordionTrigger>
                    <AccordionContent>
                      Industry emergencies may qualify for exceptions subject to FilmLoca's discretion and proper documentation. Weather alerts, permit issues, and other industry-specific emergencies will be reviewed on a case-by-case basis with appropriate documentation required.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>What happens if the property owner cancels my slate?</AccordionTrigger>
                    <AccordionContent>
                      If a property owner cancels your slate, you will receive a full refund regardless of the cancellation policy. We'll also provide assistance in finding an alternative location for your shoot and may offer additional compensation for the inconvenience.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Can I change the dates instead of cancelling?</AccordionTrigger>
                    <AccordionContent>
                      Yes, free rescheduling is available up to 24 hours before the shoot (subject to availability). Less than 24 hours: 15% rescheduling fee. Same day changes: 25% fee. Log into your account, go to "My Slates," select the slate, and click "Request Date Change."
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>What if I need to cancel due to bad weather?</AccordionTrigger>
                    <AccordionContent>
                      Extreme weather warnings qualify for a full refund if you provide official weather service alerts. This applies to outdoor shoots where weather conditions directly impact filming safety or quality.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-6">
                    <AccordionTrigger>Do you offer different cancellation terms for film productions?</AccordionTrigger>
                    <AccordionContent>
                      Yes! Our policy is specifically designed for the film industry with flexible 48-hour cancellation windows and industry-specific exceptions for weather, permits, equipment failure, and cast emergencies.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-10 bg-nollywood-primary/5">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl font-bold mb-4">Need More Information?</h2>
              <p className="max-w-2xl mx-auto mb-6">
                If you have questions about cancellations or need assistance with a slate, our support team is ready to help.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/help">
                  <Button variant="outline">Contact Support</Button>
                </Link>
                <Link to="/terms">
                  <Button>Terms of Service</Button>
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

export default CancellationOptions;
