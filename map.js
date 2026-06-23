// ============================================================
// MAP RENDERER — India-accurate SVG world map
// ============================================================

// Simple equirectangular projection helpers
function lngLatToXY(lng, lat, viewW = 1000, viewH = 500) {
  const x = ((lng + 180) / 360) * viewW;
  const y = ((90 - lat) / 180) * viewH;
  return [x, y];
}

// Country/region shapes — simplified polygons (lon,lat pairs)
// India is drawn with proper state borders including J&K, Arunachal, all UTs
const WORLD_SHAPES = {
  // ---- INDIA (overall outline — proper borders incl J&K, AP, Arunachal) ----
  'India': {
    color: '#c8d8a0',
    paths: [
      // Main India polygon (simplified but accurate outline)
      [[68.1,23.0],[68.0,22.2],[67.4,22.2],[67.1,22.7],[66.75,22.9],[66.5,22.8],
       [66.3,23.1],[65.7,23.3],[65.5,23.6],[65.1,23.7],[65.0,24.0],[64.6,24.4],
       [64.4,24.5],[63.2,24.8],[62.5,25.0],[61.5,25.7],[61.0,26.5],[60.9,26.9],
       [61.8,27.8],[62.0,28.0],[62.5,28.5],[62.8,28.6],[63.3,28.9],[63.5,29.5],
       [64.1,29.6],[65.0,29.5],[66.4,29.6],[67.1,29.5],[67.3,29.1],[67.8,29.0],
       [68.2,28.3],[68.7,28.0],[69.3,27.5],[70.2,27.8],[70.7,27.7],[71.0,27.2],
       [71.1,26.7],[70.8,26.0],[70.0,25.2],[70.0,24.4],[70.3,23.9],[70.8,23.8],
       [71.2,23.6],[71.5,23.6],[72.0,23.0],[72.7,22.3],[73.0,22.0],[73.1,21.6],
       [72.5,20.7],[72.2,20.3],[72.0,19.8],[71.3,19.3],[70.4,18.9],[70.0,18.6],
       [69.7,18.4],[69.1,18.3],[68.6,18.0],[68.4,17.6],[68.1,17.3],[67.5,16.9],
       [67.0,16.8],[66.7,16.5],[66.3,16.3],[65.9,16.1],[65.5,16.0],[65.1,15.8],
       [64.8,15.5],[64.7,15.0],[64.6,14.6],[64.5,14.2],[64.3,13.9],[64.2,13.5],
       [64.4,13.2],[64.5,12.9],[64.4,12.5],[64.3,12.1],[64.2,11.7],[64.1,11.4],
       [64.3,11.0],[64.6,10.7],[64.9,10.3],[65.4,9.9],[65.7,9.6],[66.0,9.3],
       [66.4,9.0],[66.9,8.8],[67.4,8.7],[68.0,8.5],[68.5,8.4],[69.2,8.2],
       [69.7,8.1],[70.2,8.2],[70.6,8.3],[71.0,8.5],[71.4,8.7],[71.8,9.0],
       [72.2,9.4],[72.4,9.8],[72.6,10.2],[72.8,10.7],[73.0,11.1],[73.3,11.5],
       [73.6,11.9],[74.0,12.4],[74.3,12.8],[74.6,13.2],[74.9,13.6],[75.2,14.0],
       [75.5,14.3],[75.7,14.7],[75.9,15.1],[76.0,15.5],[76.3,15.9],[76.5,16.3],
       [76.8,16.7],[77.0,17.1],[77.2,17.5],[77.5,17.8],[77.7,18.2],[78.0,18.5],
       [78.2,18.9],[78.5,19.3],[78.8,19.7],[79.0,20.1],[79.3,20.5],[79.5,20.9],
       [79.7,21.3],[80.0,21.7],[80.2,22.0],[80.5,22.4],[80.7,22.8],[81.0,23.1],
       [81.3,23.5],[81.5,23.9],[81.8,24.2],[82.0,24.6],[82.3,25.0],[82.6,25.3],
       [82.8,25.7],[83.1,26.1],[83.4,26.5],[83.6,26.8],[83.9,27.2],[84.1,27.6],
       [84.4,27.9],[84.6,28.3],[84.9,28.0],[85.1,27.8],[85.4,27.6],[85.7,27.4],
       [86.0,27.1],[86.2,27.0],[86.5,26.8],[86.8,26.6],[87.0,26.4],[87.3,26.2],
       [87.5,26.0],[87.8,25.8],[88.0,25.6],[88.1,25.4],[88.0,25.1],[87.9,24.9],
       [88.1,24.7],[88.3,24.6],[88.5,24.5],[88.7,24.4],[89.0,24.3],[89.3,24.1],
       [89.6,23.9],[89.8,23.7],[90.0,23.5],[90.2,23.4],[90.5,23.2],[90.7,23.0],
       [90.9,22.8],[91.1,22.6],[91.3,22.4],[91.5,22.2],[91.7,22.0],[91.9,21.8],
       [92.1,21.6],[92.3,21.4],[92.5,21.2],[92.6,21.0],[92.7,20.8],[92.5,20.5],
       [92.4,20.3],[92.3,20.0],[92.2,19.8],[92.1,19.5],[92.0,19.3],[91.9,19.0],
       [91.8,18.8],[91.7,18.5],[91.9,18.3],[92.0,18.0],[91.8,17.8],[92.0,17.6],
       [92.2,17.4],[92.4,17.2],[92.6,17.0],[92.8,16.8],[93.0,16.5],[93.1,16.2],
       [93.2,15.9],[93.4,15.7],[93.5,15.4],[93.7,15.1],[93.8,14.8],[94.0,14.5],
       [94.2,14.2],[94.4,13.9],[94.6,13.6],[94.7,13.3],[94.9,13.0],[95.0,12.7],
       [95.1,12.4],[95.2,12.1],[95.2,11.8],[95.1,11.5],[95.0,11.2],[94.8,10.9],
       [94.6,10.7],[94.4,10.4],[94.2,10.1],[94.0,9.8],[93.8,9.6],[93.5,9.3],
       [93.2,9.1],[93.0,8.8],[92.8,8.6],[92.5,8.4],[92.3,8.1],[92.0,7.9],
       [91.8,7.7],[91.5,7.5],[91.2,7.3],[90.9,7.1],[90.7,7.0],[90.4,6.8],
       [90.1,6.7],[89.8,6.6],[89.5,6.5],[89.2,6.4],[88.9,6.3],[88.6,6.3],
       [88.3,6.3],[88.0,6.4],[87.7,6.5],[87.5,6.6],[87.2,6.7],[86.9,6.9],
       [86.6,7.1],[86.3,7.3],[86.0,7.5],[85.8,7.7],[85.5,7.9],[85.2,8.1],
       [85.0,8.4],[84.7,8.6],[84.4,8.9],[84.2,9.2],[84.0,9.5],[83.8,9.8],
       [83.6,10.1],[83.5,10.4],[83.4,10.7],[83.2,11.0],[83.1,11.3],[83.0,11.6],
       [82.9,11.9],[82.8,12.2],[82.7,12.5],[82.6,12.8],[82.5,13.1],[82.4,13.4],
       [82.3,13.7],[82.2,14.0],[82.0,14.3],[81.8,14.5],[81.7,14.8],[81.5,15.0],
       [81.3,15.2],[81.1,15.4],[80.9,15.6],[80.7,15.8],[80.5,16.0],[80.3,16.2],
       [80.0,16.3],[79.8,16.5],[79.6,16.7],[79.4,16.9],[79.2,17.0],[79.0,17.2],
       [78.8,17.4],[78.6,17.6],[78.4,17.7],[78.2,17.9],[78.0,18.0],[77.8,18.2],
       [77.6,18.3],[77.4,18.5],[77.2,18.6],[77.0,18.7],[76.8,18.8],[76.6,18.9],
       [76.4,19.0],[76.2,19.1],[76.0,19.1],[75.8,19.2],[75.5,19.3],[75.3,19.3],
       [75.1,19.4],[74.9,19.4],[74.7,19.5],[74.5,19.5],[74.3,19.4],[74.1,19.4],
       [73.9,19.3],[73.7,19.3],[73.5,19.2],[73.3,19.1],[73.1,19.0],[72.9,18.9],
       [72.7,18.7],[72.6,18.5],[72.5,18.3],[72.4,18.1],[72.3,17.9],[72.2,17.7],
       [72.1,17.5],[72.0,17.3],[71.9,17.0],[71.8,16.8],[71.7,16.5],[71.6,16.3],
       [71.5,16.0],[71.4,15.8],[71.3,15.5],[71.2,15.2],[71.1,15.0],[71.0,14.7],
       [70.9,14.4],[70.8,14.1],[70.7,13.8],[70.7,13.5],[70.7,13.2],[70.7,12.9],
       [70.7,12.6],[70.8,12.3],[70.9,12.0],[71.0,11.7],[71.1,11.4],[71.2,11.1],
       [71.3,10.8],[71.4,10.5],[71.5,10.2],[71.6,9.9],[71.7,9.6],[71.8,9.3],
       [71.8,9.0],[71.8,8.7],[71.8,8.4],[71.7,8.1],[71.6,7.8],[71.4,7.5],
       [71.3,7.2],[71.1,7.0],[70.9,6.8],[70.7,6.6],[70.4,6.4],[70.2,6.2],
       [69.9,6.1],[69.7,5.9],[69.4,5.8],[69.1,5.7],[68.8,5.6],[68.5,5.6],
       [68.2,5.6],[67.9,5.7],[67.6,5.8],[67.3,5.9],[67.0,6.1],[66.8,6.2],
       [66.5,6.4],[66.3,6.6],[66.0,6.8],[65.8,7.0],[65.6,7.2],[65.4,7.4],
       [65.3,7.7],[65.1,7.9],[65.0,8.2],[64.9,8.5],[64.8,8.8],[64.7,9.1],
       [64.6,9.4],[64.5,9.7],[64.4,10.0],[64.3,10.3],[64.2,10.6],[64.1,10.9],
       [64.0,11.2],[64.0,11.5],[64.0,11.8],[64.0,12.1],[64.1,12.4],[64.2,12.7],
       [64.3,13.0],[64.4,13.3],[64.5,13.6],[64.6,13.9],[64.7,14.2],[64.8,14.5],
       [64.9,14.8],[65.1,15.1],[65.3,15.4],[65.5,15.7],[65.7,16.0],[66.0,16.3],
       [66.3,16.6],[66.6,16.8],[66.9,17.0],[67.3,17.2],[67.6,17.4],[68.0,17.5],
       [68.2,23.0]]
    ]
  }
};

