
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | FilmLoca</title>
        <meta name="description" content="Terms and conditions for using the FilmLoca platform. Please review these terms before using our services." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1">
          <section className="bg-nollywood-primary/10 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Terms of Service</h1>
                <p className="text-lg text-muted-foreground mb-6">Please read these terms carefully before using our platform</p>
                <div className="flex justify-center">
                  <FileText className="h-16 w-16 text-nollywood-primary" />
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold mt-8 mb-4">1. Agreement to Terms</h2>
                  
                  <p>These Terms of Service ("Terms") constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you"), and FilmLoca Ltd. ("Company", "we", "us", or "our"), concerning your access to and use of the FilmLoca platform.</p>
                  
                  <p>By accessing or using our platform, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access the platform.</p>
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">2. Definitions</h2>
                  
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>"Platform"</strong> refers to the FilmLoca website, mobile applications, and services.</li>
                    <li><strong>"Property Owner"</strong> or <strong>"Host"</strong> refers to users who list properties on the platform for filming purposes.</li>
                    <li><strong>"Filmmaker"</strong> refers to users who book properties for filming purposes.</li>
                    <li><strong>"Booking"</strong> refers to a reservation of a property for filming purposes.</li>
                    <li><strong>"Content"</strong> refers to all information, text, graphics, photos, videos, and other materials uploaded, downloaded, or appearing on the platform.</li>
                  </ul>
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">3. Account Registration and Eligibility</h2>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">3.1 Account Creation</h3>
                  <p>To use certain features of our platform, you must register for an account. When you register, you agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Eligibility</h3>
                  <p>You must be at least 18 years old to create an account and use our platform. By creating an account, you represent and warrant that you meet this requirement and have the legal capacity to enter into these Terms.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">3.3 Account Verification</h3>
                  <p>We may implement identity verification processes. You agree to provide additional information as requested and consent to our verification of your identity and information.</p>
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">4. Platform Rules and Restrictions</h2>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">4.1 General Rules</h3>
                  <p>When using our platform, you agree not to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe on the rights of others</li>
                    <li>Post false, misleading, or deceptive content</li>
                    <li>Harass, abuse, or harm another person</li>
                    <li>Use our platform in any manner that could interfere with, disrupt, or negatively affect the platform</li>
                    <li>Attempt to gain unauthorized access to the platform or other users' accounts</li>
                    <li>Use the platform for purposes other than those intended</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">4.2 Property Owner Rules</h3>
                  <p>If you are a Property Owner using our platform, you must:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate and complete information about your property</li>
                    <li>Have the legal right to list the property for filming purposes</li>
                    <li>Disclose any restrictions, limitations, or conditions that may affect filming</li>
                    <li>Maintain the property as represented in your listing</li>
                    <li>Comply with all applicable laws, including tax and property regulations</li>
                    <li>Honor confirmed bookings and not cancel without legitimate reason</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">4.3 Filmmaker Rules</h3>
                  <p>If you are a Filmmaker using our platform, you must:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate information about your production and filming needs</li>
                    <li>Use properties only for the purposes specified in your booking</li>
                    <li>Obtain any necessary permits or permissions for filming</li>
                    <li>Respect property rules and limitations</li>
                    <li>Leave properties in the condition you found them</li>
                    <li>Not exceed the crew size or equipment limitations specified</li>
                    <li>Honor confirmed bookings and not cancel without legitimate reason</li>
                  </ul>
                  
                  <div className="mt-10 pt-8 border-t">
                    <h2 className="text-2xl font-bold mb-6">Property Listing Terms & Conditions</h2>
                    <p className="mb-6">FilmLoca connects property owners with filmmakers seeking locations. By listing your property, you agree to the following specific terms:</p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">1. Purpose</h3>
                    <p>FilmLoca connects property owners with filmmakers seeking locations. By listing your property, you agree to the terms below.</p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">2. Eligibility to List</h3>
                    <p>You must:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Be the legal owner of the property OR legally authorized to grant access</li>
                      <li>Provide accurate information and documentation when requested</li>
                      <li>Consent to FilmLoca's verification process (virtual or physical)</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">3. Proof of Ownership / Rights to List</h3>
                    <p>You agree to provide valid proof of ownership or authority upon request, which may include:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Government‑issued title document (e.g., C of O, Deed of Assignment)</li>
                      <li>Authorized lease agreement or management contract</li>
                      <li>Utility bill and ID</li>
                    </ul>
                    <p className="mt-3">FilmLoca may approve or deny listings at its sole discretion.</p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">4. Listing Accuracy</h3>
                    <p>You must provide accurate details, photos, availability, and pricing.</p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">5. Verification</h3>
                    <p>FilmLoca may conduct virtual or physical verification. Approval does not guarantee future bookings.</p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">6. Booking Fees & Commission</h3>
                    <p>FilmLoca charges a 15% commission on confirmed bookings. Commission is deducted from the host payout.</p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">7. Host Responsibilities</h3>
                    <p>Hosts must ensure:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Safe access for film teams</li>
                      <li>Compliance with local laws</li>
                      <li>No fraudulent representation</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">8. Liability & Indemnity</h3>
                    <p>FilmLoca is a listing and booking platform. FilmLoca is not responsible for:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Damage to properties</li>
                      <li>Injuries or losses on site</li>
                      <li>Disputes between hosts and filmmakers</li>
                    </ul>
                    <p className="mt-3">Hosts agree to indemnify FilmLoca from claims related to access, lack of authority, or misrepresentation.</p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">9. Cancellation & Disputes</h3>
                    <p>Hosts must notify FilmLoca promptly of cancellations. Disputes will be handled per platform policies.</p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">10. Suspension / Removal</h3>
                    <p>FilmLoca may suspend or remove listings that violate rules or legal obligations.</p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">11. Acceptance</h3>
                    <p>Using the FilmLoca platform means you accept these terms.</p>
                  </div>
                  
                  <div className="mt-10 pt-8 border-t">
                    <h2 className="text-2xl font-bold mb-6">Filmmaker Booking Terms & Conditions</h2>
                    <p className="mb-6">FilmLoca connects filmmakers with verified property owners for film, photography, commercial, and creative projects. By booking a location on FilmLoca, you agree to the following specific terms:</p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">1. Purpose</h3>
                    <p>FilmLoca connects filmmakers with verified property owners for film, photography, commercial, and creative projects. By booking a location on FilmLoca, you agree to the terms below.</p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">2. Eligibility to Book</h3>
                    <p>Filmmakers must:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Provide accurate contact details and production information</li>
                      <li>Sign booking agreements where necessary</li>
                      <li>Agree to platform rules and legal responsibilities</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">3. Booking Requirements</h3>
                    <p>Filmmakers must provide:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Project description</li>
                      <li>Shoot dates and time</li>
                      <li>Crew size</li>
                      <li>Equipment type</li>
                      <li>Special effects, stunts, animals, or heavy equipment disclosures (if any)</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">4. Fees & Payments</h3>
                    <p>Filmmakers agree to pay:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Location booking fee</li>
                      <li>Security/damage deposit (refundable)</li>
                      <li>Additional fees if property rules are violated</li>
                    </ul>
                    <p className="mt-3">Payment terms will be outlined at checkout.</p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">5. Damage Deposit & Liability</h3>
                    <p>A refundable damage deposit is required before shoot approval. The filmmaker is responsible for all damages caused by crew, cast, visitors, or equipment. If damages exceed the deposit, filmmaker must cover the balance.</p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">6. Conduct & Property Rules</h3>
                    <p>Filmmakers must:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Respect property rules</li>
                      <li>Maintain professional behavior</li>
                      <li>Avoid illegal activities or harmful practices</li>
                      <li>Return the property in original condition</li>
                      <li>Follow host instructions on restricted areas, parking, noise, equipment placement, etc.</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">7. Insurance</h3>
                    <p>FilmLoca recommends that filmmakers maintain production insurance. FilmLoca Host Protection Program may apply, but filmmakers remain primarily liable for damages.</p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">8. Cancellations & Refunds</h3>
                    <p>Cancellation rules are determined per listing. Late cancellations may result in partial or no refunds.</p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">9. Verification & Compliance</h3>
                    <p>FilmLoca may require identity or company verification before booking confirmation. Filmmakers must comply with all laws, permits, and local regulations.</p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">10. Liability Waiver</h3>
                    <p>FilmLoca is a marketplace platform and does not:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Supervise shoots</li>
                      <li>Guarantee property safety or suitability</li>
                      <li>Accept liability for injuries, theft, damages, or disputes</li>
                    </ul>
                    <p className="mt-3">Filmmakers assume full responsibility for production activities.</p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">11. Breach of Terms</h3>
                    <p>FilmLoca may suspend accounts or block bookings if filmmakers violate terms or act fraudulently.</p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">12. Acceptance</h3>
                    <p>By booking through FilmLoca, you confirm you understand and agree to these terms.</p>
                  </div>
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">5. Bookings and Payments (General)</h2>
                  
                  <p className="mb-4">For detailed booking and payment terms, please refer to the <strong>Property Listing Terms & Conditions</strong> and <strong>Filmmaker Booking Terms & Conditions</strong> sections above.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">5.1 Booking Process</h3>
                  <p>Filmmakers may request to book properties through our platform. Property Owners have the right to accept or decline these requests. A booking is considered confirmed only when accepted by the Property Owner and payment is processed.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">5.2 Pricing and Fees</h3>
                  <p>Property Owners set their own prices for their properties. FilmLoca charges a 15% commission on confirmed bookings, which is deducted from the host payout. Filmmakers may also be subject to service fees. All fees are disclosed before a booking is confirmed.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">5.3 Payments</h3>
                  <p>Payments are processed through our secure payment system. Filmmakers are required to pay the full amount, including booking fees and security deposits, at the time of booking. Property Owners receive payment 24 hours after successful check-in, minus applicable fees and commission.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">5.4 Cancellations and Refunds</h3>
                  <p>Cancellation policies are set by Property Owners and displayed on property listings. Refunds are processed according to these policies and our platform guidelines. Late cancellations may result in partial or no refunds. FilmLoca reserves the right to override cancellation policies in exceptional circumstances.</p>
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">6. Content and Intellectual Property</h2>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">6.1 User Content</h3>
                  <p>You retain ownership of content you submit to the platform. By submitting content, you grant FilmLoca a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute the content for the purpose of operating and promoting the platform.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">6.2 Platform Content</h3>
                  <p>The platform, including its design, features, and content created by FilmLoca, is protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works based on our platform content without our express permission.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">6.3 Reviews and Feedback</h3>
                  <p>Users may leave reviews and ratings on the platform. Reviews must be honest, relevant, and respectful. We reserve the right to remove reviews that violate our policies or Terms.</p>
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">7. Privacy and Data Protection</h2>
                  
                  <p>Our Privacy Policy governs the collection, use, and disclosure of your personal information. By using our platform, you consent to our privacy practices as outlined in the Privacy Policy.</p>
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">8. Limitation of Liability</h2>
                  
                  <p>To the maximum extent permitted by law, FilmLoca shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Your access to or use of or inability to access or use the platform</li>
                    <li>Any conduct or content of any third party on the platform</li>
                    <li>Any content obtained from the platform</li>
                    <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                  </ul>
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">9. Dispute Resolution</h2>
                  
                  <p>In the event of any dispute arising between users of the platform, we encourage you to first attempt to resolve the issue directly with the other party. If this is not possible, please contact our support team, who will attempt to help mediate the dispute.</p>
                  
                  <p>For disputes between users and FilmLoca, you agree to first contact us with your concerns before pursuing formal legal action. If we cannot resolve the issue informally, any legal proceedings shall be brought in the courts of law.</p>
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">10. Termination</h2>
                  
                  <p>We reserve the right to suspend or terminate your account and access to the platform at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.</p>
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">11. Changes to Terms</h2>
                  
                  <p>We may modify these Terms at any time. We will provide notice of significant changes by posting the updated Terms on our platform and updating the "Last Updated" date. Your continued use of the platform after such changes constitutes your acceptance of the new Terms.</p>
                  
                  <h2 className="text-2xl font-bold mt-8 mb-4">12. Contact Information</h2>
                  
                  <p>If you have any questions or concerns about these Terms or our platform, please contact us at:</p>
                  
                  <div className="bg-muted/30 p-6 rounded-lg mt-4">
                    <p className="font-medium">Email: hello@Filmloca.com</p>
                  </div>
                </div>
                
                <div className="mt-12">
                  <Button className="bg-nollywood-primary hover:bg-[#e5e5e5] gap-1">
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

export default Terms;
