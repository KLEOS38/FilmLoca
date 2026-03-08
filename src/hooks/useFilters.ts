import { useState, useEffect } from 'react';

export interface FilterState {
  searchQuery: string;
  propertyType: string;
  neighborhood: string;
  priceRange: [number, number];
  amenities: string[];
  dateRange?: { from?: Date; to?: Date };
  sortBy: string;
}

export const useFilters = () => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    propertyType: '',
    neighborhood: '',
    priceRange: [0, 500000],
    amenities: [],
    dateRange: undefined,
    sortBy: 'default'
  });

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      searchQuery: '',
      propertyType: '',
      neighborhood: '',
      priceRange: [0, 500000],
      amenities: [],
      dateRange: undefined,
      sortBy: 'default'
    });
  };

  const hasActiveFilters = () => {
    return (
      filters.searchQuery !== '' ||
      filters.propertyType !== '' ||
      filters.neighborhood !== '' ||
      JSON.stringify(filters.priceRange) !== JSON.stringify([0, 500000]) ||
      filters.amenities.length > 0 ||
      filters.dateRange !== undefined ||
      filters.sortBy !== 'default'
    );
  };

  return {
    filters,
    updateFilter,
    clearFilters,
    hasActiveFilters
  };
};
