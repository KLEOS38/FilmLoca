const fs = require('fs');
const path = require('path');

// Read the current locations.ts file
const locationsPath = path.join(__dirname, '../src/data/locations.ts');
const content = fs.readFileSync(locationsPath, 'utf-8');

// Extract the countries array from the file
const countriesMatch = content.match(/export const countries: Country\[] = \[([\s\S]*)\];/);
if (!countriesMatch) {
  console.error('Could not find countries array in the file');
  process.exit(1);
}

const countriesArrayStr = countriesMatch[1];

// Parse the countries array (this is a simplified parser)
const countries = [];
const countryRegex = /{\s*name:\s*'([^']+)',\s*code:\s*'([^']+)',\s*currency:\s*'([^']+)',\s*currencySymbol:\s*'([^']+)',\s*states:\s*\[([\s\S]*?)\]}/g;
let match;

while ((match = countryRegex.exec(countriesArrayStr)) !== null) {
  const countryName = match[1];
  const countryCode = match[2];
  const currency = match[3];
  const currencySymbol = match[4];
  const statesStr = match[5];
  
  // Parse states
  const states = [];
  const stateRegex = /{\s*name:\s*'([^']+)',\s*cities:\s*\[([\s\S]*?)\]}/g;
  let stateMatch;
  
  while ((stateMatch = stateRegex.exec(statesStr)) !== null) {
    const stateName = stateMatch[1];
    const citiesStr = stateMatch[2];
    
    // Parse cities
    const cities = [];
    const cityRegex = /name:\s*'([^']+)'/g;
    let cityMatch;
    
    while ((cityMatch = cityRegex.exec(citiesStr)) !== null) {
      cities.push(cityMatch[1]);
    }
    
    states.push({
      name: stateName,
      cities: cities.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
    });
  }
  
  countries.push({
    name: countryName,
    code: countryCode,
    currency: currency,
    currencySymbol: currencySymbol,
    states: states.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))
  });
}

// Sort countries alphabetically (case-insensitive)
countries.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

// Generate the new content
let newContent = `// Final Global & African Film Production Locations (Nollywood, Hollywood, Bollywood, etc.)

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

export const countries: Country[] = [
`;

countries.forEach((country, index) => {
  newContent += `  {
    name: '${country.name}',
    code: '${country.code}',
    currency: '${country.currency}',
    currencySymbol: '${country.currencySymbol}',
    states: [
`;

  country.states.forEach((state, stateIndex) => {
    newContent += `      { name: '${state.name}', cities: [`;
    state.cities.forEach((city, cityIndex) => {
      newContent += `{ name: '${city}' }`;
      if (cityIndex < state.cities.length - 1) newContent += ', ';
    });
    newContent += '] }';
    if (stateIndex < country.states.length - 1) newContent += ',';
    newContent += '\n';
  });

  newContent += `    ]
  }`;
  if (index < countries.length - 1) newContent += ',';
  newContent += '\n';
});

newContent += `];

// Helper functions (logic remains intact)
export const getCountries = (): string[] => countries.map(country => country.name);

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

export const getCurrencyForCountry = (countryName: string) => {
  const country = countries.find(c => c.name === countryName);
  return country ? { code: country.currency, symbol: country.currencySymbol } : { code: 'USD', symbol: '$' };
};
`;

// Write the sorted content back to the file
fs.writeFileSync(locationsPath, newContent);

console.log(`✅ Successfully sorted locations.ts file`);
console.log(`📊 Summary:`);
console.log(`   - Countries: ${countries.length}`);
console.log(`   - Total States: ${countries.reduce((sum, c) => sum + c.states.length, 0)}`);
console.log(`   - Total Cities: ${countries.reduce((sum, c) => sum + c.states.reduce((s, state) => s + state.cities.length, 0), 0)}`);

// Show first 10 countries
console.log(`\n🌍 First 10 countries (alphabetical):`);
countries.slice(0, 10).forEach((country, index) => {
  console.log(`   ${index + 1}. ${country.name} (${country.code})`);
});
