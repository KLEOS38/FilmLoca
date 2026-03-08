import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';

// Define interfaces for our location data
export interface City {
  name: string;
  nameAscii: string;
  lat: number;
  lng: number;
  country: string;
  countryCode: string;
  adminName: string;
  capital: string;
  population: number;
  id: string;
}

interface ProcessedLocationData {
  countries: Map<string, string>; // code -> name
  states: Map<string, Map<string, string>>; // countryCode -> stateCode -> stateName
  cities: Map<string, Map<string, City[]>>; // countryCode -> stateCode -> City[]
}

// Read and parse the CSV file
const parseCSV = (): City[] => {
  try {
    const fileContent = readFileSync('src/data/worldcities.csv', 'utf-8');
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      skip_records_with_error: true
    });
    
    return records.map((record: any) => ({
      name: record.city,
      nameAscii: record.city_ascii,
      lat: parseFloat(record.lat) || 0,
      lng: parseFloat(record.lng) || 0,
      country: record.country,
      countryCode: record.iso2,
      adminName: record.admin_name,
      capital: record.capital,
      population: parseInt(record.population) || 0,
      id: record.id
    }));
  } catch (error) {
    console.error('Error parsing CSV file:', error);
    return [];
  }
};

// Process the location data into a structured format
const processLocationData = (): ProcessedLocationData => {
  const cities = parseCSV();
  const countries = new Map<string, string>(); // code -> name
  const states = new Map<string, Map<string, string>>(); // countryCode -> stateCode -> stateName
  const citiesByLocation = new Map<string, Map<string, City[]>>(); // countryCode -> stateCode -> City[]

  for (const city of cities) {
    // Skip if missing required fields
    if (!city.countryCode || !city.name) continue;

    // Add country if not exists
    if (!countries.has(city.countryCode)) {
      countries.set(city.countryCode, city.country);
    }

    // Initialize country in states map if not exists
    if (!states.has(city.countryCode)) {
      states.set(city.countryCode, new Map());
    }

    // Initialize country in cities map if not exists
    if (!citiesByLocation.has(city.countryCode)) {
      citiesByLocation.set(city.countryCode, new Map());
    }

    const stateCode = city.adminName || 'N/A';
    const stateName = city.adminName || 'N/A';

    // Add state if not exists
    if (stateCode && !states.get(city.countryCode)?.has(stateCode)) {
      states.get(city.countryCode)?.set(stateCode, stateName);
    }

    // Initialize state in cities map if not exists
    if (stateCode && !citiesByLocation.get(city.countryCode)?.has(stateCode)) {
      citiesByLocation.get(city.countryCode)?.set(stateCode, []);
    }

    // Add city to the appropriate state and country
    if (stateCode) {
      citiesByLocation.get(city.countryCode)?.get(stateCode)?.push(city);
    }
  }

  return { countries, states, cities: citiesByLocation };
};

const locationData = processLocationData();

// Public API
export const getCountries = (): Array<{ code: string; name: string }> => {
  return Array.from(locationData.countries.entries()).map(([code, name]) => ({
    code,
    name
  })).sort((a, b) => a.name.localeCompare(b.name));
};

export const getStatesByCountry = (countryCode: string): Array<{ code: string; name: string }> => {
  const countryStates = locationData.states.get(countryCode);
  if (!countryStates) return [];
  
  return Array.from(countryStates.entries()).map(([code, name]) => ({
    code,
    name
  })).sort((a, b) => a.name.localeCompare(b.name));
};

export const getCitiesByState = (countryCode: string, stateCode: string): City[] => {
  const countryCities = locationData.cities.get(countryCode);
  if (!countryCities) return [];
  
  const stateCities = countryCities.get(stateCode);
  return stateCities ? [...stateCities].sort((a, b) => a.name.localeCompare(b.name)) : [];
};

export const searchCities = (
  query: string, 
  countryCode?: string, 
  stateCode?: string
): City[] => {
  const lowerQuery = query.toLowerCase();
  let results: City[] = [];

  if (countryCode && stateCode) {
    // Search within a specific state
    results = getCitiesByState(countryCode, stateCode);
  } else if (countryCode) {
    // Search within a specific country
    const countryCities = locationData.cities.get(countryCode);
    if (countryCities) {
      for (const stateCities of countryCities.values()) {
        results = results.concat(stateCities);
      }
    }
  } else {
    // Global search
    for (const country of locationData.cities.values()) {
      for (const stateCities of country.values()) {
        results = results.concat(stateCities);
      }
    }
  }

  return results
    .filter(city => 
      city.name.toLowerCase().includes(lowerQuery) ||
      (city.nameAscii && city.nameAscii.toLowerCase().includes(lowerQuery)) ||
      (city.adminName && city.adminName.toLowerCase().includes(lowerQuery))
    )
    .sort((a, b) => b.population - a.population) // Sort by population (largest first)
    .slice(0, 50); // Limit to 50 results
};

// Helper function to get country by code
export const getCountryByCode = (code: string): { code: string; name: string } | undefined => {
  const name = locationData.countries.get(code);
  return name ? { code, name } : undefined;
};

// Helper function to get state by code
export const getStateByCode = (countryCode: string, stateCode: string): { code: string; name: string } | undefined => {
  const state = locationData.states.get(countryCode)?.get(stateCode);
  return state ? { code: stateCode, name: state } : undefined;
};
