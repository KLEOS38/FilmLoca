
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MessageSquare, User, Clock, Tag, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for forum posts
const MOCK_POSTS = [
  {
    id: 1,
    title: "Best locations for period films set in colonial Nigeria?",
    author: "FilmmakerLagos",
    date: "2 days ago",
    category: "Location Advice",
    replies: 12,
    views: 145,
    content: "I'm planning a period drama set in colonial times and looking for authentic locations that could work. Has anyone found good spots that can pass for early 20th century settings? Preferably locations that don't require extensive set dressing."
  },
  {
    id: 2,
    title: "Tips for filming during rainy season",
    author: "DirectorExtraordinaire",
    date: "1 week ago",
    category: "Production Tips",
    replies: 24,
    views: 301,
    content: "We're scheduled to film during the rainy season in a tropical location. Any tips or experiences from those who've done this before? How did you handle weather delays, equipment protection, etc.?"
  },
  {
    id: 3,
    title: "Property damage dispute - need advice",
    author: "PropertyOwner123",
    date: "3 days ago",
    category: "Legal & Contracts",
    replies: 18,
    views: 210,
    content: "A film crew recently used my property and there was some damage to my walls and flooring. The production company is disputing the extent of the damage. Has anyone dealt with something similar? How did you resolve it?"
  },
  {
    id: 4,
    title: "Recommended residential locations with large gardens?",
    author: "NatureFilmmaker",
    date: "5 days ago",
    category: "Location Advice",
    replies: 8,
    views: 122,
    content: "I'm looking for residential properties with extensive gardens or outdoor spaces for a family drama. Specifically need locations where we can film both interior and exterior scenes. Any recommendations would be appreciated."
  },
  {
    id: 5,
    title: "How to handle location permits for public spaces?",
    author: "NewDirector",
    date: "1 day ago",
    category: "Legal & Contracts",
    replies: 5,
    views: 87,
    content: "I'm planning to shoot some scenes in public areas. What's the process for getting filming permits in different locations? How much lead time should I allow, and what are the typical costs involved?"
  },
  {
    id: 6,
    title: "Equipment rental recommendations",
    author: "CameraOperator",
    date: "4 days ago",
    category: "Equipment & Resources",
    replies: 16,
    views: 178,
    content: "Can anyone recommend reliable equipment rental companies? I need lighting equipment and some camera accessories for a 3-day shoot next month. Looking for places with good service and well-maintained gear. Location preferences welcome."
  },
  {
    id: 7,
    title: "Property owner experiences with Film Loca",
    author: "FirstTimeHost",
    date: "2 weeks ago",
    category: "Testimonials",
    replies: 22,
    views: 264,
    content: "I'm considering listing my property on Film Loca. I'd love to hear from other property owners about their experiences. How often do you get bookings? Any issues with film crews? Is the income worth the potential hassle?"
  },
  {
    id: 8,
    title: "Traditional village settings for filming",
    author: "CulturalFilmmaker",
    date: "1 week ago",
    category: "Location Advice",
    replies: 14,
    views: 187,
    content: "I'm working on a project that requires authentic traditional village settings. Looking for locations that can accommodate such productions. Has anyone filmed in such locations recently? Any recommendations or contacts would be appreciated."
  }
];