// Simplified country shapes for world map
const COUNTRY_PATHS = {
  'USA': 'M 90,88 L 160,88 L 165,100 L 170,110 L 168,120 L 160,125 L 150,128 L 140,130 L 130,128 L 120,125 L 110,120 L 100,118 L 92,115 L 88,108 L 88,98 Z',
  'Canada': 'M 90,55 L 165,55 L 168,75 L 165,88 L 90,88 Z',
  'Mexico': 'M 100,130 L 150,130 L 155,145 L 148,155 L 135,158 L 120,155 L 108,148 L 100,140 Z',
  'Brazil': 'M 215,180 L 280,175 L 295,195 L 290,225 L 270,245 L 245,248 L 220,240 L 205,220 L 205,200 Z',
  'Argentina': 'M 225,250 L 265,248 L 268,270 L 260,295 L 245,310 L 228,305 L 218,285 L 215,265 Z',
  'United Kingdom': 'M 440,78 L 452,75 L 458,82 L 455,92 L 448,96 L 440,93 L 436,86 Z',
  'France': 'M 445,98 L 468,96 L 475,108 L 472,120 L 458,126 L 445,122 L 440,110 Z',
  'Germany': 'M 468,82 L 492,80 L 498,92 L 495,105 L 480,110 L 468,108 L 462,98 Z',
  'Spain': 'M 432,115 L 468,112 L 472,126 L 465,138 L 448,142 L 432,138 L 425,128 Z',
  'Italy': 'M 472,110 L 492,108 L 498,122 L 495,135 L 485,145 L 475,148 L 468,140 L 465,128 Z',
  'Russia': 'M 500,55 L 800,55 L 810,75 L 805,90 L 795,100 L 700,105 L 600,108 L 520,105 L 505,92 Z',
  'China': 'M 650,100 L 760,98 L 775,115 L 770,135 L 750,148 L 720,155 L 690,152 L 665,145 L 648,130 L 642,115 Z',
  'Japan': 'M 780,108 L 798,105 L 808,115 L 805,130 L 795,138 L 782,136 L 775,125 Z',
  'Australia': 'M 680,248 L 770,245 L 790,265 L 785,295 L 760,315 L 725,318 L 695,308 L 672,285 L 668,265 Z',
  'Canada_Alaska': 'M 55,65 L 88,65 L 90,80 L 85,88 L 70,90 L 55,85 Z',
  'South Africa': 'M 465,285 L 515,280 L 525,300 L 520,325 L 500,335 L 478,330 L 460,312 L 455,295 Z',
  'Egypt': 'M 488,152 L 522,150 L 528,168 L 525,185 L 505,192 L 488,188 L 480,172 Z',
  'Nigeria': 'M 452,195 L 490,192 L 498,210 L 495,228 L 475,235 L 455,232 L 445,215 Z',
  'Kenya': 'M 515,215 L 545,212 L 552,230 L 548,248 L 530,255 L 512,250 L 505,235 Z',
  'Pakistan': 'M 573,128 L 618,125 L 625,142 L 620,158 L 600,165 L 578,162 L 568,148 Z',
  'Afghanistan': 'M 572,112 L 615,108 L 622,122 L 618,138 L 600,145 L 575,142 L 565,128 Z',
  'Nepal': 'M 638,132 L 672,130 L 678,140 L 675,148 L 658,152 L 638,148 L 632,140 Z',
  'Bangladesh': 'M 672,148 L 692,145 L 698,158 L 695,170 L 680,175 L 668,170 L 662,158 Z',
  'Sri Lanka': 'M 635,192 L 648,190 L 655,200 L 652,212 L 640,215 L 628,210 L 625,200 Z',
  'Singapore': 'M 695,218 L 705,216 L 710,222 L 708,228 L 698,230 L 690,226 Z',
  'UAE': 'M 545,155 L 572,152 L 578,165 L 575,178 L 558,182 L 540,178 L 535,165 Z',
  'Saudi Arabia': 'M 498,152 L 548,148 L 558,165 L 555,188 L 530,198 L 505,195 L 492,178 Z',
  'Iran': 'M 545,130 L 595,126 L 605,142 L 600,162 L 575,170 L 548,168 L 535,152 Z',
  'Turkey': 'M 492,108 L 548,105 L 555,118 L 550,132 L 525,138 L 498,135 L 485,122 Z',
  'Indonesia': 'M 695,205 L 798,198 L 810,215 L 805,232 L 778,238 L 720,240 L 695,232 L 688,218 Z',
};

