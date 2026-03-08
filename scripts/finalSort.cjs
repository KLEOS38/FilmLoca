const fs = require('fs');
const path = require('path');

// Read the current locations.ts file
const locationsPath = path.join(__dirname, '../src/data/locations.ts');
const content = fs.readFileSync(locationsPath, 'utf-8');

// Find the countries array
const arrayStart = content.indexOf('export const countries: Country[] = [');
const arrayEnd = content.lastIndexOf('];');

if (arrayStart === -1 || arrayEnd === -1) {
  console.error('Could not find countries array');
  process.exit(1);
}

const beforeArray = content.substring(0, arrayStart);
const afterArray = content.substring(arrayEnd + 2);
const arrayContent = content.substring(arrayStart + 35, arrayEnd);

// Use eval to parse the countries (simpler approach for this specific case)
// First, we need to extract and evaluate the countries array
const modifiedContent = arrayContent
  .replace(/export const countries: Country\[] = /, 'const countries = ')
  .replace(/name:/g, '"name":')
  .replace(/code:/g, '"code":')
  .replace(/currency:/g, '"currency":')
  .replace(/currencySymbol:/g, '"currencySymbol":')
  .replace(/states:/g, '"states":')
  .replace(/cities:/g, '"cities":')
  .replace(/'/g, '"');

try {
  // Parse the modified JSON-like content
  const countries = JSON.parse(modifiedContent);
  
  // Sort each country's states alphabetically
  countries.forEach(country => {
    country.states.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
    
    // Sort each state's cities alphabetically
    country.states.forEach(state => {
      state.cities.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
    });
  });
  
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
        newContent += `{ name: '${city.name}' }`;
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
  
  // Show Nigeria's sorted states as example
  const nigeria = countries.find(c => c.name === 'Nigeria');
  if (nigeria) {
    console.log(`\n🇳🇬 Nigeria's states (alphabetical):`);
    nigeria.states.forEach((state, index) => {
      console.log(`   ${index + 1}. ${state.name}`);
    });
  }
  
} catch (error) {
  console.error('Error parsing countries:', error.message);
}
