
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle } from 'lucide-react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BookingCanceledPage = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Helmet>
        <title>Slate Canceled | Film Loca</title>
        <meta name="description" content="Your slate was canceled. Feel free to try again when you're ready." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow py-12">
          <div className="container max-w-md mx-auto px-4">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <XCircle size={60} className="text-gray-400" />
                </div>
                <CardTitle className="text-2xl">Slate Canceled</CardTitle>
                <CardDescription>
                  Your slate was not completed because the payment was canceled
                </CardDescription>
              </CardHeader>
              
              <CardContent className="text-center">
                <p className="mb-4">
                  No worries! You can try again whenever you're ready.
                </p>
              </CardContent>
              
              <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => navigate('/locations')} variant="outline">
                  Browse Locations
                </Button>
                
                <Button onClick={() => navigate(-1)}>
                  Try Again
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default BookingCanceledPage;
