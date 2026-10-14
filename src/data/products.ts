import type { Product, ProductFinish } from '../types';

export const FINISHES: ProductFinish[] = [
  { id: 'matte-black', name: 'Matte Black', hex: '#1E1E1E' },
  { id: 'brushed-brass', name: 'Brushed Brass', hex: '#D4AF37' },
  { id: 'satin-steel', name: 'Satin Stainless Steel', hex: '#A8A9AD' },
  { id: 'polished-chrome', name: 'Polished Chrome', hex: '#E5E7EB' },
  { id: 'gunmetal', name: 'Gunmetal PVD', hex: '#3E424B' },
  { id: 'antique-bronze', name: 'Antique Bronze', hex: '#614E3C' },
];

export const DEMO_PRODUCTS: Product[] = [
  // Door Handles & Knobs
  {
    id: 'siddi-dh-101',
    slug: 'verona-architectural-lever-handle',
    name: 'Verona Architectural Lever Handle',
    series: 'Verona Series',
    category: 'Door Handles & Knobs',
    categorySlug: 'door-handles-knobs',
    shortDescription: 'Solid forged brass lever on a slim rectilinear rose with precision spring return.',
    description: 'The Verona Architectural Lever Handle is cast from solid brass with a subtle bevel edge that provides a substantial, authoritative hand feel. Designed for discerning residential and hotel suites, it pairs with European mortise locks and features concealed fixings with a low-profile 5mm rose.',
    applications: ['Residential Suites', 'Boutique Hotels', 'Executive Offices'],
    finishes: [FINISHES[0], FINISHES[1], FINISHES[2], FINISHES[4]],
    images: [
      'https://images.unsplash.com/photo-1595844730298-b960ff98fee0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    specifications: [
      { label: 'Material', value: 'Solid Forged Brass / Grade 304 Stainless' },
      { label: 'Rose Dimensions', value: '52mm × 52mm × 5mm projection' },
      { label: 'Lever Length', value: '138mm overall' },
      { label: 'Door Thickness', value: '38mm to 54mm standard spindle' },
      { label: 'Spindle Size', value: '8mm steel square spindle' }
    ],
    features: [
      'Concealed screw rose with bayonet twist-lock attachment',
      'Heavy-duty dual torsion return spring for zero-sag alignment',
      'Multi-layer PVD finish treatment for scratch resistance',
      'Suitable for internal doors, passage, privacy, or entrance locks'
    ],
    dimensions: '138mm (L) × 60mm (Projection) × 52mm (Rose Diameter)',
    isDemonstrationItem: true,
    featured: true
  },
  {
    id: 'siddi-dh-102',
    slug: 'kyoto-minimalist-round-lever',
    name: 'Kyoto Minimalist Round Lever',
    series: 'Kyoto Series',
    category: 'Door Handles & Knobs',
    categorySlug: 'door-handles-knobs',
    shortDescription: 'Pure cylindrical lever handle on ultra-thin circular rosette.',
    description: 'Stripping back decorative excess to celebrate functional purity, the Kyoto Lever uses balanced cylindrical geometry. The seamless transition from spindle collar to handle grip embodies Japanese and Scandinavian minimalist design principles.',
    applications: ['Modern Ensuites', 'Minimalist Residences', 'Gallery Spaces'],
    finishes: [FINISHES[0], FINISHES[1], FINISHES[3]],
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595844730298-b960ff98fee0?auto=format&fit=crop&w=1200&q=80'
    ],
    specifications: [
      { label: 'Material', value: 'Grade 304 Stainless Steel' },
      { label: 'Rose Type', value: 'Circular 50mm diameter slim profile' },
      { label: 'Lever Diameter', value: '19mm continuous tube' },
      { label: 'Door Thickness', value: '35mm - 50mm' }
    ],
    features: [
      'Silent PTFE bearing collar prevents metal-on-metal friction',
      'Corrosion-resistant satin brushed finish',
      'Supplied with both wood screws and through-bolt sleeve fixings'
    ],
    dimensions: '142mm (L) × 55mm (Projection) × 50mm (Rose)',
    isDemonstrationItem: true,
    featured: true
  },
  {
    id: 'siddi-dh-103',
    slug: 'modena-entry-pull-handle',
    name: 'Modena Entrance Pull Handle (600mm)',
    series: 'Modena Series',
    category: 'Door Handles & Knobs',
    categorySlug: 'door-handles-knobs',
    shortDescription: 'Substantial rectangular back-to-back pull handle for architectural entrance pivot doors.',
    description: 'Designed as an impressive statement on oversized timber, glass, or composite pivot entrance doors. The Modena features crisp rectangular geometry, softened hand radius, and precision concealed fixing brackets for glass or timber installation.',
    applications: ['Main Entrance Doors', 'Pivot Doors', 'Boardrooms'],
    finishes: [FINISHES[0], FINISHES[1], FINISHES[2]],
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595844730298-b960ff98fee0?auto=format&fit=crop&w=1200&q=80'
    ],
    specifications: [
      { label: 'Overall Length', value: '600mm (Centre-to-Centre 450mm)' },
      { label: 'Cross Section', value: '40mm × 20mm rectangular bar' },
      { label: 'Mounting', value: 'Back-to-back or single bolt through' },
      { label: 'Door Compatibility', value: 'Timber, aluminium frame, 10-12mm toughened glass' }
    ],
    features: [
      'High tensile M8 threaded tie-bolt fixing kit included',
      'Heavy solid core feel with anti-flex rigidity',
      'High-grade PVD surface treatment'
    ],
    dimensions: '600mm (L) × 40mm (W) × 65mm (Projection)',
    isDemonstrationItem: true,
    featured: false
  },
  {
    id: 'siddi-dh-104',
    slug: 'astrid-knurled-mortise-knob',
    name: 'Astrid Knurled Mortise Knob',
    series: 'Astrid Series',
    category: 'Door Handles & Knobs',
    categorySlug: 'door-handles-knobs',
    shortDescription: 'Diamond diamond-cut textured knob for superior grip and artisanal flair.',
    description: 'Featuring industrial precision knurling around the perimeter, the Astrid knob offers positive tactile traction. Ideal for internal doors requiring an artistic and mechanical emphasis.',
    applications: ['Residential Interiors', 'Dressing Rooms', 'Study Doors'],
    finishes: [FINISHES[0], FINISHES[1], FINISHES[4]],
    images: [
      'https://images.unsplash.com/photo-1595844730298-b960ff98fee0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    specifications: [
      { label: 'Knob Diameter', value: '55mm' },
      { label: 'Rose Diameter', value: '52mm' },
      { label: 'Projection', value: '62mm' },
      { label: 'Mechanism', value: 'Sprung knob rotation' }
    ],
    features: [
      'Diamond knurled surface engineered for maximum tactile satisfaction',
      'Solid brass construction for acoustic and sensory weight',
      'Pairs with standard 57mm or 60mm backset latch'
    ],
    dimensions: '55mm (Diameter) × 62mm (Projection)',
    isDemonstrationItem: true,
    featured: true
  },

  // Door Hardware & Accessories
  {
    id: 'siddi-dh-201',
    slug: 'silent-magnetic-mortise-lockset',
    name: 'Silent Magnetic Mortise Lockset',
    series: 'SilentTech Series',
    category: 'Door Hardware & Accessories',
    categorySlug: 'door-hardware-accessories',
    shortDescription: 'Ultra-silent magnetic latch mortise lock with Euro-profile cylinder hole.',
    description: 'Eliminates the metallic click of traditional spring latches. The magnetic latch only extends when the door leaf aligns flush with the frame keeper, ensuring whisper-quiet door closure and zero strike plate scratching.',
    applications: ['Luxury Bedrooms', 'Quiet Living Zones', 'Hotel Guest Rooms'],
    finishes: [FINISHES[0], FINISHES[1], FINISHES[2]],
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595844730298-b960ff98fee0?auto=format&fit=crop&w=1200&q=80'
    ],
    specifications: [
      { label: 'Backset', value: '50mm / 60mm options' },
      { label: 'Centre-to-Centre', value: '85mm (DIN standard Euro profile)' },
      { label: 'Faceplate', value: 'Stainless steel 240mm × 20mm round end' },
      { label: 'Latch Type', value: 'Neodymium magnetic spring-free bolt' }
    ],
    features: [
      'Zero latch rubbing on door frame during swing',
      'Tested to over 200,000 continuous operating cycles',
      'Adjustable strike plate depth for fine door alignment'
    ],
    dimensions: '240mm (H) × 20mm (W) × 75mm (Case Depth)',
    isDemonstrationItem: true,
    featured: true
  },
  {
    id: 'siddi-dh-202',
    slug: 'concealed-3d-adjustable-hinge',
    name: 'Concealed 3D Adjustable Architectural Hinge',
    series: 'Axis Series',
    category: 'Door Hardware & Accessories',
    categorySlug: 'door-hardware-accessories',
    shortDescription: 'Heavy-duty 180° concealed hinge for flush rebated door leaves up to 80kg.',
    description: 'Allows flush doors to sit completely seamless with the adjacent wall when closed. Features three-dimensional millimetric adjustment (height, depth, and sideways) without unhanging the door.',
    applications: ['Frameless Doors', 'Flush Wall Systems', 'Minimalist Interiors'],
    finishes: [FINISHES[0], FINISHES[2], FINISHES[4]],
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    specifications: [
      { label: 'Load Capacity', value: 'Up to 80kg (pair) / 120kg (3 hinges)' },
      { label: 'Door Thickness', value: 'Minimum 35mm door leaf' },
      { label: 'Adjustability', value: 'Height ±2.5mm, Depth ±1.0mm, Lateral ±1.5mm' },
      { label: 'Opening Angle', value: 'Full 180 degrees' }
    ],
    features: [
      'Completely invisible when the door is closed',
      'Wear-free self-lubricating synthetic bush bearings',
      'Includes clip-on cosmetic cover caps in matching finishes'
    ],
    dimensions: '160mm (H) × 28mm (W)',
    isDemonstrationItem: true,
    featured: false
  },
  {
    id: 'siddi-dh-203',
    slug: 'flush-floor-magnetic-door-stop',
    name: 'Flush Floor Magnetic Concealed Door Stop',
    series: 'Axis Series',
    category: 'Door Hardware & Accessories',
    categorySlug: 'door-hardware-accessories',
    shortDescription: 'Zero trip hazard magnetic floor pin that snaps into position only when the door passes.',
    description: 'A discreet floor pin that lies completely flat with the floor tiling or timber flooring until the concealed door magnet draws it upward. Stops doors securely without obtrusive rubber bumpers.',
    applications: ['High-Traffic Hallways', 'Elderly Accessible Homes', 'Contemporary Living'],
    finishes: [FINISHES[0], FINISHES[1], FINISHES[2], FINISHES[3]],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    specifications: [
      { label: 'Floor Core Hole', value: '14mm diameter drill hole' },
      { label: 'Clearance', value: '5mm to 12mm floor-to-door gap' },
      { label: 'Material', value: 'Neodymium rare-earth magnet & stainless steel pin' }
    ],
    features: [
      'Completely flat when door is closed or swung away',
      'Protects skirting boards and door handles from wall impact',
      'Zero trip hazard for robotic vacuums or bare feet'
    ],
    isDemonstrationItem: true,
    featured: false
  },

  // Bathroom Accessories
  {
    id: 'siddi-ba-301',
    slug: 'nordic-wall-mounted-soap-dispenser',
    name: 'Nordic Wall-Mounted Liquid Soap Dispenser',
    series: 'Nordic Bath Series',
    category: 'Bathroom Accessories',
    categorySlug: 'bathroom-accessories',
    shortDescription: 'Frosted glass container with precision stainless steel pump nozzle and wall bracket.',
    description: 'Designed to declutter vanity benchtops, the Nordic Wall-Mounted Soap Dispenser combines heavy acid-etched frosted glass with a solid brass wall clamp. The pump mechanism delivers an exact 1.2ml stroke for lotion or liquid soap without dripping.',
    applications: ['Powder Rooms', 'Master Vanity Units', 'Hotel Ensuites'],
    finishes: [FINISHES[0], FINISHES[1], FINISHES[2], FINISHES[3]],
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80'
    ],
    specifications: [
      { label: 'Container Volume', value: '250ml' },
      { label: 'Bottle Material', value: 'Toughened Frosted Glass' },
      { label: 'Bracket Material', value: 'Corrosion-proof Solid Brass' },
      { label: 'Projection', value: '105mm from wall surface' }
    ],
    features: [
      'Smooth non-clog pump piston designed for daily heavy use',
      'Removable glass vessel for effortless refilling and cleaning',
      'Concealed hex-grub screw wall mounting bracket'
    ],
    dimensions: '165mm (H) × 75mm (W) × 105mm (Projection)',
    isDemonstrationItem: true,
    featured: true
  },
  {
    id: 'siddi-ba-302',
    slug: 'solis-toilet-paper-holder-shelf',
    name: 'Solis Toilet Paper Holder with Integrated Phone Shelf',
    series: 'Solis Series',
    category: 'Bathroom Accessories',
    categorySlug: 'bathroom-accessories',
    shortDescription: 'Multi-functional architectural roll holder featuring a precision milled top tray.',
    description: 'Answering contemporary bathroom needs with architectural restraint. The Solis features a flat, lip-edged tray ideal for holding a smartphone, scent diffuser, or jewelry, seamlessly unified with a secure paper roll arm.',
    applications: ['Master Bathrooms', 'Guest Powder Rooms', 'Executive Washrooms'],
    finishes: [FINISHES[0], FINISHES[1], FINISHES[2]],
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    specifications: [
      { label: 'Shelf Width', value: '160mm × 100mm depth' },
      { label: 'Lip Height', value: '5mm anti-slip perimeter rim' },
      { label: 'Material', value: 'Heavy gauge extruded aluminium and brass' }
    ],
    features: [
      'Integrated ribbed non-slip silicone mat insert',
      'Open arm design allows one-handed roll change in seconds',
      'Robust 4-point concealed anchor mount'
    ],
    dimensions: '160mm (W) × 100mm (D) × 85mm (H)',
    isDemonstrationItem: true,
    featured: true
  },
  {
    id: 'siddi-ba-303',
    slug: 'vertex-shower-corner-caddy',
    name: 'Vertex Architectural Shower Corner Caddy',
    series: 'Vertex Series',
    category: 'Bathroom Accessories',
    categorySlug: 'bathroom-accessories',
    shortDescription: 'Self-draining solid metal corner basket with hidden wall fixings.',
    description: 'Engineered for seamless installation into 90-degree tiled shower corners. Slotted drainage apertures prevent standing water and soap scum accumulation, maintaining spotless shower aesthetics.',
    applications: ['Walk-in Showers', 'Wet Rooms', 'Steam Enclosures'],
    finishes: [FINISHES[0], FINISHES[1], FINISHES[2]],
    images: [
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80'
    ],
    specifications: [
      { label: 'Dimensions', value: '220mm × 220mm × 45mm' },
      { label: 'Drainage', value: 'Laser-cut linear drainage slots' },
      { label: 'Material', value: 'Marine grade 316 Stainless Steel' }
    ],
    features: [
      'Resistant to harsh shampoo chemicals and continuous moisture',
      'Includes dual hooks on underside for loofahs and squeegees',
      'Tile-drill screw anchors with waterproof sealing gaskets'
    ],
    isDemonstrationItem: true,
    featured: false
  },

  // Towel Rails & Holders
  {
    id: 'siddi-tr-401',
    slug: 'linea-single-towel-rail-600',
    name: 'Linea Architectural Single Towel Rail (600mm)',
    series: 'Linea Series',
    category: 'Towel Rails & Holders',
    categorySlug: 'towel-rails-holders',
    shortDescription: 'Clean rectangular horizontal rail with precise 90-degree mitred corners.',
    description: 'The Linea 600mm Single Towel Rail showcases architectural clarity. With a rigid 25mm × 10mm flat profile and generous 70mm wall stand-off, it provides ample airflow for bath towels to dry rapidly.',
    applications: ['Family Bathrooms', 'Ensuite Vanity Walls', 'Pool Houses'],
    finishes: [FINISHES[0], FINISHES[1], FINISHES[2], FINISHES[3], FINISHES[4]],
    images: [
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    specifications: [
      { label: 'Length', value: '600mm centre-to-centre (630mm overall)' },
      { label: 'Bar Dimensions', value: '25mm height × 10mm thickness' },
      { label: 'Wall Clearance', value: '70mm depth' },
      { label: 'Weight Rating', value: 'Rated to 25kg downward pull' }
    ],
    features: [
      'Anti-spin mounting brackets prevent rail rotation over time',
      'Precision welded mitred corners with zero visible joints',
      'Supplied with heavy-duty hollow wall and solid masonry anchors'
    ],
    dimensions: '630mm (W) × 70mm (D) × 25mm (H)',
    isDemonstrationItem: true,
    featured: true
  },
  {
    id: 'siddi-tr-402',
    slug: 'linea-double-towel-rail-800',
    name: 'Linea Dual Tier Towel Rail (800mm)',
    series: 'Linea Series',
    category: 'Towel Rails & Holders',
    categorySlug: 'towel-rails-holders',
    shortDescription: 'Dual tiered towel bar providing double capacity with stepped heights for quick drying.',
    description: 'Constructed for family bathrooms and master suites where two bath sheets must hang without overlapping. The rear rail is elevated 30mm higher than the front rail to streamline towel placement.',
    applications: ['Master Ensuites', 'Luxury Bathrooms'],
    finishes: [FINISHES[0], FINISHES[1], FINISHES[2]],
    images: [
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    specifications: [
      { label: 'Length', value: '800mm length' },
      { label: 'Rail Separation', value: '55mm spacing between bars' },
      { label: 'Material', value: 'Solid Forged Brass core' }
    ],
    features: [
      'Stepped height design allows natural circulation',
      'Rigid centre-supported chassis on 800mm spans',
      'PVD protective seal resists steam and cleaning agents'
    ],
    dimensions: '830mm (W) × 125mm (D) × 55mm (H)',
    isDemonstrationItem: true,
    featured: false
  },
  {
    id: 'siddi-tr-403',
    slug: 'aero-cylindrical-towel-ring',
    name: 'Aero Minimalist Towel Ring',
    series: 'Aero Series',
    category: 'Towel Rails & Holders',
    categorySlug: 'towel-rails-holders',
    shortDescription: 'Cylindrical open-loop hand towel holder with smooth dampening pivot.',
    description: 'An open-ended towel ring that allows hand towels to slide on and off effortlessly without bunched bunching. A hidden nylon damper ensures smooth, silent movement against the wall.',
    applications: ['Guest Powder Rooms', 'Near Basin Vanities'],
    finishes: [FINISHES[0], FINISHES[1], FINISHES[2], FINISHES[3]],
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    specifications: [
      { label: 'Width', value: '200mm' },
      { label: 'Projection', value: '45mm' },
      { label: 'Material', value: 'Grade 304 Stainless Steel' }
    ],
    features: [
      'Silent friction-damped swivel prevents clattering against tiles',
      'Concealed rear mount with anti-rotation grub pins',
      'Ultra-compact footprint for compact vanity zones'
    ],
    dimensions: '200mm (W) × 45mm (D) × 110mm (H)',
    isDemonstrationItem: true,
    featured: false
  },

  // Hooks, Robe Hooks & Utility
  {
    id: 'siddi-hk-501',
    slug: 'pillar-architectural-robe-hook',
    name: 'Pillar Cylindrical Single Robe Hook',
    series: 'Pillar Series',
    category: 'Hooks, Robe Hooks & Utility',
    categorySlug: 'hooks-utility',
    shortDescription: 'Solid brass cylindrical wall peg with discrete anti-slip machined groove.',
    description: 'A sculptural peg hook turned from solid brass stock. A subtle precision-lathed groove 10mm from the tip secures robe loops and heavy wet towels without tearing or stretching fabrics.',
    applications: ['Bathroom Walls', 'Behind Bedroom Doors', 'Walk-in Wardrobes'],
    finishes: [FINISHES[0], FINISHES[1], FINISHES[2], FINISHES[3], FINISHES[4]],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    specifications: [
      { label: 'Diameter', value: '24mm solid brass peg' },
      { label: 'Length Projection', value: '55mm' },
      { label: 'Mounting Plate', value: '28mm concealed disc' },
      { label: 'Load Limit', value: '15kg in masonry or timber stud' }
    ],
    features: [
      'Machined retention shoulder prevents robe straps sliding off',
      'Dual orientation mounting anchor prevents spinning on wall',
      'Supplied with high-torque wall anchor kit'
    ],
    dimensions: '24mm (Diameter) × 55mm (Projection)',
    isDemonstrationItem: true,
    featured: true
  },
  {
    id: 'siddi-hk-502',
    slug: 'prism-double-robe-hook',
    name: 'Prism Architectural Dual Coat & Robe Hook',
    series: 'Prism Series',
    category: 'Hooks, Robe Hooks & Utility',
    categorySlug: 'hooks-utility',
    shortDescription: 'Faceted geometric twin-prong hook for holding multiple garments simultaneously.',
    description: 'Designed for residential entryways and luxury hotel dressing suites. Two gracefully angled prongs allow a heavy coat and a brimmed hat or towel to hang from a single compact architectural fitting.',
    applications: ['Entryways', 'Bathrooms', 'Mudrooms'],
    finishes: [FINISHES[0], FINISHES[1], FINISHES[2]],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    specifications: [
      { label: 'Dimensions', value: '75mm (H) × 65mm (W) × 50mm (D)' },
      { label: 'Material', value: 'Cast Brass / Hand Polished' },
      { label: 'Load Capacity', value: '20kg load rated' }
    ],
    features: [
      'Dual prong geometry engineered for balanced hanging',
      'Beveled facets reflect light with subtle architectural shadow lines',
      'Solid steel backplate with stainless steel locking grub screw'
    ],
    isDemonstrationItem: true,
    featured: false
  },

  // Architectural Hardware
  {
    id: 'siddi-ah-601',
    slug: 'bauhaus-cabinet-edge-pull',
    name: 'Bauhaus Continuous Cabinet Edge Pull (200mm)',
    series: 'Bauhaus Series',
    category: 'Architectural Hardware',
    categorySlug: 'architectural-hardware',
    shortDescription: 'Extruded aluminium lip pull handle for seamless millwork and handleless cabinetry.',
    description: 'Mounted discretely behind cabinet doors and drawer fronts, the Bauhaus edge pull provides ergonomic fingertip purchase while maintaining uninterrupted millwork surfaces in bespoke kitchens and wardrobes.',
    applications: ['Custom Kitchens', 'Integrated Wardrobes', 'Bespoke Joinery'],
    finishes: [FINISHES[0], FINISHES[1], FINISHES[2], FINISHES[4]],
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595844730298-b960ff98fee0?auto=format&fit=crop&w=1200&q=80'
    ],
    specifications: [
      { label: 'Length', value: '200mm (also available in 100mm, 300mm, 600mm)' },
      { label: 'Material', value: 'Architectural Grade 6063-T5 Aluminium Extrusion' },
      { label: 'Mounting', value: 'Rear rebate screw fixed' }
    ],
    features: [
      'Softened interior radius for comfortable finger grasp',
      'Ultra-thin 1.8mm front lip ensures minimal door-to-countertop gap',
      'Pre-countersunk rear screw holes for quick joinery mounting'
    ],
    dimensions: '200mm (L) × 42mm (D) × 18mm (H)',
    isDemonstrationItem: true,
    featured: true
  },
  {
    id: 'siddi-ah-602',
    slug: 'heavy-duty-pivot-door-hinge-system',
    name: 'Heavy-Duty Floor Spring Pivot Hinge System',
    series: 'Axis Series',
    category: 'Architectural Hardware',
    categorySlug: 'architectural-hardware',
    shortDescription: 'Floor-concealed hydraulic pivot hinge for large architectural doors up to 160kg.',
    description: 'Engineered for statement pivot doors in timber, steel, or glass. Features integrated dual-speed hydraulic closing control, adjustable latching velocity, and a 90-degree hold-open mechanism.',
    applications: ['Architectural Pivot Entrances', 'Large Commercial Doors', 'Interior Partition Walls'],
    finishes: [FINISHES[0], FINISHES[2]],
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    specifications: [
      { label: 'Max Door Weight', value: '160kg' },
      { label: 'Max Door Width', value: '1250mm' },
      { label: 'Closing Force', value: 'EN 1154 Size 3-4 adjustable' },
      { label: 'Hold-Open', value: 'Mechanical 90-degree detent' }
    ],
    features: [
      'Tested to 500,000 cycles under maximum load',
      'Independent hydraulic valves for sweep and latch speed control',
      'Stainless steel top pivot with needle roller bearing'
    ],
    isDemonstrationItem: true,
    featured: false
  }
];