// India state borders (internal state boundary lines as polylines)
const INDIA_STATES = {
  'Jammu & Kashmir': { color: '#e8c870', path: 'M 573,97 L 595,92 L 620,88 L 638,95 L 642,108 L 632,118 L 615,122 L 598,120 L 580,115 Z' },
  'Ladakh': { color: '#d4b060', path: 'M 620,85 L 660,80 L 680,88 L 688,100 L 680,112 L 660,118 L 638,115 L 622,105 Z' },
  'Himachal Pradesh': { color: '#c8d890', path: 'M 595,108 L 618,105 L 625,115 L 620,125 L 605,130 L 590,127 L 585,118 Z' },
  'Punjab': { color: '#b8d4a0', path: 'M 572,115 L 598,112 L 605,122 L 600,132 L 582,136 L 568,132 L 562,123 Z' },
  'Uttarakhand': { color: '#c0d488', path: 'M 618,120 L 645,115 L 652,128 L 648,140 L 630,145 L 615,142 L 608,130 Z' },
  'Uttar Pradesh': { color: '#cce0a0', path: 'M 590,128 L 655,122 L 668,138 L 662,158 L 638,168 L 608,165 L 590,155 L 582,142 Z' },
  'Rajasthan': { color: '#dce8a8', path: 'M 545,128 L 598,122 L 608,142 L 600,168 L 572,175 L 545,170 L 528,155 L 530,138 Z' },
  'Gujarat': { color: '#c8e0b0', path: 'M 525,155 L 558,150 L 568,168 L 562,185 L 540,195 L 518,192 L 510,178 L 512,162 Z' },
  'Madhya Pradesh': { color: '#d0e4a8', path: 'M 570,158 L 648,152 L 658,172 L 652,195 L 618,205 L 580,202 L 562,185 L 560,170 Z' },
  'Maharashtra': { color: '#b8d8a8', path: 'M 548,185 L 612,178 L 625,198 L 618,220 L 592,230 L 562,228 L 540,215 L 538,200 Z' },
  'Haryana': { color: '#c0d8b0', path: 'M 562,122 L 590,118 L 598,130 L 592,142 L 572,148 L 555,145 L 548,133 Z' },
  'Delhi': { color: '#e8d890', path: 'M 576,128 L 588,126 L 592,132 L 588,138 L 577,138 L 570,133 Z' },
  'Bihar': { color: '#d8e890', path: 'M 640,148 L 680,142 L 688,158 L 682,175 L 658,180 L 638,175 L 630,160 Z' },
  'Jharkhand': { color: '#c8e098', path: 'M 638,172 L 680,168 L 688,185 L 682,202 L 655,208 L 635,205 L 625,190 Z' },
  'West Bengal': { color: '#d0e8a0', path: 'M 678,148 L 710,142 L 718,162 L 712,185 L 688,192 L 668,188 L 658,172 Z' },
  'Odisha': { color: '#c8dca0', path: 'M 638,195 L 682,188 L 692,205 L 685,228 L 658,235 L 635,230 L 622,215 Z' },
  'Chhattisgarh': { color: '#cce498', path: 'M 608,188 L 655,182 L 665,200 L 658,225 L 628,232 L 605,228 L 592,212 Z' },
  'Telangana': { color: '#c0d8a8', path: 'M 585,218 L 632,212 L 642,232 L 635,252 L 608,258 L 582,252 L 572,235 Z' },
  'Andhra Pradesh': { color: '#b8d4a8', path: 'M 582,248 L 638,242 L 650,262 L 642,285 L 612,292 L 580,288 L 565,272 Z' },
  'Karnataka': { color: '#c4dca0', path: 'M 548,248 L 605,242 L 618,265 L 610,292 L 578,302 L 548,298 L 528,278 L 525,260 Z' },
  'Goa': { color: '#d0e8b0', path: 'M 532,285 L 550,282 L 555,295 L 548,305 L 535,305 L 525,295 Z' },
  'Kerala': { color: '#b8dca8', path: 'M 540,288 L 568,282 L 578,302 L 572,328 L 552,338 L 535,330 L 525,312 Z' },
  'Tamil Nadu': { color: '#c0e0a8', path: 'M 570,278 L 618,268 L 632,290 L 622,318 L 598,335 L 568,330 L 548,312 L 548,295 Z' },
  'Assam': { color: '#cce098', path: 'M 698,140 L 740,135 L 750,150 L 742,165 L 718,170 L 698,165 L 690,152 Z' },
  'Arunachal Pradesh': { color: '#c8dc90', path: 'M 705,118 L 775,112 L 788,128 L 780,142 L 748,148 L 718,145 L 705,132 Z' },
  'Meghalaya': { color: '#d4e898', path: 'M 700,162 L 738,158 L 745,172 L 738,182 L 712,185 L 698,178 L 692,168 Z' },
  'Manipur': { color: '#c4dc90', path: 'M 738,165 L 762,160 L 770,175 L 762,188 L 742,192 L 728,185 L 725,172 Z' },
  'Mizoram': { color: '#cce498', path: 'M 728,182 L 755,178 L 762,192 L 755,205 L 735,208 L 720,202 L 715,190 Z' },
  'Nagaland': { color: '#c8e090', path: 'M 745,148 L 775,142 L 782,155 L 775,168 L 752,172 L 738,165 L 732,155 Z' },
  'Tripura': { color: '#d0e898', path: 'M 712,182 L 735,178 L 742,192 L 735,205 L 715,208 L 702,200 L 698,188 Z' },
  'Sikkim': { color: '#c0d888', path: 'M 695,132 L 715,128 L 720,140 L 715,150 L 700,152 L 690,145 Z' },
  'Andaman & Nicobar': { color: '#b8d8b0', path: 'M 740,238 L 752,235 L 758,248 L 752,262 L 740,265 L 730,258 L 728,245 Z' },
  'Chandigarh': { color: '#e8e090', path: 'M 577,118 L 585,115 L 588,120 L 585,125 L 578,125 Z' },
  'Puducherry': { color: '#d0e890', path: 'M 612,302 L 622,300 L 625,308 L 620,315 L 610,315 Z' },
  'Lakshadweep': { color: '#c8e8b8', path: 'M 540,258 L 552,255 L 556,265 L 550,272 L 540,270 Z' },
};

