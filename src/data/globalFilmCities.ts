// Global Film Cities Data Structure
// This file contains all supported countries, states/regions, and cities for property listings

export interface City {
  name: string;
}

export interface StateRegion {
  name: string;
  cities: City[];
}

export interface Country {
  name: string;
  states: StateRegion[];
}

export const globalFilmCities: Country[] = [
  {
    name: "Australia",
    states: [
      {
        name: "New South Wales",
        cities: [
          { name: "Sydney" }
        ]
      },
      {
        name: "Queensland",
        cities: [
          { name: "Brisbane" },
          { name: "Gold Coast" }
        ]
      },
      {
        name: "Victoria",
        cities: [
          { name: "Melbourne" }
        ]
      }
    ]
  },
  {
    name: "Canada",
    states: [
      {
        name: "British Columbia",
        cities: [
          { name: "Burnaby" },
          { name: "Vancouver" }
        ]
      },
      {
        name: "Ontario",
        cities: [
          { name: "Hamilton" },
          { name: "Ottawa" },
          { name: "Toronto" }
        ]
      },
      {
        name: "Quebec",
        cities: [
          { name: "Montreal" },
          { name: "Quebec City" }
        ]
      }
    ]
  },
  {
    name: "China",
    states: [
      {
        name: "Beijing",
        cities: [
          { name: "Beijing" }
        ]
      },
      {
        name: "Guangdong",
        cities: [
          { name: "Guangzhou" },
          { name: "Shenzhen" }
        ]
      },
      {
        name: "Shanghai",
        cities: [
          { name: "Shanghai" }
        ]
      }
    ]
  },
  {
    name: "Egypt",
    states: [
      {
        name: "Alexandria Governorate",
        cities: [
          { name: "Alexandria" }
        ]
      },
      {
        name: "Cairo Governorate",
        cities: [
          { name: "Cairo" }
        ]
      }
    ]
  },
  {
    name: "France",
    states: [
      {
        name: "Auvergne‑Rhône‑Alpes",
        cities: [
          { name: "Lyon" }
        ]
      },
      {
        name: "Île-de-France",
        cities: [
          { name: "Paris" }
        ]
      },
      {
        name: "PACA",
        cities: [
          { name: "Cannes" },
          { name: "Marseille" },
          { name: "Nice" }
        ]
      }
    ]
  },
  {
    name: "Germany",
    states: [
      {
        name: "Bavaria",
        cities: [
          { name: "Munich" }
        ]
      },
      {
        name: "Berlin",
        cities: [
          { name: "Berlin" }
        ]
      },
      {
        name: "North Rhine‑Westphalia",
        cities: [
          { name: "Cologne" },
          { name: "Düsseldorf" }
        ]
      }
    ]
  },
  {
    name: "Ghana",
    states: [
      {
        name: "Ashanti",
        cities: [
          { name: "Kumasi" }
        ]
      },
      {
        name: "Greater Accra",
        cities: [
          { name: "Accra" }
        ]
      }
    ]
  },
  {
    name: "India",
    states: [
      {
        name: "Karnataka",
        cities: [
          { name: "Bengaluru" }
        ]
      },
      {
        name: "Kerala",
        cities: [
          { name: "Kochi" }
        ]
      },
      {
        name: "Maharashtra",
        cities: [
          { name: "Mumbai" }
        ]
      },
      {
        name: "Tamil Nadu",
        cities: [
          { name: "Chennai" }
        ]
      },
      {
        name: "Telangana",
        cities: [
          { name: "Hyderabad" }
        ]
      }
    ]
  },
  {
    name: "Japan",
    states: [
      {
        name: "Kansai",
        cities: [
          { name: "Kyoto" },
          { name: "Osaka" }
        ]
      },
      {
        name: "Kanto",
        cities: [
          { name: "Tokyo" },
          { name: "Yokohama" }
        ]
      }
    ]
  },
  {
    name: "Kenya",
    states: [
      {
        name: "Mombasa County",
        cities: [
          { name: "Mombasa" }
        ]
      },
      {
        name: "Nairobi County",
        cities: [
          { name: "Nairobi" }
        ]
      }
    ]
  },
  {
    name: "Nigeria",
    states: [
      {
        name: "Abuja",
        cities: [
          { name: "Asokoro" },
          { name: "Garki" },
          { name: "Maitama" },
          { name: "Wuse" }
        ]
      },
      {
        name: "Delta",
        cities: [
          { name: "Asaba" }
        ]
      },
      {
        name: "Enugu",
        cities: [
          { name: "Enugu" },
          { name: "Nsukka" },
          { name: "Oji River" },
          { name: "Udi" }
        ]
      },
      {
        name: "Kano",
        cities: [
          { name: "Kano" }
        ]
      },
      {
        name: "Lagos State",
        cities: [
          { name: "Ikeja" },
          { name: "Ikoyi" },
          { name: "Lagos Island" },
          { name: "Lekki" },
          { name: "Surulere" },
          { name: "Victoria Island" },
          { name: "Yaba" }
        ]
      },
      {
        name: "Oyo",
        cities: [
          { name: "Ibadan" }
        ]
      },
      {
        name: "Plateau",
        cities: [
          { name: "Jos" }
        ]
      },
      {
        name: "Rivers",
        cities: [
          { name: "Port Harcourt" }
        ]
      }
    ]
  },
  {
    name: "South Africa",
    states: [
      {
        name: "Gauteng",
        cities: [
          { name: "Johannesburg" },
          { name: "Pretoria" }
        ]
      },
      {
        name: "KwaZulu‑Natal",
        cities: [
          { name: "Durban" }
        ]
      },
      {
        name: "Western Cape",
        cities: [
          { name: "Cape Town" }
        ]
      }
    ]
  },
  {
    name: "South Korea",
    states: [
      {
        name: "Busan Region",
        cities: [
          { name: "Busan" }
        ]
      },
      {
        name: "Seoul Capital Area",
        cities: [
          { name: "Incheon" },
          { name: "Seoul" }
        ]
      }
    ]
  },
  {
    name: "United Arab Emirates",
    states: [
      {
        name: "Abu Dhabi Emirate",
        cities: [
          { name: "Abu Dhabi" }
        ]
      },
      {
        name: "Dubai Emirate",
        cities: [
          { name: "Dubai" }
        ]
      }
    ]
  },
  {
    name: "United Kingdom",
    states: [
      {
        name: "England",
        cities: [
          { name: "Bristol" },
          { name: "Liverpool" },
          { name: "London" },
          { name: "Manchester" }
        ]
      },
      {
        name: "Northern Ireland",
        cities: [
          { name: "Belfast" }
        ]
      },
      {
        name: "Scotland",
        cities: [
          { name: "Edinburgh" },
          { name: "Glasgow" }
        ]
      },
      {
        name: "Wales",
        cities: [
          { name: "Cardiff" }
        ]
      }
    ]
  },
  {
    name: "United States",
    states: [
      {
        name: "California",
        cities: [
          { name: "Burbank" },
          { name: "Los Angeles" },
          { name: "Oakland" },
          { name: "San Diego" },
          { name: "San Francisco" }
        ]
      },
      {
        name: "Georgia",
        cities: [
          { name: "Atlanta" },
          { name: "Savannah" }
        ]
      },
      {
        name: "Hawaii",
        cities: [
          { name: "Honolulu" }
        ]
      },
      {
        name: "Illinois",
        cities: [
          { name: "Chicago" }
        ]
      },
      {
        name: "Louisiana",
        cities: [
          { name: "Baton Rouge" },
          { name: "New Orleans" }
        ]
      },
      {
        name: "New Mexico",
        cities: [
          { name: "Albuquerque" },
          { name: "Santa Fe" }
        ]
      },
      {
        name: "New York",
        cities: [
          { name: "Brooklyn" },
          { name: "Buffalo" },
          { name: "New York City" }
        ]
      },
      {
        name: "Texas",
        cities: [
          { name: "Austin" },
          { name: "Dallas" },
          { name: "Houston" }
        ]
      }
    ]
  }
];

