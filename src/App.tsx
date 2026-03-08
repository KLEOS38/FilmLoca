
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import ErrorBoundary from "@/components/ui/error-boundary";
// Pre-load locations manager on app initialization
import "@/utils/supabaseLocationManager";
import Index from "./pages/Index";
import LocationsPage from "./pages/LocationsPage";
import LocationDetail from "./pages/LocationDetail";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import ListPropertyPage from "./pages/ListPropertyPage";
import EditPropertyPage from "./pages/EditPropertyPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import BookingSuccessPage from "./pages/BookingSuccessPage";
import BookingCanceledPage from "./pages/BookingCanceledPage";

// Help Center Pages
import HelpCenter from "./pages/support/HelpCenter";
import SafetyInfo from "./pages/support/SafetyInfo";
import CancellationOptions from "./pages/support/CancellationOptions";
import CovidGuidelines from "./pages/support/CovidGuidelines";
import FUPProgram from "./pages/support/FUPProgram";
import FUPFilmmakers from "./pages/support/FUPFilmmakers";
import FUPLanding from "./pages/support/FUPLanding";

// Community Pages
import ForFilmmakers from "./pages/community/ForFilmmakers";
import ForPropertyOwners from "./pages/community/ForPropertyOwners";
import CommunityForum from "./pages/community/CommunityForum";
import FilmingResources from "./pages/community/FilmingResources";
import DamageDeposit from "./pages/community/DamageDeposit";

// About Pages
import HowItWorks from "./pages/about/HowItWorks";
import Newsroom from "./pages/about/Newsroom";
import Investors from "./pages/about/Investors";
import Careers from "./pages/about/Careers";
import OurCompany from "./pages/about/OurCompany";

// Legal Pages
import Privacy from "./pages/legal/Privacy";
import Terms from "./pages/legal/Terms";
import Sitemap from "./pages/legal/Sitemap";

// Add the PropertyManagementPage import
import PropertyManagementPage from '@/pages/PropertyManagementPage';
import AnalyticsPage from '@/pages/AnalyticsPage';
import GuestAnalyticsPage from '@/pages/GuestAnalyticsPage';
import HostAnalyticsPage from '@/pages/HostAnalyticsPage';
import WhatsAppChat from '@/components/WhatsAppChat';

// Create a stable QueryClient instance OUTSIDE the component
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false, // Prevent unnecessary refetches
      refetchOnMount: false, // Prevent refetch on component mount
      refetchOnReconnect: false, // Prevent refetch on network reconnect
      cacheTime: 15 * 60 * 1000, // 15 minutes cache time
    },
  },
});

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <BrowserRouter>
          <AuthProvider>
            <ScrollToTop />
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/locations/:id" element={<LocationDetail />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/reset-password" element={<AuthPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/list-property" element={<ListPropertyPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/booking-success" element={<BookingSuccessPage />} />
            <Route path="/booking-canceled" element={<BookingCanceledPage />} />
            
            {/* Support Pages */}
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/safety" element={<SafetyInfo />} />
            <Route path="/cancellation" element={<CancellationOptions />} />
            <Route path="/covid" element={<CovidGuidelines />} />
            <Route path="/fup-program" element={<FUPLanding />} />
            <Route path="/fup-program/property-owners" element={<FUPProgram />} />
            <Route path="/fup-program/filmmakers" element={<FUPFilmmakers />} />
            
            {/* Community Pages */}
            <Route path="/filmmakers" element={<ForFilmmakers />} />
            <Route path="/homeowners" element={<ForPropertyOwners />} />
            <Route path="/forum" element={<CommunityForum />} />
            <Route path="/resources" element={<FilmingResources />} />
            <Route path="/damage-deposit" element={<DamageDeposit />} />
            
            {/* About Pages */}
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/news" element={<Newsroom />} />
            <Route path="/investors" element={<Investors />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/our-company" element={<OurCompany />} />
            
            {/* Legal Pages */}
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/sitemap" element={<Sitemap />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="/manage-properties" element={<PropertyManagementPage />} />
            <Route path="/edit-property/:id" element={<EditPropertyPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/guest-analytics" element={<GuestAnalyticsPage />} />
            <Route path="/host-analytics" element={<HostAnalyticsPage />} />
            <Route path="*" element={<NotFound />} />
            </Routes>
            <WhatsAppChat 
            position="bottom-right"
            hideOnPages={['/auth']}
            />
            <Toaster />
            <Sonner position="bottom-right" closeButton duration={4000} />
          </AuthProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
