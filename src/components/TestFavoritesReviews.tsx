import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Star } from 'lucide-react';
import { isMockPropertyId, addMockFavorite, removeMockFavorite, isMockFavorite, getMockFavorites, saveMockReview, getMockReviews } from '@/utils/mockDataUtils';

const TestFavoritesReviews = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [testPropertyId] = useState('1');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Load favorites
    const mockFavorites = getMockFavorites();
    setFavorites(mockFavorites);
    console.log('Loaded favorites:', mockFavorites);

    // Load reviews
    const mockReviews = getMockReviews(testPropertyId);
    setReviews(mockReviews);
    console.log('Loaded reviews:', mockReviews);
  };

  const testAddFavorite = () => {
    console.log('Adding favorite for property:', testPropertyId);
    addMockFavorite(testPropertyId);
    loadData();
  };

  const testRemoveFavorite = () => {
    console.log('Removing favorite for property:', testPropertyId);
    removeMockFavorite(testPropertyId);
    loadData();
  };

  const testAddReview = () => {
    console.log('Adding review for property:', testPropertyId);
    const mockReview = saveMockReview(testPropertyId, 5, 'Test review from debug component');
    console.log('Saved mock review:', mockReview);
    loadData();
  };

  const isPropertyFavorite = isMockFavorite(testPropertyId);

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Debug: Favorites & Reviews</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Property ID: {testPropertyId}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <span>Is Mock Data: {isMockPropertyId(testPropertyId) ? 'Yes' : 'No'}</span>
            <span>Is Favorite: {isPropertyFavorite ? 'Yes' : 'No'}</span>
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={testAddFavorite} variant="outline">
              <Heart className="h-4 w-4 mr-2" />
              Add Favorite
            </Button>
            <Button onClick={testRemoveFavorite} variant="outline">
              <Heart className="h-4 w-4 mr-2" />
              Remove Favorite
            </Button>
            <Button onClick={testAddReview} variant="outline">
              <Star className="h-4 w-4 mr-2" />
              Add Review
            </Button>
            <Button onClick={loadData} variant="outline">
              Refresh Data
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Favorites ({favorites.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {favorites.length > 0 ? (
            <div className="space-y-2">
              {favorites.map((favorite) => (
                <div key={favorite.id} className="p-2 border rounded">
                  <p><strong>ID:</strong> {favorite.id}</p>
                  <p><strong>Property:</strong> {favorite.properties?.title}</p>
                  <p><strong>Price:</strong> ₦{favorite.properties?.price?.toLocaleString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No favorites found</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reviews ({reviews.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {reviews.length > 0 ? (
            <div className="space-y-2">
              {reviews.map((review) => (
                <div key={review.id} className="p-2 border rounded">
                  <p><strong>ID:</strong> {review.id}</p>
                  <p><strong>Rating:</strong> {review.rating}/5</p>
                  <p><strong>Comment:</strong> {review.comment}</p>
                  <p><strong>User:</strong> {review.user?.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No reviews found</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>localStorage Debug</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 p-2 rounded text-sm">
            {JSON.stringify({
              'mock-favorites': localStorage.getItem('mock-favorites'),
              'mock-reviews': localStorage.getItem('mock-reviews')
            }, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestFavoritesReviews;
