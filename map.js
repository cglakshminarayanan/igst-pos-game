// ============================================================
// MAP.JS — D3 + TopoJSON world map with accurate India states
// GeoJSON sources with multiple fallbacks
// ============================================================

const COUNTRY_ISO = {
  4:'Afghanistan',8:'Albania',12:'Algeria',24:'Angola',32:'Argentina',
  36:'Australia',40:'Austria',50:'Bangladesh',56:'Belgium',64:'Bhutan',
  68:'Bolivia',76:'Brazil',100:'Bulgaria',116:'Cambodia',124:'Canada',
  144:'Sri Lanka',152:'Chile',156:'China',170:'Colombia',191:'Croatia',
  192:'Cuba',203:'Czech Republic',208:'Denmark',218:'Ecuador',818:'Egypt',
  231:'Ethiopia',246:'Finland',250:'France',276:'Germany',288:'Ghana',
  300:'Greece',320:'Guatemala',340:'Honduras',348:'Hungary',356:'India',
  360:'Indonesia',364:'Iran',368:'Iraq',372:'Ireland',376:'Israel',
  380:'Italy',388:'Jamaica',392:'Japan',400:'Jordan',398:'Kazakhstan',
  404:'Kenya',408:'North Korea',410:'South Korea',414:'Kuwait',
  418:'Laos',422:'Lebanon',434:'Libya',504:'Morocco',484:'Mexico',
  496:'Mongolia',104:'Myanmar',524:'Nepal',528:'Netherlands',
  554:'New Zealand',566:'Nigeria',578:'Norway',586:'Pakistan',
  591:'Panama',604:'Peru',608:'Philippines',616:'Poland',620:'Portugal',
  630:'Puerto Rico',634:'Qatar',642:'Romania',643:'Russia',
  682:'Saudi Arabia',686:'Senegal',703:'Slovakia',705:'Slovenia',
  706:'Somalia',710:'South Africa',724:'Spain',729:'Sudan',
  752:'Sweden',756:'Switzerland',760:'Syria',762:'Tajikistan',
  764:'Thailand',788:'Tunisia',792:'Turkey',800:'Uganda',804:'Ukraine',
  784:'UAE',826:'United Kingdom',840:'USA',858:'Uruguay',
  860:'Uzbekistan',862:'Venezuela',704:'Vietnam',887:'Yemen',
  716:'Zimbabwe',498:'Moldova',807:'North Macedonia',688:'Serbia',
  70:'Bosnia',499:'Montenegro',8:'Albania',620:'Portugal'
};

// India state names from GeoJSON property fields
const INDIA_STATE_MAP = {
  // Common variations in GeoJSON datasets
  'Andaman & Nicobar Island': 'Andaman & Nicobar Islands',
  'Andaman and Nicobar Islands': 'Andaman & Nicobar Islands',
  'Arunachal Pradesh': 'Arunachal Pradesh',
  'Assam': 'Assam', 'Bihar': 'Bihar', 'Chandigarh': 'Chandigarh',
  'Chhattisgarh': 'Chhattisgarh', 'Dadra and Nagar Haveli': 'Dadra & Nagar Haveli and Daman & Diu',
  'Dadra & Nagar Haveli': 'Dadra & Nagar Haveli and Daman & Diu',
  'Daman and Diu': 'Dadra & Nagar Haveli and Daman & Diu',
  'Daman & Diu': 'Dadra & Nagar Haveli and Daman & Diu',
  'Delhi': 'Delhi (NCT)', 'NCT of Delhi': 'Delhi (NCT)',
  'Goa': 'Goa', 'Gujarat': 'Gujarat', 'Haryana': 'Haryana',
  'Himachal Pradesh': 'Himachal Pradesh', 'Jammu & Kashmir': 'Jammu & Kashmir',
  'Jammu and Kashmir': 'Jammu & Kashmir', 'Jharkhand': 'Jharkhand',
  'Karnataka': 'Karnataka', 'Kerala': 'Kerala', 'Ladakh': 'Ladakh',
  'Lakshadweep': 'Lakshadweep', 'Madhya Pradesh': 'Madhya Pradesh',
  'Maharashtra': 'Maharashtra', 'Manipur': 'Manipur', 'Meghalaya': 'Meghalaya',
  'Mizoram': 'Mizoram', 'Nagaland': 'Nagaland', 'Odisha': 'Odisha',
  'Orissa': 'Odisha', 'Puducherry': 'Puducherry', 'Pondicherry': 'Puducherry',
  'Punjab': 'Punjab', 'Rajasthan': 'Rajasthan', 'Sikkim': 'Sikkim',
  'Tamil Nadu': 'Tamil Nadu', 'Telangana': 'Telangana',
  'Tripura': 'Tripura', 'Uttar Pradesh': 'Uttar Pradesh',
  'Uttarakhand': 'Uttarakhand', 'Uttaranchal': 'Uttarakhand',
  'West Bengal': 'West Bengal'
};

