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
  'embroidery-machines':    'https://images.unsplash.com/photo-1526290766257-c015850e4629?auto=format&fit=crop&w=800&q=80',
  'steaming-pressing':      'https://images.unsplash.com/photo-1489274495757-95c7c837b101?auto=format&fit=crop&w=800&q=80',
  'display-accessories':    'https://images.unsplash.com/photo-1567631643547-67a2dd59f266?auto=format&fit=crop&w=800&q=80',
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
    catEmbroidery,
    catSteaming,
    catDisplay,
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
    prisma.category.upsert({
      where: { slug: 'embroidery-machines' },
      update: { image: CAT_IMAGES['embroidery-machines'] },
      create: {
        name: 'Embroidery Machines',
        slug: 'embroidery-machines',
        image: CAT_IMAGES['embroidery-machines'],
        description:
          'Computerized embroidery machines for adding logos, monograms, decorative designs, and custom artwork to garments, bags, and accessories.',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'steaming-pressing' },
      update: { image: CAT_IMAGES['steaming-pressing'] },
      create: {
        name: 'Steaming & Pressing',
        slug: 'steaming-pressing',
        image: CAT_IMAGES['steaming-pressing'],
        description:
          'Industrial steam irons and boiler pressing systems for professional garment finishing, seam setting, and crease-free fabric preparation.',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'display-accessories' },
      update: { image: CAT_IMAGES['display-accessories'] },
      create: {
        name: 'Display & Accessories',
        slug: 'display-accessories',
        image: CAT_IMAGES['display-accessories'],
        description:
          'Retail display mannequins and display props for showcasing garments, accessories, and jewellery in boutiques, market stalls, and exhibitions.',
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
    prisma.brand.upsert({
      where: { slug: 'janome' },
      update: {},
      create: {
        name: 'Janome',
        slug: 'janome',
        description:
          'Janome is a Japanese sewing machine manufacturer renowned for innovative computerized sewing and embroidery machines used by home sewers and design studios worldwide.',
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

    // ═══════════════════════════════════════════════════════════════════════
    //  INDUSTRIAL STRAIGHT — NEW ADDITIONS
    // ═══════════════════════════════════════════════════════════════════════
    {
      name: 'Emel M2 Direct Drive Industrial Straight Sewing Machine',
      slug: 'emel-m2-direct-drive',
      brand: 'Emel',
      categoryId: catStraight.id,
      subcategory: 'Direct Drive',
      price: 430000,
      images: [PH],
      shortDescription:
        'High-speed direct drive lockstitch machine with inbuilt servo motor for smooth, efficient garment production.',
      description: `The Emel M2 is an advanced single-needle industrial straight sewing machine featuring an inbuilt servo motor that eliminates the traditional belt-and-clutch system. Designed for Nigerian tailoring shops and garment factories, it delivers general lockstitch sewing on a wide range of materials including chiffon, wool, cotton, lycra, silk, and leather.

The direct drive system offers up to 75% energy savings compared to a standard clutch motor, significantly reduced noise, and minimal vibration for precision stitching. Its auto lubrication system and auto needle positioning mean less downtime and consistent stitch quality across long production runs.

The machine ships as a complete unit with head, accessories, table, and stand — ready for immediate use.`,
      features: [
        'Maximum speed: 5,500 stitches per minute',
        'Max stitch length: 5mm',
        'Needle size: DB #14, #16, #18',
        'Inbuilt servo motor — up to 75% energy saving over clutch motors',
        'Auto needle positioning (up/down) and auto lubrication system',
        'Built-in LED lamp for illumination',
        'Digital speed regulation panel',
        'Sews light, medium, and heavy fabrics including leather',
      ],
      specifications: {
        'Stitch Type': 'Single-needle lockstitch',
        'Max Speed': '5,500 stitches per minute',
        'Max Stitch Length': '5mm',
        'Needle System': 'DB #14, #16, #18',
        'Motor': 'Inbuilt servo (direct drive)',
        'Voltage': '220V / 50Hz',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['emel', 'direct drive', 'lockstitch', 'industrial', 'straight stitch', 'm2'],
    },

    {
      name: 'Emel EM81 Direct Drive Industrial Straight Sewing Machine',
      slug: 'emel-em81-direct-drive',
      brand: 'Emel',
      categoryId: catStraight.id,
      subcategory: 'Direct Drive',
      price: 430000,
      images: [PH],
      shortDescription:
        'Feature-rich direct drive lockstitch machine with automatic thread cutter and digital control panel.',
      description: `The Emel EM81 builds on the M2 platform with the addition of an automatic thread trimmer, making it one of the most capable machines in Emel's industrial range. It uses an inbuilt servo motor for quiet, energy-efficient operation and comes with a digital panel integrated into the machine head for easy speed regulation.

The EM81 handles all fabric weights from delicate chiffon to heavy canvas and leather, producing neat lockstitch seams on every pass. Its auto lubrication system keeps the machine running reliably with minimal maintenance. Sold as a complete unit with machine head, accessories, table, and stand.`,
      features: [
        'Maximum speed: 5,500 stitches per minute',
        'Max stitch length: 5mm',
        'Needle size: DB #14, #16, #18',
        'Machine weight: 32kg head / 38.7kg with stand',
        'Automatic thread trimmer for clean seam finishing',
        'Auto needle positioning and auto lubrication',
        'Built-in LED lamp for visibility',
        'Energy-saving inbuilt servo motor with digital speed regulation',
      ],
      specifications: {
        'Stitch Type': 'Single-needle lockstitch',
        'Max Speed': '5,500 stitches per minute',
        'Max Stitch Length': '5mm',
        'Needle System': 'DB #14, #16, #18',
        'Dimensions': '64.5cm x 24.8cm x 55.0cm',
        'Weight (head)': '32kg',
        'Weight (with stand)': '38.7kg',
        'Motor': 'Inbuilt servo (direct drive)',
        'Voltage': '220V / 50Hz',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['emel', 'em81', 'direct drive', 'lockstitch', 'auto thread cutter', 'industrial'],
    },

    {
      name: 'Two Lion 9900 Direct Drive Industrial Straight Sewing Machine',
      slug: 'two-lion-9900-direct-drive',
      brand: 'Two Lion',
      categoryId: catStraight.id,
      subcategory: 'Direct Drive',
      price: 380000,
      images: [PH],
      shortDescription:
        'ISO 9002-certified Two Lion direct drive lockstitch machine built for high-throughput garment production.',
      description: `The Two Lion TL-9900D is a single-needle direct drive industrial lockstitch machine designed to deliver reliable, high-volume performance in garment factories and tailoring shops. Powered by a 550W energy-saving servo motor, it eliminates belt and clutch maintenance while reducing noise and vibration on the production floor.

The machine features automatic needle positioning, an auto lubrication system, and a pilot LED lamp for clear visibility during sewing. It sews all fabric types from lightweight chiffon to heavy denim and is manufactured to ISO 9002 quality standards. Supplied as a complete unit with machine head, accessories, table, and stand.`,
      features: [
        'Maximum speed: 5,500 stitches per minute',
        'Max stitch length: 5mm',
        'Needle size: DB #14, #16, #18',
        '550W energy-saving servo motor — no belt or clutch',
        'Auto needle positioning and auto lubrication system',
        'ISO 9002 certified manufacturing',
        'Built-in LED pilot lamp',
        'Adjustable speed control panel',
      ],
      specifications: {
        'Stitch Type': 'Single-needle lockstitch',
        'Max Speed': '5,500 stitches per minute',
        'Max Stitch Length': '5mm',
        'Needle System': 'DB #14, #16, #18',
        'Motor': '550W servo (direct drive)',
        'Certification': 'ISO 9002',
        'Voltage': '220V / 50Hz',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['two lion', '9900', 'direct drive', 'lockstitch', 'iso 9002', 'industrial', 'straight stitch'],
    },

    {
      name: 'Juki DDL-9000C Heavy Duty Direct Drive Industrial Sewing Machine',
      slug: 'juki-ddl-9000c-heavy-duty',
      brand: 'Juki',
      categoryId: catStraight.id,
      subcategory: 'Direct Drive',
      price: 700000,
      images: [PH],
      shortDescription:
        'Juki\'s flagship digital direct drive lockstitch system with fully digitalized adjustments and a 4.3-inch touchscreen.',
      description: `The Juki DDL-9000C Series represents the pinnacle of industrial single-needle lockstitch technology, combining a compact 400W AC servo motor with Juki's proprietary digital sewing system. All machine settings — stitch length, presser foot pressure, feed type, and needle positioning — are fully digitalized and can be saved in up to 99 sewing patterns for instant recall.

Its world-first vertically-driven digital feed mechanism lets operators choose between Standard, Front Up, Rear Up, and Box Feed modes from a 4.3-inch smartphone-style touchscreen, eliminating hand-tool adjustments entirely. The double-edge rotary thread trimmer leaves only 3mm of thread tail, drastically reducing trimming time in production.

Built for serious garment factories that demand repeatability, quality, and speed on medium to heavy fabrics — this is the machine professional workshops upgrade to.`,
      features: [
        'Maximum speed: 5,000 stitches per minute',
        'Max stitch length: 5mm',
        'Compact 400W AC direct-drive servo motor',
        '4.3-inch touchscreen — stores up to 99 sewing patterns',
        'World-first vertically-driven digital feed (4 selectable feed modes)',
        'Automatic thread trimmer leaving only 3mm thread tail',
        'Digital presser foot pressure control with auto multi-layer detection',
        'Presser foot lift: 5.5mm by hand, 15mm by knee',
      ],
      specifications: {
        'Stitch Type': 'Single-needle lockstitch',
        'Max Speed': '5,000 stitches per minute',
        'Max Stitch Length': '5mm',
        'Motor': '400W AC servo (direct drive)',
        'Control Panel': '4.3-inch touchscreen',
        'Pattern Memory': '99 sewing patterns',
        'Thread Tail': '3mm after trimming',
        'Presser Foot Lift': '5.5mm (manual) / 15mm (knee)',
        'Voltage': '220V / 50Hz',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: true,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['juki', 'ddl-9000c', 'direct drive', 'digital', 'lockstitch', 'touchscreen', 'premium', 'industrial'],
    },

    {
      name: 'Brother Industrial Sewing Machine (UK Used, New Stand & Table)',
      slug: 'brother-industrial-uk-used-new',
      brand: 'Brother',
      categoryId: catStraight.id,
      subcategory: 'UK Used',
      price: 290000,
      images: [PH],
      shortDescription:
        'Pre-owned UK-grade Brother direct drive industrial lockstitch machine, supplied with a brand new stand and table.',
      description: `This listing offers a UK-used Brother single-needle industrial straight stitch sewing machine in excellent working condition, paired with a brand new metal stand and table for immediate production use.

Brother industrial machines are well-regarded for their precision AC servo drive systems, sealed oil tanks that prevent fabric staining, and automatic thread trimmers that consistently leave short, clean thread tails. The machine handles a broad range of fabrics — from light shirting to medium denim — and is well-suited for garment factories, fashion designers, and tailoring studios.

UK-used machines from Brother are maintained to high European servicing standards before resale, making them an excellent value option for shops that want professional-grade performance without the full cost of a new machine.`,
      features: [
        'Single-needle direct drive lockstitch (AC servo motor)',
        'Automatic thread trimmer for clean, short thread tails',
        'Sealed oil tank — prevents oil leakage and fabric staining',
        'Electric presser foot lifter for smooth operation',
        'LED work light illuminates the sewing area',
        'UK-serviced in excellent working condition',
        'Brand new metal stand and table included',
      ],
      specifications: {
        'Stitch Type': 'Single-needle lockstitch',
        'Motor': 'AC servo (direct drive)',
        'Condition': 'UK Used — excellent',
        'Stand & Table': 'Brand new (included)',
        'Thread Trimmer': 'Automatic',
        'Oil System': 'Sealed (no stain risk)',
        'Voltage': '220V / 50Hz',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: true,
      isNew: false,
      badge: 'Best Seller',
      warranty: '6 Months Warranty',
      tags: ['brother', 'uk used', 'direct drive', 'lockstitch', 'industrial', 'new stand', 'value'],
    },

    // ═══════════════════════════════════════════════════════════════════════
    //  INDUSTRIAL OVERLOCKING — NEW ADDITIONS
    // ═══════════════════════════════════════════════════════════════════════
    {
      name: 'Two Lion 747 Four Thread Industrial Overlock Machine',
      slug: 'two-lion-747-four-thread-overlock',
      brand: 'Two Lion',
      categoryId: catOverlock.id,
      subcategory: '4-Thread',
      price: 440000,
      images: [PH],
      shortDescription:
        'Heavy-duty 4-thread industrial overlock machine for high-speed seaming, hemming, and edge finishing on stretch and woven fabrics.',
      description: `The Two Lion TL-747 is a four-thread industrial overlock machine — known in Nigeria as a weaving machine — that uses two needles and two loopers to form a strong, stretchy, and professionally finished seam in a single pass.

Running at up to 5,000 RPM via a built-in direct drive servo motor, it is ideal for garment factories and knitting mills producing underwear, T-shirts, polo shirts, sportswear, and jersey fabrics. The servo motor delivers approximately 30% greater production efficiency and significant energy savings compared to traditional clutch-motor overlocks.

Its design allows simultaneous trimming, overcasting, and seaming — making it indispensable for professional garment finishing in Nigerian fashion production.`,
      features: [
        '4-thread system: 2 needles + 2 loopers for secure, stretchy seams',
        'Maximum speed: ~5,000 RPM (direct drive servo motor)',
        'Servo motor — ~30% efficiency gain vs clutch motor',
        'Simultaneous trimming, overcasting, and seaming in one pass',
        'Suitable for thin to medium-weight fabrics: jersey, knit, woven',
        'Ideal for underwear, polo shirts, sportswear, and T-shirt production',
        'Complete unit with head, accessories, table, and stand',
      ],
      specifications: {
        'Thread Count': '4 threads (2 needles + 2 loopers)',
        'Max Speed': '~5,000 RPM',
        'Motor': 'Direct drive servo',
        'Fabric Range': 'Light to medium-weight woven and knit',
        'Voltage': '220V / 50Hz',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['two lion', '747', '4-thread', 'overlock', 'weaving machine', 'serger', 'industrial', 'direct drive'],
    },

    // ═══════════════════════════════════════════════════════════════════════
    //  EMBROIDERY MACHINES
    // ═══════════════════════════════════════════════════════════════════════
    {
      name: 'Janome Memory Craft 550E Embroidery Machine',
      slug: 'janome-mc550e-embroidery',
      brand: 'Janome',
      categoryId: catEmbroidery.id,
      subcategory: 'Stand-Alone',
      price: 3300000,
      images: [PH],
      shortDescription:
        'Janome\'s largest stand-alone embroidery machine with a 7.9" × 14.2" field, 180 built-in designs, and full-colour touchscreen editing.',
      description: `The Janome Memory Craft 550E (MC550E) is a dedicated computerized embroidery machine designed for home-based embroiderers and small studios who need a large embroidery field without moving to industrial multi-head equipment.

With the RE36b magnetic clip hoop, it achieves Janome's widest embroidery area of 7.9" × 14.2", capable of handling designs up to 200,000 stitches. The full-colour LCD touchscreen allows on-screen editing including rotation, scaling, flipping, arc placement, combining, and grouping — with no computer required for USB design loading.

It includes 180 built-in designs, 6 embroidery fonts, and four hoops. The 550E supports .JEF, .JEF+, and .JPX embroidery formats and runs on dual voltage (80–240V), making it suitable for Nigerian power supplies with an appropriate stabilizer.`,
      features: [
        'Embroidery area: 7.9" × 14.2" (Janome\'s largest stand-alone field)',
        'Maximum embroidery speed: 860 stitches per minute',
        '180 built-in designs + 6 fonts; supports up to 200,000-stitch designs',
        'Full-colour LCD touchscreen with on-screen editing (rotate, scale, flip, arc, combine)',
        'USB port for design import; supports .JEF, .JEF+, .JPX formats',
        '4 included hoops: RE36b, SQ20b, RE20b, SQ14b',
        'Automatic needle threader and top-loading drop-in bobbin',
        'Dual voltage 80–240V; machine weight: 5.2 kg',
      ],
      specifications: {
        'Embroidery Area': '7.9" × 14.2"',
        'Max Speed': '860 stitches per minute',
        'Built-in Designs': '180 designs + 6 fonts',
        'Max Design Size': '200,000 stitches',
        'File Formats': '.JEF, .JEF+, .JPX',
        'Connectivity': 'USB',
        'Voltage': '80–240V (dual voltage)',
        'Weight': '5.2 kg',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: true,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['janome', '550e', 'mc550e', 'embroidery', 'computerized', 'touchscreen', 'usb', 'design studio'],
    },

    {
      name: 'Computer Embroidery Machine (Single Head Industrial)',
      slug: 'computer-embroidery-machine-single-head',
      brand: 'Generic',
      categoryId: catEmbroidery.id,
      subcategory: 'Industrial',
      price: 450000,
      images: [PH],
      shortDescription:
        'Single-head computerized industrial embroidery machine for commercial logo, monogram, and design embroidery on garments and accessories.',
      description: `This single-head multi-needle computerized embroidery machine is purpose-built for small embroidery businesses, fashion studios, and garment decorators who need commercial-grade output without the footprint of a multi-head machine.

With 12 needles supporting automatic color changes and a large embroidery field, it handles flat garments, caps, bags, and shoes. A 10-inch LCD touchscreen provides access to onboard design memory, USB import, and speed control. At up to 1,500 stitches per minute, it is significantly faster than domestic embroidery machines and can sustain production runs without overheating.`,
      features: [
        '12 needles with automatic color change and thread trimming',
        'Maximum speed: up to 1,500 stitches per minute',
        'Large embroidery field: up to 500mm × 1,200mm',
        '10-inch LCD touchscreen control panel',
        'USB connectivity; compatible with DST and FDR design formats',
        'Large onboard memory: up to 20 million stitches / 200+ designs',
        'Suitable for flat garments, T-shirts, caps, bags, and shoes',
      ],
      specifications: {
        'Needles': '12 (automatic color change)',
        'Max Speed': '1,500 stitches per minute',
        'Embroidery Field': 'Up to 500mm × 1,200mm',
        'Control Panel': '10-inch LCD touchscreen',
        'File Formats': 'DST, FDR',
        'Memory': '20 million stitches / 200+ designs',
        'Voltage': '220V / 50Hz',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['embroidery machine', 'computer embroidery', 'single head', 'industrial', 'commercial', 'logo embroidery'],
    },

    {
      name: 'ES6 Embroidery Machine',
      slug: 'es6-embroidery-machine',
      brand: 'ES6',
      categoryId: catEmbroidery.id,
      subcategory: 'Multi-Function',
      price: 1750000,
      images: [PH],
      shortDescription:
        'Multi-function computerized embroidery machine with 312 built-in designs and a 7-inch colour touchscreen for design studios.',
      description: `The ES6 is a popular computerized multi-function embroidery machine widely used in Nigerian fashion studios and design offices for creating embroidered patches, monograms, fabric decorations, and garment embellishments.

Its 7-inch colour LCD touchscreen provides an intuitive interface supporting 11 languages, and the machine ships with 312 built-in embroidery designs plus letters, figures, and border patterns. Pattern storage supports up to 30 million stitches and custom designs can be loaded from USB in DST and DSB formats.

Automatic thread trimming and automatic bobbin winding reduce operator fatigue during extended embroidery sessions. At 14.5 kg and 220V operation, it is compact enough for a design studio desk.`,
      features: [
        'Maximum embroidery speed: 860 RPM',
        'Embroidery area (max): 200mm × 280mm',
        '312 built-in embroidery designs; built-in letters, figures, and borders',
        '7-inch colour LCD touchscreen; supports 11 languages',
        'USB compatible (DST, DSB formats); stores up to 30 million stitches',
        'Automatic thread trimming and automatic bobbin winding',
        'Break-thread detection for unattended operation',
      ],
      specifications: {
        'Max Speed': '860 RPM',
        'Max Embroidery Area': '200mm × 280mm',
        'Built-in Designs': '312 designs + letters + borders',
        'Control Panel': '7-inch colour LCD',
        'Languages': '11 supported',
        'File Formats': 'DST, DSB',
        'Memory': '30 million stitches',
        'Power': '45W at 220V / 50Hz',
        'Weight': '14.5 kg',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['es6', 'embroidery machine', 'computer embroidery', 'design studio', 'multi-function', 'touchscreen'],
    },

    // ═══════════════════════════════════════════════════════════════════════
    //  TAPPING & HEMMING — NEW ADDITIONS
    // ═══════════════════════════════════════════════════════════════════════
    {
      name: 'Semi-Automatic Eyelet Machine',
      slug: 'semi-automatic-eyelet-machine',
      brand: 'Generic',
      categoryId: catTapping.id,
      subcategory: 'Eyelet',
      price: 250000,
      images: [PH],
      shortDescription:
        'Industrial semi-automatic machine for punching and setting metal eyelets on garments, bags, belts, and canvas.',
      description: `The semi-automatic eyelet machine is a specialized garment manufacturing tool that punches clean holes and presses metal eyelets tightly onto fabric, leather, vinyl, canvas, and other materials in a single operation.

It bridges the gap between slow hand-press methods and fully automatic production-line machines, making it ideal for medium-scale garment operations in Nigeria. The auto-feed eyelet raceway reduces operator effort — only the washer placement remains manual — enabling consistent eyelet setting at rates of up to 1,800 eyelets per hour.

Common applications include hoodies, corsets, sportswear waistbands, belts, shoes, and decorative garment embellishments. Eyelet size can be customized via interchangeable dies.`,
      features: [
        'Output capacity: up to 1,800 eyelets per hour',
        'Semi-automatic eyelet feeding via raceway; manual washer placement',
        'Compatible materials: fabric, leather, vinyl, canvas, plastic',
        'Interchangeable dies for customizable eyelet sizes',
        'Adjustable punching force and throat depth',
        'Single-operator use; can integrate into production lines',
        'Suitable for garments, bags, belts, shoes, and canvas goods',
      ],
      specifications: {
        'Output Capacity': 'Up to 1,800 eyelets per hour',
        'Feeding System': 'Semi-automatic raceway',
        'Compatible Materials': 'Fabric, leather, vinyl, canvas, plastic',
        'Die System': 'Interchangeable (customizable eyelet sizes)',
        'Voltage': '220V / 50Hz',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['eyelet machine', 'grommet machine', 'garment accessories', 'industrial equipment', 'semi-automatic'],
    },

    // ═══════════════════════════════════════════════════════════════════════
    //  STEAMING & PRESSING
    // ═══════════════════════════════════════════════════════════════════════
    {
      name: 'Juki Boiler Industrial Steaming Iron',
      slug: 'juki-boiler-industrial-steam-iron',
      brand: 'Juki',
      categoryId: catSteaming.id,
      subcategory: 'Boiler System',
      price: 0,
      images: [PH],
      shortDescription:
        'Professional boiler-fed steam iron system from Juki delivering high-pressure, continuous steam for garment finishing.',
      description: `The Juki (Jeux Sakura) boiler industrial steam iron is a professional-grade steam generator system designed for tailoring shops, garment factories, and dry-cleaning operations.

The stainless steel boiler holds 2.2 litres of water and generates steam at 2.5 bar pressure — up to 10 times faster and more efficient than a conventional household iron. The separate boiler delivers a continuous, consistent steam supply to the lightweight 1.5 kg iron head, allowing the operator to press garments for extended periods without pausing to reheat.

It is ideal for setting seams, shaping collars, and achieving a crisp professional finish on a wide range of fabrics including wool, cotton, silk, and synthetics.`,
      features: [
        'Iron head power: 850W; Boiler power: 850W',
        'Stainless steel boiler capacity: 2.2 litres',
        'Steam pressure: 2.5 bar',
        'Iron head weight: 1.5 kg; Total system weight: 14.5 kg',
        'Up to 10× faster steaming than conventional household irons',
        'Continuous steam supply for uninterrupted professional pressing',
        'Suitable for wool, cotton, silk, and synthetic fabrics',
      ],
      specifications: {
        'Iron Power': '850W',
        'Boiler Power': '850W',
        'Boiler Capacity': '2.2 litres (stainless steel)',
        'Steam Pressure': '2.5 bar',
        'Iron Head Weight': '1.5 kg',
        'Total System Weight': '14.5 kg',
        'Voltage': '220–240V',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['juki', 'boiler iron', 'steam iron', 'industrial pressing', 'garment finishing', 'sakura'],
    },

    {
      name: 'Industrial Steaming Iron',
      slug: 'industrial-steaming-iron',
      brand: 'Generic',
      categoryId: catSteaming.id,
      subcategory: 'Steam Iron',
      price: 70000,
      images: [PH],
      shortDescription:
        'Heavy-duty gravity-feed steam iron for high-volume garment pressing and finishing in tailoring shops.',
      description: `The industrial steaming iron is a workhorse pressing tool used in Nigerian tailoring shops, garment factories, and laundry services to achieve a professional finish on sewn garments.

Unlike domestic irons, industrial models feature larger soleplates for even heat distribution, a gravity-feed water tank for a constant steam supply, and robust construction rated for all-day use. They are essential for setting seams, eliminating wrinkles, shaping garment panels, and pressing collars and cuffs during and after garment construction.

Models operate at 1,500–2,000W with adjustable steam settings for different fabric types including cotton, polyester, wool, and silk.`,
      features: [
        'Power: 1,500–2,000W for fast heat recovery',
        'Large soleplate for even heat distribution',
        'Gravity-feed or separate tank for continuous steam supply',
        'Steam pressure: 2–4 bar (model dependent)',
        'Adjustable temperature and steam settings for all fabric types',
        'Heavy-duty construction rated for full-day production use',
        'Suitable for cotton, wool, polyester, silk, and synthetic blends',
      ],
      specifications: {
        'Power': '1,500–2,000W',
        'Steam Pressure': '2–4 bar',
        'Water Supply': 'Gravity-feed tank',
        'Fabric Compatibility': 'Cotton, wool, polyester, silk, synthetics',
        'Voltage': '220V / 50Hz',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '6 Months Warranty',
      tags: ['steam iron', 'industrial iron', 'garment finishing', 'pressing', 'tailoring equipment'],
    },

    // ═══════════════════════════════════════════════════════════════════════
    //  DISPLAY & ACCESSORIES
    // ═══════════════════════════════════════════════════════════════════════
    {
      name: 'Wooden Hand Male Mannequin',
      slug: 'wooden-hand-male-mannequin',
      brand: 'Generic',
      categoryId: catDisplay.id,
      subcategory: 'Hand Display',
      price: 220000,
      images: [PH],
      shortDescription:
        'Articulated solid wood male hand display for showcasing gloves, watches, rings, and jewellery in retail windows and boutiques.',
      description: `This wooden hand male mannequin is a precision-crafted display prop made from solid hardwood, designed to present men's gloves, watches, bracelets, rings, and fashion accessories in retail stores, market stalls, and photography shoots.

Every finger joint and the wrist are secured to allow smooth, flexible positioning that holds its pose firmly under display conditions. The natural wood finish gives it a warm, premium aesthetic that complements both traditional and contemporary retail settings.

Approximate height is 34–37cm, making it compact enough for countertop display while providing a realistic, lifelike hand form.`,
      features: [
        'Material: solid hardwood with natural finish',
        'Fully articulated finger joints and wrist — holds any pose',
        'Approximate height: 34–37cm; compact countertop footprint',
        'Suitable for: gloves, rings, bracelets, watches, cufflinks',
        'Stable weighted base for freestanding display',
        'Ideal for retail display, window dressing, and product photography',
      ],
      specifications: {
        'Material': 'Solid hardwood (natural finish)',
        'Height': '34–37cm (approx.)',
        'Joint Type': 'Fully articulated fingers and wrist',
        'Use Cases': 'Gloves, jewellery, watches, cufflinks',
        'Display Type': 'Countertop / freestanding',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: null,
      tags: ['mannequin', 'hand mannequin', 'wooden hand', 'display prop', 'jewellery display', 'retail display'],
    },

    {
      name: 'Male Mannequin',
      slug: 'male-mannequin-full-body',
      brand: 'Generic',
      categoryId: catDisplay.id,
      subcategory: 'Full Body',
      price: 0,
      images: [PH],
      shortDescription:
        'Full-body male display mannequin for showcasing menswear in retail clothing stores, boutiques, and fashion exhibitions.',
      description: `This full-body male mannequin is manufactured from lightweight, durable fiberglass or high-quality polypropylene and is designed to present menswear — shirts, trousers, suits, sportswear, and accessories — in a lifelike, visually compelling way.

The anatomically proportioned form reflects natural male muscle contours and shoulder width to show how garments will actually fit and drape on the body. Detachable arms, hands, and torso sections make dressing and undressing quick and effortless, while the 360° rotating head allows varied display angles.

A weighted metal base stand provides stability on any retail floor surface.`,
      features: [
        'Full-body height: approximately 185cm (6\'1")',
        'Typical measurements: 36.5" chest / 29.5" waist / 38.5" hip',
        'Material: lightweight fiberglass or high-density polypropylene',
        'Detachable arms, hands, torso, and legs for easy dressing',
        '360° rotating head for varied display angles',
        'Weighted metal base stand included for stability',
        'Available in white, black, and skin-tone finishes',
      ],
      specifications: {
        'Height': 'Approx. 185cm',
        'Chest / Waist / Hip': '36.5" / 29.5" / 38.5"',
        'Material': 'Fiberglass or high-density polypropylene',
        'Parts': 'Detachable arms, hands, torso, legs',
        'Base': 'Weighted metal stand (included)',
        'Finishes': 'White, black, skin-tone',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: null,
      tags: ['mannequin', 'male mannequin', 'full body', 'retail display', 'visual merchandising', 'menswear'],
    },

    {
      name: 'Female Mannequin',
      slug: 'female-mannequin-full-body',
      brand: 'Generic',
      categoryId: catDisplay.id,
      subcategory: 'Full Body',
      price: 0,
      images: [PH],
      shortDescription:
        'Full-body female display mannequin for showcasing womenswear, dresses, and fashion accessories in retail stores and boutiques.',
      description: `This full-body female mannequin is crafted from durable fiberglass or polypropylene and is used by fashion retailers, boutiques, and market vendors in Nigeria to display dresses, skirts, blouses, traditional attire, and accessories in a realistic, appealing manner.

Its standard sizing — typically 38" chest, 30" waist, and 34" hip — reflects common Nigerian womenswear ready-to-wear proportions. The detachable waist, arms, and legs make garment changes fast during visual merchandising updates.

A sturdy tempered glass or metal base provides stable freestanding display in-store or in window arrangements.`,
      features: [
        'Full-body height: approximately 170–175cm',
        'Typical measurements: 38" chest / 30" waist / 34" hip',
        'Material: lightweight fiberglass or high-density polypropylene',
        'Detachable waist, arms, and legs for easy dressing',
        '360° rotating head; adjustable arm positions',
        'Stable metal or tempered glass base stand included',
        'Available in matte white, gloss white, black, and skin-tone finishes',
      ],
      specifications: {
        'Height': 'Approx. 170–175cm',
        'Chest / Waist / Hip': '38" / 30" / 34"',
        'Material': 'Fiberglass or high-density polypropylene',
        'Parts': 'Detachable waist, arms, legs',
        'Base': 'Metal or tempered glass stand (included)',
        'Finishes': 'Matte white, gloss white, black, skin-tone',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: null,
      tags: ['mannequin', 'female mannequin', 'full body', 'retail display', 'visual merchandising', 'womenswear'],
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

  console.log(`\n🎉 Done! Seeded ${products.length} products across 10 categories.\n`);

  // ── BLOG POSTS ────────────────────────────────────────────────────────────
  console.log('Seeding blog posts...\n');

  const blogPosts = [
    {
      title: 'How to Choose the Right Industrial Sewing Machine for Your Business',
      slug: 'how-to-choose-industrial-sewing-machine',
      excerpt: 'With dozens of industrial sewing machines on the market, choosing the right one for your tailoring or garment business can be overwhelming. Here\'s a practical guide to help you decide.',
      content: `Starting or scaling a tailoring business in Nigeria comes with one critical decision: which sewing machine should you invest in? The wrong choice can slow down your production, increase maintenance costs, and frustrate your workers. The right machine, however, becomes the backbone of your operation for years to come.

## Understand Your Stitch Type First

The most fundamental question is: what type of stitching do you primarily need?

**Straight/Lockstitch machines** (like the Juki DDL-8700 or Two Lion 8700) are the workhorses of every tailoring shop. They produce the standard single-needle straight stitch used for seaming shirts, trousers, and most garments. If you only buy one machine, make it a straight stitch industrial machine.

**Overlocking machines** are essential once you move beyond basic tailoring. They trim the fabric edge and encase it with thread simultaneously, preventing fraying and giving your garments that professional finish. A good 4-thread overlocker like the Jukae 747 is indispensable for production work.

## Consider Your Volume

Single operators working on bespoke tailoring can get by with a standard clutch motor machine. However, if you're running a production line or doing bulk orders, invest in a **direct drive machine**. Direct drive motors are quieter, more energy-efficient, and allow for precise speed control — which significantly reduces errors and fatigue.

## New vs UK-Used Machines

UK-used machines are a popular option for startups in Nigeria. A properly serviced UK-used Brother or Juki can offer excellent value — these machines were often used in European factories under strict maintenance schedules. The key is buying from a reputable dealer who can verify the machine's history and offer a warranty.

New machines offer peace of mind with manufacturer warranties and consistent performance from day one. For a growing business, the investment in a new machine often pays off in reduced downtime.

## Think About After-Sales Support

A machine is only as good as the support behind it. Before buying, ask your dealer:
- Do you stock spare parts for this model?
- Can you service the machine if it breaks down?
- What is the warranty period?

At Olmach Nig Ltd, we stock spare parts and offer servicing for every machine we sell. Our team on Lagos Island is always available for technical support.

## Quick Selection Guide

| Use Case | Recommended Machine |
|----------|-------------------|
| Small tailoring shop | Two Lion 8700 Straight |
| Production line | Juki DDL-8700 Direct Drive |
| Edge finishing | Jukae 4-Thread Overlocker |
| Home/starter | Jukky Manual Machine |
| Full workshop setup | Straight + Overlocker combo |

The best machine is the one that matches your current workload while leaving room to grow. Start with the fundamentals — a quality straight stitch machine and an overlocker — and build from there.`,
      image: 'https://images.unsplash.com/photo-1630930678172-63343537a00a?auto=format&fit=crop&w=1200&q=80',
      category: 'Buying Guide',
      author: 'Olmach Team',
      published: true,
      tags: ['buying guide', 'industrial machines', 'tailoring business'],
    },
    {
      title: 'Overlocking vs Straight Stitch: When to Use Each Machine',
      slug: 'overlocking-vs-straight-stitch',
      excerpt: 'Many tailors confuse when to use an overlocker versus a straight stitch machine. Understanding the difference can dramatically improve the quality and durability of your garments.',
      content: `One of the most common questions we get from new tailors and garment makers is: "Do I really need an overlocker if I already have a straight stitch machine?" The short answer is yes — and here's why.

## What Each Machine Does

**The Straight Stitch Machine** (lockstitch) forms a seam by interlocking an upper thread with a bobbin thread underneath the fabric. It creates strong, durable seams and is used for:
- Joining two pieces of fabric together
- Topstitching and visible stitch lines
- Hemming with a turned-up edge
- Virtually all construction seams in a garment

**The Overlocker** (serger) works completely differently. It uses 3–5 threads simultaneously to trim the raw edge of the fabric and wrap threads around that edge in one motion. It is used for:
- Finishing raw fabric edges to prevent fraying
- Seaming stretch fabrics (jersey, knit, lycra)
- Creating clean inside seams on ready-to-wear garments
- French seam alternatives in production settings

## The Key Rule

Think of it this way: the **straight stitch builds the garment**, the **overlocker finishes it**.

When you sew a shirt, you use a straight stitch machine to join the front and back panels, attach sleeves, and sew the collar. After each seam, you ideally run it through the overlocker to neaten the raw edges so they don't unravel in the wash.

## Can You Use Only an Overlocker?

On stretch fabrics like sportswear or underwear, yes — an overlocker seam alone is often enough because it's both strong and flexible. But for woven fabrics (cotton, linen, ankara, etc.), you need the straight stitch machine for structural seams.

## Which to Buy First?

Buy the **straight stitch machine first**. You can temporarily finish edges by pinking with scissors or folding them under. Once your business grows, add an overlocker — and you'll wonder how you managed without it.

## Thread Counts Matter

- **3-thread overlocker**: Lighter fabrics, edge finishing only
- **4-thread overlocker**: The standard. Handles both seaming and finishing. The Jukae 747 is our most popular model.
- **5-thread overlocker**: Heavy-duty production work, adds a safety stitch

For most Nigerian tailoring shops, a 4-thread industrial overlocker covers everything you need.`,
      image: 'https://images.unsplash.com/photo-1642693252490-ace96a2681ee?auto=format&fit=crop&w=1200&q=80',
      category: 'Tips & Tricks',
      author: 'Olmach Team',
      published: true,
      tags: ['overlocking', 'straight stitch', 'machine types', 'tips'],
    },
    {
      title: 'Complete Guide to Sewing Machine Maintenance',
      slug: 'sewing-machine-maintenance-guide',
      excerpt: 'Regular maintenance is the difference between a machine that lasts 20 years and one that breaks down after 2. Follow these steps to keep your industrial sewing machine running at peak performance.',
      content: `An industrial sewing machine is a significant investment. Whether you paid ₦150,000 or ₦450,000 for your machine, proper maintenance ensures you get maximum value from that investment. Neglect it, and you'll be spending money on repairs — or worse, replacement — far sooner than necessary.

## Daily Maintenance (5 Minutes)

**1. Clean lint and thread debris**
After every day of use, remove the needle plate and bobbin case. Use a small brush to sweep out lint, loose threads, and fabric dust from the hook area. This is the single most important maintenance task. Lint buildup causes skipped stitches, thread breakage, and eventually damages the hook mechanism.

**2. Check the needle**
A bent or blunt needle is responsible for at least 50% of sewing problems. If you notice skipped stitches, puckering, or the needle hitting the throat plate, change the needle. Needles are cheap — machine repairs are not.

**3. Re-oil the machine**
Industrial sewing machines require oiling at specific points. Apply 1–2 drops of sewing machine oil (not cooking oil, not WD-40) to:
- The hook race
- All moving metal-on-metal contact points
- The needle bar

Wipe away excess oil before sewing on fabric — excess oil can stain your work.

## Weekly Maintenance

**1. Deep clean the bobbin area**
Remove the bobbin case and clean the tension spring. Lint under the tension spring is a major cause of inconsistent lower thread tension.

**2. Check belt tension**
If your machine uses a V-belt to connect the motor, check that it's properly tensioned. A loose belt causes the machine to run sluggishly and unevenly.

**3. Inspect thread paths**
Run your finger along the entire thread path from spool to needle. Check all thread guides, tension discs, and the take-up lever for rough spots or burrs that could cause thread breakage.

## Monthly Maintenance

**1. Lubricate all oiling points thoroughly**
Refer to your machine's manual for the complete list of oiling points. Most industrial machines have between 8 and 15 designated oil points.

**2. Check the motor brushes** (on clutch motor machines)
Carbon brushes wear down over time. If your machine is slower than usual or sparking, the brushes may need replacement.

**3. Test stitch quality on scrap fabric**
Before doing a full month's maintenance check, sew on scrap fabric and note any inconsistencies in stitch length, tension, or noise that might indicate a developing problem.

## Signs Your Machine Needs Professional Servicing

- Unusual grinding or knocking noises
- Consistent thread breakage despite proper threading
- Skipped stitches that don't improve with needle change
- Machine running hot to the touch
- Inconsistent stitch tension that doesn't respond to adjustment

Bring your machine to us at Olmach Nig Ltd on Lagos Island. Our technicians service all brands and models, and we carry most common spare parts in stock.

## The Golden Rule

**Oil little and often.** A few drops daily is better than a thorough oiling once a month. Sewing machine oil is inexpensive. Machine downtime is not.`,
      image: 'https://images.unsplash.com/photo-1618587194716-40490bdba417?auto=format&fit=crop&w=1200&q=80',
      category: 'Maintenance',
      author: 'Olmach Team',
      published: true,
      tags: ['maintenance', 'tips', 'care guide', 'industrial machines'],
    },
    {
      title: 'Getting Started with Heat Transfer Printing on Garments',
      slug: 'heat-transfer-printing-getting-started',
      excerpt: 'Heat transfer printing has opened up a whole new revenue stream for tailors and garment makers. Here\'s everything you need to know to get started with a heat press machine.',
      content: `Heat transfer printing is one of the fastest growing segments of the garment decoration industry in Nigeria. With a quality heat press machine and the right materials, you can add custom logos, names, rhinestone designs, and full-colour prints to t-shirts, jerseys, bags, and virtually any fabric item.

## What is Heat Transfer?

Heat transfer is a process where a design printed or pre-made on a special carrier sheet is permanently bonded to fabric using heat and pressure. The heat press machine provides consistent, even heat and pressure — far more consistent than an iron — which is critical for a clean, long-lasting result.

## Types of Heat Transfer

**HTV (Heat Transfer Vinyl)**: Cut vinyl designs pressed onto fabric. Great for team names, numbers, logos, and personalisation. Works with a vinyl plotter cutter and heat press.

**Rhinestone/Stoning Transfers**: Pre-made rhinestone designs on a template that are pressed onto the garment. Extremely popular for fashion tops, children's clothing, and ceremonial wear. Our Jukae and Enel stoning machines are purpose-built for this.

**Sublimation**: Ink is transferred into polyester fabric using heat. Creates photographic-quality, full-colour prints that don't crack or peel. Requires 100% polyester fabric.

**DTF (Direct to Film)**: A newer technology that prints onto a film which is then pressed onto any fabric type. More flexible than sublimation.

## Choosing the Right Heat Press

For a startup operation, the **38×38cm heat press** is the most popular choice. It handles A4-size designs and is compact enough for a small workspace. If you're printing larger items — hoodies, jerseys, jackets — the **40×60cm** or larger format is worth the investment.

Key specifications to look for:
- **Temperature control**: Must be accurate to ±5°C. Poor temperature control is the leading cause of failed transfers.
- **Pressure adjustment**: Even pressure across the entire platen is essential.
- **Digital display**: Analogue gauges are harder to set consistently.

## Basic Heat Transfer Settings

| Transfer Type | Temperature | Time | Pressure |
|--------------|-------------|------|----------|
| HTV Vinyl | 150–165°C | 10–15 sec | Medium |
| Rhinestone | 160–170°C | 12–15 sec | Medium-Heavy |
| Sublimation | 190–200°C | 45–60 sec | Medium |

Always test on scrap fabric first. Every machine, transfer material, and fabric combination is slightly different.

## Starting Your Heat Transfer Business

The startup cost for a basic heat transfer setup is relatively low:
1. Heat press machine (38×38): from ₦180,000
2. Vinyl plotter (for HTV): from ₦460,000
3. Blank garments: source locally
4. Transfer materials: vinyl, rhinestone templates, sublimation paper

Many successful garment decorators in Lagos started with just a heat press and pre-made rhinestone transfers, adding a plotter later as the business grew. Visit us at Olmach Nig Ltd — we stock all the machines and can advise on the right setup for your budget.`,
      image: 'https://images.unsplash.com/photo-1674471361346-38d423db19f3?auto=format&fit=crop&w=1200&q=80',
      category: 'Business Tips',
      author: 'Olmach Team',
      published: true,
      tags: ['heat transfer', 'heat press', 'garment printing', 'business tips'],
    },
    {
      title: 'How to Set Up Your First Tailoring Workshop in Nigeria',
      slug: 'setting-up-tailoring-workshop-nigeria',
      excerpt: 'Opening a tailoring workshop is one of the most rewarding businesses you can start in Nigeria. Here\'s a practical checklist to help you set up professionally from day one.',
      content: `The tailoring and fashion industry in Nigeria is booming. From corporate wear and school uniforms to Ankara fashion and bridal wear, there is consistent demand for skilled tailors across every city. If you've been considering opening your own workshop, this guide will help you plan it properly.

## Step 1: Define Your Niche

Before buying a single machine, decide what you'll specialise in. The equipment you need varies significantly:

- **Corporate/general tailoring**: Straight stitch + overlocker
- **Fashion/ankara**: Straight stitch + overlocker + possibly an embroidery machine
- **School uniforms (bulk)**: 2–3 straight stitch machines, overlocker, hemming machine
- **Sportswear**: Overlocker with stretch capability, heat press for printing
- **Bridal/ceremonial**: Straight stitch, overlocker, heat press for embellishments

Focus beats diversity for a startup. You can expand later.

## Step 2: Choose Your Location

A tailoring workshop needs:
- Good natural light or strong artificial lighting (fatigue is real)
- Adequate ventilation (lint in the air is a health concern)
- Stable electricity or a reliable generator
- Enough space for machines, a cutting table, and storage
- Accessibility for customers if you're doing bespoke work

A minimum of 250–300 sq ft is comfortable for a 2–3 machine setup.

## Step 3: Essential Equipment List

**Must-have from day one:**
- 1× Industrial straight stitch machine (e.g. Two Lion 8700 or Juki DDL-8700)
- 1× Industrial overlocker (e.g. Jukae 747 4-thread)
- Cutting table (can be a sturdy wooden board)
- Steam iron + ironing board
- Dress form/mannequin (at least one)
- Good scissors + rotary cutter

**Add as you grow:**
- Second straight stitch machine
- Hemming/tapping machine (for belt loops and waistbands)
- Heat press (for branding and embellishment)
- Embroidery machine

## Step 4: Budget Realistically

Here is a realistic budget range for a starter workshop in Lagos (2025):

| Item | Budget Option | Quality Option |
|------|--------------|----------------|
| Straight stitch machine | ₦120,000 (UK used) | ₦250,000+ (new Juki) |
| Overlocker | ₦130,000 | ₦200,000+ |
| Iron + board | ₦15,000 | ₦35,000 |
| Cutting table | ₦20,000 | ₦50,000 |
| Mannequin | ₦8,000 | ₦25,000 |
| **Total starter budget** | **~₦300,000** | **~₦600,000+** |

## Step 5: Register Your Business

Register with the Corporate Affairs Commission (CAC) as a business name for as little as ₦10,000. This builds credibility with corporate clients and allows you to open a business account.

## Step 6: Find Your First Clients

- Start with family, friends, and church/mosque community
- Offer school uniforms to a local school — bulk orders build cash flow
- Create a WhatsApp Business account and post your work consistently
- Partner with a fabric shop to get referrals

Your workshop's reputation is built one garment at a time. Focus on quality, delivery time, and professional communication from the very beginning.

We at Olmach Nig Ltd have helped hundreds of tailors set up their workshops over the years. Visit us at 43/45 Agarawu Street, Lagos Island to see our full range of machines and get personalised advice for your setup.`,
      image: 'https://images.unsplash.com/photo-1675176785803-bffbbb0cd2f4?auto=format&fit=crop&w=1200&q=80',
      category: 'Business Tips',
      author: 'Olmach Team',
      published: true,
      tags: ['workshop setup', 'tailoring business', 'Nigeria', 'startup guide'],
    },
    {
      title: '5 Signs Your Industrial Sewing Machine Needs Servicing',
      slug: '5-signs-sewing-machine-needs-servicing',
      excerpt: 'Don\'t wait until your machine completely breaks down to call a technician. These five warning signs tell you it\'s time for a professional service before a small problem becomes an expensive repair.',
      content: `Every experienced tailor knows the frustration: you're in the middle of a big order, and your machine starts acting up. Sometimes it's a minor issue you can fix yourself. Other times, it's a warning sign of something more serious. Learning to tell the difference can save you significant money and downtime.

## Sign 1: Skipped Stitches That Don't Go Away

Occasional skipped stitches are normal — they're usually caused by a dull or bent needle, incorrect threading, or the wrong needle size for your fabric. Change the needle and re-thread the machine.

**When to worry**: If skipped stitches persist after changing the needle and checking your threading, the problem is mechanical. The most common culprit is a timing issue — the needle and hook are no longer synchronised properly. This requires professional adjustment and is not a DIY fix on industrial machines.

## Sign 2: Unusual Noises

A well-maintained industrial sewing machine makes a consistent, rhythmic sound. You should know what your machine sounds like at normal speed.

**Warning sounds to listen for**:
- **Grinding or scraping**: Metal-on-metal contact where there should be none. Could indicate a worn hook, damaged bobbin case, or insufficient lubrication.
- **Knocking or thumping**: Often a timing issue or loose mechanical component.
- **High-pitched squealing**: Usually insufficient oil at a specific friction point.

If you notice a new sound, don't ignore it. Running a machine with a mechanical problem causes accelerated wear and can turn a ₦5,000 repair into a ₦50,000 one.

## Sign 3: Thread Breaking Constantly

Thread should not break during normal sewing. When it does, work through this checklist:

1. Check the thread path — is it correctly threaded through every guide?
2. Check the needle — is it the right size and correctly inserted (flat side back)?
3. Check the thread tension — is the upper tension set appropriately?
4. Check the thread itself — old, weak, or low-quality thread breaks easily

**When to call for service**: If thread continues breaking after checking all of the above, the issue is often a burr (rough spot) on a thread guide, the needle plate, or the hook. A technician can locate and polish this out quickly.

## Sign 4: The Machine Runs Hot or Slow

An industrial sewing machine motor should run at consistent speed with minimal heat (the motor will be warm, not hot). If:

- The machine struggles at normal speeds
- The motor gets very hot quickly
- The machine slows down under normal fabric thickness

...these indicate motor problems (often worn carbon brushes on clutch motors) or a mechanical binding issue inside the machine that's creating extra load on the motor.

## Sign 5: Inconsistent Stitch Tension You Can't Fix

Proper stitch tension means the seam looks the same on both sides of the fabric. If you're constantly fighting with upper or lower tension, and adjusting the tension dials doesn't give you a clean stitch, something is wrong.

Common causes include:
- Lint packed under the bobbin case tension spring
- A damaged tension disc on the upper thread path
- A worn bobbin case that no longer holds consistent resistance

## What to Do

If you're in Lagos, bring your machine to **Olmach Nig Ltd at 43/45 Agarawu Street, Lagos Island**. We service all brands including Juki, Brother, Jukae, Two Lion, Emel, and Enel. We carry most common spare parts in stock and can usually complete a standard service within 24–48 hours.

Don't wait for a complete breakdown. Regular servicing every 6 months (or every 3 months for heavy production use) keeps your machine performing at its best.`,
      image: 'https://images.unsplash.com/photo-1564848534648-558dc1ef55c7?auto=format&fit=crop&w=1200&q=80',
      category: 'Maintenance',
      author: 'Olmach Team',
      published: true,
      tags: ['maintenance', 'troubleshooting', 'machine servicing', 'tips'],
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: { ...post },
      create: { ...post },
    });
    console.log(`  ✅ ${post.title}`);
  }

  console.log(`\n✅ Seeded ${blogPosts.length} blog posts.\n`);

  console.log(`\n🎉 All done!\n`);
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  prisma.$disconnect();
  process.exit(1);
});
