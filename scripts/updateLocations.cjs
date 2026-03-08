const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

// Read the current locations.ts file
const locationsPath = path.join(__dirname, '../src/data/locations.ts');
const locationsContent = fs.readFileSync(locationsPath, 'utf-8');

// Extract current countries, states, and cities from locations.ts
const currentCountries = new Set();
const currentStates = new Map(); // country -> Set of states
const currentCities = new Map(); // country -> state -> Set of cities

// Parse the locations.ts file to extract existing data
const countryMatches = locationsContent.match(/name: '([^']+)',\s*code: '([^']+)'/g);
if (countryMatches) {
  countryMatches.forEach(match => {
    const nameMatch = match.match(/name: '([^']+)'/);
    if (nameMatch) currentCountries.add(nameMatch[1]);
  });
}

// Read the CSV file
const csvPath = path.join(__dirname, '../src/data/worldcities.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parse the CSV
const records = parse(csvContent, {
  columns: true,
  skip_empty_lines: true,
  trim: true
});

// Process CSV data
const csvCountries = new Map(); // country -> { code, states: Map }

records.forEach(record => {
  const country = record.country;
  const countryCode = record.iso2;
  const state = record.admin_name || 'Unknown';
  const city = record.city;
  
  if (!country || !city) return;
  
  if (!csvCountries.has(country)) {
    csvCountries.set(country, {
      code: countryCode,
      states: new Map()
    });
  }
  
  const countryData = csvCountries.get(country);
  
  if (!countryData.states.has(state)) {
    countryData.states.set(state, new Set());
  }
  
  countryData.states.get(state).add(city);
});

// Find missing countries, states, and cities
const missingCountries = [];
const missingStates = new Map(); // country -> Set of missing states
const missingCities = new Map(); // country -> state -> Set of missing cities

// Check for missing countries
csvCountries.forEach((data, country) => {
  if (!currentCountries.has(country)) {
    missingCountries.push({
      name: country,
      code: data.code,
      states: Array.from(data.states.entries()).map(([stateName, cities]) => ({
        name: stateName,
        cities: Array.from(cities).slice(0, 10) // Limit to 10 cities per state
      }))
    });
  }
});

// Check for missing states in existing countries
csvCountries.forEach((csvData, country) => {
  if (currentCountries.has(country)) {
    // Extract existing states for this country from locations.ts
    const countryRegex = new RegExp(`name: '${country}',[^}]*states:\\s*\\[([^\\]]*(?:\\{[^}]*\\}[^\\]]*)*)\\]`, 's');
    const countryMatch = locationsContent.match(countryRegex);
    
    if (countryMatch) {
      const existingStates = new Set();
      const stateMatches = countryMatch[1].match(/name: '([^']+)'/g);
      if (stateMatches) {
        stateMatches.forEach(match => {
          const stateName = match.match(/name: '([^']+)'/)[1];
          existingStates.add(stateName);
        });
      }
      
      // Find missing states
      csvData.states.forEach((cities, stateName) => {
        if (!existingStates.has(stateName)) {
          if (!missingStates.has(country)) {
            missingStates.set(country, new Set());
          }
          missingStates.get(country).add(stateName);
        }
      });
    }
  }
});

