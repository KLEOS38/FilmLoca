// Final Global & African Film Production Locations (Nollywood, Hollywood, Bollywood, etc.)

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
  {
    name: 'Afghanistan',
    code: 'AF',
    currency: 'AFN',
    currencySymbol: '؋',
    states: [
      { name: 'Balkh', cities: [{ name: 'Bālā Kōh' }, { name: 'Balkh' }, { name: 'Khulm' }, { name: 'Mazār-e Sharīf' }] },
      { name: 'Farāh', cities: [{ name: 'Farāh' }, { name: 'Tujg' }] },
      { name: 'Helmand', cities: [{ name: 'Deh-e Shū' }, { name: 'Ḩukūmatī Baghrān' }, { name: 'Lashkar Gāh' }, { name: 'Sangīn' }] },
      { name: 'Herāt', cities: [{ name: 'Ghōriyān' }, { name: 'Herāt' }, { name: 'Islām Qal‘ah' }, { name: 'Karukh' }, { name: 'Kuhsān' }, { name: 'Kushk' }] },
      { name: 'Jowzjān', cities: [{ name: 'Āqchah' }, { name: 'Qarqīn' }, { name: 'Shibirghān' }] },
      { name: 'Kābul', cities: [{ name: 'Bagrāmī' }, { name: 'Gūdārah' }, { name: 'Kabul' }, { name: 'Paghmān' }] },
      { name: 'Kandahār', cities: [{ name: 'Kandahār' }] },
      { name: 'Kunduz', cities: [{ name: 'Chīchkah' }, { name: 'Imām Şāḩib' }, { name: 'Khānābād' }, { name: 'Kunduz' }, { name: 'Qal‘ah-ye Zāl' }] },
      { name: 'Nangarhār', cities: [{ name: 'Haskah Mēnah' }, { name: 'Jalālābād' }, { name: 'Māmā Khēl' }] },
      { name: 'Takhār', cities: [{ name: 'Tāluqān' }] }
    ]
  },
  {
    name: 'Albania',
    code: 'AL',
    currency: 'ALL',
    currencySymbol: 'L',
    states: [
      { name: 'Berat', cities: [{ name: 'Berat' }, { name: 'Çorovodë' }, { name: 'Kuçovë' }, { name: 'Perondi' }] },
      { name: 'Durrës', cities: [{ name: 'Durrës' }, { name: 'Fushë-Krujë' }, { name: 'Krujë' }, { name: 'Sukth' }] },
      { name: 'Elbasan', cities: [{ name: 'Belsh' }, { name: 'Elbasan' }, { name: 'Gramsh' }, { name: 'Librazhd' }, { name: 'Librazhd-Qendër' }] },
      { name: 'Fier', cities: [{ name: 'Fier' }, { name: 'Lushnjë' }, { name: 'Patos' }] },
      { name: 'Gjirokastër', cities: [{ name: 'Gjirokastër' }, { name: 'Përmet' }, { name: 'Tepelenë' }] },
      { name: 'Korçë', cities: [{ name: 'Buçimas' }, { name: 'Ersekë' }, { name: 'Korçë' }, { name: 'Libonik' }, { name: 'Pogradec' }] },
      { name: 'Lezhë', cities: [{ name: 'Laç' }, { name: 'Lezhë' }, { name: 'Rrëshen' }] },
      { name: 'Shkodër', cities: [{ name: 'Pukë' }, { name: 'Shkodër' }] },
      { name: 'Tiranë', cities: [{ name: 'Kamëz' }, { name: 'Kavajë' }, { name: 'Tirana' }] },
      { name: 'Vlorë', cities: [{ name: 'Sarandë' }, { name: 'Vlorë' }] }
    ]
  },
  {
    name: 'Algeria',
    code: 'DZ',
    currency: 'DZD',
    currencySymbol: 'د.ج',
    states: [
      { name: 'Alger', cities: [{ name: 'Aïn Taya' }, { name: 'Algiers' }, { name: 'Bab Ezzouar' }, { name: 'Birkhadem' }, { name: 'Bordj el Bahri' }, { name: 'Bordj el Kiffan' }, { name: 'Dar el Beïda' }, { name: 'El Marsa' }, { name: 'Rouiba' }] },
      { name: 'Annaba', cities: [{ name: 'Annaba' }, { name: 'Drean' }, { name: 'El Hadjar' }, { name: 'Nechmeya' }, { name: 'Oued el Aneb' }] },
      { name: 'Batna', cities: [{ name: 'Aïn Touta' }, { name: 'Arris' }, { name: 'Barika' }, { name: 'Batna' }, { name: 'Bouzina' }, { name: 'Ksar Belezma' }, { name: 'Merouana' }, { name: 'N’Gaous' }, { name: 'Tazoult-Lambese' }, { name: 'Teniet el Abed' }] },
      { name: 'Biskra', cities: [{ name: '’Aïn Naga' }, { name: 'Biskra' }, { name: 'Bouchagroun' }, { name: 'Djemmorah' }, { name: 'Foughala' }, { name: 'Lioua' }, { name: 'M’Chouneche' }, { name: 'Menaa' }, { name: 'Sidi Khaled' }, { name: 'Sidi Okba' }] },
      { name: 'Constantine', cities: [{ name: '’Aïn Abid' }, { name: 'Aïn Smara' }, { name: 'Constantine' }, { name: 'Didouche Mourad' }, { name: 'Ebn Ziad' }, { name: 'El Khroub' }, { name: 'Hamma Bouziane' }, { name: 'Ouled Rahmoun' }, { name: 'Zighout Youcef' }] },
      { name: 'M’sila', cities: [{ name: '‘Aïn el Hadjel' }, { name: '’Aïn el Melh' }, { name: 'Berhoum' }, { name: 'Hammam Dalaa' }, { name: 'M’Sila' }, { name: 'Magra' }, { name: 'Mechta Ouled Oulha' }, { name: 'Medjedel' }, { name: 'Selmane' }, { name: 'Sidi Aïssa' }] },
      { name: 'Oran', cities: [{ name: '’Aïn el Turk' }, { name: 'Aïn el Bya' }, { name: 'Arzew' }, { name: 'Assi Bou Nif' }, { name: 'Bir el Djir' }, { name: 'Douar Bou Tlelis' }, { name: 'Es Senia' }, { name: 'Misserghin' }, { name: 'Oran' }, { name: 'Sidi ech Chahmi' }] },
      { name: 'Sétif', cities: [{ name: '’Aïn Arnat' }, { name: '’Aïn Azel' }, { name: 'Aïn Oulmene' }, { name: 'Amoucha' }, { name: 'Arbaoun' }, { name: 'Beni Fouda' }, { name: 'Bougaa' }, { name: 'El Eulma' }, { name: 'Sétif' }, { name: 'Tala Yfassene' }] },
      { name: 'Sidi Bel Abbès', cities: [{ name: 'Râs el Ma' }, { name: 'Sfizef' }, { name: 'Sidi Bel Abbès' }, { name: 'Sidi Brahim' }, { name: 'Sidi Lahssen' }, { name: 'Télagh' }] },
      { name: 'Tébessa', cities: [{ name: 'Bekkaria' }, { name: 'Bir el Ater' }, { name: 'Bou Khadra' }, { name: 'Cheria' }, { name: 'El Kouif' }, { name: 'Morsott' }, { name: 'Negrine' }, { name: 'Ouenza' }, { name: 'Tébessa' }] }
    ]
  },
  {
    name: 'American Samoa',
    code: 'AS',
    currency: 'USD',
    currencySymbol: '$',
    states: [
      { name: 'Unknown', cities: [{ name: 'Pago Pago' }] }
    ]
  },
  {
    name: 'Andorra',
    code: 'AD',
    currency: 'EUR',
    currencySymbol: '€',
    states: [
      { name: 'Andorra la Vella', cities: [{ name: 'Andorra la Vella' }] },
      { name: 'Canillo', cities: [{ name: 'Canillo' }, { name: 'Sant Pere' }] },
      { name: 'Encamp', cities: [{ name: 'Encamp' }] },
      { name: 'Escaldes-Engordany', cities: [{ name: 'Escaldes-Engordany' }] },
      { name: 'La Massana', cities: [{ name: 'La Massana' }] },
      { name: 'Ordino', cities: [{ name: 'Ordino' }] },
      { name: 'Sant Julià de Lòria', cities: [{ name: 'Sant Julià de Lòria' }] }
    ]
  },
  {
    name: 'Angola',
    code: 'AO',
    currency: 'AOA',
    currencySymbol: 'Kz',
    states: [
      { name: 'Benguela', cities: [{ name: 'Baía Farta' }, { name: 'Balombo' }, { name: 'Benguela' }, { name: 'Bocoio' }, { name: 'Caimbambo' }, { name: 'Catumbela' }, { name: 'Chongoroi' }, { name: 'Cubal' }, { name: 'Ganda' }, { name: 'Lobito' }] },
      { name: 'Bié', cities: [{ name: 'Andulo' }, { name: 'Calenga' }, { name: 'Camacupa' }, { name: 'Catabola' }, { name: 'Chinguar' }, { name: 'Chitembo' }, { name: 'Chitemo' }, { name: 'Cuemba' }, { name: 'Cuito' }, { name: 'Cunhinga' }] },
      { name: 'Cabinda', cities: [{ name: 'Buco Zau' }, { name: 'Cabinda' }, { name: 'Cacongo' }] },
      { name: 'Huambo', cities: [{ name: 'Caála' }, { name: 'Catchiungo' }, { name: 'Huambo' }, { name: 'Londuimbali' }, { name: 'Longonjo' }, { name: 'Mungo' }, { name: 'Ndulo' }, { name: 'Tchindjendje' }, { name: 'Ucuma' }, { name: 'Vila Teixeira da Silva' }] },
      { name: 'Huíla', cities: [{ name: 'Caconda' }, { name: 'Cacula' }, { name: 'Caluquembe' }, { name: 'Catape' }, { name: 'Chibia' }, { name: 'Chicomba' }, { name: 'Lubango' }, { name: 'Matala' }, { name: 'Quilengues' }, { name: 'Quipungo' }] },
      { name: 'Luanda', cities: [{ name: 'Belas' }, { name: 'Cacuaco' }, { name: 'Cazenga' }, { name: 'Luanda' }, { name: 'Talatona' }] },
      { name: 'Lunda-Sul', cities: [{ name: 'Alto-Cuilo' }, { name: 'Cacolo' }, { name: 'Dala' }, { name: 'Muconda' }, { name: 'Saurimo' }] },
      { name: 'Malanje', cities: [{ name: 'Cacuso' }, { name: 'Cambundi Catembo' }, { name: 'Caombo' }, { name: 'Luquembo' }, { name: 'Malanje' }, { name: 'Marimba' }, { name: 'Mucari' }, { name: 'Quela' }, { name: 'Quirima' }, { name: 'Samba Cango' }] },
      { name: 'Moxico', cities: [{ name: 'Bala Cangamba' }, { name: 'Cazombo' }, { name: 'Luacano' }, { name: 'Luau' }, { name: 'Luena' }] },
      { name: 'Uíge', cities: [{ name: 'Cangola' }, { name: 'Damba' }, { name: 'Maquela do Zombo' }, { name: 'Mucaba' }, { name: 'Negage' }, { name: 'Nova Esperança' }, { name: 'Puri' }, { name: 'Quimbele' }, { name: 'Sanza Pombo' }, { name: 'Uíge' }] }
    ]
  },
  {
    name: 'Anguilla',
    code: 'AI',
    currency: 'XCD',
    currencySymbol: '$',
    states: [
      { name: 'Unknown', cities: [{ name: 'The Valley' }] }
    ]
  },
  {
    name: 'Antigua and Barbuda',
    code: 'AG',
    currency: 'XCD',
    currencySymbol: '$',
    states: [
      { name: 'Saint John', cities: [{ name: 'Saint John’s' }] }
    ]
  },
  {
    name: 'Argentina',
    code: 'AR',
    currency: 'ARS',
    currencySymbol: '$',
    states: [
      { name: 'Buenos Aires', cities: [{ name: 'Bahía Blanca' }, { name: 'Banfield' }, { name: 'González Catán' }, { name: 'Isidro Casanova' }, { name: 'José C. Paz' }, { name: 'La Plata' }, { name: 'Lanús' }, { name: 'Mar del Plata' }, { name: 'Merlo' }, { name: 'Quilmes' }] },
      { name: 'Buenos Aires, Ciudad Autónoma de', cities: [{ name: 'Buenos Aires' }, { name: 'Villa Celina' }] },
      { name: 'Córdoba', cities: [{ name: 'Alta Gracia' }, { name: 'Bell Ville' }, { name: 'Córdoba' }, { name: 'Cosquín' }, { name: 'La Calera' }, { name: 'Río Cuarto' }, { name: 'Río Tercero' }, { name: 'San Francisco' }, { name: 'Villa Carlos Paz' }, { name: 'Villa María' }] },
      { name: 'Corrientes', cities: [{ name: 'Bella Vista' }, { name: 'Corrientes' }, { name: 'Curuzú Cuatiá' }, { name: 'Gobernador Virasora' }, { name: 'Goya' }, { name: 'Mercedes' }, { name: 'Monte Caseros' }, { name: 'Paso de los Libres' }, { name: 'San Lorenzo' }, { name: 'Santo Tomé' }] },
      { name: 'Jujuy', cities: [{ name: 'Abra Pampa' }, { name: 'Humahuaca' }, { name: 'La Quiaca' }, { name: 'Libertador General San Martín' }, { name: 'Monte Rico' }, { name: 'Palpalá' }, { name: 'Perico' }, { name: 'San Pedro' }, { name: 'San Salvador de Jujuy' }, { name: 'Susques' }] },
      { name: 'Salta', cities: [{ name: 'Embarcación' }, { name: 'General Martín Miguel de Güemes' }, { name: 'Joaquín V. González' }, { name: 'Pichanal' }, { name: 'Profesor Salvador Mazza' }, { name: 'Rosario de la Frontera' }, { name: 'Rosario de Lerma' }, { name: 'Salta' }, { name: 'San Ramón de la Nueva Orán' }, { name: 'Tartagal' }] },
      { name: 'San Juan', cities: [{ name: 'Caucete' }, { name: 'Chimbas' }, { name: 'Rivadavia' }, { name: 'Rodeo' }, { name: 'San José de Jáchal' }, { name: 'San Juan' }, { name: 'San Martín' }, { name: 'Villa Aberastain' }, { name: 'Villa Krause' }] },
      { name: 'Santa Fe', cities: [{ name: 'Gobernador Gálvez' }, { name: 'Rafaela' }, { name: 'Reconquista' }, { name: 'Rosario' }, { name: 'San Justo' }, { name: 'San Lorenzo' }, { name: 'Santa Fe' }, { name: 'Santo Tomé' }, { name: 'Venado Tuerto' }, { name: 'Villa Constitución' }] },
      { name: 'Santiago del Estero', cities: [{ name: 'Añatuya' }, { name: 'Ciudad de Loreto' }, { name: 'Frías' }, { name: 'La Banda' }, { name: 'Monte Quemado' }, { name: 'Quimilí' }, { name: 'Santiago del Estero' }, { name: 'Termas de Río Hondo' }, { name: 'Villa Ojo de Agua' }] },
      { name: 'Tucumán', cities: [{ name: 'Aguilares' }, { name: 'Banda del Río Salí' }, { name: 'Bella Vista' }, { name: 'Concepción' }, { name: 'Famaillá' }, { name: 'Monteros' }, { name: 'San Isidro de Lules' }, { name: 'San Miguel de Tucumán' }, { name: 'Tafí Viejo' }, { name: 'Yerba Buena' }] }
    ]
  },
  {
    name: 'Armenia',
    code: 'AM',
    currency: 'AMD',
    currencySymbol: '֏',
    states: [
      { name: 'Aragatsotn', cities: [{ name: 'Ashtarak' }] },
      { name: 'Ararat', cities: [{ name: 'Artashat' }, { name: 'Masis' }, { name: 'Vedi' }] },
      { name: 'Armavir', cities: [{ name: 'Armavir' }, { name: 'Ejmiatsin' }, { name: 'Metsamor' }] },
      { name: 'Geghark’unik’', cities: [{ name: 'Gavarr' }, { name: 'Martuni' }, { name: 'Nerk’in Getashen' }, { name: 'Sevan' }, { name: 'Vardenik' }, { name: 'Vardenis' }] },
      { name: 'Kotayk’', cities: [{ name: 'Abovyan' }, { name: 'Byureghavan' }, { name: 'Charentsavan' }, { name: 'Hrazdan' }, { name: 'Nor Hachn' }, { name: 'Yeghvard' }] },
      { name: 'Lorri', cities: [{ name: 'Alaverdi' }, { name: 'Spitak' }, { name: 'Stepanavan' }, { name: 'Tashir' }, { name: 'Vanadzor' }] },
      { name: 'Shirak', cities: [{ name: 'Artik' }, { name: 'Gyumri' }] },
      { name: 'Syunik’', cities: [{ name: 'Goris' }, { name: 'Kapan' }, { name: 'Sisian' }] },
      { name: 'Tavush', cities: [{ name: 'Berd' }, { name: 'Dilijan' }, { name: 'Ijevan' }] },
      { name: 'Yerevan', cities: [{ name: 'Yerevan' }] }
    ]
  },
  {
    name: 'Aruba',
    code: 'AW',
    currency: 'AWG',
    currencySymbol: 'ƒ',
    states: [
      { name: 'Unknown', cities: [{ name: 'Oranjestad' }, { name: 'Tanki Leendert' }] }
    ]
  },
  {
    name: 'Australia',
    code: 'AU',
    currency: 'AUD',
    currencySymbol: 'CFA',
    states: [
      { name: 'Australian Capital Territory', cities: [{ name: 'Canberra' }] },
      { name: 'New South Wales', cities: [{ name: 'Bathurst' }, { name: 'Central Coast' }, { name: 'Dubbo' }, { name: 'Newcastle' }, { name: 'Orange' }, { name: 'Port Macquarie' }, { name: 'Quakers Hill' }, { name: 'Sydney' }, { name: 'Wagga Wagga' }, { name: 'Wollongong' }] },
      { name: 'Northern Territory', cities: [{ name: 'Adelaide River' }, { name: 'Alice Springs' }, { name: 'Darwin' }, { name: 'Katherine' }, { name: 'McMinns Lagoon' }, { name: 'Palmerston' }, { name: 'Pine Creek' }, { name: 'Yulara' }] },
      { name: 'Queensland', cities: [{ name: 'Brisbane' }, { name: 'Bundaberg' }, { name: 'Cairns' }, { name: 'Gold Coast' }, { name: 'Ipswich' }, { name: 'Mackay' }, { name: 'Maroochydore' }, { name: 'Rockhampton' }, { name: 'Toowoomba' }, { name: 'Townsville' }] },
      { name: 'South Australia', cities: [{ name: 'Adelaide' }, { name: 'Berri' }, { name: 'Ceduna' }, { name: 'Mount Barker' }, { name: 'Mount Gambier' }, { name: 'Murray Bridge' }, { name: 'Port Augusta' }, { name: 'Port Lincoln' }, { name: 'Victor Harbor' }, { name: 'Whyalla' }] },
      { name: 'Tasmania', cities: [{ name: 'Bicheno' }, { name: 'Burnie' }, { name: 'Devonport' }, { name: 'Hobart' }, { name: 'Kingston' }, { name: 'Launceston' }, { name: 'Oatlands' }, { name: 'Queenstown' }, { name: 'Scottsdale' }, { name: 'Smithton' }] },
      { name: 'Victoria', cities: [{ name: 'Ballarat' }, { name: 'Bendigo' }, { name: 'Cranbourne' }, { name: 'Frankston' }, { name: 'Geelong' }, { name: 'Melbourne' }, { name: 'Melton' }, { name: 'Mildura' }, { name: 'Pakenham' }, { name: 'Sunbury' }] },
      { name: 'Western Australia', cities: [{ name: 'Albany' }, { name: 'Australind' }, { name: 'Bunbury' }, { name: 'Busselton' }, { name: 'Geraldton' }, { name: 'Kalgoorlie' }, { name: 'Karratha' }, { name: 'Kwinana' }, { name: 'Mandurah' }, { name: 'Perth' }] }
    ]
  },
  {
    name: 'Austria',
    code: 'AT',
    currency: 'EUR',
    currencySymbol: '€',
    states: [
      { name: 'Burgenland', cities: [{ name: 'Eisenstadt' }] },
      { name: 'Kärnten', cities: [{ name: 'Feldkirchen' }, { name: 'Klagenfurt' }, { name: 'Sankt Andrä' }, { name: 'Sankt Veit an der Glan' }, { name: 'Spittal an der Drau' }, { name: 'Velden am Wörthersee' }, { name: 'Villach' }, { name: 'Völkermarkt' }, { name: 'Wolfsberg' }] },
      { name: 'Niederösterreich', cities: [{ name: 'Amstetten' }, { name: 'Baden' }, { name: 'Klosterneuburg' }, { name: 'Krems an der Donau' }, { name: 'Mödling' }, { name: 'Sankt Pölten' }, { name: 'Schwechat' }, { name: 'Stockerau' }, { name: 'Traiskirchen' }, { name: 'Wiener Neustadt' }] },
      { name: 'Oberösterreich', cities: [{ name: 'Ansfelden' }, { name: 'Bad Ischl' }, { name: 'Braunau am Inn' }, { name: 'Gmunden' }, { name: 'Leonding' }, { name: 'Linz' }, { name: 'Marchtrenk' }, { name: 'Steyr' }, { name: 'Traun' }, { name: 'Wels' }] },
      { name: 'Salzburg', cities: [{ name: 'Bischofshofen' }, { name: 'Hallein' }, { name: 'Saalfelden am Steinernen Meer' }, { name: 'Salzburg' }, { name: 'Sankt Johann im Pongau' }, { name: 'Seekirchen am Wallersee' }, { name: 'Zell am See' }] },
      { name: 'Steiermark', cities: [{ name: 'Bruck an der Mur' }, { name: 'Deutschlandsberg' }, { name: 'Feldbach' }, { name: 'Graz' }, { name: 'Kapfenberg' }, { name: 'Knittelfeld' }, { name: 'Leibnitz' }, { name: 'Leoben' }, { name: 'Trofaiach' }, { name: 'Weiz' }] },
      { name: 'Tirol', cities: [{ name: 'Hall in Tirol' }, { name: 'Imst' }, { name: 'Innsbruck' }, { name: 'Kufstein' }, { name: 'Lienz' }, { name: 'Rum' }, { name: 'Sankt Johann in Tirol' }, { name: 'Schwaz' }, { name: 'Telfs' }, { name: 'Wörgl' }] },
      { name: 'Vorarlberg', cities: [{ name: 'Bludenz' }, { name: 'Bregenz' }, { name: 'Dornbirn' }, { name: 'Feldkirch' }, { name: 'Götzis' }, { name: 'Hard' }, { name: 'Hohenems' }, { name: 'Lochau' }, { name: 'Lustenau' }, { name: 'Rankweil' }] },
      { name: 'Wien', cities: [{ name: 'Vienna' }] }
    ]
  },
  {
    name: 'Azerbaijan',
    code: 'AZ',
    currency: 'AZN',
    currencySymbol: '₼',
    states: [
      { name: 'Abşeron', cities: [{ name: 'Saray' }, { name: 'Xırdalan' }] },
      { name: 'Bakı', cities: [{ name: 'Bakıxanov' }, { name: 'Baku' }, { name: 'Biləcəri' }, { name: 'Binə' }, { name: 'Binəqədi' }, { name: 'Hövsan' }, { name: 'Lökbatan' }, { name: 'M.Ə. Rəsulzadə' }, { name: 'Maştağa' }, { name: 'Qaraçuxur' }] },
      { name: 'Gəncə', cities: [{ name: 'Gəncə' }] },
      { name: 'Mingəçevir', cities: [{ name: 'Mingəçevir' }] },
      { name: 'Naxçıvan', cities: [{ name: 'Əliabad' }, { name: 'Naxçıvan' }] },
      { name: 'Salyan', cities: [{ name: 'Salyan' }, { name: 'Şatrovka' }] },
      { name: 'Şəki', cities: [{ name: 'Baş Göynük' }, { name: 'Şəki' }] },
      { name: 'Şirvan', cities: [{ name: 'Şirvan' }] },
      { name: 'Sumqayıt', cities: [{ name: 'Corat' }, { name: 'Hacı Zeynalabdin' }, { name: 'Sumqayıt' }] },
      { name: 'Yevlax', cities: [{ name: 'Yevlax' }] }
    ]
  },
  {
    name: 'Bahamas, The',
    code: 'BS',
    currency: 'BSD',
    currencySymbol: 'CFA',
    states: [
      { name: 'City of Freeport', cities: [{ name: 'Freeport City' }, { name: 'Lucaya' }] },
      { name: 'Unknown', cities: [{ name: 'Nassau' }] },
      { name: 'West Grand Bahama', cities: [{ name: 'West End' }] }
    ]
  },
  {
    name: 'Bahrain',
    code: 'BH',
    currency: 'BHD',
    currencySymbol: 'د.ب',
    states: [
      { name: 'Al ‘Āşimah', cities: [{ name: 'Jidd Ḩafş' }, { name: 'Manama' }, { name: 'Sitrah' }] },
      { name: 'Al Janūbīyah', cities: [{ name: 'Madīnat ‘Īsá' }] },
      { name: 'Al Muḩarraq', cities: [{ name: 'Al Muḩarraq' }] },
      { name: 'Ash Shamālīyah', cities: [{ name: 'Ad Dirāz' }, { name: 'Al Hamalah' }, { name: 'Al Mālikīyah' }, { name: 'Karrānah' }, { name: 'Madīnat Ḩamad' }] }
    ]
  },
  {
    name: 'Bangladesh',
    code: 'BD',
    currency: 'BDT',
    currencySymbol: '৳',
    states: [
      { name: 'Barishal', cities: [{ name: 'Amtali' }, { name: 'Barguna' }, { name: 'Barishal' }, { name: 'Bhāndāria' }, { name: 'Bhola' }, { name: 'Daulatkhān' }, { name: 'Kaukhāli' }, { name: 'Mathba' }, { name: 'Nālchiti' }, { name: 'Pirojpur' }] },
      { name: 'Chattogram', cities: [{ name: 'Bānchpār' }, { name: 'Barura' }, { name: 'Brāhmanbāria' }, { name: 'Brahmanpara' }, { name: 'Chattogram' }, { name: 'Chauddagram' }, { name: 'Comilla' }, { name: 'Companiganj' }, { name: 'Cox’s Bāzār' }, { name: 'Feni' }] },
      { name: 'Dhaka', cities: [{ name: 'Dhaka' }, { name: 'Farīdpur' }, { name: 'Gāzipura' }, { name: 'Nārāyanganj' }, { name: 'Narsingdi' }, { name: 'Savar' }, { name: 'Siddhirganj' }, { name: 'Srīpur' }, { name: 'Tāngāil' }, { name: 'Tungi' }] },
      { name: 'Khulna', cities: [{ name: 'Benāpol' }, { name: 'Char Fasson' }, { name: 'Chuādānga' }, { name: 'Jālākāti' }, { name: 'Jessore' }, { name: 'Jhenida' }, { name: 'Khulna' }, { name: 'Kushtia' }, { name: 'Patuakhāli' }, { name: 'Sātkhira' }] },
      { name: 'Mymensingh', cities: [{ name: 'Jamālpur' }, { name: 'Muktāgācha' }, { name: 'Mymensingh' }, { name: 'Netrakona' }, { name: 'Phulpur' }] },
      { name: 'Rājshāhi', cities: [{ name: 'Bogra' }, { name: 'Kālihāti' }, { name: 'Naogaon' }, { name: 'Nawābganj' }, { name: 'Nazipur' }, { name: 'Pābna' }, { name: 'Raharpur' }, { name: 'Rājshāhi' }, { name: 'Sherpur' }, { name: 'Sirājganj' }] },
      { name: 'Rangpur', cities: [{ name: 'Dinājpur' }, { name: 'Gaibandha' }, { name: 'Lalmanirhat' }, { name: 'Rangapukur' }, { name: 'Rangpur' }, { name: 'Saidpur' }] },
      { name: 'Sylhet', cities: [{ name: 'Habiganj' }, { name: 'Maulavi Bāzār' }, { name: 'Sunāmganj' }, { name: 'Sylhet' }] }
    ]
  },
  {
    name: 'Barbados',
    code: 'BB',
    currency: 'BBD',
    currencySymbol: 'CFA',
    states: [
      { name: 'Saint Michael', cities: [{ name: 'Bridgetown' }] }
    ]
  },
  {
    name: 'Belarus',
    code: 'BY',
    currency: 'BYN',
    currencySymbol: 'Br',
    states: [
      { name: 'Brestskaya Voblasts’', cities: [{ name: 'Baranavichy' }, { name: 'Brest' }, { name: 'Byaroza' }, { name: 'Drahichyn' }, { name: 'Ivanava' }, { name: 'Ivatsevichy' }, { name: 'Kobryn' }, { name: 'Luninyets' }, { name: 'Pinsk' }, { name: 'Pruzhany' }] },
      { name: 'Homyel’skaya Voblasts’', cities: [{ name: 'Dobrush' }, { name: 'Homyel’' }, { name: 'Kalinkavichy' }, { name: 'Khoyniki' }, { name: 'Mazyr' }, { name: 'Rahachow' }, { name: 'Rechytsa' }, { name: 'Svyetlahorsk' }, { name: 'Zhlobin' }, { name: 'Zhytkavichy' }] },
      { name: 'Hrodzyenskaya Voblasts’', cities: [{ name: 'Ashmyany' }, { name: 'Astravyets' }, { name: 'Hrodna' }, { name: 'Lida' }, { name: 'Masty' }, { name: 'Navahrudak' }, { name: 'Shchuchyn' }, { name: 'Slonim' }, { name: 'Smarhon' }, { name: 'Vawkavysk' }] },
      { name: 'Mahilyowskaya Voblasts’', cities: [{ name: 'Asipovichy' }, { name: 'Babruysk' }, { name: 'Bykhaw' }, { name: 'Horki' }, { name: 'Kastsyukovichy' }, { name: 'Klimavichy' }, { name: 'Krychaw' }, { name: 'Mahilyow' }, { name: 'Mstsislaw' }, { name: 'Shklow' }] },
      { name: 'Minsk', cities: [{ name: 'Minsk' }] },
      { name: 'Minskaya Voblasts’', cities: [{ name: 'Dzyarzhynsk' }, { name: 'Fanipal’' }, { name: 'Horad Smalyavichy' }, { name: 'Maladzyechna' }, { name: 'Mar’’ina Horka' }, { name: 'Salihorsk' }, { name: 'Slutsk' }, { name: 'Stowbtsy' }, { name: 'Vilyeyka' }, { name: 'Zaslawye' }] },
      { name: 'Vitsyebskaya Voblasts’', cities: [{ name: 'Baran' }, { name: 'Haradok' }, { name: 'Hlybokaye' }, { name: 'Lyepyel' }, { name: 'Navapolatsk' }, { name: 'Novalukoml’' }, { name: 'Orsha' }, { name: 'Pastavy' }, { name: 'Polatsk' }, { name: 'Vitsyebsk' }] }
    ]
  },
  {
    name: 'Belgium',
    code: 'BE',
    currency: 'EUR',
    currencySymbol: '€',
    states: [
      { name: 'Brussels-Capital Region', cities: [{ name: 'Anderlecht' }, { name: 'Brussels' }, { name: 'Etterbeek' }, { name: 'Evere' }, { name: 'Forest' }, { name: 'Ganshoren' }, { name: 'Jette' }, { name: 'Laeken' }, { name: 'Schaarbeek' }, { name: 'Sint-Joost-ten-Node' }] },
      { name: 'Flanders', cities: [{ name: 'Aalst' }, { name: 'Antwerp' }, { name: 'Bruges' }, { name: 'Deurne' }, { name: 'Gent' }, { name: 'Hasselt' }, { name: 'Kortrijk' }, { name: 'Mechelen' }, { name: 'Moortebeek' }, { name: 'Sint-Niklaas' }] },
      { name: 'Wallonia', cities: [{ name: 'Charleroi' }, { name: 'Herstal' }, { name: 'La Louvière' }, { name: 'Liège' }, { name: 'Mons' }, { name: 'Mouscron' }, { name: 'Namur' }, { name: 'Seraing' }, { name: 'Tournai' }, { name: 'Verviers' }] }
    ]
  },
  {
    name: 'Belize',
    code: 'BZ',
    currency: 'BZD',
    currencySymbol: 'CFA',
    states: [
      { name: 'Belize', cities: [{ name: 'Belize City' }, { name: 'San Pedro' }] },
      { name: 'Cayo', cities: [{ name: 'Belmopan' }, { name: 'San Ignacio' }] },
      { name: 'Corozal', cities: [{ name: 'Corozal' }] },
      { name: 'Orange Walk', cities: [{ name: 'Orange Walk' }] },
      { name: 'Stann Creek', cities: [{ name: 'Dangriga' }] },
      { name: 'Toledo', cities: [{ name: 'Punta Gorda' }] }
    ]
  },
  {
    name: 'Benin',
    code: 'BJ',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Alibori', cities: [{ name: 'Bagou' }, { name: 'Banikoara' }, { name: 'Founougo' }, { name: 'Gogounou' }, { name: 'Goumori' }, { name: 'Kandi' }, { name: 'Karimama' }, { name: 'Ségbana' }, { name: 'Sinmpérékou' }, { name: 'Sori' }] },
      { name: 'Atacora', cities: [{ name: 'Boukoumbé' }, { name: 'Guéné' }, { name: 'Kérou' }, { name: 'Kouandé' }, { name: 'Malanville' }, { name: 'Matéri' }, { name: 'Natitingou' }, { name: 'Péhonko' }, { name: 'Tanguiéta' }, { name: 'Toukountouna' }] },
      { name: 'Atlantique', cities: [{ name: 'Abomey-Calavi' }, { name: 'Akassato' }, { name: 'Allada' }, { name: 'Godomè' }, { name: 'Golo-Djigbé' }, { name: 'Ouidah' }, { name: 'So-Awa' }, { name: 'Toffo' }, { name: 'Tori-Bossito' }, { name: 'Zinvié' }] },
      { name: 'Borgou', cities: [{ name: 'Bakaga' }, { name: 'Bembèrèkè' }, { name: 'Bouka' }, { name: 'Kalalé' }, { name: 'Ndali' }, { name: 'Nikki' }, { name: 'Parakou' }, { name: 'Pèrèrè' }, { name: 'Sinendé' }, { name: 'Tchaourou' }] },
      { name: 'Couffo', cities: [{ name: 'Adjahomé' }, { name: 'Aplahoué' }, { name: 'Ayomi' }, { name: 'Azové' }, { name: 'Djakotomé' }, { name: 'Kissa' }, { name: 'Lalo' }, { name: 'Togba' }, { name: 'Tota' }, { name: 'Toviklin' }] },
      { name: 'Donga', cities: [{ name: 'Barei' }, { name: 'Bassila' }, { name: 'Bougou' }, { name: 'Djougou' }, { name: 'Kolokondé' }, { name: 'Kopargo' }, { name: 'Massi' }, { name: 'Onklou' }, { name: 'Ouaké' }, { name: 'Pabégou' }] },
      { name: 'Littoral', cities: [{ name: 'Cotonou' }] },
      { name: 'Ouémé', cities: [{ name: 'Adjarra' }, { name: 'Adjohon' }, { name: 'Agblangandan' }, { name: 'Avrankou' }, { name: 'Bonou' }, { name: 'Dangbo' }, { name: 'Ekpé' }, { name: 'Missérété' }, { name: 'Porto-Novo' }, { name: 'Vakon' }] },
      { name: 'Plateau', cities: [{ name: 'Adakplamé' }, { name: 'Adjaouèrè' }, { name: 'Banigbé' }, { name: 'Idigny' }, { name: 'Ifanhim' }, { name: 'Issaba' }, { name: 'Kétou' }, { name: 'Massé' }, { name: 'Pobé' }, { name: 'Sakété' }] },
      { name: 'Zou', cities: [{ name: 'Abomey' }, { name: 'Agbangnizoun' }, { name: 'Agouna' }, { name: 'Bohicon' }, { name: 'Cové' }, { name: 'Djidja' }, { name: 'Ouinhri' }, { name: 'Sagon' }, { name: 'Zagnanado' }, { name: 'Zogbodomé' }] }
    ]
  },
  {
    name: 'Bermuda',
    code: 'BM',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Hamilton', cities: [{ name: 'Hamilton' }] }
    ]
  },
  {
    name: 'Bhutan',
    code: 'BT',
    currency: 'BTN',
    currencySymbol: 'Nu.',
    states: [
      { name: 'Bumthang', cities: [{ name: 'Jakar' }] },
      { name: 'Chhukha', cities: [{ name: 'Phuntsholing' }, { name: 'Tsimasham' }] },
      { name: 'Mongar', cities: [{ name: 'Mongar' }] },
      { name: 'Punakha', cities: [{ name: 'Punakha' }] },
      { name: 'Samdrup Jongkhar', cities: [{ name: 'Samdrup Jongkhar' }] },
      { name: 'Samtse', cities: [{ name: 'Samtse' }] },
      { name: 'Sarpang', cities: [{ name: 'Geylegphug' }, { name: 'Sarpang' }] },
      { name: 'Thimphu', cities: [{ name: 'Thimphu' }] },
      { name: 'Trashigang', cities: [{ name: 'Trashigang' }] },
      { name: 'Wangdue Phodrang', cities: [{ name: 'Wangdue Phodrang' }] }
    ]
  },
  {
    name: 'Bolivia',
    code: 'BO',
    currency: 'BOB',
    currencySymbol: 'Bs',
    states: [
      { name: 'Chuquisaca', cities: [{ name: 'Camargo' }, { name: 'Padilla' }, { name: 'Sucre' }, { name: 'Tarabuco' }] },
      { name: 'Cochabamba', cities: [{ name: 'Cochabamba' }, { name: 'Colcapirhua' }, { name: 'Ivirgarzama' }, { name: 'Mizque' }, { name: 'Puerto Villarroel' }, { name: 'Quillacollo' }, { name: 'Sacaba' }, { name: 'Sipe Sipe' }, { name: 'Tiquipaya' }, { name: 'Villa Tunari' }] },
      { name: 'El Beni', cities: [{ name: 'Guayaramerín' }, { name: 'Magdalena' }, { name: 'Reyes' }, { name: 'Riberalta' }, { name: 'Rurrenabaque' }, { name: 'San Borja' }, { name: 'San Ignacio de Moxo' }, { name: 'San Ramón' }, { name: 'Santa Ana de Yacuma' }, { name: 'Trinidad' }] },
      { name: 'La Paz', cities: [{ name: 'Achacachi' }, { name: 'Achocalla' }, { name: 'Caranavi' }, { name: 'Chulumani' }, { name: 'Corocoro' }, { name: 'El Alto' }, { name: 'La Paz' }, { name: 'Mapiri' }, { name: 'Patacamaya' }, { name: 'Viacha' }] },
      { name: 'Oruro', cities: [{ name: 'Challapata' }, { name: 'Huanuni' }, { name: 'Oruro' }, { name: 'Sabaya' }] },
      { name: 'Pando', cities: [{ name: 'Cobija' }, { name: 'Puerto America' }] },
      { name: 'Potosí', cities: [{ name: 'Betanzos' }, { name: 'Llallagua' }, { name: 'Potosí' }, { name: 'Ravelo' }, { name: 'Torotoro' }, { name: 'Tupiza' }, { name: 'Uncia' }, { name: 'Uyuni' }, { name: 'Villa Martín Colchak' }, { name: 'Villazón' }] },
      { name: 'Santa Cruz', cities: [{ name: 'Ascención de Guarayos' }, { name: 'Camiri' }, { name: 'Cotoca' }, { name: 'Mineros' }, { name: 'Montero' }, { name: 'San Ignacio de Velasco' }, { name: 'San Julián' }, { name: 'Santa Cruz de la Sierra' }, { name: 'Warnes' }, { name: 'Yapacani' }] },
      { name: 'Tarija', cities: [{ name: 'Bermejo' }, { name: 'Entre Ríos' }, { name: 'San Lorenzo' }, { name: 'Tarija' }, { name: 'Villamontes' }, { name: 'Yacuiba' }] }
    ]
  },
  {
    name: 'Bonaire, Sint Eustatius, and Saba',
    code: 'BQ',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Bonaire', cities: [{ name: 'Kralendijk' }] },
      { name: 'Saba', cities: [{ name: 'The Bottom' }] },
      { name: 'Sint Eustatius', cities: [{ name: 'Oranjestad' }] }
    ]
  },
  {
    name: 'Bosnia and Herzegovina',
    code: 'BA',
    currency: 'BAM',
    currencySymbol: 'KM',
    states: [
      { name: 'Bosnia and Herzegovina, Federation of', cities: [{ name: 'Bihać' }, { name: 'Cazin' }, { name: 'Ilidža' }, { name: 'Lukavac' }, { name: 'Mostar' }, { name: 'Sarajevo' }, { name: 'Travnik' }, { name: 'Tuzla' }, { name: 'Zenica' }, { name: 'Živinice' }] },
      { name: 'Brcko District', cities: [{ name: 'Brčko' }] },
      { name: 'Srpska, Republika', cities: [{ name: 'Banja Luka' }, { name: 'Bijeljina' }, { name: 'Bratunac' }, { name: 'Brod' }, { name: 'Doboj' }, { name: 'Pale' }, { name: 'Prijedor' }, { name: 'Stara Gora' }, { name: 'Trebinje' }, { name: 'Zvornik' }] }
    ]
  },
  {
    name: 'Botswana',
    code: 'BW',
    currency: 'BWP',
    currencySymbol: 'P',
    states: [
      { name: 'Central', cities: [{ name: 'Bobonong' }, { name: 'Letlhakane' }, { name: 'Mahalapye' }, { name: 'Mmadinare' }, { name: 'Mopipi' }, { name: 'Nata' }, { name: 'Palapye' }, { name: 'Serowe' }, { name: 'Shoshong' }] },
      { name: 'Francistown', cities: [{ name: 'Francistown' }] },
      { name: 'Gaborone', cities: [{ name: 'Gaborone' }] },
      { name: 'Kgatleng', cities: [{ name: 'Mochudi' }] },
      { name: 'Kweneng', cities: [{ name: 'Gabane' }, { name: 'Metsemotlhaba' }, { name: 'Mmopone' }, { name: 'Mogoditshane' }, { name: 'Molepolole' }, { name: 'Thamaga' }] },
      { name: 'Lobatse', cities: [{ name: 'Lobatse' }] },
      { name: 'North West', cities: [{ name: 'Maun' }, { name: 'Muhembo' }, { name: 'Nokaneng' }, { name: 'Tsau' }] },
      { name: 'Selibe Phikwe', cities: [{ name: 'Selibe Phikwe' }] },
      { name: 'South East', cities: [{ name: 'Kopong' }, { name: 'Ramotswa' }, { name: 'Tlokweng' }] },
      { name: 'Southern', cities: [{ name: 'Kanye' }, { name: 'Mosopa' }] }
    ]
  },
  {
    name: 'Brazil',
    code: 'BR',
    currency: 'BRL',
    currencySymbol: 'R$',
    states: [
      { name: 'Bahia', cities: [{ name: 'Alagoinhas' }, { name: 'Barreiras' }, { name: 'Camaçari' }, { name: 'Feira de Santana' }, { name: 'Ilhéus' }, { name: 'Itabuna' }, { name: 'Jequié' }, { name: 'Juazeiro' }, { name: 'Salvador' }, { name: 'Vitória da Conquista' }] },
      { name: 'Ceará', cities: [{ name: 'Caucaia' }, { name: 'Crato' }, { name: 'Fortaleza' }, { name: 'Iguatu' }, { name: 'Itapipoca' }, { name: 'Juazeiro do Norte' }, { name: 'Maracanaú' }, { name: 'Maranguape' }, { name: 'Quixeramobim' }, { name: 'Sobral' }] },
      { name: 'Goiás', cities: [{ name: 'Anápolis' }, { name: 'Catalão' }, { name: 'Goiânia' }, { name: 'Itumbiara' }, { name: 'Jataí' }, { name: 'Luziânia' }, { name: 'Planaltina' }, { name: 'Rio Verde' }, { name: 'Senador Canedo' }, { name: 'Trindade' }] },
      { name: 'Minas Gerais', cities: [{ name: 'Belo Horizonte' }, { name: 'Betim' }, { name: 'Contagem' }, { name: 'Governador Valadares' }, { name: 'Juiz de Fora' }, { name: 'Montes Claros' }, { name: 'Ribeirão das Neves' }, { name: 'Sete Lagoas' }, { name: 'Uberaba' }, { name: 'Uberlândia' }] },
      { name: 'Pará', cities: [{ name: 'Abaetetuba' }, { name: 'Altamira' }, { name: 'Ananindeua' }, { name: 'Barcarena' }, { name: 'Belém' }, { name: 'Bragança' }, { name: 'Cametá' }, { name: 'Castanhal' }, { name: 'Marabá' }, { name: 'Santarém' }] },
      { name: 'Paraná', cities: [{ name: 'Araucária' }, { name: 'Cascavel' }, { name: 'Colombo' }, { name: 'Curitiba' }, { name: 'Foz do Iguaçu' }, { name: 'Guarapuava' }, { name: 'Londrina' }, { name: 'Maringá' }, { name: 'Ponta Grossa' }, { name: 'São José dos Pinhais' }] },
      { name: 'Pernambuco', cities: [{ name: 'Camarajibe' }, { name: 'Caruaru' }, { name: 'Garanhuns' }, { name: 'Jaboatão dos Guararapes' }, { name: 'Olinda' }, { name: 'Paulista' }, { name: 'Petrolina' }, { name: 'Recife' }, { name: 'Santo Agostinho' }, { name: 'Vitória de Santo Antão' }] },
      { name: 'Rio de Janeiro', cities: [{ name: 'Campos' }, { name: 'Itaboraí' }, { name: 'Macaé' }, { name: 'Magé' }, { name: 'Niterói' }, { name: 'Nova Friburgo' }, { name: 'Petrópolis' }, { name: 'Rio de Janeiro' }, { name: 'São Gonçalo' }, { name: 'Volta Redonda' }] },
      { name: 'Rio Grande do Sul', cities: [{ name: 'Canoas' }, { name: 'Caxias do Sul' }, { name: 'Gravataí' }, { name: 'Passo Fundo' }, { name: 'Pelotas' }, { name: 'Porto Alegre' }, { name: 'Rio Grande' }, { name: 'Santa Maria' }, { name: 'São Leopoldo' }, { name: 'Viamão' }] },
      { name: 'São Paulo', cities: [{ name: 'Campinas' }, { name: 'Guarulhos' }, { name: 'Mogi das Cruzes' }, { name: 'Osasco' }, { name: 'Ribeirão Prêto' }, { name: 'Santo André' }, { name: 'São Bernardo do Campo' }, { name: 'São José dos Campos' }, { name: 'São Paulo' }, { name: 'Sorocaba' }] }
    ]
  },
  {
    name: 'Brunei',
    code: 'BN',
    currency: 'BND',
    currencySymbol: 'CFA',
    states: [
      { name: 'Belait', cities: [{ name: 'Kuala Belait' }, { name: 'Seria' }] },
      { name: 'Brunei dan Muara', cities: [{ name: 'Bandar Seri Begawan' }, { name: 'Kampong Tunah Jambu' }] },
      { name: 'Temburong', cities: [{ name: 'Bangar' }] },
      { name: 'Tutong', cities: [{ name: 'Tutong' }] }
    ]
  },
  {
    name: 'Bulgaria',
    code: 'BG',
    currency: 'BGN',
    currencySymbol: 'лв',
    states: [
      { name: 'Burgas', cities: [{ name: 'Aytos' }, { name: 'Burgas' }, { name: 'Karnobat' }, { name: 'Nesebar' }, { name: 'Pomorie' }, { name: 'Sredets' }, { name: 'Sungurlare' }, { name: 'Tsarevo' }] },
      { name: 'Haskovo', cities: [{ name: 'Dimitrovgrad' }, { name: 'Harmanli' }, { name: 'Haskovo' }, { name: 'Svilengrad' }, { name: 'Topolovgrad' }] },
      { name: 'Pernik', cities: [{ name: 'Pernik' }, { name: 'Radomir' }] },
      { name: 'Pleven', cities: [{ name: 'Levski' }, { name: 'Pleven' }] },
      { name: 'Plovdiv', cities: [{ name: 'Asenovgrad' }, { name: 'Karlovo' }, { name: 'Krichim' }, { name: 'Parvomay' }, { name: 'Plovdiv' }, { name: 'Rakovski' }, { name: 'Stamboliyski' }] },
      { name: 'Ruse', cities: [{ name: 'Ruse' }] },
      { name: 'Sliven', cities: [{ name: 'Nova Zagora' }, { name: 'Sliven' }] },
      { name: 'Sofia-Grad', cities: [{ name: 'Bankya' }, { name: 'Novi Iskar' }, { name: 'Sofia' }] },
      { name: 'Stara Zagora', cities: [{ name: 'Chirpan' }, { name: 'Kazanlak' }, { name: 'Radnevo' }, { name: 'Stara Zagora' }] },
      { name: 'Varna', cities: [{ name: 'Avren' }, { name: 'Devnya' }, { name: 'Provadia' }, { name: 'Varna' }] }
    ]
  },
  {
    name: 'Burkina Faso',
    code: 'BF',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Boucle du Mouhoun', cities: [{ name: 'Béna' }, { name: 'Boromo' }, { name: 'Dédougou' }, { name: 'Fara' }, { name: 'Kouka' }, { name: 'Nouna' }, { name: 'Pâ' }, { name: 'Salanso' }, { name: 'Toma' }, { name: 'Tougan' }] },
      { name: 'Cascades', cities: [{ name: 'Banfora' }, { name: 'Bérégadougou' }, { name: 'Niangoloko' }, { name: 'Sidéradougou' }, { name: 'Soubakaniédougou' }] },
      { name: 'Centre', cities: [{ name: 'Ouagadougou' }, { name: 'Tanghin-Dassouri' }] },
      { name: 'Centre-Est', cities: [{ name: 'Béguédo' }, { name: 'Bittou' }, { name: 'Garango' }, { name: 'Koupéla' }, { name: 'Niaogho' }, { name: 'Ouarégou' }, { name: 'Ouargaye' }, { name: 'Pouytenga' }, { name: 'Tenkodogo' }, { name: 'Zabré' }] },
      { name: 'Centre-Nord', cities: [{ name: 'Boulsa' }, { name: 'Bourzanga' }, { name: 'Kaya' }, { name: 'Kongoussi' }, { name: 'Korsimoro' }, { name: 'Pissila' }] },
      { name: 'Centre-Ouest', cities: [{ name: 'Imassogo' }, { name: 'Kokologo' }, { name: 'Koudougou' }, { name: 'Léo' }, { name: 'Nandiala' }, { name: 'Réo' }, { name: 'Sabou' }, { name: 'Sapouy' }, { name: 'Tiou' }, { name: 'Vili' }] },
      { name: 'Est', cities: [{ name: 'Bogandé' }, { name: 'Diapaga' }, { name: 'Fada Ngourma' }, { name: 'Gayéri' }, { name: 'Mani' }, { name: 'Pama' }] },
      { name: 'Hauts-Bassins', cities: [{ name: 'Bobo-Dioulasso' }, { name: 'Houndé' }, { name: 'Orodara' }] },
      { name: 'Nord', cities: [{ name: 'Gourcy' }, { name: 'Ouahigouya' }, { name: 'Titao' }, { name: 'Yako' }] },
      { name: 'Sahel', cities: [{ name: 'Aribinda' }, { name: 'Djibo' }, { name: 'Dori' }, { name: 'Gorom-Gorom' }, { name: 'Sebba' }] }
    ]
  },
  {
    name: 'Burma',
    code: 'MM',
    currency: 'MMK',
    currencySymbol: 'K',
    states: [
      { name: 'Ayeyarwady', cities: [{ name: 'Hinthada' }, { name: 'Ingabu' }, { name: 'Labutta' }, { name: 'Maubin' }, { name: 'Myanaung' }, { name: 'Myaungmya' }, { name: 'Nyaungdon' }, { name: 'Pathein' }, { name: 'Pyapon' }, { name: 'Wakema' }] },
      { name: 'Bago', cities: [{ name: 'Bago' }, { name: 'Kawa' }, { name: 'Letpandan' }, { name: 'Okpo' }, { name: 'Pyay' }, { name: 'Pyu' }, { name: 'Taungoo' }, { name: 'Thanatpin' }, { name: 'Zigon' }] },
      { name: 'Kayin State', cities: [{ name: 'Bawgalegyi' }, { name: 'Hlaingbwe' }, { name: 'Hpa-An' }, { name: 'Htison' }, { name: 'Kamamaung' }, { name: 'Kawkareik' }, { name: 'Leiktho' }, { name: 'Myawadi' }, { name: 'Paingkyon' }, { name: 'Shanywathit' }] },
      { name: 'Magway', cities: [{ name: 'Allanmyo' }, { name: 'Chauk' }, { name: 'Magway' }, { name: 'Minbu' }, { name: 'Myaydo' }, { name: 'Pakokku' }, { name: 'Taungdwingyi' }, { name: 'Tawsalun' }, { name: 'Yenangyaung' }, { name: 'Yesagyo' }] },
      { name: 'Mandalay', cities: [{ name: 'Amarapura' }, { name: 'Kyaukse' }, { name: 'Mahlaing' }, { name: 'Mandalay' }, { name: 'Meiktila' }, { name: 'Mogok' }, { name: 'Myingyan' }, { name: 'Natogyi' }, { name: 'Nyaungu' }] },
      { name: 'Mon State', cities: [{ name: 'Du Yar' }, { name: 'Khaw Zar Chaung Wa' }, { name: 'Mawkanin' }, { name: 'Mawlamyine' }, { name: 'Mudon' }, { name: 'Thaton' }, { name: 'Ye' }] },
      { name: 'Nay Pyi Taw', cities: [{ name: 'Lewe' }, { name: 'Nay Pyi Taw' }, { name: 'Pyinmana' }] },
      { name: 'Rakhine State', cities: [{ name: 'An' }, { name: 'Buthidaung' }, { name: 'Kyaukpyu' }, { name: 'Kyeintali' }, { name: 'Maungdaw' }, { name: 'Myebon' }, { name: 'Ponnagyun' }, { name: 'Sittwe' }, { name: 'Taungup' }, { name: 'Thandwe' }] },
      { name: 'Shan State', cities: [{ name: 'Aungban' }, { name: 'Kengtung' }, { name: 'Kyaukme' }, { name: 'Lashio' }, { name: 'Möng Tun' }, { name: 'Muse' }, { name: 'Namhkam' }, { name: 'Namtu' }, { name: 'Tachilek' }, { name: 'Taunggyi' }] },
      { name: 'Yangon', cities: [{ name: 'Hlegu' }, { name: 'Rangoon' }, { name: 'Thanhlyin' }, { name: 'Thingangyun' }, { name: 'Thongwa' }] }
    ]
  },
  {
    name: 'Burundi',
    code: 'BI',
    currency: 'BIF',
    currencySymbol: 'FBu',
    states: [
      { name: 'Bubanza', cities: [{ name: 'Bubanza' }] },
      { name: 'Bujumbura Mairie', cities: [{ name: 'Bujumbura' }] },
      { name: 'Bujumbura Rural', cities: [{ name: 'Gatumba' }, { name: 'Isale' }] },
      { name: 'Cibitoke', cities: [{ name: 'Cibitoke' }] },
      { name: 'Gitega', cities: [{ name: 'Gitega' }] },
      { name: 'Karuzi', cities: [{ name: 'Karuzi' }, { name: 'Ruyigi' }, { name: 'Zanandore' }] },
      { name: 'Kayanza', cities: [{ name: 'Kayanza' }] },
      { name: 'Mwaro', cities: [{ name: 'Gitega' }] },
      { name: 'Ngozi', cities: [{ name: 'Ngozi' }] },
      { name: 'Rumonge', cities: [{ name: 'Rumonge' }] }
    ]
  },
  {
    name: 'Cabo Verde',
    code: 'CV',
    currency: 'CVE',
    currencySymbol: 'CFA',
    states: [
      { name: 'Boa Vista', cities: [{ name: 'Sal Rei' }] },
      { name: 'Porto Novo', cities: [{ name: 'Porto Novo' }] },
      { name: 'Praia', cities: [{ name: 'Praia' }] },
      { name: 'Sal', cities: [{ name: 'Espargos' }] },
      { name: 'Santa Catarina', cities: [{ name: 'Assomada' }] },
      { name: 'Santa Cruz', cities: [{ name: 'Pedra Badejo' }] },
      { name: 'São Filipe', cities: [{ name: 'São Filipe' }] },
      { name: 'São Vicente', cities: [{ name: 'Mindelo' }] },
      { name: 'Tarrafal', cities: [{ name: 'Tarrafal' }] },
      { name: 'Tarrafal de São Nicolau', cities: [{ name: 'Tarrafal' }] }
    ]
  },
  {
    name: 'Cambodia',
    code: 'KH',
    currency: 'KHR',
    currencySymbol: '៛',
    states: [
      { name: 'Banteay Meanchey', cities: [{ name: 'Paoy Paet' }, { name: 'Sisophon' }] },
      { name: 'Battambang', cities: [{ name: 'Battambang' }] },
      { name: 'Kampong Cham', cities: [{ name: 'Kampong Cham' }] },
      { name: 'Kampot', cities: [{ name: 'Kampong Trach' }, { name: 'Kampot' }] },
      { name: 'Kratie', cities: [{ name: 'Kratie' }] },
      { name: 'Oddar Meanchey', cities: [{ name: 'Samraong' }] },
      { name: 'Phnom Penh', cities: [{ name: 'Phnom Penh' }, { name: 'Svay Pak' }] },
      { name: 'Preah Sihanouk', cities: [{ name: 'Sihanoukville' }] },
      { name: 'Pursat', cities: [{ name: 'Pursat' }] },
      { name: 'Siem Reap', cities: [{ name: 'Siem Reap' }] }
    ]
  },
  {
    name: 'Cameroon',
    code: 'CM',
    currency: 'XAF',
    currencySymbol: 'FCFA',
    states: [
      { name: 'Adamaoua', cities: [{ name: 'Kontcha' }, { name: 'Meïganga' }, { name: 'Ngaoundal' }, { name: 'Ngaoundéré' }, { name: 'Tibati' }] },
      { name: 'Centre', cities: [{ name: 'Akonolinga' }, { name: 'Ayos' }, { name: 'Bafia' }, { name: 'Eséka' }, { name: 'Mbalmayo' }, { name: 'Mbandjok' }, { name: 'Monatélé' }, { name: 'Nanga Eboko' }, { name: 'Obala' }, { name: 'Yaoundé' }] },
      { name: 'Est', cities: [{ name: 'Abong Mbang' }, { name: 'Batouri' }, { name: 'Bélabo' }, { name: 'Bertoua' }, { name: 'Diang' }, { name: 'Garoua Boulaï' }, { name: 'Messaména' }, { name: 'Yokadouma' }] },
      { name: 'Extrême-Nord', cities: [{ name: 'Bogo' }, { name: 'Kaelé' }, { name: 'Kalfou' }, { name: 'Kousséri' }, { name: 'Maga' }, { name: 'Maroua' }, { name: 'Mokolo' }, { name: 'Mora' }, { name: 'Yagoua' }] },
      { name: 'Littoral', cities: [{ name: 'Douala' }, { name: 'Edéa' }, { name: 'Loum' }, { name: 'Manjo' }, { name: 'Mbanga' }, { name: 'Melong' }, { name: 'Nkongsamba' }] },
      { name: 'Nord', cities: [{ name: 'Bibémi' }, { name: 'Figuil' }, { name: 'Garoua' }, { name: 'Guider' }, { name: 'Lagdo' }, { name: 'Pitoa' }, { name: 'Touboro' }] },
      { name: 'North-West', cities: [{ name: 'Baba I' }, { name: 'Bafut' }, { name: 'Bambalang' }, { name: 'Bamenda' }, { name: 'Bamessi' }, { name: 'Bamessing' }, { name: 'Bamukumbit' }, { name: 'Kumbo' }, { name: 'Widekum' }, { name: 'Wum' }] },
      { name: 'Ouest', cities: [{ name: 'Bafang' }, { name: 'Bafoussam' }, { name: 'Baham' }, { name: 'Bamendjou' }, { name: 'Batcha' }, { name: 'Dschang' }, { name: 'Foumban' }, { name: 'Foumbot' }, { name: 'Kekem' }, { name: 'Mbouda' }] },
      { name: 'South-West', cities: [{ name: 'Aiyomojok' }, { name: 'Buea' }, { name: 'Kumba' }, { name: 'Limbe' }, { name: 'Mamfe' }, { name: 'Nguti' }, { name: 'Tiko' }] },
      { name: 'Sud', cities: [{ name: 'Akom II' }, { name: 'Ambam' }, { name: 'Biwong' }, { name: 'Ébolowa' }, { name: 'Kribi' }, { name: 'Ngoulemakong' }, { name: 'Olamzé' }, { name: 'Sangmélima' }] }
    ]
  },
  {
    name: 'Canada',
    code: 'CA',
    currency: 'CAD',
    currencySymbol: 'C$',
    states: [
      { name: 'Alberta', cities: [{ name: 'Airdrie' }, { name: 'Calgary' }, { name: 'Edmonton' }, { name: 'Fort McMurray' }, { name: 'Grande Prairie' }, { name: 'Lethbridge' }, { name: 'Medicine Hat' }, { name: 'Red Deer' }, { name: 'St. Albert' }, { name: 'Wood Buffalo' }] },
      { name: 'British Columbia', cities: [{ name: 'Abbotsford' }, { name: 'Burnaby' }, { name: 'Coquitlam' }, { name: 'Kelowna' }, { name: 'Richmond' }, { name: 'Saanich' }, { name: 'Surrey' }, { name: 'Vancouver' }, { name: 'Victoria' }, { name: 'White Rock' }] },
      { name: 'Manitoba', cities: [{ name: 'Brandon' }, { name: 'Hanover' }, { name: 'Portage La Prairie' }, { name: 'Springfield' }, { name: 'St. Andrews' }, { name: 'Steinbach' }, { name: 'Taché' }, { name: 'Thompson' }, { name: 'Winkler' }, { name: 'Winnipeg' }] },
      { name: 'New Brunswick', cities: [{ name: 'Bathurst' }, { name: 'Chatham' }, { name: 'Dieppe' }, { name: 'Edmundston' }, { name: 'Fredericton' }, { name: 'Miramichi' }, { name: 'Moncton' }, { name: 'Quispamsis' }, { name: 'Riverview' }, { name: 'Saint John' }] },
      { name: 'Newfoundland and Labrador', cities: [{ name: 'Conception Bay South' }, { name: 'Corner Brook' }, { name: 'Gander' }, { name: 'Grand Falls' }, { name: 'Labrador City' }, { name: 'Mount Pearl Park' }, { name: 'Paradise' }, { name: 'St. John\'s' }] },
      { name: 'Nova Scotia', cities: [{ name: 'Cape Breton' }, { name: 'Chester' }, { name: 'Glace Bay' }, { name: 'Halifax' }, { name: 'Inverness' }, { name: 'Kentville' }, { name: 'New Glasgow' }, { name: 'Queens' }, { name: 'Sydney Mines' }, { name: 'Truro' }] },
      { name: 'Ontario', cities: [{ name: 'Brampton' }, { name: 'Hamilton' }, { name: 'Kitchener' }, { name: 'London' }, { name: 'Markham' }, { name: 'Mississauga' }, { name: 'Oshawa' }, { name: 'Ottawa' }, { name: 'Toronto' }, { name: 'Vaughan' }] },
      { name: 'Prince Edward Island', cities: [{ name: 'Charlottetown' }, { name: 'Stratford' }, { name: 'Summerside' }] },
      { name: 'Quebec', cities: [{ name: 'Gatineau' }, { name: 'Laval' }, { name: 'Lévis' }, { name: 'Longueuil' }, { name: 'Montréal' }, { name: 'Quebec City' }, { name: 'Saguenay' }, { name: 'Sherbrooke' }, { name: 'Terrebonne' }, { name: 'Trois-Rivières' }] },
      { name: 'Saskatchewan', cities: [{ name: 'Lloydminster' }, { name: 'Moose Jaw' }, { name: 'North Battleford' }, { name: 'Prince Albert' }, { name: 'Regina' }, { name: 'Saskatoon' }, { name: 'Swift Current' }, { name: 'Warman' }, { name: 'Weyburn' }, { name: 'Yorkton' }] }
    ]
  },
  {
    name: 'Cayman Islands',
    code: 'KY',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'George Town' }] }
    ]
  },
  {
    name: 'Central African Republic',
    code: 'CF',
    currency: 'XAF',
    currencySymbol: 'FCFA',
    states: [
      { name: 'Bangui', cities: [{ name: 'Bangui' }] },
      { name: 'Haute-Kotto', cities: [{ name: 'Bria' }, { name: 'Ouadda' }] },
      { name: 'Mambéré-Kadéï', cities: [{ name: 'Berbérati' }, { name: 'Carnot' }, { name: 'Gamboula' }] },
      { name: 'Mbomou', cities: [{ name: 'Bakouma' }, { name: 'Bangassou' }, { name: 'Rafaï' }, { name: 'Yakossi' }] },
      { name: 'Nana-Mambéré', cities: [{ name: 'Bouar' }, { name: 'Mambéré' }] },
      { name: 'Ombella-Mpoko', cities: [{ name: 'Bimbo' }, { name: 'Boali' }, { name: 'Bossembele' }] },
      { name: 'Ouaka', cities: [{ name: 'Bambari' }, { name: 'Grimari' }, { name: 'Ippy' }] },
      { name: 'Ouham', cities: [{ name: 'Batangafo' }, { name: 'Bossangoa' }, { name: 'Bouca' }, { name: 'Kabo' }] },
      { name: 'Ouham-Pendé', cities: [{ name: 'Bocaranga' }, { name: 'Bozoum' }, { name: 'Paoua' }] },
      { name: 'Sangha-Mbaéré', cities: [{ name: 'Nola' }] }
    ]
  },
  {
    name: 'Chad',
    code: 'TD',
    currency: 'XAF',
    currencySymbol: 'FCFA',
    states: [
      { name: 'Barh-El-Gazel', cities: [{ name: 'Chèddra' }, { name: 'Moussoro' }] },
      { name: 'Batha', cities: [{ name: 'Ati' }, { name: 'Oum Hadjer' }, { name: 'Yao' }] },
      { name: 'Kanem', cities: [{ name: 'Mao' }] },
      { name: 'Logone Occidental', cities: [{ name: 'Benoy' }, { name: 'Moundou' }] },
      { name: 'Mayo-Kebbi-Ouest', cities: [{ name: 'Léré' }, { name: 'Pala' }, { name: 'Pala Oua' }] },
      { name: 'Moyen-Chari', cities: [{ name: 'Kyabé' }, { name: 'Sarh' }] },
      { name: 'N’Djamena', cities: [{ name: 'N’Djamena' }] },
      { name: 'Ouaddaï', cities: [{ name: 'Abéché' }, { name: 'Adré' }, { name: 'Mata' }] },
      { name: 'Sila', cities: [{ name: 'Goz-Beida' }] },
      { name: 'Tandjilé', cities: [{ name: 'Béré' }, { name: 'Déressia' }, { name: 'Kelo' }, { name: 'Laï' }] }
    ]
  },
  {
    name: 'Chile',
    code: 'CL',
    currency: 'CLP',
    currencySymbol: 'CFA',
    states: [
      { name: 'Antofagasta', cities: [{ name: 'Antofagasta' }, { name: 'Calama' }, { name: 'Chuquicamata' }, { name: 'Mejillones' }, { name: 'Oficina María Elena' }, { name: 'Taltal' }, { name: 'Toconao' }, { name: 'Tocopilla' }] },
      { name: 'Araucanía', cities: [{ name: 'Angol' }, { name: 'Carahue' }, { name: 'Collipulli' }, { name: 'Lautaro' }, { name: 'Nueva Imperial' }, { name: 'Padre Las Casas' }, { name: 'Pucón' }, { name: 'Temuco' }, { name: 'Victoria' }, { name: 'Villarrica' }] },
      { name: 'Arica y Parinacota', cities: [{ name: 'Arica' }] },
      { name: 'Biobío', cities: [{ name: 'Cañete' }, { name: 'Chiguayante' }, { name: 'Concepción' }, { name: 'Coronel' }, { name: 'Curanilahue' }, { name: 'Los Ángeles' }, { name: 'Lota' }, { name: 'Penco' }, { name: 'Talcahuano' }, { name: 'Tomé' }] },
      { name: 'Coquimbo', cities: [{ name: 'Andacollo' }, { name: 'Combarbalá' }, { name: 'Coquimbo' }, { name: 'Illapel' }, { name: 'La Serena' }, { name: 'Los Vilos' }, { name: 'Monte Patria' }, { name: 'Ovalle' }, { name: 'Salamanca' }, { name: 'Vicuña' }] },
      { name: 'Libertador General Bernardo O’Higgins', cities: [{ name: 'Chimbarongo' }, { name: 'Graneros' }, { name: 'Las Cabras' }, { name: 'Machalí' }, { name: 'Rancagua' }, { name: 'Rengo' }, { name: 'Requínoa' }, { name: 'San Fernando' }, { name: 'San Vicente de Tagua Tagua' }, { name: 'Santa Cruz' }] },
      { name: 'Los Lagos', cities: [{ name: 'Alerce' }, { name: 'Ancud' }, { name: 'Castro' }, { name: 'Frutillar Alto' }, { name: 'Los Bajos' }, { name: 'Osorno' }, { name: 'Puerto Montt' }, { name: 'Puerto Varas' }, { name: 'Purranque' }, { name: 'Quellón' }] },
      { name: 'Maule', cities: [{ name: 'Cauquenes' }, { name: 'Constitución' }, { name: 'Curicó' }, { name: 'Linares' }, { name: 'Maule' }, { name: 'Molina' }, { name: 'Parral' }, { name: 'San Clemente' }, { name: 'San Javier' }, { name: 'Talca' }] },
      { name: 'Región Metropolitana', cities: [{ name: 'El Bosque' }, { name: 'La Florida' }, { name: 'La Pintana' }, { name: 'Las Condes' }, { name: 'Maipú' }, { name: 'Peñalolén' }, { name: 'Puente Alto' }, { name: 'Quilicura' }, { name: 'San Bernardo' }, { name: 'Santiago' }] },
      { name: 'Valparaíso', cities: [{ name: 'La Calera' }, { name: 'Limache' }, { name: 'Los Andes' }, { name: 'Quillota' }, { name: 'Quilpué' }, { name: 'San Antonio' }, { name: 'San Felipe' }, { name: 'Valparaíso' }, { name: 'Villa Alemana' }, { name: 'Viña del Mar' }] }
    ]
  },
  {
    name: 'China',
    code: 'CN',
    currency: 'CNY',
    currencySymbol: '¥',
    states: [
      { name: 'Beijing', cities: [{ name: 'Beijing' }, { name: 'Chaiwu' }, { name: 'Changping' }, { name: 'Doudian' }, { name: 'Gaoliying Ercun' }, { name: 'Lengquancun' }, { name: 'Panggezhuang' }, { name: 'Wanggezhuang' }, { name: 'Wangzhuang' }, { name: 'Yonghetun' }] },
      { name: 'Chongqing', cities: [{ name: 'Chongqing' }, { name: 'Sanzhou' }, { name: 'Yaojia' }, { name: 'Yong’an' }] },
      { name: 'Guangdong', cities: [{ name: 'Dongguan' }, { name: 'Foshan' }, { name: 'Guangzhou' }, { name: 'Jiangmen' }, { name: 'Jieyang' }, { name: 'Maoming' }, { name: 'Shantou' }, { name: 'Shenzhen' }, { name: 'Zhanjiang' }, { name: 'Zhaoqing' }] },
      { name: 'Hebei', cities: [{ name: 'Baoding' }, { name: 'Cangzhou' }, { name: 'Handan' }, { name: 'Hengshui' }, { name: 'Langfang' }, { name: 'Qinhuangdao' }, { name: 'Shijiazhuang' }, { name: 'Tangshan' }, { name: 'Xingtai' }, { name: 'Zhangjiakou' }] },
      { name: 'Hubei', cities: [{ name: 'Huanggang' }, { name: 'Huangshi' }, { name: 'Jingling' }, { name: 'Rongcheng' }, { name: 'Shiyan' }, { name: 'Wuhan' }, { name: 'Xiangyang' }, { name: 'Xiantao' }, { name: 'Xiaoganzhan' }, { name: 'Xiaoxita' }] },
      { name: 'Shaanxi', cities: [{ name: 'Ankang' }, { name: 'Baojishi' }, { name: 'Guozhen' }, { name: 'Hanzhong' }, { name: 'Shangzhou' }, { name: 'Weinan' }, { name: 'Xi’an' }, { name: 'Xianyang' }, { name: 'Yan’an' }, { name: 'Yulinshi' }] },
      { name: 'Shandong', cities: [{ name: 'Binzhou' }, { name: 'Dezhou' }, { name: 'Heze' }, { name: 'Jinan' }, { name: 'Jining' }, { name: 'Liaocheng' }, { name: 'Linyi' }, { name: 'Qingdao' }, { name: 'Tai’an' }, { name: 'Zaozhuang' }] },
      { name: 'Shanghai', cities: [{ name: 'Huajing' }, { name: 'Jinzecun' }, { name: 'Nanqiao' }, { name: 'Pudong' }, { name: 'Shanghai' }, { name: 'Songjiang' }, { name: 'Xigujing' }, { name: 'Xinjing' }, { name: 'Xujing' }, { name: 'Zhaoxiang' }] },
      { name: 'Sichuan', cities: [{ name: 'Chengdu' }, { name: 'Dazhou' }, { name: 'Deyang' }, { name: 'Guang’an' }, { name: 'Leshan' }, { name: 'Luzhou' }, { name: 'Mianyang' }, { name: 'Nanchong' }, { name: 'Neijiang' }, { name: 'Yibin' }] },
      { name: 'Tianjin', cities: [{ name: 'Cuihuangkou' }, { name: 'Douzhangzhuang' }, { name: 'Hexiwu' }, { name: 'Jinghai' }, { name: 'Nancaicun' }, { name: 'Tianjin' }, { name: 'Tianmu' }, { name: 'Xianshuigu' }, { name: 'Xiawuqi' }, { name: 'Yangliuqing' }] }
    ]
  },
  {
    name: 'Christmas Island',
    code: 'CX',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Flying Fish Cove' }] }
    ]
  },
  {
    name: 'Colombia',
    code: 'CO',
    currency: 'COP',
    currencySymbol: 'CFA',
    states: [
      { name: 'Antioquia', cities: [{ name: 'Apartadó' }, { name: 'Bello' }, { name: 'Caldas' }, { name: 'Caucasia' }, { name: 'Envigado' }, { name: 'Itagüí' }, { name: 'Medellín' }, { name: 'Rionegro' }, { name: 'Sabanalarga' }, { name: 'Turbo' }] },
      { name: 'Atlántico', cities: [{ name: 'Baranoa' }, { name: 'Barranquilla' }, { name: 'Galapa' }, { name: 'Malambo' }, { name: 'Palmar de Varela' }, { name: 'Puerto Colombia' }, { name: 'Sabanagrande' }, { name: 'Sabanalarga' }, { name: 'Santo Tomás' }, { name: 'Soledad' }] },
      { name: 'Bogotá', cities: [{ name: 'Bogotá' }, { name: 'Fontibón' }, { name: 'Usme' }] },
      { name: 'Bolívar', cities: [{ name: 'Arjona' }, { name: 'Cartagena' }, { name: 'El Carmen de Bolívar' }, { name: 'Magangué' }, { name: 'María la Baja' }, { name: 'San Juan Nepomuceno' }, { name: 'San Pablo' }, { name: 'Santa Rosa del Sur' }, { name: 'Turbaco' }, { name: 'Turbaná' }] },
      { name: 'Huila', cities: [{ name: 'Acevedo' }, { name: 'Aipe' }, { name: 'Campoalegre' }, { name: 'Garzón' }, { name: 'Gigante' }, { name: 'La Plata' }, { name: 'Neiva' }, { name: 'Palermo' }, { name: 'Pitalito' }, { name: 'San Agustín' }] },
      { name: 'Meta', cities: [{ name: 'Acacías' }, { name: 'Cumaral' }, { name: 'Granada' }, { name: 'La Macarena' }, { name: 'Puerto Concordia' }, { name: 'Puerto Gaitán' }, { name: 'Puerto López' }, { name: 'San Martín' }, { name: 'Villavicencio' }, { name: 'Vistahermosa' }] },
      { name: 'Norte de Santander', cities: [{ name: 'Ábrego' }, { name: 'Cúcuta' }, { name: 'El Zulia' }, { name: 'Los Patios' }, { name: 'Ocaña' }, { name: 'Pamplona' }, { name: 'Sardinata' }, { name: 'Teorama' }, { name: 'Tibú' }, { name: 'Villa del Rosario' }] },
      { name: 'Risaralda', cities: [{ name: 'Apía' }, { name: 'Belén de Umbría' }, { name: 'Dosquebradas' }, { name: 'La Virginia' }, { name: 'Marsella' }, { name: 'Mistrató' }, { name: 'Pereira' }, { name: 'Quinchía' }, { name: 'Santa Rosa de Cabal' }, { name: 'Santuario' }] },
      { name: 'Santander', cities: [{ name: 'Barrancabermeja' }, { name: 'Bucaramanga' }, { name: 'Cimitarra' }, { name: 'Floridablanca' }, { name: 'Girón' }, { name: 'Lebrija' }, { name: 'Piedecuesta' }, { name: 'Puerto Wilches' }, { name: 'San Gil' }, { name: 'Socorro' }] },
      { name: 'Valle del Cauca', cities: [{ name: 'Buenaventura' }, { name: 'Cali' }, { name: 'Candelaria' }, { name: 'Cartago' }, { name: 'Florida' }, { name: 'Guadalajara de Buga' }, { name: 'Jamundí' }, { name: 'Palmira' }, { name: 'Tuluá' }, { name: 'Yumbo' }] }
    ]
  },
  {
    name: 'Comoros',
    code: 'KM',
    currency: 'KMF',
    currencySymbol: 'CF',
    states: [
      { name: 'Anjouan', cities: [{ name: 'Adda-Douéni' }, { name: 'Bazimini' }, { name: 'Domoni' }, { name: 'Mutsamudu' }, { name: 'Ouani' }] },
      { name: 'Grande Comore', cities: [{ name: 'Kourani' }, { name: 'Mandza' }, { name: 'Moroni' }] },
      { name: 'Mohéli', cities: [{ name: 'Fomboni' }] }
    ]
  },
  {
    name: 'Congo (Brazzaville)',
    code: 'CG',
    currency: 'XAF',
    currencySymbol: 'FCFA',
    states: [
      { name: 'Bouenza', cities: [{ name: 'Bouansa' }, { name: 'Kayes' }, { name: 'Loudima Poste' }, { name: 'Loutété' }, { name: 'Madingou' }, { name: 'Mouyondzi' }] },
      { name: 'Brazzaville', cities: [{ name: 'Brazzaville' }] },
      { name: 'Cuvette', cities: [{ name: 'Boundji' }, { name: 'Etoumbi' }, { name: 'Makoua' }, { name: 'Mossaka' }, { name: 'Owando' }, { name: 'Oyo' }] },
      { name: 'Kouilou', cities: [{ name: 'Hinda' }, { name: 'Loango' }, { name: 'Tchibota' }] },
      { name: 'Lékoumou', cities: [{ name: 'Sibiti' }] },
      { name: 'Likouala', cities: [{ name: 'Bétou' }, { name: 'Dongou' }, { name: 'Enyellé' }, { name: 'Impfondo' }] },
      { name: 'Niari', cities: [{ name: 'Dolisie' }, { name: 'Mossendjo' }] },
      { name: 'Plateaux', cities: [{ name: 'Djambala' }, { name: 'Gamboma' }] },
      { name: 'Pointe-Noire', cities: [{ name: 'Pointe-Noire' }] },
      { name: 'Sangha', cities: [{ name: 'Boloso' }, { name: 'Ouésso' }, { name: 'Sémbé' }, { name: 'Souanké' }] }
    ]
  },
  {
    name: 'Congo (Kinshasa)',
    code: 'CD',
    currency: 'CDF',
    currencySymbol: 'FC',
    states: [
      { name: 'Équateur', cities: [{ name: 'Basankusu' }, { name: 'Mbandaka' }] },
      { name: 'Haut-Katanga', cities: [{ name: 'Kambove' }, { name: 'Kasumbalesa' }, { name: 'Kipushi' }, { name: 'Likasi' }, { name: 'Luanza' }, { name: 'Lubumbashi' }, { name: 'Pweto' }] },
      { name: 'Ituri', cities: [{ name: 'Aru' }, { name: 'Bunia' }, { name: 'Djugu' }, { name: 'Drodro' }, { name: 'Mangbwalu' }] },
      { name: 'Kasaï', cities: [{ name: 'Bakwa-Kalonji' }, { name: 'Ilebo' }, { name: 'Luebo' }, { name: 'Mweka' }, { name: 'Tshikapa' }] },
      { name: 'Kasaï Central', cities: [{ name: 'Demba' }, { name: 'Dibaya' }, { name: 'Kananga' }, { name: 'Mbulungu' }] },
      { name: 'Kasaï Oriental', cities: [{ name: 'Mbuji-Mayi' }, { name: 'Tshilenge' }] },
      { name: 'Kinshasa', cities: [{ name: 'Kibanseke Première' }, { name: 'Kinshasa' }, { name: 'Kisenzi' }, { name: 'Lingwala' }, { name: 'Ndjili' }, { name: 'Nsele' }] },
      { name: 'Lomami', cities: [{ name: 'Gandajika' }, { name: 'Kabinda' }, { name: 'Lubao' }, { name: 'Mwene-Ditu' }] },
      { name: 'Sud-Kivu', cities: [{ name: 'Baraka' }, { name: 'Bukavu' }, { name: 'Kamituga' }, { name: 'Luvungi' }, { name: 'Mwenga' }, { name: 'Uvira' }] },
      { name: 'Tshopo', cities: [{ name: 'Bafwasende' }, { name: 'Basoko' }, { name: 'Kisangani' }, { name: 'Yangambi' }] }
    ]
  },
  {
    name: 'Cook Islands',
    code: 'CK',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Avarua' }] }
    ]
  },
  {
    name: 'Costa Rica',
    code: 'CR',
    currency: 'CRC',
    currencySymbol: '₡',
    states: [
      { name: 'Alajuela', cities: [{ name: 'Aguas Zarcas' }, { name: 'Alajuela' }, { name: 'Desamparados' }, { name: 'Guácima' }, { name: 'Naranjo' }, { name: 'Palmares' }, { name: 'Poás' }, { name: 'Quesada' }, { name: 'San Marcos' }, { name: 'San Ramón' }] },
      { name: 'Cartago', cities: [{ name: 'Cartago' }, { name: 'Copalchí' }, { name: 'Paraíso' }, { name: 'Sartalillo' }, { name: 'Tres Ríos' }, { name: 'Turrialba' }] },
      { name: 'Guanacaste', cities: [{ name: 'Bagaces' }, { name: 'Cañas' }, { name: 'La Cruz' }, { name: 'Liberia' }, { name: 'Nandayure' }, { name: 'Nicoya' }, { name: 'Santa Cruz' }, { name: 'Sardinal' }, { name: 'Tilarán' }] },
      { name: 'Heredia', cities: [{ name: 'Horquetas' }, { name: 'La Virgen' }, { name: 'Mora' }, { name: 'Puerto Viejo' }, { name: 'San Isidro' }, { name: 'San Josecito' }, { name: 'San Pablo' }, { name: 'San Rafael' }, { name: 'Santo Domingo' }, { name: 'Sarapiquí' }] },
      { name: 'Limón', cities: [{ name: 'Batán' }, { name: 'Cariari' }, { name: 'Guácimo' }, { name: 'Guápiles' }, { name: 'Jiménez' }, { name: 'Matina' }, { name: 'Pacuarito' }, { name: 'Rita' }, { name: 'Roxana' }, { name: 'Siquirres' }] },
      { name: 'Puntarenas', cities: [{ name: 'Abangaritos' }, { name: 'Coto Brus' }, { name: 'Esparza' }, { name: 'Golfito' }, { name: 'Jacó' }, { name: 'Parrita' }, { name: 'Puerto Jiménez' }, { name: 'Puntarenas' }, { name: 'Quepos' }, { name: 'San Vito' }] },
      { name: 'San José', cities: [{ name: 'Curridabat' }, { name: 'Desamparados' }, { name: 'La Uruca' }, { name: 'Purral' }, { name: 'San Isidro' }, { name: 'San José' }, { name: 'San Juan' }, { name: 'San Pedro' }, { name: 'San Rafael Abajo' }, { name: 'San Vicente' }] }
    ]
  },
  {
    name: 'Côte d’Ivoire',
    code: 'CI',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Abidjan', cities: [{ name: 'Abidjan' }, { name: 'Attiecoubé' }, { name: 'Bingerville' }, { name: 'Brofodoumé' }, { name: 'Cocody' }, { name: 'Koumassi' }, { name: 'Marcory' }, { name: 'Port-Bouët' }, { name: 'Yopougon' }] },
      { name: 'Bas-Sassandra', cities: [{ name: 'Mabéhiri' }, { name: 'Para' }, { name: 'San-Pédro' }, { name: 'Sassandra' }, { name: 'Soubré' }, { name: 'Yabayo' }] },
      { name: 'Comoé', cities: [{ name: 'Abengourou' }, { name: 'Aboisso' }, { name: 'Ahigbé Koffikro' }, { name: 'Bongouanou' }, { name: 'Grand-Bassam' }, { name: 'Noé' }] },
      { name: 'Gôh-Djiboua', cities: [{ name: 'Divo' }, { name: 'Doukouya' }, { name: 'Gagnoa' }, { name: 'Oumé' }] },
      { name: 'Lagunes', cities: [{ name: 'Adzopé' }, { name: 'Agboville' }, { name: 'Dabou' }, { name: 'Grand-Lahou' }, { name: 'Jacqueville' }, { name: 'Rubino' }] },
      { name: 'Montagnes', cities: [{ name: 'Bédigoazon' }, { name: 'Biankouma' }, { name: 'Bin-Houyé' }, { name: 'Duekoué' }, { name: 'Guiglo' }, { name: 'Man' }, { name: 'Sipilou' }] },
      { name: 'Sassandra-Marahoué', cities: [{ name: 'Bonoufla' }, { name: 'Bouaflé' }, { name: 'Daloa' }, { name: 'Luénoufla' }, { name: 'Mignouré' }, { name: 'Pélézi' }, { name: 'Sinfra' }, { name: 'Zaliohouan' }] },
      { name: 'Savanes', cities: [{ name: 'Boundiali' }, { name: 'Ferkessédougou' }, { name: 'Kong' }, { name: 'Korhogo' }, { name: 'Papara' }, { name: 'Toumoukro' }] },
      { name: 'Vallée du Bandama', cities: [{ name: 'Bouaké' }, { name: 'Dabakala' }, { name: 'Katiola' }] },
      { name: 'Yamoussoukro', cities: [{ name: 'Yamoussoukro' }] }
    ]
  },
  {
    name: 'Croatia',
    code: 'HR',
    currency: 'EUR',
    currencySymbol: '€',
    states: [
      { name: 'Istarska Županija', cities: [{ name: 'Labin' }, { name: 'Pazin' }, { name: 'Poreč' }, { name: 'Pula' }, { name: 'Rovinj' }, { name: 'Umag' }] },
      { name: 'Karlovačka Županija', cities: [{ name: 'Duga Resa' }, { name: 'Karlovac' }, { name: 'Ogulin' }] },
      { name: 'Osječko-Baranjska Županija', cities: [{ name: 'Belišće' }, { name: 'Čepin' }, { name: 'Ðakovo' }, { name: 'Našice' }, { name: 'Osijek' }, { name: 'Valpovo' }] },
      { name: 'Primorsko-Goranska Županija', cities: [{ name: 'Crikvenica' }, { name: 'Kastav' }, { name: 'Matulji' }, { name: 'Opatija' }, { name: 'Rijeka' }, { name: 'Viškovo' }] },
      { name: 'Šibensko-Kninska Županija', cities: [{ name: 'Knin' }, { name: 'Šibenik' }, { name: 'Vodice' }] },
      { name: 'Splitsko-Dalmatinska Županija', cities: [{ name: 'Imotski' }, { name: 'Kaštel Stari' }, { name: 'Makarska' }, { name: 'Omiš' }, { name: 'Podstrana' }, { name: 'Sinj' }, { name: 'Solin' }, { name: 'Split' }, { name: 'Trogir' }] },
      { name: 'Varaždinska Županija', cities: [{ name: 'Ivanec' }, { name: 'Novi Marof' }, { name: 'Varaždin' }] },
      { name: 'Zadarska Županija', cities: [{ name: 'Benkovac' }, { name: 'Zadar' }] },
      { name: 'Zagreb, Grad', cities: [{ name: 'Sesvete' }, { name: 'Zagreb' }] },
      { name: 'Zagrebačka Županija', cities: [{ name: 'Brdovec' }, { name: 'Dugo Selo' }, { name: 'Ivanić-Grad' }, { name: 'Jastrebarsko' }, { name: 'Samobor' }, { name: 'Sveta Nedjelja' }, { name: 'Sveti Ivan Zelina' }, { name: 'Velika Gorica' }, { name: 'Vrbovec' }, { name: 'Zaprešić' }] }
    ]
  },
  {
    name: 'Cuba',
    code: 'CU',
    currency: 'CUP',
    currencySymbol: '$',
    states: [
      { name: 'Camagüey', cities: [{ name: 'Camagüey' }, { name: 'Carlos Manuel de Céspedes' }, { name: 'Esmeralda' }, { name: 'Florida' }, { name: 'Guáimaro' }, { name: 'Minas' }, { name: 'Nuevitas' }, { name: 'Santa Cruz del Sur' }, { name: 'Sibanicú' }, { name: 'Vertientes' }] },
      { name: 'Cienfuegos', cities: [{ name: 'Abreus' }, { name: 'Aguada de Pasajeros' }, { name: 'Cienfuegos' }, { name: 'Cruces' }, { name: 'Cumanayagua' }, { name: 'Lajas' }, { name: 'Palmira' }, { name: 'Rodas' }] },
      { name: 'Granma', cities: [{ name: 'Bartolomé Masó' }, { name: 'Bayamo' }, { name: 'Campechuela' }, { name: 'Guisa' }, { name: 'Jiguaní' }, { name: 'Manzanillo' }, { name: 'Media Luna' }, { name: 'Niquero' }, { name: 'Río Cauto' }, { name: 'Yara' }] },
      { name: 'Guantánamo', cities: [{ name: 'Baracoa' }, { name: 'Caimanera' }, { name: 'Guantánamo' }, { name: 'Imías' }, { name: 'Manuel Tames' }, { name: 'Salvador' }, { name: 'San Antonio del Sur' }] },
      { name: 'Holguín', cities: [{ name: 'Báguanos' }, { name: 'Banes' }, { name: 'Cacocum' }, { name: 'Gibara' }, { name: 'Holguín' }, { name: 'Mayarí' }, { name: 'Moa' }, { name: 'Sagua de Tánamo' }, { name: 'San Germán' }, { name: 'Santa Lucía' }] },
      { name: 'La Habana', cities: [{ name: 'Arroyo Naranjo' }, { name: 'Centro Habana' }, { name: 'Cerro' }, { name: 'Cotorro' }, { name: 'Guanabacoa' }, { name: 'Havana' }, { name: 'La Lisa' }, { name: 'Marianao' }, { name: 'Regla' }, { name: 'San Miguel del Padrón' }] },
      { name: 'Las Tunas', cities: [{ name: 'Amancio' }, { name: 'Colombia' }, { name: 'Jesús Menéndez' }, { name: 'Jobabo' }, { name: 'Las Tunas' }, { name: 'Majibacoa' }, { name: 'Manatí' }, { name: 'Puerto Padre' }, { name: 'Vázquez' }] },
      { name: 'Pinar del Río', cities: [{ name: 'Consolación del Sur' }, { name: 'Guane' }, { name: 'La Palma' }, { name: 'Los Palacios' }, { name: 'Minas de Matahambre' }, { name: 'Pinar del Río' }, { name: 'San Juan y Martínez' }, { name: 'San Luis' }, { name: 'Sandino' }, { name: 'Viñales' }] },
      { name: 'Santiago de Cuba', cities: [{ name: 'Contramaestre' }, { name: 'Guamá Abajo' }, { name: 'Mella' }, { name: 'Palma Soriano' }, { name: 'San Luis' }, { name: 'Santiago de Cuba' }] },
      { name: 'Villa Clara', cities: [{ name: 'Caibarién' }, { name: 'Camajuaní' }, { name: 'Encrucijada' }, { name: 'Manicaragua' }, { name: 'Placetas' }, { name: 'Ranchuelo' }, { name: 'Remedios' }, { name: 'Sagua la Grande' }, { name: 'Santa Clara' }, { name: 'Santo Domingo' }] }
    ]
  },
  {
    name: 'Curaçao',
    code: 'CW',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Willemstad' }] }
    ]
  },
  {
    name: 'Cyprus',
    code: 'CY',
    currency: 'EUR',
    currencySymbol: '€',
    states: [
      { name: 'Ammóchostos', cities: [{ name: 'Famagusta' }, { name: 'Paralímni' }] },
      { name: 'Kerýneia', cities: [{ name: 'Kyrenia' }] },
      { name: 'Lárnaka', cities: [{ name: 'Aradíppou' }, { name: 'Larnaca' }] },
      { name: 'Lefkosía', cities: [{ name: 'Dáli' }, { name: 'Latsia' }, { name: 'Mórfou' }, { name: 'Nicosia' }] },
      { name: 'Lemesós', cities: [{ name: 'Ágios Athanásios' }, { name: 'Germasógeia' }, { name: 'Káto Polemídia' }, { name: 'Limassol' }, { name: 'Mésa Geitoniá' }, { name: 'Ýpsonas' }] },
      { name: 'Páfos', cities: [{ name: 'Paphos' }] }
    ]
  },
  {
    name: 'Czech Republic',
    code: 'CZ',
    currency: 'CZK',
    currencySymbol: 'Kč',
    states: [
      { name: 'Jihočeský Kraj', cities: [{ name: 'České Budějovice' }, { name: 'Český Krumlov' }, { name: 'Jindřichŭv Hradec' }, { name: 'Písek' }, { name: 'Prachatice' }, { name: 'Strakonice' }, { name: 'Tábor' }] },
      { name: 'Jihomoravský Kraj', cities: [{ name: 'Blansko' }, { name: 'Boskovice' }, { name: 'Břeclav' }, { name: 'Brno' }, { name: 'Bystrc' }, { name: 'Hodonín' }, { name: 'Kuřim' }, { name: 'Líšeň' }, { name: 'Vyškov' }, { name: 'Znojmo' }] },
      { name: 'Královéhradecký Kraj', cities: [{ name: 'Dvůr Králové nad Labem' }, { name: 'Hořice' }, { name: 'Hradec Králové' }, { name: 'Jaroměř' }, { name: 'Jičín' }, { name: 'Náchod' }, { name: 'Nové Město nad Metují' }, { name: 'Rychnov nad Kněžnou' }, { name: 'Trutnov' }, { name: 'Vrchlabí' }] },
      { name: 'Liberecký Kraj', cities: [{ name: 'Česká Lípa' }, { name: 'Jablonec nad Nisou' }, { name: 'Liberec' }, { name: 'Nová Paka' }, { name: 'Nový Bor' }, { name: 'Turnov' }] },
      { name: 'Moravskoslezský Kraj', cities: [{ name: 'Český Těšín' }, { name: 'Frýdek-Místek' }, { name: 'Havířov' }, { name: 'Karviná' }, { name: 'Krnov' }, { name: 'Nový Jičín' }, { name: 'Opava' }, { name: 'Orlová' }, { name: 'Ostrava' }, { name: 'Třinec' }] },
      { name: 'Olomoucký Kraj', cities: [{ name: 'Hranice' }, { name: 'Jeseník' }, { name: 'Litovel' }, { name: 'Olomouc' }, { name: 'Přerov' }, { name: 'Prostějov' }, { name: 'Šternberk' }, { name: 'Šumperk' }, { name: 'Uničov' }, { name: 'Zábřeh' }] },
      { name: 'Pardubický Kraj', cities: [{ name: 'Česká Třebová' }, { name: 'Chrudim' }, { name: 'Lanškroun' }, { name: 'Litomyšl' }, { name: 'Moravská Třebová' }, { name: 'Pardubice' }, { name: 'Přelouč' }, { name: 'Svitavy' }, { name: 'Ústí nad Orlicí' }, { name: 'Vysoké Mýto' }] },
      { name: 'Plzeňský Kraj', cities: [{ name: 'Domažlice' }, { name: 'Klatovy' }, { name: 'Plzeň' }, { name: 'Rokycany' }, { name: 'Sušice' }, { name: 'Tachov' }] },
      { name: 'Praha', cities: [{ name: 'Prague' }] },
      { name: 'Ústecký Kraj', cities: [{ name: 'Chomutov' }, { name: 'Děčín' }, { name: 'Jirkov' }, { name: 'Kadaň' }, { name: 'Litoměřice' }, { name: 'Litvínov' }, { name: 'Most' }, { name: 'Teplice' }, { name: 'Ústí nad Labem' }, { name: 'Žatec' }] }
    ]
  },
  {
    name: 'Denmark',
    code: 'DK',
    currency: 'DKK',
    currencySymbol: 'kr',
    states: [
      { name: 'Hovedstaden', cities: [{ name: 'Birkerød' }, { name: 'Copenhagen' }, { name: 'Farum' }, { name: 'Frederikssund' }, { name: 'Helsingør' }, { name: 'Hillerød' }, { name: 'Hørsholm' }, { name: 'Lillerød' }, { name: 'Smørumnedre' }, { name: 'Taastrup' }] },
      { name: 'Midtjylland', cities: [{ name: 'Aarhus' }, { name: 'Herning' }, { name: 'Holstebro' }, { name: 'Horsens' }, { name: 'Ikast' }, { name: 'Randers' }, { name: 'Silkeborg' }, { name: 'Skanderborg' }, { name: 'Skive' }, { name: 'Viborg' }] },
      { name: 'Nordjylland', cities: [{ name: 'Aalborg' }, { name: 'Brødslev' }, { name: 'Brønderslev' }, { name: 'Frederikshavn' }, { name: 'Hjørring' }, { name: 'Hobro' }, { name: 'Nørresundby' }, { name: 'Nykøbing Mors' }, { name: 'Støvring' }, { name: 'Thisted' }] },
      { name: 'Sjælland', cities: [{ name: 'Holbæk' }, { name: 'Kalundborg' }, { name: 'Køge' }, { name: 'Næstved' }, { name: 'Nykøbing Falster' }, { name: 'Ringsted' }, { name: 'Roskilde' }, { name: 'Slagelse' }, { name: 'Solrød Strand' }, { name: 'Vordingborg' }] },
      { name: 'Syddanmark', cities: [{ name: 'Esbjerg' }, { name: 'Fredericia' }, { name: 'Haderslev' }, { name: 'Kolding' }, { name: 'Middelfart' }, { name: 'Nyborg' }, { name: 'Odense' }, { name: 'Sønderborg' }, { name: 'Svendborg' }, { name: 'Vejle' }] }
    ]
  },
  {
    name: 'Djibouti',
    code: 'DJ',
    currency: 'DJF',
    currencySymbol: 'Fdj',
    states: [
      { name: 'Ali Sabieh', cities: [{ name: 'Ali Sabieh' }] },
      { name: 'Arta', cities: [{ name: 'Arta' }] },
      { name: 'Dikhil', cities: [{ name: 'Dikhil' }] },
      { name: 'Djibouti', cities: [{ name: 'Djibouti' }] },
      { name: 'Obock', cities: [{ name: 'Obock' }] },
      { name: 'Tadjourah', cities: [{ name: 'Tadjourah' }] }
    ]
  },
  {
    name: 'Dominica',
    code: 'DM',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Saint George', cities: [{ name: 'Roseau' }] }
    ]
  },
  {
    name: 'Dominican Republic',
    code: 'DO',
    currency: 'DOP',
    currencySymbol: '$',
    states: [
      { name: 'Cibao Nordeste', cities: [{ name: 'Cabrera' }, { name: 'El Factor' }, { name: 'Nagua' }, { name: 'Salcedo' }, { name: 'Samaná' }, { name: 'San Francisco de Macorís' }, { name: 'Sánchez' }, { name: 'Tenares' }, { name: 'Villa Riva' }, { name: 'Villa Tapia' }] },
      { name: 'Cibao Noroeste', cities: [{ name: 'Castañuelas' }, { name: 'Dajabón' }, { name: 'Esperanza' }, { name: 'Jicomé' }, { name: 'Laguna Salada' }, { name: 'Loma de Cabrera' }, { name: 'Mao' }, { name: 'Monte Cristi' }, { name: 'Sabaneta' }, { name: 'San Lorenzo de Guayubín' }] },
      { name: 'Cibao Norte', cities: [{ name: 'Gaspar Hernández' }, { name: 'Gurabo al Medio' }, { name: 'Moca' }, { name: 'Puerto Plata' }, { name: 'Puñal' }, { name: 'San José de Las Matas' }, { name: 'Santiago' }, { name: 'Sosúa' }, { name: 'Tamboril' }, { name: 'Villa Bisonó' }] },
      { name: 'Cibao Sur', cities: [{ name: 'Bonao' }, { name: 'Constanza' }, { name: 'Cotuí' }, { name: 'Fantino' }, { name: 'Jarabacoa' }, { name: 'Jima Abajo' }, { name: 'La Mata' }, { name: 'La Vega' }, { name: 'Maimón' }, { name: 'Río Verde Arriba' }] },
      { name: 'El Valle', cities: [{ name: 'Bohechío' }, { name: 'Cercado Abajo' }, { name: 'Comendador' }, { name: 'Hondo Valle' }, { name: 'Juan de Herrera' }, { name: 'Las Matas de Farfán' }, { name: 'San Juan' }, { name: 'Vallejuelo' }] },
      { name: 'Enriquillo', cities: [{ name: 'Barahona' }, { name: 'Cabral' }, { name: 'Duvergé' }, { name: 'Enriquillo' }, { name: 'Galván' }, { name: 'Neiba' }, { name: 'Paraíso' }, { name: 'Pedernales' }, { name: 'Tamayo' }, { name: 'Vicente Noble' }] },
      { name: 'Higuamo', cities: [{ name: 'Bayaguana' }, { name: 'Consuelito' }, { name: 'Esperalvillo' }, { name: 'Guayacanes' }, { name: 'Hato Mayor' }, { name: 'Los Llanos' }, { name: 'Monte Plata' }, { name: 'Sabana Grande de Boyá' }, { name: 'San Pedro de Macorís' }, { name: 'Yamasá' }] },
      { name: 'Ozama', cities: [{ name: 'Boca Chica' }, { name: 'Guerra' }, { name: 'La Caleta' }, { name: 'Los Alcarrizos' }, { name: 'Los Minas' }, { name: 'Pedro Brand' }, { name: 'San Luis' }, { name: 'Santo Domingo' }, { name: 'Santo Domingo Este' }] },
      { name: 'Valdesia', cities: [{ name: 'Azua' }, { name: 'Baní' }, { name: 'Cambita Garabitos' }, { name: 'Matanzas' }, { name: 'Padre Las Casas' }, { name: 'San Cristóbal' }, { name: 'San Gregorio de Nigua' }, { name: 'San José de Ocoa' }, { name: 'Villa Altagracia' }, { name: 'Yaguate' }] },
      { name: 'Yuma', cities: [{ name: 'Bávaro' }, { name: 'El Seibo' }, { name: 'Guaymate' }, { name: 'Higüey' }, { name: 'La Romana' }, { name: 'Miches' }, { name: 'Pantanal' }, { name: 'San Rafael del Yuma' }] }
    ]
  },
  {
    name: 'Ecuador',
    code: 'EC',
    currency: 'USD',
    currencySymbol: '$',
    states: [
      { name: 'Azuay', cities: [{ name: 'Baños' }, { name: 'Camilo Ponce Enríquez' }, { name: 'Cuenca' }, { name: 'Ricaurte' }, { name: 'Sinincay' }, { name: 'Valle' }] },
      { name: 'Chimborazo', cities: [{ name: 'Alausí' }, { name: 'Cumandá' }, { name: 'Guano' }, { name: 'Riobamba' }] },
      { name: 'El Oro', cities: [{ name: 'Guabo' }, { name: 'Huaquillas' }, { name: 'Machala' }, { name: 'Pasaje' }, { name: 'Piñas' }, { name: 'Santa Rosa' }, { name: 'Zaruma' }] },
      { name: 'Guayas', cities: [{ name: 'Daule' }, { name: 'Eloy Alfaro' }, { name: 'Guayaquil' }, { name: 'La Libertad' }, { name: 'Milagro' }, { name: 'Naranjal' }, { name: 'Playas' }, { name: 'Salinas' }, { name: 'Samborondón' }, { name: 'Velasco Ibarra' }] },
      { name: 'Loja', cities: [{ name: 'Cariamanga' }, { name: 'Catamayo' }, { name: 'Loja' }, { name: 'Macará' }] },
      { name: 'Los Ríos', cities: [{ name: 'Babahoyo' }, { name: 'Montalvo' }, { name: 'Quevedo' }, { name: 'San Jacinto de Buena Fe' }, { name: 'Valencia' }, { name: 'Ventanas' }, { name: 'Vinces' }] },
      { name: 'Manabí', cities: [{ name: 'Bahía de Caráquez' }, { name: 'Calceta' }, { name: 'Chone' }, { name: 'El Carmen' }, { name: 'Jaramijó' }, { name: 'Jipijapa' }, { name: 'Manta' }, { name: 'Montecristi' }, { name: 'Pedernales' }, { name: 'Portoviejo' }] },
      { name: 'Pichincha', cities: [{ name: 'Cayambe' }, { name: 'Machachi' }, { name: 'Puerto Quito' }, { name: 'Quito' }, { name: 'Sangolquí' }] },
      { name: 'Santo Domingo de los Tsáchilas', cities: [{ name: 'La Concordia' }, { name: 'Santo Domingo de los Colorados' }] },
      { name: 'Tungurahua', cities: [{ name: 'Ambato' }, { name: 'Baños' }, { name: 'Pelileo' }, { name: 'Píllaro' }] }
    ]
  },
  {
    name: 'Egypt',
    code: 'EG',
    currency: 'EGP',
    currencySymbol: 'E£',
    states: [
      { name: 'Ad Daqahlīyah', cities: [{ name: '‘Izbat al Burj' }, { name: 'Al Jammālīyah' }, { name: 'Al Manşūrah' }, { name: 'Al Maţarīyah' }, { name: 'Banī ‘Ubayd' }, { name: 'Dikirnis' }, { name: 'Mīt Ghamr' }, { name: 'Mīt Salsīl' }, { name: 'Ţalkhā' }, { name: 'Timayy al Imdīd' }] },
      { name: 'Al Buḩayrah', cities: [{ name: 'Abū al Maţāmīr' }, { name: 'Abū Ḩummuş' }, { name: 'Ar Raḩmānīyah' }, { name: 'Damanhūr' }, { name: 'Idkū' }, { name: 'Kafr ad Dawwār' }, { name: 'Madīnat as Sādāt' }, { name: 'Rosetta' }, { name: 'Shubrākhīt' }] },
      { name: 'Al Fayyūm', cities: [{ name: 'Abjīj' }, { name: 'Al Fayyūm' }, { name: 'An Nazlah' }, { name: 'Biyahmū' }, { name: 'Ibshawāy' }, { name: 'Sidmant al Jabal' }, { name: 'Sinnūris' }] },
      { name: 'Al Gharbīyah', cities: [{ name: 'Abū Şīr Banā' }, { name: 'Al Maḩallah al Kubrá' }, { name: 'Kafr az Zayyāt' }, { name: 'Najrīj' }, { name: 'Quţūr' }, { name: 'Şā al Ḩajar' }, { name: 'Samannūd' }, { name: 'Sunbāţ' }, { name: 'Ţanţā' }, { name: 'Ziftá' }] },
      { name: 'Al Iskandarīyah', cities: [{ name: 'Abū Qīr' }, { name: 'Al ‘Ajamī' }, { name: 'Alexandria' }, { name: 'Burj al ‘Arab' }] },
      { name: 'Al Jīzah', cities: [{ name: 'Al ‘Ayyāţ' }, { name: 'Al Badrashayn' }, { name: 'Aş Şaff' }, { name: 'Awsīm' }, { name: 'Birqāsh' }, { name: 'Giza' }, { name: 'Kirdāsah' }, { name: 'Madīnat as Sādis min Uktūbar' }, { name: 'Mandīshah' }] },
      { name: 'Al Minūfīyah', cities: [{ name: 'Al Bājūr' }, { name: 'Ash Shuhadā’' }, { name: 'Ashmūn' }, { name: 'Birkat as Sab‘' }, { name: 'Kafr Shukr' }, { name: 'Munūf' }, { name: 'Shanawān' }, { name: 'Shibīn al Kawm' }, { name: 'Talā' }, { name: 'Zāwiyat Razīn' }] },
      { name: 'Al Qāhirah', cities: [{ name: 'Badr' }, { name: 'Cairo' }, { name: 'Ḩalwān' }] },
      { name: 'Al Qalyūbīyah', cities: [{ name: 'Abū Za‘bal' }, { name: 'Al Khānkah' }, { name: 'Banhā' }, { name: 'Mīt Namā' }, { name: 'Qahā' }, { name: 'Qalyūb' }, { name: 'Shibīn al Qanāţir' }, { name: 'Shubrā al Khaymah' }, { name: 'Ţūkh' }] },
      { name: 'Asyūţ', cities: [{ name: 'Abnūb' }, { name: 'Abū Tīj' }, { name: 'Al Badārī' }, { name: 'Al Qūşīyah' }, { name: 'Asyūţ' }, { name: 'Banī Murr' }, { name: 'Dayrūţ' }, { name: 'Manfalūţ' }, { name: 'Şidfā' }] }
    ]
  },
  {
    name: 'El Salvador',
    code: 'SV',
    currency: 'USD',
    currencySymbol: '$',
    states: [
      { name: 'Ahuachapán', cities: [{ name: 'Ahuachapán' }, { name: 'Atiquizaya' }, { name: 'Concepción de Ataco' }, { name: 'El Refugio' }, { name: 'Guaymango' }, { name: 'Jujutla' }, { name: 'San Francisco Menéndez' }, { name: 'San Lorenzo' }, { name: 'Tacuba' }, { name: 'Turín' }] },
      { name: 'Cabañas', cities: [{ name: 'Ilobasco' }, { name: 'San Isidro' }, { name: 'Sensuntepeque' }, { name: 'Tejutepeque' }, { name: 'Victoria' }] },
      { name: 'La Libertad', cities: [{ name: 'Antiguo Cuscatlán' }, { name: 'Ciudad Arce' }, { name: 'Colón' }, { name: 'Huizúcar' }, { name: 'La Libertad' }, { name: 'Quezaltepeque' }, { name: 'San Juan Opico' }, { name: 'San Pablo Tacachico' }, { name: 'Santa Tecla' }, { name: 'Zaragoza' }] },
      { name: 'La Paz', cities: [{ name: 'Olocuilta' }, { name: 'San Luis Talpa' }, { name: 'San Pedro Masahuat' }, { name: 'San Pedro Nonualco' }, { name: 'San Rafael Obrajuelo' }, { name: 'Santiago Nonualco' }, { name: 'Zacatecoluca' }] },
      { name: 'San Miguel', cities: [{ name: 'Chapeltique' }, { name: 'Chinameca' }, { name: 'Chirilagua' }, { name: 'Ciudad Barrios' }, { name: 'El Tránsito' }, { name: 'Lolotique' }, { name: 'Moncagua' }, { name: 'San Miguel' }, { name: 'San Rafael Oriente' }, { name: 'Sesori' }] },
      { name: 'San Salvador', cities: [{ name: 'Apopa' }, { name: 'Cuscatancingo' }, { name: 'Delgado' }, { name: 'Ilopango' }, { name: 'Mejicanos' }, { name: 'San Marcos' }, { name: 'San Martín' }, { name: 'San Salvador' }, { name: 'Soyapango' }, { name: 'Tonacatepeque' }] },
      { name: 'San Vicente', cities: [{ name: 'Apastepeque' }, { name: 'San Ildefonso' }, { name: 'San Sebastián' }, { name: 'San Vicente' }, { name: 'Tecoluca' }] },
      { name: 'Santa Ana', cities: [{ name: 'Candelaria de La Frontera' }, { name: 'Chalchuapa' }, { name: 'Coatepeque' }, { name: 'El Congo' }, { name: 'Metapán' }, { name: 'San Sebastián Salitrillo' }, { name: 'Santa Ana' }, { name: 'Santiago de La Frontera' }, { name: 'Texistepeque' }] },
      { name: 'Sonsonate', cities: [{ name: 'Acajutla' }, { name: 'Armenia' }, { name: 'Cuisnahuat' }, { name: 'Izalco' }, { name: 'Juayúa' }, { name: 'Nahuizalco' }, { name: 'San Antonio del Monte' }, { name: 'San Julián' }, { name: 'Sonsonate' }, { name: 'Sonzacate' }] },
      { name: 'Usulután', cities: [{ name: 'Berlín' }, { name: 'Jiquilisco' }, { name: 'Jucuapa' }, { name: 'Jucuarán' }, { name: 'Mercedes Umaña' }, { name: 'Ozatlán' }, { name: 'Puerto El Triunfo' }, { name: 'San Buenaventura' }, { name: 'Santiago de María' }, { name: 'Usulután' }] }
    ]
  },
  {
    name: 'Equatorial Guinea',
    code: 'GQ',
    currency: 'XAF',
    currencySymbol: 'FCFA',
    states: [
      { name: 'Annobón', cities: [{ name: 'Palé' }] },
      { name: 'Bioko Norte', cities: [{ name: 'Malabo' }, { name: 'Rebola' }, { name: 'Santiago de Baney' }] },
      { name: 'Bioko Sur', cities: [{ name: 'Luba' }] },
      { name: 'Centro Sur', cities: [{ name: 'Evinayong' }, { name: 'Sevilla de Niefang' }] },
      { name: 'Djibloho', cities: [{ name: 'Djibloho' }] },
      { name: 'Kié-Ntem', cities: [{ name: 'Ebebiyín' }] },
      { name: 'Litoral', cities: [{ name: 'Bata' }, { name: 'Calatrava' }, { name: 'Mbini' }] },
      { name: 'Wele-Nzas', cities: [{ name: 'Aconibe' }, { name: 'Añisoc' }, { name: 'Bengonbeyene' }, { name: 'Mongomo' }] }
    ]
  },
  {
    name: 'Eritrea',
    code: 'ER',
    currency: 'ERN',
    currencySymbol: 'Nfk',
    states: [
      { name: '‘Anseba', cities: [{ name: 'Keren' }] },
      { name: 'Debub', cities: [{ name: 'Dbarwa' }, { name: 'Dek’emhāre' }, { name: 'Mendefera' }] },
      { name: 'Debubawi K’eyyĭḥ Baḥri', cities: [{ name: 'Assab' }, { name: 'Bēylul' }, { name: 'Edd' }] },
      { name: 'Gash-Barka', cities: [{ name: 'Ak’ordat' }, { name: 'Barentu' }, { name: 'Gwelej' }, { name: 'Teseney' }] },
      { name: 'Ma’ĭkel', cities: [{ name: 'Adi Keyh' }, { name: 'Asmara' }] },
      { name: 'Semienawi K’eyyĭḥ Baḥri', cities: [{ name: 'Ghinda’e' }, { name: 'Massawa' }, { name: 'Nefasīt' }] }
    ]
  },
  {
    name: 'Estonia',
    code: 'EE',
    currency: 'EUR',
    currencySymbol: '€',
    states: [
      { name: 'Kohtla-Järve', cities: [{ name: 'Kohtla-Järve' }] },
      { name: 'Maardu', cities: [{ name: 'Maardu' }] },
      { name: 'Narva', cities: [{ name: 'Narva' }] },
      { name: 'Pärnu', cities: [{ name: 'Pärnu' }] },
      { name: 'Rakvere', cities: [{ name: 'Rakvere' }] },
      { name: 'Saaremaa', cities: [{ name: 'Kuressaare' }] },
      { name: 'Sillamäe', cities: [{ name: 'Sillamäe' }] },
      { name: 'Tallinn', cities: [{ name: 'Tallinn' }] },
      { name: 'Tartu', cities: [{ name: 'Tartu' }] },
      { name: 'Viljandi', cities: [{ name: 'Viljandi' }] }
    ]
  },
  {
    name: 'Eswatini',
    code: 'SZ',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Hhohho', cities: [{ name: 'Lobamba' }, { name: 'Mbabane' }, { name: 'Piggs Peak' }] },
      { name: 'Lubombo', cities: [{ name: 'Siteki' }] },
      { name: 'Manzini', cities: [{ name: 'Manzini' }] },
      { name: 'Shiselweni', cities: [{ name: 'Hlatikulu' }, { name: 'Lavumisa' }, { name: 'Nhlangano' }] }
    ]
  },
  {
    name: 'Ethiopia',
    code: 'ET',
    currency: 'ETB',
    currencySymbol: 'Br',
    states: [
      { name: 'Ādīs Ābeba', cities: [{ name: 'Addis Ababa' }] },
      { name: 'Āmara', cities: [{ name: 'Āzezo' }, { name: 'Bahir Dar' }, { name: 'Debre Birhan' }, { name: 'Debre Mark’os' }, { name: 'Debre Tabor' }, { name: 'Desē' }, { name: 'Gonder' }, { name: 'Kombolcha' }, { name: 'Mersa' }, { name: 'Weldiya' }] },
      { name: 'Dirē Dawa', cities: [{ name: 'Dire Dawa' }] },
      { name: 'Gambēla Hizboch', cities: [{ name: 'Gambēla' }] },
      { name: 'Hārerī Hizb', cities: [{ name: 'Harar' }] },
      { name: 'Oromīya', cities: [{ name: 'Āsela' }, { name: 'Babīlē' }, { name: 'Debre Zeyit' }, { name: 'Gelemso' }, { name: 'Jīma' }, { name: 'Mojo' }, { name: 'Nazrēt' }, { name: 'Nek’emtē' }, { name: 'Shashemenē' }, { name: 'Yabēlo' }] },
      { name: 'Sīdama', cities: [{ name: 'Āwasa' }, { name: 'Yirga ‘Alem' }] },
      { name: 'Sumalē', cities: [{ name: 'Ādīgala' }, { name: 'Āfdem' }, { name: 'Āwarē' }, { name: 'Denan' }, { name: 'Godē' }, { name: 'Harshin' }, { name: 'Jijiga' }, { name: 'K’ebrī Beyah' }, { name: 'K’ebrī Dehar' }, { name: 'Warder' }] },
      { name: 'Tigray', cities: [{ name: 'Ādīgrat' }, { name: 'Ādwa' }, { name: 'Āksum' }, { name: 'Ālamat’ā' }, { name: 'Cheraro' }, { name: 'Himora' }, { name: 'Maychew' }, { name: 'Mekele' }, { name: 'Shirē' }, { name: 'Wik’ro' }] },
      { name: 'YeDebub Bihēroch Bihēreseboch na Hizboch', cities: [{ name: 'Ārba Minch’' }, { name: 'Āreka' }, { name: 'Bedēsa' }, { name: 'Bodītī' }, { name: 'Butajīra' }, { name: 'Dīla' }, { name: 'Hosa’ina' }, { name: 'Jinka' }, { name: 'Sodo' }, { name: 'Welk’īt’ē' }] }
    ]
  },
  {
    name: 'Falkland Islands (Islas Malvinas)',
    code: 'FK',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Stanley' }] }
    ]
  },
  {
    name: 'Faroe Islands',
    code: 'FO',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Fámjin', cities: [{ name: 'Fámjin' }] },
      { name: 'Fuglafjarður', cities: [{ name: 'Fuglafjørður' }] },
      { name: 'Hov', cities: [{ name: 'Hov' }] },
      { name: 'Hvalba', cities: [{ name: 'Hvalba' }] },
      { name: 'Hvannasund', cities: [{ name: 'Hvannasund' }] },
      { name: 'Klaksvík', cities: [{ name: 'Klaksvík' }] },
      { name: 'Porkeri', cities: [{ name: 'Porkeri' }] },
      { name: 'Sandur', cities: [{ name: 'Sandur' }] },
      { name: 'Skopun', cities: [{ name: 'Skopun' }] },
      { name: 'Tórshavn', cities: [{ name: 'Tórshavn' }] }
    ]
  },
  {
    name: 'Fiji',
    code: 'FJ',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Ba', cities: [{ name: 'Ba' }, { name: 'Lautoka' }, { name: 'Nadi' }] },
      { name: 'Macuata', cities: [{ name: 'Labasa' }] },
      { name: 'Nadroga and Navosa', cities: [{ name: 'Sigatoka' }] },
      { name: 'Naitasiri', cities: [{ name: 'Nakasi' }] },
      { name: 'Rewa', cities: [{ name: 'Lami' }, { name: 'Suva' }] },
      { name: 'Tailevu', cities: [{ name: 'Nausori' }] }
    ]
  },
  {
    name: 'Finland',
    code: 'FI',
    currency: 'EUR',
    currencySymbol: '€',
    states: [
      { name: 'Keski-Suomi', cities: [{ name: 'Äänekoski' }, { name: 'Jämsä' }, { name: 'Jyväskylä' }, { name: 'Jyväskylän Maalaiskunta' }, { name: 'Keuruu' }, { name: 'Laukaa' }, { name: 'Muurame' }, { name: 'Saarijärvi' }] },
      { name: 'Kymenlaakso', cities: [{ name: 'Hamina' }, { name: 'Kotka' }, { name: 'Kouvola' }, { name: 'Kuusankoski' }, { name: 'Sippola' }, { name: 'Valkeala' }, { name: 'Vehkalahti' }] },
      { name: 'Päijät-Häme', cities: [{ name: 'Heinola' }, { name: 'Hollola' }, { name: 'Lahti' }, { name: 'Nastola' }, { name: 'Orimattila' }] },
      { name: 'Pirkanmaa', cities: [{ name: 'Hämeenkyrö' }, { name: 'Kangasala' }, { name: 'Lempäälä' }, { name: 'Nokia' }, { name: 'Pirkkala' }, { name: 'Sastamala' }, { name: 'Tampere' }, { name: 'Valkeakoski' }, { name: 'Vammala' }, { name: 'Ylöjärvi' }] },
      { name: 'Pohjois-Karjala', cities: [{ name: 'Joensuu' }, { name: 'Kitee' }, { name: 'Kontiolahti' }, { name: 'Lieksa' }, { name: 'Liperi' }, { name: 'Nurmes' }, { name: 'Pielisjärvi' }] },
      { name: 'Pohjois-Pohjanmaa', cities: [{ name: 'Haukipudas' }, { name: 'Kalajoki' }, { name: 'Kempele' }, { name: 'Kiiminki' }, { name: 'Kuusamo' }, { name: 'Liminka' }, { name: 'Nivala' }, { name: 'Oulu' }, { name: 'Raahe' }, { name: 'Ylivieska' }] },
      { name: 'Pohjois-Savo', cities: [{ name: 'Iisalmi' }, { name: 'Kuopio' }, { name: 'Lapinlahti' }, { name: 'Leppävirta' }, { name: 'Siilinjärvi' }, { name: 'Varkaus' }] },
      { name: 'Satakunta', cities: [{ name: 'Eura' }, { name: 'Eurajoki' }, { name: 'Huittinen' }, { name: 'Kankaanpää' }, { name: 'Pori' }, { name: 'Rauma' }, { name: 'Ulvila' }] },
      { name: 'Uusimaa', cities: [{ name: 'Espoo' }, { name: 'Helsinki' }, { name: 'Hyvinkää' }, { name: 'Järvenpää' }, { name: 'Kirkkonummi' }, { name: 'Lohja' }, { name: 'Nurmijärvi' }, { name: 'Porvoo' }, { name: 'Tuusula' }, { name: 'Vantaa' }] },
      { name: 'Varsinais-Suomi', cities: [{ name: 'Kaarina' }, { name: 'Lieto' }, { name: 'Loimaa' }, { name: 'Naantali' }, { name: 'Paimio' }, { name: 'Pargas' }, { name: 'Raisio' }, { name: 'Salo' }, { name: 'Turku' }, { name: 'Uusikaupunki' }] }
    ]
  },
  {
    name: 'France',
    code: 'FR',
    currency: 'EUR',
    currencySymbol: '€',
    states: [
      { name: 'Auvergne-Rhône-Alpes', cities: [{ name: 'Annecy' }, { name: 'Chambéry' }, { name: 'Clermont-Ferrand' }, { name: 'Grenoble' }, { name: 'Lyon' }, { name: 'Saint-Étienne' }, { name: 'Valence' }, { name: 'Vaulx-en-Velin' }, { name: 'Vénissieux' }, { name: 'Villeurbanne' }] },
      { name: 'Bretagne', cities: [{ name: 'Brest' }, { name: 'Concarneau' }, { name: 'Fougères' }, { name: 'Lanester' }, { name: 'Lorient' }, { name: 'Quimper' }, { name: 'Rennes' }, { name: 'Saint-Brieuc' }, { name: 'Saint-Malo' }, { name: 'Vannes' }] },
      { name: 'Grand Est', cities: [{ name: 'Châlons-en-Champagne' }, { name: 'Colmar' }, { name: 'Haguenau' }, { name: 'Metz' }, { name: 'Mulhouse' }, { name: 'Nancy' }, { name: 'Reims' }, { name: 'Strasbourg' }, { name: 'Thionville' }, { name: 'Troyes' }] },
      { name: 'Hauts-de-France', cities: [{ name: 'Amiens' }, { name: 'Arras' }, { name: 'Beauvais' }, { name: 'Calais' }, { name: 'Dunkerque' }, { name: 'Lille' }, { name: 'Roubaix' }, { name: 'Saint-Quentin' }, { name: 'Tourcoing' }, { name: 'Valenciennes' }] },
      { name: 'Île-de-France', cities: [{ name: 'Argenteuil' }, { name: 'Aubervilliers' }, { name: 'Boulogne-Billancourt' }, { name: 'Colombes' }, { name: 'Créteil' }, { name: 'Montreuil' }, { name: 'Nanterre' }, { name: 'Paris' }, { name: 'Saint-Denis' }, { name: 'Vitry-sur-Seine' }] },
      { name: 'Normandie', cities: [{ name: 'Alençon' }, { name: 'Caen' }, { name: 'Cherbourg' }, { name: 'Dieppe' }, { name: 'Évreux' }, { name: 'Le Grand-Quevilly' }, { name: 'Le Havre' }, { name: 'Rouen' }, { name: 'Saint-Étienne-du-Rouvray' }, { name: 'Sotteville-lès-Rouen' }] },
      { name: 'Nouvelle-Aquitaine', cities: [{ name: 'Bayonne' }, { name: 'Bordeaux' }, { name: 'Brive-la-Gaillarde' }, { name: 'La Rochelle' }, { name: 'Limoges' }, { name: 'Mérignac' }, { name: 'Niort' }, { name: 'Pau' }, { name: 'Pessac' }, { name: 'Poitiers' }] },
      { name: 'Occitanie', cities: [{ name: 'Albi' }, { name: 'Béziers' }, { name: 'Carcassonne' }, { name: 'Montauban' }, { name: 'Montpellier' }, { name: 'Narbonne' }, { name: 'Nîmes' }, { name: 'Perpignan' }, { name: 'Sète' }, { name: 'Toulouse' }] },
      { name: 'Pays de la Loire', cities: [{ name: 'Angers' }, { name: 'Cholet' }, { name: 'La Roche-sur-Yon' }, { name: 'Laval' }, { name: 'Le Mans' }, { name: 'Nantes' }, { name: 'Rezé' }, { name: 'Saint-Herblain' }, { name: 'Saint-Nazaire' }, { name: 'Saint-Sébastien-sur-Loire' }] },
      { name: 'Provence-Alpes-Côte d’Azur', cities: [{ name: 'Aix-en-Provence' }, { name: 'Antibes' }, { name: 'Avignon' }, { name: 'Cannes' }, { name: 'Fréjus' }, { name: 'Juan-les-Pins' }, { name: 'La Seyne-sur-Mer' }, { name: 'Marseille' }, { name: 'Nice' }, { name: 'Toulon' }] }
    ]
  },
  {
    name: 'French Guiana',
    code: 'GF',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Cayenne' }, { name: 'Iracoubo' }, { name: 'Kourou' }, { name: 'Roura' }, { name: 'Saint-Georges' }, { name: 'Saint-Laurent-du-Maroni' }, { name: 'Sinnamary' }] }
    ]
  },
  {
    name: 'French Polynesia',
    code: 'PF',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Îles du Vent', cities: [{ name: 'Papeete' }] }
    ]
  },
  {
    name: 'Gabon',
    code: 'GA',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Estuaire', cities: [{ name: 'Libreville' }, { name: 'Ntoum' }, { name: 'Owendo' }] },
      { name: 'Haut-Ogooué', cities: [{ name: 'Franceville' }, { name: 'Moanda' }, { name: 'Okondja' }] },
      { name: 'Moyen-Ogooué', cities: [{ name: 'Bifoun' }, { name: 'Lambaréné' }] },
      { name: 'Ngounié', cities: [{ name: 'Mouila' }, { name: 'Ndendé' }] },
      { name: 'Nyanga', cities: [{ name: 'Mayumba' }, { name: 'Tchibanga' }] },
      { name: 'Ogooué-Ivindo', cities: [{ name: 'Makokou' }, { name: 'Mékambo' }] },
      { name: 'Ogooué-Lolo', cities: [{ name: 'Koulamoutou' }] },
      { name: 'Ogooué-Maritime', cities: [{ name: 'Gamba' }, { name: 'Omboué' }, { name: 'Port-Gentil' }] },
      { name: 'Woleu-Ntem', cities: [{ name: 'Bitam' }, { name: 'Mitzic' }, { name: 'Oyem' }] }
    ]
  },
  {
    name: 'Gambia, The',
    code: 'GM',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Banjul', cities: [{ name: 'Banjul' }] },
      { name: 'Central River', cities: [{ name: 'Bansang' }, { name: 'Brikama Ba' }, { name: 'Janjanbureh' }] },
      { name: 'Kanifing', cities: [{ name: 'Bakau' }, { name: 'Kanifing' }, { name: 'Serekunda' }] },
      { name: 'Lower River', cities: [{ name: 'Mansa Konko' }] },
      { name: 'North Bank', cities: [{ name: 'Essau' }, { name: 'Farafenni' }, { name: 'Kerewan' }] },
      { name: 'Upper River', cities: [{ name: 'Basse Santa Su' }, { name: 'Diabugu' }, { name: 'Gambissara' }] },
      { name: 'West Coast', cities: [{ name: 'Brikama' }, { name: 'Busumbala' }, { name: 'Gunjur' }, { name: 'Sareh Mowndeh' }, { name: 'Sukuta' }] }
    ]
  },
  {
    name: 'Gaza Strip',
    code: 'XG',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: '‘Abasān al Kabīrah' }, { name: 'Az Zuwāydah' }, { name: 'Banī Suhaylā' }, { name: 'Bayt Lāhyā' }, { name: 'Dayr al Balaḩ' }, { name: 'Gaza' }, { name: 'Jabālyā' }, { name: 'Khān Yūnis' }, { name: 'Rafaḩ' }] }
    ]
  },
  {
    name: 'Georgia',
    code: 'GE',
    currency: 'GEL',
    currencySymbol: '₾',
    states: [
      { name: 'Abkhazia', cities: [{ name: 'Sokhumi' }] },
      { name: 'Ajaria', cities: [{ name: 'Batumi' }, { name: 'Kobuleti' }] },
      { name: 'Imereti', cities: [{ name: 'Chiatura' }, { name: 'Kutaisi' }, { name: 'Samtredia' }, { name: 'Zest’aponi' }] },
      { name: 'K’akheti', cities: [{ name: 'Iormughanlo' }, { name: 'Sagarejo' }, { name: 'Telavi' }] },
      { name: 'Kvemo Kartli', cities: [{ name: 'Marneuli' }, { name: 'Rustavi' }] },
      { name: 'Mtskheta Mtianeti', cities: [{ name: 'Mtskheta' }] },
      { name: 'Samegrelo-Zemo Svaneti', cities: [{ name: 'Poti' }, { name: 'Senaki' }, { name: 'Zugdidi' }] },
      { name: 'Samtskhe-Javakheti', cities: [{ name: 'Akhaltsikhe' }, { name: 'Borjomi' }] },
      { name: 'Shida Kartli', cities: [{ name: 'Gori' }, { name: 'Kaspi' }, { name: 'Khashuri' }, { name: 'Tskhinvali' }] },
      { name: 'Tbilisi', cities: [{ name: 'Tbilisi' }] }
    ]
  },
  {
    name: 'Germany',
    code: 'DE',
    currency: 'EUR',
    currencySymbol: '€',
    states: [
      { name: 'Baden-Württemberg', cities: [{ name: 'Esslingen' }, { name: 'Freiburg im Breisgau' }, { name: 'Heidelberg' }, { name: 'Heilbronn' }, { name: 'Karlsruhe' }, { name: 'Mannheim' }, { name: 'Pforzheim' }, { name: 'Reutlingen' }, { name: 'Stuttgart' }, { name: 'Ulm' }] },
      { name: 'Bavaria', cities: [{ name: 'Augsburg' }, { name: 'Bamberg' }, { name: 'Erlangen' }, { name: 'Fürth' }, { name: 'Ingolstadt' }, { name: 'Landshut' }, { name: 'Munich' }, { name: 'Nuremberg' }, { name: 'Regensburg' }, { name: 'Würzburg' }] },
      { name: 'Berlin', cities: [{ name: 'Berlin' }] },
      { name: 'Bremen', cities: [{ name: 'Bremen' }, { name: 'Bremerhaven' }, { name: 'Ritterhude' }] },
      { name: 'Hamburg', cities: [{ name: 'Barsbüttel' }, { name: 'Hamburg' }, { name: 'Oststeinbek' }, { name: 'Wentorf bei Hamburg' }] },
      { name: 'Hesse', cities: [{ name: 'Bad Homburg' }, { name: 'Darmstadt' }, { name: 'Frankfurt' }, { name: 'Fulda' }, { name: 'Gießen' }, { name: 'Hanau' }, { name: 'Kassel' }, { name: 'Marburg' }, { name: 'Rüsselsheim' }, { name: 'Wiesbaden' }] },
      { name: 'Lower Saxony', cities: [{ name: 'Braunschweig' }, { name: 'Delmenhorst' }, { name: 'Göttingen' }, { name: 'Hannover' }, { name: 'Hildesheim' }, { name: 'Lüneburg' }, { name: 'Oldenburg' }, { name: 'Osnabrück' }, { name: 'Salzgitter' }, { name: 'Wolfsburg' }] },
      { name: 'North Rhine-Westphalia', cities: [{ name: 'Bielefeld' }, { name: 'Bochum' }, { name: 'Bonn' }, { name: 'Cologne' }, { name: 'Dortmund' }, { name: 'Duisburg' }, { name: 'Düsseldorf' }, { name: 'Essen' }, { name: 'Münster' }, { name: 'Wuppertal' }] },
      { name: 'Saxony', cities: [{ name: 'Bautzen' }, { name: 'Chemnitz' }, { name: 'Dresden' }, { name: 'Freiberg' }, { name: 'Freital' }, { name: 'Görlitz' }, { name: 'Leipzig' }, { name: 'Pirna' }, { name: 'Plauen' }, { name: 'Zwickau' }] },
      { name: 'Schleswig-Holstein', cities: [{ name: 'Ahrensburg' }, { name: 'Elmshorn' }, { name: 'Flensburg' }, { name: 'Geesthacht' }, { name: 'Kiel' }, { name: 'Lübeck' }, { name: 'Neumünster' }, { name: 'Norderstedt' }, { name: 'Pinneberg' }, { name: 'Wedel' }] }
    ]
  },
  {
    name: 'Ghana',
    code: 'GH',
    currency: 'GHS',
    currencySymbol: 'GH₵',
    states: [
      { name: 'Ashanti', cities: [{ name: 'Agogo' }, { name: 'Boankra' }, { name: 'Ejura' }, { name: 'Konongo' }, { name: 'Kumasi' }, { name: 'Mampong' }, { name: 'Obuase' }, { name: 'Tafo' }] },
      { name: 'Bono', cities: [{ name: 'Berekum' }, { name: 'Domaa-Ahenkro' }, { name: 'Gyapekurom' }, { name: 'Odumase' }, { name: 'Sunyani' }] },
      { name: 'Bono East', cities: [{ name: 'Atebubu' }, { name: 'Kintampo' }, { name: 'Techiman' }] },
      { name: 'Central', cities: [{ name: 'Anomabu' }, { name: 'Apam' }, { name: 'Cape Coast' }, { name: 'Elmina' }, { name: 'Mumford' }, { name: 'Nyakrom' }, { name: 'Saltpond' }, { name: 'Swedru' }, { name: 'Winneba' }] },
      { name: 'Eastern', cities: [{ name: 'Akwatia' }, { name: 'Asamankese' }, { name: 'Begoro' }, { name: 'Koforidua' }, { name: 'Nkawkaw' }, { name: 'Nsawam' }, { name: 'Oda' }, { name: 'Peduasi' }, { name: 'Somanya' }, { name: 'Suhum' }] },
      { name: 'Greater Accra', cities: [{ name: 'Accra' }, { name: 'Ashaiman' }, { name: 'Dome' }, { name: 'Gbawe' }, { name: 'Medina Estates' }, { name: 'Tema' }] },
      { name: 'Northern', cities: [{ name: 'Chamba' }, { name: 'Diari' }, { name: 'Gumani' }, { name: 'Karaga' }, { name: 'Kpandae' }, { name: 'Savelugu' }, { name: 'Tamale' }, { name: 'Yendi' }] },
      { name: 'Oti', cities: [{ name: 'Ahenkro' }, { name: 'Dambai' }, { name: 'Kete Krachi' }] },
      { name: 'Upper West', cities: [{ name: 'Wa' }] },
      { name: 'Volta', cities: [{ name: 'Aflao' }, { name: 'Anloga' }, { name: 'Dzolokpuita' }, { name: 'Ho' }, { name: 'Hohoe' }, { name: 'Keta' }, { name: 'Kpandu' }, { name: 'Seva' }] }
    ]
  },
  {
    name: 'Gibraltar',
    code: 'GI',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Gibraltar' }] }
    ]
  },
  {
    name: 'Greece',
    code: 'GR',
    currency: 'EUR',
    currencySymbol: '€',
    states: [
      { name: 'Anatolikí Makedonía kai Thráki', cities: [{ name: 'Alexandroúpoli' }, { name: 'Chrysoúpoli' }, { name: 'Didymóteicho' }, { name: 'Dráma' }, { name: 'Fílippoi' }, { name: 'Kavála' }, { name: 'Komotiní' }, { name: 'Lágos' }, { name: 'Orestiáda' }, { name: 'Xánthi' }] },
      { name: 'Attikí', cities: [{ name: 'Acharnés' }, { name: 'Athens' }, { name: 'Chalándri' }, { name: 'Glyfáda' }, { name: 'Ílion' }, { name: 'Ilioúpoli' }, { name: 'Kallithéa' }, { name: 'Níkaia' }, { name: 'Peristéri' }, { name: 'Piraeus' }] },
      { name: 'Dytikí Elláda', cities: [{ name: 'Agrínio' }, { name: 'Aígio' }, { name: 'Amaliáda' }, { name: 'Kalávryta' }, { name: 'Mesolóngi' }, { name: 'Náfpaktos' }, { name: 'Néo Vouprásio' }, { name: 'Pátra' }, { name: 'Pýrgos' }, { name: 'Skilloúnta' }] },
      { name: 'Ionía Nísia', cities: [{ name: 'Argostóli' }, { name: 'Kérkyra' }, { name: 'Lefkáda' }, { name: 'Zákynthos' }] },
      { name: 'Ípeiros', cities: [{ name: 'Anatolí' }, { name: 'Árta' }, { name: 'Ioánnina' }, { name: 'Préveza' }] },
      { name: 'Kentrikí Makedonía', cities: [{ name: 'Évosmos' }, { name: 'Kalamariá' }, { name: 'Kateríni' }, { name: 'Oraiókastro' }, { name: 'Sérres' }, { name: 'Stavroúpoli' }, { name: 'Thérmi' }, { name: 'Thessaloníki' }, { name: 'Vergína' }, { name: 'Véroia' }] },
      { name: 'Kríti', cities: [{ name: 'Ágios Nikólaos' }, { name: 'Arkalochóri' }, { name: 'Chaniá' }, { name: 'Gázi' }, { name: 'Ierápetra' }, { name: 'Irákleio' }, { name: 'Néa Alikarnassós' }, { name: 'Réthymno' }, { name: 'Siteía' }, { name: 'Tympáki' }] },
      { name: 'Nótio Aigaío', cities: [{ name: 'Áno Sýros' }, { name: 'Ermoúpoli' }, { name: 'Ialysós' }, { name: 'Kálymnos' }, { name: 'Kos' }, { name: 'Ródos' }] },
      { name: 'Stereá Elláda', cities: [{ name: 'Chalkída' }, { name: 'Domokós' }, { name: 'Lamía' }, { name: 'Livadeiá' }, { name: 'Thebes' }] },
      { name: 'Thessalía', cities: [{ name: 'Elassóna' }, { name: 'Fársala' }, { name: 'Giánnouli' }, { name: 'Kalampáka' }, { name: 'Kardítsa' }, { name: 'Lárisa' }, { name: 'Tríkala' }, { name: 'Týrnavos' }, { name: 'Vólos' }] }
    ]
  },
  {
    name: 'Greenland',
    code: 'GL',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Avannaata', cities: [{ name: 'Ilulissat' }, { name: 'Kangersuatsiaq' }, { name: 'Kraulshavn' }, { name: 'Kullorsuaq' }, { name: 'Qaanaaq' }, { name: 'Savissivik' }, { name: 'Tasiusaq' }, { name: 'Upernavik' }, { name: 'Uummannaq' }] },
      { name: 'Kujalleq', cities: [{ name: 'Narsarsuaq' }, { name: 'Qaqortoq' }, { name: 'Timmiarmiut' }] },
      { name: 'Qeqertalik', cities: [{ name: 'Aasiaat' }, { name: 'Godhavn' }, { name: 'Qasigiannguit' }] },
      { name: 'Qeqqata', cities: [{ name: 'Sisimiut' }] },
      { name: 'Sermersooq', cities: [{ name: 'Kulusuk' }, { name: 'Nuuk' }, { name: 'Paamiut' }, { name: 'Scoresbysund' }, { name: 'Tasiilaq' }] },
      { name: 'Unknown', cities: [{ name: 'Nord' }] }
    ]
  },
  {
    name: 'Grenada',
    code: 'GD',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Saint David', cities: [{ name: 'Saint David’s' }] },
      { name: 'Saint George', cities: [{ name: 'Saint George’s' }] }
    ]
  },
  {
    name: 'Guadeloupe',
    code: 'GP',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Basse-Terre' }, { name: 'Pointe-à-Pitre' }] }
    ]
  },
  {
    name: 'Guam',
    code: 'GU',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Hagåtña' }, { name: 'Maina' }] }
    ]
  },
  {
    name: 'Guatemala',
    code: 'GT',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Alta Verapaz', cities: [{ name: 'Chisec' }, { name: 'Cobán' }, { name: 'Fray Bartolomé de Las Casas' }, { name: 'Panzos' }, { name: 'San Cristóbal Verapaz' }, { name: 'San Juan Chamelco' }, { name: 'San Pedro Carchá' }, { name: 'Santa María La Pila' }, { name: 'Senahú' }, { name: 'Tucurú' }] },
      { name: 'Chimaltenango', cities: [{ name: 'Chimaltenango' }, { name: 'Patzicía' }, { name: 'Patzún' }, { name: 'Pochuta' }, { name: 'San Andrés Itzapa' }, { name: 'San José Poaquil' }, { name: 'San Martín Jilotepeque' }, { name: 'Tecpán Guatemala' }, { name: 'Yepocapa' }, { name: 'Zaragoza' }] },
      { name: 'Escuintla', cities: [{ name: 'Escuintla' }, { name: 'La Democracia' }, { name: 'La Gomera' }, { name: 'Masagua' }, { name: 'Nueva Concepción' }, { name: 'Palín' }, { name: 'Puerto San José' }, { name: 'Santa Lucía Cotzumalguapa' }, { name: 'Siquinalá' }, { name: 'Tiquisate' }] },
      { name: 'Guatemala', cities: [{ name: 'Amatitlán' }, { name: 'Chinautla' }, { name: 'Guatemala City' }, { name: 'Mixco' }, { name: 'Petapa' }, { name: 'San José Pinula' }, { name: 'San Juan Sacatepéquez' }, { name: 'Santa Catarina Pinula' }, { name: 'Villa Canales' }, { name: 'Villa Nueva' }] },
      { name: 'Huehuetenango', cities: [{ name: 'Aguacatán' }, { name: 'Chiantla' }, { name: 'Cuilco' }, { name: 'Huehuetenango' }, { name: 'Ixtahuacán' }, { name: 'La Democracia' }, { name: 'Nentón' }, { name: 'San Mateo Ixtatán' }, { name: 'Santa Eulalia' }, { name: 'Soloma' }] },
      { name: 'Jalapa', cities: [{ name: 'Jalapa' }, { name: 'Mataquescuintla' }, { name: 'Monjas' }, { name: 'San Carlos Alzatate' }, { name: 'San Luis Jilotepeque' }, { name: 'San Manuel Chaparrón' }, { name: 'San Pedro Pinula' }] },
      { name: 'Jutiapa', cities: [{ name: 'Asunción Mita' }, { name: 'Atescatempa' }, { name: 'Comapa' }, { name: 'Conguaco' }, { name: 'El Progreso' }, { name: 'Jalpatagua' }, { name: 'Jerez' }, { name: 'Jutiapa' }, { name: 'Quesada' }, { name: 'Santa Catarina Mita' }] },
      { name: 'Quetzaltenango', cities: [{ name: 'Cantel' }, { name: 'Coatepeque' }, { name: 'Colomba' }, { name: 'El Palmar' }, { name: 'Génova' }, { name: 'Olintepeque' }, { name: 'Ostuncalco' }, { name: 'Quetzaltenango' }, { name: 'San Carlos Sija' }, { name: 'San Martín Sacatepéquez' }] },
      { name: 'Quiché', cities: [{ name: 'Chajul' }, { name: 'Chicamán' }, { name: 'Chichicastenango' }, { name: 'Cunén' }, { name: 'Joyabaj' }, { name: 'Sacapulas' }, { name: 'San Pédro Jocopilas' }, { name: 'Santa Cruz del Quiché' }, { name: 'Uspantán' }, { name: 'Zacualpa' }] },
      { name: 'Totonicapán', cities: [{ name: 'Momostenango' }, { name: 'San Andrés Xecul' }, { name: 'San Bartolo' }, { name: 'San Cristóbal Totonicapán' }, { name: 'San Francisco El Alto' }, { name: 'Santa Lucia La Reforma' }, { name: 'Santa María Chiquimula' }, { name: 'Totonicapán' }] }
    ]
  },
  {
    name: 'Guernsey',
    code: 'GG',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Saint Peter Port' }, { name: 'Saint Sampson' }] }
    ]
  },
  {
    name: 'Guinea',
    code: 'GN',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Boké', cities: [{ name: 'Boffa' }, { name: 'Boké' }, { name: 'Fria' }, { name: 'Gaoual' }, { name: 'Kamsar' }, { name: 'Koundara' }, { name: 'Sansalé' }] },
      { name: 'Conakry', cities: [{ name: 'Conakry' }] },
      { name: 'Faranah', cities: [{ name: 'Dabola' }, { name: 'Dinguiraye' }, { name: 'Faranah' }, { name: 'Kissidougou' }] },
      { name: 'Kankan', cities: [{ name: 'Doura' }, { name: 'Kankan' }, { name: 'Kéniéran' }, { name: 'Kérouané' }, { name: 'Kouroussa' }, { name: 'Siguiri' }] },
      { name: 'Kindia', cities: [{ name: 'Forécariah' }, { name: 'Kindia' }, { name: 'Télimélé' }] },
      { name: 'Labé', cities: [{ name: 'Labé' }, { name: 'Mali' }, { name: 'Tougué' }] },
      { name: 'Mamou', cities: [{ name: 'Dalaba' }, { name: 'Mamou' }, { name: 'Pita' }] },
      { name: 'N’Zérékoré', cities: [{ name: 'Beyla' }, { name: 'Guéckédou' }, { name: 'Macenta' }, { name: 'N’Zérékoré' }, { name: 'Yomou' }] }
    ]
  },
  {
    name: 'Guinea-Bissau',
    code: 'GW',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Bafatá', cities: [{ name: 'Bafatá' }, { name: 'Bambadinca' }] },
      { name: 'Biombo', cities: [{ name: 'Quinhámel' }] },
      { name: 'Bissau', cities: [{ name: 'Bissau' }] },
      { name: 'Bolama/Bijagós', cities: [{ name: 'Bolama' }] },
      { name: 'Cacheu', cities: [{ name: 'Cacheu' }, { name: 'Caió' }] },
      { name: 'Gabú', cities: [{ name: 'Gabú' }, { name: 'Madina do Boé' }] },
      { name: 'Oio', cities: [{ name: 'Bissorã' }, { name: 'Farim' }] },
      { name: 'Quinara', cities: [{ name: 'Buba' }, { name: 'Fulacunda' }] },
      { name: 'Tombali', cities: [{ name: 'Catió' }] }
    ]
  },
  {
    name: 'Guyana',
    code: 'GY',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Barima-Waini', cities: [{ name: 'Mabaruma' }] },
      { name: 'Cuyuni-Mazaruni', cities: [{ name: 'Bartica' }] },
      { name: 'Demerara-Mahaica', cities: [{ name: 'Georgetown' }] },
      { name: 'East Berbice-Corentyne', cities: [{ name: 'New Amsterdam' }, { name: 'Princetown' }] },
      { name: 'Essequibo Islands-West Demerara', cities: [{ name: 'Vreed-en-Hoop' }] },
      { name: 'Mahaica-Berbice', cities: [{ name: 'Fort Wellington' }] },
      { name: 'Pomeroon-Supenaam', cities: [{ name: 'Anna Regina' }] },
      { name: 'Potaro-Siparuni', cities: [{ name: 'Mahdia' }] },
      { name: 'Upper Demerara-Berbice', cities: [{ name: 'Ituni' }, { name: 'Linden' }] },
      { name: 'Upper Takutu-Upper Essequibo', cities: [{ name: 'Lethem' }] }
    ]
  },
  {
    name: 'Haiti',
    code: 'HT',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Artibonite', cities: [{ name: 'Anse Rouge' }, { name: 'Dessalines' }, { name: 'Ennery' }, { name: 'Gonaïves' }, { name: 'Grande Saline' }, { name: 'Petite Rivière de l’Artibonite' }, { name: 'Saint-Marc' }, { name: 'Saint-Michel de l’Atalaye' }, { name: 'Terre Neuve' }, { name: 'Verrettes' }] },
      { name: 'Centre', cities: [{ name: 'Belladère' }, { name: 'Boucan Carré' }, { name: 'Cerca Carvajal' }, { name: 'Cerca la Source' }, { name: 'Hinche' }, { name: 'Maïssade' }, { name: 'Thomassique' }, { name: 'Ville Bonheur' }] },
      { name: 'Grand’Anse', cities: [{ name: 'Anse d’Hainault' }, { name: 'Chambellan' }, { name: 'Corail' }, { name: 'Dame-Marie' }, { name: 'Jérémie' }, { name: 'Les Abricots' }, { name: 'Les Irois' }, { name: 'Moron' }, { name: 'Pestel' }, { name: 'Roseaux' }] },
      { name: 'Nippes', cities: [{ name: 'Anse-à-Veau' }, { name: 'Arnaud' }, { name: 'Baradères' }, { name: 'L’Asile' }, { name: 'Miragoâne' }, { name: 'Petit-Trou de Nippes' }, { name: 'Petite Rivière de Nippes' }] },
      { name: 'Nord', cities: [{ name: 'Acul du Nord' }, { name: 'Bas Limbé' }, { name: 'Borgne' }, { name: 'Cap-Haïtien' }, { name: 'Limbé' }, { name: 'Limonade' }, { name: 'Milot' }, { name: 'Pilate' }, { name: 'Plaisance' }, { name: 'Port-Margot' }] },
      { name: 'Nord-Est', cities: [{ name: 'Capotille' }, { name: 'Ferrier' }, { name: 'Fort Liberté' }, { name: 'Mombin Crochu' }, { name: 'Mont-Organisé' }, { name: 'Perches' }, { name: 'Sainte-Suzanne' }, { name: 'Terrier Rouge' }, { name: 'Trou du Nord' }, { name: 'Vallières' }] },
      { name: 'Nord-Ouest', cities: [{ name: 'Anse-à-Foleur' }, { name: 'Baie de Henne' }, { name: 'Bassin Bleu' }, { name: 'Bombardopolis' }, { name: 'Chansolme' }, { name: 'Jean-Rabel' }, { name: 'La Pointe' }, { name: 'Port-de-Paix' }, { name: 'Saint-Louis du Nord' }] },
      { name: 'Ouest', cities: [{ name: 'Anse à Galets' }, { name: 'Arcahaie' }, { name: 'Carrefour' }, { name: 'Croix-des-Bouquets' }, { name: 'Delmas' }, { name: 'Ganthier' }, { name: 'Léogâne' }, { name: 'Pétion-Ville' }, { name: 'Port-au-Prince' }, { name: 'Tabarre' }] },
      { name: 'Sud', cities: [{ name: 'Aquin' }, { name: 'Arniquet' }, { name: 'Camp Perrin' }, { name: 'Cavaillon' }, { name: 'Chantal' }, { name: 'La Source' }, { name: 'Les Anglais' }, { name: 'Les Cayes' }, { name: 'Saint-Louis du Sud' }, { name: 'Torbeck' }] },
      { name: 'Sud-Est', cities: [{ name: 'Anse à Pitre' }, { name: 'Bainet' }, { name: 'Belle-Anse' }, { name: 'Côtes de Fer' }, { name: 'Grand Gosier' }, { name: 'Jacmel' }, { name: 'La Vallée de Jacmel' }, { name: 'Les Palmes' }, { name: 'Marigot' }, { name: 'Thiotte' }] }
    ]
  },
  {
    name: 'Honduras',
    code: 'HN',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Atlántida', cities: [{ name: 'La Ceiba' }, { name: 'San Francisco' }, { name: 'Tela' }] },
      { name: 'Choluteca', cities: [{ name: 'Ciudad Choluteca' }] },
      { name: 'Colón', cities: [{ name: 'Bonito Oriental' }, { name: 'Iriona' }, { name: 'Sonaguera' }, { name: 'Tocoa' }, { name: 'Trujillo' }] },
      { name: 'Comayagua', cities: [{ name: 'Comayagua' }, { name: 'Siguatepeque' }] },
      { name: 'Copán', cities: [{ name: 'Copán' }, { name: 'El Paraíso' }, { name: 'La Entrada' }, { name: 'La Jigua' }, { name: 'Santa Rita' }, { name: 'Santa Rosa de Copán' }] },
      { name: 'Cortés', cities: [{ name: 'Choloma' }, { name: 'Cofradía' }, { name: 'La Lima' }, { name: 'Potrerillos' }, { name: 'Puerto Cortés' }, { name: 'San Manuel' }, { name: 'San Pedro Sula' }, { name: 'Villanueva' }] },
      { name: 'El Paraíso', cities: [{ name: 'Danlí' }, { name: 'Yuscarán' }] },
      { name: 'Francisco Morazán', cities: [{ name: 'Cedros' }, { name: 'Comayagüela' }, { name: 'Guaimaca' }, { name: 'Marale' }, { name: 'San Ignacio' }, { name: 'Santa Ana' }, { name: 'Talanga' }, { name: 'Tegucigalpa' }] },
      { name: 'Olancho', cities: [{ name: 'Campamento' }, { name: 'Catacamas' }, { name: 'Juticalpa' }] },
      { name: 'Yoro', cities: [{ name: 'El Progreso' }, { name: 'Olanchito' }, { name: 'Santa Rita' }, { name: 'Sulaco' }, { name: 'Yorito' }, { name: 'Yoro' }] }
    ]
  },
  {
    name: 'Hong Kong',
    code: 'HK',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Central District' }, { name: 'Hong Kong' }, { name: 'Kowloon' }, { name: 'Kowloon City' }, { name: 'Lam Tin' }, { name: 'San Tung Chung Hang' }, { name: 'Sha Tin' }, { name: 'Sham Shui Po' }, { name: 'Tin Shui Wai' }, { name: 'Tsing Yi Town' }] }
    ]
  },
  {
    name: 'Hungary',
    code: 'HU',
    currency: 'HUF',
    currencySymbol: 'Ft',
    states: [
      { name: 'Bács-Kiskun', cities: [{ name: 'Baja' }, { name: 'Kalocsa' }, { name: 'Kecskemét' }, { name: 'Kiskőrös' }, { name: 'Kiskunfélegyháza' }, { name: 'Kiskunhalas' }, { name: 'Kiskunmajsa' }, { name: 'Lajosmizse' }, { name: 'Tiszakécske' }] },
      { name: 'Baranya', cities: [{ name: 'Komló' }, { name: 'Mohács' }, { name: 'Pécs' }, { name: 'Siklós' }, { name: 'Szigetvár' }] },
      { name: 'Borsod-Abaúj-Zemplén', cities: [{ name: 'Edelény' }, { name: 'Kazincbarcika' }, { name: 'Mezőkövesd' }, { name: 'Miskolc' }, { name: 'Ózd' }, { name: 'Sajószentpéter' }, { name: 'Sárospatak' }, { name: 'Sátoraljaújhely' }, { name: 'Tiszaújváros' }] },
      { name: 'Budapest', cities: [{ name: 'Budapest' }] },
      { name: 'Csongrád-Csanád', cities: [{ name: 'Csongrád' }, { name: 'Makó' }, { name: 'Szeged' }, { name: 'Szentes' }] },
      { name: 'Győr-Moson-Sopron', cities: [{ name: 'Csorna' }, { name: 'Győr' }, { name: 'Kapuvár' }, { name: 'Mosonmagyaróvár' }] },
      { name: 'Hajdú-Bihar', cities: [{ name: 'Balmazújváros' }, { name: 'Berettyóújfalu' }, { name: 'Debrecen' }, { name: 'Hajdúböszörmény' }, { name: 'Hajdúhadház' }, { name: 'Hajdúnánás' }, { name: 'Hajdúsámson' }, { name: 'Hajdúszoboszló' }, { name: 'Püspökladány' }] },
      { name: 'Sopron', cities: [{ name: 'Sopron' }] },
      { name: 'Szabolcs-Szatmár-Bereg', cities: [{ name: 'Kisvárda' }, { name: 'Mátészalka' }, { name: 'Nagykálló' }, { name: 'Nyírbátor' }, { name: 'Nyíregyháza' }, { name: 'Tiszavasvári' }, { name: 'Újfehértó' }] },
      { name: 'Vas', cities: [{ name: 'Celldömölk' }, { name: 'Körmend' }, { name: 'Kőszeg' }, { name: 'Sárvár' }, { name: 'Szombathely' }] }
    ]
  },
  {
    name: 'Iceland',
    code: 'IS',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Akureyri', cities: [{ name: 'Akureyri' }] },
      { name: 'Garðabær', cities: [{ name: 'Garðabær' }] },
      { name: 'Hafnarfjörður', cities: [{ name: 'Hafnarfjörður' }] },
      { name: 'Ísafjarðarbær', cities: [{ name: 'Ísafjörður' }] },
      { name: 'Kópavogur', cities: [{ name: 'Kópavogur' }] },
      { name: 'Múlaþing', cities: [{ name: 'Egilsstaðir' }] },
      { name: 'Reykjanesbær', cities: [{ name: 'Keflavík' }] },
      { name: 'Reykjavík', cities: [{ name: 'Reykjavík' }] },
      { name: 'Skagafjörður', cities: [{ name: 'Sauðárkrókur' }] },
      { name: 'Sveitarfélagið Árborg', cities: [{ name: 'Selfoss' }] }
    ]
  },
  {
    name: 'India',
    code: 'IN',
    currency: 'INR',
    currencySymbol: '₹',
    states: [
      { name: 'Bihār', cities: [{ name: 'Belāhi' }, { name: 'Bettiah' }, { name: 'Bhāgalpur' }, { name: 'Bihtā' }, { name: 'Gaya' }, { name: 'Mothīhāri' }, { name: 'Patna' }, { name: 'Purnea' }, { name: 'Sasarām' }, { name: 'Supaul' }] },
      { name: 'Delhi', cities: [{ name: 'Bāprola' }, { name: 'Bhālswa Jahangirpur' }, { name: 'Dalūpura' }, { name: 'Delhi' }, { name: 'Delhi Cantonment' }, { name: 'Najafgarh' }, { name: 'Nāngloi Jāt' }, { name: 'Narela' }, { name: 'New Delhi' }, { name: 'Sultānpur Mazra' }] },
      { name: 'Gujarāt', cities: [{ name: 'Ahmedabad' }, { name: 'Bārdoli' }, { name: 'Bhāvnagar' }, { name: 'Idar' }, { name: 'Jāmnagar' }, { name: 'Jūnāgadh' }, { name: 'Rājkot' }, { name: 'Rāpar' }, { name: 'Sūrat' }, { name: 'Vadodara' }] },
      { name: 'Karnātaka', cities: [{ name: 'Bangalore' }, { name: 'Belgaum' }, { name: 'Bellary' }, { name: 'Davangere' }, { name: 'Gulbarga' }, { name: 'Hubli' }, { name: 'Mangalore' }, { name: 'Mysore' }, { name: 'Shorāpur' }, { name: 'Tumkūr' }] },
      { name: 'Kerala', cities: [{ name: 'Attadappa' }, { name: 'Calicut' }, { name: 'Kalleli' }, { name: 'Kannankulam' }, { name: 'Kochi' }, { name: 'Kottārasshēri' }, { name: 'Kottayam' }, { name: 'Manampizha' }, { name: 'Quilon' }, { name: 'Thiruvananthapuram' }] },
      { name: 'Mahārāshtra', cities: [{ name: 'Aurangābād' }, { name: 'Kalyān' }, { name: 'Mumbai' }, { name: 'Nāgpur' }, { name: 'Nāsik' }, { name: 'Pimpri-Chinchwad' }, { name: 'Pune' }, { name: 'Solāpur' }, { name: 'Thāne' }, { name: 'Vasai-Virar' }] },
      { name: 'Tamil Nādu', cities: [{ name: 'Chennai' }, { name: 'Coimbatore' }, { name: 'Madurai' }, { name: 'Nādampālaiyam' }, { name: 'Peyanvilai' }, { name: 'Salem' }, { name: 'Tiruppūr' }, { name: 'Trichinopoly' }, { name: 'Tuticorin' }, { name: 'Vellore' }] },
      { name: 'Telangāna', cities: [{ name: 'Hyderābād' }] },
      { name: 'Uttar Pradesh', cities: [{ name: 'Āgra' }, { name: 'Alīgarh' }, { name: 'Bareilly' }, { name: 'Ghāziābād' }, { name: 'Lucknow' }, { name: 'Meerut' }, { name: 'Mirzāpur' }, { name: 'Morādābād' }, { name: 'Prayagraj' }, { name: 'Vārānasi' }] },
      { name: 'West Bengal', cities: [{ name: 'Āsansol' }, { name: 'Bhāngar' }, { name: 'Bhātpāra' }, { name: 'Durgāpur' }, { name: 'Hāora' }, { name: 'Kāmārhāti' }, { name: 'Kolkāta' }, { name: 'Pānihāti' }, { name: 'Salt Lake City' }, { name: 'Shiliguri' }] }
    ]
  },
  {
    name: 'Indonesia',
    code: 'ID',
    currency: 'IDR',
    currencySymbol: 'Rp',
    states: [
      { name: 'Jakarta', cities: [{ name: 'Cakung' }, { name: 'Jakarta' }] },
      { name: 'Jawa Barat', cities: [{ name: 'Bandung' }, { name: 'Bekasi' }, { name: 'Bogor' }, { name: 'Cibinong' }, { name: 'Cimahi' }, { name: 'Depok' }, { name: 'Sangereng' }, { name: 'Sumedang' }, { name: 'Tangerang' }, { name: 'Tasikmalaya' }] },
      { name: 'Jawa Tengah', cities: [{ name: 'Batang' }, { name: 'Cilacap' }, { name: 'Pekalongan' }, { name: 'Petarukan' }, { name: 'Purwokerto' }, { name: 'Salatiga' }, { name: 'Semarang' }, { name: 'Surakarta' }, { name: 'Tegal' }, { name: 'Ungaran' }] },
      { name: 'Jawa Timur', cities: [{ name: 'Batu' }, { name: 'Gubeng' }, { name: 'Jember' }, { name: 'Kediri' }, { name: 'Madiun' }, { name: 'Malang' }, { name: 'Pasuruan' }, { name: 'Probolinggo' }, { name: 'Singosari' }, { name: 'Surabaya' }] },
      { name: 'Kepulauan Riau', cities: [{ name: 'Bagam' }, { name: 'Batam Centre' }, { name: 'Buton' }, { name: 'Ranai' }, { name: 'Tanjungpinang' }] },
      { name: 'Lampung', cities: [{ name: 'Bandar Lampung' }, { name: 'Kotabumi' }, { name: 'Menggala' }, { name: 'Metro' }] },
      { name: 'Riau', cities: [{ name: 'Bagan Si Api-api' }, { name: 'Bangkinang' }, { name: 'Bengkalis' }, { name: 'Dumai' }, { name: 'Kampung Tengah' }, { name: 'Karak' }, { name: 'Pekanbaru' }, { name: 'Sungai Guntung' }] },
      { name: 'Sulawesi Selatan', cities: [{ name: 'Barru' }, { name: 'Makale' }, { name: 'Makassar' }, { name: 'Masamba' }, { name: 'Palopo' }, { name: 'Parepare' }, { name: 'Pinrang' }, { name: 'Rantepao' }, { name: 'Rappang' }, { name: 'Watampone' }] },
      { name: 'Sumatera Selatan', cities: [{ name: 'Lahat' }, { name: 'Lubuklinggau' }, { name: 'Pageralam' }, { name: 'Palembang' }, { name: 'Prabumulih' }] },
      { name: 'Sumatera Utara', cities: [{ name: 'Binjai' }, { name: 'Gunungsitoli' }, { name: 'Kisaran' }, { name: 'Medan' }, { name: 'Padangsidempuan' }, { name: 'Pematangsiantar' }, { name: 'Rantau Prapat' }, { name: 'Tanjung Morawa' }, { name: 'Tanjungbalai' }, { name: 'Tebingtinggi' }] }
    ]
  },
  {
    name: 'Iran',
    code: 'IR',
    currency: 'IRR',
    currencySymbol: '﷼',
    states: [
      { name: 'Alborz', cities: [{ name: 'Eshtehārd' }, { name: 'Fardīs' }, { name: 'Garmdarreh' }, { name: 'Hashtgerd' }, { name: 'Kamālshahr' }, { name: 'Karaj' }, { name: 'Moḩammad Shahr' }, { name: 'Naz̧arābād' }] },
      { name: 'Āz̄arbāyjān-e Sharqī', cities: [{ name: '‘Ajab Shīr' }, { name: 'Ahar' }, { name: 'Āz̄arshahr' }, { name: 'Bonāb' }, { name: 'Marāgheh' }, { name: 'Marand' }, { name: 'Mīāneh' }, { name: 'Sarāb' }, { name: 'Sardrūd' }, { name: 'Tabrīz' }] },
      { name: 'Eşfahān', cities: [{ name: 'Ārān Bīdgol' }, { name: 'Bahārestān' }, { name: 'Eşfahān' }, { name: 'Fūlād Shahr' }, { name: 'Kāshān' }, { name: 'Khomeynī Shahr' }, { name: 'Khowrāsgān' }, { name: 'Najafābād' }, { name: 'Shāhīn Shahr' }, { name: 'Shahreẕā' }] },
      { name: 'Fārs', cities: [{ name: 'Eqlīd' }, { name: 'Estahbān' }, { name: 'Fasā' }, { name: 'Gerāsh' }, { name: 'Jahrom' }, { name: 'Kāzerūn' }, { name: 'Marvdasht' }, { name: 'Neyrīz' }, { name: 'Shīrāz' }, { name: 'Zarqān' }] },
      { name: 'Kermān', cities: [{ name: 'Bāft' }, { name: 'Bam' }, { name: 'Bardsīr' }, { name: 'Jīroft' }, { name: 'Kahnūj' }, { name: 'Kermān' }, { name: 'Rafsanjān' }, { name: 'Shahr-e Bābak' }, { name: 'Sīrjān' }, { name: 'Zarand' }] },
      { name: 'Kermānshāh', cities: [{ name: 'Eslāmābād-e Gharb' }, { name: 'Gīlān-e Gharb' }, { name: 'Harsīn' }, { name: 'Javānrūd' }, { name: 'Kermānshāh' }, { name: 'Pāveh' }, { name: 'Ravānsar' }, { name: 'Şaḩneh' }, { name: 'Sarpol-e Z̄ahāb' }, { name: 'Sonqor' }] },
      { name: 'Khorāsān-e Raẕavī', cities: [{ name: 'Chenārān' }, { name: 'Kāshmar' }, { name: 'Khodābandeh' }, { name: 'Mashhad' }, { name: 'Neyshābūr' }, { name: 'Qūchān' }, { name: 'Sabzevār' }, { name: 'Tāybād' }, { name: 'Torbat-e Ḩeydarīyeh' }, { name: 'Torbat-e Jām' }] },
      { name: 'Khūzestān', cities: [{ name: 'Ahvāz' }, { name: 'Andīmeshk' }, { name: 'Bandar-e Māhshahr' }, { name: 'Behbahān' }, { name: 'Borvāyeh-ye Al Bū ‘Azīz' }, { name: 'Dezfūl' }, { name: 'Khorramshahr' }, { name: 'Madan' }, { name: 'Masjed Soleymān' }, { name: 'Shūshtar' }] },
      { name: 'Qom', cities: [{ name: 'Ja‘farīyeh' }, { name: 'Qom' }] },
      { name: 'Tehrān', cities: [{ name: 'Eslāmshahr' }, { name: 'Malārd' }, { name: 'Nasīm Shahr' }, { name: 'Pākdasht' }, { name: 'Qarchak' }, { name: 'Robāţ Karīm' }, { name: 'Shahr-e Qods' }, { name: 'Shahrīār' }, { name: 'Tehran' }, { name: 'Varāmīn' }] }
    ]
  },
  {
    name: 'Iraq',
    code: 'IQ',
    currency: 'IQD',
    currencySymbol: 'ع.د',
    states: [
      { name: 'Al Anbār', cities: [{ name: '‘Anah' }, { name: 'Al Fallūjah' }, { name: 'Al Qā’im' }, { name: 'Ar Ramādī' }, { name: 'Ar Ruţbah' }, { name: 'Aş Şaqlāwīyah' }, { name: 'Ḩadīthah' }, { name: 'Hīt' }, { name: 'Madīnat al Ḩabbānīyah' }, { name: 'Nāḩiyat al Karmah' }] },
      { name: 'Al Başrah', cities: [{ name: 'Abī al Khaşīb' }, { name: 'Al Başrah' }, { name: 'Al Fāw' }, { name: 'Al Qurnah' }, { name: 'Az Zubayr' }, { name: 'Umm Qaşr' }] },
      { name: 'An Najaf', cities: [{ name: 'Al Kūfah' }, { name: 'An Najaf' }] },
      { name: 'Arbīl', cities: [{ name: '‘Aynkāwah' }, { name: 'Erbil' }, { name: 'Ḩarīr' }, { name: 'Kūysinjaq' }, { name: 'Makhmūr' }, { name: 'Rawānduz' }, { name: 'Sawrān' }, { name: 'Shaqlāwah' }] },
      { name: 'As Sulaymānīyah', cities: [{ name: 'As Sulaymānīyah' }, { name: 'Ḩalabjah' }, { name: 'Jamjamāl' }, { name: 'Kalār' }, { name: 'Qalādizay' }, { name: 'Rāniyah' }, { name: 'Sayyid Şādiq' }] },
      { name: 'Baghdād', cities: [{ name: 'Abū Ghurayb' }, { name: 'At Tājī' }, { name: 'Baghdad' }, { name: 'Sab‘ al Būr' }, { name: 'Salmān Bāk' }] },
      { name: 'Dhī Qār', cities: [{ name: 'Al Jabāyish' }, { name: 'An Nāşirīyah' }, { name: 'Ash Shaţrah' }, { name: 'Qal‘at Sukkar' }] },
      { name: 'Karbalā’', cities: [{ name: 'Al Hindīyah' }, { name: 'Karbalā’' }] },
      { name: 'Karkūk', cities: [{ name: 'Āltūn Kawbrī' }, { name: 'Kirkuk' }, { name: 'Tāzah Khūrmātū' }] },
      { name: 'Nīnawá', cities: [{ name: '‘Aqrah' }, { name: 'Al Ḩamdānīyah' }, { name: 'Ash Shaykhān' }, { name: 'Ḩammām al ‘Alīl' }, { name: 'Khānah Sūr' }, { name: 'Mosul' }, { name: 'Sinjār' }, { name: 'Sinūnī' }, { name: 'Tall ‘Afar' }, { name: 'Tall Qaşab' }] }
    ]
  },
  {
    name: 'Ireland',
    code: 'IE',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Cork', cities: [{ name: 'Ballincollig' }, { name: 'Carrigaline' }, { name: 'Cobh' }, { name: 'Cork' }, { name: 'Douglas' }, { name: 'Glanmire' }, { name: 'Midleton' }, { name: 'Youghal' }] },
      { name: 'Dublin', cities: [{ name: 'Ashtown' }, { name: 'Ballyfermot' }, { name: 'Dublin' }, { name: 'Finglas' }] },
      { name: 'Dún Laoghaire-Rathdown', cities: [{ name: 'Blackrock' }, { name: 'Dunleary' }, { name: 'Killiney' }, { name: 'Stillorgan' }] },
      { name: 'Fingal', cities: [{ name: 'Donabate' }, { name: 'Lusca' }, { name: 'Mullach Íde' }, { name: 'Na Sceirí' }, { name: 'Palmerston' }, { name: 'Rush' }, { name: 'Swords' }] },
      { name: 'Galway', cities: [{ name: 'Galway' }, { name: 'Tuam' }] },
      { name: 'Limerick', cities: [{ name: 'Limerick' }] },
      { name: 'Louth', cities: [{ name: 'Drogheda' }, { name: 'Dún Dealgan' }] },
      { name: 'Meath', cities: [{ name: 'Baile an Bhiataigh' }, { name: 'Donacarney' }, { name: 'Navan' }, { name: 'Ráth Tó' }, { name: 'Trim' }] },
      { name: 'South Dublin', cities: [{ name: 'Clondalkin' }, { name: 'Lucan' }, { name: 'Rathfarnham' }, { name: 'Tallaght' }, { name: 'Terenure' }] },
      { name: 'Waterford', cities: [{ name: 'Tramore' }, { name: 'Waterford' }] }
    ]
  },
  {
    name: 'Isle of Man',
    code: 'IM',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Douglas' }, { name: 'Onchan' }] }
    ]
  },
  {
    name: 'Israel',
    code: 'IL',
    currency: 'ILS',
    currencySymbol: '₪',
    states: [
      { name: 'Central', cities: [{ name: 'Hod HaSharon' }, { name: 'Kefar Sava' }, { name: 'Lod' }, { name: 'Modi‘in Makkabbim Re‘ut' }, { name: 'Netanya' }, { name: 'Petaẖ Tiqwa' }, { name: 'Ra‘ananna' }, { name: 'Ramla' }, { name: 'Reẖovot' }, { name: 'Rishon LeẔiyyon' }] },
      { name: 'Haifa', cities: [{ name: 'Hadera' }, { name: 'Haifa' }, { name: 'Nesher' }, { name: 'Pardés H̱anna Karkur' }, { name: 'Qiryat Ata' }, { name: 'Qiryat Bialik' }, { name: 'Qiryat Moẕqin' }, { name: 'Qiryat Yam' }, { name: 'Tirat Karmel' }, { name: 'Umm el Faḥm' }] },
      { name: 'Jerusalem', cities: [{ name: 'Bet Shemesh' }, { name: 'Jerusalem' }] },
      { name: 'Northern', cities: [{ name: '‘Akko' }, { name: 'Afula' }, { name: 'Karmiel' }, { name: 'Nahariyya' }, { name: 'Nazareth' }, { name: 'Sakhnīn' }, { name: 'Shefar‘am' }, { name: 'Tamra' }, { name: 'Tiberias' }, { name: 'Ẕefat' }] },
      { name: 'Southern', cities: [{ name: 'Arad' }, { name: 'Ashdod' }, { name: 'Ashqelon' }, { name: 'Beersheba' }, { name: 'Dimona' }, { name: 'Eilat' }, { name: 'Netivot' }, { name: 'Ofaqim' }, { name: 'Qiryat Gat' }, { name: 'Rahat' }] },
      { name: 'Tel Aviv', cities: [{ name: 'Bat Yam' }, { name: 'Bené Beraq' }, { name: 'Givatayim' }, { name: 'Herẕliyya' }, { name: 'Holon' }, { name: 'Or Yehuda' }, { name: 'Qiryat Ono' }, { name: 'Ramat Gan' }, { name: 'Ramat HaSharon' }, { name: 'Tel Aviv-Yafo' }] }
    ]
  },
  {
    name: 'Italy',
    code: 'IT',
    currency: 'EUR',
    currencySymbol: '€',
    states: [
      { name: 'Campania', cities: [{ name: 'Afragola' }, { name: 'Benevento' }, { name: 'Caserta' }, { name: 'Casoria' }, { name: 'Castellammare di Stabia' }, { name: 'Giugliano in Campania' }, { name: 'Naples' }, { name: 'Pozzuoli' }, { name: 'Salerno' }, { name: 'Torre del Greco' }] },
      { name: 'Emilia-Romagna', cities: [{ name: 'Bologna' }, { name: 'Ferrara' }, { name: 'Forlì' }, { name: 'Modena' }, { name: 'Parma' }, { name: 'Piacenza' }, { name: 'Ravenna' }, { name: 'Reggio Emilia' }, { name: 'Rimini' }, { name: 'Roncaglia' }] },
      { name: 'Lazio', cities: [{ name: 'Acilia' }, { name: 'Anzio' }, { name: 'Aprilia' }, { name: 'Fiumicino' }, { name: 'Latina' }, { name: 'Pomezia' }, { name: 'Rome' }, { name: 'Tivoli' }, { name: 'Velletri' }, { name: 'Viterbo' }] },
      { name: 'Liguria', cities: [{ name: 'Albenga' }, { name: 'Chiavari' }, { name: 'Genoa' }, { name: 'Imperia' }, { name: 'La Spezia' }, { name: 'Rapallo' }, { name: 'San Remo' }, { name: 'Sarzana' }, { name: 'Savona' }, { name: 'Ventimiglia' }] },
      { name: 'Lombardy', cities: [{ name: 'Bergamo' }, { name: 'Brescia' }, { name: 'Busto Arsizio' }, { name: 'Cinisello Balsamo' }, { name: 'Como' }, { name: 'Cremona' }, { name: 'Milan' }, { name: 'Monza' }, { name: 'Sesto San Giovanni' }, { name: 'Varese' }] },
      { name: 'Piedmont', cities: [{ name: 'Alessandria' }, { name: 'Asti' }, { name: 'Collegno' }, { name: 'Cuneo' }, { name: 'Moncalieri' }, { name: 'Nichelino' }, { name: 'Novara' }, { name: 'Rivoli' }, { name: 'Settimo Torinese' }, { name: 'Turin' }] },
      { name: 'Puglia', cities: [{ name: 'Altamura' }, { name: 'Andria' }, { name: 'Bari' }, { name: 'Barletta' }, { name: 'Brindisi' }, { name: 'Calimera' }, { name: 'Foggia' }, { name: 'Lecce' }, { name: 'Molfetta' }, { name: 'Taranto' }] },
      { name: 'Sicilia', cities: [{ name: 'Caltanissetta' }, { name: 'Catania' }, { name: 'Gela' }, { name: 'Marsala' }, { name: 'Messina' }, { name: 'Palermo' }, { name: 'Ragusa' }, { name: 'Siracusa' }, { name: 'Trapani' }, { name: 'Vittoria' }] },
      { name: 'Tuscany', cities: [{ name: 'Arezzo' }, { name: 'Florence' }, { name: 'Grosseto' }, { name: 'Livorno' }, { name: 'Lucca' }, { name: 'Marina di Carrara' }, { name: 'Massa' }, { name: 'Pisa' }, { name: 'Pistoia' }, { name: 'Prato' }] },
      { name: 'Veneto', cities: [{ name: 'Bassano del Grappa' }, { name: 'Chioggia' }, { name: 'Mestre' }, { name: 'Padova' }, { name: 'Rovigo' }, { name: 'San Donà di Piave' }, { name: 'Treviso' }, { name: 'Venice' }, { name: 'Verona' }, { name: 'Vicenza' }] }
    ]
  },
  {
    name: 'Jamaica',
    code: 'JM',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Clarendon', cities: [{ name: 'May Pen' }] },
      { name: 'Kingston', cities: [{ name: 'Kingston' }] },
      { name: 'Manchester', cities: [{ name: 'Mandeville' }] },
      { name: 'Portland', cities: [{ name: 'Port Antonio' }] },
      { name: 'Saint Andrew', cities: [{ name: 'Half Way Tree' }] },
      { name: 'Saint Ann', cities: [{ name: 'Ocho Rios' }, { name: 'Saint Ann’s Bay' }] },
      { name: 'Saint Catherine', cities: [{ name: 'Bog Walk' }, { name: 'Ewarton' }, { name: 'Linstead' }, { name: 'Old Harbour' }, { name: 'Portmore' }, { name: 'Spanish Town' }] },
      { name: 'Saint James', cities: [{ name: 'Montego Bay' }] },
      { name: 'Saint Thomas', cities: [{ name: 'Morant Bay' }, { name: 'Port Morant' }] },
      { name: 'Westmoreland', cities: [{ name: 'Savanna-la-Mar' }] }
    ]
  },
  {
    name: 'Japan',
    code: 'JP',
    currency: 'JPY',
    currencySymbol: '¥',
    states: [
      { name: 'Aichi', cities: [{ name: 'Anjōmachi' }, { name: 'Ichinomiya' }, { name: 'Kariya' }, { name: 'Kasugai' }, { name: 'Nagoya' }, { name: 'Nishio' }, { name: 'Okazaki' }, { name: 'Toyohashi' }, { name: 'Toyokawa' }, { name: 'Toyota' }] },
      { name: 'Fukuoka', cities: [{ name: 'Chikushino' }, { name: 'Fukuoka' }, { name: 'Iizuka' }, { name: 'Itoshima' }, { name: 'Kasuga' }, { name: 'Kitakyūshū' }, { name: 'Kurume' }, { name: 'Ōmuta' }, { name: 'Ōnojō' }, { name: 'Shinozaki' }] },
      { name: 'Hiroshima', cities: [{ name: 'Fuchū' }, { name: 'Fuchūchō' }, { name: 'Fukuyama' }, { name: 'Hatsukaichi' }, { name: 'Higashi-Hiroshima' }, { name: 'Hiroshima' }, { name: 'Kure' }, { name: 'Mihara' }, { name: 'Miyoshi' }, { name: 'Onomichi' }] },
      { name: 'Hokkaidō', cities: [{ name: 'Asahikawa' }, { name: 'Chitose' }, { name: 'Ebetsu' }, { name: 'Hakodate' }, { name: 'Kōenchō' }, { name: 'Kushiro' }, { name: 'Obihiro' }, { name: 'Otaru' }, { name: 'Sapporo' }, { name: 'Tomakomai' }] },
      { name: 'Hyōgo', cities: [{ name: 'Amagasaki' }, { name: 'Daiwanishi' }, { name: 'Himeji' }, { name: 'Itami' }, { name: 'Kakogawachō-honmachi' }, { name: 'Kōbe' }, { name: 'Nishinomiya-hama' }, { name: 'Ōakashichō' }, { name: 'Sandachō' }, { name: 'Takarazuka' }] },
      { name: 'Kanagawa', cities: [{ name: 'Atsugichō' }, { name: 'Chigasaki' }, { name: 'Fujisawa' }, { name: 'Hiratsuka' }, { name: 'Kawasaki' }, { name: 'Odawara' }, { name: 'Sagamihara' }, { name: 'Yato' }, { name: 'Yokohama' }, { name: 'Yokosuka' }] },
      { name: 'Kyōto', cities: [{ name: 'Fukuchiyama' }, { name: 'Jōyō' }, { name: 'Kameoka' }, { name: 'Kizugawa' }, { name: 'Kyōtanabe' }, { name: 'Kyōto' }, { name: 'Maizuru' }, { name: 'Nagaoka' }, { name: 'Uji' }, { name: 'Yawata-shimizui' }] },
      { name: 'Ōsaka', cities: [{ name: 'Higashi-ōsaka' }, { name: 'Hirakata' }, { name: 'Ibaraki' }, { name: 'Kawachichō' }, { name: 'Minamisuita' }, { name: 'Neya' }, { name: 'Ōsaka' }, { name: 'Sakai' }, { name: 'Takatsuki' }, { name: 'Toyonaka' }] },
      { name: 'Saitama', cities: [{ name: 'Ageoshimo' }, { name: 'Kasukabe' }, { name: 'Kawagoe' }, { name: 'Kawaguchi' }, { name: 'Koshigaya' }, { name: 'Kumagaya' }, { name: 'Niiza' }, { name: 'Saitama' }, { name: 'Sōka' }, { name: 'Tokorozawa' }] },
      { name: 'Tōkyō', cities: [{ name: 'Adachi' }, { name: 'Hachiōji' }, { name: 'Itabashi' }, { name: 'Katsushika-ku' }, { name: 'Kōtō-ku' }, { name: 'Nerima' }, { name: 'Ōta-ku' }, { name: 'Setagaya' }, { name: 'Suginami-ku' }, { name: 'Tokyo' }] }
    ]
  },
  {
    name: 'Jersey',
    code: 'JE',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Saint Helier' }] }
    ]
  },
  {
    name: 'Jordan',
    code: 'JO',
    currency: 'JOD',
    currencySymbol: 'د.ا',
    states: [
      { name: '‘Ajlūn', cities: [{ name: '‘Ajlūn' }, { name: 'Ḩalāwah' }] },
      { name: 'Al ‘Aqabah', cities: [{ name: 'Al ‘Aqabah' }] },
      { name: 'Al ‘Āşimah', cities: [{ name: 'Al Jīzah' }, { name: 'Al Juwayyidah' }, { name: 'Amman' }, { name: 'Saḩāb' }] },
      { name: 'Al Balqā’', cities: [{ name: 'Al Fuḩayş' }, { name: 'As Salţ' }, { name: 'Māḩiş' }] },
      { name: 'Al Mafraq', cities: [{ name: 'Al Mafraq' }] },
      { name: 'Az Zarqā’', cities: [{ name: 'Ar Ruşayfah' }, { name: 'Az Zarqā’' }, { name: 'Muthallath al Azraq' }] },
      { name: 'Irbid', cities: [{ name: 'Al Ḩişn' }, { name: 'Al Mazār ash Shamālī' }, { name: 'Ar Ramthā' }, { name: 'Ash Shajarah' }, { name: 'Ash Shūnah ash Shamālīyah' }, { name: 'Aţ Ţurrah' }, { name: 'Dayr Abū Sa‘īd' }, { name: 'Irbid' }, { name: 'Kafr al Mā’' }, { name: 'Şammā' }] },
      { name: 'Jarash', cities: [{ name: 'Jarash' }, { name: 'Sākib' }] },
      { name: 'Ma‘ān', cities: [{ name: 'Ma‘ān' }] },
      { name: 'Mādabā', cities: [{ name: 'Mādabā' }] }
    ]
  },
  {
    name: 'Kazakhstan',
    code: 'KZ',
    currency: 'KZT',
    currencySymbol: '₸',
    states: [
      { name: 'Abay', cities: [{ name: 'Ayagöz' }, { name: 'Semey' }, { name: 'Shar' }, { name: 'Uryzhar' }] },
      { name: 'Almaty', cities: [{ name: 'Almaty' }, { name: 'Boralday' }, { name: 'Esik' }, { name: 'Kapchagay' }, { name: 'Otegen Batyr' }, { name: 'Qapshaghay' }, { name: 'Qaskeleng' }, { name: 'Shamalgan' }, { name: 'Talghar' }, { name: 'Uzynaghash' }] },
      { name: 'Aqtöbe', cities: [{ name: 'Alga' }, { name: 'Aqtöbe' }, { name: 'Bayghanīn' }, { name: 'Emba' }, { name: 'Khromtaū' }, { name: 'Oktyabr’sk' }, { name: 'Shalqar' }] },
      { name: 'East Kazakhstan', cities: [{ name: 'Öskemen' }, { name: 'Ridder' }, { name: 'Serebryansk' }, { name: 'Shemonaīkha' }, { name: 'Zaysan' }, { name: 'Zyryanovsk' }] },
      { name: 'Nur-Sultan', cities: [{ name: 'Astana' }] },
      { name: 'Pavlodar', cities: [{ name: 'Aqsū' }, { name: 'Ekibastuz' }, { name: 'Ertis' }, { name: 'Lenīnskīy' }, { name: 'Pavlodar' }, { name: 'Qashyr' }, { name: 'Sharbaqty' }] },
      { name: 'Qaraghandy', cities: [{ name: 'Abay' }, { name: 'Aqadyr' }, { name: 'Balqash' }, { name: 'Osakarovka' }, { name: 'Qaraghandy' }, { name: 'Qarqaraly' }, { name: 'Saryshaghan' }, { name: 'Shakhtīnsk' }, { name: 'Soran' }, { name: 'Temirtaū' }] },
      { name: 'Shymkent', cities: [{ name: 'Sayram' }, { name: 'Shymkent' }] },
      { name: 'Türkistan', cities: [{ name: 'Arys' }, { name: 'Derbisek' }, { name: 'Eski Īkan' }, { name: 'Kentaū' }, { name: 'Lengir' }, { name: 'Qarabulaq' }, { name: 'Qazyqurt' }, { name: 'Saryaghash' }, { name: 'Türkistan' }, { name: 'Zhetisay' }] },
      { name: 'Zhambyl', cities: [{ name: 'Masangshy' }, { name: 'Oytal' }, { name: 'Qarataū' }, { name: 'Qorday' }, { name: 'Sarykemer' }, { name: 'Shū' }, { name: 'Sortöbe' }, { name: 'Taraz' }, { name: 'Töle Bī' }, { name: 'Zhangatas' }] }
    ]
  },
  {
    name: 'Kenya',
    code: 'KE',
    currency: 'KES',
    currencySymbol: 'KSh',
    states: [
      { name: 'Kajiado', cities: [{ name: 'Kajiado' }, { name: 'Kitenkela' }, { name: 'Ngong' }, { name: 'Ongata Rongai' }] },
      { name: 'Kiambu', cities: [{ name: 'Kiambu' }, { name: 'Kikuyu' }, { name: 'Thika' }] },
      { name: 'Kisumu', cities: [{ name: 'Kisumu' }] },
      { name: 'Kwale', cities: [{ name: 'Kwale' }, { name: 'Lunga-Lunga' }, { name: 'Msambweni' }, { name: 'Ukunda' }] },
      { name: 'Mombasa', cities: [{ name: 'Mombasa' }] },
      { name: 'Nairobi City', cities: [{ name: 'Nairobi' }] },
      { name: 'Nakuru', cities: [{ name: 'Molo' }, { name: 'Naivasha' }, { name: 'Nakuru' }] },
      { name: 'Turkana', cities: [{ name: 'Kakuma' }, { name: 'Lodwar' }] },
      { name: 'Uasin Gishu', cities: [{ name: 'Eldoret' }] },
      { name: 'Wajir', cities: [{ name: 'Habaswein' }, { name: 'Wajir' }] }
    ]
  },
  {
    name: 'Kiribati',
    code: 'KI',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Betio' }, { name: 'Tarawa' }] }
    ]
  },
  {
    name: 'Korea, North',
    code: 'KP',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Chagang', cities: [{ name: 'Ch’osan-ŭp' }, { name: 'Hŭich’ŏn' }, { name: 'Kanggye' }, { name: 'Manpo' }] },
      { name: 'Hambuk', cities: [{ name: 'Ch’ŏngjin' }, { name: 'Hoeryŏng' }, { name: 'Namsan' }] },
      { name: 'Hamnam', cities: [{ name: 'Hamhŭng' }, { name: 'Sinpo' }, { name: 'Tanch’ŏn' }] },
      { name: 'Hwangbuk', cities: [{ name: 'Sariwŏn' }, { name: 'Songnim' }] },
      { name: 'Hwangnam', cities: [{ name: 'Changyŏn' }, { name: 'Haeju' }, { name: 'Ongjang' }] },
      { name: 'Kangwŏn', cities: [{ name: 'Munch’ŏn' }, { name: 'Munha-dong' }, { name: 'Wŏnsan' }] },
      { name: 'Namp’o', cities: [{ name: 'Nampo' }] },
      { name: 'P’yŏngbuk', cities: [{ name: 'Chŏngju' }, { name: 'Kusŏng' }, { name: 'Sinŭiju' }, { name: 'Taedong' }] },
      { name: 'P’yŏngnam', cities: [{ name: 'Anju' }, { name: 'Kaech’ŏn' }, { name: 'P’yŏngsŏng-si' }, { name: 'Sil-li' }, { name: 'Sunch’ŏn' }] },
      { name: 'P’yŏngyang', cities: [{ name: 'Pyongyang' }] }
    ]
  },
  {
    name: 'Korea, South',
    code: 'KR',
    currency: 'KRW',
    currencySymbol: '₩',
    states: [
      { name: 'Busan', cities: [{ name: 'Busan' }] },
      { name: 'Chungbuk', cities: [{ name: 'Chech’ŏn' }, { name: 'Cheongju' }, { name: 'Chungju' }, { name: 'Eumseong' }, { name: 'Jeomchon' }, { name: 'Seonsan' }] },
      { name: 'Daegu', cities: [{ name: 'Daegu' }] },
      { name: 'Daejeon', cities: [{ name: 'Daejeon' }] },
      { name: 'Gwangju', cities: [{ name: 'Gwangju' }] },
      { name: 'Gyeonggi', cities: [{ name: 'Ansan' }, { name: 'Bucheon' }, { name: 'Goyang' }, { name: 'Hwasu-dong' }, { name: 'Pyeongtaek' }, { name: 'Sihŭng' }, { name: 'Sŏngnam' }, { name: 'Suwon' }, { name: 'Tongjin' }, { name: 'Yanggok' }] },
      { name: 'Gyeongnam', cities: [{ name: 'Ch’ungmu' }, { name: 'Changwon' }, { name: 'Chinju' }, { name: 'Kimhae' }, { name: 'Masan' }, { name: 'Miryang' }, { name: 'Sa-ch’on' }, { name: 'Yangsan' }] },
      { name: 'Incheon', cities: [{ name: 'Incheon' }] },
      { name: 'Seoul', cities: [{ name: 'Seoul' }] },
      { name: 'Ulsan', cities: [{ name: 'Daean' }, { name: 'Eonyang' }, { name: 'Seosaeng' }, { name: 'Ulsan' }] }
    ]
  },
  {
    name: 'Kosovo',
    code: 'XK',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Ferizaj', cities: [{ name: 'Ferizaj' }] },
      { name: 'Gjakovë', cities: [{ name: 'Gjakovë' }] },
      { name: 'Gjilan', cities: [{ name: 'Gjilan' }] },
      { name: 'Lipjan', cities: [{ name: 'Lipjan' }] },
      { name: 'Pejë', cities: [{ name: 'Pejë' }, { name: 'Vitomiricë' }] },
      { name: 'Podujevë', cities: [{ name: 'Podujevë' }] },
      { name: 'Prishtinë', cities: [{ name: 'Matiçan' }, { name: 'Pristina' }] },
      { name: 'Prizren', cities: [{ name: 'Dushanovë' }, { name: 'Prizren' }, { name: 'Zhur' }] },
      { name: 'Unknown', cities: [{ name: 'Mitrovicë' }] },
      { name: 'Vushtrri', cities: [{ name: 'Vushtrri' }] }
    ]
  },
  {
    name: 'Kuwait',
    code: 'KW',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Al ‘Āşimah', cities: [{ name: 'Kuwait City' }] },
      { name: 'Al Aḩmadī', cities: [{ name: 'Abū Ḩulayfah' }, { name: 'Al Aḩmadī' }, { name: 'Ar Riqqah' }] },
      { name: 'Al Jahrā’', cities: [{ name: 'Al Jahrā’' }] }
    ]
  },
  {
    name: 'Kyrgyzstan',
    code: 'KG',
    currency: 'KGS',
    currencySymbol: 'с',
    states: [
      { name: 'Batken', cities: [{ name: 'Aydarken' }, { name: 'Batken' }, { name: 'Buzhum' }, { name: 'Frunze' }, { name: 'Iradan' }, { name: 'Isfana' }, { name: 'Kara-Kyshtak' }, { name: 'Kyzyl-Kyya' }, { name: 'Sülüktü' }, { name: 'Uch-Korgon' }] },
      { name: 'Bishkek', cities: [{ name: 'Bishkek' }, { name: 'Chong-Aryk' }] },
      { name: 'Chüy', cities: [{ name: 'Belovodskoe' }, { name: 'Ivanovka' }, { name: 'Kant' }, { name: 'Kara-Balta' }, { name: 'Lebedinovka' }, { name: 'Novopavlovka' }, { name: 'Novopokrovka' }, { name: 'Sokuluk' }, { name: 'Tokmok' }, { name: 'Voyenno-Antonovka' }] },
      { name: 'Jalal-Abad', cities: [{ name: 'Ala-Buka' }, { name: 'Bazar-Korgon' }, { name: 'Jalal-Abad' }, { name: 'Kara-Köl' }, { name: 'Kochkor-Ata' }, { name: 'Massy' }, { name: 'Mayluu-Suu' }, { name: 'Suzak' }, { name: 'Tash-Kömür' }, { name: 'Toktogul' }] },
      { name: 'Naryn', cities: [{ name: 'At-Bashy' }, { name: 'Baetov' }, { name: 'Kochkor' }, { name: 'Naryn' }] },
      { name: 'Osh', cities: [{ name: 'Aravan' }, { name: 'Eski-Nookat' }, { name: 'Jangy-Nookat' }, { name: 'Kara-Suu' }, { name: 'Kashkar-Kyshtak' }, { name: 'Kurshab' }, { name: 'Myrza-Ake' }, { name: 'Osh' }, { name: 'Özgön' }, { name: 'Shark' }] },
      { name: 'Talas', cities: [{ name: 'Kyzyl-Adyr' }, { name: 'Pokrovka' }, { name: 'Talas' }] },
      { name: 'Ysyk-Köl', cities: [{ name: 'Anan’evo' }, { name: 'Balykchy' }, { name: 'Barskoon' }, { name: 'Bökönbaev' }, { name: 'Cholpon-Ata' }, { name: 'Karakol' }, { name: 'Kyzyl-Suu' }, { name: 'Saruu' }, { name: 'Teploklyuchenka' }, { name: 'Tüp' }] }
    ]
  },
  {
    name: 'Laos',
    code: 'LA',
    currency: 'LAK',
    currencySymbol: '₭',
    states: [
      { name: 'Champasak', cities: [{ name: 'Champasak' }, { name: 'Pakxé' }] },
      { name: 'Houaphan', cities: [{ name: 'Xam Nua' }] },
      { name: 'Khammouan', cities: [{ name: 'Thakhèk' }] },
      { name: 'Louangnamtha', cities: [{ name: 'Louang Namtha' }, { name: 'Muang Sing' }] },
      { name: 'Oudômxai', cities: [{ name: 'Xai' }] },
      { name: 'Salavan', cities: [{ name: 'Salavan' }] },
      { name: 'Savannakhét', cities: [{ name: 'Savannakhet' }] },
      { name: 'Viangchan', cities: [{ name: 'Phôn-Hông' }, { name: 'Vangviang' }, { name: 'Vientiane' }] },
      { name: 'Xaignabouli', cities: [{ name: 'Xaignabouli' }] },
      { name: 'Xiangkhouang', cities: [{ name: 'Phônsavan' }, { name: 'Xiangkhoang' }] }
    ]
  },
  {
    name: 'Latvia',
    code: 'LV',
    currency: 'EUR',
    currencySymbol: '€',
    states: [
      { name: 'Augšdaugava', cities: [{ name: 'Daugavpils' }] },
      { name: 'Jēkabpils', cities: [{ name: 'Jēkabpils' }] },
      { name: 'Jelgava', cities: [{ name: 'Jelgava' }] },
      { name: 'Jūrmala', cities: [{ name: 'Jūrmala' }] },
      { name: 'Liepāja', cities: [{ name: 'Liepāja' }] },
      { name: 'Ogre', cities: [{ name: 'Ogre' }] },
      { name: 'Rēzekne', cities: [{ name: 'Rēzekne' }] },
      { name: 'Rīga', cities: [{ name: 'Riga' }] },
      { name: 'Valmiera', cities: [{ name: 'Valmiera' }] },
      { name: 'Ventspils', cities: [{ name: 'Ventspils' }] }
    ]
  },
  {
    name: 'Lebanon',
    code: 'LB',
    currency: 'LBP',
    currencySymbol: 'ل.ل',
    states: [
      { name: 'Aakkâr', cities: [{ name: 'Halba' }, { name: 'Qoubaiyat' }] },
      { name: 'Baalbek-Hermel', cities: [{ name: 'Aarsâl' }, { name: 'Baalbek' }, { name: 'Chmistâr' }, { name: 'El Hermel' }, { name: 'El Qâa' }] },
      { name: 'Béqaa', cities: [{ name: 'Barr Eliâs' }, { name: 'Joubb Jannîne' }, { name: 'Majdel Aanjar' }, { name: 'Qabb Eliâs' }, { name: 'Zahlé' }] },
      { name: 'Beyrouth', cities: [{ name: 'Beirut' }] },
      { name: 'Liban-Nord', cities: [{ name: 'Amioûn' }, { name: 'Batroûn' }, { name: 'Bcharré' }, { name: 'Ehden' }, { name: 'El Minié' }, { name: 'Hasroûn' }, { name: 'Kfar Aabîda' }, { name: 'Tripoli' }, { name: 'Zghartā' }] },
      { name: 'Liban-Sud', cities: [{ name: 'Borj el Qoblé' }, { name: 'El Bâzoûrîyé' }, { name: 'El Ghâzîyé' }, { name: 'Qâna' }, { name: 'Sarafand' }, { name: 'Sidon' }, { name: 'Srîfa' }, { name: 'Tyre' }] },
      { name: 'Mont-Liban', cities: [{ name: 'Aaley' }, { name: 'Baabda' }, { name: 'Baaqlîne' }, { name: 'Borj Hammoud' }, { name: 'Dbaïyé' }, { name: 'El Fanar' }, { name: 'Jbaïl' }, { name: 'Joünié' }, { name: 'Kfar Kiddé' }, { name: 'Qornet Chahouâne' }] },
      { name: 'Nabatîyé', cities: [{ name: 'Bent Jbaïl' }, { name: 'Chaqra' }, { name: 'El Khiyam' }, { name: 'Nabatîyé' }] }
    ]
  },
  {
    name: 'Lesotho',
    code: 'LS',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Berea', cities: [{ name: 'Kueneng' }, { name: 'Mapoteng' }, { name: 'Senekane' }, { name: 'Teyateyaneng' }] },
      { name: 'Butha-Buthe', cities: [{ name: 'Butha-Buthe' }] },
      { name: 'Leribe', cities: [{ name: 'Leribe' }, { name: 'Maputsoe' }, { name: 'Peka' }, { name: 'Pitseng' }] },
      { name: 'Mafeteng', cities: [{ name: 'Mafeteng' }, { name: 'Rasebetsane' }] },
      { name: 'Maseru', cities: [{ name: 'Maseru' }, { name: 'Mazenod' }, { name: 'Nako' }, { name: 'Nyakosoba' }, { name: 'Qiloane' }, { name: 'Ramabitsa' }, { name: 'Ratau' }] },
      { name: 'Mohale’s Hoek', cities: [{ name: 'Maghalleen' }, { name: 'Mohale’s Hoek' }, { name: 'Siloe' }] },
      { name: 'Mokhotlong', cities: [{ name: 'Mokhotlong' }] },
      { name: 'Qacha’s Nek', cities: [{ name: 'Qacha’s Nek' }] },
      { name: 'Quthing', cities: [{ name: 'Quthing' }, { name: 'Seforong' }] },
      { name: 'Thaba-Tseka', cities: [{ name: 'Mohlanapeng' }, { name: 'Thaba-Tseka' }] }
    ]
  },
  {
    name: 'Liberia',
    code: 'LR',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Bong', cities: [{ name: 'Gbarnga' }] },
      { name: 'Grand Bassa', cities: [{ name: 'Buchanan' }, { name: 'Upper Buchanan' }] },
      { name: 'Grand Gedeh', cities: [{ name: 'Zwedru' }] },
      { name: 'Lofa', cities: [{ name: 'Foya Tangia' }, { name: 'Voinjama' }] },
      { name: 'Margibi', cities: [{ name: 'Harbel' }, { name: 'Kakata' }] },
      { name: 'Maryland', cities: [{ name: 'Harper' }] },
      { name: 'Montserrado', cities: [{ name: 'Bensonville' }, { name: 'Monrovia' }, { name: 'New Kru Town' }] },
      { name: 'Nimba', cities: [{ name: 'Ganta' }, { name: 'Saclepea' }, { name: 'Sanniquellie' }] },
      { name: 'River Gee', cities: [{ name: 'Fish Town' }, { name: 'Yeebo Town' }] },
      { name: 'Sinoe', cities: [{ name: 'Greenville' }] }
    ]
  },
  {
    name: 'Libya',
    code: 'LY',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Al Buţnān', cities: [{ name: 'Al Bardīyah' }, { name: 'Al Jaghbūb' }, { name: 'Tobruk' }] },
      { name: 'Al Jabal al Akhḑar', cities: [{ name: 'Al Abraq' }, { name: 'Al Bayḑā’' }, { name: 'Shaḩḩāt' }] },
      { name: 'Al Jabal al Gharbī', cities: [{ name: 'Az Zintān' }, { name: 'Gharyān' }, { name: 'Kiklah' }, { name: 'Mizdah' }, { name: 'Yafran' }] },
      { name: 'Al Marj', cities: [{ name: 'Al Marj' }] },
      { name: 'Al Marqab', cities: [{ name: 'Al Khums' }, { name: 'Masallātah' }] },
      { name: 'Al Wāḩāt', cities: [{ name: 'Ajdābiyā' }, { name: 'Al ‘Uqaylah' }, { name: 'Awjilah' }, { name: 'Marādah' }] },
      { name: 'Az Zāwiyah', cities: [{ name: 'Az Zāwīyah' }] },
      { name: 'Banghāzī', cities: [{ name: 'Az Zuwaytīnah' }, { name: 'Benghazi' }, { name: 'Qamīnis' }, { name: 'Qaryat Sulūq' }, { name: 'Tūkrah' }] },
      { name: 'Mişrātah', cities: [{ name: 'Banī Walīd' }, { name: 'Mişrātah' }] },
      { name: 'Ţarābulus', cities: [{ name: 'Qaşr al Qarabūllī' }, { name: 'Tājūrā’' }, { name: 'Tarhūnah' }, { name: 'Tripoli' }] }
    ]
  },
  {
    name: 'Liechtenstein',
    code: 'LI',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Balzers', cities: [{ name: 'Balzers' }] },
      { name: 'Eschen', cities: [{ name: 'Eschen' }] },
      { name: 'Gamprin', cities: [{ name: 'Gamprin' }] },
      { name: 'Mauren', cities: [{ name: 'Mauren' }] },
      { name: 'Ruggell', cities: [{ name: 'Ruggell' }] },
      { name: 'Schaan', cities: [{ name: 'Schaan' }] },
      { name: 'Schellenberg', cities: [{ name: 'Schellenberg' }] },
      { name: 'Triesen', cities: [{ name: 'Triesen' }] },
      { name: 'Triesenberg', cities: [{ name: 'Triesenberg' }] },
      { name: 'Vaduz', cities: [{ name: 'Vaduz' }] }
    ]
  },
  {
    name: 'Lithuania',
    code: 'LT',
    currency: 'EUR',
    currencySymbol: '€',
    states: [
      { name: 'Alytaus Miestas', cities: [{ name: 'Alytus' }] },
      { name: 'Jonava', cities: [{ name: 'Jonava' }] },
      { name: 'Kauno Miestas', cities: [{ name: 'Kaunas' }] },
      { name: 'Klaipėdos Miestas', cities: [{ name: 'Klaipėda' }] },
      { name: 'Marijampolė', cities: [{ name: 'Marijampolė' }] },
      { name: 'Mažeikiai', cities: [{ name: 'Mažeikiai' }] },
      { name: 'Panevėžio Miestas', cities: [{ name: 'Panevėžys' }] },
      { name: 'Šiaulių Miestas', cities: [{ name: 'Šiauliai' }] },
      { name: 'Utena', cities: [{ name: 'Utena' }] },
      { name: 'Vilniaus Miestas', cities: [{ name: 'Aukštieji Paneriai' }, { name: 'Grigiškės' }, { name: 'Vilnius' }] }
    ]
  },
  {
    name: 'Luxembourg',
    code: 'LU',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Capellen', cities: [{ name: 'Capellen' }] },
      { name: 'Clervaux', cities: [{ name: 'Clervaux' }] },
      { name: 'Diekirch', cities: [{ name: 'Diekirch' }] },
      { name: 'Echternach', cities: [{ name: 'Echternach' }] },
      { name: 'Esch-sur-Alzette', cities: [{ name: 'Differdange' }, { name: 'Dudelange' }, { name: 'Esch-sur-Alzette' }] },
      { name: 'Grevenmacher', cities: [{ name: 'Grevenmacher' }] },
      { name: 'Luxembourg', cities: [{ name: 'Luxembourg' }] },
      { name: 'Remich', cities: [{ name: 'Remich' }] },
      { name: 'Vianden', cities: [{ name: 'Vianden' }] },
      { name: 'Wiltz', cities: [{ name: 'Wiltz' }] }
    ]
  },
  {
    name: 'Macau',
    code: 'MO',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Macau' }] }
    ]
  },
  {
    name: 'Madagascar',
    code: 'MG',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Antananarivo', cities: [{ name: 'Ambohimangakely' }, { name: 'Analavory' }, { name: 'Andoharanofotsy' }, { name: 'Ankadinondry-Sakay' }, { name: 'Antananarivo' }, { name: 'Antanifotsy' }, { name: 'Antehiroka' }, { name: 'Antsinanantsena' }, { name: 'Antsirabe' }, { name: 'Imerintsiatosika' }] },
      { name: 'Antsiranana', cities: [{ name: 'Ambanja' }, { name: 'Ambilobe' }, { name: 'Ambodiangezoka' }, { name: 'Ampahana' }, { name: 'Andapa' }, { name: 'Antalaha' }, { name: 'Antsiranana' }, { name: 'Antsohimbondrona' }, { name: 'Beramanja' }, { name: 'Sambava' }] },
      { name: 'Fianarantsoa', cities: [{ name: 'Ambatofinandrahana' }, { name: 'Ambositra' }, { name: 'Ampitatafika' }, { name: 'Farafangana' }, { name: 'Fianarantsoa' }, { name: 'Ihosy' }, { name: 'Ikalamavony' }, { name: 'Ikongo' }, { name: 'Manakara' }, { name: 'Vangaindrano' }] },
      { name: 'Mahajanga', cities: [{ name: 'Andriba' }, { name: 'Antsalova' }, { name: 'Antsohihy' }, { name: 'Bekoratsaka' }, { name: 'Betsiboka' }, { name: 'Madirovalo' }, { name: 'Mahajanga' }, { name: 'Maromandia' }, { name: 'Marovoay' }, { name: 'Matsoandakana' }] },
      { name: 'Toamasina', cities: [{ name: 'Ambatomainty' }, { name: 'Ambatondrazaka' }, { name: 'Andilamena' }, { name: 'Fenoarivo Atsinanana' }, { name: 'Mahanoro' }, { name: 'Maroantsetra' }, { name: 'Moramanga' }, { name: 'Morarano Chrome' }, { name: 'Saranambana' }, { name: 'Toamasina' }] },
      { name: 'Toliara', cities: [{ name: 'Ambahikily' }, { name: 'Amboasary' }, { name: 'Ambovombe' }, { name: 'Ampanihy' }, { name: 'Ankazoabokely' }, { name: 'Belo Tsiribihina' }, { name: 'Ejeda' }, { name: 'Morondava' }, { name: 'Tôlan̈aro' }, { name: 'Toliara' }] }
    ]
  },
  {
    name: 'Malawi',
    code: 'MW',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Balaka', cities: [{ name: 'Balaka' }, { name: 'Liwonde' }] },
      { name: 'Blantyre', cities: [{ name: 'Blantyre' }] },
      { name: 'Dedza', cities: [{ name: 'Dedza' }] },
      { name: 'Karonga', cities: [{ name: 'Karonga' }] },
      { name: 'Kasungu', cities: [{ name: 'Kasungu' }] },
      { name: 'Lilongwe', cities: [{ name: 'Lilongwe' }] },
      { name: 'Mangochi', cities: [{ name: 'Mangochi' }, { name: 'Monkey Bay' }] },
      { name: 'Mzimba', cities: [{ name: 'Mzimba' }, { name: 'Mzuzu' }] },
      { name: 'Salima', cities: [{ name: 'Salima' }] },
      { name: 'Zomba', cities: [{ name: 'Zomba' }] }
    ]
  },
  {
    name: 'Malaysia',
    code: 'MY',
    currency: 'MYR',
    currencySymbol: 'RM',
    states: [
      { name: 'Johor', cities: [{ name: 'Batu Pahat' }, { name: 'Johor Bahru' }, { name: 'Kluang' }, { name: 'Kulai' }, { name: 'Muar' }, { name: 'Pasir Gudang' }, { name: 'Segamat' }, { name: 'Taman Johor Jaya' }, { name: 'Taman Senai' }, { name: 'Tangkak' }] },
      { name: 'Kedah', cities: [{ name: 'Alor Setar' }, { name: 'Kuah' }, { name: 'Sungai Petani' }] },
      { name: 'Kelantan', cities: [{ name: 'Kota Bharu' }, { name: 'Machang' }, { name: 'Tumpat' }] },
      { name: 'Kuala Lumpur', cities: [{ name: 'Kuala Lumpur' }] },
      { name: 'Melaka', cities: [{ name: 'Melaka' }] },
      { name: 'Pahang', cities: [{ name: 'Cameron Highlands' }, { name: 'Kuala Lipis' }, { name: 'Kuantan' }, { name: 'Raub' }] },
      { name: 'Perak', cities: [{ name: 'Batu Gajah' }, { name: 'Bidur' }, { name: 'Ipoh' }, { name: 'Parit Buntar' }, { name: 'Taiping' }, { name: 'Teluk Intan' }] },
      { name: 'Pulau Pinang', cities: [{ name: 'Bayan Lepas' }, { name: 'Bukit Mertajam' }, { name: 'Butterworth' }, { name: 'George Town' }, { name: 'Perai' }, { name: 'Seberang Jaya' }] },
      { name: 'Sabah', cities: [{ name: 'Beaufort' }, { name: 'Keningau' }, { name: 'Kota Kinabalu' }, { name: 'Kudat' }, { name: 'Lahad Datu' }, { name: 'Membakut' }, { name: 'Sandakan' }, { name: 'Tawau' }, { name: 'Tuaran' }] },
      { name: 'Selangor', cities: [{ name: 'Kajang' }, { name: 'Klang' }, { name: 'Petaling Jaya' }, { name: 'Shah Alam' }] }
    ]
  },
  {
    name: 'Maldives',
    code: 'MV',
    currency: 'MVR',
    currencySymbol: 'Rf',
    states: [
      { name: 'Addu', cities: [{ name: 'Hithadhoo' }] },
      { name: 'Ariatholhu Dhekunuburi', cities: [{ name: 'Mahibadhoo' }] },
      { name: 'Faadhippolhu', cities: [{ name: 'Naifaru' }] },
      { name: 'Fuvammulah', cities: [{ name: 'Foammulah' }] },
      { name: 'Huvadhuatholhu Dhekunuburi', cities: [{ name: 'Thinadhoo' }] },
      { name: 'Huvadhuatholhu Uthuruburi', cities: [{ name: 'Viligili' }] },
      { name: 'Maale', cities: [{ name: 'Male' }] },
      { name: 'Maalhosmadulu Dhekunuburi', cities: [{ name: 'Eydhafushi' }] },
      { name: 'Nilandheatholhu Dhekunuburi', cities: [{ name: 'Kudahuvadhoo' }] },
      { name: 'Thiladhunmathee Dhekunuburi', cities: [{ name: 'Kulhudhuffushi' }] }
    ]
  },
  {
    name: 'Mali',
    code: 'ML',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Bamako', cities: [{ name: 'Bamako' }] },
      { name: 'Gao', cities: [{ name: 'Andéranboukan' }, { name: 'Ansongo' }, { name: 'Bamba' }, { name: 'Bourem' }, { name: 'Bourèm Guindou' }, { name: 'Gao' }, { name: 'Inékar' }, { name: 'Ménaka' }, { name: 'Ouatagouna' }] },
      { name: 'Kayes', cities: [{ name: 'Diakon' }, { name: 'Diangouté Kamara' }, { name: 'Diéma' }, { name: 'Djidian Kéniéba' }, { name: 'Kayes' }, { name: 'Kita' }, { name: 'Nioro' }, { name: 'Sadiola' }, { name: 'Sébékoro' }, { name: 'Ségala Mba' }] },
      { name: 'Kidal', cities: [{ name: 'Aguelhok' }, { name: 'Kidal' }, { name: 'Tessalit' }] },
      { name: 'Koulikoro', cities: [{ name: 'Baguinéda' }, { name: 'Boro' }, { name: 'Dialakorodji' }, { name: 'Kati' }, { name: 'Massantola' }, { name: 'Massigui' }, { name: 'Niamina' }, { name: 'Sanankoroba' }, { name: 'Sangarébougou' }, { name: 'Wolossébougou' }] },
      { name: 'Mopti', cities: [{ name: 'Bankass' }, { name: 'Dialoubé' }, { name: 'Dinangorou' }, { name: 'Dioungani' }, { name: 'Djenné' }, { name: 'Kona' }, { name: 'Koro' }, { name: 'Mondoro' }, { name: 'Mopti' }, { name: 'Sokoura' }] },
      { name: 'Ségou', cities: [{ name: 'Dyero' }, { name: 'Kolongo-Bozo' }, { name: 'Markala' }, { name: 'Niono' }, { name: 'Pèlèngana' }, { name: 'San' }, { name: 'Ségou' }, { name: 'Siribala' }, { name: 'Somasso' }, { name: 'Zinzana' }] },
      { name: 'Sikasso', cities: [{ name: 'Bougouni' }, { name: 'Dandéresso' }, { name: 'Kadiolo' }, { name: 'Kolondiéba' }, { name: 'Koumantou' }, { name: 'Kouri' }, { name: 'Koutiala' }, { name: 'Misséni' }, { name: 'Sikasso' }, { name: 'Zégoua' }] },
      { name: 'Tombouctou', cities: [{ name: 'Bambara-Maoundé' }, { name: 'Douétiré' }, { name: 'Goundam' }, { name: 'Gourma Rharous' }, { name: 'Koumaïra' }, { name: 'Léré' }, { name: 'Ngorkou' }, { name: 'Saré-Yamou' }, { name: 'Soumpi' }, { name: 'Timbuktu' }] }
    ]
  },
  {
    name: 'Malta',
    code: 'MT',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Birkirkara', cities: [{ name: 'Birkirkara' }] },
      { name: 'Marsaskala', cities: [{ name: 'Marsaskala' }] },
      { name: 'Mosta', cities: [{ name: 'Mosta' }] },
      { name: 'Naxxar', cities: [{ name: 'Naxxar' }] },
      { name: 'Qormi', cities: [{ name: 'Qormi' }] },
      { name: 'San Ġwann', cities: [{ name: 'San Ġwann' }] },
      { name: 'San Pawl il-Baħar', cities: [{ name: 'Saint Paul’s Bay' }] },
      { name: 'Sliema', cities: [{ name: 'Sliema' }] },
      { name: 'Valletta', cities: [{ name: 'Valletta' }] },
      { name: 'Żabbar', cities: [{ name: 'Żabbar' }] }
    ]
  },
  {
    name: 'Marshall Islands',
    code: 'MH',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Majuro', cities: [{ name: 'Majuro' }] }
    ]
  },
  {
    name: 'Martinique',
    code: 'MQ',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Fort-de-France' }] }
    ]
  },
  {
    name: 'Mauritania',
    code: 'MR',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Assaba', cities: [{ name: 'Guérou' }, { name: 'Kiffa' }] },
      { name: 'Dakhlet Nouadhibou', cities: [{ name: 'Nouadhibou' }] },
      { name: 'Gorgol', cities: [{ name: 'Kaédi' }] },
      { name: 'Guidimaka', cities: [{ name: 'Sélibaby' }] },
      { name: 'Hodh el Gharbi', cities: [{ name: 'Aioun' }] },
      { name: 'Nouakchott Nord', cities: [{ name: 'Dar Naim' }] },
      { name: 'Nouakchott Ouest', cities: [{ name: 'Ksar' }, { name: 'Nouakchott' }, { name: 'Tevragh Zeina' }] },
      { name: 'Nouakchott Sud', cities: [{ name: 'Arafat' }] },
      { name: 'Tiris Zemmour', cities: [{ name: 'Bîr Mogreïn' }, { name: 'Chegga' }, { name: 'Fdérik' }, { name: 'Zouerate' }] },
      { name: 'Trarza', cities: [{ name: 'Boutilimit' }, { name: 'Rosso' }] }
    ]
  },
  {
    name: 'Mauritius',
    code: 'MU',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Black River', cities: [{ name: 'Bambous' }] },
      { name: 'Flacq', cities: [{ name: 'Bel Air' }, { name: 'Centre de Flacq' }, { name: 'Lalmatie' }] },
      { name: 'Grand Port', cities: [{ name: 'Plaine Magnien' }, { name: 'Rose Belle' }] },
      { name: 'Moka', cities: [{ name: 'Moka' }, { name: 'Quartier Militaire' }] },
      { name: 'Pamplemousses', cities: [{ name: 'Baie du Tombeau' }, { name: 'Le Hochet' }, { name: 'Triolet' }] },
      { name: 'Plaines Wilhems', cities: [{ name: 'Curepipe' }, { name: 'Quatre Bornes' }] },
      { name: 'Port Louis', cities: [{ name: 'Port Louis' }] },
      { name: 'Rivière du Rempart', cities: [{ name: 'Goodlands' }, { name: 'Grand Baie' }] },
      { name: 'Savanne', cities: [{ name: 'Surinam' }] }
    ]
  },
  {
    name: 'Mayotte',
    code: 'YT',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Bandraboua' }, { name: 'Bandrele' }, { name: 'Chirongui' }, { name: 'Dembeni' }, { name: 'Koungou' }, { name: 'Mamoudzou' }, { name: 'Ouangani' }, { name: 'Sada' }, { name: 'Trévani' }, { name: 'Tsingoni' }] }
    ]
  },
  {
    name: 'Mexico',
    code: 'MX',
    currency: 'MXN',
    currencySymbol: 'CFA',
    states: [
      { name: 'Aguascalientes', cities: [{ name: 'Aguascalientes' }, { name: 'Calvillo' }, { name: 'Cosío' }, { name: 'Jesús María' }, { name: 'Pabellón de Arteaga' }, { name: 'Rincón de Romos' }, { name: 'San Francisco de los Romo' }, { name: 'San José de Gracia' }] },
      { name: 'Baja California', cities: [{ name: 'Cuervos' }, { name: 'Ensenada' }, { name: 'Mexicali' }, { name: 'Playas de Rosarito' }, { name: 'Progreso' }, { name: 'Rodolfo Sánchez Taboada' }, { name: 'San Felipe' }, { name: 'Tecate' }, { name: 'Tijuana' }, { name: 'Vicente Guerrero' }] },
      { name: 'Chihuahua', cities: [{ name: 'Camargo' }, { name: 'Chihuahua' }, { name: 'Cuauhtémoc' }, { name: 'Delicias' }, { name: 'Guacharachi' }, { name: 'Jiménez' }, { name: 'Juárez' }, { name: 'Nuevo Casas Grandes' }, { name: 'Ojinaga' }, { name: 'Parral' }] },
      { name: 'Ciudad de México', cities: [{ name: 'Mexico City' }, { name: 'San Pedro Atocpan' }] },
      { name: 'Guanajuato', cities: [{ name: 'Apaseo el Grande' }, { name: 'Celaya' }, { name: 'Comonfort' }, { name: 'Guanajuato' }, { name: 'Irapuato' }, { name: 'León de los Aldama' }, { name: 'Pénjamo' }, { name: 'Salamanca' }, { name: 'San Francisco de la Piedad' }, { name: 'Valle de Santiago' }] },
      { name: 'Jalisco', cities: [{ name: 'Ciudad Guzmán' }, { name: 'Guadalajara' }, { name: 'Lagos de Moreno' }, { name: 'Ocotlán' }, { name: 'Puerto Vallarta' }, { name: 'Tala' }, { name: 'Tepatitlán de Morelos' }, { name: 'Tlaquepaque' }, { name: 'Tonalá' }, { name: 'Zapopan' }] },
      { name: 'México', cities: [{ name: 'Chimalhuacán' }, { name: 'Ciudad López Mateos' }, { name: 'Ciudad Nezahualcóyotl' }, { name: 'Ecatepec' }, { name: 'Ixtapaluca' }, { name: 'Naucalpan de Juárez' }, { name: 'Nezahualcóyotl' }, { name: 'Tlalnepantla' }, { name: 'Toluca' }, { name: 'Tultitlán de Mariano Escobedo' }] },
      { name: 'Michoacán', cities: [{ name: 'Apatzingan de la Constitucion' }, { name: 'Ciudad Hidalgo' }, { name: 'Ciudad Lázaro Cárdenas' }, { name: 'La Piedad' }, { name: 'Maravatío de Ocampo' }, { name: 'Morelia' }, { name: 'Pátzcuaro' }, { name: 'Sahuayo de Morelos' }, { name: 'Uruapan' }, { name: 'Zamora' }] },
      { name: 'Nuevo León', cities: [{ name: 'Ciudad Apodaca' }, { name: 'Ciudad Benito Juárez' }, { name: 'Ciudad General Escobedo' }, { name: 'Ciudad Santa Catarina' }, { name: 'García' }, { name: 'Guadalupe' }, { name: 'Monterrey' }, { name: 'Pesquería' }, { name: 'San Nicolás de los Garza' }, { name: 'San Pedro Garza García' }] },
      { name: 'Puebla', cities: [{ name: 'Cholula de Rivadabia' }, { name: 'Ciudad de Atlixco' }, { name: 'Puebla' }, { name: 'San Andrés Cholula' }, { name: 'San Martin Texmelucan de Labastida' }, { name: 'Santa María Texmelucan' }, { name: 'Tecamachalco' }, { name: 'Tehuacán' }, { name: 'Teziutlan' }, { name: 'Xicotepec de Juárez' }] }
    ]
  },
  {
    name: 'Micronesia, Federated States of',
    code: 'FM',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Chuuk', cities: [{ name: 'Weno' }] },
      { name: 'Kosrae', cities: [{ name: 'Tofol' }] },
      { name: 'Pohnpei', cities: [{ name: 'Kolonia' }, { name: 'Palikir' }] },
      { name: 'Yap', cities: [{ name: 'Colonia' }] }
    ]
  },
  {
    name: 'Moldova',
    code: 'MD',
    currency: 'MDL',
    currencySymbol: 'L',
    states: [
      { name: 'Bălţi', cities: [{ name: 'Bălţi' }] },
      { name: 'Bender', cities: [{ name: 'Bender' }] },
      { name: 'Cahul', cities: [{ name: 'Cahul' }] },
      { name: 'Chişinău', cities: [{ name: 'Băcioi' }, { name: 'Chisinau' }, { name: 'Codru' }, { name: 'Cricova' }, { name: 'Durleşti' }, { name: 'Sîngera' }, { name: 'Stăuceni' }, { name: 'Truşeni' }] },
      { name: 'Găgăuzia', cities: [{ name: 'Ceadîr-Lunga' }, { name: 'Comrat' }, { name: 'Congaz' }, { name: 'Copceac' }, { name: 'Vulcăneşti' }] },
      { name: 'Orhei', cities: [{ name: 'Orhei' }, { name: 'Peresecina' }] },
      { name: 'Soroca', cities: [{ name: 'Soroca' }] },
      { name: 'Stînga Nistrului', cities: [{ name: 'Camenca' }, { name: 'Chiţcani' }, { name: 'Dnestrovsc' }, { name: 'Dubăsari' }, { name: 'Grigoriopol' }, { name: 'Rîbniţa' }, { name: 'Slobozia' }, { name: 'Tiraspol' }] },
      { name: 'Străşeni', cities: [{ name: 'Straşeni' }] },
      { name: 'Ungheni', cities: [{ name: 'Ungheni' }] }
    ]
  },
  {
    name: 'Monaco',
    code: 'MC',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Monaco' }] }
    ]
  },
  {
    name: 'Mongolia',
    code: 'MN',
    currency: 'MNT',
    currencySymbol: '₮',
    states: [
      { name: 'Bayan-Ölgiy', cities: [{ name: 'Höshööt' }, { name: 'Ölgiy' }] },
      { name: 'Bayanhongor', cities: [{ name: 'Bayanhongor' }] },
      { name: 'Darhan-Uul', cities: [{ name: 'Darhan' }] },
      { name: 'Dornod', cities: [{ name: 'Choybalsan' }] },
      { name: 'Hövsgöl', cities: [{ name: 'Mörön' }] },
      { name: 'Orhon', cities: [{ name: 'Erdenet' }] },
      { name: 'Övörhangay', cities: [{ name: 'Arvayheer' }, { name: 'Harhorin' }] },
      { name: 'Selenge', cities: [{ name: 'Darhan' }, { name: 'Dzüünharaa' }, { name: 'Sühbaatar' }] },
      { name: 'Ulaanbaatar', cities: [{ name: 'Nalayh' }, { name: 'Ulaanbaatar' }] },
      { name: 'Uvs', cities: [{ name: 'Ulaangom' }] }
    ]
  },
  {
    name: 'Montenegro',
    code: 'ME',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Bar', cities: [{ name: 'Bar' }] },
      { name: 'Budva', cities: [{ name: 'Budva' }] },
      { name: 'Herceg Novi', cities: [{ name: 'Herceg Novi' }] },
      { name: 'Kotor', cities: [{ name: 'Kotor' }] },
      { name: 'Nikšić', cities: [{ name: 'Nikšić' }] },
      { name: 'Plav', cities: [{ name: 'Plav' }] },
      { name: 'Pljevlja', cities: [{ name: 'Pljevlja' }] },
      { name: 'Podgorica', cities: [{ name: 'Podgorica' }] },
      { name: 'Rožaje', cities: [{ name: 'Rožaje' }] },
      { name: 'Ulcinj', cities: [{ name: 'Ulcinj' }] }
    ]
  },
  {
    name: 'Montserrat',
    code: 'MS',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Saint Anthony', cities: [{ name: 'Plymouth' }] },
      { name: 'Saint Peter', cities: [{ name: 'Brades' }] }
    ]
  },
  {
    name: 'Morocco',
    code: 'MA',
    currency: 'MAD',
    currencySymbol: 'DH',
    states: [
      { name: 'Béni Mellal-Khénifra', cities: [{ name: 'Aguelmous' }, { name: 'Al Fqih Ben Çalah' }, { name: 'Aziylal' }, { name: 'Béni Mellal' }, { name: 'Khénifra' }, { name: 'Kouribga' }, { name: 'Mrirt' }, { name: 'Oued Zem' }, { name: 'Qasbat Tadla' }, { name: 'Souq Sebt Oulad Nemma' }] },
      { name: 'Casablanca-Settat', cities: [{ name: 'Ad Darwa' }, { name: 'Aïn Harrouda' }, { name: 'Barrechid' }, { name: 'Beni Yakhlef' }, { name: 'Bouskoura' }, { name: 'Casablanca' }, { name: 'El Jadid' }, { name: 'Mohammedia' }, { name: 'Moulay Abdallah' }, { name: 'Settat' }] },
      { name: 'Fès-Meknès', cities: [{ name: 'Aïn Cheggag' }, { name: 'Azrou' }, { name: 'Douar Ain Chkef' }, { name: 'Fès' }, { name: 'Fritissa' }, { name: 'Meknès' }, { name: 'Sabaa Aiyoun' }, { name: 'Sefrou' }, { name: 'Taounate' }, { name: 'Taza' }] },
      { name: 'Guelmim-Oued Noun', cities: [{ name: 'Bou Izakarn' }, { name: 'Guelmim' }, { name: 'Mahbés' }, { name: 'Mirleft' }, { name: 'Sidi Ifni' }, { name: 'Tan-Tan' }, { name: 'Tarhjicht' }, { name: 'Tourza' }] },
      { name: 'Laâyoune-Sakia El Hamra', cities: [{ name: 'Cabo Bojador' }, { name: 'Laâyoune' }, { name: 'Lemsid' }, { name: 'Semara' }, { name: 'Tifariti' }, { name: 'Uad Damran' }] },
      { name: 'Marrakech-Safi', cities: [{ name: 'Ben Guerir' }, { name: 'Chichaoua' }, { name: 'Douar Laouamra' }, { name: 'El Kelaa des Srarhna' }, { name: 'Essaouira' }, { name: 'Marrakech' }, { name: 'Sa’ada' }, { name: 'Safi' }, { name: 'Tameslouht' }, { name: 'Youssoufia' }] },
      { name: 'Oriental', cities: [{ name: 'Al Aaroui' }, { name: 'Beni Enzar' }, { name: 'Berkane' }, { name: 'El Aïoun' }, { name: 'Guercif' }, { name: 'Jerada' }, { name: 'Nador' }, { name: 'Oujda-Angad' }, { name: 'Taourirt' }, { name: 'Zaïo' }] },
      { name: 'Rabat-Salé-Kénitra', cities: [{ name: 'Ain El Aouda' }, { name: 'Al Khmissat' }, { name: 'Kenitra' }, { name: 'Rabat' }, { name: 'Sale' }, { name: 'Sidi Qacem' }, { name: 'Sidi Slimane' }, { name: 'Sidi Yahya Zaer' }, { name: 'Skhirate' }, { name: 'Temara' }] },
      { name: 'Souss-Massa', cities: [{ name: 'Agadir' }, { name: 'Ait Ali' }, { name: 'Ait Melloul' }, { name: 'Inezgane' }, { name: 'My Drarga' }, { name: 'Oulad Teïma' }, { name: 'Sidi Bibi' }, { name: 'Taroudannt' }, { name: 'Temsia' }, { name: 'Wislane' }] },
      { name: 'Tanger-Tétouan-Al Hoceïma', cities: [{ name: 'Al Hoceïma' }, { name: 'Fnidq' }, { name: 'Gueznaia' }, { name: 'Ksar El Kebir' }, { name: 'Larache' }, { name: 'M’diq' }, { name: 'Martil' }, { name: 'Ouezzane' }, { name: 'Tangier' }, { name: 'Tétouan' }] }
    ]
  },
  {
    name: 'Mozambique',
    code: 'MZ',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Cabo Delgado', cities: [{ name: 'Ancuabe' }, { name: 'Macomia' }, { name: 'Mocímboa' }, { name: 'Mocímboa da Praia' }, { name: 'Montepuez' }, { name: 'Palma' }, { name: 'Pemba' }] },
      { name: 'Gaza', cities: [{ name: 'Chibuto' }, { name: 'Chokwé' }, { name: 'Macia' }, { name: 'Manjacaze' }, { name: 'Mapai' }, { name: 'Massangena' }, { name: 'Xai-Xai' }] },
      { name: 'Inhambane', cities: [{ name: 'Inhambane' }, { name: 'Inhassoro' }, { name: 'Maxixe' }, { name: 'Panda' }, { name: 'Regedor Quissico' }, { name: 'Regedor Zavala' }, { name: 'Vilankulo' }, { name: 'Závora' }] },
      { name: 'Manica', cities: [{ name: 'Catandica' }, { name: 'Chimoio' }, { name: 'Chiramba' }, { name: 'Espungabera' }, { name: 'Manica' }] },
      { name: 'Maputo', cities: [{ name: 'Catembe' }, { name: 'Manhiça' }, { name: 'Maputo' }, { name: 'Matola' }, { name: 'Namaacha' }] },
      { name: 'Nampula', cities: [{ name: 'António Enes' }, { name: 'Cidade de Nacala' }, { name: 'Ilha de Moçambique' }, { name: 'Ligonha' }, { name: 'Malema' }, { name: 'Nampula' }] },
      { name: 'Niassa', cities: [{ name: 'Cuamba' }, { name: 'Lichinga' }, { name: 'Marrupa' }] },
      { name: 'Sofala', cities: [{ name: 'Beira' }, { name: 'Dondo' }] },
      { name: 'Tete', cities: [{ name: 'Moatize' }, { name: 'Songo' }, { name: 'Tete' }, { name: 'Ulongué' }, { name: 'Zumbo' }] },
      { name: 'Zambézia', cities: [{ name: 'Chinde' }, { name: 'Mocuba' }, { name: 'Nicoadala' }, { name: 'Pebane' }, { name: 'Quelimane' }, { name: 'Vila Junqueiro' }] }
    ]
  },
  {
    name: 'Namibia',
    code: 'NA',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Erongo', cities: [{ name: 'Karibib' }, { name: 'Omaruru' }, { name: 'Omatjete' }, { name: 'Swakopmund' }, { name: 'Usakos' }, { name: 'Walvisbaai' }] },
      { name: 'Hardap', cities: [{ name: 'Maltahöhe' }, { name: 'Mariental' }, { name: 'Rehoboth' }] },
      { name: 'Kavango East', cities: [{ name: 'Rundu' }] },
      { name: 'Khomas', cities: [{ name: 'Windhoek' }] },
      { name: 'Omaheke', cities: [{ name: 'Gobabis' }] },
      { name: 'Oshana', cities: [{ name: 'Ondangwa' }, { name: 'Ongwediva' }, { name: 'Oshakati' }] },
      { name: 'Oshikoto', cities: [{ name: 'Omuthiya' }, { name: 'Tsumeb' }] },
      { name: 'Otjozondjupa', cities: [{ name: 'Grootfontein' }, { name: 'Okahandja' }, { name: 'Otavi' }, { name: 'Otjiwarongo' }] },
      { name: 'Zambezi', cities: [{ name: 'Katima Mulilo' }] },
      { name: 'ǁKaras', cities: [{ name: 'Bethanie' }, { name: 'Karasburg' }, { name: 'Keetmanshoop' }, { name: 'Lüderitz' }, { name: 'Oranjemund' }] }
    ]
  },
  {
    name: 'Nauru',
    code: 'NR',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Yaren', cities: [{ name: 'Yaren' }] }
    ]
  },
  {
    name: 'Nepal',
    code: 'NP',
    currency: 'NPR',
    currencySymbol: '₨',
    states: [
      { name: 'Bāgmatī', cities: [{ name: 'Heṭauḍā' }] },
      { name: 'Gaṇḍakī', cities: [{ name: 'Bāglung' }, { name: 'Pokhara' }] },
      { name: 'Karṇālī', cities: [{ name: 'Barīkot' }, { name: 'Birendranagar' }, { name: 'Gorkhā' }, { name: 'Sarkeghāṭ' }] },
      { name: 'Lumbinī', cities: [{ name: 'Bhairāhawā' }, { name: 'Butwāl' }, { name: 'Ghorāhī' }, { name: 'Libānggaon' }, { name: 'Sanwal' }, { name: 'Tulsīpur' }] },
      { name: 'Madhesh', cities: [{ name: 'Janakpur' }, { name: 'Shambhunāth' }] },
      { name: 'Province Number One', cities: [{ name: 'Birāṭnagar' }] },
      { name: 'Sudūrpashchim', cities: [{ name: 'Dadeldhurā' }, { name: 'Godāwari̇̄' }, { name: 'Kalaun' }] },
      { name: 'Unknown', cities: [{ name: 'Bhaktapur' }, { name: 'Bharatpur' }, { name: 'Birgañj' }, { name: 'Buḍhānilkanṭha' }, { name: 'Dhangaḍhi̇̄' }, { name: 'Dharān' }, { name: 'Īṭahari̇̄' }, { name: 'Kathmandu' }, { name: 'Lahān' }, { name: 'Tokha' }] }
    ]
  },
  {
    name: 'Netherlands',
    code: 'NL',
    currency: 'EUR',
    currencySymbol: '€',
    states: [
      { name: 'Flevoland', cities: [{ name: 'Almere' }, { name: 'Dronten' }, { name: 'Emmeloord' }, { name: 'Lelystad' }, { name: 'Urk' }, { name: 'Zeewolde' }] },
      { name: 'Fryslân', cities: [{ name: 'Drachten' }, { name: 'Franeker' }, { name: 'Harlingen' }, { name: 'Heerenveen' }, { name: 'Joure' }, { name: 'Leeuwarden' }, { name: 'Oosterend' }, { name: 'Sneek' }, { name: 'Veenoord' }, { name: 'Wolvega' }] },
      { name: 'Gelderland', cities: [{ name: 'Apeldoorn' }, { name: 'Arnhem' }, { name: 'Barneveld' }, { name: 'Doetinchem' }, { name: 'Ede' }, { name: 'Harderwijk' }, { name: 'Nijkerk' }, { name: 'Nijmegen' }, { name: 'Zevenaar' }, { name: 'Zutphen' }] },
      { name: 'Groningen', cities: [{ name: 'Appingedam' }, { name: 'Delfzijl' }, { name: 'Groningen' }, { name: 'Haren' }, { name: 'Hoogezand' }, { name: 'Stadskanaal' }, { name: 'Veendam' }, { name: 'Vlagtwedde' }, { name: 'Winsum' }, { name: 'Zuidhorn' }] },
      { name: 'Limburg', cities: [{ name: 'Brunssum' }, { name: 'Heerlen' }, { name: 'Kerkrade' }, { name: 'Landgraaf' }, { name: 'Maastricht' }, { name: 'Roermond' }, { name: 'Sittard' }, { name: 'Venlo' }, { name: 'Venray' }, { name: 'Weert' }] },
      { name: 'Noord-Brabant', cities: [{ name: '’s-Hertogenbosch' }, { name: 'Bergen op Zoom' }, { name: 'Breda' }, { name: 'Eindhoven' }, { name: 'Helmond' }, { name: 'Oosterhout' }, { name: 'Oss' }, { name: 'Roosendaal' }, { name: 'Tilburg' }, { name: 'Waalwijk' }] },
      { name: 'Noord-Holland', cities: [{ name: 'Alkmaar' }, { name: 'Amstelveen' }, { name: 'Amsterdam' }, { name: 'Haarlem' }, { name: 'Hilversum' }, { name: 'Hoofddorp' }, { name: 'Hoorn' }, { name: 'Purmerend' }, { name: 'Zaandam' }, { name: 'Zaanstad' }] },
      { name: 'Overijssel', cities: [{ name: 'Almelo' }, { name: 'Deventer' }, { name: 'Enschede' }, { name: 'Hardenberg' }, { name: 'Hellendoorn' }, { name: 'Hengelo' }, { name: 'Kampen' }, { name: 'Oldenzaal' }, { name: 'Raalte' }, { name: 'Zwolle' }] },
      { name: 'Utrecht', cities: [{ name: 'Amersfoort' }, { name: 'De Bilt' }, { name: 'Houten' }, { name: 'Maarssen' }, { name: 'Nieuwegein' }, { name: 'Soest' }, { name: 'Utrecht' }, { name: 'Veenendaal' }, { name: 'Woerden' }, { name: 'Zeist' }] },
      { name: 'Zuid-Holland', cities: [{ name: 'Alphen aan den Rijn' }, { name: 'Delft' }, { name: 'Dordrecht' }, { name: 'Gouda' }, { name: 'Leiden' }, { name: 'Rotterdam' }, { name: 'Schiedam' }, { name: 'The Hague' }, { name: 'Vlaardingen' }, { name: 'Zoetermeer' }] }
    ]
  },
  {
    name: 'New Caledonia',
    code: 'NC',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Province Îles', cities: [{ name: 'Wé' }] },
      { name: 'Province Nord', cities: [{ name: 'Koné' }] },
      { name: 'Province Sud', cities: [{ name: 'Dumbéa' }, { name: 'Mont-Dore' }, { name: 'Nouméa' }, { name: 'Païta' }] }
    ]
  },
  {
    name: 'New Zealand',
    code: 'NZ',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Auckland', cities: [{ name: 'Auckland' }, { name: 'Manukau City' }, { name: 'Northcote' }, { name: 'Pukekohe East' }, { name: 'Waitakere' }, { name: 'Waiuku' }] },
      { name: 'Bay of Plenty', cities: [{ name: 'Rotorua' }, { name: 'Tauranga' }, { name: 'Whakatane' }] },
      { name: 'Canterbury', cities: [{ name: 'Ashton' }, { name: 'Christchurch' }, { name: 'Kaikoura' }, { name: 'Kairaki' }, { name: 'Rolleston' }, { name: 'Timaru' }] },
      { name: 'Hawke’s Bay', cities: [{ name: 'Havelock North' }, { name: 'Napier' }] },
      { name: 'Manawatu-Wanganui', cities: [{ name: 'Feilding' }, { name: 'Levin' }, { name: 'Palmerston North' }, { name: 'Whanganui' }] },
      { name: 'Northland', cities: [{ name: 'Kaitaia' }, { name: 'Kerikeri' }, { name: 'Whangarei' }] },
      { name: 'Southland', cities: [{ name: 'Glencoe' }, { name: 'Halfmoon Bay' }, { name: 'Invercargill' }, { name: 'Te Anau' }] },
      { name: 'Taranaki', cities: [{ name: 'Hawera' }, { name: 'New Plymouth' }, { name: 'Stratford' }] },
      { name: 'Waikato', cities: [{ name: 'Cambridge' }, { name: 'Hamilton' }, { name: 'Taupo' }, { name: 'Te Awamutu' }, { name: 'Thames' }, { name: 'Tokoroa' }, { name: 'Turangi' }] },
      { name: 'Wellington', cities: [{ name: 'Lower Hutt' }, { name: 'Masterton' }, { name: 'Paraparaumu' }, { name: 'Paraparaumu Beach' }, { name: 'Porirua' }, { name: 'Upper Hutt' }, { name: 'Waikanae' }, { name: 'Wellington' }] }
    ]
  },
  {
    name: 'Nicaragua',
    code: 'NI',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Chinandega', cities: [{ name: 'Chichigalpa' }, { name: 'Chinandega' }, { name: 'Corinto' }, { name: 'El Realejo' }, { name: 'El Viejo' }, { name: 'Posoltega' }, { name: 'Puerto Morazán' }, { name: 'Somotillo' }, { name: 'Villanueva' }] },
      { name: 'Costa Caribe Norte', cities: [{ name: 'Bilwi' }, { name: 'Bonanza' }, { name: 'Mulukukú' }, { name: 'Prinzapolka' }, { name: 'Rosita' }, { name: 'Siuna' }, { name: 'Waslala' }, { name: 'Waspán' }] },
      { name: 'Costa Caribe Sur', cities: [{ name: 'Bluefields' }, { name: 'Bocana de Paiwas' }, { name: 'El Ayote' }, { name: 'El Rama' }, { name: 'El Tortuguero' }, { name: 'Kukrahill' }, { name: 'La Cruz de Río Grande' }, { name: 'Muelle de los Bueyes' }, { name: 'Nueva Guinea' }] },
      { name: 'Estelí', cities: [{ name: 'Condega' }, { name: 'Estelí' }, { name: 'La Trinidad' }, { name: 'Pueblo Nuevo' }, { name: 'San Juan de Limay' }] },
      { name: 'Granada', cities: [{ name: 'Diriomo' }, { name: 'Granada' }, { name: 'Nandaime' }] },
      { name: 'Jinotega', cities: [{ name: 'El Cuá' }, { name: 'Jinotega' }, { name: 'San José de Bocay' }, { name: 'San Rafael del Norte' }, { name: 'San Sebastián de Yalí' }, { name: 'Wiwilí de Jinotega' }] },
      { name: 'León', cities: [{ name: 'Achuapa' }, { name: 'El Jicaral' }, { name: 'El Sauce' }, { name: 'La Paz Centro' }, { name: 'Larreynaga' }, { name: 'León' }, { name: 'Nagarote' }, { name: 'Quezalguaque' }, { name: 'Santa Rosa del Peñón' }, { name: 'Telica' }] },
      { name: 'Managua', cities: [{ name: 'Ciudad Sandino' }, { name: 'El Crucero' }, { name: 'La Trinidad' }, { name: 'Managua' }, { name: 'Mateare' }, { name: 'San Francisco Libre' }, { name: 'San Rafael del Sur' }, { name: 'Ticuantepe' }, { name: 'Tipitapa' }, { name: 'Villa El Carmen' }] },
      { name: 'Masaya', cities: [{ name: 'La Concepción' }, { name: 'Masatepe' }, { name: 'Masaya' }, { name: 'Nandasmo' }, { name: 'Nindirí' }, { name: 'Niquinohomo' }, { name: 'Tisma' }] },
      { name: 'Matagalpa', cities: [{ name: 'Ciudad Darío' }, { name: 'Esquipulas' }, { name: 'Matagalpa' }, { name: 'Matiguás' }, { name: 'Rancho Grande' }, { name: 'Río Blanco' }, { name: 'San Dionisio' }, { name: 'San Isidro' }, { name: 'San Ramón' }, { name: 'Sébaco' }] }
    ]
  },
  {
    name: 'Niger',
    code: 'NE',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Agadez', cities: [{ name: 'Agadez' }, { name: 'Arlit' }, { name: 'Dabaga' }, { name: 'Djado' }] },
      { name: 'Diffa', cities: [{ name: 'Diffa' }, { name: 'Nguigmi' }] },
      { name: 'Dosso', cities: [{ name: 'Dosso' }, { name: 'Gaya' }] },
      { name: 'Maradi', cities: [{ name: 'Guidan Roumdji' }, { name: 'Maradi' }] },
      { name: 'Niamey', cities: [{ name: 'Niamey' }] },
      { name: 'Tahoua', cities: [{ name: 'Birnin Konni' }, { name: 'Galmi' }, { name: 'Gidan Idèr' }, { name: 'Kawara' }, { name: 'Madaoua' }, { name: 'Tahoua' }, { name: 'Toulou' }, { name: 'Tounfafi' }] },
      { name: 'Tillabéri', cities: [{ name: 'Ayorou' }, { name: 'Baléyara' }, { name: 'Bandio' }, { name: 'Kollo' }, { name: 'Kouré' }, { name: 'Sabara Bangou' }, { name: 'Tillabéri' }] },
      { name: 'Zinder', cities: [{ name: 'Gouré' }, { name: 'Matamey' }, { name: 'Takiéta' }, { name: 'Zinder' }] }
    ]
  },
 {
  name: 'Nigeria',
  code: 'NG',
  currency: 'NGN',
  currencySymbol: '₦',
  states: [
    { name: 'Abia', cities: [{ name: 'Aba' }, { name: 'Abiriba' }, { name: 'Arochukwu' }, { name: 'Bende' }, { name: 'Ikwuano' }, { name: 'Isiala Ngwa' }, { name: 'Isuikwuato' }, { name: 'Obingwa' }, { name: 'Ohafia' }, { name: 'Omoba' }, { name: 'Ugwunagbo' }, { name: 'Ukwa' }, { name: 'Umu-Nneochi' }, { name: 'Umuahia' }] },
    { name: 'Abuja', cities: [{ name: 'Abaji' }, { name: 'Apo' }, { name: 'Asokoro' }, { name: 'Bwari' }, { name: 'Garki' }, { name: 'Guzape' }, { name: 'Gwagwalada' }, { name: 'Gwarinpa' }, { name: 'Jabi' }, { name: 'Karshi' }, { name: 'Karu' }, { name: 'Katampe' }, { name: 'Kubwa' }, { name: 'Kuje' }, { name: 'Kwali' }, { name: 'Life Camp' }, { name: 'Lokogoma' }, { name: 'Lugbe' }, { name: 'Maitama' }, { name: 'Mpape' }, { name: 'Nyanya' }, { name: 'Utako' }, { name: 'Wuse 2' }, { name: 'Wuye' }] },
    { name: 'Adamawa', cities: [{ name: 'Fufore' }, { name: 'Ganye' }, { name: 'Gombi' }, { name: 'Guyuk' }, { name: 'Hong' }, { name: 'Jada' }, { name: 'Jimeta' }, { name: 'Madagali' }, { name: 'Maiha' }, { name: 'Mayo-Belwa' }, { name: 'Michika' }, { name: 'Mubi' }, { name: 'Numan' }, { name: 'Shelleng' }, { name: 'Yola' }] },
    { name: 'Akwa Ibom', cities: [{ name: 'Abak' }, { name: 'Eket' }, { name: 'Etinan' }, { name: 'Ibeno' }, { name: 'Ibiono Ibom' }, { name: 'Ikot Abasi' }, { name: 'Ikot Ekpene' }, { name: 'Itu' }, { name: 'Mkpat-Enin' }, { name: 'Nsit-Ibom' }, { name: 'Nsit-Ubium' }, { name: 'Onna' }, { name: 'Oron' }, { name: 'Ukanafun' }, { name: 'Uyo' }] },
    { name: 'Anambra', cities: [{ name: 'Aguata' }, { name: 'Anambra East' }, { name: 'Anambra West' }, { name: 'Awka' }, { name: 'Dunukofia' }, { name: 'Ekwulobia' }, { name: 'Idemili' }, { name: 'Ihiala' }, { name: 'Njikoka' }, { name: 'Nkpor' }, { name: 'Nnewi' }, { name: 'Obosi' }, { name: 'Ogbaru' }, { name: 'Onitsha' }, { name: 'Oyi' }] },
    { name: 'Bauchi', cities: [{ name: 'Alkaleri' }, { name: 'Azare' }, { name: 'Bauchi' }, { name: 'Damban' }, { name: 'Darazo' }, { name: 'Dass' }, { name: 'Ganjuwa' }, { name: 'Jama\'are' }, { name: 'Katagum' }, { name: 'Misau' }, { name: 'Ningi' }, { name: 'Shira' }, { name: 'Tafawa Balewa' }, { name: 'Toro' }, { name: 'Zaki' }] },
    { name: 'Bayelsa', cities: [{ name: 'Amassoma' }, { name: 'Brass' }, { name: 'Ekeremor' }, { name: 'Kaiama' }, { name: 'Kolokuma' }, { name: 'Nembe' }, { name: 'Ogbia' }, { name: 'Opokuma' }, { name: 'Sagbama' }, { name: 'Yenagoa' }] },
    { name: 'Benue', cities: [{ name: 'Adoka' }, { name: 'Agatu' }, { name: 'Apa' }, { name: 'Buruku' }, { name: 'Gboko' }, { name: 'Guma' }, { name: 'Gwer' }, { name: 'Katsina-Ala' }, { name: 'Konshisha' }, { name: 'Kwande' }, { name: 'Logo' }, { name: 'Makurdi' }, { name: 'Oju' }, { name: 'Otukpo' }, { name: 'Vandeikya' }] },
    { name: 'Borno', cities: [{ name: 'Askira' }, { name: 'Bama' }, { name: 'Biu' }, { name: 'Chibok' }, { name: 'Damboa' }, { name: 'Dikwa' }, { name: 'Gamboru' }, { name: 'Gubio' }, { name: 'Gwoza' }, { name: 'Kaga' }, { name: 'Konduga' }, { name: 'Kukawa' }, { name: 'Maiduguri' }, { name: 'Monguno' }, { name: 'Ngala' }] },
    { name: 'Cross River', cities: [{ name: 'Akamkpa' }, { name: 'Akpabuyo' }, { name: 'Bakassi' }, { name: 'Biase' }, { name: 'Boki' }, { name: 'Calabar' }, { name: 'Etung' }, { name: 'Ikom' }, { name: 'Obanliku' }, { name: 'Obudu' }, { name: 'Odukpani' }, { name: 'Ogoja' }, { name: 'Ugep' }, { name: 'Yakurr' }, { name: 'Yala' }] },
    { name: 'Delta', cities: [{ name: 'Abraka' }, { name: 'Agbor' }, { name: 'Aniocha North' }, { name: 'Aniocha South' }, { name: 'Asaba' }, { name: 'Bomadi' }, { name: 'Burutu' }, { name: 'Effurun' }, { name: 'Ethiope East' }, { name: 'Ethiope West' }, { name: 'Ika North East' }, { name: 'Ika South' }, { name: 'Isoko North' }, { name: 'Isoko South' }, { name: 'Kwale' }, { name: 'Ndokwa East' }, { name: 'Ndokwa West' }, { name: 'Obiaruku' }, { name: 'Oghara' }, { name: 'Ogwashi-Uku' }, { name: 'Okpe' }, { name: 'Oshimili North' }, { name: 'Oshimili South' }, { name: 'Ozoro' }, { name: 'Patani' }, { name: 'Sapele' }, { name: 'Udu' }, { name: 'Ughelli North' }, { name: 'Ughelli South' }, { name: 'Ukwuani' }, { name: 'Uvwie' }, { name: 'Warri' }, { name: 'Warri North' }, { name: 'Warri South' }, { name: 'Warri South West' }] },
    { name: 'Ebonyi', cities: [{ name: 'Abakaliki' }, { name: 'Afikpo' }, { name: 'Edda' }, { name: 'Ezza' }, { name: 'Ishielu' }, { name: 'Ikwo' }, { name: 'Ivo' }, { name: 'Izzi' }, { name: 'Ohaozara' }, { name: 'Ohaukwu' }, { name: 'Onicha' }, { name: 'Onueke' }, { name: 'Uburu' }] },
    { name: 'Edo', cities: [{ name: 'Agenebode' }, { name: 'Auchi' }, { name: 'Benin City' }, { name: 'Ehor' }, { name: 'Ekpoma' }, { name: 'Fugar' }, { name: 'Igarra' }, { name: 'Igueben' }, { name: 'Iguobazuwa' }, { name: 'Okada' }, { name: 'Okpella' }, { name: 'Sabongida-Ora' }, { name: 'Ubiaja' }, { name: 'Uromi' }] },
    { name: 'Ekiti', cities: [{ name: 'Ado-Ekiti' }, { name: 'Aramoko' }, { name: 'Efon-Alaaye' }, { name: 'Emure' }, { name: 'Ido-Ekiti' }, { name: 'Ijero-Ekiti' }, { name: 'Ikere-Ekiti' }, { name: 'Ikole-Ekiti' }, { name: 'Ilawe' }, { name: 'Ise-Ekiti' }, { name: 'Iyin-Ekiti' }, { name: 'Omuo' }, { name: 'Otun' }, { name: 'Oye-Ekiti' }] },
    { name: 'Enugu', cities: [{ name: '9th Mile' }, { name: 'Adani' }, { name: 'Agbani' }, { name: 'Awgu' }, { name: 'Eha-Amufu' }, { name: 'Enugu' }, { name: 'Enugu-Ezike' }, { name: 'Ibagwa-Ani' }, { name: 'Nkanu' }, { name: 'Nsukka' }, { name: 'Obollo-Afor' }, { name: 'Oji River' }, { name: 'Udi' }] },
    { name: 'Gombe', cities: [{ name: 'Akko' }, { name: 'Bajoga' }, { name: 'Billiri' }, { name: 'Deba' }, { name: 'Dukku' }, { name: 'Gombe' }, { name: 'Kaltungo' }, { name: 'Kumo' }, { name: 'Nafada' }, { name: 'Pindiga' }] },
    { name: 'Imo', cities: [{ name: 'Ahiara' }, { name: 'Anara' }, { name: 'Ideato' }, { name: 'Iho' }, { name: 'Mbaise' }, { name: 'Mgbidi' }, { name: 'Nkwerre' }, { name: 'Obowo' }, { name: 'Oguta' }, { name: 'Okigwe' }, { name: 'Orlu' }, { name: 'Orodo' }, { name: 'Owerri' }, { name: 'Umunneoha' }] },
    { name: 'Jigawa', cities: [{ name: 'Babura' }, { name: 'Birnin Kudu' }, { name: 'Dutse' }, { name: 'Gumel' }, { name: 'Gwaram' }, { name: 'Hadejia' }, { name: 'Jahun' }, { name: 'Kazaure' }, { name: 'Kiyawa' }, { name: 'Malam Madori' }, { name: 'Ringim' }, { name: 'Taura' }] },
    { name: 'Kaduna', cities: [{ name: 'Birnin Gwari' }, { name: 'Chikun' }, { name: 'Giwa' }, { name: 'Ikara' }, { name: 'Kachia' }, { name: 'Kaduna' }, { name: 'Kafanchan' }, { name: 'Kagoro' }, { name: 'Lere' }, { name: 'Makarfi' }, { name: 'Saminaka' }, { name: 'Zaria' }, { name: 'Zonkwa' }] },
    { name: 'Kano', cities: [{ name: 'Bebeji' }, { name: 'Bichi' }, { name: 'Dambatta' }, { name: 'Dawakin Tofa' }, { name: 'Fagge' }, { name: 'Gaya' }, { name: 'Gwarzo' }, { name: 'Kano' }, { name: 'Karaye' }, { name: 'Kumbotso' }, { name: 'Rano' }, { name: 'Tarauni' }, { name: 'Ungogo' }, { name: 'Wudil' }] },
    { name: 'Katsina', cities: [{ name: 'Bakori' }, { name: 'Batsari' }, { name: 'Baure' }, { name: 'Daura' }, { name: 'Dutsin-Ma' }, { name: 'Funtua' }, { name: 'Jibia' }, { name: 'Kankia' }, { name: 'Katsina' }, { name: 'Malumfashi' }, { name: 'Mani' }, { name: 'Safana' }] },
    { name: 'Kebbi', cities: [{ name: 'Argungu' }, { name: 'Bagudo' }, { name: 'Birnin Kebbi' }, { name: 'Bunza' }, { name: 'Dakingari' }, { name: 'Gwandu' }, { name: 'Jega' }, { name: 'Kamba' }, { name: 'Yauri' }, { name: 'Zuru' }] },
    { name: 'Kogi', cities: [{ name: 'Aiyetoro Gbede' }, { name: 'Ankpa' }, { name: 'Anyigba' }, { name: 'Egbe' }, { name: 'Idah' }, { name: 'Isanlu' }, { name: 'Kabba' }, { name: 'Koton-Karfe' }, { name: 'Lokoja' }, { name: 'Mopa' }, { name: 'Ogaminana' }, { name: 'Okene' }] },
    { name: 'Kwara', cities: [{ name: 'Arandun' }, { name: 'Bode Saadu' }, { name: 'Ilorin' }, { name: 'Jebba' }, { name: 'Kaiama' }, { name: 'Kosubosu' }, { name: 'Lafiagi' }, { name: 'Offa' }, { name: 'Omu-Aran' }, { name: 'Pategi' }, { name: 'Share' }] },
    { name: 'Lagos', cities: [{ name: 'Agege' }, { name: 'Ajah' }, { name: 'Alimosho' }, { name: 'Apapa' }, { name: 'Badagry' }, { name: 'Epe' }, { name: 'Festac' }, { name: 'Gbagada' }, { name: 'Ikeja' }, { name: 'Ikorodu' }, { name: 'Ikoyi' }, { name: 'Lagos Island' }, { name: 'Lekki' }, { name: 'Magodo' }, { name: 'Maryland' }, { name: 'Mushin' }, { name: 'Oshodi' }, { name: 'Surulere' }, { name: 'Victoria Island' }, { name: 'Yaba' }] },
    { name: 'Nasarawa', cities: [{ name: 'Akwanga' }, { name: 'Doma' }, { name: 'Karu' }, { name: 'Keffi' }, { name: 'Kokona' }, { name: 'Lafia' }, { name: 'Nasarawa' }, { name: 'Nasarawa Eggon' }, { name: 'Toto' }, { name: 'Wamba' }] },
    { name: 'Niger', cities: [{ name: 'Agaie' }, { name: 'Bida' }, { name: 'Kontagora' }, { name: 'Kuta' }, { name: 'Lapai' }, { name: 'Minna' }, { name: 'Mokwa' }, { name: 'New Bussa' }, { name: 'Rijau' }, { name: 'Suleja' }, { name: 'Tegina' }, { name: 'Zungeru' }] },
    { name: 'Ogun', cities: [{ name: 'Abeokuta' }, { name: 'Agbarra' }, { name: 'Ayetoro' }, { name: 'Ifo' }, { name: 'Ijebu Ode' }, { name: 'Ijebu-Igbo' }, { name: 'Ilaro' }, { name: 'Iperu' }, { name: 'Ogbere' }, { name: 'Ota' }, { name: 'Owode' }, { name: 'Sagamu' }, { name: 'Sango Ota' }] },
    { name: 'Ondo', cities: [{ name: 'Akure' }, { name: 'Idanre' }, { name: 'Ifon' }, { name: 'Igbokoda' }, { name: 'Ikare' }, { name: 'Ile-Oluji' }, { name: 'Isua' }, { name: 'Oka-Akoko' }, { name: 'Okitipupa' }, { name: 'Ondo City' }, { name: 'Ore' }, { name: 'Owo' }] },
    { name: 'Osun', cities: [{ name: 'Ede' }, { name: 'Ejigbo' }, { name: 'Gbongan' }, { name: 'Ikirun' }, { name: 'Ikire' }, { name: 'Ila Orangun' }, { name: 'Ile-Ife' }, { name: 'Ilesa' }, { name: 'Iwo' }, { name: 'Modakeke' }, { name: 'Okuku' }, { name: 'Osogbo' }, { name: 'Otan-Ayegbaju' }] },
    { name: 'Oyo', cities: [{ name: 'Eruwa' }, { name: 'Ibadan' }, { name: 'Igbo-Ora' }, { name: 'Igboho' }, { name: 'Iseyin' }, { name: 'Kisi' }, { name: 'Lalupon' }, { name: 'Ogbomosho' }, { name: 'Oyo City' }, { name: 'Saki' }, { name: 'Tede' }] },
    { name: 'Plateau', cities: [{ name: 'Barkin Ladi' }, { name: 'Bassa' }, { name: 'Bukuru' }, { name: 'Jos' }, { name: 'Kuru' }, { name: 'Langtang' }, { name: 'Mangu' }, { name: 'Pankshin' }, { name: 'Riyom' }, { name: 'Shendam' }, { name: 'Vom' }, { name: 'Wase' }] },
    { name: 'Rivers', cities: [{ name: 'Abua' }, { name: 'Ahoada' }, { name: 'Bonny' }, { name: 'Bori' }, { name: 'Buguma' }, { name: 'Degema' }, { name: 'Eleme' }, { name: 'Obio-Akpor' }, { name: 'Okrika' }, { name: 'Omoku' }, { name: 'Onne' }, { name: 'Opobo' }, { name: 'Oyigbo' }, { name: 'Port Harcourt' }] },
    { name: 'Sokoto', cities: [{ name: 'Binji' }, { name: 'Bodinga' }, { name: 'Goronyo' }, { name: 'Gwadabawa' }, { name: 'Illela' }, { name: 'Shagari' }, { name: 'Sokoto' }, { name: 'Tambuwal' }, { name: 'Wurno' }, { name: 'Yabo' }] },
    { name: 'Taraba', cities: [{ name: 'Bali' }, { name: 'Gembu' }, { name: 'Ibi' }, { name: 'Jalingo' }, { name: 'Lau' }, { name: 'Mutum Biyu' }, { name: 'Serti' }, { name: 'Takum' }, { name: 'Wukari' }, { name: 'Zing' }] },
    { name: 'Yobe', cities: [{ name: 'Buni Yadi' }, { name: 'Damaturu' }, { name: 'Fika' }, { name: 'Gashua' }, { name: 'Geidam' }, { name: 'Machina' }, { name: 'Nguru' }, { name: 'Potiskum' }, { name: 'Yunusari' }] },
    { name: 'Zamfara', cities: [{ name: 'Anka' }, { name: 'Bukkuyum' }, { name: 'Gummi' }, { name: 'Gusau' }, { name: 'Kaura Namoda' }, { name: 'Maradun' }, { name: 'Shinkafi' }, { name: 'Talata Mafara' }, { name: 'Tsafe' }, { name: 'Zurmi' }] }
  ]
},
  {
    name: 'Niue',
    code: 'NU',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Alofi' }] }
    ]
  },
  {
    name: 'Norfolk Island',
    code: 'NF',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Kingston' }] }
    ]
  },
  {
    name: 'North Macedonia',
    code: 'MK',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Bitola', cities: [{ name: 'Bitola' }] },
      { name: 'Gostivar', cities: [{ name: 'Gostivar' }] },
      { name: 'Kumanovo', cities: [{ name: 'Kumanovo' }] },
      { name: 'Ohrid', cities: [{ name: 'Ohrid' }] },
      { name: 'Prilep', cities: [{ name: 'Prilep' }] },
      { name: 'Skopje', cities: [{ name: 'Dračevo' }, { name: 'Skopje' }] },
      { name: 'Štip', cities: [{ name: 'Štip' }] },
      { name: 'Strumica', cities: [{ name: 'Strumica' }] },
      { name: 'Tetovo', cities: [{ name: 'Tetovo' }] },
      { name: 'Veles', cities: [{ name: 'Veles' }] }
    ]
  },
  {
    name: 'Northern Mariana Islands',
    code: 'MP',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Capitol Hill' }] }
    ]
  },
  {
    name: 'Norway',
    code: 'NO',
    currency: 'NOK',
    currencySymbol: 'kr',
    states: [
      { name: 'Agder', cities: [{ name: 'Arendal' }, { name: 'Farsund' }, { name: 'Grimstad' }, { name: 'Kosvik' }, { name: 'Kristiansand' }, { name: 'Lyngdal' }, { name: 'Mandal' }, { name: 'Søgne' }, { name: 'Vennesla' }] },
      { name: 'Møre og Romsdal', cities: [{ name: 'Ålesund' }, { name: 'Kristiansund' }, { name: 'Molde' }, { name: 'Ørsta' }, { name: 'Ulstein' }, { name: 'Volda' }] },
      { name: 'Nordland', cities: [{ name: 'Bodø' }, { name: 'Fauske' }, { name: 'Mo i Rana' }, { name: 'Mosjøen' }, { name: 'Narvik' }, { name: 'Svolvær' }] },
      { name: 'Oslo', cities: [{ name: 'Frøn' }, { name: 'Oslo' }] },
      { name: 'Rogaland', cities: [{ name: 'Bryne' }, { name: 'Frøyland' }, { name: 'Haugesund' }, { name: 'Helleland' }, { name: 'Høyland' }, { name: 'Kleppe' }, { name: 'Sandnes' }, { name: 'Stavanger' }, { name: 'Strand' }, { name: 'Time' }] },
      { name: 'Troms og Finnmark', cities: [{ name: 'Alta' }, { name: 'Finnsnes' }, { name: 'Hammerfest' }, { name: 'Harstad' }, { name: 'Kaldsletta' }, { name: 'Kirkenes' }, { name: 'Lenvik' }, { name: 'Tromsdalen' }, { name: 'Tromsø' }, { name: 'Vadsø' }] },
      { name: 'Trøndelag', cities: [{ name: 'Levanger' }, { name: 'Malvik' }, { name: 'Namsos' }, { name: 'Rørvik' }, { name: 'Steinkjer' }, { name: 'Stjørdal' }, { name: 'Stjørdalshalsen' }, { name: 'Trondheim' }, { name: 'Verdal' }] },
      { name: 'Vestfold og Telemark', cities: [{ name: 'Bamble' }, { name: 'Borre' }, { name: 'Horten' }, { name: 'Larvik' }, { name: 'Nøtterøy' }, { name: 'Porsgrunn' }, { name: 'Sand' }, { name: 'Sandefjord' }, { name: 'Skien' }, { name: 'Tønsberg' }] },
      { name: 'Vestland', cities: [{ name: 'Åsane' }, { name: 'Askøy' }, { name: 'Bergen' }, { name: 'Bømlo' }, { name: 'Leirvik' }, { name: 'Lindås' }, { name: 'Os' }, { name: 'Sogndal' }, { name: 'Stord' }, { name: 'Voss' }] },
      { name: 'Viken', cities: [{ name: 'Asker' }, { name: 'Drammen' }, { name: 'Fredrikstad' }, { name: 'Halden' }, { name: 'Lier' }, { name: 'Lørenskog' }, { name: 'Nordre Fåle' }, { name: 'Sandvika' }, { name: 'Sarpsborg' }, { name: 'Ski' }] }
    ]
  },
  {
    name: 'Oman',
    code: 'OM',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Ad Dākhilīyah', cities: [{ name: 'Al Madrah Samā’il' }, { name: 'Bahlā’' }, { name: 'Fanjā’' }, { name: 'Izkī' }, { name: 'Nizwá' }, { name: 'Samā’il' }] },
      { name: 'Al Buraymī', cities: [{ name: 'Al Buraymī' }] },
      { name: 'Az̧ Z̧āhirah', cities: [{ name: '‘Ibrī' }, { name: 'Ḑank' }] },
      { name: 'Janūb al Bāţinah', cities: [{ name: 'Ar Rustāq' }, { name: 'Nakhal' }] },
      { name: 'Janūb ash Sharqīyah', cities: [{ name: 'Şūr' }] },
      { name: 'Masqaţ', cities: [{ name: 'Al ‘Āmirāt' }, { name: 'Bawshar' }, { name: 'Masqaţ' }, { name: 'Maţraḩ' }, { name: 'Muscat' }, { name: 'Qurayyāt' }] },
      { name: 'Musandam', cities: [{ name: 'Khaşab' }] },
      { name: 'Shamāl al Bāţinah', cities: [{ name: 'Aş Şuwayḩirah as Sāḩil' }, { name: 'As Suwayq' }, { name: 'Shināş' }, { name: 'Şuḩār' }] },
      { name: 'Shamāl ash Sharqīyah', cities: [{ name: 'Al Muḑaybī' }, { name: 'Ibrā’' }] },
      { name: 'Z̧ufār', cities: [{ name: 'Al Mazyūnah' }, { name: 'Mirbāţ' }, { name: 'Şalālah' }, { name: 'Ţāqah' }] }
    ]
  },
  {
    name: 'Pakistan',
    code: 'PK',
    currency: 'PKR',
    currencySymbol: '₨',
    states: [
      { name: 'Azad Kashmir', cities: [{ name: 'Awan Patti' }, { name: 'Bagh' }, { name: 'Bhimbar' }, { name: 'Dina' }, { name: 'Hajira' }, { name: 'Hattian Bala' }, { name: 'Kotli' }, { name: 'Muzaffarabad' }, { name: 'New Mirpur' }] },
      { name: 'Balochistan', cities: [{ name: 'Chaman' }, { name: 'Dera Allahyar' }, { name: 'Harnai' }, { name: 'Khuzdar' }, { name: 'Kuchlagh' }, { name: 'Panjgur' }, { name: 'Pishin' }, { name: 'Quetta' }, { name: 'Turbat' }, { name: 'Ziarat' }] },
      { name: 'Gilgit-Baltistan', cities: [{ name: 'Baltit' }, { name: 'Bunji' }, { name: 'Chilas' }, { name: 'Dainyor' }, { name: 'Gakuch' }, { name: 'Jaglot' }, { name: 'Jalalabad' }, { name: 'Khapalu' }, { name: 'Skardu' }, { name: 'Surmon Chogga Grong' }] },
      { name: 'Islamabad', cities: [{ name: 'Islamabad' }, { name: 'Saidpur' }] },
      { name: 'Khyber Pakhtunkhwa', cities: [{ name: 'Abbottabad' }, { name: 'Khwazakhela' }, { name: 'Kohat' }, { name: 'Kumila' }, { name: 'Mardan' }, { name: 'Mingaora' }, { name: 'Nowshera' }, { name: 'Parachinar' }, { name: 'Peshawar' }, { name: 'Swabi' }] },
      { name: 'Punjab', cities: [{ name: 'Bahawalpur' }, { name: 'Faisalabad' }, { name: 'Gujranwala' }, { name: 'Kotla Qasim Khan' }, { name: 'Lahore' }, { name: 'Multan' }, { name: 'Pindi Bhattian' }, { name: 'Rawalpindi' }, { name: 'Sargodha' }, { name: 'Sialkot City' }] },
      { name: 'Sindh', cities: [{ name: 'Hyderabad City' }, { name: 'Karachi' }, { name: 'Khipro' }, { name: 'Larkana' }, { name: 'Mehrabpur' }, { name: 'Nawabshah' }, { name: 'Sanghar' }, { name: 'Shah Latif Town' }, { name: 'Sukkur' }, { name: 'Thari Mir Wah' }] }
    ]
  },
  {
    name: 'Palau',
    code: 'PW',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Koror', cities: [{ name: 'Koror' }] },
      { name: 'Melekeok', cities: [{ name: 'Melekeok' }, { name: 'Ngerulmud' }] }
    ]
  },
  {
    name: 'Panama',
    code: 'PA',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Bocas del Toro', cities: [{ name: 'Almirante' }, { name: 'Bocas del Toro' }, { name: 'Changuinola' }] },
      { name: 'Chiriquí', cities: [{ name: 'Bajo Boquete' }, { name: 'David' }, { name: 'Paso Canoas' }, { name: 'Puerto Armuelles' }] },
      { name: 'Coclé', cities: [{ name: 'Aguadulce' }, { name: 'Penonomé' }] },
      { name: 'Colón', cities: [{ name: 'Cativá' }, { name: 'Colón' }, { name: 'Puerto Pilón' }, { name: 'Sabanitas' }] },
      { name: 'Darién', cities: [{ name: 'Jaqué' }, { name: 'La Palma' }] },
      { name: 'Los Santos', cities: [{ name: 'Las Tablas' }] },
      { name: 'Ngäbe-Buglé', cities: [{ name: 'Buabidi' }, { name: 'Kusapín' }] },
      { name: 'Panamá', cities: [{ name: 'Alcalde Díaz' }, { name: 'Ancón' }, { name: 'Balboa Heights' }, { name: 'Chepo' }, { name: 'Chilibre' }, { name: 'Pacora' }, { name: 'Panama City' }, { name: 'San Miguelito' }, { name: 'Tocumen' }] },
      { name: 'Panamá Oeste', cities: [{ name: 'Arraiján' }, { name: 'El Coco' }, { name: 'La Chorrera' }, { name: 'Nuevo Arraiján' }, { name: 'Puerto Caimito' }] },
      { name: 'Veraguas', cities: [{ name: 'Santiago' }] }
    ]
  },
  {
    name: 'Papua New Guinea',
    code: 'PG',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Bougainville', cities: [{ name: 'Arawa' }, { name: 'Buka' }, { name: 'Kieta' }, { name: 'Sohano' }] },
      { name: 'East Sepik', cities: [{ name: 'Wewak' }] },
      { name: 'Eastern Highlands', cities: [{ name: 'Goroka' }] },
      { name: 'Madang', cities: [{ name: 'Madang' }] },
      { name: 'Morobe', cities: [{ name: 'Bulolo' }, { name: 'Lae' }, { name: 'Wau' }] },
      { name: 'National Capital', cities: [{ name: 'Port Moresby' }] },
      { name: 'Northern', cities: [{ name: 'Popondetta' }] },
      { name: 'Southern Highlands', cities: [{ name: 'Mendi' }] },
      { name: 'West New Britain', cities: [{ name: 'Hoskins' }, { name: 'Kimbe' }] },
      { name: 'Western Highlands', cities: [{ name: 'Mount Hagen' }] }
    ]
  },
  {
    name: 'Paraguay',
    code: 'PY',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Alto Paraná', cities: [{ name: 'Ciudad del Este' }, { name: 'Ñacunday' }, { name: 'Presidente Franco' }] },
      { name: 'Amambay', cities: [{ name: 'Bella Vista' }, { name: 'Capitán Bado' }, { name: 'Pedro Juan Caballero' }] },
      { name: 'Asunción', cities: [{ name: 'Asunción' }] },
      { name: 'Canindeyú', cities: [{ name: 'Francisco Caballero Álvarez' }, { name: 'Katueté' }, { name: 'Salto del Guairá' }, { name: 'Villa Curuguaty' }, { name: 'Villa Ygatimí' }, { name: 'Ypejhú' }] },
      { name: 'Central', cities: [{ name: 'Capiatá' }, { name: 'Fernando de la Mora' }, { name: 'Itá' }, { name: 'Itauguá' }, { name: 'Limpio' }, { name: 'Luque' }, { name: 'Mariano Roque Alonso' }, { name: 'Ñemby' }, { name: 'San Lorenzo' }, { name: 'Villa Elisa' }] },
      { name: 'Concepción', cities: [{ name: 'Arroyito' }, { name: 'Belén' }, { name: 'Concepción' }, { name: 'Horqueta' }, { name: 'Loreto' }, { name: 'San Lázaro' }, { name: 'Yby Yaú' }] },
      { name: 'Cordillera', cities: [{ name: 'Altos' }, { name: 'Arroyos y Esteros' }, { name: 'Atyrá' }, { name: 'Caacupé' }, { name: 'Caraguatay' }, { name: 'Emboscada' }, { name: 'Itacurubí de la Cordillera' }, { name: 'San Bernardino' }, { name: 'Tobatí' }] },
      { name: 'Itapúa', cities: [{ name: 'Coronel Bogado' }, { name: 'Encarnación' }, { name: 'Hohenau' }] },
      { name: 'Misiones', cities: [{ name: 'Ayolas' }, { name: 'San Ignacio' }, { name: 'San Juan Bautista' }, { name: 'Santa Rosa' }] },
      { name: 'Presidente Hayes', cities: [{ name: 'Benjamín Aceval' }, { name: 'Estancia Pozo Colorado' }, { name: 'Pozo Colorado' }, { name: 'Puerto Pinasco' }, { name: 'Teniente Primero Manuel Irala Fernández' }, { name: 'Villa Hayes' }] }
    ]
  },
  {
    name: 'Peru',
    code: 'PE',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Arequipa', cities: [{ name: 'Aplao' }, { name: 'Arequipa' }, { name: 'Camaná' }, { name: 'Chala' }, { name: 'Mollendo' }] },
      { name: 'Callao', cities: [{ name: 'Callao' }] },
      { name: 'Cusco', cities: [{ name: 'Calca' }, { name: 'Cusco' }, { name: 'Pisac' }, { name: 'Quillabamba' }, { name: 'Santo Tomás' }, { name: 'Sicuani' }, { name: 'Urcos' }, { name: 'Urubamba' }] },
      { name: 'Junín', cities: [{ name: 'Chupaca' }, { name: 'Concepción' }, { name: 'Forbe Oroya' }, { name: 'Huancayo' }, { name: 'Jauja' }, { name: 'Junín' }, { name: 'San Ramón' }, { name: 'Satipo' }, { name: 'Tarma' }] },
      { name: 'La Libertad', cities: [{ name: 'Chepén' }, { name: 'Huamachuco' }, { name: 'Huanchaco' }, { name: 'Moche' }, { name: 'Otuzco' }, { name: 'Pacasmayo' }, { name: 'Santiago de Chuco' }, { name: 'Trujillo' }, { name: 'Víctor Larco Herrera' }, { name: 'Virú' }] },
      { name: 'Lambayeque', cities: [{ name: 'Chiclayo' }, { name: 'Ferreñafe' }, { name: 'Lambayeque' }, { name: 'Monsefú' }, { name: 'Motupe' }, { name: 'Olmos' }, { name: 'Puerto Pimentel' }] },
      { name: 'Lima', cities: [{ name: 'Barranca' }, { name: 'Chancay' }, { name: 'Chosica' }, { name: 'Huacho' }, { name: 'Huaral' }, { name: 'Huaura' }, { name: 'Huaycan' }, { name: 'Lima' }, { name: 'Pativilca' }, { name: 'Supe' }] },
      { name: 'Loreto', cities: [{ name: 'Andoas' }, { name: 'Caballococha' }, { name: 'Contamana' }, { name: 'Iquitos' }, { name: 'Nauta' }, { name: 'Puca Urco' }, { name: 'Requena' }, { name: 'Rocafuerte' }, { name: 'Soldado Bartra' }, { name: 'Yurimaguas' }] },
      { name: 'Piura', cities: [{ name: 'Catacaos' }, { name: 'Chulucanas' }, { name: 'La Unión' }, { name: 'Máncora' }, { name: 'Morropón' }, { name: 'Paita' }, { name: 'Piura' }, { name: 'Sechura' }, { name: 'Sullana' }, { name: 'Talara' }] },
      { name: 'Ucayali', cities: [{ name: 'Pucallpa' }] }
    ]
  },
  {
    name: 'Philippines',
    code: 'PH',
    currency: 'PHP',
    currencySymbol: '₱',
    states: [
      { name: 'Cagayan', cities: [{ name: 'Amulung' }, { name: 'Aparri' }, { name: 'Baggao' }, { name: 'Canagatan' }, { name: 'Gattaran' }, { name: 'Lal-lo' }, { name: 'Peñablanca' }, { name: 'Solana' }, { name: 'Tuao' }, { name: 'Tuguegarao' }] },
      { name: 'Caloocan', cities: [{ name: 'Bignay' }, { name: 'Caloocan City' }] },
      { name: 'Cebu', cities: [{ name: 'Balamban' }, { name: 'Carcar' }, { name: 'Cebu City' }, { name: 'Consolacion' }, { name: 'Danao' }, { name: 'Minglanilla' }, { name: 'Naga' }, { name: 'Poblacion' }, { name: 'Talisay' }, { name: 'Toledo' }] },
      { name: 'Davao', cities: [{ name: 'Davao' }] },
      { name: 'Manila', cities: [{ name: 'Malate' }, { name: 'Manila' }, { name: 'Paco' }, { name: 'Pandacan' }, { name: 'Quiapo' }, { name: 'Sampaloc' }, { name: 'Santa Ana' }, { name: 'Santa Cruz' }, { name: 'Santamesa' }, { name: 'Tondo' }] },
      { name: 'Masbate', cities: [{ name: 'Aroroy' }, { name: 'Cataingan' }, { name: 'Cawayan' }, { name: 'Claveria' }, { name: 'Mandaon' }, { name: 'Masbate' }, { name: 'Milagros' }, { name: 'Placer' }, { name: 'San Pascual' }, { name: 'Uson' }] },
      { name: 'Quezon', cities: [{ name: 'Bagong Silangan' }, { name: 'Candelaria' }, { name: 'Infanta' }, { name: 'Lopez' }, { name: 'Pagbilao' }, { name: 'Payatas' }, { name: 'Quezon City' }, { name: 'Sariaya' }, { name: 'Tayabas' }, { name: 'Tiaong' }] },
      { name: 'Rizal', cities: [{ name: 'Angono' }, { name: 'Antipolo' }, { name: 'Baras' }, { name: 'Binangonan' }, { name: 'Cainta' }, { name: 'Rodriguez' }, { name: 'San Andres' }, { name: 'San Mateo' }, { name: 'Tanay' }, { name: 'Taytay' }] },
      { name: 'Taguig', cities: [{ name: 'Bagumbayan' }, { name: 'Bambang' }, { name: 'Central Signal Village' }, { name: 'Lower Bicutan' }, { name: 'Maharlika Village' }, { name: 'Napindan' }, { name: 'Santa Ana' }, { name: 'Taguig City' }, { name: 'Upper Bicutan' }, { name: 'Western Bicutan' }] },
      { name: 'Zamboanga', cities: [{ name: 'Zamboanga City' }] }
    ]
  },
  {
    name: 'Pitcairn Islands',
    code: 'PN',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Adamstown' }] }
    ]
  },
  {
    name: 'Poland',
    code: 'PL',
    currency: 'PLN',
    currencySymbol: 'zł',
    states: [
      { name: 'Dolnośląskie', cities: [{ name: 'Bolesławiec' }, { name: 'Głogów' }, { name: 'Jelenia Góra' }, { name: 'Legnica' }, { name: 'Lubin' }, { name: 'Oława' }, { name: 'Oleśnica' }, { name: 'Świdnica' }, { name: 'Wałbrzych' }, { name: 'Wrocław' }] },
      { name: 'Kujawsko-Pomorskie', cities: [{ name: 'Brodnica' }, { name: 'Bydgoszcz' }, { name: 'Chełmno' }, { name: 'Grudziądz' }, { name: 'Inowrocław' }, { name: 'Nakło nad Notecią' }, { name: 'Rypin' }, { name: 'Świecie' }, { name: 'Toruń' }, { name: 'Włocławek' }] },
      { name: 'Łódzkie', cities: [{ name: 'Bełchatów' }, { name: 'Kutno' }, { name: 'Łódź' }, { name: 'Pabianice' }, { name: 'Piotrków Trybunalski' }, { name: 'Radomsko' }, { name: 'Sieradz' }, { name: 'Skierniewice' }, { name: 'Tomaszów Mazowiecki' }, { name: 'Zgierz' }] },
      { name: 'Lubelskie', cities: [{ name: 'Biała Podlaska' }, { name: 'Biłgoraj' }, { name: 'Chełm' }, { name: 'Kraśnik' }, { name: 'Lublin' }, { name: 'Łuków' }, { name: 'Puławy' }, { name: 'Rury' }, { name: 'Świdnik' }, { name: 'Zamość' }] },
      { name: 'Małopolskie', cities: [{ name: 'Bochnia' }, { name: 'Chrzanów' }, { name: 'Kraków' }, { name: 'Nowy Sącz' }, { name: 'Nowy Targ' }, { name: 'Olkusz' }, { name: 'Oświęcim' }, { name: 'Podgórze' }, { name: 'Tarnów' }, { name: 'Wieliczka' }] },
      { name: 'Mazowieckie', cities: [{ name: 'Legionowo' }, { name: 'Ostrołęka' }, { name: 'Otwock' }, { name: 'Piaseczno' }, { name: 'Płock' }, { name: 'Pruszków' }, { name: 'Radom' }, { name: 'Siedlce' }, { name: 'Warsaw' }, { name: 'Ząbki' }] },
      { name: 'Podlaskie', cities: [{ name: 'Augustów' }, { name: 'Białystok' }, { name: 'Bielsk Podlaski' }, { name: 'Grajewo' }, { name: 'Hajnówka' }, { name: 'Łapy' }, { name: 'Łomża' }, { name: 'Sokółka' }, { name: 'Suwałki' }, { name: 'Zambrów' }] },
      { name: 'Pomorskie', cities: [{ name: 'Chojnice' }, { name: 'Gdańsk' }, { name: 'Gdynia' }, { name: 'Kwidzyn' }, { name: 'Malbork' }, { name: 'Rumia' }, { name: 'Słupsk' }, { name: 'Starogard Gdański' }, { name: 'Tczew' }, { name: 'Wejherowo' }] },
      { name: 'Wielkopolskie', cities: [{ name: 'Gniezno' }, { name: 'Kalisz' }, { name: 'Konin' }, { name: 'Leszno' }, { name: 'Luboń' }, { name: 'Ostrów Wielkopolski' }, { name: 'Piła' }, { name: 'Poznań' }, { name: 'Swarzędz' }, { name: 'Września' }] },
      { name: 'Zachodniopomorskie', cities: [{ name: 'Białogard' }, { name: 'Goleniów' }, { name: 'Kołobrzeg' }, { name: 'Koszalin' }, { name: 'Police' }, { name: 'Stargard Szczeciński' }, { name: 'Świnoujście' }, { name: 'Szczecin' }, { name: 'Szczecinek' }, { name: 'Wałcz' }] }
    ]
  },
  {
    name: 'Portugal',
    code: 'PT',
    currency: 'EUR',
    currencySymbol: '€',
    states: [
      { name: 'Aveiro', cities: [{ name: 'Águeda' }, { name: 'Albergaria-a-Velha' }, { name: 'Anadia' }, { name: 'Aveiro' }, { name: 'Espinho' }, { name: 'Estarreja' }, { name: 'Ílhavo' }, { name: 'Oliveira do Bairro' }, { name: 'Ovar' }, { name: 'Vale de Cambra' }] },
      { name: 'Braga', cities: [{ name: 'Amares' }, { name: 'Barcelos' }, { name: 'Braga' }, { name: 'Celorico de Basto' }, { name: 'Esposende' }, { name: 'Fafe' }, { name: 'Famalicão' }, { name: 'Guimarães' }, { name: 'Póvoa de Lanhoso' }, { name: 'Vila Verde' }] },
      { name: 'Coimbra', cities: [{ name: 'Cantanhede' }, { name: 'Coimbra' }, { name: 'Condeixa-a-Nova' }, { name: 'Figueira da Foz' }, { name: 'Lousã' }, { name: 'Montemor-o-Velho' }, { name: 'Oliveira do Hospital' }, { name: 'Penacova' }, { name: 'São Martinho do Bispo' }, { name: 'Soure' }] },
      { name: 'Leiria', cities: [{ name: 'Alcobaça' }, { name: 'Batalha' }, { name: 'Bombarral' }, { name: 'Caldas da Rainha' }, { name: 'Leiria' }, { name: 'Marinha Grande' }, { name: 'Nazaré' }, { name: 'Peniche' }, { name: 'Pombal' }, { name: 'Porto de Mós' }] },
      { name: 'Lisboa', cities: [{ name: 'Amadora' }, { name: 'Cascais' }, { name: 'Lisbon' }, { name: 'Loures' }, { name: 'Odivelas' }, { name: 'Oeiras' }, { name: 'Queluz' }, { name: 'Sintra' }, { name: 'Torres Vedras' }, { name: 'Vila Franca de Xira' }] },
      { name: 'Madeira', cities: [{ name: 'Calheta' }, { name: 'Câmara de Lobos' }, { name: 'Caniço' }, { name: 'Estreito de Câmara de Lobos' }, { name: 'Funchal' }, { name: 'Machico' }, { name: 'Ponta do Sol' }, { name: 'Ribeira Brava' }, { name: 'Santa Cruz' }] },
      { name: 'Porto', cities: [{ name: 'Aves' }, { name: 'Gondomar' }, { name: 'Maia' }, { name: 'Matosinhos' }, { name: 'Paredes' }, { name: 'Penafiel' }, { name: 'Porto' }, { name: 'Valongo' }, { name: 'Vila do Conde' }, { name: 'Vila Nova de Gaia' }] },
      { name: 'Setúbal', cities: [{ name: 'Almada' }, { name: 'Amora' }, { name: 'Barreiro' }, { name: 'Corroios' }, { name: 'Moita' }, { name: 'Montijo' }, { name: 'Palmela' }, { name: 'Seixal' }, { name: 'Sesimbra' }, { name: 'Vale de Cavalos' }] },
      { name: 'Viana do Castelo', cities: [{ name: 'Arcos de Valdevez' }, { name: 'Melgaço' }, { name: 'Monção' }, { name: 'Paredes de Coura' }, { name: 'Ponte da Barca' }, { name: 'Ponte de Lima' }, { name: 'Valença' }, { name: 'Viana do Castelo' }, { name: 'Vila Nova de Cerveira' }] },
      { name: 'Viseu', cities: [{ name: 'Castro Daire' }, { name: 'Cinfães' }, { name: 'Lamego' }, { name: 'Mangualde' }, { name: 'Nelas' }, { name: 'Santa Comba Dão' }, { name: 'São Pedro do Sul' }, { name: 'Sátão' }, { name: 'Tondela' }, { name: 'Viseu' }] }
    ]
  },
  {
    name: 'Puerto Rico',
    code: 'PR',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Puerto Rico', cities: [{ name: 'Aguadilla' }, { name: 'Arecibo' }, { name: 'Bayamón' }, { name: 'Caguas' }, { name: 'Carolina' }, { name: 'Guaynabo' }, { name: 'Mayagüez' }, { name: 'Ponce' }, { name: 'San Germán' }, { name: 'San Juan' }] }
    ]
  },
  {
    name: 'Qatar',
    code: 'QA',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Ad Dawḩah', cities: [{ name: 'Doha' }, { name: 'Nu‘ayjah' }] },
      { name: 'Al Khawr wa adh Dhakhīrah', cities: [{ name: 'Al Khawr' }] },
      { name: 'Al Wakrah', cities: [{ name: 'Al Wakrah' }] },
      { name: 'Ar Rayyān', cities: [{ name: 'Ar Rayyān' }, { name: 'Umm Qurūn' }] },
      { name: 'Ash Shamāl', cities: [{ name: 'Madīnat ash Shamāl' }] },
      { name: 'Ash Shīḩānīyah', cities: [{ name: 'Al Jumaylīyah' }, { name: 'Ash Shīḩānīyah' }, { name: 'Laqţah' }] },
      { name: 'Az̧ Z̧a‘āyin', cities: [{ name: 'Az̧ Z̧a‘āyin' }] },
      { name: 'Umm Şalāl', cities: [{ name: 'Umm Şalāl ‘Alī' }] }
    ]
  },
  {
    name: 'Reunion',
    code: 'RE',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Saint-Benoît' }, { name: 'Saint-Denis' }] }
    ]
  },
  {
    name: 'Romania',
    code: 'RO',
    currency: 'RON',
    currencySymbol: 'lei',
    states: [
      { name: 'Bihor', cities: [{ name: 'Aleşd' }, { name: 'Beiuş' }, { name: 'Marghita' }, { name: 'Oradea' }, { name: 'Săcueni' }, { name: 'Salonta' }, { name: 'Valea lui Mihai' }] },
      { name: 'Braşov', cities: [{ name: 'Braşov' }, { name: 'Codlea' }, { name: 'Făgăraş' }, { name: 'Râşnov' }, { name: 'Săcele' }, { name: 'Sânpetru' }, { name: 'Zărneşti' }] },
      { name: 'Bucureşti', cities: [{ name: 'Bucharest' }, { name: 'Fundeni' }, { name: 'Roşu' }, { name: 'Voluntari' }] },
      { name: 'Cluj', cities: [{ name: 'Apahida' }, { name: 'Baciu' }, { name: 'Câmpia Turzii' }, { name: 'Cluj-Napoca' }, { name: 'Dej' }, { name: 'Floreşti' }, { name: 'Gherla' }, { name: 'Turda' }] },
      { name: 'Constanţa', cities: [{ name: 'Cernavodă' }, { name: 'Constanţa' }, { name: 'Cumpăna' }, { name: 'Lumina' }, { name: 'Mangalia' }, { name: 'Medgidia' }, { name: 'Murfatlar' }, { name: 'Năvodari' }, { name: 'Ovidiu' }, { name: 'Valu lui Traian' }] },
      { name: 'Dolj', cities: [{ name: 'Băileşti' }, { name: 'Calafat' }, { name: 'Craiova' }, { name: 'Dăbuleni' }, { name: 'Filiaşi' }, { name: 'Poiana Mare' }] },
      { name: 'Galaţi', cities: [{ name: 'Galaţi' }, { name: 'Lieşti' }, { name: 'Matca' }, { name: 'Pechea' }, { name: 'Tecuci' }] },
      { name: 'Iaşi', cities: [{ name: 'Hârlău' }, { name: 'Iaşi' }, { name: 'Lunca Cetăţuii' }, { name: 'Paşcani' }, { name: 'Podu Iloaiei' }, { name: 'Târgu Frumos' }, { name: 'Tomeşti' }, { name: 'Valea Adâncă' }, { name: 'Valea Lupului' }] },
      { name: 'Prahova', cities: [{ name: 'Băicoi' }, { name: 'Boldeşti-Scăeni' }, { name: 'Breaza' }, { name: 'Câmpina' }, { name: 'Comarnic' }, { name: 'Mizil' }, { name: 'Ploieşti' }, { name: 'Sinaia' }, { name: 'Urlaţi' }, { name: 'Vălenii de Munte' }] },
      { name: 'Timiş', cities: [{ name: 'Dumbrăviţa' }, { name: 'Giroc' }, { name: 'Jimbolia' }, { name: 'Lugoj' }, { name: 'Sânnicolau Mare' }, { name: 'Timişoara' }] }
    ]
  },
  {
    name: 'Russia',
    code: 'RU',
    currency: 'RUB',
    currencySymbol: '₽',
    states: [
      { name: 'Chelyabinskaya Oblast’', cities: [{ name: 'Chebarkul' }, { name: 'Chelyabinsk' }, { name: 'Kopeysk' }, { name: 'Magnitogorsk' }, { name: 'Miass' }, { name: 'Ozërsk' }, { name: 'Satka' }, { name: 'Snezhinsk' }, { name: 'Troitsk' }, { name: 'Zlatoust' }] },
      { name: 'Krasnodarskiy Kray', cities: [{ name: 'Anapa' }, { name: 'Armavir' }, { name: 'Belorechensk' }, { name: 'Gelendzhik' }, { name: 'Krasnodar' }, { name: 'Kropotkin' }, { name: 'Novorossiysk' }, { name: 'Sochi' }, { name: 'Tikhoretsk' }, { name: 'Yeysk' }] },
      { name: 'Moskva', cities: [{ name: 'Moscow' }, { name: 'Orekhovo-Borisovo Yuzhnoye' }] },
      { name: 'Nizhegorodskaya Oblast’', cities: [{ name: 'Arzamas' }, { name: 'Bor' }, { name: 'Dzerzhinsk' }, { name: 'Kstovo' }, { name: 'Kulebaki' }, { name: 'Nizhniy Novgorod' }, { name: 'Novaya Balakhna' }, { name: 'Pavlovo' }, { name: 'Vyksa' }, { name: 'Zavolzhye' }] },
      { name: 'Novosibirskaya Oblast’', cities: [{ name: 'Barabinsk' }, { name: 'Berdsk' }, { name: 'Cherepanovo' }, { name: 'Chulym' }, { name: 'Iskitim' }, { name: 'Karasuk' }, { name: 'Kupino' }, { name: 'Novosibirsk' }, { name: 'Ob' }, { name: 'Toguchin' }] },
      { name: 'Rostovskaya Oblast’', cities: [{ name: 'Azov' }, { name: 'Bataysk' }, { name: 'Gukovo' }, { name: 'Kamensk-Shakhtinskiy' }, { name: 'Novocherkassk' }, { name: 'Novoshakhtinsk' }, { name: 'Rostov' }, { name: 'Shakhty' }, { name: 'Taganrog' }, { name: 'Volgodonsk' }] },
      { name: 'Samarskaya Oblast’', cities: [{ name: 'Chapayevsk' }, { name: 'Kinel' }, { name: 'Novokuybyshevsk' }, { name: 'Oktyabrsk' }, { name: 'Otradnyy' }, { name: 'Pokhvistnevo' }, { name: 'Samara' }, { name: 'Syzran' }, { name: 'Tolyatti' }, { name: 'Zhigulevsk' }] },
      { name: 'Sankt-Peterburg', cities: [{ name: 'Kolpino' }, { name: 'Saint Petersburg' }] },
      { name: 'Sverdlovskaya Oblast’', cities: [{ name: 'Asbest' }, { name: 'Berëzovskiy' }, { name: 'Kamensk-Ural’skiy' }, { name: 'Nizhniy Tagil' }, { name: 'Novouralsk' }, { name: 'Pervouralsk' }, { name: 'Revda' }, { name: 'Serov' }, { name: 'Verkhnyaya Pyshma' }, { name: 'Yekaterinburg' }] },
      { name: 'Tatarstan', cities: [{ name: 'Almetyevsk' }, { name: 'Bugulma' }, { name: 'Chistopol' }, { name: 'Kazan' }, { name: 'Leninogorsk' }, { name: 'Naberezhnyye Chelny' }, { name: 'Nizhnekamsk' }, { name: 'Yelabuga' }, { name: 'Zainsk' }, { name: 'Zelënodol’sk' }] }
    ]
  },
  {
    name: 'Rwanda',
    code: 'RW',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Eastern Province', cities: [{ name: 'Gahini' }, { name: 'Gatunda' }, { name: 'Kabarore' }, { name: 'Kibungo' }, { name: 'Nyamata' }, { name: 'Rwamagana' }] },
      { name: 'Kigali', cities: [{ name: 'Kabuga' }, { name: 'Kigali' }] },
      { name: 'Northern Province', cities: [{ name: 'Busogo' }, { name: 'Byumba' }, { name: 'Cyanika I' }, { name: 'Cyuve' }, { name: 'Murambi' }, { name: 'Ruhengeri' }, { name: 'Shyorongi' }] },
      { name: 'Southern Province', cities: [{ name: 'Butare' }, { name: 'Gikongoro' }, { name: 'Gitarama' }, { name: 'Kibeho' }, { name: 'Muhanga' }, { name: 'Ndora' }, { name: 'Nyanza' }, { name: 'Ruhango' }, { name: 'Save' }] },
      { name: 'Western Province', cities: [{ name: 'Bugarama' }, { name: 'Cyangugu' }, { name: 'Gisenyi' }, { name: 'Kibuye' }, { name: 'Ngororero' }, { name: 'Rubengera' }] }
    ]
  },
  {
    name: 'Saint Barthelemy',
    code: 'BL',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Gustavia' }] }
    ]
  },
  {
    name: 'Saint Helena, Ascension, and Tristan da Cunha',
    code: 'SH',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Ascension', cities: [{ name: 'Georgetown' }] },
      { name: 'Saint Helena', cities: [{ name: 'Jamestown' }] },
      { name: 'Tristan da Cunha', cities: [{ name: 'Edinburgh of the Seven Seas' }] }
    ]
  },
  {
    name: 'Saint Kitts and Nevis',
    code: 'KN',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Saint George Basseterre', cities: [{ name: 'Basseterre' }] }
    ]
  },
  {
    name: 'Saint Lucia',
    code: 'LC',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Castries', cities: [{ name: 'Bisee' }, { name: 'Castries' }] },
      { name: 'Gros-Islet', cities: [{ name: 'Gros Islet' }] },
      { name: 'Micoud', cities: [{ name: 'Micoud' }] },
      { name: 'Vieux-Fort', cities: [{ name: 'Vieux Fort' }] }
    ]
  },
  {
    name: 'Saint Martin',
    code: 'MF',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Marigot' }] }
    ]
  },
  {
    name: 'Saint Pierre and Miquelon',
    code: 'PM',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Saint-Pierre' }] }
    ]
  },
  {
    name: 'Saint Vincent and the Grenadines',
    code: 'VC',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Saint George', cities: [{ name: 'Calliaqua' }, { name: 'Kingstown' }] }
    ]
  },
  {
    name: 'Samoa',
    code: 'WS',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'A‘ana', cities: [{ name: 'Leulumoega' }] },
      { name: 'Aiga-i-le-Tai', cities: [{ name: 'Mulifanua' }] },
      { name: 'Atua', cities: [{ name: 'Lufilufi' }] },
      { name: 'Fa‘asaleleaga', cities: [{ name: 'Safotulafai' }] },
      { name: 'Gaga‘emauga', cities: [{ name: 'Saleaula' }] },
      { name: 'Gagaifomauga', cities: [{ name: 'Safotu' }] },
      { name: 'Palauli', cities: [{ name: 'Vailoa' }] },
      { name: 'Tuamasaga', cities: [{ name: 'Afega' }, { name: 'Apia' }] },
      { name: 'Va‘a-o-Fonoti', cities: [{ name: 'Samamea' }] },
      { name: 'Vaisigano', cities: [{ name: 'Asau' }] }
    ]
  },
  {
    name: 'San Marino',
    code: 'SM',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Acquaviva', cities: [{ name: 'Acquaviva' }] },
      { name: 'Borgo Maggiore', cities: [{ name: 'Borgo Maggiore' }] },
      { name: 'Chiesanuova', cities: [{ name: 'Chiesanuova' }] },
      { name: 'Domagnano', cities: [{ name: 'Domagnano' }] },
      { name: 'Faetano', cities: [{ name: 'Faetano' }] },
      { name: 'Fiorentino', cities: [{ name: 'Fiorentino' }] },
      { name: 'Montegiardino', cities: [{ name: 'Montegiardino' }] },
      { name: 'San Marino Città', cities: [{ name: 'San Marino' }] },
      { name: 'Serravalle', cities: [{ name: 'Serravalle' }] }
    ]
  },
  {
    name: 'Sao Tome and Principe',
    code: 'ST',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Água Grande', cities: [{ name: 'São Tomé' }] },
      { name: 'Cantagalo', cities: [{ name: 'Santana' }] },
      { name: 'Caué', cities: [{ name: 'São João dos Angolares' }] },
      { name: 'Lembá', cities: [{ name: 'Neves' }] },
      { name: 'Lobata', cities: [{ name: 'Guadalupe' }] },
      { name: 'Mé-Zóchi', cities: [{ name: 'Trindade' }] },
      { name: 'Príncipe', cities: [{ name: 'Santo António' }] }
    ]
  },
  {
    name: 'Saudi Arabia',
    code: 'SA',
    currency: 'SAR',
    currencySymbol: '﷼',
    states: [
      { name: '‘Asīr', cities: [{ name: 'Abhā' }, { name: 'Al Majāridah' }, { name: 'An Nimāş' }, { name: 'Khamīs Mushayţ' }, { name: 'Qal‘at Bīshah' }] },
      { name: 'Al Jawf', cities: [{ name: 'Al Qurayyāt' }, { name: 'Dawmat al Jandal' }, { name: 'Ḩaql' }, { name: 'Qārā' }, { name: 'Sakākā' }] },
      { name: 'Al Madīnah al Munawwarah', cities: [{ name: 'Badr Ḩunayn' }, { name: 'Medina' }, { name: 'Yanbu‘' }] },
      { name: 'Al Qaşīm', cities: [{ name: '‘Unayzah' }, { name: 'Al Midhnab' }, { name: 'Ar Rass' }, { name: 'Buraydah' }, { name: 'Ḑulay‘ Rashīd' }] },
      { name: 'Ar Riyāḑ', cities: [{ name: 'Ad Dir‘īyah' }, { name: 'Al Ghāţ' }, { name: 'Al Ḩā’ir' }, { name: 'Al Kharj' }, { name: 'Al Majma‘ah' }, { name: 'As Sulayyil' }, { name: 'Az Zulfī' }, { name: 'Ḩawţat Sudayr' }, { name: 'Riyadh' }, { name: 'Shaqrā’' }] },
      { name: 'Ash Sharqīyah', cities: [{ name: 'Ad Dammām' }, { name: 'Al Hufūf' }, { name: 'Al Jubayl' }, { name: 'Al Khubar' }, { name: 'Al Mubarraz' }, { name: 'Al Qaţīf' }, { name: 'Ḩafr al Bāţin' }, { name: 'Ḩaraḑ' }, { name: 'Ra’s al Khafjī' }, { name: 'Sayhāt' }] },
      { name: 'Ḩā’il', cities: [{ name: 'Ash Shinān' }, { name: 'Ḩā’il' }] },
      { name: 'Jāzān', cities: [{ name: 'Ad Darb' }, { name: 'Al ‘Aydābī' }, { name: 'Al Aḩad al Masāriḩah' }, { name: 'Jāzān' }, { name: 'Şabyā' }] },
      { name: 'Makkah al Mukarramah', cities: [{ name: 'Al Ḩawīyah' }, { name: 'Al Līth' }, { name: 'Al Qunfudhah' }, { name: 'Aţ Ţā’if' }, { name: 'Jeddah' }, { name: 'Khulayş' }, { name: 'Mecca' }] },
      { name: 'Tabūk', cities: [{ name: 'Al Wajh' }, { name: 'Ḑubā' }, { name: 'Tabūk' }] }
    ]
  },
  {
    name: 'Senegal',
    code: 'SN',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Dakar', cities: [{ name: 'Bargny' }, { name: 'Dakar' }, { name: 'Diamniadio' }, { name: 'Guédiawaye' }, { name: 'Pikine' }, { name: 'Rufisque' }, { name: 'Sébikhotane' }] },
      { name: 'Diourbel', cities: [{ name: 'Diourbel' }, { name: 'Mbaké' }, { name: 'Touba' }] },
      { name: 'Kaffrine', cities: [{ name: 'Kaffrine' }, { name: 'Koungheul' }, { name: 'Malème Hodar' }] },
      { name: 'Kaolack', cities: [{ name: 'Kaolack' }, { name: 'Nioro du Rip' }, { name: 'Paoskoto' }] },
      { name: 'Kolda', cities: [{ name: 'Kolda' }, { name: 'Vélingara' }] },
      { name: 'Louga', cities: [{ name: 'Dara' }, { name: 'Guéoul' }, { name: 'Kébémer' }, { name: 'Linguère' }, { name: 'Louga' }] },
      { name: 'Saint-Louis', cities: [{ name: 'Dagana' }, { name: 'Richard-Toll' }, { name: 'Ross-Bétio' }, { name: 'Saint-Louis' }] },
      { name: 'Tambacounda', cities: [{ name: 'Bakel' }, { name: 'Diabougou' }, { name: 'Kidira' }, { name: 'Koumpentoum' }, { name: 'Tambacounda' }] },
      { name: 'Thiès', cities: [{ name: 'Joal-Fadiout' }, { name: 'Khombole' }, { name: 'Malikounda' }, { name: 'Mbour' }, { name: 'Mékhé' }, { name: 'Nguékhokh' }, { name: 'Sali' }, { name: 'Thiès' }, { name: 'Tiadiaye' }, { name: 'Tivaouane' }] },
      { name: 'Ziguinchor', cities: [{ name: 'Bignona' }, { name: 'Tionk Essil' }, { name: 'Ziguinchor' }] }
    ]
  },
  {
    name: 'Serbia',
    code: 'RS',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Beograd', cities: [{ name: 'Batajnica' }, { name: 'Belgrade' }, { name: 'Borča' }, { name: 'Kaluđerica' }, { name: 'Lazarevac' }, { name: 'Mladenovac' }, { name: 'Sremčica' }, { name: 'Surčin' }, { name: 'Ugrinovci' }, { name: 'Zemun' }] },
      { name: 'Kragujevac', cities: [{ name: 'Kragujevac' }] },
      { name: 'Loznica', cities: [{ name: 'Loznica' }] },
      { name: 'Niš', cities: [{ name: 'Niš' }, { name: 'Niška Banja' }] },
      { name: 'Novi Sad', cities: [{ name: 'Novi Sad' }, { name: 'Petrovaradin' }] },
      { name: 'Pančevo', cities: [{ name: 'Pančevo' }] },
      { name: 'Šabac', cities: [{ name: 'Šabac' }] },
      { name: 'Smederevo', cities: [{ name: 'Smederevo' }] },
      { name: 'Sremska Mitrovica', cities: [{ name: 'Sremska Mitrovica' }] },
      { name: 'Valjevo', cities: [{ name: 'Valjevo' }] }
    ]
  },
  {
    name: 'Seychelles',
    code: 'SC',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Mont Buxton', cities: [{ name: 'Victoria' }] }
    ]
  },
  {
    name: 'Sierra Leone',
    code: 'SL',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Eastern', cities: [{ name: 'Kailahun' }, { name: 'Kenema' }, { name: 'Koidu' }, { name: 'Koidu-Bulma' }, { name: 'Motema' }, { name: 'Pendembu' }, { name: 'Segbwema' }, { name: 'Tongoma' }, { name: 'Yengema' }] },
      { name: 'North Western', cities: [{ name: 'Port Loko' }] },
      { name: 'Northern', cities: [{ name: 'Binkolo' }, { name: 'Kabala' }, { name: 'Kambia' }, { name: 'Lunsar' }, { name: 'Magburaka' }, { name: 'Makeni' }, { name: 'Rokupr' }] },
      { name: 'Southern', cities: [{ name: 'Bo' }, { name: 'Bonthe' }, { name: 'Bumpe' }, { name: 'Gandorhun' }, { name: 'Mongeri' }, { name: 'Moyamba' }, { name: 'Pujehun' }] },
      { name: 'Western Area', cities: [{ name: 'Benguema' }, { name: 'Freetown' }, { name: 'Leicester' }, { name: 'Newton' }] }
    ]
  },
  {
    name: 'Singapore',
    code: 'SG',
    currency: 'SGD',
    currencySymbol: 'S$',
    states: [
      { name: 'Unknown', cities: [{ name: 'Singapore' }] }
    ]
  },
  {
    name: 'Sint Maarten',
    code: 'SX',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Philipsburg' }] }
    ]
  },
  {
    name: 'Slovakia',
    code: 'SK',
    currency: 'EUR',
    currencySymbol: '€',
    states: [
      { name: 'Banská Bystrica', cities: [{ name: 'Banská Bystrica' }, { name: 'Brezno' }, { name: 'Detva' }, { name: 'Fiľakovo' }, { name: 'Lučenec' }, { name: 'Revúca' }, { name: 'Rimavská Sobota' }, { name: 'Veľký Krtíš' }, { name: 'Žiar nad Hronom' }, { name: 'Zvolen' }] },
      { name: 'Bratislava', cities: [{ name: 'Bernolákovo' }, { name: 'Bratislava' }, { name: 'Malacky' }, { name: 'Modra' }, { name: 'Petržalka' }, { name: 'Pezinok' }, { name: 'Senec' }, { name: 'Stupava' }] },
      { name: 'Košice', cities: [{ name: 'Košice' }, { name: 'Krompachy' }, { name: 'Michalovce' }, { name: 'Moldava nad Bodvou' }, { name: 'Rožňava' }, { name: 'Sečovce' }, { name: 'Smižany' }, { name: 'Spišská Nová Ves' }, { name: 'Trebišov' }, { name: 'Veľké Kapušany' }] },
      { name: 'Nitra', cities: [{ name: 'Dubnica nad Váhom' }, { name: 'Komárno' }, { name: 'Levice' }, { name: 'Nitra' }, { name: 'Nové Zámky' }, { name: 'Partizánske' }, { name: 'Považská Bystrica' }, { name: 'Prievidza' }, { name: 'Šaľa' }, { name: 'Topoľčany' }] },
      { name: 'Prešov', cities: [{ name: 'Bardejov' }, { name: 'Humenné' }, { name: 'Kežmarok' }, { name: 'Levoča' }, { name: 'Poprad' }, { name: 'Prešov' }, { name: 'Sabinov' }, { name: 'Snina' }, { name: 'Stará Ľubovňa' }, { name: 'Vranov nad Topľou' }] },
      { name: 'Trenčin', cities: [{ name: 'Trenčín' }] },
      { name: 'Trnava', cities: [{ name: 'Dunajská Streda' }, { name: 'Galanta' }, { name: 'Hlohovec' }, { name: 'Holíč' }, { name: 'Piešťany' }, { name: 'Šamorín' }, { name: 'Senica' }, { name: 'Sered’' }, { name: 'Skalica' }, { name: 'Trnava' }] },
      { name: 'Žilina', cities: [{ name: 'Bytča' }, { name: 'Čadca' }, { name: 'Dolný Kubín' }, { name: 'Kysucké Nové Mesto' }, { name: 'Liptovský Mikuláš' }, { name: 'Martin' }, { name: 'Ružomberok' }, { name: 'Tvrdošín' }, { name: 'Žilina' }] }
    ]
  },
  {
    name: 'Slovenia',
    code: 'SI',
    currency: 'EUR',
    currencySymbol: '€',
    states: [
      { name: 'Celje', cities: [{ name: 'Celje' }] },
      { name: 'Kamnik', cities: [{ name: 'Kamnik' }] },
      { name: 'Koper', cities: [{ name: 'Koper' }] },
      { name: 'Kranj', cities: [{ name: 'Kranj' }] },
      { name: 'Ljubljana', cities: [{ name: 'Ljubljana' }] },
      { name: 'Maribor', cities: [{ name: 'Maribor' }] },
      { name: 'Novo Mesto', cities: [{ name: 'Novo Mesto' }] },
      { name: 'Ptuj', cities: [{ name: 'Ptuj' }] },
      { name: 'Trbovlje', cities: [{ name: 'Trbovlje' }] },
      { name: 'Velenje', cities: [{ name: 'Velenje' }] }
    ]
  },
  {
    name: 'Solomon Islands',
    code: 'SB',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Central', cities: [{ name: 'Tulagi' }] },
      { name: 'Choiseul', cities: [{ name: 'Taro' }] },
      { name: 'Honiara', cities: [{ name: 'Honiara' }] },
      { name: 'Isabel', cities: [{ name: 'Buala' }] },
      { name: 'Makira and Ulawa', cities: [{ name: 'Kirakira' }] },
      { name: 'Malaita', cities: [{ name: 'Auki' }] },
      { name: 'Rennell and Bellona', cities: [{ name: 'Tigoa' }] },
      { name: 'Temotu', cities: [{ name: 'Lata' }] },
      { name: 'Western', cities: [{ name: 'Gizo' }] }
    ]
  },
  {
    name: 'Somalia',
    code: 'SO',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Banaadir', cities: [{ name: 'Mogadishu' }] },
      { name: 'Bari', cities: [{ name: 'Bandar Murcaayo' }, { name: 'Bandarbeyla' }, { name: 'Boosaaso' }, { name: 'Caluula' }, { name: 'Dan Gorayo' }, { name: 'Hurdiyo' }, { name: 'Qandala' }, { name: 'Qardho' }, { name: 'Ufeyn' }, { name: 'Xaafuun' }] },
      { name: 'Bay', cities: [{ name: 'Baidoa' }, { name: 'Buurhakaba' }, { name: 'Diinsoor' }] },
      { name: 'Galguduud', cities: [{ name: 'Baxdo' }, { name: 'Cadaado' }, { name: 'Ceel Dheere' }, { name: 'Ceelbuur' }, { name: 'Dhuusamarreeb' }, { name: 'Gadoon' }, { name: 'Godinlabe' }, { name: 'Mereeg' }] },
      { name: 'Gedo', cities: [{ name: 'Baardheere' }, { name: 'Barwaaqo' }, { name: 'Bura' }, { name: 'Busaar' }, { name: 'Caracase' }, { name: 'Garbahaarrey' }, { name: 'Luuq' }, { name: 'Uar Esgudud' }] },
      { name: 'Mudug', cities: [{ name: 'Bacaadweyn' }, { name: 'Gaalkacyo' }, { name: 'Hobyo' }, { name: 'Wisil' }, { name: 'Xarardheere' }] },
      { name: 'Nugaal', cities: [{ name: 'Eyl' }, { name: 'Garoowe' }] },
      { name: 'Shabeellaha Dhexe', cities: [{ name: 'Cadale' }, { name: 'Ceel Baraf' }, { name: 'Jawhar' }] },
      { name: 'Togdheer', cities: [{ name: 'Burco' }, { name: 'Buuhoodle' }, { name: 'Kiridh' }, { name: 'Oodweyne' }, { name: 'Qoorlugud' }, { name: 'Widhwidh' }] },
      { name: 'Woqooyi Galbeed', cities: [{ name: 'Berbera' }, { name: 'Hargeysa' }] }
    ]
  },
  {
    name: 'South Africa',
    code: 'ZA',
    currency: 'ZAR',
    currencySymbol: 'R',
    states: [
      { name: 'Eastern Cape', cities: [{ name: 'Bethelsdorp' }, { name: 'Despatch' }, { name: 'East London' }, { name: 'Gqeberha' }, { name: 'Graaff-Reinet' }, { name: 'Grahamstown' }, { name: 'Humansdorp' }, { name: 'Mthatha' }, { name: 'Queenstown' }, { name: 'Uitenhage' }] },
      { name: 'Free State', cities: [{ name: 'Bloemfontein' }, { name: 'Harrismith' }, { name: 'Hoopstad' }, { name: 'Kroonstad' }, { name: 'Odendaalsrus' }, { name: 'Phuthaditjhaba' }, { name: 'Sasolburg' }, { name: 'Thaba Nchu' }, { name: 'Virginia' }, { name: 'Welkom' }] },
      { name: 'Gauteng', cities: [{ name: 'Boksburg' }, { name: 'Centurion' }, { name: 'Germiston' }, { name: 'Johannesburg' }, { name: 'Katlehong' }, { name: 'Pretoria' }, { name: 'Randburg' }, { name: 'Roodepoort' }, { name: 'Sandton' }, { name: 'Soweto' }] },
      { name: 'KwaZulu-Natal', cities: [{ name: 'Durban' }, { name: 'Empangeni' }, { name: 'KwaDukuza' }, { name: 'Ladysmith' }, { name: 'Newcastle' }, { name: 'Nqutu' }, { name: 'Pietermaritzburg' }, { name: 'Pinetown' }, { name: 'Queensburgh' }, { name: 'Richards Bay' }] },
      { name: 'Limpopo', cities: [{ name: 'Acornhoek' }, { name: 'Giyani' }, { name: 'Lebowakgomo' }, { name: 'Mankoeng' }, { name: 'Musina' }, { name: 'Namakgale' }, { name: 'Polokwane' }, { name: 'Thabazimbi' }, { name: 'Thohoyandou' }, { name: 'Zebediela' }] },
      { name: 'Mpumalanga', cities: [{ name: 'Bethal' }, { name: 'Ermelo' }, { name: 'Kwaggafontein' }, { name: 'Lydenburg' }, { name: 'Middelburg' }, { name: 'Secunda' }, { name: 'Siyabuswa' }, { name: 'Standerton' }, { name: 'Volksrust' }, { name: 'Witbank' }] },
      { name: 'North West', cities: [{ name: 'Brits' }, { name: 'Klerksdorp' }, { name: 'Mahikeng' }, { name: 'Makan' }, { name: 'Mmabatho' }, { name: 'Phokeng' }, { name: 'Potchefstroom' }, { name: 'Rustenburg' }, { name: 'Schweizer-Reineke' }, { name: 'Winterveld' }] },
      { name: 'Northern Cape', cities: [{ name: 'Barkly West' }, { name: 'Colesberg' }, { name: 'De Aar' }, { name: 'Douglas' }, { name: 'Kimberley' }, { name: 'Postmasburg' }, { name: 'Prieska' }, { name: 'Ritchie' }, { name: 'Upington' }, { name: 'Warrenton' }] },
      { name: 'Western Cape', cities: [{ name: 'Cape Town' }, { name: 'George' }, { name: 'Khayelitsha' }, { name: 'Knysna' }, { name: 'Mitchells Plain' }, { name: 'Mossel Bay' }, { name: 'Paarl' }, { name: 'Parow' }, { name: 'Stellenbosch' }, { name: 'Worcester' }] }
    ]
  },
  {
    name: 'South Georgia and South Sandwich Islands',
    code: 'GS',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Grytviken' }] }
    ]
  },
  {
    name: 'South Georgia And South Sandwich Islands',
    code: 'GS',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'King Edward Point' }] }
    ]
  },
  {
    name: 'South Sudan',
    code: 'SS',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Central Equatoria', cities: [{ name: 'Juba' }, { name: 'Kajo Kaji' }, { name: 'Yei' }] },
      { name: 'Eastern Equatoria', cities: [{ name: 'Farajok' }, { name: 'Ikoto' }, { name: 'Kapoeta' }, { name: 'Magwe' }, { name: 'Nimule' }, { name: 'Torit' }] },
      { name: 'Jonglei', cities: [{ name: 'Bor' }] },
      { name: 'Lakes', cities: [{ name: 'Rumbek' }, { name: 'Yirol' }] },
      { name: 'Northern Bahr el Ghazal', cities: [{ name: 'Aweil' }] },
      { name: 'Unity', cities: [{ name: 'Bentiu' }, { name: 'Leer' }] },
      { name: 'Upper Nile', cities: [{ name: 'Malakal' }, { name: 'Melut' }, { name: 'Nasir' }, { name: 'Renk' }] },
      { name: 'Warrap', cities: [{ name: 'Gogrial' }, { name: 'Kuacjok' }, { name: 'Tonj' }] },
      { name: 'Western Bahr el Ghazal', cities: [{ name: 'Kafia Kingi' }, { name: 'Wau' }] },
      { name: 'Western Equatoria', cities: [{ name: 'Maridi' }, { name: 'Tambura' }, { name: 'Yambio' }] }
    ]
  },
  {
    name: 'Spain',
    code: 'ES',
    currency: 'EUR',
    currencySymbol: '€',
    states: [
      { name: 'Andalusia', cities: [{ name: 'Algeciras' }, { name: 'Almería' }, { name: 'Córdoba' }, { name: 'Dos Hermanas' }, { name: 'Granada' }, { name: 'Huelva' }, { name: 'Jerez de la Frontera' }, { name: 'Málaga' }, { name: 'Marbella' }, { name: 'Sevilla' }] },
      { name: 'Aragon', cities: [{ name: 'Alcañiz' }, { name: 'Barbastro' }, { name: 'Calatayud' }, { name: 'Ejea de los Caballeros' }, { name: 'Fraga' }, { name: 'Huesca' }, { name: 'Monzón' }, { name: 'Teruel' }, { name: 'Utebo' }, { name: 'Zaragoza' }] },
      { name: 'Balearic Islands', cities: [{ name: 'Alcudia' }, { name: 'Felanitx' }, { name: 'Ibiza' }, { name: 'Inca' }, { name: 'Lluchmayor' }, { name: 'Mahón' }, { name: 'Manacor' }, { name: 'Marratxi' }, { name: 'Palma' }, { name: 'Santa Eulalia del Río' }] },
      { name: 'Basque Country', cities: [{ name: 'Arriaga' }, { name: 'Bilbao' }, { name: 'Donostia' }, { name: 'Durango' }, { name: 'Irún' }, { name: 'Portugalete' }, { name: 'San Vicente de Baracaldo' }, { name: 'Santurce-Antiguo' }, { name: 'Sestao' }, { name: 'Vitoria-Gasteiz' }] },
      { name: 'Canary Islands', cities: [{ name: 'Adeje' }, { name: 'Arona' }, { name: 'Arrecife' }, { name: 'Granadilla de Abona' }, { name: 'La Laguna' }, { name: 'Las Palmas' }, { name: 'Puerto del Rosario' }, { name: 'San Bartolomé' }, { name: 'Santa Cruz' }, { name: 'Telde' }] },
      { name: 'Castille-Leon', cities: [{ name: 'Ávila' }, { name: 'Burgos' }, { name: 'León' }, { name: 'Palencia' }, { name: 'Ponferrada' }, { name: 'Salamanca' }, { name: 'Segovia' }, { name: 'Soria' }, { name: 'Valladolid' }, { name: 'Zamora' }] },
      { name: 'Catalonia', cities: [{ name: 'Badalona' }, { name: 'Barcelona' }, { name: 'Girona' }, { name: 'Lleida' }, { name: 'Mataró' }, { name: 'Reus' }, { name: 'Sabadell' }, { name: 'San Cugat del Vallés' }, { name: 'Tarragona' }, { name: 'Tarrasa' }] },
      { name: 'Madrid', cities: [{ name: 'Alcalá de Henares' }, { name: 'Alcobendas' }, { name: 'Alcorcón' }, { name: 'Fuenlabrada' }, { name: 'Getafe' }, { name: 'Leganés' }, { name: 'Madrid' }, { name: 'Móstoles' }, { name: 'Parla' }, { name: 'Torrejón de Ardoz' }] },
      { name: 'Murcia', cities: [{ name: 'Águilas' }, { name: 'Alcantarilla' }, { name: 'Cartagena' }, { name: 'El Plan' }, { name: 'Lorca' }, { name: 'Molina de Segura' }, { name: 'Murcia' }, { name: 'San Antonio Abad' }, { name: 'San Javier' }, { name: 'Torre-Pacheco' }] },
      { name: 'Valencia', cities: [{ name: 'Alicante' }, { name: 'Benidorm' }, { name: 'Castellón de la Plana' }, { name: 'Elche' }, { name: 'Gandía' }, { name: 'Orihuela' }, { name: 'Paterna' }, { name: 'Torrente' }, { name: 'Torrevieja' }, { name: 'Valencia' }] }
    ]
  },
  {
    name: 'Sri Lanka',
    code: 'LK',
    currency: 'LKR',
    currencySymbol: '₨',
    states: [
      { name: 'Central', cities: [{ name: 'Abasingammedda' }, { name: 'Akurana' }, { name: 'Dambulla' }, { name: 'Galhinna' }, { name: 'Gampola' }, { name: 'Hatton' }, { name: 'Kandy' }, { name: 'Kotmale' }, { name: 'Matale' }, { name: 'Nuwara Eliya' }] },
      { name: 'Eastern', cities: [{ name: 'Batticaloa' }, { name: 'Kalmunai' }, { name: 'Trincomalee' }] },
      { name: 'North Central', cities: [{ name: 'Jaffna' }, { name: 'Kilinochchi' }, { name: 'Mannar' }, { name: 'Mullaittivu' }, { name: 'Point Pedro' }, { name: 'Vavuniya' }] },
      { name: 'North Western', cities: [{ name: 'Galgamuwa' }, { name: 'Kalpitiya' }, { name: 'Kurunegala' }, { name: 'Mawatagama' }, { name: 'Narammala' }, { name: 'Nikaweratiya' }, { name: 'Pothuhera' }, { name: 'Puttalam' }] },
      { name: 'Northern', cities: [{ name: 'Anuradhapura' }, { name: 'Bakamune' }] },
      { name: 'Sabaragamuwa', cities: [{ name: 'Kalawana' }, { name: 'Kegalle' }, { name: 'Mawanella' }, { name: 'Ratnapura' }] },
      { name: 'Southern', cities: [{ name: 'Bentota' }, { name: 'Dikwella South' }, { name: 'Galle' }, { name: 'Gandara West' }, { name: 'Hakmana' }, { name: 'Hikkaduwa' }, { name: 'Matara' }, { name: 'Tangalla' }, { name: 'Tissamaharama' }, { name: 'Weligama' }] },
      { name: 'Uva', cities: [{ name: 'Badulla' }, { name: 'Bandarawela' }, { name: 'Monaragala' }, { name: 'Sevanagala' }] },
      { name: 'Western', cities: [{ name: 'Athurugiriya' }, { name: 'Colombo' }, { name: 'Gampaha' }, { name: 'Kesbewa' }, { name: 'Kolonnawa' }, { name: 'Maharagama' }, { name: 'Moratuwa' }, { name: 'Mount Lavinia' }, { name: 'Negombo' }, { name: 'Sri Jayewardenepura Kotte' }] }
    ]
  },
  {
    name: 'Sudan',
    code: 'SD',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Gedaref', cities: [{ name: 'Gedaref' }] },
      { name: 'Gezira', cities: [{ name: 'Al Manāqil' }, { name: 'Wad Medani' }] },
      { name: 'Kassala', cities: [{ name: 'Kassala' }] },
      { name: 'Khartoum', cities: [{ name: 'Khartoum' }, { name: 'Khartoum North' }, { name: 'Omdurman' }] },
      { name: 'North Darfur', cities: [{ name: 'El Fasher' }, { name: 'Kutum' }] },
      { name: 'North Kordofan', cities: [{ name: 'El Obeid' }, { name: 'Umm Badr' }, { name: 'Umm Ruwaba' }] },
      { name: 'Red Sea', cities: [{ name: 'Haya' }, { name: 'Port Sudan' }, { name: 'Sawākin' }, { name: 'Tokār' }] },
      { name: 'South Darfur', cities: [{ name: 'Nyala' }] },
      { name: 'West Darfur', cities: [{ name: 'El Geneina' }] },
      { name: 'White Nile', cities: [{ name: 'Ad Diwem' }, { name: 'Al Qiţena' }, { name: 'Kūstī' }, { name: 'Rabak' }] }
    ]
  },
  {
    name: 'Suriname',
    code: 'SR',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Brokopondo', cities: [{ name: 'Brokopondo' }, { name: 'Brownsweg' }] },
      { name: 'Commewijne', cities: [{ name: 'Meerzorg' }, { name: 'Nieuw Amsterdam' }] },
      { name: 'Coronie', cities: [{ name: 'Totness' }] },
      { name: 'Marowijne', cities: [{ name: 'Albina' }, { name: 'Moengo' }] },
      { name: 'Nickerie', cities: [{ name: 'Nieuw Nickerie' }] },
      { name: 'Para', cities: [{ name: 'Onverwacht' }] },
      { name: 'Paramaribo', cities: [{ name: 'Paramaribo' }] },
      { name: 'Saramacca', cities: [{ name: 'Groningen' }] },
      { name: 'Sipaliwini', cities: [{ name: 'Cottica' }] },
      { name: 'Wanica', cities: [{ name: 'Koewarasan' }, { name: 'Lelydorp' }] }
    ]
  },
  {
    name: 'Svalbard',
    code: 'XR',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Longyearbyen' }] }
    ]
  },
  {
    name: 'Sweden',
    code: 'SE',
    currency: 'SEK',
    currencySymbol: 'kr',
    states: [
      { name: 'Jönköping', cities: [{ name: 'Eksjö' }, { name: 'Gislaved' }, { name: 'Habo' }, { name: 'Huskvarna' }, { name: 'Jönköping' }, { name: 'Nässjö' }, { name: 'Tranås' }, { name: 'Vetlanda' }] },
      { name: 'Örebro', cities: [{ name: 'Karlskoga' }, { name: 'Kumla' }, { name: 'Lindesberg' }, { name: 'Örebro' }] },
      { name: 'Östergötland', cities: [{ name: 'Finspång' }, { name: 'Linköping' }, { name: 'Mjölby' }, { name: 'Motala' }, { name: 'Norrköping' }] },
      { name: 'Skåne', cities: [{ name: 'Ängelholm' }, { name: 'Helsingborg' }, { name: 'Kävlinge' }, { name: 'Kristianstad' }, { name: 'Landskrona' }, { name: 'Malmö' }, { name: 'Sjöbo' }, { name: 'Staffanstorp' }, { name: 'Trelleborg' }, { name: 'Ystad' }] },
      { name: 'Stockholm', cities: [{ name: 'Åkersberga' }, { name: 'Lidingö' }, { name: 'Märsta' }, { name: 'Södertälje' }, { name: 'Stockholm' }, { name: 'Täby' }, { name: 'Tumba' }, { name: 'Upplands Väsby' }, { name: 'Uppsala' }, { name: 'Vallentuna' }] },
      { name: 'Uppsala', cities: [{ name: 'Bålsta' }, { name: 'Enköping' }, { name: 'Sävja' }, { name: 'Uppsala' }] },
      { name: 'Västerbotten', cities: [{ name: 'Lycksele' }, { name: 'Skellefteå' }, { name: 'Umeå' }] },
      { name: 'Västernorrland', cities: [{ name: 'Härnösand' }, { name: 'Örnsköldsvik' }, { name: 'Sollefteå' }, { name: 'Sundsvall' }, { name: 'Timrå' }] },
      { name: 'Västmanland', cities: [{ name: 'Arboga' }, { name: 'Fagersta' }, { name: 'Hallstahammar' }, { name: 'Köping' }, { name: 'Sala' }, { name: 'Västerås' }] },
      { name: 'Västra Götaland', cities: [{ name: 'Alingsås' }, { name: 'Borås' }, { name: 'Gothenburg' }, { name: 'Kungälv' }, { name: 'Lidköping' }, { name: 'Mölndal' }, { name: 'Skövde' }, { name: 'Trollhättan' }, { name: 'Uddevalla' }, { name: 'Vänersborg' }] }
    ]
  },
  {
    name: 'Switzerland',
    code: 'CH',
    currency: 'CHF',
    currencySymbol: 'Fr',
    states: [
      { name: 'Basel-Stadt', cities: [{ name: 'Basel' }, { name: 'Birsfelden' }, { name: 'Riehen' }] },
      { name: 'Bern', cities: [{ name: 'Bern' }, { name: 'Biel/Bienne' }, { name: 'Burgdorf' }, { name: 'Köniz' }, { name: 'Langenthal' }, { name: 'Lyss' }, { name: 'Muri' }, { name: 'Ostermundigen' }, { name: 'Steffisburg' }, { name: 'Thun' }] },
      { name: 'Fribourg', cities: [{ name: 'Bulle' }, { name: 'Estavayer-le-Lac' }, { name: 'Fribourg' }, { name: 'Villars-sur-Glâne' }] },
      { name: 'Genève', cities: [{ name: 'Carouge' }, { name: 'Chêne-Bougeries' }, { name: 'Geneva' }, { name: 'Landecy' }, { name: 'Le Grand-Saconnex' }, { name: 'Meyrin' }, { name: 'Onex' }, { name: 'Thônex' }, { name: 'Vernier' }, { name: 'Versoix' }] },
      { name: 'Luzern', cities: [{ name: 'Emmen' }, { name: 'Hochdorf' }, { name: 'Horw' }, { name: 'Kriens' }, { name: 'Littau' }, { name: 'Lucerne' }, { name: 'Steinhaus' }, { name: 'Sursee' }] },
      { name: 'Neuchâtel', cities: [{ name: 'La Chaux-de-Fonds' }, { name: 'La Grande Racine' }, { name: 'Le Locle' }, { name: 'Neuchâtel' }] },
      { name: 'Sankt Gallen', cities: [{ name: 'Altstätten' }, { name: 'Buchs' }, { name: 'Flawil' }, { name: 'Gossau' }, { name: 'Rapperswil-Jona' }, { name: 'Sankt Gallen' }, { name: 'Uzwil' }, { name: 'Widnau' }, { name: 'Wil' }, { name: 'Wittenbach' }] },
      { name: 'Ticino', cities: [{ name: 'Bellinzona' }, { name: 'Locarno' }, { name: 'Lugano' }, { name: 'Mendrisio' }] },
      { name: 'Vaud', cities: [{ name: 'Ecublens' }, { name: 'Gland' }, { name: 'Lausanne' }, { name: 'Montreux' }, { name: 'Morges' }, { name: 'Nyon' }, { name: 'Pully' }, { name: 'Renens' }, { name: 'Vevey' }, { name: 'Yverdon-les-Bains' }] },
      { name: 'Zürich', cities: [{ name: 'Bülach' }, { name: 'Dübendorf' }, { name: 'Horgen' }, { name: 'Oberwingert' }, { name: 'Opfikon' }, { name: 'Uster' }, { name: 'Wädenswil' }, { name: 'Wetzikon' }, { name: 'Winterthur' }, { name: 'Zürich' }] }
    ]
  },
  {
    name: 'Syria',
    code: 'SY',
    currency: 'SYP',
    currencySymbol: '£S',
    states: [
      { name: 'Al Ḩasakah', cities: [{ name: '‘Āmūdā' }, { name: 'Ad Darbāsīyah' }, { name: 'Al Ḩasakah' }, { name: 'Al Mālikīyah' }, { name: 'Al Mu‘abbadah' }, { name: 'Al Qāmishlī' }, { name: 'Ash Shaddādah' }, { name: 'Ra’s al ‘Ayn' }] },
      { name: 'Al Lādhiqīyah', cities: [{ name: 'Al Qardāḩah' }, { name: 'Jablah' }, { name: 'Latakia' }] },
      { name: 'Ar Raqqah', cities: [{ name: 'Ar Raqqah' }, { name: 'Ath Thawrah' }, { name: 'Tall Abyaḑ' }] },
      { name: 'Dayr az Zawr', cities: [{ name: 'Al ‘Ashārah' }, { name: 'Al Mayādīn' }, { name: 'Al Qurayyā' }, { name: 'Ālbū Kamāl' }, { name: 'Bāghūz Fawqānī' }, { name: 'Dayr az Zawr' }, { name: 'Ghabrah' }, { name: 'Hajīn' }, { name: 'Miḩqan' }, { name: 'Subaykhān' }] },
      { name: 'Dimashq', cities: [{ name: 'Damascus' }] },
      { name: 'Ḩalab', cities: [{ name: '‘Afrīn' }, { name: '‘Ayn al ‘Arab' }, { name: 'Aleppo' }, { name: 'As Safīrah' }, { name: 'Dayr Ḩāfir' }, { name: 'I‘zāz' }, { name: 'Manbij' }, { name: 'Nubl' }, { name: 'Tādif' }, { name: 'Tall Rif‘at' }] },
      { name: 'Ḩamāh', cities: [{ name: 'Al Laţāminah' }, { name: 'As Salamīyah' }, { name: 'As Suqaylibīyah' }, { name: 'Ḩamāh' }, { name: 'Kafr Zaytā' }, { name: 'Maşyāf' }, { name: 'Muḩradah' }, { name: 'Şūrān' }, { name: 'Tall Salḩab' }, { name: 'Ţayyibat al Imām' }] },
      { name: 'Ḩimş', cities: [{ name: 'Al Qaryatayn' }, { name: 'Al Quşayr' }, { name: 'Ar Rastan' }, { name: 'As Sukhnah' }, { name: 'Homs' }, { name: 'Kafr Lāhā' }, { name: 'Shīn' }, { name: 'Tadmur' }, { name: 'Tallbīsah' }, { name: 'Tallkalakh' }] },
      { name: 'Idlib', cities: [{ name: 'Binnish' }, { name: 'Ḩārim' }, { name: 'Idlib' }, { name: 'Jisr ash Shughūr' }, { name: 'Kafr Nubl' }, { name: 'Khān Shaykhūn' }, { name: 'Ma‘arrat an Nu‘mān' }, { name: 'Ma‘arratmişrīn' }, { name: 'Salqīn' }, { name: 'Sarāqib' }] },
      { name: 'Rīf Dimashq', cities: [{ name: 'Al Ḩajar al Aswad' }, { name: 'An Nabk' }, { name: 'At Tall' }, { name: 'Babīlā' }, { name: 'Dārayyā' }, { name: 'Dūmā' }, { name: 'Ḩarastā' }, { name: 'Jaramānā' }, { name: 'Qabr as Sitt' }, { name: 'Yabrūd' }] }
    ]
  },
  {
    name: 'Taiwan',
    code: 'TW',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Changhua', cities: [{ name: 'Changhua' }, { name: 'Dacun' }, { name: 'Erlin' }, { name: 'Fuxing' }, { name: 'Hemei' }, { name: 'Huatan' }, { name: 'Lugang' }, { name: 'Shetou' }, { name: 'Xihu' }, { name: 'Yuanlin' }] },
      { name: 'Chiayi', cities: [{ name: 'Budai' }, { name: 'Chiayi' }, { name: 'Dalin' }, { name: 'Minxiong' }, { name: 'Pozi' }, { name: 'Shuishang' }, { name: 'Taibao' }, { name: 'Xingang' }, { name: 'Zhongbu' }, { name: 'Zhuqi' }] },
      { name: 'Hsinchu', cities: [{ name: 'Baoshan' }, { name: 'Guanxi' }, { name: 'Hengshan' }, { name: 'Hsinchu' }, { name: 'Hukou' }, { name: 'Xinbu' }, { name: 'Xinfeng' }, { name: 'Xionglin' }, { name: 'Zhubei' }, { name: 'Zhudong' }] },
      { name: 'Kaohsiung', cities: [{ name: 'Kaohsiung' }] },
      { name: 'Keelung', cities: [{ name: 'Keelung' }] },
      { name: 'Pingtung', cities: [{ name: 'Changzhi' }, { name: 'Chaozhou' }, { name: 'Donggang' }, { name: 'Hengchun' }, { name: 'Ligang' }, { name: 'Neibu' }, { name: 'Pingtung' }, { name: 'Wandan' }, { name: 'Xinyuan' }, { name: 'Yanbu' }] },
      { name: 'Taichung', cities: [{ name: 'Taichung' }] },
      { name: 'Tainan', cities: [{ name: 'Tainan' }] },
      { name: 'Taipei', cities: [{ name: 'Taipei' }] },
      { name: 'Taoyuan', cities: [{ name: 'Bade' }, { name: 'Pingzhen' }, { name: 'Taoyuan District' }, { name: 'Yangmei' }, { name: 'Zhongli' }] }
    ]
  },
  {
    name: 'Tajikistan',
    code: 'TJ',
    currency: 'TJS',
    currencySymbol: 'с',
    states: [
      { name: 'Dushanbe', cities: [{ name: 'Dushanbe' }] },
      { name: 'Khatlon', cities: [{ name: 'Bokhtar' }, { name: 'Dahana' }, { name: 'Danghara' }, { name: 'Farkhor' }, { name: 'Jilikŭl' }, { name: 'Kŭlob' }, { name: 'Levakant' }, { name: 'Norak' }, { name: 'Yovon' }, { name: 'Zargar' }] },
      { name: 'Kŭhistoni Badakhshon', cities: [{ name: 'Buved' }, { name: 'Khorugh' }, { name: 'Vanj' }] },
      { name: 'Nohiyahoi Tobei Jumhurí', cities: [{ name: 'Chimteppa' }, { name: 'Chorbog' }, { name: 'Hisor' }, { name: 'Qaratog' }, { name: 'Roghun' }, { name: 'Rokhaty' }, { name: 'Sarikishty' }, { name: 'Simiganj' }, { name: 'Tursunzoda' }, { name: 'Vahdat' }] },
      { name: 'Sughd', cities: [{ name: 'Chorkŭh' }, { name: 'Ghŭlakandoz' }, { name: 'Isfara' }, { name: 'Isfisor' }, { name: 'Istaravshan' }, { name: 'Khŭjand' }, { name: 'Konibodom' }, { name: 'Navgilem' }, { name: 'Obburdon' }, { name: 'Panjakent' }] }
    ]
  },
  {
    name: 'Tanzania',
    code: 'TZ',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Arusha', cities: [{ name: 'Arusha' }, { name: 'Ngorongoro' }, { name: 'Oldeani' }] },
      { name: 'Dar es Salaam', cities: [{ name: 'Dar es Salaam' }, { name: 'Ubungo' }] },
      { name: 'Dodoma', cities: [{ name: 'Dodoma' }, { name: 'Ihumwa' }, { name: 'Mpwapwa' }] },
      { name: 'Geita', cities: [{ name: 'Chato' }, { name: 'Geita' }] },
      { name: 'Kigoma', cities: [{ name: 'Kabanga' }, { name: 'Kakonko' }, { name: 'Kanyato' }, { name: 'Kasulu' }, { name: 'Kigoma' }, { name: 'Uvinza' }] },
      { name: 'Mbeya', cities: [{ name: 'Mbeya' }, { name: 'Mwaya' }, { name: 'Tukuyu' }, { name: 'Tunduma' }] },
      { name: 'Morogoro', cities: [{ name: 'Geiro' }, { name: 'Ifakara' }, { name: 'Kilosa' }, { name: 'Mikumi' }, { name: 'Mlimba' }, { name: 'Morogoro' }, { name: 'Ngerengere' }, { name: 'Rubeho' }] },
      { name: 'Mwanza', cities: [{ name: 'Magu' }, { name: 'Misungwi' }, { name: 'Mwanza' }, { name: 'Ngudu' }] },
      { name: 'Shinyanga', cities: [{ name: 'Kahama' }, { name: 'Shinyanga' }] },
      { name: 'Tanga', cities: [{ name: 'Handeni' }, { name: 'Korogwe' }, { name: 'Lushoto' }, { name: 'Mazinde' }, { name: 'Muheza' }, { name: 'Tanga' }] }
    ]
  },
  {
    name: 'Thailand',
    code: 'TH',
    currency: 'THB',
    currencySymbol: '฿',
    states: [
      { name: 'Chiang Mai', cities: [{ name: 'Ban Doi Suthep' }, { name: 'Ban Mae Hia Nai' }, { name: 'Ban Mae Kha Tai' }, { name: 'Ban Mon Pin' }, { name: 'Ban Mueang Na Tai' }, { name: 'Ban Piang Luang' }, { name: 'Ban Tha Ton' }, { name: 'Chiang Mai' }, { name: 'Fang' }, { name: 'San Kamphaeng' }] },
      { name: 'Chon Buri', cities: [{ name: 'Ban Ang Sila' }, { name: 'Ban Bueng' }, { name: 'Ban Laem Chabang' }, { name: 'Ban Na Pa' }, { name: 'Ban Nong Prue' }, { name: 'Ban Suan' }, { name: 'Chon Buri' }, { name: 'Phatthaya' }, { name: 'Sattahip' }, { name: 'Si Racha' }] },
      { name: 'Khon Kaen', cities: [{ name: 'Ban Pet' }, { name: 'Ban Phai' }, { name: 'Ban Tha Phra' }, { name: 'Ban Thum' }, { name: 'Chum Phae' }, { name: 'Khon Kaen' }, { name: 'Kranuan' }, { name: 'Phon' }] },
      { name: 'Krung Thep Maha Nakhon', cities: [{ name: 'Ban Wat Sala Daeng' }, { name: 'Bang Phlat' }, { name: 'Bangkok' }, { name: 'Chong Nonsi' }, { name: 'Sai Mai' }] },
      { name: 'Mukdahan', cities: [{ name: 'Mukdahan' }] },
      { name: 'Nakhon Ratchasima', cities: [{ name: 'Ban Cho Ho' }, { name: 'Ban Mai' }, { name: 'Ban Phonla Krang' }, { name: 'Bua Yai' }, { name: 'Nakhon Ratchasima' }, { name: 'Non Sung' }, { name: 'Pak Chong' }, { name: 'Pak Thong Chai' }, { name: 'Sikhio' }, { name: 'Sung Noen' }] },
      { name: 'Nonthaburi', cities: [{ name: 'Ban Bang Khu Lat' }, { name: 'Ban Bang Krang' }, { name: 'Ban Bang Mae Nang' }, { name: 'Ban Bang Muang' }, { name: 'Ban Khamen' }, { name: 'Ban Sai Ma Tai' }, { name: 'Bang Bua Thong' }, { name: 'Bang Kruai' }, { name: 'Muban Saeng Bua Thong' }, { name: 'Pak Kret' }] },
      { name: 'Phitsanulok', cities: [{ name: 'Ban Bueng Phra' }, { name: 'Ban Klang' }, { name: 'Ban Nong Kathao' }, { name: 'Ban Nong Kula' }, { name: 'Ban Pa Sak' }, { name: 'Ban Samo Khae' }, { name: 'Ban Tha Pho' }, { name: 'Ban Tha Thong' }, { name: 'Ban Wang Nok Aen' }, { name: 'Phitsanulok' }] },
      { name: 'Songkhla', cities: [{ name: 'Ban Muang Ngam' }, { name: 'Ban Phru' }, { name: 'Ban Thung Tam Sao' }, { name: 'Hat Yai' }, { name: 'Rattaphum' }, { name: 'Sadao' }, { name: 'Singhanakhon' }, { name: 'Songkhla' }] },
      { name: 'Surat Thani', cities: [{ name: 'Ban Na San' }, { name: 'Ban Song' }, { name: 'Ban Tha Kham' }, { name: 'Don Sak' }, { name: 'Kanchanadit' }, { name: 'Ko Samui' }, { name: 'Surat Thani' }, { name: 'Tha Chang' }, { name: 'Wiang Sa' }] }
    ]
  },
  {
    name: 'Timor-Leste',
    code: 'TL',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Ainaro', cities: [{ name: 'Ainaro' }] },
      { name: 'Baucau', cities: [{ name: 'Baucau' }] },
      { name: 'Bobonaro', cities: [{ name: 'Maliana' }] },
      { name: 'Díli', cities: [{ name: 'Dili' }] },
      { name: 'Ermera', cities: [{ name: 'Gleno' }] },
      { name: 'Lautém', cities: [{ name: 'Lospalos' }] },
      { name: 'Likisá', cities: [{ name: 'Liquiçá' }] },
      { name: 'Manatuto', cities: [{ name: 'Manatuto' }] },
      { name: 'Manufahi', cities: [{ name: 'Same' }] },
      { name: 'Viqueque', cities: [{ name: 'Viqueque' }] }
    ]
  },
  {
    name: 'Togo',
    code: 'TG',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Centrale', cities: [{ name: 'Blitta' }, { name: 'Sokodé' }, { name: 'Sotouboua' }] },
      { name: 'Kara', cities: [{ name: 'Bafilo' }, { name: 'Bassar' }, { name: 'Kara' }, { name: 'Niamtougou' }, { name: 'Sirka' }] },
      { name: 'Maritime', cities: [{ name: 'Afanyangan' }, { name: 'Aného' }, { name: 'Kévé' }, { name: 'Lomé' }, { name: 'Tabligbo' }, { name: 'Tsévié' }] },
      { name: 'Plateaux', cities: [{ name: 'Atakpamé' }, { name: 'Badou' }, { name: 'Kpalimé' }, { name: 'Notsé' }] },
      { name: 'Savanes', cities: [{ name: 'Dapaong' }, { name: 'Sansanné-Mango' }] }
    ]
  },
  {
    name: 'Tonga',
    code: 'TO',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Tongatapu', cities: [{ name: 'Nuku‘alofa' }] },
      { name: 'Vava‘u', cities: [{ name: 'Neiafu' }] }
    ]
  },
  {
    name: 'Trinidad and Tobago',
    code: 'TT',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Arima', cities: [{ name: 'Arima' }] },
      { name: 'Chaguanas', cities: [{ name: 'Chaguanas' }, { name: 'Cunupia' }] },
      { name: 'Couva/Tabaquite/Talparo', cities: [{ name: 'Claxton Bay' }, { name: 'Couva' }, { name: 'Freeport' }, { name: 'Gasparillo' }] },
      { name: 'Diego Martin', cities: [{ name: 'Carenage' }, { name: 'Diego Martin' }] },
      { name: 'Point Fortin', cities: [{ name: 'Point Fortin' }] },
      { name: 'Port of Spain', cities: [{ name: 'Port of Spain' }] },
      { name: 'Princes Town', cities: [{ name: 'Princes Town' }] },
      { name: 'San Fernando', cities: [{ name: 'Marabella' }, { name: 'San Fernando' }] },
      { name: 'San Juan/Laventille', cities: [{ name: 'Aranguez' }, { name: 'Laventille' }, { name: 'San Juan' }] },
      { name: 'Tunapuna/Piarco', cities: [{ name: 'Arouca' }, { name: 'Tunapuna' }] }
    ]
  },
  {
    name: 'Tunisia',
    code: 'TN',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Bizerte', cities: [{ name: 'Bizerte' }, { name: 'El Alia' }, { name: 'El Metline' }, { name: 'Mateur' }, { name: 'Menzel Abderhaman' }, { name: 'Menzel Bourguiba' }, { name: 'Rass el Djebel' }, { name: 'Rhar el Melah' }, { name: 'Tinja' }] },
      { name: 'Gabès', cities: [{ name: 'El Hamma' }, { name: 'Gabès' }, { name: 'Mareth' }, { name: 'Métouia' }, { name: 'Rhennouch' }, { name: 'Wadhraf' }] },
      { name: 'Gafsa', cities: [{ name: 'Ar Rudayyif' }, { name: 'El Guetar' }, { name: 'El Ksar' }, { name: 'Gafsa' }, { name: 'M’dhilla' }, { name: 'Metlaoui' }, { name: 'Moularès' }] },
      { name: 'Kairouan', cities: [{ name: 'Hajeb el Aïoun' }, { name: 'Kairouan' }, { name: 'Ousseltia' }] },
      { name: 'Kasserine', cities: [{ name: 'Feriana' }, { name: 'Kasserine' }, { name: 'Sbeitla' }, { name: 'Thala' }] },
      { name: 'L’Ariana', cities: [{ name: 'Ariana' }, { name: 'Galaat el Andeless' }, { name: 'Sidi Tabet' }, { name: 'Sukrah' }] },
      { name: 'Monastir', cities: [{ name: 'Banbalah' }, { name: 'Bekalta' }, { name: 'Bennane' }, { name: 'Djemmal' }, { name: 'Ksar Hellal' }, { name: 'Moknine' }, { name: 'Monastir' }, { name: 'Ouardenine' }, { name: 'Sahline' }, { name: 'Teboulba' }] },
      { name: 'Sfax', cities: [{ name: 'Agareb' }, { name: 'Bir Ali Ben Khalifa' }, { name: 'Mahires' }, { name: 'Sakiet ed Daier' }, { name: 'Sakiet ez Zit' }, { name: 'Sfax' }, { name: 'Skhira' }] },
      { name: 'Sousse', cities: [{ name: 'Akouda' }, { name: 'Enfida' }, { name: 'Hammam Sousse' }, { name: 'Kalaa Srira' }, { name: 'Kelaa Kebira' }, { name: 'Messadine' }, { name: 'Msaken' }, { name: 'Sidi Bou Ali' }, { name: 'Sousse' }, { name: 'Zaouiet Sousse' }] },
      { name: 'Tunis', cities: [{ name: 'Carthage' }, { name: 'Gammarth' }, { name: 'La Goulette' }, { name: 'La Marsa' }, { name: 'Le Bardo' }, { name: 'Le Kram' }, { name: 'Tunis' }] }
    ]
  },
  {
    name: 'Turkey',
    code: 'TR',
    currency: 'TRY',
    currencySymbol: '₺',
    states: [
      { name: 'Adana', cities: [{ name: 'Adana' }, { name: 'Ceyhan' }, { name: 'İmamoğlu' }, { name: 'Karaisalı' }, { name: 'Karataş' }, { name: 'Kozan' }, { name: 'Pozantı' }, { name: 'Sarıçam' }, { name: 'Seyhan' }, { name: 'Yüreğir' }] },
      { name: 'Ankara', cities: [{ name: 'Altındağ' }, { name: 'Ankara' }, { name: 'Çankaya' }, { name: 'Etimesgut' }, { name: 'Gölbaşı' }, { name: 'Keçiören' }, { name: 'Mamak' }, { name: 'Polatlı' }, { name: 'Sincan' }, { name: 'Yenimahalle' }] },
      { name: 'Bursa', cities: [{ name: 'Bursa' }, { name: 'Gemlik' }, { name: 'Gürsu' }, { name: 'İnegöl' }, { name: 'Karacabey' }, { name: 'Mudanya' }, { name: 'Mustafakemalpaşa' }, { name: 'Nilüfer' }, { name: 'Osmangazi' }, { name: 'Yıldırım' }] },
      { name: 'Diyarbakır', cities: [{ name: 'Bağlar' }, { name: 'Bismil' }, { name: 'Çermik' }, { name: 'Çınar' }, { name: 'Diyarbakır' }, { name: 'Ergani' }, { name: 'Kayapınar' }, { name: 'Silvan' }, { name: 'Sur' }, { name: 'Yenişehir' }] },
      { name: 'Gaziantep', cities: [{ name: 'Araban' }, { name: 'Gaziantep' }, { name: 'İslahiye' }, { name: 'Karkamış' }, { name: 'Nizip' }, { name: 'Nurdağı' }, { name: 'Oğuzeli' }, { name: 'Yavuzeli' }] },
      { name: 'İstanbul', cities: [{ name: 'Avcılar' }, { name: 'Bağcılar' }, { name: 'Beylikdüzü' }, { name: 'Esenler' }, { name: 'Esenyurt' }, { name: 'Istanbul' }, { name: 'Kâğıthane' }, { name: 'Kartal' }, { name: 'Pendik' }, { name: 'Umraniye' }] },
      { name: 'İzmir', cities: [{ name: 'Bornova' }, { name: 'Buca' }, { name: 'Çiğli' }, { name: 'Gaziemir' }, { name: 'İzmir' }, { name: 'Karşıyaka' }, { name: 'Konak' }, { name: 'Menemen' }, { name: 'Ödemiş' }, { name: 'Torbalı' }] },
      { name: 'Kayseri', cities: [{ name: 'Bünyan' }, { name: 'Develi' }, { name: 'İncesu' }, { name: 'Kayseri' }, { name: 'Kocasinan' }, { name: 'Melikgazi' }, { name: 'Pınarbaşı' }, { name: 'Talas' }, { name: 'Tomarza' }, { name: 'Yahyalı' }] },
      { name: 'Konya', cities: [{ name: 'Akşehir' }, { name: 'Beyşehir' }, { name: 'Çumra' }, { name: 'Ereğli' }, { name: 'Ilgın' }, { name: 'Konya' }, { name: 'Kulu' }, { name: 'Meram' }, { name: 'Selçuklu' }, { name: 'Seydişehir' }] },
      { name: 'Samsun', cities: [{ name: 'Alaçam' }, { name: 'Aşağıçinik' }, { name: 'Bafra' }, { name: 'Çarşamba' }, { name: 'Havza' }, { name: 'Ondokuzmayıs' }, { name: 'Samsun' }, { name: 'Tekkeköy' }, { name: 'Terme' }, { name: 'Vezirköprü' }] }
    ]
  },
  {
    name: 'Turkmenistan',
    code: 'TM',
    currency: 'TMT',
    currencySymbol: 'm',
    states: [
      { name: 'Ahal', cities: [{ name: 'Abadan' }, { name: 'Änew' }, { name: 'Baharly' }, { name: 'Gökdepe' }, { name: 'Kaka' }, { name: 'Sarahs' }, { name: 'Tejen' }] },
      { name: 'Aşgabat', cities: [{ name: 'Ashgabat' }] },
      { name: 'Balkan', cities: [{ name: 'Balkanabat' }, { name: 'Bereket' }, { name: 'Çeleken' }, { name: 'Gumdag' }, { name: 'Gyzylgaya' }, { name: 'Hazar' }, { name: 'Serdar' }, { name: 'Türkmenbaşy' }] },
      { name: 'Daşoguz', cities: [{ name: 'Akdepe' }, { name: 'Daşoguz' }, { name: 'Köneürgench' }] },
      { name: 'Lebap', cities: [{ name: 'Atamyrat' }, { name: 'Darganata' }, { name: 'Farap' }, { name: 'Gazojak' }, { name: 'Hojambaz' }, { name: 'Koytendag' }, { name: 'Seydi' }, { name: 'Türkmenabat' }] },
      { name: 'Mary', cities: [{ name: 'Bayramaly' }, { name: 'Mary' }, { name: 'Murgap' }, { name: 'Yolöten' }] }
    ]
  },
  {
    name: 'Turks and Caicos Islands',
    code: 'TC',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Grand Turk' }] }
    ]
  },
  {
    name: 'Tuvalu',
    code: 'TV',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Funafuti', cities: [{ name: 'Funafuti' }] }
    ]
  },
  {
    name: 'U.S. Virgin Islands',
    code: 'VI',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Virgin Islands', cities: [{ name: 'Charlotte Amalie' }] }
    ]
  },
  {
    name: 'Uganda',
    code: 'UG',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Buikwe', cities: [{ name: 'Buikwe' }, { name: 'Lugazi' }, { name: 'Njeru' }, { name: 'Nkokonjeru' }, { name: 'Nyenga' }] },
      { name: 'Gulu', cities: [{ name: 'Gulu' }] },
      { name: 'Hoima', cities: [{ name: 'Hoima' }] },
      { name: 'Jinja', cities: [{ name: 'Bugembe' }, { name: 'Buwenge' }, { name: 'Jinja' }, { name: 'Kakira' }] },
      { name: 'Kampala', cities: [{ name: 'Kampala' }] },
      { name: 'Kasese', cities: [{ name: 'Hima' }, { name: 'Kasese' }, { name: 'Katwe' }, { name: 'Mpondwe' }] },
      { name: 'Masaka', cities: [{ name: 'Masaka' }] },
      { name: 'Mbarara', cities: [{ name: 'Mbarara' }] },
      { name: 'Mukono', cities: [{ name: 'Katosi' }, { name: 'Mukono' }] },
      { name: 'Wakiso', cities: [{ name: 'Entebbe' }, { name: 'Kakiri' }, { name: 'Kasangati' }, { name: 'Kimwanyi' }, { name: 'Kireka' }, { name: 'Kyaliwajjala' }, { name: 'Matuga' }, { name: 'Namayumba' }, { name: 'Nansana' }, { name: 'Wakiso' }] }
    ]
  },
  {
    name: 'Ukraine',
    code: 'UA',
    currency: 'UAH',
    currencySymbol: '₴',
    states: [
      { name: 'Dnipropetrovska Oblast', cities: [{ name: 'Dnipro' }, { name: 'Kamianske' }, { name: 'Kryvyi Rih' }, { name: 'Marhanets' }, { name: 'Nikopol' }, { name: 'Novomoskovsk' }, { name: 'Pavlohrad' }, { name: 'Pokrov' }, { name: 'Synelnykove' }, { name: 'Zhovti Vody' }] },
      { name: 'Donetska Oblast', cities: [{ name: 'Bakhmut' }, { name: 'Donetsk' }, { name: 'Horlivka' }, { name: 'Khartsyzk' }, { name: 'Kostiantynivka' }, { name: 'Kramatorsk' }, { name: 'Makiivka' }, { name: 'Mariupol' }, { name: 'Sloviansk' }, { name: 'Yenakiieve' }] },
      { name: 'Kharkivska Oblast', cities: [{ name: 'Balakliia' }, { name: 'Chuhuiv' }, { name: 'Izium' }, { name: 'Kharkiv' }, { name: 'Kupiansk' }, { name: 'Liubotyn' }, { name: 'Lozova' }, { name: 'Merefa' }, { name: 'Pervomaiskyi' }, { name: 'Pesochin' }] },
      { name: 'Kyiv, Misto', cities: [{ name: 'Kotsyubyns’ke' }, { name: 'Kyiv' }] },
      { name: 'Lvivska Oblast', cities: [{ name: 'Boryslav' }, { name: 'Chervonohrad' }, { name: 'Drohobych' }, { name: 'Lviv' }, { name: 'Novoyavorovskoye' }, { name: 'Novyi Rozdil' }, { name: 'Sambir' }, { name: 'Stryi' }, { name: 'Truskavets' }, { name: 'Zolochiv' }] },
      { name: 'Mykolaivska Oblast', cities: [{ name: 'Bashtanka' }, { name: 'Mykolaiv' }, { name: 'Nova Odesa' }, { name: 'Novyi Buh' }, { name: 'Ochakiv' }, { name: 'Pervomaisk' }, { name: 'Snihurivka' }, { name: 'Voznesensk' }, { name: 'Yuzhnoukrainsk' }] },
      { name: 'Odeska Oblast', cities: [{ name: 'Balta' }, { name: 'Bilhorod-Dnistrovskyi' }, { name: 'Chornomorsk' }, { name: 'Izmail' }, { name: 'Kiliia' }, { name: 'Odesa' }, { name: 'Okhmalynka' }, { name: 'Podilsk' }, { name: 'Reni' }, { name: 'Yuzhne' }] },
      { name: 'Rivnenska Oblast', cities: [{ name: 'Bazal’tove' }, { name: 'Berezne' }, { name: 'Dubno' }, { name: 'Kostopil' }, { name: 'Ostroh' }, { name: 'Radyvyliv' }, { name: 'Rivne' }, { name: 'Sarny' }, { name: 'Varash' }, { name: 'Zdolbuniv' }] },
      { name: 'Sevastopol, Misto', cities: [{ name: 'Inkerman' }, { name: 'Sevastopol' }] },
      { name: 'Zaporizka Oblast', cities: [{ name: 'Berdiansk' }, { name: 'Dniprorudne' }, { name: 'Enerhodar' }, { name: 'Kamianka-Dniprovska' }, { name: 'Melitopol' }, { name: 'Polohy' }, { name: 'Tokmak' }, { name: 'Vasylivka' }, { name: 'Vil’nyans’k' }, { name: 'Zaporizhzhia' }] }
    ]
  },
  {
    name: 'United Arab Emirates',
    code: 'AE',
    currency: 'AED',
    currencySymbol: 'د.إ',
    states: [
      { name: '‘Ajmān', cities: [{ name: '‘Ajmān' }] },
      { name: 'Abū Z̧aby', cities: [{ name: 'Abu Dhabi' }, { name: 'Al ‘Ayn' }, { name: 'Madīnat Zāyid' }] },
      { name: 'Al Fujayrah', cities: [{ name: 'Al Fujayrah' }] },
      { name: 'Ash Shāriqah', cities: [{ name: 'Kalbā' }, { name: 'Khawr Fakkān' }, { name: 'Sharjah' }] },
      { name: 'Dubayy', cities: [{ name: 'Dubai' }] },
      { name: 'Ra’s al Khaymah', cities: [{ name: 'Al Jazīrah al Ḩamrā’' }, { name: 'Ra’s al Khaymah' }] },
      { name: 'Umm al Qaywayn', cities: [{ name: 'Umm al Qaywayn' }] }
    ]
  },
{
    name: 'United Kingdom',
    code: 'GB',
    currency: 'GBP',
    currencySymbol: '£',
    states: [
      { name: 'England', 
        cities: [
          { name: 'London' }, { name: 'Manchester' }, { name: 'Birmingham' }, { name: 'Leeds' }, { name: 'Liverpool' }, { name: 'Bristol' }, 
          { name: 'Sheffield' }, { name: 'Newcastle upon Tyne' }, { name: 'Nottingham' }, { name: 'Southampton' }, { name: 'Portsmouth' }, 
          { name: 'Leicester' }, { name: 'Coventry' }, { name: 'Brighton & Hove' }, { name: 'Hull' }, { name: 'Plymouth' }, { name: 'Wolverhampton' }, 
          { name: 'Stoke-on-Trent' }, { name: 'Derby' }, { name: 'Sunderland' }, { name: 'York' }, { name: 'Oxford' }, { name: 'Cambridge' }, 
          { name: 'Norwich' }, { name: 'Exeter' }, { name: 'Lincoln' }, { name: 'Bath' }, { name: 'Chester' }, { name: 'Durham' }, 
          { name: 'Canterbury' }, { name: 'Salisbury' }, { name: 'Winchester' }, { name: 'St Albans' }, { name: 'Chelmsford' }, 
          { name: 'Colchester' }, { name: 'Doncaster' }, { name: 'Milton Keynes' }, { name: 'Southend-on-Sea' }, { name: 'Wakefield' }, 
          { name: 'Worcester' }, { name: 'Peterborough' }, { name: 'Preston' }, { name: 'Gloucester' }, { name: 'Hereford' }, { name: 'Ripon' }, 
          { name: 'Truro' }, { name: 'Wells' }, { name: 'Lichfield' }, { name: 'Ely' }, { name: 'Chichester' }
        ] 
      },
      { name: 'Scotland', 
        cities: [
          { name: 'Glasgow' }, { name: 'Edinburgh' }, { name: 'Aberdeen' }, { name: 'Dundee' }, { name: 'Inverness' }, { name: 'Perth' }, 
          { name: 'Stirling' }, { name: 'Dunfermline' }
        ] 
      },
      { name: 'Wales', 
        cities: [
          { name: 'Cardiff' }, { name: 'Swansea' }, { name: 'Newport' }, { name: 'Wrexham' }, { name: 'Bangor' }, { name: 'St Asaph' }, 
          { name: 'St Davids' }
        ] 
      },
      { name: 'Northern Ireland', 
        cities: [
          { name: 'Belfast' }, { name: 'Derry' }, { name: 'Lisburn' }, { name: 'Newry' }, { name: 'Armagh' }, { name: 'Bangor' }
        ] 
      }
    ]
  },
  // --- UNITED STATES (EXPANSIVE & ACCURATE) ---
  {
    name: 'United States',
    code: 'US',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Alabama', cities: [{ name: 'Birmingham' }, { name: 'Montgomery' }, { name: 'Mobile' }, { name: 'Huntsville' }] },
      { name: 'Alaska', cities: [{ name: 'Anchorage' }, { name: 'Fairbanks' }, { name: 'Juneau' }] },
      { name: 'Arizona', cities: [{ name: 'Phoenix' }, { name: 'Tucson' }, { name: 'Mesa' }, { name: 'Scottsdale' }] },
      { name: 'Arkansas', cities: [{ name: 'Little Rock' }, { name: 'Fort Smith' }, { name: 'Fayetteville' }] },
      { name: 'California', cities: [{ name: 'Los Angeles' }, { name: 'San Francisco' }, { name: 'San Diego' }, { name: 'San Jose' }, { name: 'Sacramento' }] },
      { name: 'Colorado', cities: [{ name: 'Denver' }, { name: 'Colorado Springs' }, { name: 'Aurora' }, { name: 'Boulder' }] },
      { name: 'Connecticut', cities: [{ name: 'Bridgeport' }, { name: 'New Haven' }, { name: 'Hartford' }, { name: 'Stamford' }] },
      { name: 'Delaware', cities: [{ name: 'Wilmington' }, { name: 'Dover' }, { name: 'Newark' }] },
      { name: 'Florida', cities: [{ name: 'Jacksonville' }, { name: 'Miami' }, { name: 'Tampa' }, { name: 'Orlando' }, { name: 'Tallahassee' }] },
      { name: 'Georgia', cities: [{ name: 'Atlanta' }, { name: 'Augusta' }, { name: 'Columbus' }, { name: 'Savannah' }] },
      { name: 'Hawaii', cities: [{ name: 'Honolulu' }, { name: 'Hilo' }, { name: 'Kailua' }] },
      { name: 'Idaho', cities: [{ name: 'Boise' }, { name: 'Meridian' }, { name: 'Nampa' }] },
      { name: 'Illinois', cities: [{ name: 'Chicago' }, { name: 'Aurora' }, { name: 'Rockford' }, { name: 'Springfield' }] },
      { name: 'Indiana', cities: [{ name: 'Indianapolis' }, { name: 'Fort Wayne' }, { name: 'Evansville' }] },
      { name: 'Iowa', cities: [{ name: 'Des Moines' }, { name: 'Cedar Rapids' }, { name: 'Davenport' }] },
      { name: 'Kansas', cities: [{ name: 'Wichita' }, { name: 'Overland Park' }, { name: 'Kansas City' }, { name: 'Topeka' }] },
      { name: 'Kentucky', cities: [{ name: 'Louisville' }, { name: 'Lexington' }, { name: 'Bowling Green' }] },
      { name: 'Louisiana', cities: [{ name: 'New Orleans' }, { name: 'Baton Rouge' }, { name: 'Shreveport' }, { name: 'Metairie' }] },
      { name: 'Maine', cities: [{ name: 'Portland' }, { name: 'Lewiston' }, { name: 'Bangor' }] },
      { name: 'Maryland', cities: [{ name: 'Baltimore' }, { name: 'Frederick' }, { name: 'Rockville' }, { name: 'Gaithersburg' }] },
      { name: 'Massachusetts', cities: [{ name: 'Boston' }, { name: 'Worcester' }, { name: 'Springfield' }, { name: 'Cambridge' }] },
      { name: 'Michigan', cities: [{ name: 'Detroit' }, { name: 'Grand Rapids' }, { name: 'Warren' }, { name: 'Sterling Heights' }] },
      { name: 'Minnesota', cities: [{ name: 'Minneapolis' }, { name: 'Saint Paul' }, { name: 'Rochester' }, { name: 'Duluth' }] },
      { name: 'Mississippi', cities: [{ name: 'Jackson' }, { name: 'Gulfport' }, { name: 'Southaven' }] },
      { name: 'Missouri', cities: [{ name: 'Kansas City' }, { name: 'Saint Louis' }, { name: 'Springfield' }, { name: 'Columbia' }] },
      { name: 'Montana', cities: [{ name: 'Billings' }, { name: 'Missoula' }, { name: 'Great Falls' }] },
      { name: 'Nebraska', cities: [{ name: 'Omaha' }, { name: 'Lincoln' }, { name: 'Bellevue' }] },
      { name: 'Nevada', cities: [{ name: 'Las Vegas' }, { name: 'Henderson' }, { name: 'Reno' }, { name: 'North Las Vegas' }] },
      { name: 'New Hampshire', cities: [{ name: 'Manchester' }, { name: 'Nashua' }, { name: 'Concord' }] },
      { name: 'New Jersey', cities: [{ name: 'Newark' }, { name: 'Jersey City' }, { name: 'Paterson' }, { name: 'Elizabeth' }] },
      { name: 'New Mexico', cities: [{ name: 'Albuquerque' }, { name: 'Las Cruces' }, { name: 'Rio Rancho' }, { name: 'Santa Fe' }] },
      { name: 'New York', cities: [{ name: 'New York City' }, { name: 'Buffalo' }, { name: 'Rochester' }, { name: 'Yonkers' }, { name: 'Syracuse' }] },
      { name: 'North Carolina', cities: [{ name: 'Charlotte' }, { name: 'Raleigh' }, { name: 'Greensboro' }, { name: 'Durham' }, { name: 'Winston-Salem' }] },
      { name: 'North Dakota', cities: [{ name: 'Fargo' }, { name: 'Bismarck' }, { name: 'Grand Forks' }] },
      { name: 'Ohio', cities: [{ name: 'Columbus' }, { name: 'Cleveland' }, { name: 'Cincinnati' }, { name: 'Toledo' }, { name: 'Akron' }] },
      { name: 'Oklahoma', cities: [{ name: 'Oklahoma City' }, { name: 'Tulsa' }, { name: 'Norman' }, { name: 'Broken Arrow' }] },
      { name: 'Oregon', cities: [{ name: 'Portland' }, { name: 'Salem' }, { name: 'Eugene' }, { name: 'Gresham' }] },
      { name: 'Pennsylvania', cities: [{ name: 'Philadelphia' }, { name: 'Pittsburgh' }, { name: 'Allentown' }, { name: 'Erie' }] },
      { name: 'Rhode Island', cities: [{ name: 'Providence' }, { name: 'Warwick' }, { name: 'Cranston' }] },
      { name: 'South Carolina', cities: [{ name: 'Charleston' }, { name: 'Columbia' }, { name: 'North Charleston' }, { name: 'Mount Pleasant' }] },
      { name: 'South Dakota', cities: [{ name: 'Sioux Falls' }, { name: 'Rapid City' }, { name: 'Aberdeen' }] },
      { name: 'Tennessee', cities: [{ name: 'Nashville' }, { name: 'Memphis' }, { name: 'Knoxville' }, { name: 'Chattanooga' }] },
      { name: 'Texas', cities: [{ name: 'Houston' }, { name: 'San Antonio' }, { name: 'Dallas' }, { name: 'Austin' }, { name: 'Fort Worth' }, { name: 'El Paso' }] },
      { name: 'Utah', cities: [{ name: 'Salt Lake City' }, { name: 'West Valley City' }, { name: 'Provo' }, { name: 'West Jordan' }] },
      { name: 'Vermont', cities: [{ name: 'Burlington' }, { name: 'South Burlington' }, { name: 'Rutland' }] },
      { name: 'Virginia', cities: [{ name: 'Virginia Beach' }, { name: 'Norfolk' }, { name: 'Chesapeake' }, { name: 'Richmond' }] },
      { name: 'Washington', cities: [{ name: 'Seattle' }, { name: 'Spokane' }, { name: 'Tacoma' }, { name: 'Vancouver' }] },
      { name: 'West Virginia', cities: [{ name: 'Charleston' }, { name: 'Huntington' }, { name: 'Morgantown' }] },
      { name: 'Wisconsin', cities: [{ name: 'Milwaukee' }, { name: 'Madison' }, { name: 'Green Bay' }, { name: 'Kenosha' }] },
      { name: 'Wyoming', cities: [{ name: 'Cheyenne' }, { name: 'Casper' }, { name: 'Laramie' }] }
    ]
  },
  {
    name: 'Uruguay',
    code: 'UY',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Artigas', cities: [{ name: 'Artigas' }, { name: 'Baltasar Brum' }, { name: 'Bella Unión' }] },
      { name: 'Canelones', cities: [{ name: 'Barros Blancos' }, { name: 'Canelones' }, { name: 'Ciudad de la Costa' }, { name: 'El Pinar' }, { name: 'La Paz' }, { name: 'Las Piedras' }, { name: 'Pando' }, { name: 'Paso de Carrasco' }, { name: 'Progreso' }, { name: 'Santa Lucía' }] },
      { name: 'Cerro Largo', cities: [{ name: 'Melo' }, { name: 'Río Branco' }] },
      { name: 'Maldonado', cities: [{ name: 'Aiguá' }, { name: 'Maldonado' }, { name: 'Piriápolis' }, { name: 'Punta del Este' }, { name: 'San Carlos' }] },
      { name: 'Montevideo', cities: [{ name: 'Montevideo' }] },
      { name: 'Paysandú', cities: [{ name: 'Nuevo Paysandú' }, { name: 'Paysandú' }] },
      { name: 'Rivera', cities: [{ name: 'Rivera' }, { name: 'Tranqueras' }] },
      { name: 'Salto', cities: [{ name: 'Salto' }] },
      { name: 'Soriano', cities: [{ name: 'Dolores' }, { name: 'Mercedes' }] },
      { name: 'Tacuarembó', cities: [{ name: 'Tacuarembó' }] }
    ]
  },
  {
    name: 'Uzbekistan',
    code: 'UZ',
    currency: 'UZS',
    currencySymbol: 'сўм',
    states: [
      { name: 'Andijon', cities: [{ name: 'Andijon' }, { name: 'Asaka' }, { name: 'Buloqboshi' }, { name: 'Dardoq' }, { name: 'Paxtaobod' }, { name: 'Poytug‘' }, { name: 'Qo‘rg‘ontepa' }, { name: 'Qorasuv' }, { name: 'Shahrixon' }, { name: 'Xonobod' }] },
      { name: 'Buxoro', cities: [{ name: 'Bukhara' }, { name: 'G’ijduvon Shahri' }, { name: 'Galaosiyo Shahri' }, { name: 'Jondor Shaharchasi' }, { name: 'Kogon Shahri' }, { name: 'Qorako‘l Shahri' }, { name: 'Qorovulbozor' }, { name: 'Romitan Shahri' }, { name: 'Shofirkon Shahri' }, { name: 'Vobkent Shahri' }] },
      { name: 'Farg‘ona', cities: [{ name: 'Beshariq' }, { name: 'Farg‘ona' }, { name: 'Marg‘ilon' }, { name: 'Oltiariq' }, { name: 'Qo‘qon' }, { name: 'Quva' }, { name: 'Quvasoy' }, { name: 'Rishton' }, { name: 'Yangi Marg‘ilon' }, { name: 'Yaypan' }] },
      { name: 'Jizzax', cities: [{ name: 'Dashtobod' }, { name: 'Do’stlik Shahri' }, { name: 'G’allaorol Shahri' }, { name: 'G’oliblar Qishlog’i' }, { name: 'Gagarin Shahri' }, { name: 'Jizzax' }, { name: 'Paxtakor Shahri' }, { name: 'Uchtepa Qishlog’i' }, { name: 'Usmat Shaharchasi' }, { name: 'Zomin Shaharchasi' }] },
      { name: 'Namangan', cities: [{ name: 'Chortoq' }, { name: 'Chust' }, { name: 'Haqqulobod' }, { name: 'Kosonsoy' }, { name: 'Namangan' }, { name: 'O‘nhayot' }, { name: 'Pop' }, { name: 'To‘raqo‘rg‘on' }, { name: 'Uchqŭrghon Shahri' }, { name: 'Uychi' }] },
      { name: 'Qashqadaryo', cities: [{ name: 'Beshkent Shahri' }, { name: 'Chiroqchi' }, { name: 'G‘uzor' }, { name: 'Kitob' }, { name: 'Nishon Tumani' }, { name: 'Qarshi' }, { name: 'Qorashina' }, { name: 'Shahrisabz' }, { name: 'Yakkabog‘' }, { name: 'Yangi Mirishkor' }] },
      { name: 'Qoraqalpog‘iston', cities: [{ name: 'Beruniy' }, { name: 'Chimboy Shahri' }, { name: 'Manghit' }, { name: 'Nukus' }, { name: 'Oltinko‘l' }, { name: 'Qo‘ng‘irot Shahri' }, { name: 'Qŭnghirot' }, { name: 'Taxtako‘pir' }, { name: 'Tŭrtkŭl' }, { name: 'Xo‘jayli Shahri' }] },
      { name: 'Samarqand', cities: [{ name: 'Bulung’ur Shahri' }, { name: 'Chelak' }, { name: 'Ishtixon Shahri' }, { name: 'Jomboy Shahri' }, { name: 'Juma Shahri' }, { name: 'Kattaqo’rg’on Shahri' }, { name: 'Kimyogarlar' }, { name: 'Oqtosh Shahri' }, { name: 'Samarkand' }, { name: 'Urgut Shahri' }] },
      { name: 'Surxondaryo', cities: [{ name: 'Boysun' }, { name: 'Denov' }, { name: 'Jarqo‘rg‘on' }, { name: 'Qumqo‘rg‘on' }, { name: 'Sariosiyo' }, { name: 'Sariq' }, { name: 'Sherobod' }, { name: 'Sho‘rchi' }, { name: 'Termiz' }, { name: 'Uzun' }] },
      { name: 'Toshkent', cities: [{ name: 'Angren' }, { name: 'Bekobod' }, { name: 'Chirchiq' }, { name: 'Keles' }, { name: 'Ohangaron' }, { name: 'Olmaliq' }, { name: 'Parkent' }, { name: 'Piskent' }, { name: 'Tashkent' }, { name: 'Yangiyŭl' }] }
    ]
  },
  {
    name: 'Vanuatu',
    code: 'VU',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Malampa', cities: [{ name: 'Lakatoro' }] },
      { name: 'Penama', cities: [{ name: 'Saratamata' }] },
      { name: 'Sanma', cities: [{ name: 'Luganville' }] },
      { name: 'Shefa', cities: [{ name: 'Port-Vila' }] },
      { name: 'Tafea', cities: [{ name: 'Isangel' }] },
      { name: 'Torba', cities: [{ name: 'Sola' }] }
    ]
  },
  {
    name: 'Vatican City',
    code: 'VA',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Vatican City' }] }
    ]
  },
  {
    name: 'Venezuela',
    code: 'VE',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Anzoátegui', cities: [{ name: 'Anaco' }, { name: 'Aragua de Barcelona' }, { name: 'Barcelona' }, { name: 'Cantaura' }, { name: 'Clarines' }, { name: 'El Tigre' }, { name: 'Guanta' }, { name: 'Lecherías' }, { name: 'Píritu' }, { name: 'Puerto La Cruz' }] },
      { name: 'Aragua', cities: [{ name: 'Cagua' }, { name: 'El Consejo' }, { name: 'El Limón' }, { name: 'La Victoria' }, { name: 'Maracay' }, { name: 'Palo Negro' }, { name: 'San Mateo' }, { name: 'Santa Rita' }, { name: 'Turmero' }, { name: 'Villa de Cura' }] },
      { name: 'Bolívar', cities: [{ name: 'Cedeño' }, { name: 'Ciudad Bolívar' }, { name: 'Ciudad Guayana' }, { name: 'Ciudad Piar' }, { name: 'El Callao' }, { name: 'El Dorado' }, { name: 'El Palmar' }, { name: 'Guasipati' }, { name: 'Santa Elena de Uairén' }, { name: 'Upata' }] },
      { name: 'Carabobo', cities: [{ name: 'Guacara' }, { name: 'Güigüe' }, { name: 'Los Guayos' }, { name: 'Montalbán' }, { name: 'Puerto Cabello' }, { name: 'San Diego' }, { name: 'Tocuyito' }, { name: 'Valencia' }] },
      { name: 'Distrito Capital', cities: [{ name: 'Caracas' }] },
      { name: 'La Guaira', cities: [{ name: 'Caraballeda' }, { name: 'Catia La Mar' }, { name: 'La Guaira' }, { name: 'Maiquetía' }] },
      { name: 'Lara', cities: [{ name: 'Barquisimeto' }, { name: 'Cabudare' }, { name: 'Carora' }, { name: 'El Tocuyo' }, { name: 'Quíbor' }, { name: 'Sanare' }, { name: 'Sarare' }] },
      { name: 'Monagas', cities: [{ name: 'Aguasay' }, { name: 'Caripito' }, { name: 'Maturín' }, { name: 'Punceres' }, { name: 'Santa Bárbara' }, { name: 'Uracoa' }] },
      { name: 'Sucre', cities: [{ name: 'Carúpano' }, { name: 'Cumaná' }, { name: 'Macuro' }, { name: 'Río Caribe' }, { name: 'San Antonio del Golfo' }, { name: 'San José de Aerocuar' }, { name: 'Yaguaraparo' }] },
      { name: 'Zulia', cities: [{ name: 'Cabimas' }, { name: 'Ciudad Ojeda' }, { name: 'Machiques' }, { name: 'Maracaibo' }, { name: 'San Carlos del Zulia' }, { name: 'Santa Rita' }] }
    ]
  },
  {
    name: 'Vietnam',
    code: 'VN',
    currency: 'VND',
    currencySymbol: '₫',
    states: [
      { name: 'Cần Thơ', cities: [{ name: 'Ấp Khánh Hưng' }, { name: 'Cần Thơ' }] },
      { name: 'Đồng Nai', cities: [{ name: 'Biên Hòa' }, { name: 'Bửu Long' }, { name: 'Hiệp Hòa' }, { name: 'Hố Nai' }, { name: 'Long Bình' }, { name: 'Long Khánh' }, { name: 'Long Thành' }, { name: 'Tam Hiệp' }, { name: 'Tân Phú' }] },
      { name: 'Hà Nội', cities: [{ name: 'Hanoi' }, { name: 'Mỹ Lương' }, { name: 'Sơn Tây' }] },
      { name: 'Hải Phòng', cities: [{ name: 'Haiphong' }] },
      { name: 'Hồ Chí Minh', cities: [{ name: 'Ho Chi Minh City' }, { name: 'Tân An' }, { name: 'Thủ Đức' }] },
      { name: 'Khánh Hòa', cities: [{ name: 'Cam Ranh' }, { name: 'Nha Trang' }, { name: 'Ninh Hòa' }] },
      { name: 'Nghệ An', cities: [{ name: 'Cửa Lô' }, { name: 'Nhân Trạch' }, { name: 'Vinh' }] },
      { name: 'Ninh Bình', cities: [{ name: 'Ninh Bình' }, { name: 'Tam Điệp' }] },
      { name: 'Thanh Hóa', cities: [{ name: 'Bỉm Sơn' }, { name: 'Nghi Sơn' }, { name: 'Sầm Sơn' }, { name: 'Tân Phong' }, { name: 'Thanh Hóa' }] },
      { name: 'Thừa Thiên-Huế', cities: [{ name: 'Huế' }, { name: 'Hương Thủy' }, { name: 'Hương Trà' }, { name: 'Thuân An' }] }
    ]
  },
  {
    name: 'Virgin Islands, British',
    code: 'VG',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Road Town' }] }
    ]
  },
  {
    name: 'Wallis and Futuna',
    code: 'WF',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Sigave', cities: [{ name: 'Leava' }] },
      { name: 'Uvea', cities: [{ name: 'Mata-Utu' }] }
    ]
  },
  {
    name: 'West Bank',
    code: 'XW',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Unknown', cities: [{ name: 'Az̧ Z̧āhirīyah' }, { name: 'Baytūnyā' }, { name: 'Bethlehem' }, { name: 'Hebron' }, { name: 'Janīn' }, { name: 'Nāblus' }, { name: 'Qalqīlyah' }, { name: 'Ramallah' }, { name: 'Ţūlkarm' }, { name: 'Yattir' }] }
    ]
  },
  {
    name: 'Yemen',
    code: 'YE',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: '‘Adan', cities: [{ name: 'Aden' }, { name: 'Al Ma‘allā’' }, { name: 'Al Manşūrah' }, { name: 'Ash Shaykh ‘Uthmān' }, { name: 'At Tawāhī' }] },
      { name: 'Al Bayḑā’', cities: [{ name: 'Al Bayḑā’' }, { name: 'Radā‘' }] },
      { name: 'Al Ḩudaydah', cities: [{ name: 'Al Ḩudaydah' }, { name: 'Az Zaydīyah' }, { name: 'Bājil' }, { name: 'Bayt al Faqīh' }, { name: 'Zabīd' }] },
      { name: 'Amānat al ‘Āşimah', cities: [{ name: 'Sanaa' }] },
      { name: 'Dhamār', cities: [{ name: 'Dhamār' }, { name: 'Ma‘bar' }] },
      { name: 'Ḩaḑramawt', cities: [{ name: 'Ad Dīs' }, { name: 'Al Mukallā' }, { name: 'Ash Shiḩr' }, { name: 'Say’ūn' }, { name: 'Tarīm' }] },
      { name: 'Ḩajjah', cities: [{ name: 'Ḩajjah' }] },
      { name: 'Ibb', cities: [{ name: 'Al Qā‘idah' }, { name: 'Ibb' }, { name: 'Jiblah' }, { name: 'Yarīm' }] },
      { name: 'Şa‘dah', cities: [{ name: 'Dammāj' }, { name: 'Şa‘dah' }] },
      { name: 'Ta‘izz', cities: [{ name: 'Al Misrākh' }, { name: 'Mocha' }, { name: 'Ta‘izz' }] }
    ]
  },
  {
    name: 'Zambia',
    code: 'ZM',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Central', cities: [{ name: 'Kabwe' }, { name: 'Kapiri Mposhi' }, { name: 'Mumbwa' }] },
      { name: 'Copperbelt', cities: [{ name: 'Bwana Mkubwa' }, { name: 'Chifubu' }, { name: 'Chililabombwe' }, { name: 'Chingola' }, { name: 'Kitwe' }, { name: 'Luanshya' }, { name: 'Mufulira' }, { name: 'Ndola' }] },
      { name: 'Eastern', cities: [{ name: 'Chipata' }, { name: 'Lundazi' }, { name: 'Nyimba' }] },
      { name: 'Luapula', cities: [{ name: 'Kashikishi' }, { name: 'Kawambwa' }, { name: 'Mansa' }, { name: 'Nchelenge' }] },
      { name: 'Lusaka', cities: [{ name: 'Kafue' }, { name: 'Lusaka' }] },
      { name: 'Muchinga', cities: [{ name: 'Chilonga' }, { name: 'Chinsali' }, { name: 'Mpika' }, { name: 'Nakonde' }] },
      { name: 'North-Western', cities: [{ name: 'Kasempa' }, { name: 'Mwinilunga' }, { name: 'Solwezi' }, { name: 'Zambezi' }] },
      { name: 'Northern', cities: [{ name: 'Kasama' }, { name: 'Mbala' }, { name: 'Mporokoso' }] },
      { name: 'Southern', cities: [{ name: 'Chirundu' }, { name: 'Choma' }, { name: 'Livingstone' }, { name: 'Mazabuka' }] },
      { name: 'Western', cities: [{ name: 'Kalabo' }, { name: 'Kaoma' }, { name: 'Lukulu' }, { name: 'Mongu' }, { name: 'Senanga' }, { name: 'Sesheke' }] }
    ]
  },
  {
    name: 'Zimbabwe',
    code: 'ZW',
    currency: 'XOF',
    currencySymbol: 'CFA',
    states: [
      { name: 'Bulawayo', cities: [{ name: 'Bulawayo' }] },
      { name: 'Harare', cities: [{ name: 'Chitungwiza' }, { name: 'Harare' }] },
      { name: 'Manicaland', cities: [{ name: 'Chipinge' }, { name: 'Mutare' }, { name: 'Rusape' }, { name: 'Sakubva' }] },
      { name: 'Mashonaland Central', cities: [{ name: 'Bindura' }, { name: 'Mazoe' }, { name: 'Mukumbura' }, { name: 'Mvurwi' }, { name: 'Shamva' }] },
      { name: 'Mashonaland East', cities: [{ name: 'Chivhu' }, { name: 'Marondera' }, { name: 'Murehwa' }, { name: 'Mutoko' }, { name: 'Ruwa' }] },
      { name: 'Mashonaland West', cities: [{ name: 'Chegutu' }, { name: 'Chinhoyi' }, { name: 'Kadoma' }, { name: 'Kariba' }, { name: 'Karoi' }, { name: 'Mhangura' }, { name: 'Norton' }] },
      { name: 'Masvingo', cities: [{ name: 'Chiredzi' }, { name: 'Masvingo' }, { name: 'Zvishavane' }] },
      { name: 'Matabeleland North', cities: [{ name: 'Hwange' }, { name: 'Lupane' }, { name: 'Nkayi' }, { name: 'Victoria Falls' }] },
      { name: 'Matabeleland South', cities: [{ name: 'Beitbridge' }, { name: 'Gwanda' }, { name: 'Kezi' }, { name: 'Plumtree' }] },
      { name: 'Midlands', cities: [{ name: 'Gweru' }, { name: 'Kwekwe' }, { name: 'Redcliff' }, { name: 'Shurugwi' }] }
    ]
  },
];

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
