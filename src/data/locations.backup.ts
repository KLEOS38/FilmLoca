// Comprehensive list of countries, states, and cities
// This file contains a comprehensive list of locations for property listings

interface City {
  name: string;
}

interface StateRegion {
  name: string;
  cities: City[];
}

export interface Country {
  name: string;
  code: string;
  states: StateRegion[];
  currency: string;
  currencySymbol: string;
}

// Comprehensive list of countries with their states and major cities
export const countries: Country[] = [
  // North America
  {
    name: 'United States',
    code: 'US',
    currency: 'USD',
    currencySymbol: '$',
    states: [
      {
        name: 'California',
        cities: [
          { name: 'Los Angeles' },
          { name: 'San Francisco' },
          { name: 'San Diego' },
          { name: 'Sacramento' },
          { name: 'San Jose' },
        ],
      },
      {
        name: 'New York',
        cities: [
          { name: 'New York City' },
          { name: 'Buffalo' },
          { name: 'Rochester' },
          { name: 'Syracuse' },
        ],
      },
      // Add more states as needed
    ],
  },
  {
    name: 'Canada',
    code: 'CA',
    currency: 'CAD',
    currencySymbol: 'C$',
    states: [
      {
        name: 'Ontario',
        cities: [
          { name: 'Toronto' },
          { name: 'Ottawa' },
          { name: 'Hamilton' },
          { name: 'London' },
        ],
      },
      {
        name: 'Quebec',
        cities: [
          { name: 'Montreal' },
          { name: 'Quebec City' },
        ],
      },
      // Add more provinces as needed
    ],
  },
  
  // Europe
  {
    name: 'United Kingdom',
    code: 'GB',
    currency: 'GBP',
    currencySymbol: '£',
    states: [
      {
        name: 'England',
        cities: [
          { name: 'London' },
          { name: 'Manchester' },
          { name: 'Birmingham' },
          { name: 'Liverpool' },
        ],
      },
      {
        name: 'Scotland',
        cities: [
          { name: 'Edinburgh' },
          { name: 'Glasgow' },
        ],
      },
      // Add more countries/regions as needed
    ],
  },
  
  // Add more countries with their respective states and cities
  // Africa
  {
    name: 'Nigeria',
    code: 'NG',
    currency: 'NGN',
    currencySymbol: '₦',
    states: [
      {
        name: 'Lagos State',
        cities: [
          { name: 'Lagos' },
          { name: 'Ikeja' },
          { name: 'Victoria Island' },
        ],
      },
      {
        name: 'Abuja Federal Capital Territory',
        cities: [
          { name: 'Abuja' },
        ],
      },
      // Add more states as needed
    ],
  },
  
  // Asia
  {
    name: 'India',
    code: 'IN',
    currency: 'INR',
    currencySymbol: '₹',
    states: [
      {
        name: 'Maharashtra',
        cities: [
          { name: 'Mumbai' },
          { name: 'Pune' },
        ],
      },
      {
        name: 'Delhi',
        cities: [
          { name: 'New Delhi' },
        ],
      },
      // Add more states as needed
    ],
  },
  
  // Add more regions and countries as needed
];

// Helper functions
export const getCountries = (): string[] => {
  return countries.map(country => country.name);
};

export const getStatesByCountry = (countryName: string): string[] => {
  const country = countries.find(c => c.name === countryName);
  return country ? country.states.map(state => state.name) : [];
};

export const getCitiesByState = (countryName: string, stateName: string): string[] => {
  const country = countries.find(c => c.name === countryName);
  if (!country) return [];
  
  const state = country.states.find(s => s.name === stateName);
  return state ? state.cities.map(city => city.name) : [];
};

export const getCurrencyForCountry = (countryName: string): { code: string; symbol: string; name: string } => {
  const country = countries.find(c => c.name === countryName);
  if (country) {
    return { 
      code: country.currency, 
      symbol: country.currencySymbol,
      name: getCurrencyName(country.currency)
    };
  }
  return { 
    code: 'USD', 
    symbol: '$',
    name: 'US Dollar'
  }; // Default to USD if country not found
};

// Helper function to get currency name from code
const getCurrencyName = (code: string): string => {
  const currencyNames: Record<string, string> = {
    'USD': 'US Dollar',
    'EUR': 'Euro',
    'GBP': 'British Pound',
    'JPY': 'Japanese Yen',
    'AUD': 'Australian Dollar',
    'CAD': 'Canadian Dollar',
    'CHF': 'Swiss Franc',
    'CNY': 'Chinese Yuan',
    'INR': 'Indian Rupee',
    'NGN': 'Nigerian Naira',
    // Add more currencies as needed
  };
  return currencyNames[code] || code; // Return the code if name not found
};
