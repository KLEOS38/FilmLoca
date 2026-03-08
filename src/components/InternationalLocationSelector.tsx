import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Search, Globe } from "lucide-react";

interface Country {
  code: string;
  name: string;
  states: State[];
}

interface State {
  code: string;
  name: string;
  cities: City[];
}

interface City {
  name: string;
  neighborhoods: string[];
}

const InternationalLocationSelector = ({ onLocationSelect, selectedLocation }: {
  onLocationSelect: (location: { country: string; state: string; city: string; neighborhood: string; address: string }) => void;
  selectedLocation?: { country: string; state: string; city: string; neighborhood: string; address: string };
}) => {
  const [selectedCountry, setSelectedCountry] = useState(selectedLocation?.country || '');
  const [selectedState, setSelectedState] = useState(selectedLocation?.state || '');
  const [selectedCity, setSelectedCity] = useState(selectedLocation?.city || '');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(selectedLocation?.neighborhood || '');
  const [address, setAddress] = useState(selectedLocation?.address || '');

  // Sample international data - in a real app, this would come from an API
  const countries: Country[] = [
    {
      code: 'NG',
      name: 'Nigeria',
      states: [
        {
          code: 'LAG',
          name: 'Lagos State',
          cities: [
            { name: 'Lagos Island', neighborhoods: ['Marina', 'Broad Street', 'Tinubu Square', 'Idumota', 'Balogun Market'] },
            { name: 'Victoria Island', neighborhoods: ['Ahmadu Bello Way', 'Adetokunbo Ademola', 'Ozumba Mbadiwe', 'Adeola Odeku', 'Akin Adesola'] },
            { name: 'Ikoyi', neighborhoods: ['Parkview Estate', 'Dolphin Estate', 'Osborne Road', 'Bourdillon Road', 'Falomo'] },
            { name: 'Lekki', neighborhoods: ['Lekki Phase 1', 'Lekki Phase 2', 'Chevron', 'VGC', 'Jakande'] },
            { name: 'Surulere', neighborhoods: ['Bode Thomas', 'Ojuelegba', 'Itire', 'Coker', 'Aguda'] },
            { name: 'Yaba', neighborhoods: ['Tejuosho', 'Sabo', 'Onike', 'Fadeyi', 'Akoka'] },
            { name: 'Ikeja', neighborhoods: ['Allen Avenue', 'Opebi', 'GRA', 'Alausa', 'Oregun'] },
            { name: 'Apapa', neighborhoods: ['Apapa GRA', 'Tincan Island', 'Wharf Road', 'Creek Road'] },
            { name: 'Mushin', neighborhoods: ['Mushin Central', 'Odi-Olowo', 'Ojuwoye', 'Papa Ajao'] }
          ]
        },
        {
          code: 'ABJ',
          name: 'Abuja (FCT)',
          cities: [
            { name: 'Garki', neighborhoods: ['Garki 1', 'Garki 2', 'Garki 3', 'Garki 4', 'Garki 5'] },
            { name: 'Wuse', neighborhoods: ['Wuse 1', 'Wuse 2', 'Wuse 3', 'Wuse 4', 'Wuse 5'] },
            { name: 'Asokoro', neighborhoods: ['Asokoro District', 'Diplomatic Zone', 'Presidential Villa', 'Asokoro Extension'] },
            { name: 'Maitama', neighborhoods: ['Maitama District', 'Maitama Extension', 'Maitama Hills', 'Maitama 2'] },
            { name: 'Utako', neighborhoods: ['Utako District', 'Utako Market', 'Utako Extension', 'Utako 2'] },
            { name: 'Jabi', neighborhoods: ['Jabi District', 'Jabi Lake', 'Jabi Extension', 'Jabi 2'] },
            { name: 'Gwarinpa', neighborhoods: ['Gwarinpa District', 'Gwarinpa Estate', 'Gwarinpa Extension', 'Gwarinpa 2'] },
            { name: 'Kubwa', neighborhoods: ['Kubwa 1', 'Kubwa 2', 'Kubwa 3', 'Byazhin'] },
            { name: 'Nyanya', neighborhoods: ['Nyanya 1', 'Nyanya 2', 'Karu', 'Jikwoyi'] }
          ]
        },
        {
          code: 'ENU',
          name: 'Enugu State',
          cities: [
            { name: 'Enugu', neighborhoods: ['GRA', 'Independence Layout', 'New Haven', 'Abakpa', 'Uwani'] },
            { name: 'Nsukka', neighborhoods: ['University of Nigeria', 'Nsukka Central', 'Opi', 'Ede-Oballa'] },
            { name: 'Oji River', neighborhoods: ['Oji River Central', 'Oji River North', 'Oji River South'] },
            { name: 'Udi', neighborhoods: ['Udi Central', 'Udi North', 'Udi South'] },
            { name: 'Ezeagu', neighborhoods: ['Ezeagu Central', 'Ezeagu North', 'Ezeagu South'] },
            { name: 'Amechi', neighborhoods: ['Amechi Central', 'Amechi North', 'Amechi South'] },
            { name: 'Amaechi Idodo', neighborhoods: ['Amaechi Idodo Central', 'Amaechi Idodo North', 'Amaechi Idodo South'] }
          ]
        },
        {
          code: 'OYO',
          name: 'Oyo State',
          cities: [
            { name: 'Ibadan', neighborhoods: ['Bodija', 'Agodi GRA', 'Jericho', 'Mokola', 'Sango', 'Challenge', 'Ring Road'] }
          ]
        },
        {
          code: 'DEL',
          name: 'Delta State',
          cities: [
            { name: 'Asaba', neighborhoods: ['GRA', 'Okpanam', 'Cable Point', 'DLA', 'Anwai', 'Oshimili North'] }
          ]
        }
      ]
    },
    {
      code: 'US',
      name: 'United States',
      states: [
        {
          code: 'CA',
          name: 'California',
          cities: [
            { name: 'Los Angeles', neighborhoods: ['Hollywood', 'Beverly Hills', 'Santa Monica', 'Venice', 'Downtown LA'] },
            { name: 'San Francisco', neighborhoods: ['SOMA', 'Mission District', 'Castro', 'Haight-Ashbury', 'Financial District'] },
            { name: 'San Diego', neighborhoods: ['Gaslamp Quarter', 'La Jolla', 'Pacific Beach', 'Mission Beach', 'Downtown'] }
          ]
        },
        {
          code: 'NY',
          name: 'New York',
          cities: [
            { name: 'New York City', neighborhoods: ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'] },
            { name: 'Buffalo', neighborhoods: ['Elmwood Village', 'Allentown', 'Hertel Avenue', 'Downtown', 'North Buffalo'] },
            { name: 'Rochester', neighborhoods: ['Park Avenue', 'East End', 'South Wedge', 'Corn Hill', 'Highland Park'] }
          ]
        },
        {
          code: 'TX',
          name: 'Texas',
          cities: [
            { name: 'Houston', neighborhoods: ['Downtown', 'Midtown', 'Montrose', 'Heights', 'Rice Village'] },
            { name: 'Dallas', neighborhoods: ['Uptown', 'Deep Ellum', 'Bishop Arts', 'Lower Greenville', 'Knox-Henderson'] },
            { name: 'Austin', neighborhoods: ['South Austin', 'East Austin', 'Downtown', 'Zilker', 'Clarksville'] }
          ]
        }
      ]
    },
    {
      code: 'UK',
      name: 'United Kingdom',
      states: [
        {
          code: 'ENG',
          name: 'England',
          cities: [
            { name: 'London', neighborhoods: ['Westminster', 'Camden', 'Islington', 'Hackney', 'Tower Hamlets'] },
            { name: 'Manchester', neighborhoods: ['City Centre', 'Northern Quarter', 'Ancoats', 'Chorlton', 'Didsbury'] },
            { name: 'Birmingham', neighborhoods: ['City Centre', 'Jewellery Quarter', 'Digbeth', 'Moseley', 'Kings Heath'] },
            { name: 'Liverpool', neighborhoods: ['City Centre', 'Albert Dock', 'Baltic Triangle', 'Lark Lane', 'Woolton'] },
            { name: 'Leeds', neighborhoods: ['City Centre', 'Headingley', 'Chapel Allerton', 'Roundhay', 'Meanwood'] },
            { name: 'Sheffield', neighborhoods: ['City Centre', 'Ecclesall', 'Kelham Island', 'Sharrow', 'Broomhill'] }
          ]
        },
        {
          code: 'SCT',
          name: 'Scotland',
          cities: [
            { name: 'Edinburgh', neighborhoods: ['Old Town', 'New Town', 'Leith', 'Stockbridge', 'Morningside'] },
            { name: 'Glasgow', neighborhoods: ['City Centre', 'West End', 'Merchant City', 'East End', 'Southside'] },
            { name: 'Aberdeen', neighborhoods: ['City Centre', 'Old Aberdeen', 'Rosemount', 'West End', 'Torry'] },
            { name: 'Dundee', neighborhoods: ['City Centre', 'West End', 'Broughty Ferry', 'Stobswell', 'Lochee'] },
            { name: 'Stirling', neighborhoods: ['City Centre', 'Bridge of Allan', 'Causewayhead', 'Raploch', 'Cornton'] },
            { name: 'Inverness', neighborhoods: ['City Centre', 'Crown', 'Dalneigh', 'Hilton', 'Merkinch'] }
          ]
        },
        {
          code: 'WLS',
          name: 'Wales',
          cities: [
            { name: 'Cardiff', neighborhoods: ['City Centre', 'Cathays', 'Roath', 'Canton', 'Pontcanna'] },
            { name: 'Swansea', neighborhoods: ['City Centre', 'Uplands', 'Mumbles', 'Sketty', 'Killay'] },
            { name: 'Newport', neighborhoods: ['City Centre', 'Caerleon', 'Allt-yr-yn', 'Malpas', 'Bassaleg'] },
            { name: 'Wrexham', neighborhoods: ['City Centre', 'Acton', 'Garden Village', 'Hightown', 'Rhosddu'] },
            { name: 'Barry', neighborhoods: ['Barry Island', 'Barry Town', 'Cadoxton', 'Gibbonsdown', 'Rhoose'] },
            { name: 'Caerphilly', neighborhoods: ['Town Centre', 'Van', 'Bedwas', 'Machen', 'Rudry'] }
          ]
        }
      ]
    },
    {
      code: 'CA',
      name: 'Canada',
      states: [
        {
          code: 'ON',
          name: 'Ontario',
          cities: [
            { name: 'Toronto', neighborhoods: ['Downtown', 'Yorkville', 'Kensington Market', 'Queen West', 'Distillery District'] },
            { name: 'Ottawa', neighborhoods: ['ByWard Market', 'Centretown', 'Glebe', 'Westboro', 'Hintonburg'] },
            { name: 'Hamilton', neighborhoods: ['Downtown', 'Westdale', 'Dundas', 'Ancaster', 'Stoney Creek'] },
            { name: 'London', neighborhoods: ['Downtown', 'Old East Village', 'Byron', 'Westmount', 'Masonville'] },
            { name: 'Kitchener', neighborhoods: ['Downtown', 'Uptown Waterloo', 'Doon', 'Forest Heights', 'Country Hills'] },
            { name: 'Windsor', neighborhoods: ['Downtown', 'Walkerville', 'Riverside', 'South Windsor', 'Tecumseh'] }
          ]
        },
        {
          code: 'BC',
          name: 'British Columbia',
          cities: [
            { name: 'Vancouver', neighborhoods: ['Downtown', 'Gastown', 'Yaletown', 'Kitsilano', 'Commercial Drive'] },
            { name: 'Victoria', neighborhoods: ['Downtown', 'James Bay', 'Fernwood', 'Oak Bay', 'Esquimalt'] },
            { name: 'Surrey', neighborhoods: ['City Centre', 'Guildford', 'Newton', 'Fleetwood', 'Cloverdale'] },
            { name: 'Burnaby', neighborhoods: ['Metrotown', 'Brentwood', 'Lougheed', 'Edmonds', 'Deer Lake'] },
            { name: 'Richmond', neighborhoods: ['City Centre', 'Steveston', 'Lansdowne', 'Terra Nova', 'Ironwood'] },
            { name: 'Abbotsford', neighborhoods: ['Downtown', 'Sumas Mountain', 'Clayburn', 'Clearbrook', 'Bradner'] }
          ]
        },
        {
          code: 'QC',
          name: 'Quebec',
          cities: [
            { name: 'Montreal', neighborhoods: ['Old Montreal', 'Plateau', 'Mile End', 'Griffintown', 'Little Italy'] },
            { name: 'Quebec City', neighborhoods: ['Old Quebec', 'Saint-Roch', 'Montcalm', 'Sainte-Foy', 'Limoilou'] },
            { name: 'Laval', neighborhoods: ['Chomedey', 'Duvernay', 'Fabreville', 'Sainte-Dorothée', 'Vimont'] },
            { name: 'Gatineau', neighborhoods: ['Hull', 'Aylmer', 'Gatineau', 'Buckingham', 'Masson-Angers'] },
            { name: 'Longueuil', neighborhoods: ['Vieux-Longueuil', 'Greenfield Park', 'Saint-Hubert', 'Boucherville', 'Brossard'] },
            { name: 'Sherbrooke', neighborhoods: ['Downtown', 'Lennoxville', 'Rock Forest', 'Bromptonville', 'Fleurimont'] }
          ]
        }
      ]
    }
  ];

  const selectedCountryData = countries.find(c => c.name === selectedCountry);
  const selectedStateData = selectedCountryData?.states.find(s => s.name === selectedState);
  const selectedCityData = selectedStateData?.cities.find(c => c.name === selectedCity);

  const handleLocationSelect = () => {
    if (selectedCountry && selectedState && selectedCity && address) {
      onLocationSelect({
        country: selectedCountry,
        state: selectedState,
        city: selectedCity,
        neighborhood: selectedNeighborhood || '',
        address: address
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          International Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select value={selectedCountry} onValueChange={(value) => {
              setSelectedCountry(value);
              setSelectedState('');
              setSelectedCity('');
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.name}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State/Province</Label>
            <Select 
              value={selectedState} 
              onValueChange={(value) => {
                setSelectedState(value);
                setSelectedCity('');
              }}
              disabled={!selectedCountry}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select state/province" />
              </SelectTrigger>
              <SelectContent>
                {selectedCountryData?.states.map((state) => (
                  <SelectItem key={state.code} value={state.name}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Select 
              value={selectedCity} 
              onValueChange={(value) => {
                setSelectedCity(value);
                setSelectedNeighborhood('');
              }}
              disabled={!selectedState}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {selectedStateData?.cities.map((city) => (
                  <SelectItem key={city.name} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="neighborhood">Neighborhood (Optional)</Label>
            <Select 
              value={selectedNeighborhood} 
              onValueChange={setSelectedNeighborhood}
              disabled={!selectedCity}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select neighborhood (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Skip neighborhood</SelectItem>
                {selectedCityData?.neighborhoods.map((neighborhood) => (
                  <SelectItem key={neighborhood} value={neighborhood}>
                    {neighborhood}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Full Address</Label>
            <Input
              id="address"
              placeholder="Enter full address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-4">
          <Button 
            onClick={handleLocationSelect}
            disabled={!selectedCountry || !selectedState || !selectedCity || !address}
            className="flex items-center gap-2"
          >
            <MapPin className="h-4 w-4" />
            Set Location
          </Button>
          
          {selectedCountry && selectedState && selectedCity && address && (
            <div className="text-sm text-muted-foreground">
              📍 {address}, {selectedCity}, {selectedState}, {selectedCountry}
              {selectedNeighborhood && `, ${selectedNeighborhood}`}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InternationalLocationSelector;