// State colours — distinct hues for visual clarity
const STATE_COLORS = [
  '#f5d76e','#f5a623','#7ed321','#9b59b6','#3498db',
  '#e74c3c','#2ecc71','#1abc9c','#e67e22','#e91e63',
  '#00bcd4','#8bc34a','#ff5722','#795548','#607d8b',
  '#ffc107','#4caf50','#2196f3','#9c27b0','#ff9800',
  '#03a9f4','#673ab7','#f44336','#009688','#cddc39',
  '#ffeb3b','#ff4081','#69f0ae','#40c4ff','#b0bec5',
  '#d4e157','#ff6e40',
];

let stateColorMap = {};
let svg, projection, pathGenerator;
let geoWorld = null, geoIndia = null;
let mapWidth = 960, mapHeight = 480;
let clickTarget = 'supplier';
let onLocationClickCb = null;

// ---- INIT ----
function initMap(onLocationClick) {
  onLocationClickCb = onLocationClick;
  const container = document.getElementById('mapContainer');
  const svgEl     = document.getElementById('worldMap');

  mapWidth  = Math.max(container.clientWidth || 900, 600);
  mapHeight = Math.round(mapWidth * 0.52);

  svgEl.setAttribute('width',   mapWidth);
  svgEl.setAttribute('height',  mapHeight);
  svgEl.setAttribute('viewBox', `0 0 ${mapWidth} ${mapHeight}`);
  svg = d3.select('#worldMap');

  // Winkel Tripel / Natural Earth — good for world view
  projection = d3.geoNaturalEarth1()
    .scale(mapWidth / 6.28)
    .translate([mapWidth / 2, mapHeight / 2]);

  pathGenerator = d3.geoPath().projection(projection);

  // Try multiple TopoJSON/GeoJSON sources
  const worldSources = [
    'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json',
    'https://unpkg.com/world-atlas@2.0.2/countries-110m.json',
    'https://raw.githubusercontent.com/topojson/world-atlas/master/countries-110m.json',
  ];

  const indiaSources = [
    'https://raw.githubusercontent.com/datta07/INDIAN-SHAPEFILES/master/INDIA/INDIA_STATES.geojson',
    'https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson',
    'https://raw.githubusercontent.com/Subhash9325/GeoJson-Data-of-Indian-States/master/Indian_States',
  ];

  fetchWithFallbacks(worldSources)
    .then(world => {
      geoWorld = world;
      // Try India states in parallel
      fetchWithFallbacks(indiaSources)
        .then(india => { geoIndia = india; })
        .catch(() => { geoIndia = null; })
        .finally(() => {
          renderMap();
          document.getElementById('mapLoading').style.display = 'none';
          svgEl.style.display = 'block';
          svgEl.addEventListener('click', handleMapClick);
        });
    })
    .catch(() => {
      document.getElementById('mapLoading').textContent =
        '⚠️ Map unavailable. Use the search boxes above to set locations — the quiz still works fully!';
    });
}

