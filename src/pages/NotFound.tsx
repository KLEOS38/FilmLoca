
import React from 'react';
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-nollywood-primary mb-6">404</h1>
        <p className="text-2xl font-semibold mb-4">Oops! We couldn't find that location</p>
        <p className="text-muted-foreground mb-8">The page you are looking for might have been moved or doesn't exist.</p>
        <Link to="/">
          <Button size="lg" className="bg-nollywood-primary hover:bg-[#e5e5e5] text-white">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