// Generate the updated locations.ts content
function generateLocationsContent() {
  let content = `// Final Global & African Film Production Locations (Nollywood, Hollywood, Bollywood, etc.)

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

  // Helper function to get currency info
  function getCurrencyInfo(countryCode) {
    const currencyMap = {
      'US': { code: 'USD', symbol: '$' },
      'GB': { code: 'GBP', symbol: '£' },
      'NG': { code: 'NGN', symbol: '₦' },
      'CA': { code: 'CAD', symbol: 'C$' },
      'AU': { code: 'AUD', symbol: '$' },
      'JP': { code: 'JPY', symbol: '¥' },
      'CN': { code: 'CNY', symbol: '¥' },
      'IN': { code: 'INR', symbol: '₹' },
      'DE': { code: 'EUR', symbol: '€' },
      'FR': { code: 'EUR', symbol: '€' },
      'IT': { code: 'EUR', symbol: '€' },
      'ES': { code: 'EUR', symbol: '€' },
      'BR': { code: 'BRL', symbol: 'R$' },
      'MX': { code: 'MXN', symbol: '$' },
      'KR': { code: 'KRW', symbol: '₩' },
      'RU': { code: 'RUB', symbol: '₽' },
      'TR': { code: 'TRY', symbol: '₺' },
      'SA': { code: 'SAR', symbol: '﷼' },
      'AE': { code: 'AED', symbol: 'د.إ' },
      'EG': { code: 'EGP', symbol: 'E£' },
      'ZA': { code: 'ZAR', symbol: 'R' },
      'KE': { code: 'KES', symbol: 'KSh' },
      'GH': { code: 'GHS', symbol: 'GH₵' },
      'MA': { code: 'MAD', symbol: 'DH' },
      'ID': { code: 'IDR', symbol: 'Rp' },
      'TH': { code: 'THB', symbol: '฿' },
      'VN': { code: 'VND', symbol: '₫' },
      'MY': { code: 'MYR', symbol: 'RM' },
      'SG': { code: 'SGD', symbol: 'S$' },
      'PH': { code: 'PHP', symbol: '₱' },
      'PK': { code: 'PKR', symbol: '₨' },
      'BD': { code: 'BDT', symbol: '৳' },
      'LK': { code: 'LKR', symbol: '₨' },
      'NP': { code: 'NPR', symbol: '₨' },
      'MM': { code: 'MMK', symbol: 'K' },
      'KH': { code: 'KHR', symbol: '៛' },
      'LA': { code: 'LAK', symbol: '₭' },
      'MM': { code: 'MMK', symbol: 'K' },
      'AF': { code: 'AFN', symbol: '؋' },
      'IR': { code: 'IRR', symbol: '﷼' },
      'IQ': { code: 'IQD', symbol: 'ع.د' },
      'SY': { code: 'SYP', symbol: '£S' },
      'JO': { code: 'JOD', symbol: 'د.ا' },
      'LB': { code: 'LBP', symbol: 'ل.ل' },
      'IL': { code: 'ILS', symbol: '₪' },
      'CY': { code: 'EUR', symbol: '€' },
      'GR': { code: 'EUR', symbol: '€' },
      'PT': { code: 'EUR', symbol: '€' },
      'NL': { code: 'EUR', symbol: '€' },
      'BE': { code: 'EUR', symbol: '€' },
      'AT': { code: 'EUR', symbol: '€' },
      'CH': { code: 'CHF', symbol: 'Fr' },
      'SE': { code: 'SEK', symbol: 'kr' },
      'NO': { code: 'NOK', symbol: 'kr' },
      'DK': { code: 'DKK', symbol: 'kr' },
      'FI': { code: 'EUR', symbol: '€' },
      'PL': { code: 'PLN', symbol: 'zł' },
      'CZ': { code: 'CZK', symbol: 'Kč' },
      'HU': { code: 'HUF', symbol: 'Ft' },
      'RO': { code: 'RON', symbol: 'lei' },
      'BG': { code: 'BGN', symbol: 'лв' },
      'HR': { code: 'HRK', symbol: 'kn' },
      'SI': { code: 'EUR', symbol: '€' },
      'SK': { code: 'EUR', symbol: '€' },
      'EE': { code: 'EUR', symbol: '€' },
      'LV': { code: 'EUR', symbol: '€' },
      'LT': { code: 'EUR', symbol: '€' },
      'UA': { code: 'UAH', symbol: '₴' },
      'BY': { code: 'BYN', symbol: 'Br' },
      'MD': { code: 'MDL', symbol: 'L' },
      'GE': { code: 'GEL', symbol: '₾' },
      'AM': { code: 'AMD', symbol: '֏' },
      'AZ': { code: 'AZN', symbol: '₼' },
      'KZ': { code: 'KZT', symbol: '₸' },
      'KG': { code: 'KGS', symbol: 'с' },
      'TJ': { code: 'TJS', symbol: 'с' },
      'TM': { code: 'TMT', symbol: 'm' },
      'UZ': { code: 'UZS', symbol: 'сўм' },
      'MN': { code: 'MNT', symbol: '₮' },
      'NP': { code: 'NPR', symbol: '₨' },
      'BT': { code: 'BTN', symbol: 'Nu.' },
      'LK': { code: 'LKR', symbol: '₨' },
      'MV': { code: 'MVR', symbol: 'Rf' },
      'BD': { code: 'BDT', symbol: '৳' },
      'PK': { code: 'PKR', symbol: '₨' },
      'AF': { code: 'AFN', symbol: '؋' },
      'IR': { code: 'IRR', symbol: '﷼' }
    };
    
    return currencyMap[countryCode] || { code: 'USD', symbol: '$' };
  }

  // Add existing countries from the current file
  const existingCountries = [];
  const countryRegex = /name: '([^']+)',\s*code: '([^']+)'/g;
  let match;
  while ((match = countryRegex.exec(locationsContent)) !== null) {
    existingCountries.push({
      name: match[1],
      code: match[2]
    });
  }

  // Convert csvCountries to an array and sort it alphabetically
  const csvCountriesArray = Array.from(csvCountries.entries());
  csvCountriesArray.sort((a, b) => a[0].localeCompare(b[0], undefined, { sensitivity: 'base' }));

  // Process each country
  csvCountriesArray.forEach(([countryName, data]) => {
    const currency = getCurrencyInfo(data.code);
    content += `  {
    name: '${countryName}',
    code: '${data.code}',
    currency: '${currency.code}',
    currencySymbol: '${currency.symbol}',
    states: [
`;

  // Add states for this country (limit to 10 states per country to keep file manageable)
  const statesArray = Array.from(data.states.entries()).slice(0, 10);
  // Sort states alphabetically
  statesArray.sort((a, b) => a[0].localeCompare(b[0], undefined, { sensitivity: 'base' }));
  statesArray.forEach(([stateName, cities], index) => {
    content += `      { name: '${stateName}', cities: [`;
    const citiesArray = Array.from(cities).slice(0, 10); // Limit to 10 cities per state
    // Sort cities alphabetically
    citiesArray.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    citiesArray.forEach((city, cityIndex) => {
      content += `{ name: '${city}' }`;
      if (cityIndex < citiesArray.length - 1) content += ', ';
    });
    content += '] }';
    if (index < statesArray.length - 1) content += ',';
    content += '\n';
  });

  content += `    ]
  },\n`;
});

  content += `];

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

  return content;
}

// Write the updated file
const updatedContent = generateLocationsContent();
fs.writeFileSync(locationsPath, updatedContent);

console.log(`\n✅ Updated locations.ts with comprehensive data from worldcities.csv`);
console.log(`\n📊 Summary:`);
console.log(`   - Added ${missingCountries.length} new countries`);
console.log(`   - Total countries now: ${currentCountries.size + missingCountries.length}`);

// Show some of the added countries
if (missingCountries.length > 0) {
  console.log(`\n🌍 New countries added (first 10):`);
  missingCountries.slice(0, 10).forEach(country => {
    console.log(`   - ${country.name} (${country.code})`);
  });
  
  if (missingCountries.length > 10) {
    console.log(`   ... and ${missingCountries.length - 10} more`);
  }
}