async function fetchWithFallbacks(urls) {
  for (const url of urls) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
      if (res.ok) return await res.json();
    } catch (e) { /* try next */ }
  }
  throw new Error('All sources failed');
}

// ---- RENDER MAP ----
function renderMap() {
  svg.selectAll('*').remove();

  // Ocean background
  svg.append('rect')
    .attr('width', mapWidth).attr('height', mapHeight)
    .attr('fill', 'var(--map-water)');

  // Sphere outline
  svg.append('path')
    .datum({ type: 'Sphere' })
    .attr('d', pathGenerator)
    .attr('fill', 'none')
    .attr('stroke', 'var(--map-border)')
    .attr('stroke-width', 0.5);

  // Graticule
  svg.append('path')
    .datum(d3.geoGraticule()())
    .attr('d', pathGenerator)
    .attr('fill', 'none')
    .attr('stroke', 'var(--map-graticule)')
    .attr('stroke-width', 0.25)
    .attr('opacity', 0.6);

  const countries = topojson.feature(geoWorld, geoWorld.objects.countries);

  // All countries except India
  svg.append('g').attr('class', 'countries')
    .selectAll('path')
    .data(countries.features.filter(d => +d.id !== 356))
    .join('path')
    .attr('class', d => `country country-${d.id}`)
    .attr('d', pathGenerator)
    .attr('fill', 'var(--map-land)')
    .attr('stroke', 'var(--map-border)')
    .attr('stroke-width', 0.4)
    .attr('data-name', d => COUNTRY_ISO[+d.id] || '')
    .style('cursor', 'pointer')
    .append('title').text(d => COUNTRY_ISO[+d.id] || d.id);

  // Country mesh borders
  svg.append('path')
    .datum(topojson.mesh(geoWorld, geoWorld.objects.countries, (a, b) => a !== b))
    .attr('d', pathGenerator)
    .attr('fill', 'none')
    .attr('stroke', 'var(--map-border)')
    .attr('stroke-width', 0.5);

  // India layer — states or whole
  const indiaG = svg.append('g').attr('class', 'india-layer');

  if (geoIndia && geoIndia.features?.length) {
    // Assign colors
    geoIndia.features.forEach((f, i) => {
      const rawName = f.properties.NAME_1 || f.properties.ST_NM ||
        f.properties.name || f.properties.NAME || '';
      stateColorMap[rawName] = STATE_COLORS[i % STATE_COLORS.length];
    });

    indiaG.selectAll('path')
      .data(geoIndia.features)
      .join('path')
      .attr('class', 'india-state')
      .attr('d', pathGenerator)
      .attr('fill', (d, i) => {
        const rawName = d.properties.NAME_1 || d.properties.ST_NM ||
          d.properties.name || d.properties.NAME || '';
        return stateColorMap[rawName] || 'var(--map-india)';
      })
      .attr('stroke', 'var(--map-india-border)')
      .attr('stroke-width', 0.6)
      .attr('data-raw', d => d.properties.NAME_1 || d.properties.ST_NM || d.properties.name || '')
      .style('cursor', 'pointer')
      .append('title')
      .text(d => INDIA_STATE_MAP[
        d.properties.NAME_1 || d.properties.ST_NM || d.properties.name || ''
      ] || d.properties.NAME_1 || d.properties.ST_NM || '');
  } else {
    // Fallback: single India shape from world atlas
    const indiaFeature = countries.features.find(d => +d.id === 356);
    if (indiaFeature) {
      indiaG.append('path')
        .datum(indiaFeature)
        .attr('class', 'india-whole')
        .attr('d', pathGenerator)
        .attr('fill', 'var(--map-india)')
        .attr('stroke', 'var(--map-india-border)')
        .attr('stroke-width', 1)
        .style('cursor', 'pointer');
    }
  }

  // Territorial waters zones
  drawTWZones();

  // Labels
  const labelG = svg.append('g').attr('class', 'labels').attr('pointer-events', 'none');

  // India label
  const indiaPt = projection([79, 22]);
  if (indiaPt) {
    labelG.append('text')
      .attr('x', indiaPt[0]).attr('y', indiaPt[1])
      .attr('text-anchor', 'middle').attr('dominant-baseline', 'middle')
      .attr('fill', 'var(--map-india-border)')
      .attr('font-size', Math.max(7, mapWidth / 130))
      .attr('font-weight', 'bold')
      .attr('font-family', 'Product Sans, Google Sans, sans-serif')
      .attr('stroke', 'rgba(255,255,255,0.6)').attr('stroke-width', 2).attr('paint-order', 'stroke')
      .text('INDIA');
  }

  // Key country labels
  const countryLabels = [
    { name: 'USA',    lng: -100, lat: 38 },
    { name: 'Russia', lng: 100,  lat: 62 },
    { name: 'China',  lng: 104,  lat: 35 },
    { name: 'Brazil', lng: -52,  lat: -10 },
    { name: 'Australia', lng: 134, lat: -26 },
  ];
  countryLabels.forEach(({ name, lng, lat }) => {
    const pt = projection([lng, lat]);
    if (!pt) return;
    labelG.append('text')
      .attr('x', pt[0]).attr('y', pt[1])
      .attr('text-anchor', 'middle').attr('dominant-baseline', 'middle')
      .attr('fill', 'var(--text3)')
      .attr('font-size', Math.max(5.5, mapWidth / 170))
      .attr('font-family', 'Product Sans, Google Sans, sans-serif')
      .attr('stroke', 'rgba(255,255,255,0.5)').attr('stroke-width', 1.5).attr('paint-order', 'stroke')
      .text(name);
  });

  // Shading + markers layers on top
  svg.append('g').attr('id', 'shadingLayer');
  svg.append('g').attr('id', 'markersLayer');
}

