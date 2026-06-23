// ============================================================
// IGST ACT 2017 — SECTIONS 9–13 SCENARIOS
// ============================================================

const SCENARIOS = [

  // -------- SECTION 9: TERRITORIAL WATERS --------
  {
    id: 'sec9_territorial_waters',
    title: 'Supply in Territorial Waters',
    section: '9',
    sectionLabel: 'Section 9',
    keywords: ['territorial waters', 'sea', 'coastal', 'ocean', 'offshore', 'marine', 'fishing', 'vessel sea'],
    type: 'goods_territorial',
    supplierType: null,
    recipientType: null,
    desc: 'Supplier or place of supply is in territorial waters (sea up to 12 nautical miles from Indian coastline)',
    questionText: 'A supplier located in the territorial waters of India supplies goods. What is the place of supply?',
    options: [
      { id: 'a', text: 'Location of the supplier at sea', sub: 'Exact sea coordinates' },
      { id: 'b', text: 'Nearest coastal State/UT baseline', sub: 'Deemed land location', correct: true },
      { id: 'c', text: 'Location of recipient', sub: 'On land' },
      { id: 'd', text: 'Port of entry', sub: 'Customs checkpoint' }
    ],
    provision: 'Section 9 of the IGST Act, 2017 provides that where the location of the supplier or the place of supply is in the territorial waters, it shall be deemed to be in the coastal State or Union territory where the nearest point of the appropriate baseline is located. This ensures that transactions in the sea are attributed to an identifiable State for tax purposes.',
    reason_wrong: 'The actual sea coordinates cannot be a "State" under GST. Section 9 specifically deems the location to be the nearest coastal State/UT baseline — not the sea position, the recipient\'s location, or the port.'
  },

  // -------- SECTION 10: GOODS (DOMESTIC) --------
  {
    id: 'sec10_movement',
    title: 'Goods with Movement (Door Delivery)',
    section: '10',
    sectionLabel: 'Section 10(1)(a)',
    keywords: ['goods', 'movement', 'delivery', 'transport goods', 'domestic goods', 'shipped goods', 'goods delivered'],
    type: 'goods_domestic',
    supplierType: null,
    recipientType: null,
    desc: 'Goods involving movement — supplier in one state, recipient in another',
    questionText: 'A supplier in Maharashtra sends goods to a recipient in Karnataka. The goods are physically transported and delivered. What is the place of supply?',
    options: [
      { id: 'a', text: 'Location of the supplier', sub: 'Maharashtra' },
      { id: 'b', text: 'Location where delivery/movement terminates', sub: 'Karnataka — where goods are delivered', correct: true },
      { id: 'c', text: 'Location of dispatch', sub: 'Point of origin' },
      { id: 'd', text: 'Location of the transporter', sub: 'GTA\'s state' }
    ],
    provision: 'Section 10(1)(a) of the IGST Act, 2017 provides that where the supply involves movement of goods (by supplier, recipient, or any other person), the place of supply shall be the location of the goods at the time at which the movement terminates for delivery to the recipient — i.e., Karnataka in this case.',
    reason_wrong: 'Where goods are moved and physically delivered, the place of supply is the destination — where the movement terminates — not the origin of supply or the transporter\'s location. Section 10(1)(a) is clear on this.'
  },
  {
    id: 'sec10_bill_to_ship',
    title: 'Bill to — Ship to (Third Party Direction)',
    section: '10',
    sectionLabel: 'Section 10(1)(b)',
    keywords: ['bill to ship to', 'third party', 'direction', 'agent goods', 'deemed receipt', 'intermediate', 'drop shipping'],
    type: 'goods_domestic',
    desc: 'Supplier delivers goods to a third party on direction of the buyer',
    questionText: 'A Delhi buyer (B) orders goods from a Chennai supplier (A). The supplier delivers goods directly to a Pune customer (C) of B, as directed by B. What is the place of supply for A\'s supply to B?',
    options: [
      { id: 'a', text: 'Pune — location of actual delivery (C)', sub: 'Where goods physically reach' },
      { id: 'b', text: 'Delhi — principal place of business of B', sub: 'Third party who gave direction', correct: true },
      { id: 'c', text: 'Chennai — location of supplier A', sub: 'Origin of goods' },
      { id: 'd', text: 'Pune — recipient C\'s location', sub: 'End customer' }
    ],
    provision: 'Section 10(1)(b) of the IGST Act, 2017: Where goods are delivered to a recipient or any other person on the direction of a third person (before or during movement), it shall be deemed that the third person (B) has received the goods, and the place of supply shall be the principal place of business of such third person (Delhi — B\'s location). This is the classic "Bill-to Ship-to" scenario.',
    reason_wrong: 'The deeming fiction in Section 10(1)(b) treats the directing third party (B in Delhi) as the recipient. The actual physical delivery location (Pune) or the supplier\'s location (Chennai) are irrelevant for this supply leg.'
  },
  {
    id: 'sec10_no_movement',
    title: 'Goods Without Movement',
    section: '10',
    sectionLabel: 'Section 10(1)(c)',
    keywords: ['goods no movement', 'goods at location', 'stationary goods', 'goods not moved', 'ex-works'],
    type: 'goods_domestic',
    desc: 'Goods are not physically moved — recipient collects or uses at supplier\'s premises',
    questionText: 'A buyer from Haryana purchases goods sitting in a warehouse in Rajasthan and takes title without physically moving the goods. What is the place of supply?',
    options: [
      { id: 'a', text: 'Location of buyer — Haryana', sub: 'Where the buyer is registered' },
      { id: 'b', text: 'Location of goods at the time of delivery — Rajasthan', sub: 'Where goods actually are', correct: true },
      { id: 'c', text: 'Location of supplier', sub: 'Supplier\'s registered address' },
      { id: 'd', text: 'Location of payment', sub: 'Where payment is made from' }
    ],
    provision: 'Section 10(1)(c) of the IGST Act, 2017: Where the supply does not involve movement of goods, the place of supply shall be the location of such goods at the time of delivery to the recipient — Rajasthan (where the warehouse is). This ensures the tax is attributed to where the goods actually are, not where the buyer is.',
    reason_wrong: 'When goods don\'t move, the place of supply is the physical location of the goods — not the buyer\'s state or the supplier\'s registered office. Section 10(1)(c) specifically addresses this scenario.'
  },
  {
    id: 'sec10_installation',
    title: 'Goods Assembled / Installed at Site',
    section: '10',
    sectionLabel: 'Section 10(1)(d)',
    keywords: ['installation', 'assembly', 'erected', 'commissioned', 'plant machinery', 'site assembly', 'installed goods'],
    type: 'goods_domestic',
    desc: 'Goods are assembled or installed at a site in a different state',
    questionText: 'A machinery manufacturer in Gujarat assembles and installs industrial equipment at a factory site in Odisha. What is the place of supply?',
    options: [
      { id: 'a', text: 'Gujarat — location of manufacturer', sub: 'Where goods are made' },
      { id: 'b', text: 'Location of installation site — Odisha', sub: 'Where assembly/installation happens', correct: true },
      { id: 'c', text: 'Location of buyer\'s registered office', sub: 'Corporate HQ address' },
      { id: 'd', text: 'Port/hub where goods first enter Odisha', sub: 'Point of entry' }
    ],
    provision: 'Section 10(1)(d) of the IGST Act, 2017: Where goods are assembled or installed at site, the place of supply shall be the place of such installation or assembly — Odisha in this case. The rationale is that the economic value is created at the installation site.',
    reason_wrong: 'For goods requiring assembly or installation, Section 10(1)(d) explicitly provides that the place of supply is the installation/assembly site, regardless of where the manufacturer is located or where the buyer\'s registered office is.'
  },
  {
    id: 'sec10_onboard',
    title: 'Goods Supplied On Board a Conveyance',
    section: '10',
    sectionLabel: 'Section 10(1)(e)',
    keywords: ['onboard', 'aircraft food', 'train food', 'vessel goods', 'goods onboard', 'in-flight', 'ship supply'],
    type: 'goods_domestic',
    desc: 'Goods supplied on a vessel, aircraft, train, or motor vehicle',
    questionText: 'A food vendor supplies meals on a train at Nagpur station (midway through a journey from Mumbai to Kolkata). What is the place of supply?',
    options: [
      { id: 'a', text: 'Kolkata — final destination of the train', sub: 'End of journey' },
      { id: 'b', text: 'Mumbai — first point of departure', sub: 'Where journey started' },
      { id: 'c', text: 'Nagpur — where goods are taken on board', sub: 'Point of loading onto conveyance', correct: true },
      { id: 'd', text: 'Location of the passenger', sub: 'Where passenger is registered' }
    ],
    provision: 'Section 10(1)(e) of the IGST Act, 2017: Where goods are supplied on board a conveyance (vessel, aircraft, train, or motor vehicle), the place of supply shall be the location at which such goods are taken on board — Nagpur in this case.',
    reason_wrong: 'For on-board supply of goods, it\'s the boarding point (where goods are loaded onto the conveyance) that matters under Section 10(1)(e) — not the final destination, origin of journey, or passenger\'s location.'
  },

  // -------- SECTION 11: IMPORT/EXPORT OF GOODS --------
  {
    id: 'sec11_import',
    title: 'Import of Goods into India',
    section: '11',
    sectionLabel: 'Section 11(a)',
    keywords: ['import', 'imported goods', 'goods from abroad', 'customs', 'foreign goods', 'foreign supplier goods'],
    type: 'goods_import',
    desc: 'Foreign supplier sends goods to Indian importer',
    questionText: 'A company in China exports machinery to an importer in Tamil Nadu. What is the place of supply of these imported goods?',
    options: [
      { id: 'a', text: 'China — location of the foreign supplier', sub: 'Where goods originated' },
      { id: 'b', text: 'Port of entry — e.g., Chennai Port', sub: 'Where customs clearance happens' },
      { id: 'c', text: 'Location of the importer — Tamil Nadu', sub: 'Where the Indian buyer is located', correct: true },
      { id: 'd', text: 'Location of goods at customs clearance', sub: 'Warehouse/port' }
    ],
    provision: 'Section 11(a) of the IGST Act, 2017: The place of supply of goods imported into India shall be the location of the importer — Tamil Nadu in this case. This is a specific rule that departs from the movement-based rule; the importer\'s location is the deemed place of supply.',
    reason_wrong: 'Section 11(a) specifically provides that for imported goods, the place of supply is the location of the importer, not the port of entry, the foreign supplier\'s location, or any intermediate point.'
  },
  {
    id: 'sec11_export',
    title: 'Export of Goods from India',
    section: '11',
    sectionLabel: 'Section 11(b)',
    keywords: ['export', 'exported goods', 'goods outside india', 'foreign buyer goods', 'zero rated goods', 'overseas buyer'],
    type: 'goods_export',
    desc: 'Indian supplier exports goods to a foreign buyer',
    questionText: 'An exporter in Maharashtra sends garments to a buyer in the USA. What is the place of supply?',
    options: [
      { id: 'a', text: 'Maharashtra — location of the exporter', sub: 'Where goods are shipped from' },
      { id: 'b', text: 'Location outside India — USA', sub: 'Where goods are exported to', correct: true },
      { id: 'c', text: 'Mumbai Port — point of export', sub: 'Last Indian point' },
      { id: 'd', text: 'Location of buyer\'s Indian agent', sub: 'Intermediary' }
    ],
    provision: 'Section 11(b) of the IGST Act, 2017: The place of supply of goods exported from India shall be the location outside India — USA in this case. This makes the export a zero-rated supply under Section 16, enabling the exporter to claim refund of input taxes.',
    reason_wrong: 'Section 11(b) categorically states that the place of supply for exported goods is the location outside India (the foreign destination). The exporter\'s Indian location, the port, or the agent are not the place of supply.'
  },

  // -------- SECTION 12: SERVICES (BOTH IN INDIA) --------
  {
    id: 'sec12_general_registered',
    title: 'General Services to Registered Person (B2B)',
    section: '12',
    sectionLabel: 'Section 12(2)(a)',
    keywords: ['b2b services', 'registered recipient services', 'consulting registered', 'services to company', 'business services', 'advisory'],
    type: 'services_india',
    desc: 'Services (not specifically covered elsewhere) provided to a GST-registered recipient',
    questionText: 'A consulting firm in Delhi provides management consulting services to a registered company headquartered in Bengaluru, Karnataka. What is the place of supply?',
    options: [
      { id: 'a', text: 'Delhi — location of the service provider', sub: 'Where work is done' },
      { id: 'b', text: 'Bengaluru, Karnataka — location of registered recipient', sub: 'Where the customer is registered', correct: true },
      { id: 'c', text: 'Where services are actually performed', sub: 'Physical work location' },
      { id: 'd', text: 'Location of payment', sub: 'Where invoice is paid from' }
    ],
    provision: 'Section 12(2)(a) of the IGST Act, 2017: For services (other than those in Sections 12(3)–(14)) provided to a registered person, the place of supply shall be the location of such registered person — Karnataka (Bengaluru) in this case. This is the general B2B rule for services.',
    reason_wrong: 'For B2B services not covered by specific provisions (Sec 12(3)–(14)), the general rule in Section 12(2)(a) applies: the place of supply is the registered recipient\'s location — not the supplier\'s location or where the service is physically performed.'
  },
  {
    id: 'sec12_general_unregistered',
    title: 'General Services to Unregistered Person (B2C)',
    section: '12',
    sectionLabel: 'Section 12(2)(b)',
    keywords: ['b2c services', 'unregistered recipient services', 'individual services', 'consumer services', 'freelance to individual'],
    type: 'services_india',
    desc: 'Services provided to an unregistered individual consumer',
    questionText: 'A graphic designer in Pune provides logo design to an unregistered individual whose address on record is in Hyderabad. What is the place of supply?',
    options: [
      { id: 'a', text: 'Pune — location of the designer', sub: 'Where service is provided from' },
      { id: 'b', text: 'Hyderabad — recipient\'s address on record', sub: 'Customer\'s registered address', correct: true },
      { id: 'c', text: 'Location where designer and client meet', sub: 'Place of meeting' },
      { id: 'd', text: 'State of billing', sub: 'Where invoice is generated' }
    ],
    provision: 'Section 12(2)(b)(i) of the IGST Act, 2017: For services to an unregistered person, the place of supply shall be the location of the recipient where the address on record exists — Hyderabad in this case. If no address is on record, the place of supply is the location of the supplier.',
    reason_wrong: 'For B2C general services, if the recipient\'s address is on record, that address is the place of supply per Section 12(2)(b)(i). The supplier\'s location is a fallback only when no address on record exists for the recipient.'
  },
  {
    id: 'sec12_immovable',
    title: 'Services Related to Immovable Property',
    section: '12',
    sectionLabel: 'Section 12(3)',
    keywords: ['immovable property', 'real estate', 'construction', 'architect', 'interior decorator', 'hotel accommodation', 'rental property', 'building services'],
    type: 'services_india',
    desc: 'Architect, construction, hotel, real estate, accommodation services',
    questionText: 'An architect based in Mumbai provides architectural services for a building project located in Goa. The client is registered in Maharashtra. What is the place of supply?',
    options: [
      { id: 'a', text: 'Maharashtra — location of the registered client', sub: 'Client\'s registration state' },
      { id: 'b', text: 'Mumbai — location of the architect', sub: 'Where work is done' },
      { id: 'c', text: 'Goa — location of the immovable property', sub: 'Where the property is situated', correct: true },
      { id: 'd', text: 'Location of architect\'s office where plans are drawn', sub: 'Work output location' }
    ],
    provision: 'Section 12(3)(a) of the IGST Act, 2017: The place of supply of services directly in relation to an immovable property (including services by architects, interior decorators, engineers, estate agents) shall be the location at which the immovable property is located or intended to be located — Goa in this case. This applies even when both parties are in India.',
    reason_wrong: 'Services directly in relation to immovable property follow the property location, not the service provider\'s or client\'s location. Section 12(3) overrides the general B2B rule even for registered persons.'
  },
  {
    id: 'sec12_restaurant',
    title: 'Restaurant / Catering / Personal Services',
    section: '12',
    sectionLabel: 'Section 12(4)',
    keywords: ['restaurant', 'catering', 'food services', 'beauty salon', 'spa', 'grooming', 'fitness', 'health service', 'gym'],
    type: 'services_india',
    desc: 'Restaurant, catering, personal grooming, fitness, beauty, health services',
    questionText: 'A catering company from Tamil Nadu provides catering services at a wedding event held in Kerala. What is the place of supply?',
    options: [
      { id: 'a', text: 'Tamil Nadu — location of caterer', sub: 'Where the caterer is based' },
      { id: 'b', text: 'Location where services are actually performed — Kerala', sub: 'Where the event/service happens', correct: true },
      { id: 'c', text: 'Location of the event organiser', sub: 'Who booked the caterer' },
      { id: 'd', text: 'Location of the wedding couple', sub: 'End beneficiaries' }
    ],
    provision: 'Section 12(4) of the IGST Act, 2017: The place of supply of restaurant and catering services, personal grooming, fitness, beauty treatment, and health services (including cosmetic surgery) shall be the location where the services are actually performed — Kerala in this case.',
    reason_wrong: 'Section 12(4) mandates the place of actual performance for restaurant, catering, and personal services — not the caterer\'s home state, the organiser\'s location, or the client\'s location.'
  },
  {
    id: 'sec12_training',
    title: 'Training & Performance Appraisal Services',
    section: '12',
    sectionLabel: 'Section 12(5)',
    keywords: ['training', 'coaching', 'performance appraisal', 'workshop', 'seminar', 'education services registered'],
    type: 'services_india',
    desc: 'Training provided to a registered or unregistered person',
    questionText: 'A training company in Hyderabad provides professional training services to employees of a company registered in Jharkhand. The training is conducted in Hyderabad. What is the place of supply?',
    options: [
      { id: 'a', text: 'Hyderabad, Telangana — where training is conducted', sub: 'Physical location of training' },
      { id: 'b', text: 'Jharkhand — location of the registered recipient', sub: 'Client\'s registration state', correct: true },
      { id: 'c', text: 'Location of individual trainees\' homes', sub: 'Employees\' addresses' },
      { id: 'd', text: 'Location of the training institution', sub: 'Hyderabad' }
    ],
    provision: 'Section 12(5)(a) of the IGST Act, 2017: The place of supply of services in relation to training and performance appraisal to a registered person shall be the location of such registered person — Jharkhand in this case. Note: If the recipient were unregistered, the place of supply would be where the training is actually performed.',
    reason_wrong: 'For training services to a REGISTERED person, Section 12(5)(a) says the place of supply is the registered recipient\'s location (Jharkhand), not where training is physically conducted. This is different from the rule for unregistered recipients.'
  },
  {
    id: 'sec12_admission_event',
    title: 'Admission to Events / Amusement Parks',
    section: '12',
    sectionLabel: 'Section 12(6)',
    keywords: ['admission event', 'event ticket', 'amusement park', 'cultural event', 'sports event', 'concert', 'exhibition entry'],
    type: 'services_india',
    desc: 'Admission to cultural, artistic, sports, educational, entertainment events or amusement parks',
    questionText: 'A company sells tickets to an IPL cricket match held in Mumbai. What is the place of supply for the ticketing service?',
    options: [
      { id: 'a', text: 'Location of the ticketing company', sub: 'Where tickets are sold from' },
      { id: 'b', text: 'Location of the buyer', sub: 'Where fan lives' },
      { id: 'c', text: 'Mumbai — where the event is actually held', sub: 'Event venue location', correct: true },
      { id: 'd', text: 'Location of sports body (BCCI)', sub: 'Governing authority' }
    ],
    provision: 'Section 12(6) of the IGST Act, 2017: The place of supply of services provided by way of admission to a cultural, artistic, sporting, scientific, educational, entertainment event or amusement park shall be the place where the event is actually held or where the park is located — Mumbai in this case.',
    reason_wrong: 'For admission-to-event services, the place of supply is the event venue — not the ticket seller\'s location or the buyer\'s home state. Section 12(6) is explicit on this.'
  },
  {
    id: 'sec12_transport_goods_registered',
    title: 'Transportation of Goods (GTA to Registered)',
    section: '12',
    sectionLabel: 'Section 12(8)',
    keywords: ['goods transport', 'gta', 'courier', 'freight', 'logistics', 'transportation goods', 'mail', 'cargo'],
    type: 'services_india',
    desc: 'GTA or courier transports goods for a registered person',
    questionText: 'A goods transport company (GTA) in Delhi transports goods for a registered company in Punjab from Delhi to Bengaluru. What is the place of supply of the transport service?',
    options: [
      { id: 'a', text: 'Delhi — where goods are handed over', sub: 'Point of origin' },
      { id: 'b', text: 'Bengaluru — final destination of goods', sub: 'Where goods go' },
      { id: 'c', text: 'Punjab — location of the registered recipient', sub: 'Client\'s GST registration state', correct: true },
      { id: 'd', text: 'Delhi — location of the GTA', sub: 'Transport company\'s state' }
    ],
    provision: 'Section 12(8)(a) of the IGST Act, 2017: The place of supply of services by way of transportation of goods (including mail/courier) to a registered person shall be the location of such person — Punjab (where the service recipient is registered). The origin/destination of the goods is irrelevant here.',
    reason_wrong: 'For GTA services to a registered recipient, Section 12(8)(a) provides the place of supply as the registered recipient\'s location (Punjab) — not where goods start from or where they end up.'
  },
  {
    id: 'sec12_passenger_transport',
    title: 'Passenger Transportation Service',
    section: '12',
    sectionLabel: 'Section 12(9)',
    keywords: ['passenger transport', 'flight ticket', 'bus ticket', 'train ticket', 'travel ticket', 'airlines', 'passenger'],
    type: 'services_india',
    desc: 'Passenger transportation — flight, bus, or train ticket',
    questionText: 'An airline sells a ticket for a flight from Hyderabad to London to an unregistered individual. Where does the passenger board? The flight departs Hyderabad. What is the place of supply?',
    options: [
      { id: 'a', text: 'London — destination of the passenger', sub: 'Where passenger is going' },
      { id: 'b', text: 'Location of airline\'s registered office', sub: 'Airline\'s home state' },
      { id: 'c', text: 'Hyderabad — point of embarkation', sub: 'Where passenger boards for continuous journey', correct: true },
      { id: 'd', text: 'Location of passenger\'s home', sub: 'Passenger\'s residence' }
    ],
    provision: 'Section 12(9)(b) of the IGST Act, 2017: For passenger transportation service to a person other than a registered person, the place of supply shall be the place where the passenger embarks on the conveyance for a continuous journey — Hyderabad (the embarkation point). For a registered person, it would be the location of such registered person.',
    reason_wrong: 'For unregistered passengers, Section 12(9)(b) makes the embarkation point the place of supply — not the destination, not the airline\'s office. If the recipient were a registered business, the rule would be different (Section 12(9)(a)).'
  },
  {
    id: 'sec12_onboard_services',
    title: 'Services on Board a Conveyance',
    section: '12',
    sectionLabel: 'Section 12(10)',
    keywords: ['onboard services', 'services aircraft', 'in-flight service', 'train service', 'vessel service', 'conveyance service'],
    type: 'services_india',
    desc: 'Services provided on board aircraft, train, vessel, or motor vehicle',
    questionText: 'An airline provides Wi-Fi services on a flight that departs from Delhi and arrives in Mumbai. What is the place of supply of the Wi-Fi service?',
    options: [
      { id: 'a', text: 'Mumbai — final destination', sub: 'Where flight lands' },
      { id: 'b', text: 'Delhi — first scheduled point of departure', sub: 'Where the journey begins', correct: true },
      { id: 'c', text: 'Mid-air — where service is actually consumed', sub: 'Above Madhya Pradesh' },
      { id: 'd', text: 'Location of passenger\'s home', sub: 'Residence of consumer' }
    ],
    provision: 'Section 12(10) of the IGST Act, 2017: The place of supply of services on board a conveyance (vessel, aircraft, train, or motor vehicle) shall be the location of the first scheduled point of departure of that conveyance for the journey — Delhi in this case.',
    reason_wrong: 'For on-board services (like in-flight Wi-Fi, food, entertainment), the place of supply is fixed at the FIRST point of departure (Delhi), not the destination or any other point. Section 12(10) is unambiguous.'
  },
  {
    id: 'sec12_telecom_fixed',
    title: 'Telecom — Fixed Line / Cable / Dish Antenna',
    section: '12',
    sectionLabel: 'Section 12(11)(a)',
    keywords: ['telecom', 'fixed line', 'telephone', 'cable', 'broadband', 'internet leased', 'dish antenna', 'DTH', 'fixed telecom'],
    type: 'services_india',
    desc: 'Fixed telecom line, leased circuit, cable, or dish antenna services',
    questionText: 'BSNL provides a fixed landline telephone service. The telephone is installed at the recipient\'s office in Kolkata, although the billing address is in Mumbai. What is the place of supply?',
    options: [
      { id: 'a', text: 'Mumbai — billing address of recipient', sub: 'Where bills are sent' },
      { id: 'b', text: 'Location of BSNL exchange', sub: 'Telecom provider\'s base' },
      { id: 'c', text: 'Kolkata — where the telephone line is installed', sub: 'Physical installation location', correct: true },
      { id: 'd', text: 'Location where most calls are received', sub: 'Usage-based location' }
    ],
    provision: 'Section 12(11)(a) of the IGST Act, 2017: For services by way of fixed telecommunication line, leased circuits, internet leased circuit, cable, or dish antenna, the place of supply shall be the location where the telecommunication line, cable, or dish antenna is INSTALLED — Kolkata, regardless of billing address.',
    reason_wrong: 'For fixed telecom services, it\'s the installation location — not the billing address — that determines the place of supply under Section 12(11)(a). This is a specific rule overriding the general billing address concept.'
  },
  {
    id: 'sec12_telecom_mobile_postpaid',
    title: 'Telecom — Mobile (Post-paid)',
    section: '12',
    sectionLabel: 'Section 12(11)(b)',
    keywords: ['mobile postpaid', 'telecom mobile', 'cell phone bill', 'postpaid plan', 'sim card postpaid'],
    type: 'services_india',
    desc: 'Mobile connection for telecom/internet on post-paid basis',
    questionText: 'Airtel provides a post-paid mobile connection. The billing address on record with Airtel is Chennai. The user is roaming in Bangalore. What is the place of supply?',
    options: [
      { id: 'a', text: 'Bangalore — where service is being used', sub: 'Roaming location' },
      { id: 'b', text: 'Airtel\'s registered state', sub: 'Provider location' },
      { id: 'c', text: 'Chennai — billing address on Airtel\'s records', sub: 'Billing address of recipient', correct: true },
      { id: 'd', text: 'Location of the mobile tower used', sub: 'Network infrastructure' }
    ],
    provision: 'Section 12(11)(b) of the IGST Act, 2017: For mobile connections on post-paid basis, the place of supply shall be the location of the billing address of the recipient on the record of the supplier — Chennai in this case, regardless of roaming.',
    reason_wrong: 'Post-paid mobile services follow the billing address on the telecom provider\'s records — not the roaming location, tower location, or the provider\'s state. Section 12(11)(b) is explicit on this.'
  },
  {
    id: 'sec12_banking',
    title: 'Banking & Financial Services',
    section: '12',
    sectionLabel: 'Section 12(12)',
    keywords: ['banking', 'bank services', 'financial services', 'stock broking', 'brokerage', 'loan services', 'insurance related finance'],
    type: 'services_india',
    desc: 'Banking, financial services, and stock broking to any person',
    questionText: 'A bank in Gujarat provides a loan to a borrower whose account records show an address in Madhya Pradesh. What is the place of supply of the banking service?',
    options: [
      { id: 'a', text: 'Gujarat — location of the bank branch', sub: 'Where the bank is' },
      { id: 'b', text: 'Location of the RBI', sub: 'Regulatory authority' },
      { id: 'c', text: 'Madhya Pradesh — recipient\'s location as per bank records', sub: 'Recipient\'s address on supplier\'s records', correct: true },
      { id: 'd', text: 'Location where loan money is spent', sub: 'Utilization location' }
    ],
    provision: 'Section 12(12) of the IGST Act, 2017: The place of supply of banking and other financial services (including stock broking) shall be the location of the recipient of services on the records of the supplier — Madhya Pradesh as per the bank\'s records. If the recipient\'s location is not on record, the supplier\'s location is used.',
    reason_wrong: 'Banking services follow the recipient\'s location as maintained in the service provider\'s own records — not the branch location, regulatory body, or spending location. Section 12(12) is specific to financial services.'
  },
  {
    id: 'sec12_insurance',
    title: 'Insurance Services',
    section: '12',
    sectionLabel: 'Section 12(13)',
    keywords: ['insurance', 'life insurance', 'health insurance', 'general insurance', 'policy', 'insurer'],
    type: 'services_india',
    desc: 'Life, health, or general insurance services',
    questionText: 'LIC (Life Insurance Corporation) sells a life insurance policy to an unregistered individual whose address on LIC\'s records is in Rajasthan. What is the place of supply?',
    options: [
      { id: 'a', text: 'Location of the LIC branch', sub: 'Where policy is sold' },
      { id: 'b', text: 'Rajasthan — recipient\'s location on LIC\'s records', sub: 'Address on insurer\'s records', correct: true },
      { id: 'c', text: 'Location of the insurance regulator (IRDAI)', sub: 'Regulatory authority location' },
      { id: 'd', text: 'Location where premium is paid', sub: 'Payment point' }
    ],
    provision: 'Section 12(13)(b) of the IGST Act, 2017: For insurance services to a person other than a registered person, the place of supply shall be the location of the recipient on the records of the supplier of services — Rajasthan per LIC\'s records. For a registered person, it would be the location of such registered person (Section 12(13)(a)).',
    reason_wrong: 'Insurance services follow the recipient\'s location as recorded by the insurer — not the branch location, IRDAI\'s location, or where the premium is paid. Section 12(13) is a specific rule for insurance.'
  },

  // -------- SECTION 13: SERVICES (CROSS-BORDER) --------
  {
    id: 'sec13_general',
    title: 'General Cross-Border Services (Import of Services)',
    section: '13',
    sectionLabel: 'Section 13(2)',
    keywords: ['import services', 'foreign service provider', 'cross border services', 'overseas consultant', 'foreign supplier services'],
    type: 'services_cross_border',
    desc: 'Foreign supplier provides services to Indian recipient (or vice versa)',
    questionText: 'A US-based legal firm provides legal advisory services to an Indian company in Mumbai. What is the place of supply?',
    options: [
      { id: 'a', text: 'USA — location of the foreign service provider', sub: 'Where supplier is' },
      { id: 'b', text: 'Mumbai, India — location of the Indian recipient', sub: 'Where the recipient is', correct: true },
      { id: 'c', text: 'Where the legal advice is used', sub: 'Place of consumption' },
      { id: 'd', text: 'Where the contract is signed', sub: 'Contract execution location' }
    ],
    provision: 'Section 13(2) of the IGST Act, 2017: The place of supply of services (except those in Sections 13(3)–(13)) where one party is outside India, shall be the location of the RECIPIENT of services — Mumbai, India. This makes it an import of service, attracting IGST under reverse charge.',
    reason_wrong: 'The general rule for cross-border services under Section 13(2) is the recipient\'s location — making India the place of supply when the Indian company receives services from abroad. This triggers reverse charge GST liability on the Indian recipient.'
  },
  {
    id: 'sec13_physical_performance',
    title: 'Cross-Border Services Requiring Physical Performance',
    section: '13',
    sectionLabel: 'Section 13(3)',
    keywords: ['repair services foreign', 'services goods physically', 'goods repair cross border', 'servicing imported goods', 'physical performance cross border'],
    type: 'services_cross_border',
    desc: 'Services on goods that need to be physically brought to the supplier (one party outside India)',
    questionText: 'An Indian company sends aircraft engines to Germany for repair. The German service provider repairs the engines in Germany and sends them back. What is the place of supply?',
    options: [
      { id: 'a', text: 'India — location of the Indian recipient', sub: 'Indian company\'s location' },
      { id: 'b', text: 'Germany — where services are actually performed', sub: 'Physical location of service', correct: true },
      { id: 'c', text: 'Airport — where engines are shipped from', sub: 'Dispatch point' },
      { id: 'd', text: 'Location of the contract', sub: 'Where agreement was signed' }
    ],
    provision: 'Section 13(3)(a) of the IGST Act, 2017: Where services are supplied in respect of goods which are made physically available to the supplier (the engine goes to Germany), the place of supply is where the services are actually performed — Germany. Note: There\'s an exception for goods temporarily imported for repair and exported back (Section 13(3)(a) proviso), which may exempt from IGST.',
    reason_wrong: 'When goods must be physically brought to the service provider for services to be rendered, Section 13(3)(a) places supply at the location of actual performance. This differs from the general cross-border rule in Section 13(2).'
  },
  {
    id: 'sec13_immovable_cross',
    title: 'Cross-Border Services — Immovable Property',
    section: '13',
    sectionLabel: 'Section 13(4)',
    keywords: ['immovable cross border', 'property outside india', 'overseas construction', 'foreign property services', 'architecture outside india'],
    type: 'services_cross_border',
    desc: 'Services relating to immovable property where one party is outside India',
    questionText: 'An Indian architect provides design services for a villa project located in Dubai, UAE. The client is also in Dubai. What is the place of supply?',
    options: [
      { id: 'a', text: 'India — location of the Indian architect', sub: 'Where plans are drawn' },
      { id: 'b', text: 'Dubai, UAE — where the immovable property is located', sub: 'Property location', correct: true },
      { id: 'c', text: 'Location of the client', sub: 'Client\'s registered state' },
      { id: 'd', text: 'Location of payment receipt', sub: 'Where fee is received' }
    ],
    provision: 'Section 13(4) of the IGST Act, 2017: For services directly in relation to an immovable property (including by architects, interior decorators, construction services, hotel accommodation) where one party is outside India, the place of supply shall be where the immovable property is located or intended to be located — Dubai. This makes it an export of service for the Indian architect.',
    reason_wrong: 'For immovable property-related services in cross-border scenarios, Section 13(4) anchors the place of supply to where the property IS — not where the architect works or where the client is. Since the property is in Dubai, it\'s an export of service for the Indian architect.'
  },
  {
    id: 'sec13_event_cross',
    title: 'Cross-Border Services — Events Outside India',
    section: '13',
    sectionLabel: 'Section 13(5)',
    keywords: ['event cross border', 'foreign event services', 'overseas conference', 'event outside india', 'international event management'],
    type: 'services_cross_border',
    desc: 'Admission to or organisation of events where one party is outside India',
    questionText: 'An Indian event management company organises a tech conference in Singapore for a foreign client. What is the place of supply?',
    options: [
      { id: 'a', text: 'India — where the event company is based', sub: 'Indian organiser\'s location' },
      { id: 'b', text: 'Singapore — where the event is actually held', sub: 'Event location', correct: true },
      { id: 'c', text: 'Location of conference attendees\' majority', sub: 'Participant demographics' },
      { id: 'd', text: 'Location of foreign client', sub: 'Client\'s country' }
    ],
    provision: 'Section 13(5) of the IGST Act, 2017: For services in relation to admission to, or organisation of, a cultural, artistic, sporting, scientific, educational, or entertainment event (including fairs, exhibitions, conferences) where one party is outside India, the place of supply is where the event is actually held — Singapore. This qualifies as export of services for the Indian organiser.',
    reason_wrong: 'For event-related services in cross-border situations, Section 13(5) places the supply at the actual venue — not the organiser\'s country or the client\'s country. Since the event is in Singapore, it\'s an export of service.'
  },
  {
    id: 'sec13_banking_cross',
    title: 'Cross-Border — Banking/Financial to Account Holder',
    section: '13',
    sectionLabel: 'Section 13(8)(a)',
    keywords: ['banking cross border', 'foreign bank', 'financial services outside india', 'nbfc cross border', 'overseas banking'],
    type: 'services_cross_border',
    desc: 'Banking/NBFC services to own account holders where one party is outside India',
    questionText: 'A foreign bank provides account maintenance services to its NRI account holder living in London. What is the place of supply?',
    options: [
      { id: 'a', text: 'London — location of the NRI (recipient)', sub: 'Where the customer lives' },
      { id: 'b', text: 'Location of the foreign bank (supplier)', sub: 'Bank\'s registered location', correct: true },
      { id: 'c', text: 'India — where the NRI is a citizen', sub: 'Citizenship country' },
      { id: 'd', text: 'Location of RBI', sub: 'Regulatory authority' }
    ],
    provision: 'Section 13(8)(a) of the IGST Act, 2017: For services supplied by a banking company, financial institution, or NBFC to account holders, the place of supply shall be the location of the SUPPLIER of services (the bank\'s location) — not the recipient\'s location. This is an exception to the general rule in Section 13(2).',
    reason_wrong: 'For banking services to account holders, Section 13(8)(a) creates an exception: the place of supply is the supplier\'s (bank\'s) location — not the account holder\'s location. This is intentionally different from the general cross-border rule.'
  },
  {
    id: 'sec13_intermediary_cross',
    title: 'Cross-Border — Intermediary Services',
    section: '13',
    sectionLabel: 'Section 13(8)(b)',
    keywords: ['intermediary', 'broker cross border', 'agent cross border', 'commission agent foreign', 'facilitator services'],
    type: 'services_cross_border',
    desc: 'Intermediary (broker/agent) services where one party is outside India',
    questionText: 'An Indian broker facilitates a deal between a foreign buyer and a foreign seller, earning a commission. What is the place of supply of the intermediary service?',
    options: [
      { id: 'a', text: 'Location of the foreign buyer', sub: 'Buyer\'s country' },
      { id: 'b', text: 'Location of the foreign seller', sub: 'Seller\'s country' },
      { id: 'c', text: 'India — location of the intermediary (supplier)', sub: 'Indian broker\'s location', correct: true },
      { id: 'd', text: 'Location where the deal is executed', sub: 'Contract execution country' }
    ],
    provision: 'Section 13(8)(b) of the IGST Act, 2017: For intermediary services, the place of supply shall be the location of the supplier of services (the Indian broker\'s location = India). This means the Indian broker cannot claim it as "export of service" — GST applies in India. This has been a significant point of litigation.',
    reason_wrong: 'Intermediary services have a unique rule under Section 13(8)(b): the place of supply is always the SUPPLIER\'s (intermediary\'s) location. This prevents intermediaries from routing transactions to avoid GST, and has been the subject of extensive court litigation.'
  }
];

