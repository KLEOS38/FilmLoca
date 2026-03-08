
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { TrendingUp, Users, ShieldCheck, Globe, DollarSign, BarChart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Investors = () => {
  return (
    <>
      <Helmet>
        <title>Investors | Filmmaking Locations</title>
        <meta name="description" content="Investment information and opportunities with FilmLoca, the premier marketplace for filming locations in Nigeria." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1">
          <section className="relative py-20">
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2352&q=80')" 
              }}
            ></div>
            
            <div className="container mx-auto px-4 relative z-20">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Investor Relations</h1>
                <p className="text-xl text-white/90 mb-8">Join us in reshaping the future of Nollywood by connecting filmmakers with perfect locations across Nigeria.</p>
                <Button size="lg" className="bg-white text-nollywood-primary hover:bg-white/90">
                  Investor Information
                </Button>
              </div>
            </div>
          </section>
          
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center">Transforming Nigeria's Film Production Landscape</h2>
                <p className="text-lg text-muted-foreground mb-12 text-center">FilmLoca is revolutionizing how Africa's largest film industry operates by solving one of its biggest challenges - finding and securing perfect filming locations.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2 text-nollywood-primary" /> Market Leadership
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">First and largest dedicated marketplace for film locations in Nigeria, capturing a significant share of the growing Nollywood production ecosystem.</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center">
                        <Users className="h-5 w-5 mr-2 text-nollywood-primary" /> Community Strength
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Vibrant two-sided marketplace with 5,000+ filmmakers and 1,000+ property owners, creating strong network effects and defensible market position.</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center">
                        <ShieldCheck className="h-5 w-5 mr-2 text-nollywood-primary" /> Verified Trust
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Industry-leading verification process for locations and filmmakers, building a foundation of trust that creates high barriers to entry for competitors.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">The Market Opportunity</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <div className="bg-nollywood-primary/10 p-4 rounded-full inline-flex mb-4">
                      <Globe className="h-8 w-8 text-nollywood-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">Africa's Film Powerhouse</h3>
                    <p className="text-muted-foreground mb-6">Nollywood is the world's second-largest film industry by volume, producing over 2,500 films annually with a market value exceeding $6.4 billion USD.</p>
                    
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">Annual Film Productions</span>
                          <span className="font-medium">2,500+</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-nollywood-primary h-2 rounded-full" style={{width: '85%'}}></div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">Industry Growth Rate</span>
                          <span className="font-medium">12.2% YoY</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-nollywood-primary h-2 rounded-full" style={{width: '72%'}}></div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">International Market Expansion</span>
                          <span className="font-medium">35% CAGR</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-nollywood-primary h-2 rounded-full" style={{width: '65%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-nollywood-primary/10 p-4 rounded-full inline-flex mb-4">
                      <DollarSign className="h-8 w-8 text-nollywood-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">Location Market Size</h3>
                    <p className="text-muted-foreground mb-6">The estimated annual spend on location rentals in Nollywood exceeds ₦25 billion, with producers spending 15-25% of production budgets on securing filming locations.</p>
                    
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">Total Addressable Market</span>
                          <span className="font-medium">₦25.7B</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-nollywood-primary h-2 rounded-full" style={{width: '100%'}}></div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">Current Market Penetration</span>
                          <span className="font-medium">8.3%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-nollywood-primary h-2 rounded-full" style={{width: '28%'}}></div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">5-Year Projected Share</span>
                          <span className="font-medium">35%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-nollywood-primary h-2 rounded-full" style={{width: '55%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">Our Traction & Growth</h2>
                
                <Tabs defaultValue="metrics" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
                    <TabsTrigger value="financials">Financial Performance</TabsTrigger>
                    <TabsTrigger value="projections">Growth Projections</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="metrics" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <Card>
                        <CardHeader className="text-center pb-2">
                          <CardTitle className="text-lg">Total Users</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <div className="text-4xl font-bold text-nollywood-primary mb-1">8,500+</div>
                          <p className="text-sm text-muted-foreground">63% growth in the last 6 months</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="text-center pb-2">
                          <CardTitle className="text-lg">Bookings Completed</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <div className="text-4xl font-bold text-nollywood-primary mb-1">3,750+</div>
                          <p className="text-sm text-muted-foreground">Average booking value: ₦175,000</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="text-center pb-2">
                          <CardTitle className="text-lg">Verified Locations</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <div className="text-4xl font-bold text-nollywood-primary mb-1">1,000+</div>
                          <p className="text-sm text-muted-foreground">Across major film production cities worldwide</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold mb-4">User Growth Trajectory</h3>
                        <div className="bg-white p-6 rounded-lg shadow-sm h-64 flex items-center justify-center">
                          <p className="text-muted-foreground text-center">[Growth Chart Visualization]</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Monthly Transaction Volume</h3>
                        <div className="bg-white p-6 rounded-lg shadow-sm h-64 flex items-center justify-center">
                          <p className="text-muted-foreground text-center">[Transaction Volume Chart]</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="financials" className="mt-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                      <h3 className="text-xl font-semibold mb-4">Revenue Model</h3>
                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="md:w-1/3 p-4 border rounded-lg">
                            <h4 className="font-semibold mb-2">Service Fees</h4>
                            <p className="text-sm text-muted-foreground">15% commission on all booking transactions, generating predictable revenue streams with each successful booking.</p>
                          </div>
                          
                          <div className="md:w-1/3 p-4 border rounded-lg">
                            <h4 className="font-semibold mb-2">Premium Features</h4>
                            <p className="text-sm text-muted-foreground">Subscription offerings for property owners and filmmakers, including priority listing placement and advanced tools.</p>
                          </div>
                          
                          <div className="md:w-1/3 p-4 border rounded-lg">
                            <h4 className="font-semibold mb-2">Value-Added Services</h4>
                            <p className="text-sm text-muted-foreground">Location verification, professional photography, insurance partnerships, and production support services.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Revenue Growth</h3>
                        <div className="bg-white p-6 rounded-lg shadow-sm h-64 flex items-center justify-center">
                          <p className="text-muted-foreground text-center">[Revenue Growth Chart]</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Unit Economics</h3>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                          <ul className="space-y-3">
                            <li className="flex justify-between">
                              <span className="text-muted-foreground">Customer Acquisition Cost (CAC):</span>
                              <span className="font-medium">₦12,500</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-muted-foreground">Lifetime Value (LTV):</span>
                              <span className="font-medium">₦125,000</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-muted-foreground">LTV:CAC Ratio:</span>
                              <span className="font-medium">10:1</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-muted-foreground">Payback Period:</span>
                              <span className="font-medium">4.2 months</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-muted-foreground">Gross Margin:</span>
                              <span className="font-medium">78%</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-muted-foreground">Monthly Recurring Revenue:</span>
                              <span className="font-medium">₦42.5M</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="projections" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h3 className="text-xl font-semibold mb-4">5-Year Revenue Projection</h3>
                        <div className="bg-white p-6 rounded-lg shadow-sm h-64 flex items-center justify-center">
                          <p className="text-muted-foreground text-center">[Revenue Projection Chart]</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Market Expansion Plan</h3>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-1">Phase 1: Global Expansion (2023-2024)</h4>
                              <p className="text-sm text-muted-foreground">Establish presence in major film production hubs worldwide and achieve significant market share.</p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold mb-1">Phase 2: Nigeria Expansion (2024-2025)</h4>
                              <p className="text-sm text-muted-foreground">Launch in Abuja, Port Harcourt, and Enugu, capturing key regional film markets.</p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold mb-1">Phase 3: West Africa (2025-2026)</h4>
                              <p className="text-sm text-muted-foreground">Expand to Ghana, Côte d'Ivoire, and Senegal, establishing regional leadership.</p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold mb-1">Phase 4: Pan-African Vision (2026-2028)</h4>
                              <p className="text-sm text-muted-foreground">Strategic entry into South Africa, Kenya, and Egypt, Africa's other major film hubs.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h3 className="text-xl font-semibold mb-4">Growth Catalysts</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center mb-2">
                            <BarChart className="h-5 w-5 text-nollywood-primary mr-2" />
                            <h4 className="font-semibold">Product Expansion</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">Launching complementary services including equipment rentals, crew hiring, and production insurance.</p>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center mb-2">
                            <Users className="h-5 w-5 text-nollywood-primary mr-2" />
                            <h4 className="font-semibold">Strategic Partnerships</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">Collaborations with film schools, production companies, and streaming platforms to drive adoption.</p>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center mb-2">
                            <Globe className="h-5 w-5 text-nollywood-primary mr-2" />
                            <h4 className="font-semibold">International Expansion</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">Positioning as the gateway for international productions seeking authentic African filming locations.</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </section>
          
          <section className="py-16 bg-nollywood-dark text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Investment Opportunities</h2>
              <p className="text-xl max-w-2xl mx-auto mb-8">Join us in building future of filmmaking and expanding across world.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" variant="outline" className="border-white text-black hover:bg-white/10">
                  Contact Investor Relations
                </Button>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Investors;
