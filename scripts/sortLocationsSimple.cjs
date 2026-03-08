const fs = require('fs');
const path = require('path');

// Read the current locations.ts file
const locationsPath = path.join(__dirname, '../src/data/locations.ts');
const content = fs.readFileSync(locationsPath, 'utf-8');

// Find the start and end of the countries array
const startIndex = content.indexOf('export const countries: Country[] = [');
const endIndex = content.indexOf('];', startIndex);

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find countries array in the file');
  process.exit(1);
}

// Extract the part before and after the array
const beforeArray = content.substring(0, startIndex);
const afterArray = content.substring(endIndex + 2);

// Extract the array content
const arrayContent = content.substring(startIndex, endIndex + 2);

// Use a more robust approach to extract countries
const lines = arrayContent.split('\n');
const countries = [];
let currentCountry = null;
let currentStates = [];
let currentState = null;
let currentCities = [];
let braceLevel = 0;
let inCountriesArray = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  // Count braces to track structure
  braceLevel += (line.match(/{/g) || []).length;
  braceLevel -= (line.match(/}/g) || []).length;
  
  // Detect country start
  if (line.includes("name: '") && !currentCountry && braceLevel === 2) {
    const nameMatch = line.match(/name:\s*'([^']+)'/);
    const codeMatch = line.match(/code:\s*'([^']+)'/);
    const currencyMatch = line.match(/currency:\s*'([^']+)'/);
    const symbolMatch = line.match(/currencySymbol:\s*'([^']+)'/);
    
    if (nameMatch && codeMatch && currencyMatch && symbolMatch) {
      currentCountry = {
        name: nameMatch[1],
        code: codeMatch[1],
        currency: currencyMatch[1],
        currencySymbol: symbolMatch[1],
        states: []
      };
    }
  }
  
  // Detect state start
  if (line.includes("name: '") && currentCountry && !currentState && braceLevel === 3) {
    const stateMatch = line.match(/name:\s*'([^']+)'/);
    if (stateMatch) {
      currentState = {
        name: stateMatch[1],
        cities: []
      };
    }
  }
  
  // Detect city
  if (line.includes("name: '") && currentState && braceLevel === 4) {
    const cityMatch = line.match(/name:\s*'([^']+)'/);
    if (cityMatch) {
      currentState.cities.push(cityMatch[1]);
    }
  }
  
  // Close city array
  if (line.includes(']') && currentState && braceLevel === 3) {
    currentState.cities.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
  }
  
  // Close state
  if (line.includes('}') && currentState && braceLevel === 2) {
    currentCountry.states.push(currentState);
    currentState = null;
  }
  
  // Close country
  if (line.includes('}') && currentCountry && braceLevel === 1) {
    currentCountry.states.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
    countries.push(currentCountry);
    currentCountry = null;
  }
}

// Sort countries alphabetically
countries.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

// Generate new content
let newContent = beforeArray + `[\n`;

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

newContent += '];' + afterArray;

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