// Territorial waters zones
const TERRITORIAL_WATERS = [
  // Arabian Sea (west coast)
  { name: 'Arabian Sea TW', path: 'M 495,165 L 530,158 L 538,180 L 530,210 L 510,228 L 488,225 L 475,205 L 478,185 Z' },
  // Bay of Bengal (east coast)
  { name: 'Bay of Bengal TW', path: 'M 638,225 L 690,218 L 705,240 L 698,270 L 672,285 L 645,280 L 628,258 L 628,238 Z' },
  // Indian Ocean (south)
  { name: 'Indian Ocean TW', path: 'M 530,318 L 615,308 L 635,332 L 625,355 L 598,362 L 565,358 L 540,340 Z' }
];

// ---- STATE BOUNDARY LINES (polylines within India) ----
const STATE_BORDER_LINES = [
  // J&K / HP / Punjab
  'M 595,108 L 598,120 L 590,128 L 572,132',
  'M 618,108 L 622,120 L 615,128 L 608,132',
  // HP / Uttarakhand
  'M 618,120 L 625,130 L 618,140',
  // Punjab / Haryana / Delhi
  'M 565,128 L 572,135 L 576,140',
  'M 576,128 L 580,132 L 578,140',
  // Rajasthan / Gujarat
  'M 545,155 L 535,168 L 528,182',
  // Gujarat coast
  'M 510,165 L 518,180 L 510,195',
  // MP / CG / MH
  'M 608,168 L 612,182 L 608,198',
  'M 648,158 L 652,175 L 648,192',
  // Maharashtra coast
  'M 538,195 L 532,210 L 528,225',
  // AP / Telangana
  'M 590,248 L 598,260 L 592,275',
  // Karnataka / Kerala / TN
  'M 550,290 L 555,305 L 548,320',
  'M 568,280 L 572,295 L 568,310',
  // West Bengal / Bihar / Jharkhand
  'M 668,158 L 672,175 L 665,192',
  'M 678,155 L 682,172 L 678,188',
  // Assam borders
  'M 710,145 L 715,158 L 710,170',
  'M 740,140 L 745,152 L 740,165',
  // NE states
  'M 728,162 L 732,175 L 728,188',
  'M 750,155 L 752,168 L 748,180',
];