function drawTWZones() {
  // Approximate territorial water zones as GeoJSON polygons
  const twPolys = [
    // West coast — Arabian Sea
    [[65,8],[73,8],[73,23],[65,23],[65,8]],
    // East coast — Bay of Bengal
    [[79,8],[90,8],[90,23],[79,23],[79,8]],
    // South — Indian Ocean / tip
    [[72,4],[84,4],[84,8],[72,8],[72,4]],
  ];
  const twG = svg.append('g').attr('class', 'tw-zones').attr('pointer-events', 'none');
  twPolys.forEach(coords => {
    const feat = {
      type: 'Feature',
      geometry: { type: 'Polygon', coordinates: [coords.map(([lng, lat]) => [lng, lat])] }
    };
    twG.append('path')
      .datum(feat)
      .attr('d', pathGenerator)
      .attr('fill', 'rgba(16,185,129,0.1)')
      .attr('stroke', 'rgba(16,185,129,0.4)')
      .attr('stroke-width', 0.8)
      .attr('stroke-dasharray', '5,3');
  });

  // TW label
  const twPt = projection([70, 15]);
  if (twPt) {
    svg.append('g').attr('pointer-events', 'none')
      .append('text')
      .attr('x', twPt[0]).attr('y', twPt[1])
      .attr('text-anchor', 'middle')
      .attr('fill', 'rgba(16,185,129,0.8)')
      .attr('font-size', Math.max(5.5, mapWidth / 170))
      .attr('font-family', 'Product Sans, Google Sans, sans-serif')
      .text('⚓ Territorial Waters');
  }
}

