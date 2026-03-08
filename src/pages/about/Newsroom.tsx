
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, ArrowRight, ExternalLink, BriefcaseBusiness, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from 'react-router-dom';

const Newsroom = () => {
  return (
    <>
      <Helmet>
        <title>Newsroom | FilmLoca</title>
        <meta name="description" content="Stay updated with the latest news, press releases, and media coverage about FilmLoca." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1">
          <section className="bg-nollywood-primary/10 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Newsroom</h1>
                <p className="text-lg text-muted-foreground mb-6">Latest news, announcements, career opportunities, and press coverage about FilmLoca</p>
              </div>
            </div>
          </section>
          
          <section className="py-12">
            <div className="container mx-auto px-4">
              <Tabs defaultValue="press-releases" className="w-full max-w-4xl mx-auto">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="press-releases">Press Releases</TabsTrigger>
                  <TabsTrigger value="careers">Careers</TabsTrigger>
                </TabsList>
                
                <TabsContent value="press-releases" className="mt-6">
                  <div className="space-y-8">
                    <Card className="border-l-4 border-l-nollywood-primary">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <div>
                            <Badge className="mb-2 bg-nollywood-primary hover:bg-[#e5e5e5]">Latest</Badge>
                            <CardTitle className="text-xl">FilmLoca Secures ₦500 Million in Series A Funding</CardTitle>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" /> March 15, 2025
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <p className="text-muted-foreground mb-4">FilmLoca, the leading global marketplace connecting filmmakers with perfect filming venues worldwide, today announced it has secured ₦500 million in Series A funding led by Africa Ventures Capital with participation from Lagos Angel Network and Future Media Fund.</p>
                        <p className="text-muted-foreground">The funding will support expansion to additional Nigerian cities, enhanced verification services for properties, and development of advanced features for the filmmaker community.</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <div>
                            <CardTitle className="text-xl">New Partnership with Nigerian Film Corporation Announced</CardTitle>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" /> February 8, 2025
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <p className="text-muted-foreground mb-4">FilmLoca is proud to announce a strategic partnership with the Nigerian Film Corporation (NFC) to provide preferred access to filming locations for officially sanctioned NFC productions.</p>
                        <p className="text-muted-foreground">This collaboration aims to support the growth of Nigerian cinema by reducing production costs and streamlining the location scouting process for filmmakers working with the NFC.</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <div>
                            <CardTitle className="text-xl">FilmLoca Reaches 1,000 Verified Properties Milestone</CardTitle>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" /> January 22, 2025
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <p className="text-muted-foreground mb-4">FilmLoca has reached a significant milestone with 1,000 verified properties now available on the platform, representing a 300% growth in available filming locations since the company's launch.</p>
                        <p className="text-muted-foreground">The diverse property portfolio now includes luxury mansions, traditional compounds, modern offices, retail spaces, and unique venues across the globe, with locations in major film production cities worldwide.</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <div>
                            <CardTitle className="text-xl">Launch of New Filmmaker Protection Program</CardTitle>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" /> December 5, 2024
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <p className="text-muted-foreground">FilmLoca today announced the launch of its Filmmaker Protection Program, offering additional security measures and guarantees for productions booking through the platform, including location backup options and priority support.</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                </TabsContent>
                
                <TabsContent value="careers" className="mt-6">
                  <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">Open Positions</h2>
                    
                    <Tabs defaultValue="all" className="w-full">
                      <TabsList className="grid w-full grid-cols-4 mb-8">
                        <TabsTrigger value="all">All Departments</TabsTrigger>
                        <TabsTrigger value="technology">Technology</TabsTrigger>
                        <TabsTrigger value="business">Business</TabsTrigger>
                        <TabsTrigger value="operations">Operations</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="all" className="mt-6">
                        <div className="space-y-6">
                          <Card>
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-start flex-wrap gap-4">
                                <div>
                                  <Badge className="mb-2 bg-nollywood-primary hover:bg-[#e5e5e5]">Engineering</Badge>
                                  <CardTitle className="text-xl">Senior Full-Stack Developer</CardTitle>
                                </div>
                                <div className="flex items-center gap-4 flex-wrap text-sm text-muted-foreground">
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" /> Remote / Global
                                  </div>
                                  <div className="flex items-center">
                                    <BriefcaseBusiness className="h-4 w-4 mr-1" /> Full-time
                      </div>
                          </div>
                        </div>
                            </CardHeader>
                            <CardContent className="pb-3">
                              <p className="text-muted-foreground">We're looking for an experienced full-stack developer to help build and scale our marketplace platform. You'll work on critical features that connect filmmakers with property owners and improve the user experience.</p>
                            </CardContent>
                            <CardFooter>
                              <Button className="gap-1">
                                View Position <ArrowRight className="h-4 w-4" />
                        </Button>
                            </CardFooter>
                          </Card>
                          
                          <Card>
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-start flex-wrap gap-4">
                                <div>
                                  <Badge className="mb-2 bg-nollywood-primary hover:bg-[#e5e5e5]">Business</Badge>
                                  <CardTitle className="text-xl">Social Media Marketer</CardTitle>
                      </div>
                                <div className="flex items-center gap-4 flex-wrap text-sm text-muted-foreground">
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" /> Remote / Global
                    </div>
                                  <div className="flex items-center">
                                    <BriefcaseBusiness className="h-4 w-4 mr-1" /> Full-time
                      </div>
                          </div>
                        </div>
                            </CardHeader>
                            <CardContent className="pb-3">
                              <p className="text-muted-foreground">Join our marketing team to manage and grow our social media presence across all platforms. You'll create engaging content, develop social media strategies, and build our community of filmmakers and property owners.</p>
                            </CardContent>
                            <CardFooter>
                              <Button className="gap-1">
                                View Position <ArrowRight className="h-4 w-4" />
                        </Button>
                            </CardFooter>
                          </Card>
                          
                          <Card>
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-start flex-wrap gap-4">
                                <div>
                                  <Badge className="mb-2 bg-nollywood-primary hover:bg-[#e5e5e5]">Operations</Badge>
                                  <CardTitle className="text-xl">Location Verification Specialist</CardTitle>
                      </div>
                                <div className="flex items-center gap-4 flex-wrap text-sm text-muted-foreground">
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" /> Remote / Global
                    </div>
                                  <div className="flex items-center">
                                    <BriefcaseBusiness className="h-4 w-4 mr-1" /> Full-time
                      </div>
                          </div>
                        </div>
                            </CardHeader>
                            <CardContent className="pb-3">
                              <p className="text-muted-foreground">Help maintain the quality and accuracy of our location listings by physically visiting and verifying properties. You'll document spaces, capture additional photos, and ensure listings match reality.</p>
                            </CardContent>
                            <CardFooter>
                              <Button className="gap-1">
                                View Position <ArrowRight className="h-4 w-4" />
                        </Button>
                            </CardFooter>
                          </Card>
                          
                          <Card>
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-start flex-wrap gap-4">
                                <div>
                                  <Badge className="mb-2 bg-nollywood-primary hover:bg-[#e5e5e5]">Business</Badge>
                                  <CardTitle className="text-xl">Film Industry Partnership Manager</CardTitle>
                                </div>
                                <div className="flex items-center gap-4 flex-wrap text-sm text-muted-foreground">
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" /> Remote / Global
                                  </div>
                                  <div className="flex items-center">
                                    <BriefcaseBusiness className="h-4 w-4 mr-1" /> Full-time
                      </div>
                    </div>
                  </div>
                            </CardHeader>
                            <CardContent className="pb-3">
                              <p className="text-muted-foreground">Develop and manage relationships with production companies, film organizations, and industry associations. You'll create partnership opportunities that drive platform adoption and industry integration.</p>
                            </CardContent>
                            <CardFooter>
                              <Button className="gap-1">
                                View Position <ArrowRight className="h-4 w-4" />
                    </Button>
                            </CardFooter>
                          </Card>
                  </div>
                </TabsContent>
                
                      <TabsContent value="technology" className="mt-6">
                        <div className="space-y-6">
                    <Card>
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-start flex-wrap gap-4">
                                <div>
                                  <Badge className="mb-2 bg-nollywood-primary hover:bg-[#e5e5e5]">Engineering</Badge>
                                  <CardTitle className="text-xl">Senior Full-Stack Developer</CardTitle>
                                </div>
                                <div className="flex items-center gap-4 flex-wrap text-sm text-muted-foreground">
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" /> Remote / Global
                                  </div>
                                  <div className="flex items-center">
                                    <BriefcaseBusiness className="h-4 w-4 mr-1" /> Full-time
                      </div>
                          </div>
                        </div>
                      </CardHeader>
                            <CardContent className="pb-3">
                              <p className="text-muted-foreground">We're looking for an experienced full-stack developer to help build and scale our marketplace platform. You'll work on critical features that connect filmmakers with property owners and improve the user experience.</p>
                      </CardContent>
                      <CardFooter>
                              <Button className="gap-1">
                                View Position <ArrowRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                        </div>
                      </TabsContent>
                    
                      <TabsContent value="business" className="mt-6">
                        <div className="space-y-6">
                    <Card>
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-start flex-wrap gap-4">
                                <div>
                                  <Badge className="mb-2 bg-nollywood-primary hover:bg-[#e5e5e5]">Business</Badge>
                                  <CardTitle className="text-xl">Social Media Marketer</CardTitle>
                                </div>
                                <div className="flex items-center gap-4 flex-wrap text-sm text-muted-foreground">
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" /> Remote / Global
                                  </div>
                                  <div className="flex items-center">
                                    <BriefcaseBusiness className="h-4 w-4 mr-1" /> Full-time
                      </div>
                          </div>
                        </div>
                      </CardHeader>
                            <CardContent className="pb-3">
                              <p className="text-muted-foreground">Join our marketing team to manage and grow our social media presence across all platforms. You'll create engaging content, develop social media strategies, and build our community of filmmakers and property owners.</p>
                      </CardContent>
                      <CardFooter>
                              <Button className="gap-1">
                                View Position <ArrowRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-start flex-wrap gap-4">
                                <div>
                                  <Badge className="mb-2 bg-nollywood-primary hover:bg-[#e5e5e5]">Business</Badge>
                                  <CardTitle className="text-xl">Film Industry Partnership Manager</CardTitle>
                                </div>
                                <div className="flex items-center gap-4 flex-wrap text-sm text-muted-foreground">
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" /> Remote / Global
                                  </div>
                                  <div className="flex items-center">
                                    <BriefcaseBusiness className="h-4 w-4 mr-1" /> Full-time
                      </div>
                          </div>
                        </div>
                      </CardHeader>
                            <CardContent className="pb-3">
                              <p className="text-muted-foreground">Develop and manage relationships with production companies, film organizations, and industry associations. You'll create partnership opportunities that drive platform adoption and industry integration.</p>
                      </CardContent>
                      <CardFooter>
                              <Button className="gap-1">
                                View Position <ArrowRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                        </div>
                      </TabsContent>
                    
                      <TabsContent value="operations" className="mt-6">
                        <div className="space-y-6">
                    <Card>
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-start flex-wrap gap-4">
                                <div>
                                  <Badge className="mb-2 bg-nollywood-primary hover:bg-[#e5e5e5]">Operations</Badge>
                                  <CardTitle className="text-xl">Location Verification Specialist</CardTitle>
                                </div>
                                <div className="flex items-center gap-4 flex-wrap text-sm text-muted-foreground">
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" /> Remote / Global
                                  </div>
                                  <div className="flex items-center">
                                    <BriefcaseBusiness className="h-4 w-4 mr-1" /> Full-time
                      </div>
                          </div>
                        </div>
                      </CardHeader>
                            <CardContent className="pb-3">
                              <p className="text-muted-foreground">Help maintain the quality and accuracy of our location listings by physically visiting and verifying properties. You'll document spaces, capture additional photos, and ensure listings match reality.</p>
                      </CardContent>
                      <CardFooter>
                              <Button className="gap-1">
                                View Position <ArrowRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
          
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                  <h3 className="text-xl font-semibold mb-4">Company Fact Sheet</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Founded:</span>
                        <span className="text-muted-foreground"> June 2024</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Headquarters:</span>
                        <span className="text-muted-foreground"> Lagos, Nigeria</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Founders:</span>
                        <span className="text-muted-foreground"> Chief Fortune Ileleji</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Total Funding:</span>
                        <span className="text-muted-foreground"> ₦650 Million</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Properties Listed:</span>
                        <span className="text-muted-foreground"> 1000+ verified locations worldwide</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-nollywood-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Total Bookings:</span>
                        <span className="text-muted-foreground"> 3,500+ completed filming sessions</span>
                      </div>
                    </li>
                  </ul>
                </div>
                
              </div>
            </div>
          </section>
          
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-4">Media Contact</h2>
                <p className="text-lg mb-8">For press inquiries, interview requests, or additional information, please contact our media relations team.</p>
                
                <div className="bg-white p-6 rounded-lg shadow-sm inline-block text-left">
                  <p className="font-medium">Press Contact:</p>
                  <p className="mb-3 text-muted-foreground">hello@filmloca.com</p>
                  
                  <p className="font-medium">Phone:</p>
                  <p className="mb-3 text-muted-foreground">+234 (0) 000-000-0000</p>
                  
                  <Separator className="my-4" />
                  
                  <p className="text-sm text-muted-foreground">We aim to respond to all media inquiries within 24-48 hours.</p>
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

export default Newsroom;