let supplierMarker = null;
let recipientMarker = null;
let clickTarget = 'supplier';
let onLocationClickCb = null;
let supplierShading = null;
let recipientShading = null;

function initMap(onLocationClick) {
  onLocationClickCb = onLocationClick;
  const svg = document.getElementById('worldMap');
  renderBaseMap(svg);
  svg.addEventListener('click', handleMapClick);
}

function renderBaseMap(svg) {
  svg.innerHTML = '';

  // Ocean background
  const ocean = createSVGEl('rect', { x: 0, y: 0, width: 1000, height: 500, fill: 'var(--map-water)' });
  svg.appendChild(ocean);

  // Draw country shapes
  Object.entries(COUNTRY_PATHS).forEach(([name, d]) => {
    const path = createSVGEl('path', {
      d, fill: 'var(--map-land)', stroke: 'var(--map-border)',
      'stroke-width': '0.8', class: `country-shape country-${name.replace(/\s/g,'_')}`
    });
    svg.appendChild(path);
  });

  // Draw India state shapes
  Object.entries(INDIA_STATES).forEach(([name, data]) => {
    const path = createSVGEl('path', {
      d: data.path,
      fill: 'var(--map-india)',
      stroke: 'var(--map-india-border)',
      'stroke-width': '0.6',
      'stroke-dasharray': '2,1',
      class: `india-state state-${name.replace(/[\s&/(),]/g,'_')}`,
      'data-state': name
    });
    svg.appendChild(path);
  });

  // Draw territorial waters zones (subtle)
  TERRITORIAL_WATERS.forEach(tw => {
    const path = createSVGEl('path', {
      d: tw.path,
      fill: 'rgba(16,185,129,0.08)',
      stroke: 'rgba(16,185,129,0.3)',
      'stroke-width': '0.8',
      'stroke-dasharray': '3,2',
      class: 'territorial-waters-zone',
      'data-name': tw.name
    });
    svg.appendChild(path);
  });

  // Indian border outline (thicker)
  const indiaOutline = createSVGEl('path', {
    d: getIndiaOutline(),
    fill: 'none',
    stroke: 'var(--map-india-border)',
    'stroke-width': '1.5',
    class: 'india-outline'
  });
  svg.appendChild(indiaOutline);

  // State border lines
  STATE_BORDER_LINES.forEach(d => {
    const line = createSVGEl('path', {
      d, fill: 'none', stroke: 'var(--map-india-border)',
      'stroke-width': '0.5', 'stroke-dasharray': '2,1',
      opacity: '0.6'
    });
    svg.appendChild(line);
  });

  // India label
  const indiaLabel = createSVGEl('text', {
    x: 625, y: 198, 'text-anchor': 'middle',
    fill: 'var(--map-india-border)', 'font-size': '9',
    'font-weight': 'bold', 'font-family': 'Product Sans, sans-serif',
    class: 'map-label'
  });
  indiaLabel.textContent = 'INDIA';
  svg.appendChild(indiaLabel);

  // Territorial waters label
  const twLabel = createSVGEl('text', {
    x: 498, y: 200, 'text-anchor': 'middle',
    fill: 'rgba(16,185,129,0.7)', 'font-size': '6.5',
    'font-family': 'Product Sans, sans-serif', class: 'map-label'
  });
  twLabel.textContent = '◎ Territorial Waters';
  svg.appendChild(twLabel);

  // Markers layer (empty initially)
  const markersG = createSVGEl('g', { id: 'markersLayer' });
  svg.appendChild(markersG);
}

