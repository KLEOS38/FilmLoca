
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Building2, Target, Users, Lightbulb, Shield, Handshake } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const OurCompany = () => {
  return (
    <>
      <Helmet>
        <title>Our Company | Film Loca</title>
        <meta name="description" content="Learn about Filmloca's story, mission, and the team behind the platform connecting filmmakers with perfect locations." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-nollywood-primary/10 py-12">
            <div className="container mx-auto px-4 text-center">
              <Building2 className="h-16 w-16 text-nollywood-primary mx-auto mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Company</h1>
              <p className="text-lg max-w-2xl mx-auto">
                Building trust, enabling creativity, and connecting communities through innovative location sharing.
              </p>
            </div>
          </section>
          
          {/* Our Story */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Story: Born from the Scene</h2>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
                  <p className="text-muted-foreground mb-4">
                    Filmloca was founded on the simple realization that local communities and local film production needed a reliable bridge. In 2025, our founder, <strong>Chief Fortune Ileleji</strong>, recognized a major hurdle: filmmakers were losing valuable production time trying to secure ideal shooting locations, while property owners were hesitant to open their doors due to risk of damage and lack of trust.
                  </p>
                  <p className="text-muted-foreground">
                    We set out to change that by building a platform that provides not just a marketplace, but a foundation of trust, accountability, and financial security.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Mission */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <Target className="h-12 w-12 text-nollywood-primary mx-auto mb-4" />
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission: Fueling Creativity, Protecting Property</h2>
                  <p className="text-lg text-muted-foreground">
                    Our mission is threefold:
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-2">
                    <CardHeader className="text-center">
                      <div className="bg-nollywood-primary/10 p-3 rounded-full mb-4 mx-auto w-fit">
                        <Lightbulb className="h-6 w-6 text-nollywood-primary" />
                      </div>
                      <CardTitle>To Empower Creativity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        To give filmmakers of all levels instant, seamless access to a diverse portfolio of unique and verified shooting locations, helping them bring their visions to life.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader className="text-center">
                      <div className="bg-nollywood-primary/10 p-3 rounded-full mb-4 mx-auto w-fit">
                        <Shield className="h-6 w-6 text-nollywood-primary" />
                      </div>
                      <CardTitle>To Protect Our Partners</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        To provide loca owners with the best tools, transparency, and financial safeguards like the FUP Program, ensuring they feel confident and secure opening their homes and businesses to the industry.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader className="text-center">
                      <div className="bg-nollywood-primary/10 p-3 rounded-full mb-4 mx-auto w-fit">
                        <Handshake className="h-6 w-6 text-nollywood-primary" />
                      </div>
                      <CardTitle>To Foster a Professional Community</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        To elevate the standard of on-site etiquette and professionalism, ensuring every booking ("slate") is a positive and successful collaboration for all parties.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Our Team */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <Users className="h-12 w-12 text-nollywood-primary mx-auto mb-4" />
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Team</h2>
                  <p className="text-lg text-muted-foreground">
                    Meet the leadership team driving Filmloca forward
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="text-center">
                      <Avatar className="h-24 w-24 mx-auto mb-4">
                        <AvatarFallback className="text-2xl bg-nollywood-primary/10 text-nollywood-primary">
                          FI
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-lg">Chief Fortune Ileleji</CardTitle>
                      <p className="text-sm text-muted-foreground font-semibold">CEO/Co-Founder</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground text-center">
                        The visionary who created Filmloca in 2025; responsible for setting the company's foundation and strategic direction. He has been since inception responsible for Filmloca's overall strategy and operations, focusing on market expansion and driving global growth initiatives.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="text-center">
                      <Avatar className="h-24 w-24 mx-auto mb-4">
                        <AvatarFallback className="text-2xl bg-nollywood-primary/10 text-nollywood-primary">
                          PN
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-lg">[President Name]</CardTitle>
                      <p className="text-sm text-muted-foreground font-semibold">President</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground text-center">
                        Oversees the overall execution, corporate functions, and is dedicated to scaling the platform's community and support services.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="text-center">
                      <Avatar className="h-24 w-24 mx-auto mb-4">
                        <AvatarFallback className="text-2xl bg-nollywood-primary/10 text-nollywood-primary">
                          CO
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-lg">[COO Name]</CardTitle>
                      <p className="text-sm text-muted-foreground font-semibold">COO</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground text-center">
                        Responsible for the day to day operations of the Filmloca platform and meeting the evolving needs of hosts and filmmakers.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-10 bg-nollywood-primary/5">
            <div className="container mx-auto px-4 text-center">
              <Building2 className="h-12 w-12 text-nollywood-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Join Us on This Journey</h2>
              <p className="max-w-2xl mx-auto mb-6">
                Whether you're a filmmaker looking for the perfect location or a property owner ready to share your space, we're here to make it happen.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/list-property">
                  <Button className="bg-nollywood-primary text-white hover:bg-nollywood-primary/90">
                    List Your Property
                  </Button>
                </Link>
                <Link to="/locations">
                  <Button variant="outline" className="border-nollywood-primary text-nollywood-primary hover:bg-nollywood-primary/10">
                    Browse Locations
                  </Button>
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

export default OurCompany;

