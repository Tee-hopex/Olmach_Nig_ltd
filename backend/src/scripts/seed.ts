import 'dotenv/config';
import { prisma } from '../lib/prisma';

const PH = 'https://placehold.co/800x600/111827/FFFFFF?text=Image+Coming+Soon';

const CAT_IMAGES: Record<string, string> = {
  'industrial-straight':    'https://images.unsplash.com/photo-1630930678172-63343537a00a?auto=format&fit=crop&w=800&q=80',
  'industrial-overlocking': 'https://images.unsplash.com/photo-1642693252490-ace96a2681ee?auto=format&fit=crop&w=800&q=80',
  'weaving-machines':       'https://images.unsplash.com/photo-1675176785803-bffbbb0cd2f4?auto=format&fit=crop&w=800&q=80',
  'tapping-hemming':        'https://images.unsplash.com/photo-1618587194716-40490bdba417?auto=format&fit=crop&w=800&q=80',
  'heat-transfer':          'https://images.unsplash.com/photo-1674471361346-38d423db19f3?auto=format&fit=crop&w=800&q=80',
  'plotter-cutters':        'https://images.unsplash.com/photo-1693031630146-568e2f72db0e?auto=format&fit=crop&w=800&q=80',
  'manual-machines':        'https://images.unsplash.com/photo-1564848534648-558dc1ef55c7?auto=format&fit=crop&w=800&q=80',
};