function getIndiaOutline() {
  // Simplified bounding outline of India for the overlay
  return 'M 525,128 L 572,115 L 598,108 L 640,88 L 690,85 L 780,112 L 810,130 L 815,145 L 808,165 L 798,185 L 790,210 L 785,238 L 775,265 L 760,290 L 745,310 L 720,328 L 695,338 L 658,342 L 625,340 L 590,335 L 558,322 L 530,305 L 510,285 L 498,260 L 492,235 L 490,208 L 498,185 L 510,165 L 520,148 Z';
}

function handleMapClick(e) {
  const svg = document.getElementById('worldMap');
  const rect = svg.getBoundingClientRect();
  const scaleX = 1000 / rect.width;
  const scaleY = 500 / rect.height;
  const svgX = (e.clientX - rect.left) * scaleX;
  const svgY = (e.clientY - rect.top) * scaleY;

  // Check if clicked in territorial waters zone
  const isTerritorialWaters = checkTerritorialWaters(svgX, svgY);
  // Check if clicked on an India state
  const indiaState = checkIndiaState(svgX, svgY);
  // Check country shapes
  const country = checkCountry(svgX, svgY);

  let locationInfo = null;
  if (isTerritorialWaters) {
    const twName = svgX < 610 ? 'Territorial Waters (Arabian Sea)' : 'Territorial Waters (Bay of Bengal)';
    locationInfo = LOCATIONS.find(l => l.name === twName) ||
      { name: twName, type: 'territorial_waters', country: 'India', inIndia: true, isTerritorialWaters: true, lat: 0, lng: 0 };
  } else if (indiaState) {
    locationInfo = LOCATIONS.find(l => l.name === indiaState || l.state === indiaState) ||
      { name: indiaState, type: 'state', country: 'India', inIndia: true };
  } else if (country) {
    locationInfo = LOCATIONS.find(l => l.country === country || l.name === country) ||
      { name: country, type: 'country', country: country, inIndia: false };
  } else {
    return; // Click in ocean, ignore
  }

  // Add SVG coordinates for marker placement
  locationInfo._svgX = svgX;
  locationInfo._svgY = svgY;

  if (onLocationClickCb) onLocationClickCb(clickTarget, locationInfo);
}

