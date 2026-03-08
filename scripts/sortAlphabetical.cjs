const fs = require('fs');
const path = require('path');

// Read the current locations.ts file
const locationsPath = path.join(__dirname, '../src/data/locations.ts');
const content = fs.readFileSync(locationsPath, 'utf-8');

// Extract the entire countries array using a more reliable method
const arrayStart = content.indexOf('export const countries: Country[] = [');
const arrayEnd = content.lastIndexOf('];');

if (arrayStart === -1 || arrayEnd === -1) {
  console.error('Could not find countries array');
  process.exit(1);
}

const beforeArray = content.substring(0, arrayStart);
const afterArray = content.substring(arrayEnd + 2);

// Extract the array content
const arrayContent = content.substring(arrayStart + 35, arrayEnd);

// Split into individual country objects
const countries = [];
let depth = 0;
let start = 0;
let inString = false;
let escapeNext = false;

for (let i = 0; i < arrayContent.length; i++) {
  const char = arrayContent[i];
  
  if (escapeNext) {
    escapeNext = false;
    continue;
  }
  
  if (char === '\\') {
    escapeNext = true;
    continue;
  }
  
  if (char === "'" && !escapeNext) {
    inString = !inString;
  }
  
  if (!inString) {
    if (char === '{') {
      depth++;
      if (depth === 1) {
        start = i;
      }
    } else if (char === '}') {
      if (depth === 1) {
        const countryStr = arrayContent.substring(start, i + 1);
        try {
          // Extract country info using regex
          const nameMatch = countryStr.match(/name:\s*'([^']+)'/);
          const codeMatch = countryStr.match(/code:\s*'([^']+)'/);
          const currencyMatch = countryStr.match(/currency:\s*'([^']+)'/);
          const symbolMatch = countryStr.match(/currencySymbol:\s*'([^']+)'/);
          
          if (nameMatch && codeMatch && currencyMatch && symbolMatch) {
            // Extract states
            const statesStr = countryStr.match(/states:\s*\[([\s\S]*)\]/);
            const states = [];
            
            if (statesStr) {
              const stateRegex = /{\s*name:\s*'([^']+)',\s*cities:\s*\[([\s\S]*?)\]}/g;
              let stateMatch;
              
              while ((stateMatch = stateRegex.exec(statesStr[1])) !== null) {
                const stateName = stateMatch[1];
                const citiesStr = stateMatch[2];
                
                // Extract cities
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
            }
            
            countries.push({
              name: nameMatch[1],
              code: codeMatch[1],
              currency: currencyMatch[1],
              currencySymbol: symbolMatch[1],
              states: states.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))
            });
          }
        } catch (e) {
          console.error('Error parsing country:', e);
        }
      }
      depth--;
    } else if (char === '{') {
      depth++;
    }
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