// Helper functions to get data
export const getCountries = (): string[] => {
  return globalFilmCities.map(country => country.name);
};

export const getStatesByCountry = (countryName: string): string[] => {
  const country = globalFilmCities.find(c => c.name === countryName);
  return country ? country.states.map(state => state.name) : [];
};

export const getCitiesByState = (countryName: string, stateName: string): string[] => {
  const country = globalFilmCities.find(c => c.name === countryName);
  if (!country) return [];
  
  const state = country.states.find(s => s.name === stateName);
  return state ? state.cities.map(city => city.name) : [];
};

// Currency mapping for all countries
export const getCurrencyForCountry = (country: string) => {
  switch (country) {
    case 'Nigeria':
      return { symbol: '₦', code: 'NGN', name: 'Naira' };
    case 'United States':
      return { symbol: '$', code: 'USD', name: 'US Dollar' };
    case 'United Kingdom':
      return { symbol: '£', code: 'GBP', name: 'British Pound' };
    case 'Canada':
      return { symbol: 'C$', code: 'CAD', name: 'Canadian Dollar' };
    case 'France':
    case 'Germany':
      return { symbol: '€', code: 'EUR', name: 'Euro' };
    case 'India':
      return { symbol: '₹', code: 'INR', name: 'Indian Rupee' };
    case 'China':
      return { symbol: '¥', code: 'CNY', name: 'Chinese Yuan' };
    case 'Japan':
      return { symbol: '¥', code: 'JPY', name: 'Japanese Yen' };
    case 'South Korea':
      return { symbol: '₩', code: 'KRW', name: 'South Korean Won' };
    case 'United Arab Emirates':
      return { symbol: 'د.إ', code: 'AED', name: 'UAE Dirham' };
    case 'Australia':
      return { symbol: 'A$', code: 'AUD', name: 'Australian Dollar' };
    case 'South Africa':
      return { symbol: 'R', code: 'ZAR', name: 'South African Rand' };
    case 'Ghana':
      return { symbol: '₵', code: 'GHS', name: 'Ghanaian Cedi' };
    case 'Kenya':
      return { symbol: 'KSh', code: 'KES', name: 'Kenyan Shilling' };
    case 'Egypt':
      return { symbol: 'E£', code: 'EGP', name: 'Egyptian Pound' };
    default:
      return { symbol: '₦', code: 'NGN', name: 'Naira' };
  }
};

