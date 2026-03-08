
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | FilmLoca</title>
        <meta name="description" content="Learn about how FilmLoca collects, uses, and protects your personal information." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1">
          <section className="bg-nollywood-primary/10 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
                <p className="text-lg text-muted-foreground mb-6">How we collect, use, and protect your information</p>
                <div className="flex justify-center">
                  <Shield className="h-16 w-16 text-nollywood-primary" />
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <p className="lead">At FilmLoca, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
                  
                  <p>Please read this Privacy Policy carefully. By accessing or using our platform, you acknowledge that you have read, understood, and agree to be bound by all the terms outlined in this policy.</p>
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Personal Information</h3>
                  <p>We may collect personal information that you voluntarily provide to us when you:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Register for an account</li>
                    <li>List your property on our platform</li>
                    <li>Book a location for filming</li>
                    <li>Complete forms or surveys</li>
                    <li>Contact our support team</li>
                    <li>Participate in promotions or contests</li>
                  </ul>
                  
                  <p>This information may include:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Full name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Billing information</li>
                    <li>Physical address</li>
                    <li>Property details (for hosts)</li>
                    <li>Production information (for filmmakers)</li>
                    <li>Profile photos</li>
                    <li>Government-issued ID for verification purposes</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Automatically Collected Information</h3>
                  <p>When you access our platform, we may automatically collect certain information about your device and usage patterns, including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>IP address</li>
                    <li>Browser type</li>
                    <li>Operating system</li>
                    <li>Device information</li>
                    <li>Usage data and browsing patterns</li>
                    <li>Referring websites</li>
                    <li>Location information (with your consent)</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Cookies and Tracking Technologies</h3>
                  <p>We use cookies, web beacons, and similar tracking technologies to collect information about your browsing activities. These technologies help us analyze trends, administer the website, track users' movements around the site, and gather demographic information about our user base as a whole.</p>
                  
                  <p>You can control cookies through your browser settings and other tools. However, disabling cookies may limit your ability to use certain features of our platform.</p>
                  
                  <Separator className="my-8" />
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>
                  <p>We may use the information we collect for various purposes, including:</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Providing and Improving Our Services</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Facilitate transactions between filmmakers and property owners</li>
                    <li>Process payments and manage booking reservations</li>
                    <li>Verify user identities and property listings</li>
                    <li>Provide customer support and respond to inquiries</li>
                    <li>Monitor and analyze usage patterns and trends</li>
                    <li>Develop new features and services</li>
                    <li>Troubleshoot technical issues</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Communications and Marketing</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Send transactional emails and booking confirmations</li>
                    <li>Provide updates about our services</li>
                    <li>Share promotional offers and marketing communications (with consent)</li>
                    <li>Request feedback and reviews</li>
                    <li>Send service-related announcements</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Security and Legal Compliance</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Protect against unauthorized access and fraudulent activity</li>
                    <li>Verify identity for platform access</li>
                    <li>Enforce our terms of service</li>
                    <li>Comply with legal obligations</li>
                    <li>Resolve disputes and address complaints</li>
                  </ul>
                  
                  <Separator className="my-8" />
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">Information Sharing and Disclosure</h2>
                  <p>We may share your information in the following circumstances:</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">With Platform Users</h3>
                  <p>When you use our platform, certain information is shared between filmmakers and property owners to facilitate bookings:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Property owners will see filmmaker's name, profile information, and production details</li>
                    <li>Filmmakers will see property details, location address, and host contact information</li>
                    <li>Reviews and ratings are visible to all platform users</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">With Service Providers</h3>
                  <p>We may share information with trusted third-party service providers who assist us in operating our platform, conducting business, or servicing you. These parties are contractually obligated to keep your information confidential and use it only for the purposes for which we disclose it to them.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">For Legal Reasons</h3>
                  <p>We may disclose your information when required by law, such as to comply with a subpoena, court order, or similar legal process, or when we believe in good faith that disclosure is necessary to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Protect our rights, property, or safety</li>
                    <li>Protect the safety of our users or others</li>
                    <li>Investigate fraud or respond to a government request</li>
                    <li>Comply with applicable laws and regulations</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Business Transfers</h3>
                  <p>If FilmLoca is involved in a merger, acquisition, or sale of all or a portion of its assets, your information may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on our website of any change in ownership or uses of your personal information.</p>
                  
                  <Separator className="my-8" />
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">Data Security</h2>
                  <p>We implement appropriate technical and organizational measures to protect the security of your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Security Measures</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Encryption of sensitive data in transit and at rest</li>
                    <li>Secure authentication procedures</li>
                    <li>Regular security assessments and penetration testing</li>
                    <li>Access controls and authorization processes</li>
                    <li>Employee training on data security practices</li>
                  </ul>
                  
                  <Separator className="my-8" />
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">Your Privacy Rights</h2>
                  <p>Depending on your location, you may have certain rights regarding your personal information:</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Access and Control</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access and view personal information we hold about you</li>
                    <li>Update or correct inaccurate information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Object to processing of your information</li>
                    <li>Restrict certain uses of your information</li>
                    <li>Data portability (receiving your data in a structured format)</li>
                    <li>Withdraw consent for processing (where applicable)</li>
                  </ul>
                  
                  <p className="mt-4">To exercise these rights, please contact us using the information provided in the "Contact Us" section below. We will respond to your request within a reasonable timeframe and in accordance with applicable laws.</p>
                  
                  <Separator className="my-8" />
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">Children's Privacy</h2>
                  <p>Our platform is not intended for children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us, and we will take steps to remove that information from our systems.</p>
                  
                  <Separator className="my-8" />
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">Changes to This Privacy Policy</h2>
                  <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
                  
                  <Separator className="my-8" />
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
                  <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
                  
                  <div className="bg-muted/30 p-6 rounded-lg mt-4">
                    <p className="font-medium">Email: hello@filmloca.com</p>
                    <p className="font-medium mt-2">Postal Address:</p>
                    <p>FilmLoca Ltd.</p>
                    <p>Global Headquarters</p>
                    <p>Please contact us via email for our current office location</p>
                  </div>
                </div>
                
                <div className="mt-12">
                  <Button className="bg-nollywood-primary hover:bg-[#000] gap-1">
                    Back to Home <ArrowRight className="h-4 w-4" />
                  </Button>
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

export default Privacy;