async function main() {
  console.log('🌱 Seeding Olmach Nig Ltd product catalogue...\n');

  // ── CATEGORIES ────────────────────────────────────────────────────────────
  const [
    catStraight,
    catOverlock,
    catWeaving,
    catTapping,
    catHeat,
    catPlotter,
    catManual,
  ] = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'industrial-straight' },
      update: { image: CAT_IMAGES['industrial-straight'] },
      create: {
        name: 'Industrial Straight Machines',
        slug: 'industrial-straight',
        image: CAT_IMAGES['industrial-straight'],
        description:
          'High-speed industrial lockstitch sewing machines for straight seams. Suitable for garment factories, tailoring shops, and heavy-duty fabric work.',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'industrial-overlocking' },
      update: { image: CAT_IMAGES['industrial-overlocking'] },
      create: {
        name: 'Industrial Overlocking Machines',
        slug: 'industrial-overlocking',
        image: CAT_IMAGES['industrial-overlocking'],
        description:
          'Industrial overlock machines for professional edge finishing, seaming, and joining fabrics with clean, durable stitches.',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'weaving-machines' },
      update: { image: CAT_IMAGES['weaving-machines'] },
      create: {
        name: 'Weaving Machines',
        slug: 'weaving-machines',
        image: CAT_IMAGES['weaving-machines'],
        description:
          'Electric and manual weaving machines for producing elastic waistbands, decorative trims, shoulder straps, and woven braid tape.',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'tapping-hemming' },
      update: { image: CAT_IMAGES['tapping-hemming'] },
      create: {
        name: 'Tapping & Hemming Machines',
        slug: 'tapping-hemming',
        image: CAT_IMAGES['tapping-hemming'],
        description:
          'Specialist industrial machines for belt loop attachment, waistband tape, and precision hem stitching on trousers, skirts, and shirts.',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'heat-transfer' },
      update: { image: CAT_IMAGES['heat-transfer'] },
      create: {
        name: 'Heat Transfer & Heat Press',
        slug: 'heat-transfer',
        image: CAT_IMAGES['heat-transfer'],
        description:
          'Heat press and heat transfer machines for applying rhinestones, glitter motifs, HTV vinyl, and decorative transfers to garments.',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'plotter-cutters' },
      update: { image: CAT_IMAGES['plotter-cutters'] },
      create: {
        name: 'Plotter Cutters',
        slug: 'plotter-cutters',
        image: CAT_IMAGES['plotter-cutters'],
        description:
          'Digital precision plotter cutting machines for vinyl, heat transfer film, and pattern paper used in garment and print production.',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'manual-machines' },
      update: { image: CAT_IMAGES['manual-machines'] },
      create: {
        name: 'Manual Machines',
        slug: 'manual-machines',
        image: CAT_IMAGES['manual-machines'],
        description:
          'Traditional foot-pedal and hand-operated sewing machines — perfect for home tailors, fashion students, and power-cut-proof workshops.',
      },
    }),
  ]);

  console.log('✅ Categories created\n');

  // ── BRANDS ────────────────────────────────────────────────────────────────
  await Promise.all([
    prisma.brand.upsert({
      where: { slug: 'two-lion' },
      update: {},
      create: {
        name: 'Two Lion',
        slug: 'two-lion',
        description:
          'Two Lion is a trusted industrial sewing machine brand widely used across West African garment factories, known for reliable high-speed machines at competitive prices.',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'juki' },
      update: {},
      create: {
        name: 'Juki',
        slug: 'juki',
        description:
          'Juki Corporation is a Japanese industrial sewing machine manufacturer renowned worldwide for precision engineering, the iconic DDL-8700, and decades of proven reliability.',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'jukae' },
      update: {},
      create: {
        name: 'Jukae',
        slug: 'jukae',
        description:
          'Jukae produces industrial-grade sewing and heat press machines offering excellent performance at competitive price points, popular in Nigerian garment factories.',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'emel' },
      update: {},
      create: {
        name: 'Emel',
        slug: 'emel',
        description:
          'Emel is a well-established sewing machine brand across West Africa, offering affordable and durable industrial machines widely serviced across Lagos and major cities.',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'brother' },
      update: {},
      create: {
        name: 'Brother',
        slug: 'brother',
        description:
          'Brother Industries is a globally recognised Japanese manufacturer producing high-quality industrial and home sewing machines trusted by professionals on every continent.',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'enel' },
      update: {},
      create: {
        name: 'Enel',
        slug: 'enel',
        description:
          'Enel manufactures industrial sewing machines and heat press equipment suited for garment decoration and fashion production operations.',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'jukky' },
      update: {},
      create: {
        name: 'Jukky',
        slug: 'jukky',
        description:
          'Jukky produces reliable manual sewing machines ideal for home tailors, fashion school training, and small workshops that need electricity-free operation.',
      },
    }),
  ]);

  console.log('✅ Brands created\n');

  // ── PRODUCTS ──────────────────────────────────────────────────────────────
  const products = [
    // ═══════════════════════════════════════════════════════════════════════
    //  INDUSTRIAL STRAIGHT MACHINES
    // ═══════════════════════════════════════════════════════════════════════
    {
      name: 'Two Lion Industrial Straight Sewing Machine – Model 8700',
      slug: 'two-lion-8700-straight',
      brand: 'Two Lion',
      categoryId: catStraight.id,
      subcategory: 'Standard',
      price: 370000,
      images: [PH],
      shortDescription:
        'Reliable high-speed industrial straight sewing machine built for the demands of professional garment manufacturing.',
      description: `The Two Lion Model 8700 is a dependable industrial lockstitch sewing machine built for the demands of professional garment manufacturing. With a robust cast-iron body and high-torque motor, it handles everything from lightweight woven fabrics to medium-weight denim and canvas with ease.

Designed for long production runs, the 8700 delivers consistent stitch quality at speeds up to 5,500 stitches per minute. The automatic thread trimmer and ergonomic needle-positioning system reduce operator fatigue and boost throughput, making it a firm favourite in garment factories across West Africa.

Comes fully assembled on a heavy-duty metal stand with work table, ready for immediate production use.`,
      features: [
        'High-speed lockstitch: up to 5,500 stitches per minute',
        'Automatic thread trimmer for fast cycle times',
        'Adjustable presser foot pressure for varied fabrics',
        'Cast-iron body for stability and reduced vibration',
        'Large hook design for reduced thread breakage',
        'Automatic bobbin winder integrated into main shaft',
        'Backtack lever with smooth reverse action',
        'Compatible with a wide range of industrial presser feet',
      ],
      specifications: {
        'Stitch Type': 'Single-needle lockstitch',
        'Max Speed': '5,500 stitches per minute',
        'Max Stitch Length': '5 mm',
        'Needle System': 'DB x 1 (#9–#18)',
        'Presser Foot Lift': '13 mm (knee lift: 16 mm)',
        'Motor': 'Clutch motor (servo upgrade available)',
        'Voltage': '220 V / 50 Hz',
        'Weight': 'Approx. 35 kg with stand',
      },
      inStock: true,
      stockCount: 2,
      isFeatured: false,
      isBestSeller: true,
      isNew: false,
      badge: 'Best Seller',
      warranty: '1 Year Warranty',
      tags: ['industrial', 'straight', 'lockstitch', 'two-lion', '8700'],
    },
    {
      name: 'Two Lion 3-Thread Direct Drive Industrial Straight Machine – Model 737',
      slug: 'two-lion-737-direct-drive-straight',
      brand: 'Two Lion',
      categoryId: catStraight.id,
      subcategory: 'Direct Drive',
      price: 420000,
      images: [PH],
      shortDescription:
        'High-speed direct drive industrial straight machine — silent operation, lower electricity, greater stitch precision.',
      description: `The Two Lion Model 737 is a high-performance direct drive industrial straight sewing machine engineered for precision and speed. The direct-drive servo motor replaces the traditional clutch belt system entirely, delivering near-silent operation, up to 70% lower electricity consumption, and consistently precise stitch formation from the very first pass.

The 3-thread configuration is favoured by tailors working on formal wear and uniforms where a clean, precise straight seam is non-negotiable. Programmable start/stop positions, automatic thread trimming, and needle positioning further increase output per operator shift.

Complete package: stand, table, servo motor controller unit, and full accessories kit.`,
      features: [
        'Direct drive servo motor — no belts, no clutch maintenance',
        '3-thread system for clean, precise straight seams',
        'Programmable needle up/down stop position',
        'Auto thread trimmer and thread wiper',
        'Up to 70% energy saving vs standard clutch motor',
        'Near-silent operation for comfortable production floor',
        'Digital stitch counter on motor control panel',
        'Adjustable stitch length 0–5 mm',
      ],
      specifications: {
        'Stitch Type': 'Single-needle lockstitch (3-thread)',
        'Max Speed': '5,500 stitches per minute',
        'Max Stitch Length': '5 mm',
        'Needle System': 'DB x 1',
        'Motor': 'Direct drive servo',
        'Presser Foot Lift': '13 mm',
        'Voltage': '220 V / 50 Hz',
        'Weight': 'Approx. 36 kg with stand',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: true,
      isBestSeller: false,
      isNew: false,
      badge: 'Featured',
      warranty: '1 Year Warranty',
      tags: ['industrial', 'straight', 'direct drive', 'servo', 'two-lion', '737'],
    },
    {
      name: 'Juki DDL-8700 Industrial Straight Sewing Machine',
      slug: 'juki-ddl-8700-straight',
      brand: 'Juki',
      categoryId: catStraight.id,
      subcategory: 'Lockstitch',
      price: 340000,
      images: [PH],
      shortDescription:
        'The world-famous Juki DDL-8700 — the gold standard in industrial straight sewing machines, used in over 120 countries.',
      description: `The Juki DDL-8700 is arguably the most iconic industrial sewing machine in the world. Used by garment manufacturers across more than 120 countries, it has earned its reputation as the global gold standard for straight-stitch industrial sewing through decades of proven reliability.

At its core the DDL-8700 features a one-piece cast-iron frame, an energy-saving direct-drive motor, automatic thread trimmer, and Juki's patented large vertical hook mechanism that significantly reduces thread breakage even at maximum speed. The revised needle bar stroke delivers smoother feeding across the full range of fabrics — from sheer chiffon to heavy canvas.

Backed by Juki's global service network and the widest spare parts availability of any machine in this class, the DDL-8700 is the safest long-term investment for any serious production environment.`,
      features: [
        "Juki's patented large vertical hook — minimum thread breakage",
        'Energy-efficient direct-drive servo motor',
        'Automatic thread trimmer with programmable control panel',
        'One-piece cast-iron frame for vibration-free high-speed operation',
        'Revised needle bar stroke for smoother feeding on all fabrics',
        'Works from sheer chiffon to heavy canvas without adjustment',
        'Widest global spare parts availability of any machine',
        'Genuine Juki accessories kit included',
      ],
      specifications: {
        'Model': 'DDL-8700',
        'Stitch Type': 'Single-needle lockstitch',
        'Max Speed': '5,500 stitches per minute',
        'Max Stitch Length': '5 mm',
        'Needle System': 'DB x 1 (#9–#18)',
        'Motor': 'Direct drive servo',
        'Presser Foot Lift': '13 mm (knee lift: 16 mm)',
        'Voltage': '220 V single phase',
        'Weight': 'Approx. 37 kg with stand',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: true,
      isBestSeller: true,
      isNew: false,
      badge: 'Best Seller',
      warranty: '1 Year Warranty',
      tags: ['industrial', 'straight', 'lockstitch', 'juki', 'ddl-8700', 'japanese'],
    },
    {
      name: 'Juki Direct Drive Industrial Straight Sewing Machine',
      slug: 'juki-direct-drive-straight',
      brand: 'Juki',
      categoryId: catStraight.id,
      subcategory: 'Direct Drive',
      price: 390000,
      images: [PH],
      shortDescription:
        'Juki direct drive industrial straight machine — instant pedal response, superior energy efficiency, and Juki build quality.',
      description: `This Juki direct drive industrial straight sewing machine combines Juki's legendary build quality with a modern servo drive system, delivering unmatched pedal response and energy efficiency for professional garment production.

The direct drive system eliminates all belt and clutch components — the motor responds instantly to the foot pedal at any speed, from slow precision tacking to full-speed production seaming. This level of fine control is especially valuable when working on intricate seams, pockets, or delicate fabrics where stitch placement matters.

Complete package includes stand, table, servo controller unit, and all accessories.`,
      features: [
        'Juki-branded direct drive servo motor',
        'Instant pedal response — full control at any speed',
        'Near-silent operation for factory floor comfort',
        'Auto needle positioning and thread trimmer',
        'Programmable stitch count for pocket openings and bar tacks',
        'Foot pressure dial for varied fabric weights',
        'Backtack lever with programmable stitch count',
        'Easy front-loading bobbin system',
      ],
      specifications: {
        'Stitch Type': 'Single-needle lockstitch',
        'Max Speed': '5,500 stitches per minute',
        'Max Stitch Length': '5 mm',
        'Needle System': 'DB x 1',
        'Motor': 'Juki direct drive servo',
        'Presser Foot Lift': '13 mm',
        'Voltage': '220 V / 50 Hz',
        'Weight': 'Approx. 37 kg with stand',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: false,
      warranty: '1 Year Warranty',
      tags: ['industrial', 'straight', 'juki', 'direct drive', 'servo'],
    },
    {
      name: 'Jukae Direct Drive Industrial Straight Sewing Machine',
      slug: 'jukae-direct-drive-straight',
      brand: 'Jukae',
      categoryId: catStraight.id,
      subcategory: 'Direct Drive',
      price: 420000,
      images: [PH],
      shortDescription:
        'Jukae direct drive industrial straight machine — professional-grade performance at a highly competitive price.',
      description: `The Jukae direct drive industrial straight sewing machine is built for garment makers who need professional performance without the premium cost of top-tier Japanese brands. A smooth servo motor, integrated needle positioning, and auto thread trimmer come in a compact, factory-ready body designed for sustained daily production.

Jukae machines are widely used across garment factories in Nigeria for producing shirts, trousers, school uniforms, and outerwear. The direct drive motor removes all maintenance concerns around belt wear and clutch adjustment, keeping downtime to an absolute minimum.

Complete unit with stand, table, servo controller, and accessories kit.`,
      features: [
        'Direct drive servo motor — energy saving, low noise',
        'Auto thread trimmer and needle positioning',
        'Easy front-access bobbin loading',
        'Smooth feed dog for consistent fabric movement',
        'Stitch length adjustment 0–5 mm',
        'Built-in reverse / backtack lever',
        'Heavy-duty cast-iron arm',
        'Full stand, table, and accessories included',
      ],
      specifications: {
        'Stitch Type': 'Single-needle lockstitch',
        'Max Speed': '5,000 stitches per minute',
        'Max Stitch Length': '5 mm',
        'Needle System': 'DB x 1',
        'Motor': 'Direct drive servo',
        'Presser Foot Lift': '13 mm',
        'Voltage': '220 V / 50 Hz',
        'Weight': 'Approx. 35 kg with stand',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: false,
      warranty: '1 Year Warranty',
      tags: ['industrial', 'straight', 'jukae', 'direct drive', 'servo'],
    },
    {
      name: 'Jukae Industrial Straight Sewing Machine',
      slug: 'jukae-industrial-straight',
      brand: 'Jukae',
      categoryId: catStraight.id,
      subcategory: 'Standard',
      price: 350000,
      images: [PH],
      shortDescription:
        'Standard Jukae industrial straight machine — the dependable workhorse of Nigerian garment workshops.',
      description: `The Jukae industrial straight sewing machine is the dependable workhorse of garment workshops across Nigeria. Built for volume sewing, it handles light to medium fabrics with ease — ideal for shirts, dresses, trousers, school uniforms, and general tailoring. The heavy-duty clutch motor and cast-iron body are designed to run continuously through long production shifts with minimal servicing.

Virtually every trained industrial tailor in Nigeria has worked on this style of machine, meaning skilled operators are easy to find and productivity begins on day one.

Includes stand, table, clutch motor, bobbin case, and starter accessories kit.`,
      features: [
        'High-torque clutch motor for consistent power delivery',
        'Heavy-duty cast-iron construction',
        'Large horizontal hook for high bobbin thread capacity',
        'Stitch length adjustment 1–5 mm',
        'Drop feed for free-motion stitching',
        'Knee lifter lever compatible',
        'Wide range of compatible presser feet available',
        'Widely available spare parts across Nigeria',
      ],
      specifications: {
        'Stitch Type': 'Single-needle lockstitch',
        'Max Speed': '5,000 stitches per minute',
        'Max Stitch Length': '5 mm',
        'Needle System': 'DB x 1',
        'Motor': 'Clutch motor',
        'Presser Foot Lift': '13 mm',
        'Voltage': '220 V / 50 Hz',
        'Weight': 'Approx. 34 kg with stand',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: false,
      warranty: '1 Year Warranty',
      tags: ['industrial', 'straight', 'jukae', 'standard', 'clutch motor'],
    },
    {
      name: 'Emel 8700 Industrial Straight Sewing Machine',
      slug: 'emel-8700-straight',
      brand: 'Emel',
      categoryId: catStraight.id,
      subcategory: 'Standard',
      price: 380000,
      images: [PH],
      shortDescription:
        'Emel 8700 — a trusted, affordable industrial straight machine with decades of proven reliability in Nigerian workshops.',
      description: `The Emel 8700 industrial straight sewing machine has been a staple of Nigerian garment workshops for generations. Combining robust construction with accessible pricing, it delivers the stitch quality and dependability that production environments demand — day in, day out.

The 8700 form factor is the most widely known industrial machine layout in Nigeria, meaning virtually every trained tailor can operate it immediately. It handles cotton, polyester, lining fabric, and medium-weight denim without hesitation. Spare parts for the Emel 8700 are stocked in markets across Lagos, Aba, and Kano, making maintenance fast and low-cost.

Includes stand, table, motor, bobbin case, and accessories.`,
      features: [
        'Classic 8700 layout — familiar to every Nigerian tailor',
        'Lockstitch at up to 5,000 stitches per minute',
        'Adjustable presser foot pressure and stitch length',
        'Cast-iron body for long service life',
        'Universal spare parts — available nationwide',
        'Automatic backtack lever',
        'Smooth feeding on lightweight to medium fabrics',
        'Bobbin winder integrated into drive shaft',
      ],
      specifications: {
        'Stitch Type': 'Single-needle lockstitch',
        'Max Speed': '5,000 stitches per minute',
        'Max Stitch Length': '5 mm',
        'Needle System': 'DB x 1',
        'Motor': 'Clutch motor',
        'Presser Foot Lift': '13 mm',
        'Voltage': '220 V / 50 Hz',
        'Weight': 'Approx. 34 kg with stand',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: false,
      warranty: '1 Year Warranty',
      tags: ['industrial', 'straight', 'emel', '8700', 'affordable'],
    },
    {
      name: 'UK Used Brother Industrial Straight Sewing Machine (New Stand & Table)',
      slug: 'brother-uk-used-straight',
      brand: 'Brother',
      categoryId: catStraight.id,
      subcategory: 'UK Used',
      price: 280000,
      images: [PH],
      shortDescription:
        'Imported UK-factory-used Brother straight machine on a brand-new stand and table — premium Japanese quality at a smart price.',
      description: `Get the quality of genuine Japanese Brother industrial engineering at a fraction of new price. These machines were professionally used in UK garment factories, carefully imported, individually inspected and tested, then set up on brand-new heavy-duty stands and work tables here in Lagos.

Brother is a globally recognised name in industrial sewing. Their straight machines are known for whisper-quiet operation, precise stitch formation, and excellent durability — often outlasting cheaper new machines by many years. Buying UK used is the smart choice for workshops that want premium reliability without the full premium price.

Each unit is tested before sale, fitted on a new stand and table, and ready for immediate production use.`,
      features: [
        'Genuine Brother industrial straight stitch mechanism',
        'UK factory-used — professionally maintained throughout its prior service life',
        'Fitted on a brand-new heavy-duty metal stand and table',
        'Individually tested and verified by Olmach before sale',
        'Precise, consistent stitch formation at all speeds',
        'Very low noise — ideal for studio or workshop environments',
        'DB x 1 needle system — standard parts widely available',
        'Smooth operation across light to medium fabric weights',
      ],
      specifications: {
        'Brand': 'Brother Industries (Japan)',
        'Condition': 'UK used — tested and serviced',
        'Stand': 'Brand-new heavy-duty metal stand',
        'Table': 'New work table included',
        'Stitch Type': 'Single-needle lockstitch',
        'Needle System': 'DB x 1',
        'Motor': 'Clutch motor',
        'Voltage': '220 V / 50 Hz',
      },
      inStock: true,
      stockCount: 2,
      isFeatured: true,
      isBestSeller: false,
      isNew: false,
      badge: 'Great Value',
      warranty: '6 Months Warranty',
      tags: ['industrial', 'straight', 'brother', 'uk used', 'refurbished', 'japanese', 'value'],
    },
    {
      name: 'Enel Industrial Straight Sewing Machine',
      slug: 'enel-industrial-straight',
      brand: 'Enel',
      categoryId: catStraight.id,
      subcategory: 'Standard',
      price: 340000,
      images: [PH],
      shortDescription:
        'Enel industrial straight machine — solid mid-range performance for tailors and small garment factories.',
      description: `The Enel industrial straight sewing machine is a reliable mid-range option for tailors and small garment factories who need consistent performance without overspending. Built with a heavy-duty steel and cast-iron frame, the Enel handles daily production demands reliably across the full working week.

Suitable for general tailoring, shirt production, formal wear, and school uniform manufacturing. The familiar 8700-style layout means operators can start productive work immediately. Widely serviced in Lagos with spare parts readily available.

Comes with full stand, table, motor, and accessories.`,
      features: [
        'Industrial lockstitch mechanism for clean, strong seams',
        'Heavy-duty steel and cast-iron frame',
        'Consistent stitch formation on varied fabric weights',
        'Stitch length adjustment 1–5 mm',
        'Built-in backtack lever',
        'Easy bobbin loading and thread path',
        'Knee lift lever compatible',
        'Widely serviced across Lagos',
      ],
      specifications: {
        'Stitch Type': 'Single-needle lockstitch',
        'Max Speed': '5,000 stitches per minute',
        'Max Stitch Length': '5 mm',
        'Needle System': 'DB x 1',
        'Motor': 'Clutch motor',
        'Presser Foot Lift': '13 mm',
        'Voltage': '220 V / 50 Hz',
        'Weight': 'Approx. 34 kg with stand',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: false,
      warranty: '1 Year Warranty',
      tags: ['industrial', 'straight', 'enel', 'lockstitch'],
    },

    // ═══════════════════════════════════════════════════════════════════════
    //  INDUSTRIAL OVERLOCKING MACHINES
    // ═══════════════════════════════════════════════════════════════════════
    {
      name: 'Jukae 4-Thread Industrial Overlocking Machine – Model 747',
      slug: 'jukae-4-thread-overlock-747',
      brand: 'Jukae',
      categoryId: catOverlock.id,
      subcategory: '4-Thread',
      price: 430000,
      images: [PH],
      shortDescription:
        'High-speed 4-thread industrial overlock machine — simultaneous seaming and edge finishing for T-shirts, knitwear, and casuals.',
      description: `The Jukae Model 747 is a professional 4-thread industrial overlock machine built for high-volume garment production. The 4-thread safety stitch simultaneously seams and overlocks the edge in a single pass, producing the strong, clean seams that are essential for T-shirts, knitwear, sportswear, and casual wear.

Operating at up to 6,500 stitches per minute, the 747 keeps pace with the fastest production lines. The differential feed system handles stretchy jersey and lycra fabrics without puckering or distortion, while the colour-coded threading guide cuts setup time to a minimum even for new operators.

Complete unit with stand, table, motor, and full threading accessories kit.`,
      features: [
        '4-thread safety stitch — seam and overlock edge in one pass',
        'Differential feed for stretch fabrics (jersey, lycra, rib)',
        'Up to 6,500 stitches per minute',
        'Colour-coded threading path for quick setup',
        'Adjustable stitch width 2–6.5 mm and length 1–4.5 mm',
        'Automatic lubrication system for continuous running',
        'Adjustable upper and lower knife for clean edge trim',
        'Long-life hardened steel blade',
      ],
      specifications: {
        'Stitch Type': '4-thread overlock (safety stitch)',
        'Max Speed': '6,500 stitches per minute',
        'Stitch Width': '2.0–6.5 mm',
        'Stitch Length': '1.0–4.5 mm',
        'Needle System': 'DC x 27 / DC x 1',
        'Differential Feed Ratio': '0.7:1 to 2.0:1',
        'Motor': 'Clutch motor',
        'Voltage': '220 V / 50 Hz',
        'Weight': 'Approx. 38 kg with stand',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: true,
      isNew: false,
      badge: 'Best Seller',
      warranty: '1 Year Warranty',
      tags: ['industrial', 'overlock', 'overlocking', 'jukae', '747', '4-thread', 'safety stitch'],
    },
    {
      name: 'Two Lion Direct Drive Industrial Overlocking Machine – Model 747CD',
      slug: 'two-lion-747cd-direct-drive-overlock',
      brand: 'Two Lion',
      categoryId: catOverlock.id,
      subcategory: 'Direct Drive',
      price: 450000,
      images: [PH],
      shortDescription:
        'Two Lion 747CD direct drive overlock — silent, energy-efficient edge finishing for modern garment factories.',
      description: `The Two Lion 747CD upgrades the proven 747 overlock platform with a direct drive servo motor, eliminating belt and clutch components entirely. The result is a quieter, faster-responding, and significantly more energy-efficient machine that requires less maintenance and delivers more consistent stitch quality over long production runs.

Factories looking to reduce electricity bills and floor noise increasingly choose the CD (direct drive) variant. The servo controller gives operators precise speed control, making it easier to produce clean seams even on challenging stretchy fabrics. The auto lubrication system keeps the mechanism running smoothly shift after shift.

Complete unit: stand, table, servo motor controller, and full threading accessories.`,
      features: [
        'Direct drive CD servo motor — zero belt or clutch maintenance',
        'Up to 70% reduction in electricity vs standard clutch models',
        'Significantly lower noise levels on the production floor',
        'Fine speed control from near-idle to 6,500 SPM',
        'Automatic lubrication system',
        'Differential feed for stretch and woven fabrics',
        'Adjustable cutting width 2–6.5 mm',
        'Long-life hardened steel knife blade',
      ],
      specifications: {
        'Model': '747CD',
        'Stitch Type': '4-thread overlock',
        'Max Speed': '6,500 stitches per minute',
        'Motor': 'Direct drive servo (CD)',
        'Stitch Width': '2.0–6.5 mm',
        'Stitch Length': '1.0–4.5 mm',
        'Differential Feed Ratio': '0.7–2.0',
        'Voltage': '220 V / 50 Hz',
        'Weight': 'Approx. 39 kg with stand',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: true,
      isBestSeller: false,
      isNew: false,
      badge: 'Featured',
      warranty: '1 Year Warranty',
      tags: ['industrial', 'overlock', 'two-lion', '747cd', 'direct drive', 'servo'],
    },
    {
      name: '3-Thread Emel Industrial Overlocking Machine – Model 737',
      slug: 'emel-3-thread-overlock-737',
      brand: 'Emel',
      categoryId: catOverlock.id,
      subcategory: '3-Thread',
      price: 480000,
      images: [PH],
      shortDescription:
        'Emel 737 3-thread industrial overlock — lightweight, clean edge finishing for woven fabrics, shirts, and formal wear.',
      description: `The Emel 737 is a 3-thread industrial overlock machine designed for professional edge finishing. The 3-thread configuration is the standard choice for overlocking raw edges on shirts, trousers, and woven garments — preventing fraying without the added bulk of a 4-thread seam, which matters for the clean internal finish expected in quality formal wear.

Ideal for tailors and small factories producing formal wear and uniforms where lightweight, neat seam finishing is a priority. The 737 runs smoothly on woven fabrics from thin cotton shirting to medium-weight suiting, and the adjustable differential feed handles slight stretch fabrics as well.

Built on the proven 737 frame with widely available spare parts across Nigeria. Comes with stand, table, motor, and full accessories.`,
      features: [
        '3-thread overlock — lightweight, clean raw edge finishing',
        'Adjustable stitch width 2.0–6.5 mm',
        'Differential feed for consistent results on varied fabrics',
        'Up to 6,000 stitches per minute',
        'Upper and lower knife system for precise edge trim',
        'Colour-coded threading path',
        'Cast-iron body for stability and longevity',
        'Spare parts widely stocked across Nigeria',
      ],
      specifications: {
        'Model': '737',
        'Stitch Type': '3-thread overlock',
        'Max Speed': '6,000 stitches per minute',
        'Stitch Width': '2.0–6.5 mm',
        'Stitch Length': '1.0–4.0 mm',
        'Needle System': 'DC x 27',
        'Differential Feed Ratio': '0.7:1 to 2.0:1',
        'Voltage': '220 V / 50 Hz',
        'Weight': 'Approx. 38 kg with stand',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: false,
      warranty: '1 Year Warranty',
      tags: ['industrial', 'overlock', 'emel', '737', '3-thread', 'edge finishing'],
    },

    // ═══════════════════════════════════════════════════════════════════════
    //  WEAVING MACHINES
    // ═══════════════════════════════════════════════════════════════════════
    {
      name: 'Complete Set of Inner Weaving Machines (Electric & Manual)',
      slug: 'complete-inner-weaving-set',
      brand: 'Two Lion',
      categoryId: catWeaving.id,
      subcategory: 'Complete Set',
      price: 160000,
      images: [PH],
      shortDescription:
        'Full electric and manual weaving machine set — produce elastic waistbands, decorative trims, and woven straps in-house.',
      description: `This complete inner weaving machine set includes both electric and manual units, giving your workshop maximum flexibility for producing woven fabric, elastic waistbands, decorative trims, shoulder straps, and braid tape in-house.

The electric unit handles high-volume, repetitive weaving runs efficiently — ideal for producing elastic bands and waistband tape at scale. The manual machine provides the fine control needed for custom or detailed weaving work, prototype runs, and delicate yarn types. Both units are compatible with a wide range of yarns including cotton, polyester, nylon, and elastic thread.

Widely used in garment factories, fashion ateliers, and accessory workshops across West Africa. The set gives you complete in-house weaving capability without outsourcing.

Set includes: electric weaving machine, manual weaving machine, threading accessories, and starter spare parts kit.`,
      features: [
        'Complete set: electric + manual weaving machines',
        'Electric unit for high-volume continuous production',
        'Manual unit for custom, detail, and prototype weaving',
        'Compatible with cotton, polyester, nylon, and elastic yarn',
        'Produces elastic waistbands, decorative trim, straps, and braid',
        'Compact footprint — suits all workshop sizes',
        'Simple operation — minimal training required',
        'Spare parts kit included',
      ],
      specifications: {
        'Set Contents': 'Electric weaving machine + manual weaving machine',
        'Weaving Width': 'Up to 50 mm',
        'Compatible Yarns': 'Cotton, Polyester, Nylon, Elastic',
        'Electric Motor': '220 V / 50 Hz',
        'Applications': 'Elastic waistbands, decorative trim, shoulder straps, braid',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: false,
      warranty: '1 Year Warranty',
      tags: ['weaving', 'inner weaving', 'electric', 'manual', 'elastic', 'trim', 'complete set'],
    },

    // ═══════════════════════════════════════════════════════════════════════
    //  TAPPING & HEMMING MACHINES
    // ═══════════════════════════════════════════════════════════════════════
    {
      name: 'Two Lion Industrial Tapping Machine – Model 500-2',
      slug: 'two-lion-tapping-500-2',
      brand: 'Two Lion',
      categoryId: catTapping.id,
      subcategory: 'Tapping',
      price: 650000,
      images: [PH],
      shortDescription:
        'Two Lion 500-2 industrial tapping machine — automates belt loop folding and attachment for high-volume trouser and jeans production.',
      description: `The Two Lion Model 500-2 is a dedicated industrial tapping (belt loop) machine designed for the mass production of belt loops on trousers, shorts, jeans, and skirts. This highly specialised machine automates the complete process — folding the tape, positioning it, and stitching it to the garment — in a single operation, cutting production time dramatically compared to any manual method.

The precision folder and adjustable guide system ensures consistent loop width, spacing, and positioning across every garment produced. At production speeds that far exceed traditional two-step approaches, the 500-2 is a must-have for any factory running trousers or jeans at volume. Works on denim, canvas, suiting, and other woven fabrics.

Complete setup: stand, table, servo motor, specialised folder set, and presser feet.`,
      features: [
        'Full automation: fold, position, and stitch belt loops in one pass',
        'High-speed production — dramatically faster than manual methods',
        'Precision-adjustable folder for different tape widths',
        'Consistent loop width and placement on every garment',
        'Works on denim, canvas, and woven fabrics',
        'Heavy-duty machine head for continuous shift operation',
        'Specialised presser feet included',
        'Servo motor for energy efficiency',
      ],
      specifications: {
        'Model': '500-2',
        'Application': 'Belt loop / waistband tape attachment',
        'Max Speed': '3,500 stitches per minute',
        'Tape Width': '8–50 mm (adjustable folder set)',
        'Needle System': 'TQ x 1',
        'Motor': 'Servo motor',
        'Voltage': '220 V / 50 Hz',
        'Weight': 'Approx. 45 kg with stand',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['tapping', 'belt loop', 'industrial', 'two-lion', '500-2', 'trousers', 'jeans', 'specialist'],
    },
    {
      name: 'Two Lion Industrial Hemming Machine – Model 101',
      slug: 'two-lion-hemming-101',
      brand: 'Two Lion',
      categoryId: catTapping.id,
      subcategory: 'Hemming',
      price: 750000,
      images: [PH],
      shortDescription:
        'Two Lion Model 101 industrial hemming machine — precision blind hem stitching for trousers, skirts, and shirts at production speed.',
      description: `The Two Lion Model 101 is a professional industrial hemming machine for producing perfectly folded and stitched hems at production speed. The integrated folder mechanism automatically folds the fabric edge to the exact required hem depth before stitching — eliminating the need for manual pressing, pinning, or pre-folding that slows down traditional hemming workflows.

The 101's blind hem capability makes it the first choice for formal trouser and skirt production, where the stitching must be virtually invisible from the outside. It handles fabrics from light chiffon to medium-weight suiting and denim with excellent results.

Used in factories and tailoring schools across Nigeria for high-volume hem production. Includes stand, table, adjustable folder set, and motor.`,
      features: [
        'Automatic folder — no manual pressing or pinning needed',
        'Blind hem stitch — invisible from garment exterior',
        'Adjustable hem depth folder set included',
        'Works on light chiffon to medium-weight denim',
        'High-speed production for volume factories',
        'Heavy-duty construction for continuous shift use',
        'Compatible with multiple hem styles',
        'Low vibration for operator comfort on long shifts',
      ],
      specifications: {
        'Model': '101',
        'Application': 'Blind hem, rolled hem, plain hem',
        'Max Speed': '4,000 stitches per minute',
        'Hem Depth': 'Adjustable (folder set included)',
        'Needle System': 'UO x 113',
        'Motor': 'Servo motor',
        'Voltage': '220 V / 50 Hz',
        'Weight': 'Approx. 43 kg with stand',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['hemming', 'hem', 'blind hem', 'industrial', 'two-lion', '101', 'trousers', 'skirts', 'specialist'],
    },

    // ═══════════════════════════════════════════════════════════════════════
    //  HEAT TRANSFER / HEAT PRESS
    // ═══════════════════════════════════════════════════════════════════════
    {
      name: 'Jukae 38×38 Heat Transfer Stoning Machine',
      slug: 'jukae-38x38-heat-transfer-stoning',
      brand: 'Jukae',
      categoryId: catHeat.id,
      subcategory: 'Stoning',
      price: 180000,
      images: [PH],
      shortDescription:
        'Jukae 38×38 cm heat transfer stoning machine — apply rhinestones, motifs, and HTV transfers precisely and permanently.',
      description: `The Jukae 38×38 heat transfer stoning machine is the tool of choice for fashion designers and garment decorators applying rhinestone transfers, glitter motifs, and heat-fix embellishments to clothing. The 38 cm × 38 cm platen gives a generous working area suitable for full-front transfers, large embellishments, and repeated placements on the same garment.

The machine uses a combination of precise digital temperature control and even pressure distribution to permanently transfer designs onto cotton, polyester, silk, and blended fabrics without damaging the garment. The quick heat-up time means production can start within minutes of switching on.

Ideal for fashion designers, custom clothing businesses, uniform decorators, and boutique embellishment studios.`,
      features: [
        '38×38 cm platen — covers full chest area in one press',
        'Digital temperature control up to 230°C',
        'Even pressure distribution across the full platen area',
        'Heat-up time 60–90 seconds',
        'Works on cotton, polyester, silk, and nylon blends',
        'Applies rhinestones, glitter, foil, and vinyl transfers',
        'Adjustable pressure knob',
        'Safety auto-off countdown timer',
      ],
      specifications: {
        'Platen Size': '38 cm × 38 cm',
        'Temperature Range': '0–230°C',
        'Heating Time': '60–90 seconds',
        'Pressure': 'Adjustable knob',
        'Applications': 'Rhinestones, heat transfers, glitter, foil, HTV vinyl',
        'Compatible Fabrics': 'Cotton, Polyester, Silk, Nylon, Blends',
        'Power': '1,600 W',
        'Voltage': '220 V / 50 Hz',
        'Weight': 'Approx. 15 kg',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: false,
      warranty: '1 Year Warranty',
      tags: ['heat press', 'heat transfer', 'stoning', 'rhinestone', 'jukae', '38x38', 'fashion decoration'],
    },
    {
      name: '40×60 Heat Transfer Stoning Machine',
      slug: '40x60-heat-transfer-stoning',
      brand: 'Enel',
      categoryId: catHeat.id,
      subcategory: 'Stoning',
      price: 370000,
      images: [PH],
      shortDescription:
        'Large 40×60 cm heat transfer stoning machine — full-body design coverage in one press for high-volume decoration.',
      description: `The 40×60 heat transfer stoning machine is the large-format workhorse for fashion designers and decoration businesses working with full-body prints, wide-panel transfers, and high-volume rhinestone application. The generous 40 cm × 60 cm platen covers the full front of most adult garments in a single press, eliminating repositioning entirely and saving significant production time.

This machine is engineered for repeated daily use in fashion studios, custom printing businesses, and garment decoration workshops. The heavy-duty upper arm and precision pressure spring maintain consistent force across the entire large platen — critical for even transfer adhesion on large designs. The swing-away arm allows easy garment loading and unloading.

Digital temperature and timer controls make it straightforward to dial in the precise conditions for any transfer film type.`,
      features: [
        '40×60 cm platen — covers full adult garment front in one press',
        'Digital temperature control up to 230°C',
        'Built-in countdown timer with audible alarm',
        'Heavy-duty construction for daily production use',
        'Swing-away arm for easy garment placement',
        'Even pressure distribution across the full large platen',
        'Works with all major heat transfer media',
        'Cotton, polyester, silk, and blend compatibility',
      ],
      specifications: {
        'Platen Size': '40 cm × 60 cm',
        'Temperature Range': '0–230°C',
        'Timer': 'Digital countdown 0–999 seconds',
        'Applications': 'Full-front transfers, rhinestones, foil, HTV vinyl',
        'Compatible Fabrics': 'Cotton, Polyester, Silk, Blends',
        'Power': '2,200 W',
        'Voltage': '220 V / 50 Hz',
        'Weight': 'Approx. 20 kg',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: true,
      isBestSeller: false,
      isNew: false,
      badge: 'Featured',
      warranty: '1 Year Warranty',
      tags: ['heat press', 'heat transfer', 'stoning', '40x60', 'large format', 'production', 'rhinestone'],
    },
    {
      name: 'Enel 38×38 Heat Press Machine',
      slug: 'enel-38x38-heat-press',
      brand: 'Enel',
      categoryId: catHeat.id,
      subcategory: 'Heat Press',
      price: 180000,
      images: [PH],
      shortDescription:
        'Enel 38×38 cm heat press — reliable, easy-to-use machine for HTV vinyl, transfers, and stoning applications.',
      description: `The Enel 38×38 heat press machine is a compact and dependable choice for designers, boutiques, and small-scale decoration businesses. With a 38 cm × 38 cm working area and intuitive digital controls, it handles everything from simple vinyl transfers to precision rhinestone application with consistent, repeatable results.

Enel machines have built a strong following among Nigerian fashion businesses for their combination of solid build quality and competitive pricing. The 38×38 model is especially popular with custom T-shirt businesses, school uniform decorators, and boutique fashion designers who need a reliable daily-use heat press.

Simple workflow: set temperature, set timer, press. Ready to use straight out of the box.`,
      features: [
        'Digital display for temperature and time',
        'Teflon-coated upper platen for even, non-stick heat distribution',
        'Warm-up in under 90 seconds',
        'Solid steel upper arm construction',
        'Adjustable pressure via top knob',
        'Audible timer alarm',
        'Compatible with all standard heat transfer films and HTV vinyl',
        'Compact design suited to studio or small workshop',
      ],
      specifications: {
        'Platen Size': '38 cm × 38 cm',
        'Temperature Range': '0–230°C',
        'Heating Time': 'Under 90 seconds',
        'Applications': 'HTV vinyl, heat transfers, rhinestones, sublimation',
        'Compatible Fabrics': 'Cotton, Polyester, Silk, Blends',
        'Power': '1,600 W',
        'Voltage': '220 V / 50 Hz',
        'Weight': 'Approx. 14 kg',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: false,
      warranty: '1 Year Warranty',
      tags: ['heat press', 'enel', '38x38', 'heat transfer', 'vinyl', 'sublimation'],
    },

    // ═══════════════════════════════════════════════════════════════════════
    //  PLOTTER CUTTER
    // ═══════════════════════════════════════════════════════════════════════
    {
      name: '2ft / 28-Inch Plotter Cutter',
      slug: '28-inch-plotter-cutter',
      brand: 'Two Lion',
      categoryId: catPlotter.id,
      subcategory: 'Vinyl & Pattern',
      price: 470000,
      images: [PH],
      shortDescription:
        '28-inch digital plotter cutter — millimetre-precise cutting for vinyl, HTV, and design templates connected to your computer.',
      description: `The 28-inch (2ft) plotter cutter is the essential tool for garment designers, fashion studios, and custom print businesses that need precise pattern cutting, vinyl lettering, or design template production. With a 28-inch (approximately 71 cm) cutting width, this machine handles a wide range of media from thin heat transfer vinyl to thicker pattern paper.

Connected to your computer via USB, the plotter receives digital design files and cuts them with millimetre accuracy — eliminating the time-consuming manual process of tracing and cutting patterns by hand. For businesses producing custom jerseys, branded uniforms, vinyl prints, or fashion collections, this machine pays for itself remarkably quickly.

Compatible with all major design software including CorelDRAW and Adobe Illustrator, as well as dedicated cutting applications. Includes cutting blade set, USB cable, and software.`,
      features: [
        '28-inch (71 cm) cutting width for standard vinyl and pattern rolls',
        'Millimetre-precision digital cutting via computer',
        'USB connectivity — works with CorelDRAW, Illustrator, and cutting software',
        'Cuts HTV vinyl, transfer film, pattern paper, and thin fabric',
        'Adjustable cutting force (30–500 g) and speed',
        'Contour cutting for printed designs',
        'Long-life tungsten carbide blade',
        'Blade set, USB cable, and software included',
      ],
      specifications: {
        'Cutting Width': '28 inches / 71 cm',
        'Max Media Width': '760 mm',
        'Cutting Speed': 'Up to 800 mm/s',
        'Cutting Force': '30–500 g (adjustable)',
        'Resolution': '0.025 mm',
        'Connectivity': 'USB',
        'Compatible Software': 'CorelDRAW, Illustrator, SignMaster, FlexiSign',
        'Media Types': 'Vinyl, HTV, Pattern paper, Thin fabric',
        'Voltage': '220 V / 50 Hz',
        'Weight': 'Approx. 12 kg',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: true,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['plotter', 'cutter', 'vinyl cutter', 'pattern cutting', '28 inch', 'digital', 'design'],
    },

    // ═══════════════════════════════════════════════════════════════════════
    //  MANUAL MACHINES
    // ═══════════════════════════════════════════════════════════════════════
    {
      name: 'Complete Set of Jukky Manual Sewing Machine',
      slug: 'jukky-manual-machine-complete',
      brand: 'Jukky',
      categoryId: catManual.id,
      subcategory: 'Manual',
      price: 150000,
      images: [PH],
      shortDescription:
        'Complete Jukky manual machine set — no electricity needed, ideal for home tailors, fashion students, and power-outage-proof workshops.',
      description: `The Jukky manual sewing machine complete set is everything a home tailor, fashion student, or small workshop needs to start sewing immediately — with no electricity required. Operated by hand wheel or foot treadle, the Jukky is robust, simple to maintain, and works on virtually any fabric.

Manual machines have seen a major comeback in Nigerian tailoring schools and eco-conscious workshops. They work through power outages, need no motor, and teach operators the fundamentals of stitch tension and fabric feeding better than any electric machine — making them invaluable for training. For established workshops, a manual machine is an ideal backup that never lets you down.

The complete set includes the machine head, heavy-duty stand, work table, hand wheel, foot treadle, bobbin case, needle set, machine oil, and a comprehensive accessories kit — a fully ready sewing station out of the box.`,
      features: [
        'Zero electricity required — foot treadle or hand wheel operation',
        'Works through every power outage',
        'Adjustable stitch length and thread tension',
        'Standard domestic needle and thread compatibility',
        'Durable cast-iron body — decades of service life',
        'Simple to service — any tailor can maintain it',
        'Complete set: stand, table, treadle, needles, oil, accessories',
        'Excellent training machine for fashion students',
      ],
      specifications: {
        'Operation': 'Manual — foot treadle / hand wheel',
        'Power Required': 'None',
        'Stitch Type': 'Single-needle lockstitch',
        'Stitch Length': 'Adjustable 1–5 mm',
        'Needle System': '15x1 / HAx1 (standard domestic)',
        'Set Contents': 'Machine head, stand, table, treadle, bobbin case, needles, oil, accessories',
        'Ideal For': 'Home tailoring, fashion school, power outage backup',
        'Weight': 'Approx. 18 kg with stand',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: false,
      warranty: '1 Year Warranty',
      tags: ['manual', 'treadle', 'hand sewing', 'jukky', 'no electricity', 'beginner', 'fashion school'],
    },
  ];

  // ── INSERT PRODUCTS ───────────────────────────────────────────────────────
  console.log('Inserting products...\n');
  for (const p of products) {
    const { specifications, ...rest } = p;
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: { ...rest, specifications },
    });
    console.log(`  ✅ ${p.name}`);
  }

  console.log(`\n🎉 Done! Seeded ${products.length} products across 7 categories.\n`);
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  prisma.$disconnect();
  process.exit(1);
});