const CommunityForum = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("recent");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Filter posts based on active category and search query
  const filteredPosts = MOCK_POSTS.filter(post => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "recent") {
      // This is simplified, in a real app we'd use actual date objects
      return a.id < b.id ? 1 : -1;
    } else if (sortBy === "popular") {
      return a.views < b.views ? 1 : -1;
    } else if (sortBy === "mostReplies") {
      return a.replies < b.replies ? 1 : -1;
    }
    return 0;
  });

  return (
    <>
      <Helmet>
        <title>Community Forum | Film Loca</title>
        <meta name="description" content="Join the Film Loca community forum to discuss filming locations, share experiences, and connect with other filmmakers and property owners." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Community Forum</h1>
                <p className="text-muted-foreground">Connect with filmmakers and property owners in our community</p>
              </div>
              
              <Button className="bg-nollywood-primary hover:bg-[#e5e5e5] text-white">
                <MessageSquare className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </div>
            
            {/* Forum Tabs and Filters */}
            <div className="mb-8">
              <Tabs defaultValue="all-discussions" className="w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <TabsList>
                    <TabsTrigger value="all-discussions">All Discussions</TabsTrigger>
                    <TabsTrigger value="my-discussions">My Discussions</TabsTrigger>
                    <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
                  </TabsList>
                  
                  <div className="flex items-center gap-2">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="popular">Most Popular</SelectItem>
                        <SelectItem value="mostReplies">Most Replies</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search discussions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={activeCategory} onValueChange={setActiveCategory}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Location Advice">Location Advice</SelectItem>
                      <SelectItem value="Production Tips">Production Tips</SelectItem>
                      <SelectItem value="Legal & Contracts">Legal & Contracts</SelectItem>
                      <SelectItem value="Equipment & Resources">Equipment & Resources</SelectItem>
                      <SelectItem value="Testimonials">Testimonials</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <TabsContent value="all-discussions" className="mt-0">
                  {/* Discussion List */}
                  <div className="space-y-4">
                    {sortedPosts.length > 0 ? (
                      sortedPosts.map((post) => (
                        <div key={post.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold mb-2">
                              <a href="#" className="hover:text-nollywood-primary">{post.title}</a>
                            </h3>
                            <span className="bg-muted px-2 py-1 rounded text-xs text-muted-foreground">
                              {post.category}
                            </span>
                          </div>
                          <p className="text-muted-foreground mb-4 line-clamp-2">{post.content}</p>
                          <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-4">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              {post.author}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {post.date}
                            </div>
                            <div className="flex items-center">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              {post.replies} replies
                            </div>
                            <div>
                              {post.views} views
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No discussions found</h3>
                        <p className="text-muted-foreground mb-6">
                          No discussions match your current filters or search criteria.
                        </p>
                        <Button onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}>
                          Clear Filters
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="my-discussions" className="mt-0">
                  <div className="text-center py-12">
                    <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Login to view your discussions</h3>
                    <p className="text-muted-foreground mb-6">
                      You need to be logged in to see your discussions and participate in the forum.
                    </p>
                    <Button>
                      Sign In
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="bookmarked" className="mt-0">
                  <div className="text-center py-12">
                    <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Login to view bookmarked discussions</h3>
                    <p className="text-muted-foreground mb-6">
                      You need to be logged in to see your bookmarked discussions.
                    </p>
                    <Button>
                      Sign In
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Community Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
              <div className="bg-muted/30 p-6 rounded-lg text-center">
                <h3 className="text-3xl font-bold text-nollywood-primary mb-2">1,245</h3>
                <p className="text-muted-foreground">Community Members</p>
              </div>
              
              <div className="bg-muted/30 p-6 rounded-lg text-center">
                <h3 className="text-3xl font-bold text-nollywood-primary mb-2">523</h3>
                <p className="text-muted-foreground">Discussion Topics</p>
              </div>
              
              <div className="bg-muted/30 p-6 rounded-lg text-center">
                <h3 className="text-3xl font-bold text-nollywood-primary mb-2">3,872</h3>
                <p className="text-muted-foreground">Total Replies</p>
              </div>
              
              <div className="bg-muted/30 p-6 rounded-lg text-center">
                <h3 className="text-3xl font-bold text-nollywood-primary mb-2">42</h3>
                <p className="text-muted-foreground">Active Today</p>
              </div>
            </div>
            
            {/* Community Guidelines */}
            <div className="mt-12 bg-nollywood-primary/5 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Community Guidelines</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Be respectful and courteous to other community members</li>
                <li>Stay on topic and keep discussions relevant to film production and locations</li>
                <li>Don't share personal contact information publicly</li>
                <li>Use the search function before posting to avoid duplicate topics</li>
                <li>Report inappropriate content to the moderation team</li>
              </ul>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default CommunityForum;
