
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BriefcaseBusiness, User, MapPin, Calendar, Sparkles, Heart, Compass, LifeBuoy, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Careers = () => {
  return (
    <>
      <Helmet>
        <title>Careers | FilmLoca</title>
        <meta name="description" content="Join our team at FilmLoca and help transform how Nollywood films are made by connecting filmmakers with perfect shooting locations." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1">
          <section className="relative py-20">
            <div className="absolute inset-0 bg-background/80 z-10"></div>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')" 
              }}
            ></div>
            
            <div className="container mx-auto px-4 relative z-20">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Join Our Team</h1>
                <p className="text-xl text-white/90 mb-8">Help us build the future of Nollywood by connecting filmmakers with perfect locations across Nigeria</p>
                <Button size="lg" className="bg-white text-nollywood-primary hover:bg-white/90">
                  View Open Positions
                </Button>
              </div>
            </div>
          </section>
          
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center">Why Work With Us</h2>
                <p className="text-lg text-muted-foreground mb-12 text-center">At FilmLoca, we're building something meaningful that transforms Africa's largest film industry while creating economic opportunities for property owners.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="mb-2">
                        <Sparkles className="h-6 w-6 text-nollywood-primary" />
                      </div>
                      <CardTitle>Impactful Work</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Our platform helps thousands of filmmakers create better content while providing income opportunities for property owners across Nigeria.</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="mb-2">
                        <Compass className="h-6 w-6 text-nollywood-primary" />
                      </div>
                      <CardTitle>Growth & Learning</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Join a fast-growing startup where you'll develop new skills, take on meaningful responsibilities, and advance your career.</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="mb-2">
                        <Heart className="h-6 w-6 text-nollywood-primary" />
                      </div>
                      <CardTitle>Inclusive Culture</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">We foster a collaborative environment where diverse perspectives are valued and everyone has a voice in shaping our future.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
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
                              <CardTitle className="text-xl">Head of Growth Marketing</CardTitle>
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
                          <p className="text-muted-foreground">Join our marketing team to lead customer acquisition initiatives for both sides of our marketplace. You'll develop strategies to attract filmmakers and property owners while optimizing conversion rates.</p>
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
                              <Badge className="mb-2 bg-nollywood-primary hover:bg-[#e5e5e5]">Engineering</Badge>
                              <CardTitle className="text-xl">Product Designer (UI/UX)</CardTitle>
                            </div>
                            <div className="flex items-center gap-4 flex-wrap text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" /> Remote (Nigeria)
                              </div>
                              <div className="flex items-center">
                                <BriefcaseBusiness className="h-4 w-4 mr-1" /> Full-time
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <p className="text-muted-foreground">Create beautiful, intuitive user experiences for our web and mobile platforms. You'll collaborate with product and engineering teams to design interfaces that meet the unique needs of our users.</p>
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
                      
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start flex-wrap gap-4">
                            <div>
                              <Badge className="mb-2 bg-nollywood-primary hover:bg-[#e5e5e5]">Engineering</Badge>
                              <CardTitle className="text-xl">Product Designer (UI/UX)</CardTitle>
                            </div>
                            <div className="flex items-center gap-4 flex-wrap text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" /> Remote (Nigeria)
                              </div>
                              <div className="flex items-center">
                                <BriefcaseBusiness className="h-4 w-4 mr-1" /> Full-time
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <p className="text-muted-foreground">Create beautiful, intuitive user experiences for our web and mobile platforms. You'll collaborate with product and engineering teams to design interfaces that meet the unique needs of our users.</p>
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
                              <CardTitle className="text-xl">Head of Growth Marketing</CardTitle>
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
                          <p className="text-muted-foreground">Join our marketing team to lead customer acquisition initiatives for both sides of our marketplace. You'll develop strategies to attract filmmakers and property owners while optimizing conversion rates.</p>
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
            </div>
          </section>
          
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
                <p className="text-lg text-muted-foreground mb-12 text-center">These core principles guide how we work together and make decisions</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex gap-4">
                    <div className="bg-nollywood-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-6 w-6 text-nollywood-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Excellence in Everything</h3>
                      <p className="text-muted-foreground">We're committed to quality in every aspect of our business, from code to customer service. We take pride in our work and strive for continuous improvement.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-nollywood-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                      <Heart className="h-6 w-6 text-nollywood-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Customer Obsession</h3>
                      <p className="text-muted-foreground">We deeply understand our users' needs and work backwards from there, creating solutions that genuinely improve their experience and outcomes.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-nollywood-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                      <Compass className="h-6 w-6 text-nollywood-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Bias for Action</h3>
                      <p className="text-muted-foreground">We value decisiveness and initiative. We believe in making thoughtful decisions quickly and iterating based on feedback rather than seeking perfection.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-nollywood-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                      <LifeBuoy className="h-6 w-6 text-nollywood-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Supporting Each Other</h3>
                      <p className="text-muted-foreground">We foster an environment of mutual respect, collaboration, and support. We celebrate our differences and learn from diverse perspectives.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Benefits & Perks</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <Card>
                    <CardHeader className="text-center pb-2">
                      <div className="mx-auto mb-2">
                        <Calendar className="h-6 w-6 text-nollywood-primary" />
                      </div>
                      <CardTitle>Flexible Work</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-muted-foreground">Hybrid work options and flexible scheduling to help you maintain work-life balance.</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="text-center pb-2">
                      <div className="mx-auto mb-2">
                        <User className="h-6 w-6 text-nollywood-primary" />
                      </div>
                      <CardTitle>Professional Growth</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-muted-foreground">Learning stipends, conference budgets, and clear career advancement paths.</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="text-center pb-2">
                      <div className="mx-auto mb-2">
                        <BriefcaseBusiness className="h-6 w-6 text-nollywood-primary" />
                      </div>
                      <CardTitle>Competitive Comp</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-muted-foreground">Competitive salaries, performance bonuses, and equity options for all full-time team members.</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 text-center">Additional Benefits</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-nollywood-primary/10 p-1 rounded-full">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                      </div>
                      <span>Comprehensive health insurance</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="bg-nollywood-primary/10 p-1 rounded-full">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                      </div>
                      <span>Paid parental leave</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="bg-nollywood-primary/10 p-1 rounded-full">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                      </div>
                      <span>Mental health and wellness programs</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="bg-nollywood-primary/10 p-1 rounded-full">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                      </div>
                      <span>Team retreats and social events</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="bg-nollywood-primary/10 p-1 rounded-full">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                      </div>
                      <span>Modern equipment and home office stipend</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="bg-nollywood-primary/10 p-1 rounded-full">
                        <ArrowRight className="h-4 w-4 text-nollywood-primary" />
                      </div>
                      <span>Volunteer time off</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Our Hiring Process</h2>
                
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-4 md:left-1/2 -ml-px h-full w-0.5 bg-muted-foreground/30"></div>
                  
                  {/* Timeline steps */}
                  <div className="space-y-12">
                    <div className="relative flex items-start md:justify-between">
                      <div className="md:w-1/2 md:pr-8 md:text-right">
                        <div className="md:inline-block">
                          <h3 className="text-xl font-semibold mb-2">Application Review</h3>
                          <p className="text-muted-foreground">Our team reviews your application, CV, and portfolio to assess if there's a potential fit for the role.</p>
                        </div>
                      </div>
                      
                      <div className="absolute left-4 md:left-1/2 -ml-2 mt-1.5 h-4 w-4 rounded-full bg-nollywood-primary"></div>
                      
                      <div className="pl-10 md:w-1/2 md:pl-8 md:text-left"></div>
                    </div>
                    
                    <div className="relative flex items-start md:justify-between">
                      <div className="md:w-1/2 md:pr-8 md:text-right"></div>
                      
                      <div className="absolute left-4 md:left-1/2 -ml-2 mt-1.5 h-4 w-4 rounded-full bg-nollywood-primary"></div>
                      
                      <div className="pl-10 md:w-1/2 md:pl-8 md:text-left">
                        <h3 className="text-xl font-semibold mb-2">Initial Interview</h3>
                        <p className="text-muted-foreground">A 30-45 minute conversation with the hiring manager to discuss your experience, skills, and assess mutual fit.</p>
                      </div>
                    </div>
                    
                    <div className="relative flex items-start md:justify-between">
                      <div className="md:w-1/2 md:pr-8 md:text-right">
                        <div className="md:inline-block">
                          <h3 className="text-xl font-semibold mb-2">Skills Assessment</h3>
                          <p className="text-muted-foreground">Depending on the role, you may complete a practical assignment to demonstrate your relevant skills and approach to problem-solving.</p>
                        </div>
                      </div>
                      
                      <div className="absolute left-4 md:left-1/2 -ml-2 mt-1.5 h-4 w-4 rounded-full bg-nollywood-primary"></div>
                      
                      <div className="pl-10 md:w-1/2 md:pl-8 md:text-left"></div>
                    </div>
                    
                    <div className="relative flex items-start md:justify-between">
                      <div className="md:w-1/2 md:pr-8 md:text-right"></div>
                      
                      <div className="absolute left-4 md:left-1/2 -ml-2 mt-1.5 h-4 w-4 rounded-full bg-nollywood-primary"></div>
                      
                      <div className="pl-10 md:w-1/2 md:pl-8 md:text-left">
                        <h3 className="text-xl font-semibold mb-2">Team Interview</h3>
                        <p className="text-muted-foreground">Meet with potential teammates to assess cultural fit and collaborative potential, and to give you a chance to ask questions about the team.</p>
                      </div>
                    </div>
                    
                    <div className="relative flex items-start md:justify-between">
                      <div className="md:w-1/2 md:pr-8 md:text-right">
                        <div className="md:inline-block">
                          <h3 className="text-xl font-semibold mb-2">Final Decision & Offer</h3>
                          <p className="text-muted-foreground">We'll make a prompt decision and, if successful, present you with a competitive offer to join our team.</p>
                        </div>
                      </div>
                      
                      <div className="absolute left-4 md:left-1/2 -ml-2 mt-1.5 h-4 w-4 rounded-full bg-nollywood-primary"></div>
                      
                      <div className="pl-10 md:w-1/2 md:pl-8 md:text-left"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-16 bg-nollywood-dark text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
              <p className="text-xl max-w-2xl mx-auto mb-8">We're looking for passionate individuals to help us transform the Nollywood production landscape</p>
              <Button size="lg" className="bg-white text-nollywood-primary hover:bg-white/90">
                View All Open Positions
              </Button>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Careers;