function checkTerritorialWaters(x, y) {
  // Approximate bounding checks for territorial water zones
  const twZones = [
    { x1: 475, y1: 165, x2: 538, y2: 228 }, // Arabian Sea
    { x1: 628, y1: 218, x2: 705, y2: 285 }, // Bay of Bengal
    { x1: 530, y1: 308, x2: 635, y2: 362 }, // Indian Ocean
  ];
  return twZones.some(z => x >= z.x1 && x <= z.x2 && y >= z.y1 && y <= z.y2);
}

function checkIndiaState(x, y) {
  // Rough bounding box of India
  if (x < 490 || x > 820 || y < 85 || y > 345) return null;
  // Find closest state by approximate center
  const stateCenters = {
    'Jammu & Kashmir': [595, 105], 'Ladakh': [650, 98], 'Himachal Pradesh': [605, 118],
    'Punjab': [578, 125], 'Uttarakhand': [628, 130], 'Haryana': [572, 133],
    'Delhi': [580, 133], 'Rajasthan': [568, 148], 'Uttar Pradesh': [625, 145],
    'Gujarat': [535, 172], 'Madhya Pradesh': [608, 178], 'Bihar': [655, 162],
    'Jharkhand': [655, 190], 'West Bengal': [688, 165], 'Chhattisgarh': [628, 208],
    'Odisha': [655, 212], 'Maharashtra': [578, 205], 'Telangana': [608, 235],
    'Andhra Pradesh': [608, 265], 'Karnataka': [568, 272], 'Goa': [538, 293],
    'Kerala': [548, 312], 'Tamil Nadu': [590, 305], 'Sikkim': [705, 140],
    'Assam': [718, 152], 'Arunachal Pradesh': [742, 130], 'Meghalaya': [718, 170],
    'Manipur': [748, 175], 'Mizoram': [738, 192], 'Nagaland': [758, 158],
    'Tripura': [722, 192], 'Andaman & Nicobar': [742, 250],
    'Chandigarh': [582, 120], 'Puducherry': [615, 308], 'Lakshadweep': [545, 262],
  };
  let closest = null, minDist = 30;
  Object.entries(stateCenters).forEach(([name, [cx, cy]]) => {
    const d = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
    if (d < minDist) { minDist = d; closest = name; }
  });
  return closest;
}

