import citiesData from 'cities.json';

interface City {
  country: string;
  name: string;
  lat: string;
  lng: string;
  admin1?: string; // State/Region
  admin2?: string; // Sub-region
  admin3?: string; // District
  admin4?: string; // Locality
}

const cities = citiesData as City[];

export const getCountries = (): string[] => {
  const countrySet = new Set<string>();
  cities.forEach(city => countrySet.add(city.country));
  return Array.from(countrySet).sort();
};

export const getStatesByCountry = (country: string): string[] => {
  const stateSet = new Set<string>();
  cities
    .filter(city => city.country === country && city.admin1)
    .forEach(city => stateSet.add(city.admin1!));
  return Array.from(stateSet).sort();
};

export const getCitiesByState = (country: string, state: string): string[] => {
  const citySet = new Set<string>();
  cities
    .filter(city => city.country === country && city.admin1 === state)
    .forEach(city => citySet.add(city.name));
  return Array.from(citySet).sort();
};

export const searchCities = (query: string, limit: number = 50): Array<{name: string, state: string, country: string}> => {
  const lowerQuery = query.toLowerCase();
  return cities
    .filter(city => 
      city.name.toLowerCase().includes(lowerQuery) ||
      (city.admin1 && city.admin1.toLowerCase().includes(lowerQuery)) ||
      city.country.toLowerCase().includes(lowerQuery)
    )
    .slice(0, limit)
    .map(city => ({
      name: city.name,
      state: city.admin1 || '',
      country: city.country
    }));
};
