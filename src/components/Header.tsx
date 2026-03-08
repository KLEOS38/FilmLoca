import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Home, 
  MapPin, 
  Heart, 
  HelpCircle,
  Settings,
  UserPlus
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };
  
  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full ${isScrolled ? 'bg-white/95 shadow-sm backdrop-blur-md' : 'bg-white'} transition-all duration-200`}>
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="flex items-center h-20 w-full">
          {/* Logo - always visible, fixed width with consistent left padding */}
          <Link to="/" className="flex items-center flex-shrink-0 px-2 md:px-4" onClick={closeMobileMenu}>
            <img 
              src="/logo.png" 
              alt="FilmLoca" 
              className="h-8 w-auto sm:h-10"
            />
          </Link>
          
          {/* Navigation buttons - ALWAYS visible on md+ screens, takes priority */}
          <nav className="hidden md:flex items-center gap-1.5 md:gap-2 lg:gap-3 ml-auto flex-shrink-0 px-2 md:px-4" aria-label="Main navigation">
            {user && (
              <Button 
                variant="ghost" 
                onClick={() => {
                  const defaultMode = profile?.user_type === 'homeowner' ? 'host' : 'guest';
                  navigate(`/profile?tab=dashboard&mode=${defaultMode}`);
                }} 
                className="whitespace-nowrap text-xs md:text-sm px-2 md:px-3 h-9 flex-shrink-0"
              >
                Profile
              </Button>
            )}
            <Button 
              variant="ghost" 
              onClick={() => navigate('/locations')} 
              className="whitespace-nowrap text-xs md:text-sm px-2 md:px-3 h-9 flex-shrink-0"
            >
              Browse Locations
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/list-property')} 
              className="whitespace-nowrap text-xs md:text-sm px-2 md:px-3 h-9 flex-shrink-0"
            >
              List Your Property
            </Button>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative rounded-full h-8 w-8 md:h-9 md:w-9 p-0 flex-shrink-0"
                  >
                    <Avatar className="h-8 w-8 md:h-9 md:w-9">
                      <AvatarImage src={profile?.avatar_url} />
                      <AvatarFallback className="text-xs">{getInitials(profile?.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{profile?.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => {
                    const defaultMode = profile?.user_type === 'homeowner' ? 'host' : 'guest';
                    navigate(`/profile?tab=dashboard&mode=${defaultMode}`);
                  }}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    navigate('/profile?tab=notifications', { replace: false });
                  }}>
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Notifications</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    navigate('/profile?tab=profile', { replace: false });
                  }}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Edit Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/help')}>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help Center</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/auth?tab=login')}
                  className="text-xs md:text-sm px-2 md:px-3 whitespace-nowrap h-9 flex-shrink-0"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => navigate('/auth?tab=signup')} 
                  className="bg-nollywood-primary hover:bg-[#e5e5e5] text-white text-xs md:text-sm px-2 md:px-3 whitespace-nowrap h-9 flex-shrink-0"
                >
                  Sign Up
                </Button>
              </>
            )}
          </nav>

          {/* Hamburger menu - on the right with consistent right padding */}
          <button 
            className="md:hidden p-2 ml-auto px-2 md:px-4" 
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          
          {isMobileMenuOpen && (
            <div className="fixed inset-0 top-20 z-40 bg-white md:hidden">
              <div className="flex flex-col p-4 h-full overflow-y-auto">
                <nav className="flex flex-col space-y-4">
                  {user && (
                    <button
                      onClick={() => {
                        const defaultMode = profile?.user_type === 'homeowner' ? 'host' : 'guest';
                        navigate(`/profile?tab=dashboard&mode=${defaultMode}`);
                        closeMobileMenu();
                      }}
                      className="flex items-center py-3 text-base hover:text-gray-600 w-full text-left"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </button>
                  )}
                  <Link 
                    to="/locations" 
                    className="flex items-center py-3 text-base hover:text-gray-600" 
                    onClick={closeMobileMenu}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Browse Locations
                  </Link>
                  <Link 
                    to="/list-property" 
                    className="flex items-center py-3 text-base hover:text-gray-600" 
                    onClick={closeMobileMenu}
                  >
                    <Home className="mr-2 h-4 w-4" />
                    List Your Property
                  </Link>
                  <Link 
                    to="/how-it-works" 
                    className="flex items-center py-3 text-base hover:text-gray-600" 
                    onClick={closeMobileMenu}
                  >
                    How It Works
                  </Link>
                </nav>
                
                <div className="mt-4 pt-4 border-t">
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex items-center mb-4">
                        <Avatar className="mr-3">
                          <AvatarImage src={profile?.avatar_url} />
                          <AvatarFallback>{getInitials(profile?.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{profile?.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start" 
                          onClick={() => {
                            const defaultMode = profile?.user_type === 'homeowner' ? 'host' : 'guest';
                            navigate(`/profile?tab=dashboard&mode=${defaultMode}`);
                            closeMobileMenu();
                          }}
                        >
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start" 
                          onClick={() => {
                            navigate('/profile?tab=notifications', { replace: false });
                            closeMobileMenu();
                          }}
                        >
                          <Heart className="mr-2 h-4 w-4" />
                          Notifications
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start" 
                          onClick={() => {
                            navigate('/profile?tab=profile', { replace: false });
                            closeMobileMenu();
                          }}
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Edit Profile
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start" 
                          onClick={() => {
                            navigate('/help');
                            closeMobileMenu();
                          }}
                        >
                          <HelpCircle className="mr-2 h-4 w-4" />
                          Help Center
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start" 
                          onClick={() => {
                            handleLogout();
                            closeMobileMenu();
                          }}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Log out
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Button 
                        className="w-full" 
                        variant="outline" 
                        onClick={() => {
                          navigate('/auth?tab=login');
                          closeMobileMenu();
                        }}
                      >
                        Login
                      </Button>
                      <Button 
                        className="w-full bg-nollywood-primary hover:bg-[#e5e5e5] text-white" 
                        onClick={() => {
                          navigate('/auth?tab=signup');
                          closeMobileMenu();
                        }}
                      >
                        Sign Up
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