export const APPLICATION_AREAS = [
  {
    id: 'residential-bathrooms',
    slug: 'residential-bathrooms',
    title: 'Luxury Residential Bathrooms & Ensuites',
    subtitle: 'Where tactile precision meets daily ritual and serene moisture-resistant resilience',
    description: 'Bathroom environments demand the highest standard of metallurgy. High humidity, temperature swings, and chemical cleaning agents cause lesser hardware to pit and peel. SIDDI bathroom accessories and towel rails are engineered with multi-layer PVD plating over solid forged brass and marine grade 316 stainless steel, ensuring spotless performance across years of daily use.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80',
    relatedCategorySlugs: ['bathroom-accessories', 'towel-rails-holders', 'hooks-utility'],
    hardwareHighlights: [
      'Concealed anti-spin towel bars rated for daily use',
      'Solid brass wall mounts with moisture-tight silicone gaskets',
      'Matching matte black, brushed brass, and polished chrome finishes across all fittings'
    ]
  },
  {
    id: 'master-suites-doors',
    slug: 'master-suites-doors',
    title: 'Bedrooms & Interior Passage Doors',
    subtitle: 'Whisper-quiet acoustic performance, weighted hand-feel, and flush architectural aesthetics',
    description: 'Internal doors are the primary tactile transition points in any home. SIDDI lever handles and magnetic mortise locks eliminate harsh latch clicks and vibration, creating seamless, silent acoustic transitions between bedrooms, dressing rooms, and private studies.',
    image: 'https://images.unsplash.com/photo-1595844730298-b960ff98fee0?auto=format&fit=crop&w=1600&q=85',
    relatedCategorySlugs: ['door-handles-knobs', 'door-hardware-accessories'],
    hardwareHighlights: [
      'Silent magnetic latches that engage without frame strike friction',
      'Concealed 3D adjustable hinges for completely flush door leaves',
      'Ergonomic solid lever sets with dual torsion return springs'
    ]
  },
  {
    id: 'hospitality-hotels',
    slug: 'hospitality-hotels',
    title: 'Boutique Hotels & High-End Hospitality',
    subtitle: 'Cycle-tested durability calibrated to withstand rigorous guest turnover while maintaining five-star elegance',
    description: 'Hotels require hardware that combines architectural design purity with extreme mechanical longevity. From entrance pivot pulls to heavy-use robe hooks and card-key compatible mortise locksets, SIDDI hardware is tested across hundreds of thousands of cycles to exceed commercial contract standards.',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1600&q=80',
    relatedCategorySlugs: ['door-handles-knobs', 'door-hardware-accessories', 'bathroom-accessories', 'towel-rails-holders'],
    hardwareHighlights: [
      'High-traffic EN 1906 Grade 4 mechanical endurance',
      'Corrosion and scratch-resistant PVD physical vapor deposition finishes',
      'Tamper-resistant concealed fixings with proprietary key access'
    ]
  },
  {
    id: 'commercial-interiors',
    slug: 'commercial-interiors',
    title: 'Executive Offices & Commercial Workspaces',
    subtitle: 'Crisp architectural lines, ADA/accessible compliance, and robust security integration',
    description: 'Corporate headquarters and creative agency studios demand hardware that communicates professionalism and intentionality. SIDDI provides oversized entrance pulls, heavy-duty floor pivots, and minimalist cabinet hardware tailored for conference rooms, executive suites, and acoustic glass partitions.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    relatedCategorySlugs: ['architectural-hardware', 'door-handles-knobs', 'door-hardware-accessories'],
    hardwareHighlights: [
      'Back-to-back pull handles for full-height architectural pivot doors',
      'Hydraulic floor spring controls with 90-degree hold-open functionality',
      'Recessed edge pulls for streamlined executive storage millwork'
    ]
  },
  {
    id: 'bespoke-renovations',
    slug: 'bespoke-renovations',
    title: 'Architectural Renovations & Custom Millwork',
    subtitle: 'Unifying hardware finishes across custom joinery, custom vanities, and existing heritage or modern doors',
    description: 'Great renovation projects hinge on cohesive finishing touches. Designers frequently face mismatched metallic tones across suppliers. SIDDI solves this with coordinated finish suites across door handles, cabinet pulls, bathroom hooks, and accessories.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    relatedCategorySlugs: ['architectural-hardware', 'hooks-utility', 'bathroom-accessories'],
    hardwareHighlights: [
      'Identical metallic finish matching across door and joinery elements',
      'Standardized hole center spacing for easy replacement upgrades',
      'Comprehensive technical specification sheets for joinery shop drawings'
    ]
  }
];