function checkCountry(x, y) {
  const countryCenters = {
    'USA': [125, 108], 'Canada': [125, 72], 'Brazil': [248, 210], 'Argentina': [242, 278],
    'United Kingdom': [446, 84], 'France': [455, 112], 'Germany': [478, 95],
    'Russia': [650, 78], 'China': [705, 126], 'Japan': [790, 120],
    'Australia': [728, 280], 'Pakistan': [595, 142], 'Nepal': [655, 140],
    'Bangladesh': [682, 158], 'Sri Lanka': [640, 202], 'Singapore': [700, 222],
    'UAE': [555, 165], 'Iran': [570, 148], 'Turkey': [518, 120],
  };
  let closest = null, minDist = 40;
  Object.entries(countryCenters).forEach(([name, [cx, cy]]) => {
    const d = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
    if (d < minDist) { minDist = d; closest = name; }
  });
  return closest;
}

function setMapClickTarget(target) {
  clickTarget = target;
  const el = document.getElementById('mapClickTarget');
  if (el) el.textContent = `(next: ${target === 'supplier' ? 'Supplier' : 'Recipient'})`;
}

function placeMarker(type, x, y, label) {
  const markersG = document.getElementById('markersLayer');
  if (!markersG) return;
  // Remove existing marker
  const existing = document.getElementById(`marker-${type}`);
  if (existing) existing.remove();

  const g = createSVGEl('g', { id: `marker-${type}` });
  const color = type === 'supplier' ? '#2563eb' : '#d97706';
  const pin = createSVGEl('circle', { cx: x, cy: y, r: 7, fill: color, stroke: '#fff', 'stroke-width': 2, opacity: 0.92 });
  const ring = createSVGEl('circle', { cx: x, cy: y, r: 12, fill: 'none', stroke: color, 'stroke-width': 1.5, opacity: 0.4 });
  const txt = createSVGEl('text', {
    x: x, y: y - 15, 'text-anchor': 'middle', fill: color,
    'font-size': '8', 'font-weight': 'bold', 'font-family': 'Product Sans, sans-serif',
    stroke: 'var(--bg2)', 'stroke-width': '2', 'paint-order': 'stroke'
  });
  txt.textContent = label.length > 16 ? label.slice(0, 14) + '…' : label;
  g.appendChild(ring); g.appendChild(pin); g.appendChild(txt);
  markersG.appendChild(g);
}

function shadeLocation(type, locationName, isIndia, countryName) {
  const svg = document.getElementById('worldMap');
  // Remove previous shading
  const prevId = `shade-${type}`;
  const prev = document.getElementById(prevId);
  if (prev) prev.remove();

  const color = type === 'supplier' ? 'rgba(37,99,235,0.28)' : 'rgba(217,119,6,0.28)';
  const stroke = type === 'supplier' ? 'rgba(37,99,235,0.7)' : 'rgba(217,119,6,0.7)';

  if (isIndia) {
    // Shade the India state
    const stateEl = svg.querySelector(`.state-${locationName.replace(/[\s&/(),]/g,'_')}`);
    if (stateEl) {
      const shade = stateEl.cloneNode(true);
      shade.setAttribute('id', prevId);
      shade.setAttribute('fill', color);
      shade.setAttribute('stroke', stroke);
      shade.setAttribute('stroke-width', '1.2');
      shade.setAttribute('class', 'location-shade');
      const markers = document.getElementById('markersLayer');
      svg.insertBefore(shade, markers);
    }
  } else {
    // Shade country
    const countryKey = countryName || locationName;
    const d = COUNTRY_PATHS[countryKey] || COUNTRY_PATHS[locationName];
    if (d) {
      const shade = createSVGEl('path', {
        id: prevId, d, fill: color, stroke, 'stroke-width': '1.5', class: 'location-shade'
      });
      const markers = document.getElementById('markersLayer');
      svg.insertBefore(shade, markers);
    }
  }
}

function createSVGEl(tag, attrs = {}) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}