// ---- CLICK ----
function handleMapClick(event) {
  const [x, y] = d3.pointer(event, svg.node());
  const coords  = projection.invert([x, y]);
  if (!coords) return;
  const [lng, lat] = coords;
  if (isNaN(lng) || isNaN(lat)) return;

  // 1. Check territorial waters
  if (checkTW(lng, lat)) {
    const side = lng < 78 ? 'Arabian Sea' : 'Bay of Bengal';
    const twName = `Territorial Waters (${side})`;
    const loc = LOCATIONS.find(l => l.name === twName) ||
      { name: twName, type: 'territorial_waters', country: 'India', inIndia: true,
        isTerritorialWaters: true, lat, lng };
    loc._svgX = x; loc._svgY = y;
    if (onLocationClickCb) onLocationClickCb(clickTarget, loc);
    return;
  }

  // 2. Check India states
  if (geoIndia?.features) {
    for (const f of geoIndia.features) {
      try {
        if (d3.geoContains(f, [lng, lat])) {
          const rawName = f.properties.NAME_1 || f.properties.ST_NM ||
            f.properties.name || f.properties.NAME || 'Unknown';
          const canonName = INDIA_STATE_MAP[rawName] || rawName;
          const loc = LOCATIONS.find(l => l.name === canonName ||
            (l.state && l.state === canonName) || l.name === rawName) ||
            { name: canonName, type: 'state', country: 'India', inIndia: true, lat, lng };
          loc._svgX = x; loc._svgY = y;
          if (onLocationClickCb) onLocationClickCb(clickTarget, JSON.parse(JSON.stringify(loc)));
          return;
        }
      } catch {}
    }
  }

  // 3. Check India whole (fallback)
  if (geoWorld) {
    const countries = topojson.feature(geoWorld, geoWorld.objects.countries);
    const indiaF    = countries.features.find(d => +d.id === 356);
    if (indiaF) {
      try {
        if (d3.geoContains(indiaF, [lng, lat])) {
          const loc = { name: 'India', type: 'country', country: 'India',
            inIndia: true, lat, lng, _svgX: x, _svgY: y };
          if (onLocationClickCb) onLocationClickCb(clickTarget, loc);
          return;
        }
      } catch {}
    }

    // 4. Other countries
    for (const f of countries.features) {
      if (+f.id === 356) continue;
      try {
        if (d3.geoContains(f, [lng, lat])) {
          const cName = COUNTRY_ISO[+f.id] || `Country (${f.id})`;
          const loc = LOCATIONS.find(l => l.country === cName || l.name === cName) ||
            { name: cName, type: 'country', country: cName, inIndia: false, lat, lng };
          loc._svgX = x; loc._svgY = y;
          if (onLocationClickCb) onLocationClickCb(clickTarget, JSON.parse(JSON.stringify(loc)));
          return;
        }
      } catch {}
    }
  }

  // 5. Ocean near India = TW
  if (isNearIndiaCoast(lng, lat)) {
    const side = lng < 78 ? 'Arabian Sea' : 'Bay of Bengal';
    const twName = `Territorial Waters (${side})`;
    const loc = LOCATIONS.find(l => l.name === twName) ||
      { name: twName, type: 'territorial_waters', country: 'India',
        inIndia: true, isTerritorialWaters: true, lat, lng };
    loc._svgX = x; loc._svgY = y;
    if (onLocationClickCb) onLocationClickCb(clickTarget, loc);
  }
}

function checkTW(lng, lat) {
  // Must be in ocean near India
  const inBox = lat >= 4 && lat <= 26 && lng >= 64 && lng <= 95;
  if (!inBox) return false;
  // Not on land
  if (geoWorld) {
    const countries = topojson.feature(geoWorld, geoWorld.objects.countries);
    for (const f of countries.features) {
      try { if (d3.geoContains(f, [lng, lat])) return false; } catch {}
    }
  }
  return true;
}

function isNearIndiaCoast(lng, lat) {
  return lat >= 6 && lat <= 24 && lng >= 64 && lng <= 94;
}