// ============================================================
// LOCATION DATA
// ============================================================
const LOCATIONS = [
  // Indian States
  { name: 'Andhra Pradesh', type: 'state', country: 'India', inIndia: true, lat: 15.9, lng: 79.7 },
  { name: 'Arunachal Pradesh', type: 'state', country: 'India', inIndia: true, lat: 28.2, lng: 94.7 },
  { name: 'Assam', type: 'state', country: 'India', inIndia: true, lat: 26.2, lng: 92.9 },
  { name: 'Bihar', type: 'state', country: 'India', inIndia: true, lat: 25.1, lng: 85.3 },
  { name: 'Chhattisgarh', type: 'state', country: 'India', inIndia: true, lat: 21.3, lng: 81.9 },
  { name: 'Goa', type: 'state', country: 'India', inIndia: true, lat: 15.3, lng: 74.1 },
  { name: 'Gujarat', type: 'state', country: 'India', inIndia: true, lat: 22.3, lng: 71.2 },
  { name: 'Haryana', type: 'state', country: 'India', inIndia: true, lat: 29.1, lng: 76.2 },
  { name: 'Himachal Pradesh', type: 'state', country: 'India', inIndia: true, lat: 31.1, lng: 77.2 },
  { name: 'Jharkhand', type: 'state', country: 'India', inIndia: true, lat: 23.6, lng: 85.3 },
  { name: 'Karnataka', type: 'state', country: 'India', inIndia: true, lat: 15.3, lng: 75.7 },
  { name: 'Kerala', type: 'state', country: 'India', inIndia: true, lat: 10.8, lng: 76.3 },
  { name: 'Madhya Pradesh', type: 'state', country: 'India', inIndia: true, lat: 22.9, lng: 78.7 },
  { name: 'Maharashtra', type: 'state', country: 'India', inIndia: true, lat: 19.7, lng: 75.7 },
  { name: 'Manipur', type: 'state', country: 'India', inIndia: true, lat: 24.7, lng: 93.9 },
  { name: 'Meghalaya', type: 'state', country: 'India', inIndia: true, lat: 25.5, lng: 91.4 },
  { name: 'Mizoram', type: 'state', country: 'India', inIndia: true, lat: 23.2, lng: 92.7 },
  { name: 'Nagaland', type: 'state', country: 'India', inIndia: true, lat: 26.2, lng: 94.6 },
  { name: 'Odisha', type: 'state', country: 'India', inIndia: true, lat: 20.4, lng: 84.8 },
  { name: 'Punjab', type: 'state', country: 'India', inIndia: true, lat: 31.1, lng: 75.3 },
  { name: 'Rajasthan', type: 'state', country: 'India', inIndia: true, lat: 27.0, lng: 74.2 },
  { name: 'Sikkim', type: 'state', country: 'India', inIndia: true, lat: 27.5, lng: 88.5 },
  { name: 'Tamil Nadu', type: 'state', country: 'India', inIndia: true, lat: 11.1, lng: 78.7 },
  { name: 'Telangana', type: 'state', country: 'India', inIndia: true, lat: 18.1, lng: 79.0 },
  { name: 'Tripura', type: 'state', country: 'India', inIndia: true, lat: 23.9, lng: 91.3 },
  { name: 'Uttar Pradesh', type: 'state', country: 'India', inIndia: true, lat: 26.8, lng: 80.9 },
  { name: 'Uttarakhand', type: 'state', country: 'India', inIndia: true, lat: 30.1, lng: 79.3 },
  { name: 'West Bengal', type: 'state', country: 'India', inIndia: true, lat: 22.9, lng: 87.9 },
  { name: 'Jammu & Kashmir', type: 'UT', country: 'India', inIndia: true, lat: 33.7, lng: 75.2 },
  { name: 'Ladakh', type: 'UT', country: 'India', inIndia: true, lat: 34.2, lng: 77.6 },
  // Indian UTs
  { name: 'Andaman & Nicobar Islands', type: 'UT', country: 'India', inIndia: true, lat: 11.7, lng: 92.7 },
  { name: 'Chandigarh', type: 'UT', country: 'India', inIndia: true, lat: 30.7, lng: 76.8 },
  { name: 'Dadra & Nagar Haveli and Daman & Diu', type: 'UT', country: 'India', inIndia: true, lat: 20.3, lng: 73.0 },
  { name: 'Delhi (NCT)', type: 'UT', country: 'India', inIndia: true, lat: 28.7, lng: 77.1 },
  { name: 'Lakshadweep', type: 'UT', country: 'India', inIndia: true, lat: 10.6, lng: 72.6 },
  { name: 'Puducherry', type: 'UT', country: 'India', inIndia: true, lat: 11.9, lng: 79.8 },
  // Indian Cities
  { name: 'Mumbai', type: 'city', country: 'India', state: 'Maharashtra', inIndia: true, lat: 19.1, lng: 72.9 },
  { name: 'Delhi', type: 'city', country: 'India', state: 'Delhi (NCT)', inIndia: true, lat: 28.6, lng: 77.2 },
  { name: 'Bengaluru', type: 'city', country: 'India', state: 'Karnataka', inIndia: true, lat: 12.9, lng: 77.6 },
  { name: 'Hyderabad', type: 'city', country: 'India', state: 'Telangana', inIndia: true, lat: 17.4, lng: 78.5 },
  { name: 'Chennai', type: 'city', country: 'India', state: 'Tamil Nadu', inIndia: true, lat: 13.1, lng: 80.3 },
  { name: 'Kolkata', type: 'city', country: 'India', state: 'West Bengal', inIndia: true, lat: 22.6, lng: 88.4 },
  { name: 'Pune', type: 'city', country: 'India', state: 'Maharashtra', inIndia: true, lat: 18.5, lng: 73.9 },
  { name: 'Ahmedabad', type: 'city', country: 'India', state: 'Gujarat', inIndia: true, lat: 23.0, lng: 72.6 },
  { name: 'Jaipur', type: 'city', country: 'India', state: 'Rajasthan', inIndia: true, lat: 26.9, lng: 75.8 },
  { name: 'Lucknow', type: 'city', country: 'India', state: 'Uttar Pradesh', inIndia: true, lat: 26.8, lng: 80.9 },
  { name: 'Surat', type: 'city', country: 'India', state: 'Gujarat', inIndia: true, lat: 21.2, lng: 72.8 },
  { name: 'Nagpur', type: 'city', country: 'India', state: 'Maharashtra', inIndia: true, lat: 21.1, lng: 79.1 },
  { name: 'Patna', type: 'city', country: 'India', state: 'Bihar', inIndia: true, lat: 25.6, lng: 85.1 },
  { name: 'Indore', type: 'city', country: 'India', state: 'Madhya Pradesh', inIndia: true, lat: 22.7, lng: 75.9 },
  { name: 'Bhopal', type: 'city', country: 'India', state: 'Madhya Pradesh', inIndia: true, lat: 23.3, lng: 77.4 },
  { name: 'Coimbatore', type: 'city', country: 'India', state: 'Tamil Nadu', inIndia: true, lat: 11.0, lng: 77.0 },
  { name: 'Kochi', type: 'city', country: 'India', state: 'Kerala', inIndia: true, lat: 9.9, lng: 76.3 },
  { name: 'Chandigarh (City)', type: 'city', country: 'India', state: 'Chandigarh', inIndia: true, lat: 30.7, lng: 76.8 },
  { name: 'Guwahati', type: 'city', country: 'India', state: 'Assam', inIndia: true, lat: 26.2, lng: 91.7 },
  { name: 'Ranchi', type: 'city', country: 'India', state: 'Jharkhand', inIndia: true, lat: 23.4, lng: 85.3 },
  // Foreign Countries
  { name: 'USA', type: 'country', country: 'USA', inIndia: false, lat: 37.1, lng: -95.7 },
  { name: 'United Kingdom', type: 'country', country: 'United Kingdom', inIndia: false, lat: 55.4, lng: -3.4 },
  { name: 'Germany', type: 'country', country: 'Germany', inIndia: false, lat: 51.2, lng: 10.5 },
  { name: 'China', type: 'country', country: 'China', inIndia: false, lat: 35.9, lng: 104.2 },
  { name: 'Japan', type: 'country', country: 'Japan', inIndia: false, lat: 36.2, lng: 138.3 },
  { name: 'Singapore', type: 'country', country: 'Singapore', inIndia: false, lat: 1.35, lng: 103.82 },
  { name: 'UAE / Dubai', type: 'country', country: 'UAE', inIndia: false, lat: 23.4, lng: 53.8 },
  { name: 'Australia', type: 'country', country: 'Australia', inIndia: false, lat: -25.3, lng: 133.8 },
  { name: 'France', type: 'country', country: 'France', inIndia: false, lat: 46.2, lng: 2.2 },
  { name: 'Canada', type: 'country', country: 'Canada', inIndia: false, lat: 56.1, lng: -106.3 },
  { name: 'Sri Lanka', type: 'country', country: 'Sri Lanka', inIndia: false, lat: 7.9, lng: 80.8 },
  { name: 'Nepal', type: 'country', country: 'Nepal', inIndia: false, lat: 28.4, lng: 84.1 },
  { name: 'Bangladesh', type: 'country', country: 'Bangladesh', inIndia: false, lat: 23.7, lng: 90.4 },
  { name: 'Pakistan', type: 'country', country: 'Pakistan', inIndia: false, lat: 30.4, lng: 69.3 },
  { name: 'Territorial Waters (Arabian Sea)', type: 'territorial_waters', country: 'India', inIndia: true, isTerritorialWaters: true, lat: 14.0, lng: 70.0 },
  { name: 'Territorial Waters (Bay of Bengal)', type: 'territorial_waters', country: 'India', inIndia: true, isTerritorialWaters: true, lat: 12.0, lng: 82.0 },
];