// ---- SHADING ----
function shadeLocation(type, locationInfo) {
  if (!svg || !geoWorld) return;
  const shadingLayer = d3.select('#shadingLayer');
  shadingLayer.select(`#shade-${type}`).remove();

  const fill   = type === 'supplier' ? 'rgba(37,99,235,0.35)'   : 'rgba(217,119,6,0.35)';
  const stroke  = type === 'supplier' ? 'rgba(37,99,235,0.9)'   : 'rgba(217,119,6,0.9)';

  if (locationInfo.inIndia && !locationInfo.isTerritorialWaters && geoIndia?.features) {
    const canonName = locationInfo.name;
    const stateF = geoIndia.features.find(f => {
      const raw = f.properties.NAME_1 || f.properties.ST_NM || f.properties.name || '';
      return INDIA_STATE_MAP[raw] === canonName || raw === canonName;
    });
    if (stateF) {
      shadingLayer.append('path')
        .datum(stateF)
        .attr('id', `shade-${type}`)
        .attr('d', pathGenerator)
        .attr('fill', fill)
        .attr('stroke', stroke)
        .attr('stroke-width', 1.8)
        .attr('pointer-events', 'none');
      return;
    }
    // Shade whole India
    const countries  = topojson.feature(geoWorld, geoWorld.objects.countries);
    const indiaF     = countries.features.find(d => +d.id === 356);
    if (indiaF) {
      shadingLayer.append('path')
        .datum(indiaF)
        .attr('id', `shade-${type}`)
        .attr('d', pathGenerator)
        .attr('fill', fill).attr('stroke', stroke)
        .attr('stroke-width', 1.5).attr('pointer-events', 'none');
    }
    return;
  }

  if (!locationInfo.inIndia) {
    const countries = topojson.feature(geoWorld, geoWorld.objects.countries);
    const cName     = locationInfo.country || locationInfo.name;
    const feat      = countries.features.find(f =>
      COUNTRY_ISO[+f.id] === cName || COUNTRY_ISO[+f.id] === locationInfo.name);
    if (feat) {
      shadingLayer.append('path')
        .datum(feat)
        .attr('id', `shade-${type}`)
        .attr('d', pathGenerator)
        .attr('fill', fill).attr('stroke', stroke)
        .attr('stroke-width', 1.5).attr('pointer-events', 'none');
    }
  }
}

// ---- MARKERS ----
function placeMarker(type, svgX, svgY, label) {
  const ml = d3.select('#markersLayer');
  ml.select(`#marker-${type}`).remove();

  const color = type === 'supplier' ? '#2563eb' : '#d97706';
  const g     = ml.append('g').attr('id', `marker-${type}`);

  // Outer ring
  g.append('circle').attr('cx', svgX).attr('cy', svgY).attr('r', 13)
    .attr('fill', 'none').attr('stroke', color)
    .attr('stroke-width', 1.5).attr('opacity', 0.4);
  // Pin
  g.append('circle').attr('cx', svgX).attr('cy', svgY).attr('r', 6.5)
    .attr('fill', color).attr('stroke', 'white').attr('stroke-width', 2);

  const lbl = label.length > 20 ? label.slice(0, 18) + '…' : label;
  const lw  = Math.min(lbl.length * 5.8 + 14, 130);

  // Label pill
  g.append('rect')
    .attr('x', svgX - lw / 2).attr('y', svgY - 27)
    .attr('width', lw).attr('height', 15)
    .attr('rx', 5).attr('fill', 'var(--bg2)')
    .attr('stroke', color).attr('stroke-width', 1.2).attr('opacity', 0.95);
  g.append('text')
    .attr('x', svgX).attr('y', svgY - 16)
    .attr('text-anchor', 'middle').attr('dominant-baseline', 'middle')
    .attr('fill', color).attr('font-size', 7.5).attr('font-weight', 'bold')
    .attr('font-family', 'Product Sans, Google Sans, sans-serif')
    .attr('pointer-events', 'none').text(lbl);
}

function removeMarker(type) {
  if (svg) d3.select('#markersLayer').select(`#marker-${type}`).remove();
}
function removeShading(type) {
  if (svg) d3.select('#shadingLayer').select(`#shade-${type}`).remove();
}

function setMapClickTarget(target) {
  clickTarget = target;
  const el = document.getElementById('mapClickTarget');
  if (el) el.textContent = `next: ${target === 'supplier' ? 'Supplier 📤' : 'Recipient 📥'}`;
}

function getProjectedCoords(lng, lat) {
  if (!projection || lng == null || lat == null) return [0, 0];
  return projection([lng, lat]) || [0, 0];
}
