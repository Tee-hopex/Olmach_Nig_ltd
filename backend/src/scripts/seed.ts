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
  'button-buttonhole':      'https://images.unsplash.com/photo-1598023707260-bb5987bf06e9?auto=format&fit=crop&w=800&q=80',
  'cutting-machines':       'https://images.unsplash.com/photo-1777107508963-369c32e890c2?auto=format&fit=crop&w=800&q=80',
  'accessories-tools':      'https://images.unsplash.com/photo-1578353022142-09264fd64295?auto=format&fit=crop&w=800&q=80',
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
    catButton,
    catCutting,
    catTools,
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
    prisma.category.upsert({
      where: { slug: 'button-buttonhole' },
      update: { image: CAT_IMAGES['button-buttonhole'] },
      create: {
        name: 'Button & Buttonhole Machines',
        slug: 'button-buttonhole',
        image: CAT_IMAGES['button-buttonhole'],
        description:
          'Industrial button sewing, buttonhole stitching, and eyelet setting machines for professional garment finishing on shirts, trousers, and jackets.',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'cutting-machines' },
      update: { image: CAT_IMAGES['cutting-machines'] },
      create: {
        name: 'Cutting Machines',
        slug: 'cutting-machines',
        image: CAT_IMAGES['cutting-machines'],
        description:
          'Industrial and portable fabric cutting machines including straight-knife cutters, laser cutters, rechargeable cutters, and professional tailor scissors.',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'accessories-tools' },
      update: { image: CAT_IMAGES['accessories-tools'] },
      create: {
        name: 'Accessories & Tools',
        slug: 'accessories-tools',
        image: CAT_IMAGES['accessories-tools'],
        description:
          'Essential tailoring tools and workshop accessories including machine lamps, presser feet, pattern rulers, garment steamers, and workshop organizers.',
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
    prisma.brand.upsert({
      where: { slug: 'singer' },
      update: {},
      create: {
        name: 'Singer',
        slug: 'singer',
        description:
          'Singer is one of the world\'s oldest and most recognised sewing machine brands, offering a wide range from domestic to heavy-duty computerized machines used by professionals globally.',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'kingy' },
      update: {},
      create: {
        name: 'Kingy',
        slug: 'kingy',
        description:
          'Kingy produces affordable Chinese-branded industrial sewing machines widely used in Nigerian tailoring workshops and garment factories.',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'typical' },
      update: {},
      create: {
        name: 'Typical',
        slug: 'typical',
        description:
          'Typical Group is one of China\'s most established industrial sewing machine producers, known globally for consistent quality and high-speed lockstitch machines.',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'loki' },
      update: {},
      create: {
        name: 'Loki',
        slug: 'loki',
        description:
          'Loki produces manual treadle sewing machines popular in Nigerian markets for their reliability and electricity-free operation.',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'butterfly' },
      update: {},
      create: {
        name: 'Butterfly',
        slug: 'butterfly',
        description:
          'Butterfly is a well-known Chinese sewing machine brand with strong market presence across Africa, offering reliable domestic machines with widely available spare parts.',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'protex' },
      update: {},
      create: {
        name: 'Protex',
        slug: 'protex',
        description:
          'Protex manufactures heavy-duty industrial sewing machines designed for leather work, thick fabric, and demanding tailoring applications.',
      },
    }),
    prisma.brand.upsert({
      where: { slug: 'sokany' },
      update: {},
      create: {
        name: 'Sokany',
        slug: 'sokany',
        description:
          'Sokany offers a range of affordable industrial-quality home and workshop appliances popular in Nigerian and West African markets.',
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

    // ═══════════════════════════════════════════════════════════════════════
    //  INDUSTRIAL STRAIGHT — BATCH 2 ADDITIONS
    // ═══════════════════════════════════════════════════════════════════════
    {
      name: 'Kingy Industrial Straight Sewing Machine',
      slug: 'kingy-industrial-straight',
      brand: 'Kingy',
      categoryId: catStraight.id,
      subcategory: 'Standard',
      price: 0,
      images: [PH],
      shortDescription: 'A reliable Chinese-branded industrial lockstitch straight sewing machine widely used in Nigerian tailoring workshops and garment factories. Built for continuous heavy-duty operation on a variety of fabric weights.',
      description: `The Kingy Industrial Sewing Machine is a single-needle lockstitch straight sewing machine designed for professional garment production. It delivers consistent, precise stitching on fabrics ranging from light cotton to medium-weight materials.

Commonly paired with a clutch motor or servo motor, it offers adjustable stitch length and tension to suit different sewing applications. The machine is mounted on a sturdy industrial table with a built-in drawer and knee-lift mechanism for ease of use.

It is a popular entry-level industrial machine in Nigerian markets due to its affordability and wide availability of spare parts.`,
      features: [
        'Single-needle lockstitch mechanism for straight seam sewing',
        'Adjustable stitch length up to 4mm for versatile fabric handling',
        'Compatible with standard industrial clutch or servo motors',
        'Built-in oil lubrication system for smooth and durable operation',
        'Industrial table mount with knee-lift presser foot mechanism',
        'Handles light to medium-weight fabrics including cotton, polyester, and linen',
      ],
      specifications: {
        'Stitch Type': 'Single-needle lockstitch',
        'Stitch Length': 'Adjustable up to 4mm',
        'Motor Compatibility': 'Clutch or servo motor',
        'Lubrication': 'Built-in oil system',
        'Ideal For': 'Tailoring workshops, garment factories',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['industrial sewing machine', 'lockstitch', 'straight stitch', 'kingy', 'chinese industrial', 'garment production', 'tailoring'],
    },

    {
      name: 'Xian Typical Industrial Straight Sewing Machine',
      slug: 'xian-typical-industrial-straight',
      brand: 'Typical',
      categoryId: catStraight.id,
      subcategory: 'Standard',
      price: 0,
      images: [PH],
      shortDescription: 'A Typical-brand industrial lockstitch sewing machine from Xi\'an, China, known for precision engineering and long-lasting performance. Widely used in professional garment and textile factories.',
      description: `The Xian Typical Industrial Straight Sewing Machine is manufactured by the Typical Group, one of China's most established industrial sewing machine producers based in Xi'an. It features a high-speed single-needle lockstitch mechanism capable of delivering clean, tight seams on a broad range of fabrics.

The machine is engineered for high-volume production environments with a fully automatic lubrication system and reduced noise operation. Typical machines are recognised globally for their consistent stitch quality and durability in demanding workshop conditions.

This model comes with an industrial table frame and is compatible with standard industrial motors.`,
      features: [
        'High-speed single-needle lockstitch with up to 5,000 stitches per minute',
        'Fully automatic lubrication system for low-maintenance operation',
        'Adjustable stitch length and presser foot pressure',
        'Reduced-noise design suitable for continuous production environments',
        'Compatible with clutch and servo motors',
        'Handles fabrics from lightweight chiffon to medium denim',
      ],
      specifications: {
        'Stitch Type': 'Single-needle lockstitch',
        'Max Speed': '5,000 stitches per minute',
        'Lubrication': 'Fully automatic',
        'Motor Compatibility': 'Clutch or servo motor',
        'Brand Origin': 'Xi\'an, China (Typical Group)',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['typical', 'xian typical', 'industrial sewing machine', 'lockstitch', 'straight stitch', 'chinese brand', 'high speed', 'garment factory'],
    },

    {
      name: 'Post Bed Industrial Machine for Wig and Leather Work',
      slug: 'post-bed-industrial-wig-leather',
      brand: 'Generic',
      categoryId: catStraight.id,
      subcategory: 'Specialty',
      price: 0,
      images: [PH],
      shortDescription: 'A specialized post-bed industrial sewing machine with a raised cylindrical arm for sewing wigs, leather goods, boots, and gloves. Ideal for items that cannot be maneuvered on a flat-bed machine.',
      description: `The Post Bed Industrial Machine features a tall, vertical post arm that allows three-dimensional and tubular items to be fed freely around the post during sewing. This design is especially suited for wig making, leather crafting, shoe uppers, gloves, and small cylindrical accessories.

The machine typically uses a walking foot or needle-feed mechanism to advance thick materials evenly without slipping. It handles multiple layers of leather, vinyl, and synthetic fabrics with precision.

The post bed configuration is essential in any professional leather or wig production setup where flat-bed machines are impractical.`,
      features: [
        'Raised post-bed arm design for sewing three-dimensional and tubular items',
        'Walking foot or needle-feed mechanism for even advancement of thick materials',
        'Suitable for leather, synthetic fabrics, wig caps, gloves, and shoe uppers',
        'Heavy-duty needle and hook system for sewing through multiple layers',
        'Adjustable stitch length and thread tension',
        'Compact footprint with industrial table mount',
      ],
      specifications: {
        'Bed Type': 'Post bed (raised cylindrical arm)',
        'Feed System': 'Walking foot / needle feed',
        'Applications': 'Wigs, leather goods, shoe uppers, gloves',
        'Material Capacity': 'Multiple layers of leather, vinyl, synthetic fabric',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['post bed machine', 'industrial sewing machine', 'leather sewing', 'wig sewing', 'boot sewing', 'glove sewing', 'cylindrical arm', 'heavy duty'],
    },

    {
      name: 'Two Lion Protex Industrial Leather Sewing Machine',
      slug: 'two-lion-protex-leather',
      brand: 'Two Lion',
      categoryId: catStraight.id,
      subcategory: 'Leather',
      price: 0,
      images: [PH],
      shortDescription: 'A heavy-duty Two Lion industrial sewing machine specifically designed for sewing thick leather goods, hides, and multi-layer leather materials. Built for demanding leathercraft and upholstery applications.',
      description: `The Two Lion Protex for Leather is a robust industrial machine engineered to handle the unique demands of leather sewing. It features a heavy-duty feed mechanism and specially designed presser foot to ensure leather does not slip or stretch during sewing.

The machine delivers strong, consistent lockstitch seams through thick cowhide, synthetic leather, and PU materials commonly used in bags, belts, shoes, and upholstery. Two Lion is a recognised Chinese industrial sewing machine brand with a strong presence in Nigerian markets.

This machine is built for durability and sustained use in high-output leather workshops.`,
      features: [
        'Heavy-duty construction designed for thick leather and multi-layer materials',
        'Compound feed mechanism (needle feed + walking foot) to prevent leather slippage',
        'Accommodates heavy-duty needles suitable for cowhide and synthetic leather',
        'Strong lockstitch formation for durable seams on bags, belts, and upholstery',
        'Adjustable presser foot pressure for various leather thicknesses',
        'Industrial table mount with oil reservoir and lubrication system',
      ],
      specifications: {
        'Stitch Type': 'Lockstitch',
        'Feed System': 'Compound feed (needle + walking foot)',
        'Applications': 'Leather bags, belts, shoes, upholstery',
        'Needle Type': 'Heavy-duty leather-point needles',
        'Brand': 'Two Lion (Protex series)',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['two lion', 'leather sewing machine', 'protex', 'heavy duty', 'industrial', 'leathercraft', 'upholstery', 'bag making', 'belt sewing'],
    },

    {
      name: 'Protex 0303 Industrial Leather Sewing Machine',
      slug: 'protex-0303-industrial',
      brand: 'Protex',
      categoryId: catStraight.id,
      subcategory: 'Leather',
      price: 0,
      images: [PH],
      shortDescription: 'The Protex 0303 is a purpose-built industrial sewing machine for leather and heavy fabric applications, offering precise seam control and durability. Widely used in Nigerian workshops for leatherwork and thick material sewing.',
      description: `The Protex Industrial Machine 0303 Model is a heavy-duty lockstitch sewing machine designed for leather goods, thick synthetic fabrics, and demanding tailoring tasks. The 0303 designation identifies a specific configuration optimized for sewing thick or layered materials where standard industrial machines struggle.

It is equipped with a compound feed system to handle uneven or tough surfaces without skipping stitches. The machine uses industrial-grade needles and heavy thread to produce strong, lasting seams in products like bags, shoes, and protective gear.

Its reliable motor compatibility and straightforward adjustment controls make it a practical choice for professional leather workshops.`,
      features: [
        'Protex 0303 model configuration optimised for thick leather and heavy fabrics',
        'Compound walking foot feed for accurate material advancement',
        'Handles heavy-duty thread (Tex 70–135) for strong, lasting seams',
        'Industrial needle system compatible with leather-point needles',
        'Adjustable stitch length and thread tension controls',
        'Durable cast iron construction for stability during heavy sewing',
      ],
      specifications: {
        'Model': '0303',
        'Stitch Type': 'Lockstitch',
        'Feed System': 'Compound walking foot',
        'Thread Weight': 'Tex 70–135',
        'Construction': 'Cast iron',
        'Applications': 'Leather bags, shoes, protective gear',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['protex', '0303', 'industrial sewing machine', 'leather', 'heavy duty', 'thick fabric', 'lockstitch', 'leathercraft'],
    },

    {
      name: 'Two Lion Cylinder Bed Industrial Sewing Machine',
      slug: 'two-lion-cylinder-bed',
      brand: 'Two Lion',
      categoryId: catStraight.id,
      subcategory: 'Specialty',
      price: 0,
      images: [PH],
      shortDescription: 'A cylinder-arm industrial sewing machine designed for sewing tubular items such as bags, shoes, boots, and gloves. The narrow cylindrical arm allows easy maneuvering of rounded and three-dimensional workpieces.',
      description: `The Two Lion Cylinder Bed Machine features a narrow, horizontal cylinder arm that allows curved, tubular, and cylindrical items to slide freely around the arm during sewing. This is the standard machine type used in shoe manufacturing, bag production, and glove making where flat-bed machines cannot access the work area.

It typically uses a walking foot or compound feed to handle leather, canvas, and thick synthetic materials consistently. Two Lion's cylinder bed machines are well-regarded for their sturdy build quality and ease of maintenance in high-production Nigerian workshops.

The machine is compatible with standard industrial motors and is mounted on a heavy-duty industrial table.`,
      features: [
        'Narrow cylinder arm design for sewing tubular and three-dimensional items',
        'Walking foot compound feed for consistent handling of leather and canvas',
        'Suitable for shoes, boots, bags, gloves, and cylindrical accessories',
        'Heavy-duty needle and bobbin system for thick thread and multi-layer seams',
        'Adjustable stitch length and presser foot pressure',
        'Compatible with clutch and servo industrial motors',
      ],
      specifications: {
        'Bed Type': 'Cylinder arm',
        'Feed System': 'Walking foot / compound feed',
        'Applications': 'Shoes, boots, bags, gloves, tubular items',
        'Motor Compatibility': 'Clutch or servo motor',
        'Brand': 'Two Lion',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['two lion', 'cylinder bed', 'cylinder arm', 'industrial sewing machine', 'shoe sewing', 'bag making', 'leather', 'boots', 'gloves', 'tubular sewing'],
    },

    // ═══════════════════════════════════════════════════════════════════════
    //  MANUAL MACHINES — BATCH 2 ADDITIONS
    // ═══════════════════════════════════════════════════════════════════════
    {
      name: '3-Draw Manual Treadle Sewing Machine',
      slug: '3-draw-manual-treadle',
      brand: 'Generic',
      categoryId: catManual.id,
      subcategory: 'Treadle',
      price: 0,
      images: [PH],
      shortDescription: 'A classic manual treadle sewing machine built into a solid wooden cabinet with three storage drawers. Operated by foot pedal power with no electricity required, ideal for areas with unreliable power supply.',
      description: `The 3-Draw Manual Sewing Machine combines a traditional lockstitch sewing mechanism with a three-drawer wooden cabinet table for organised storage of threads, needles, and accessories. It is powered entirely by a foot treadle, making it completely electricity-free and ideal for Nigerian communities with frequent power outages.

The machine sews straight lockstitch seams on light to medium fabrics including cotton, polyester, and linen. The wooden cabinet provides a stable, dedicated workspace and the three drawers offer convenient storage for sewing notions.

This machine is a practical, low-cost option for tailors and home sewers seeking reliable operation without electricity dependency.`,
      features: [
        'Foot treadle operation requires no electricity',
        'Three wooden drawers for organised storage of sewing accessories',
        'Solid wooden cabinet provides stable sewing table surface',
        'Lockstitch mechanism for clean, straight seams on light to medium fabrics',
        'Adjustable stitch length and thread tension',
        'Folds flat into cabinet when not in use for space saving',
      ],
      specifications: {
        'Operation': 'Foot treadle (no electricity)',
        'Stitch Type': 'Lockstitch',
        'Storage': '3 wooden drawers',
        'Fabric Range': 'Light to medium weight',
        'Ideal For': 'Home tailors, areas with power outages',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['manual sewing machine', 'treadle', '3-draw', 'wooden cabinet', 'no electricity', 'lockstitch', 'home sewing', 'tailoring'],
    },

    {
      name: 'Loki Complete Set Manual Sewing Machine',
      slug: 'loki-complete-set-manual',
      brand: 'Loki',
      categoryId: catManual.id,
      subcategory: 'Treadle',
      price: 0,
      images: [PH],
      shortDescription: 'A complete Loki brand manual treadle sewing machine set including the machine head, iron stand, and all necessary accessories for immediate use. A dependable choice for tailors operating without reliable electricity.',
      description: `The Loki Complete Set Manual Sewing Machine is sold as a ready-to-use package including the sewing machine head, a sturdy iron treadle stand, drive belt, bobbin, needles, and other essential accessories. Loki is a brand sold in Nigerian markets offering treadle machines that perform well on cotton and polyester fabrics used in everyday garment making.

The foot treadle mechanism converts leg movement into needle motion, delivering smooth lockstitch seams without any electrical connection. The iron stand provides a stable and durable base, and the complete set means no additional parts need to be sourced separately.

This machine is popular with community tailors and apprentices as a first professional machine.`,
      features: [
        'Complete set includes machine head, iron treadle stand, belt, bobbins, and needles',
        'Foot treadle operation — fully electricity-free',
        'Lockstitch sewing mechanism for straight seams on cotton and polyester',
        'Sturdy iron stand for stability during prolonged sewing sessions',
        'Adjustable stitch length and bobbin tension',
        'Ready to use out of the box with no additional accessories required',
      ],
      specifications: {
        'Operation': 'Foot treadle (no electricity)',
        'Stitch Type': 'Lockstitch',
        'Set Contents': 'Machine head, iron stand, belt, bobbins, needles',
        'Fabric Range': 'Cotton and polyester',
        'Ideal For': 'Community tailors, apprentices, power outage areas',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['loki', 'manual sewing machine', 'treadle', 'complete set', 'iron stand', 'no electricity', 'lockstitch', 'tailoring'],
    },

    {
      name: 'Beautiful Tabletop Multipurpose Sewing Machine',
      slug: 'beautiful-tabletop-multipurpose',
      brand: 'Generic',
      categoryId: catManual.id,
      subcategory: 'Domestic',
      price: 0,
      images: [PH],
      shortDescription: 'A compact, versatile tabletop sewing machine suitable for home use and light tailoring tasks. Capable of multiple stitch types for sewing, mending, and crafting.',
      description: `The Beautiful Tabletop Multipurpose Machine is a lightweight domestic sewing machine designed to sit on any table or workbench for convenient home and light-duty tailoring use. It offers multiple built-in stitch patterns including straight stitch, zigzag, and decorative stitches, making it useful for a wide range of sewing projects from clothing construction to home décor.

The machine is electrically powered with a foot pedal for speed control and features an easy-to-thread needle system. Its compact size makes it easy to store and transport while still providing the functionality needed for everyday sewing.

Ideal for beginners, home sewers, and tailors needing a secondary lightweight machine.`,
      features: [
        'Multiple built-in stitch patterns including straight and zigzag',
        'Compact tabletop design for home and light workshop use',
        'Electric foot pedal speed control for variable sewing pace',
        'Easy threading system with built-in needle threader',
        'Free arm capability for sewing sleeves, cuffs, and tubular items',
        'Lightweight and portable for easy storage and transport',
      ],
      specifications: {
        'Stitch Types': 'Straight, zigzag, decorative',
        'Operation': 'Electric with foot pedal',
        'Design': 'Compact tabletop',
        'Ideal For': 'Home sewing, beginners, light tailoring',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['tabletop sewing machine', 'multipurpose', 'domestic', 'home sewing', 'zigzag', 'straight stitch', 'compact', 'beginner', 'tailoring'],
    },

    {
      name: 'Butterfly Tabletop Zigzag Sewing Machine',
      slug: 'butterfly-tabletop-zigzag',
      brand: 'Butterfly',
      categoryId: catManual.id,
      subcategory: 'Domestic',
      price: 0,
      images: [PH],
      shortDescription: 'A Butterfly brand domestic tabletop sewing machine featuring zigzag stitch capability for versatile sewing, appliqué, and overcasting. A trusted brand in Nigerian home sewing markets.',
      description: `The Butterfly Tabletop Zigzag Machine is a domestic electric sewing machine manufactured by the Butterfly brand, a well-known Chinese sewing machine maker with strong market presence across Africa. It offers zigzag stitching in addition to standard straight lockstitch, enabling users to sew appliqués, finish raw edges, and create decorative stitch patterns.

The machine is designed for tabletop use and is suitable for light to medium-weight fabrics. It features adjustable stitch width and length, making it adaptable to different sewing tasks.

Butterfly machines are popular in Nigeria for their reliability, ease of use, and readily available spare parts.`,
      features: [
        'Zigzag and straight stitch capability for versatile sewing applications',
        'Adjustable stitch width (up to 5mm) and stitch length',
        'Butterfly brand quality with wide spare parts availability in Nigeria',
        'Compact tabletop design with foot pedal speed control',
        'Suitable for light to medium-weight fabrics including cotton and polyester',
        'Easy bobbin winding and thread tension adjustment',
      ],
      specifications: {
        'Stitch Types': 'Straight, zigzag',
        'Stitch Width': 'Up to 5mm',
        'Operation': 'Electric with foot pedal',
        'Brand': 'Butterfly',
        'Fabric Range': 'Light to medium weight',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['butterfly', 'zigzag', 'tabletop', 'domestic sewing machine', 'straight stitch', 'appliqué', 'home sewing', 'overcasting'],
    },

    // ═══════════════════════════════════════════════════════════════════════
    //  INDUSTRIAL OVERLOCKING — BATCH 2 ADDITIONS
    // ═══════════════════════════════════════════════════════════════════════
    {
      name: 'Two Lion 747D Direct Drive Industrial Overlock Machine',
      slug: 'two-lion-747d-direct-drive-overlock',
      brand: 'Two Lion',
      categoryId: catOverlock.id,
      subcategory: '4-Thread',
      price: 0,
      images: [PH],
      shortDescription: 'The Two Lion 747D is a direct-drive 4-thread industrial overlock machine (serger) for high-speed seaming and edge finishing. The direct drive motor eliminates belt noise and reduces maintenance.',
      description: `The Two Lion 747D Direct Drive Industrial Overlock Machine is a 4-thread industrial overlock machine, also known as a serger or merrowing machine, designed for professional garment seaming and edge finishing. The direct-drive motor is integrated directly into the machine head, eliminating the traditional clutch-and-belt system for quieter, more energy-efficient operation.

The 747D model delivers clean overlock stitches at high speeds, seaming and trimming fabric edges simultaneously to prevent fraying. It is commonly used in garment factories for sewing knit fabrics, t-shirts, sportswear, and general garment finishing.

Two Lion's 747D is a popular and trusted model in Nigerian tailoring workshops.`,
      features: [
        '4-thread overlock stitch for simultaneous seaming and edge trimming',
        'Direct-drive motor for quieter and more energy-efficient operation',
        'High-speed operation suitable for industrial garment production',
        'Automatic lubrication system for reduced maintenance',
        'Adjustable differential feed for handling stretch and woven fabrics',
        'Compact head design compatible with standard industrial overlock tables',
      ],
      specifications: {
        'Stitch Type': '4-thread overlock',
        'Motor': 'Direct drive (integrated servo)',
        'Applications': 'T-shirts, knit fabrics, sportswear, garment finishing',
        'Model': '747D',
        'Brand': 'Two Lion',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['two lion', '747d', 'overlock', 'serger', 'direct drive', 'industrial', '4-thread', 'edge finishing', 'garment production'],
    },

    // ═══════════════════════════════════════════════════════════════════════
    //  EMBROIDERY MACHINES — BATCH 2 ADDITIONS
    // ═══════════════════════════════════════════════════════════════════════
    {
      name: 'UK Used Embroidery Machine',
      slug: 'uk-used-embroidery-machine',
      brand: 'Generic',
      categoryId: catEmbroidery.id,
      subcategory: 'Domestic',
      price: 0,
      images: [PH],
      shortDescription: 'A pre-owned domestic embroidery machine sourced from the UK and sold in good working condition. Offers professional embroidery capabilities at a more accessible price point.',
      description: `The UK Used Embroidery Machine is a second-hand domestic embroidery machine imported from the United Kingdom and resold in Nigerian markets. These machines are typically well-maintained, single or multi-needle domestic embroidery units from reputable brands, offering built-in embroidery designs, alphabets, and the ability to connect to a computer for custom design transfer.

Buying a UK-used machine provides access to higher-specification features at a lower cost compared to new machines. Each unit is tested for functionality before sale.

This is a popular option for fashion designers and tailors who want embroidery capability without investing in a brand-new unit.`,
      features: [
        'Pre-owned domestic embroidery machine in tested working condition',
        'Built-in embroidery designs and alphabet lettering',
        'USB or computer connectivity for custom design transfer (model dependent)',
        'Embroidery hoop and accessories typically included',
        'More affordable entry point to professional embroidery capability',
        'Sourced from the UK with generally high prior maintenance standards',
      ],
      specifications: {
        'Condition': 'Pre-owned (UK used, tested)',
        'Origin': 'United Kingdom',
        'Design Storage': 'Built-in + USB/computer (model dependent)',
        'Accessories': 'Embroidery hoop typically included',
        'Ideal For': 'Fashion designers, tailors seeking affordable embroidery',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: false,
      warranty: '3 Months Warranty',
      tags: ['embroidery machine', 'uk used', 'second hand', 'pre-owned', 'domestic', 'embroidery', 'fashion design', 'affordable', 'imported'],
    },

    {
      name: 'Brother 100-Design Tabletop Embroidery Machine',
      slug: 'brother-100-design-embroidery',
      brand: 'Brother',
      categoryId: catEmbroidery.id,
      subcategory: 'Domestic',
      price: 0,
      images: [PH],
      shortDescription: 'A Brother domestic embroidery and sewing machine with 100 built-in embroidery designs and multiple stitch patterns. Perfect for fashion designers and tailors adding decorative embroidery to garments.',
      description: `The Brother Tabletop 100-Design Embroidery Machine is a domestic combination sewing and embroidery machine from Brother, one of the world's leading sewing machine manufacturers. It comes loaded with 100 built-in embroidery designs spanning flowers, borders, letters, and decorative motifs, making it immediately useful without requiring a computer.

The machine includes an LCD screen for design selection and preview, and an embroidery arm that attaches to guide the hoop automatically through the chosen pattern. It also functions as a regular sewing machine with multiple stitch types for general garment construction.

This machine is well-suited for fashion designers, boutique owners, and tailors wanting to offer personalised embroidery services.`,
      features: [
        '100 built-in embroidery designs including borders, motifs, and alphabets',
        'LCD screen for design selection and stitch preview',
        'Automatic embroidery arm with included embroidery hoop',
        'Doubles as a standard sewing machine with multiple stitch options',
        'USB port for importing additional custom designs (model dependent)',
        'Compact tabletop design suitable for home studio and small workshop',
      ],
      specifications: {
        'Built-in Designs': '100 embroidery designs',
        'Display': 'LCD screen',
        'Connectivity': 'USB (model dependent)',
        'Dual Function': 'Embroidery + standard sewing',
        'Brand': 'Brother',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['brother', 'embroidery machine', '100 designs', 'domestic', 'tabletop', 'lcd', 'fashion design', 'garment decoration'],
    },

    {
      name: 'Brother 69-Design Embroidery Machine with Buttonhole Styles',
      slug: 'brother-69-design-embroidery-buttonhole',
      brand: 'Brother',
      categoryId: catEmbroidery.id,
      subcategory: 'Domestic',
      price: 0,
      images: [PH],
      shortDescription: 'A Brother domestic sewing and embroidery machine featuring 69 built-in stitches and multiple automatic buttonhole styles. Combines everyday sewing versatility with decorative embroidery capability.',
      description: `The Brother 69-Design Embroidery Machine is a domestic sewing machine equipped with 69 built-in stitch patterns including embroidery stitches, utility stitches, and multiple buttonhole styles for professional finishing. The multiple buttonhole options — including standard, stretch, rounded, and keyhole types — make it exceptionally versatile for garment construction across different fabric types.

It features an automatic needle threader, drop-in bobbin system, and easy stitch selection controls for user-friendly operation. The machine handles light to medium-weight fabrics with precision and is suitable for tailors who need both garment construction and decorative stitch capability in a single compact machine.

Brother's build quality ensures consistent performance for regular workshop use.`,
      features: [
        '69 built-in stitch patterns including utility and decorative embroidery stitches',
        'Multiple automatic buttonhole styles (standard, stretch, keyhole, rounded)',
        'Automatic needle threader and drop-in bobbin for easy setup',
        'LCD or dial stitch selection for intuitive operation',
        'Handles light to medium-weight fabrics with consistent stitch quality',
        'Compact tabletop design for home and light professional workshop use',
      ],
      specifications: {
        'Built-in Stitches': '69 patterns',
        'Buttonhole Types': 'Standard, stretch, keyhole, rounded',
        'Threading': 'Automatic needle threader',
        'Bobbin System': 'Drop-in bobbin',
        'Brand': 'Brother',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['brother', 'embroidery machine', '69 stitches', 'buttonhole', 'domestic', 'tabletop', 'sewing and embroidery', 'versatile'],
    },

    {
      name: 'Singer HD6805C Heavy Duty Computerized Sewing Machine',
      slug: 'singer-hd6805c-heavy-duty',
      brand: 'Singer',
      categoryId: catEmbroidery.id,
      subcategory: 'Computerized',
      price: 0,
      images: [PH],
      shortDescription: 'The Singer Heavy Duty 6805C is a computerized heavy-duty sewing machine with built-in stitches and embroidery functions, designed for thick fabrics and high-volume home sewing. Combines power with precision stitch control.',
      description: `The Singer Heavy Duty 6805C is a computerized sewing machine from Singer's Heavy Duty line, built with a strong metal interior frame and powerful motor to handle denim, leather, and multiple fabric layers that standard domestic machines struggle with. It features a range of built-in stitches accessible through an LCD panel, including decorative and utility stitches for garment finishing and embellishment.

The 6805C model is designed for users who need domestic-scale machines with industrial-level durability and consistent stitch output. Its heavy-duty needle system and high presser foot pressure make it capable of sewing through thick materials reliably.

Singer's worldwide reputation and Nigerian parts availability make it a practical investment for serious home sewers and light-duty tailors.`,
      features: [
        'Computerized stitch selection with LCD display and multiple built-in stitches',
        'Heavy-duty metal interior frame for stability on thick materials',
        'High-power motor for sewing through denim, canvas, and layered fabrics',
        'Automatic needle threader and top-drop-in bobbin system',
        'Heavy-duty presser foot pressure adjustment for thick material handling',
        'Multiple decorative and utility stitches for embroidery-style finishing',
      ],
      specifications: {
        'Model': 'HD6805C',
        'Frame': 'Heavy-duty metal interior',
        'Display': 'LCD screen',
        'Applications': 'Denim, canvas, thick fabrics, multi-layer sewing',
        'Brand': 'Singer',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['singer', 'hd6805c', 'heavy duty', 'computerized', 'embroidery', 'sewing machine', 'thick fabric', 'denim', 'domestic'],
    },

    {
      name: '20U33 Industrial Zigzag Embroidery Machine',
      slug: '20u33-industrial-zigzag-embroidery',
      brand: 'Generic',
      categoryId: catEmbroidery.id,
      subcategory: 'Industrial Decorative',
      price: 0,
      images: [PH],
      shortDescription: 'The 20U33 is an industrial zigzag sewing machine used for decorative stitching and light embroidery work in Nigerian workshops. A reliable machine for satin stitch and monogram-style decorative work.',
      description: `The 20U33 is an industrial zigzag sewing machine based on a classic design widely used in professional tailoring and garment workshops for decorative and utility sewing. It produces zigzag and satin stitches used in appliqué work, monogramming, and decorative border stitching on garments.

The machine features adjustable stitch width and length, allowing the creation of dense satin stitches that simulate embroidery effects on garment panels and accessories. In Nigerian tailoring workshops, the 20U33 class machine fills the role of a light embroidery tool for tailors who need decorative stitch capability without investing in a dedicated embroidery machine.

It is an established and well-understood machine with widely available spare parts.`,
      features: [
        'Industrial zigzag mechanism for decorative and utility stitch work',
        'Adjustable stitch width for satin stitch and appliqué applications',
        'Suitable for monogramming, borders, and decorative panel work',
        'Produces dense satin stitches for embroidery-style garment decoration',
        'Compatible with standard industrial motors and tables',
        'Widely available spare parts for easy maintenance',
      ],
      specifications: {
        'Model': '20U33',
        'Stitch Types': 'Zigzag, satin stitch',
        'Applications': 'Appliqué, monogramming, decorative borders',
        'Spare Parts': 'Widely available in Nigeria',
        'Motor Compatibility': 'Standard industrial motors',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['20u33', 'embroidery machine', 'zigzag industrial', 'satin stitch', 'appliqué', 'decorative stitching', 'monogram', 'workshop', 'tailoring'],
    },

    // ═══════════════════════════════════════════════════════════════════════
    //  HEAT TRANSFER & PRESS — BATCH 2 ADDITIONS
    // ═══════════════════════════════════════════════════════════════════════
    {
      name: '80×100 Industrial Stoning Heat Press Machine',
      slug: '80x100-industrial-stoning-machine',
      brand: 'Generic',
      categoryId: catHeat.id,
      subcategory: 'Heat Press',
      price: 0,
      images: [PH],
      shortDescription: 'A large-format 80cm × 100cm industrial heat press machine for applying rhinestones, hotfix crystals, and heat transfers to fabric and garments. Suitable for bulk decoration production.',
      description: `The 80×100 Industrial Stoning Machine is a large-platen heat press designed for applying hotfix rhinestones, heat transfer vinyl (HTV), and rhinestone templates to garments, fabrics, and accessories in bulk. The 80cm × 100cm platen accommodates large garment panels, multiple items at once, or oversized designs, making it highly productive for commercial fashion decoration.

The machine delivers even, controlled heat and pressure across the entire platen surface to ensure all rhinestones bond securely without cold spots. It is used in garment decoration businesses, fashion houses, and custom clothing production.

Industrial construction ensures durability under continuous heat press cycles.`,
      features: [
        'Large 80cm × 100cm platen for bulk rhinestone and HTV application',
        'Even heat distribution across the full platen surface',
        'Adjustable temperature and timer controls for different materials',
        'Accommodates multiple garments or large-panel designs in single press',
        'Heavy-duty industrial construction for continuous production use',
        'Suitable for hotfix rhinestones, heat transfer vinyl, and glitter transfers',
      ],
      specifications: {
        'Platen Size': '80cm × 100cm',
        'Applications': 'Rhinestones, HTV, glitter transfers',
        'Temperature Control': 'Adjustable',
        'Timer': 'Adjustable',
        'Use': 'Commercial bulk production',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['stoning machine', 'heat press', 'rhinestone', 'hotfix', '80x100', 'industrial', 'garment decoration', 'htv', 'heat transfer'],
    },

    {
      name: '38×38 Adjustable Heat Transfer Stoning Machine',
      slug: '38x38-heat-transfer-stoning',
      brand: 'Generic',
      categoryId: catHeat.id,
      subcategory: 'Heat Press',
      price: 0,
      images: [PH],
      shortDescription: 'A compact 38×38cm adjustable heat press for applying rhinestone transfers, heat transfer vinyl, and sublimation prints to fabric and garments. Ideal for small-scale fashion decoration and custom clothing.',
      description: `The 38×38 Adjustable Heat Transfer Stoning Machine is a mid-size heat press suitable for individual garment decoration, rhinestone application, and heat transfer vinyl pressing. The 38×38cm platen covers standard t-shirt chest print areas and typical garment panel sizes comfortably.

Adjustable pressure, temperature, and timer controls allow it to be fine-tuned for different materials including cotton, polyester, and synthetic fabrics. It is commonly used by fashion designers, custom clothing businesses, and boutique tailors who need reliable heat bonding for decorative applications.

The adjustable pressure mechanism ensures even contact across the full platen for consistent results.`,
      features: [
        '38×38cm platen suitable for t-shirt panels and standard garment areas',
        'Adjustable pressure, temperature (up to 230°C), and timer settings',
        'Suitable for rhinestone hotfix, HTV, sublimation, and flock transfers',
        'Even heat distribution for consistent bonding across the full platen',
        'Compact design for tabletop or workbench placement',
        'Digital or analogue controls for precise temperature management',
      ],
      specifications: {
        'Platen Size': '38cm × 38cm',
        'Max Temperature': 'Up to 230°C',
        'Applications': 'Rhinestones, HTV, sublimation, flock',
        'Controls': 'Adjustable pressure, temperature, timer',
        'Design': 'Compact tabletop',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['heat press', '38x38', 'stoning machine', 'rhinestone', 'htv', 'heat transfer', 'sublimation', 'garment decoration'],
    },

    {
      name: '82cm Elongated Heat Press Stoning Machine',
      slug: '82cm-heat-press-stoning',
      brand: 'Generic',
      categoryId: catHeat.id,
      subcategory: 'Heat Press',
      price: 0,
      images: [PH],
      shortDescription: 'An elongated 82cm heat press machine designed for applying rhinestones and heat transfers to wide or long garment panels. Useful for large-format decoration work in fashion production.',
      description: `The 82cm Heat Press Stoning Machine features an elongated platen measuring approximately 82cm in width, making it ideal for pressing wide fabric panels, long garment sections, and oversized rhinestone designs in a single operation. This format is particularly useful for decorating robes, dresses, and kaftan panels where a standard square platen would require repositioning.

The machine provides uniform heat and pressure across its full length to ensure consistent rhinestone bonding and HTV adhesion. It is used in fashion boutiques and garment decoration businesses that regularly work with large-format designs.

The elongated design minimises pressing time by reducing the number of press cycles needed per garment.`,
      features: [
        '82cm elongated platen for large-format rhinestone and HTV application',
        'Uniform heat and pressure across the full 82cm platen length',
        'Adjustable temperature and timer for different fabric and transfer types',
        'Reduces press cycles needed for large garment panels and robes',
        'Suitable for kaftans, dresses, and oversized decoration projects',
        'Industrial build for consistent production use in fashion workshops',
      ],
      specifications: {
        'Platen Length': '82cm',
        'Applications': 'Rhinestones, HTV, kaftans, large panels',
        'Temperature Control': 'Adjustable',
        'Timer': 'Adjustable',
        'Ideal For': 'Large-format fashion decoration',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['heat press', '82cm', 'stoning machine', 'rhinestone', 'large format', 'htv', 'kaftan', 'dress decoration'],
    },

    {
      name: 'Industrial Automatic Self Stoning Machine',
      slug: 'industrial-self-stoning-machine',
      brand: 'Generic',
      categoryId: catHeat.id,
      subcategory: 'Automatic',
      price: 0,
      images: [PH],
      shortDescription: 'A fully automatic industrial rhinestone setting machine that applies hotfix rhinestones to fabric without manual placement. Dramatically increases decoration production speed for commercial fashion businesses.',
      description: `The Industrial Self Stoning Machine is an automated rhinestone application system that feeds, orients, and applies hotfix rhinestones to fabric or garments automatically, eliminating the slow manual process of placing individual stones by hand. The machine can apply hundreds of stones per minute, making it essential for commercial fashion production where rhinestone decoration is required at scale.

It typically uses a template or programmed pattern to guide stone placement, with consistent heat and pressure applied to bond each stone permanently. This machine is a game-changer for Nigerian fashion businesses producing embellished evening wear, wedding attire, and decorative garments in volume.

It significantly reduces labour costs and improves decoration consistency.`,
      features: [
        'Fully automatic rhinestone feeding, orienting, and application process',
        'High-speed output — applies multiple stones per minute for production efficiency',
        'Consistent heat and pressure for permanent hotfix bonding',
        'Template or pattern-guided placement for repeatable design accuracy',
        'Dramatically reduces labour cost compared to manual stone application',
        'Suitable for evening wear, wedding attire, and embellished fashion garments',
      ],
      specifications: {
        'Operation': 'Fully automatic',
        'Process': 'Auto-feed, orient, and apply rhinestones',
        'Applications': 'Evening wear, wedding attire, embellished garments',
        'Advantage': 'Eliminates manual stone placement',
        'Ideal For': 'Commercial fashion production',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['stoning machine', 'automatic', 'industrial', 'rhinestone', 'hotfix', 'garment decoration', 'embellishment', 'fashion production', 'evening wear'],
    },

    {
      name: '5-in-1 Multi-Function Heat Press Machine',
      slug: '5-in-1-heat-press',
      brand: 'Generic',
      categoryId: catHeat.id,
      subcategory: 'Multi-Function',
      price: 0,
      images: [PH],
      shortDescription: 'A versatile 5-in-1 heat press with interchangeable platens for pressing t-shirts, mugs, caps, plates, and flat items. A complete garment and promotional product decoration solution.',
      description: `The 5-in-1 Heat Press Machine is a multi-function heat transfer press that comes with five interchangeable platen attachments: a flat platen for t-shirts and flat items, a mug press, a cap press, a plate press, and a smaller rectangular platen.

This versatility makes it ideal for custom clothing decorators, promotional product businesses, and fashion designers who want to offer a wide range of personalised products from a single machine. Each attachment is designed to apply even heat and pressure to its specific product type for reliable transfer results.

The machine features adjustable temperature and timer settings compatible with sublimation, HTV, and rhinestone transfers. It is a cost-effective all-in-one solution for small and growing decoration businesses.`,
      features: [
        '5 interchangeable platens: flat, mug, cap, plate, and small rectangle',
        'Adjustable temperature (up to 230°C) and digital timer controls',
        'Suitable for sublimation printing, HTV, and rhinestone transfer applications',
        'Flat platen sized for standard t-shirt chest areas',
        'Cost-effective multi-product decoration capability in a single machine',
        'Compact design suitable for home studio and small business use',
      ],
      specifications: {
        'Platens Included': '5 (flat, mug, cap, plate, small rectangle)',
        'Max Temperature': 'Up to 230°C',
        'Controls': 'Digital temperature and timer',
        'Applications': 'Sublimation, HTV, rhinestones',
        'Ideal For': 'Custom clothing, promotional products',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['5-in-1 heat press', 'heat press', 'mug press', 'cap press', 'sublimation', 'htv', 'rhinestone', 'garment decoration', 'promotional products'],
    },

    // ═══════════════════════════════════════════════════════════════════════
    //  BUTTON & BUTTONHOLE MACHINES
    // ═══════════════════════════════════════════════════════════════════════
    {
      name: 'Two Lion 737 Industrial Button Tacking Machine',
      slug: 'two-lion-737-button-tacking',
      brand: 'Two Lion',
      categoryId: catButton.id,
      subcategory: 'Button Sewing',
      price: 0,
      images: [PH],
      shortDescription: 'The Two Lion 737 is an industrial button tacking and attaching machine for fast, secure attachment of buttons to garments at high production speeds. A standard fixture in garment factories.',
      description: `The Two Lion 737 Model Industrial Tacking Button Machine is designed specifically for high-speed, automated attachment of buttons onto garments in production environments. It uses a lock-tack stitch pattern to securely fasten flat buttons, shanked buttons, and reinforcement buttons to fabric without requiring manual hand-sewing.

The 737 model is pre-programmed with the tacking stitch cycle, requiring the operator simply to position the button and activate the machine. It significantly increases the speed of the button-attaching stage of garment production compared to manual sewing.

Two Lion's 737 is a trusted and commonly used model in Nigerian garment factories and tailoring workshops producing uniforms, shirts, and trousers.`,
      features: [
        'Automated lock-tack stitch cycle for fast and secure button attachment',
        'Compatible with flat buttons and shank buttons of standard sizes',
        'High-speed operation for garment production-line efficiency',
        'Adjustable button clamping mechanism for different button sizes',
        'Pre-programmed tacking stitch pattern for consistent results',
        'Industrial build suitable for continuous production use',
      ],
      specifications: {
        'Model': '737',
        'Function': 'Button tacking and attachment',
        'Button Types': 'Flat, shank, reinforcement buttons',
        'Operation': 'Automated lock-tack stitch cycle',
        'Brand': 'Two Lion',
        'Applications': 'Shirts, uniforms, trousers',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['two lion', '737', 'button tacking', 'button machine', 'industrial', 'garment production', 'shirt making', 'uniform', 'tailoring'],
    },

    {
      name: 'Two Lion 781 Industrial Buttonhole Machine',
      slug: 'two-lion-781-buttonhole',
      brand: 'Two Lion',
      categoryId: catButton.id,
      subcategory: 'Buttonhole',
      price: 0,
      images: [PH],
      shortDescription: 'The Two Lion 781 is an industrial automatic buttonhole machine that cuts and stitches buttonholes in a single automated cycle. Essential for shirt, trouser, and jacket production.',
      description: `The Two Lion 781 Model Industrial Buttonhole Machine is an automatic single-cycle buttonhole machine that stitches and cuts buttonholes in one continuous operation. It is designed for high-speed garment production where consistent, professional buttonholes are required on shirts, trousers, jackets, and coats.

The machine is adjustable for different buttonhole lengths and fabric thicknesses, and it uses a specialised stitch pattern that produces a neat, bar-tacked keyhole or straight buttonhole. The 781 model is a staple machine in Nigerian garment factories producing formal wear and uniforms.

Its speed and consistency far exceed what is achievable by hand or on a domestic machine.`,
      features: [
        'Fully automatic single-cycle buttonhole stitching and cutting',
        'Adjustable buttonhole length to suit different button sizes',
        'Produces clean bar-tacked buttonholes on shirts, trousers, and jackets',
        'High-speed production capability for garment factory environments',
        'Adjustable for light to medium-weight fabrics',
        'Industrial build with simple operator controls for production-line use',
      ],
      specifications: {
        'Model': '781',
        'Function': 'Automatic buttonhole stitching and cutting',
        'Buttonhole Types': 'Bar-tacked, keyhole, straight',
        'Operation': 'Single automated cycle',
        'Brand': 'Two Lion',
        'Applications': 'Shirts, trousers, jackets, coats',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['two lion', '781', 'buttonhole machine', 'industrial', 'automatic', 'shirt making', 'trouser', 'jacket', 'garment production'],
    },

    {
      name: 'Servo Industrial Button Sewing Machine',
      slug: 'servo-button-sewing-machine',
      brand: 'Generic',
      categoryId: catButton.id,
      subcategory: 'Button Sewing',
      price: 0,
      images: [PH],
      shortDescription: 'A servo motor-powered industrial button sewing machine offering precise, energy-efficient button attachment. The servo motor provides better speed control and quieter operation compared to traditional clutch motors.',
      description: `The Servo Button Machine combines an industrial button sewing mechanism with a modern servo motor for improved energy efficiency, precise speed control, and reduced noise. Servo motors eliminate the constant energy draw of traditional clutch motors by only powering the machine when the pedal is engaged, resulting in lower electricity consumption during garment production.

The machine attaches buttons securely using lock-tack stitches and is adjustable for different button sizes and fabric weights. It is well-suited to tailoring workshops and small garment factories where energy efficiency and operator comfort are priorities.

The servo drive also reduces vibration, contributing to longer machine life and more consistent stitch quality.`,
      features: [
        'Servo motor drive for energy-efficient, quiet button sewing operation',
        'Precise speed control for operator comfort and consistent results',
        'Industrial lock-tack stitch mechanism for secure button attachment',
        'Adjustable for different button sizes and shank types',
        'Lower electricity consumption compared to clutch motor button machines',
        'Reduced vibration for extended machine longevity',
      ],
      specifications: {
        'Motor': 'Servo (energy efficient)',
        'Function': 'Button attachment via lock-tack stitch',
        'Advantage': 'Quieter, lower energy than clutch motor',
        'Button Types': 'Flat and shank buttons',
        'Ideal For': 'Tailoring workshops, small garment factories',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['servo motor', 'button machine', 'industrial', 'energy efficient', 'button sewing', 'garment production', 'tailoring', 'quiet operation'],
    },

    {
      name: '2-Face Industrial Eyelet Setting Machine',
      slug: '2-face-industrial-eyelet-machine',
      brand: 'Generic',
      categoryId: catButton.id,
      subcategory: 'Eyelet',
      price: 0,
      images: [PH],
      shortDescription: 'A double-sided industrial eyelet punching and setting machine for installing metal eyelets on both sides of garments, bags, belts, and leather goods simultaneously. Delivers professional, durable eyelet installations.',
      description: `The 2-Face Industrial Eyelet Machine is a heavy-duty press designed to punch holes and set metal eyelets on fabric, leather, canvas, and accessories in a single operation. The two-face design refers to the machine's ability to clinch the eyelet washer on the reverse side simultaneously with the eyelet on the face side, resulting in a secure, professional finish.

It is used in the production of bags, belts, shoes, banners, tarpaulins, and garments requiring reinforced holes for laces, cords, or hanging. The machine accepts different eyelet die sets to accommodate various eyelet sizes.

It is a standard production tool in Nigerian leather goods workshops, bag factories, and garment accessories businesses.`,
      features: [
        'Simultaneous double-face eyelet punching and washer clinching in one press',
        'Interchangeable die sets for different eyelet sizes and materials',
        'Suitable for fabric, leather, canvas, and synthetic materials',
        'Heavy-duty press mechanism for consistent eyelet setting',
        'Used for bags, belts, shoes, banners, and reinforced garment holes',
        'Industrial build for high-volume production environments',
      ],
      specifications: {
        'Function': 'Eyelet punching and setting (double-face)',
        'Die Sets': 'Interchangeable for various eyelet sizes',
        'Materials': 'Fabric, leather, canvas, synthetic',
        'Applications': 'Bags, belts, shoes, banners',
        'Construction': 'Heavy-duty industrial press',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['eyelet machine', 'industrial', '2-face', 'double sided', 'metal eyelet', 'leather goods', 'bag making', 'belt', 'shoe production'],
    },

    // ═══════════════════════════════════════════════════════════════════════
    //  CUTTING MACHINES
    // ═══════════════════════════════════════════════════════════════════════
    {
      name: '40×60 Industrial CO₂ Laser Cut Machine',
      slug: '40x60-laser-cut-machine',
      brand: 'Generic',
      categoryId: catCutting.id,
      subcategory: 'Laser Cutter',
      price: 0,
      images: [PH],
      shortDescription: 'A CO₂ industrial laser cutting and engraving machine with a 40cm × 60cm work bed for cutting fabric, leather, acrylic, and wood. Enables precision cutting and custom design work in fashion and craft production.',
      description: `The 40×60 Industrial Laser Cut Machine is a CO₂ laser cutter and engraver with a working area of 40cm × 60cm, suitable for cutting and engraving a wide variety of materials including fabric, leather, acrylic, MDF, and wood. In the fashion industry, it is used to cut intricate fabric patterns, create lace-effect designs in fabric panels, engrave leather goods, and produce precision-cut components that are difficult or impossible to achieve with manual cutting tools.

The machine connects to a computer and uses vector or raster design files to guide the laser with high precision. It features adjustable power and speed settings to optimise cutting depth and quality for different materials.

This machine is a significant production upgrade for fashion designers and leather workshops.`,
      features: [
        'CO₂ laser cutting and engraving with 40cm × 60cm work bed',
        'Cuts fabric, leather, acrylic, MDF, and thin wood materials',
        'Computer-controlled via vector and raster design files',
        'Adjustable laser power and speed for different materials and depths',
        'High-precision cutting for intricate lace, pattern, and motif work',
        'Ventilation system required for safe operation in enclosed workshops',
      ],
      specifications: {
        'Laser Type': 'CO₂',
        'Work Area': '40cm × 60cm',
        'Materials': 'Fabric, leather, acrylic, MDF, thin wood',
        'Control': 'Computer-controlled (vector/raster files)',
        'Power': 'Adjustable',
        'Note': 'Requires ventilation in enclosed spaces',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['laser cut machine', 'co2 laser', '40x60', 'industrial', 'fabric cutting', 'leather engraving', 'acrylic', 'precision cutting', 'fashion design'],
    },

    {
      name: 'Size 10 Electric Industrial Fabric Cutting Machine',
      slug: 'size-10-industrial-cutting-machine',
      brand: 'Generic',
      categoryId: catCutting.id,
      subcategory: 'Straight Knife',
      price: 0,
      images: [PH],
      shortDescription: 'An electric straight-blade industrial fabric cutting machine with a size 10 blade for cutting multiple layers of fabric simultaneously. A standard cutting room tool for garment production.',
      description: `The Size 10 Industrial Cutting Machine is an electric upright straight-knife fabric cutting machine with a size 10 blade, designed for cutting through multiple layers of stacked fabric in a single pass. The vertical reciprocating blade cuts cleanly and quickly along pattern lines drawn on the top layer of fabric, enabling efficient and accurate cutting of garment pieces in production environments.

The size 10 designation refers to the blade length, indicating capacity for cutting through substantial fabric stacks. It is a standard tool in Nigerian garment factories, cutting rooms, and tailoring workshops where volume cutting of fabric is required.

The machine is guided by hand along the cutting line with precision.`,
      features: [
        'Electric straight-blade mechanism for cutting multiple fabric layers simultaneously',
        'Size 10 blade for capacity cutting of substantial fabric stacks',
        'Reciprocating vertical blade for clean, accurate cutting along pattern lines',
        'Ergonomic handle and safety guard for operator control and protection',
        'Suitable for woven and non-woven fabrics, interfacing, and light materials',
        'Standard garment cutting room tool for production-volume fabric cutting',
      ],
      specifications: {
        'Blade Type': 'Straight knife (size 10)',
        'Operation': 'Electric, handheld upright',
        'Cutting Capacity': 'Multiple fabric layers',
        'Applications': 'Garment cutting rooms, tailoring workshops',
        'Safety': 'Ergonomic handle with safety guard',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['industrial cutting machine', 'straight knife', 'size 10', 'fabric cutter', 'electric', 'garment production', 'cutting room', 'multi-layer cutting'],
    },

    {
      name: 'Rechargeable Cordless Fabric Cutting Machine',
      slug: 'rechargeable-fabric-cutting-machine',
      brand: 'Generic',
      categoryId: catCutting.id,
      subcategory: 'Cordless',
      price: 0,
      images: [PH],
      shortDescription: 'A cordless battery-powered fabric cutting machine for flexible use without a power outlet. Ideal for cutting single or multiple fabric layers in locations where electricity is unavailable or inconvenient.',
      description: `The Rechargeable Cutting Machine is a cordless electric fabric cutter powered by a rechargeable battery, offering the freedom to cut fabric anywhere without being tethered to a power outlet. It is particularly valuable in Nigerian workshops and markets where power supply is unreliable or where mobility on large cutting tables is required.

The machine typically features a circular or straight blade and is suitable for cutting fabric, leather, and foam with precision and ease. Battery capacity allows for extended cutting sessions before recharging is needed.

This tool is a practical addition to any cutting room or mobile tailoring setup.`,
      features: [
        'Rechargeable battery operation for cordless, portable fabric cutting',
        'Circular or straight blade for clean cuts through fabric, leather, and foam',
        'Suitable for single and multiple fabric layers',
        'Practical for areas with unreliable power supply',
        'Lightweight ergonomic design for comfortable prolonged use',
        'USB or standard charger compatible for convenient recharging',
      ],
      specifications: {
        'Power': 'Rechargeable battery (cordless)',
        'Blade Type': 'Circular or straight',
        'Materials': 'Fabric, leather, foam',
        'Charging': 'USB or standard charger',
        'Ideal For': 'Mobile tailoring, power outage areas',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['rechargeable cutting machine', 'cordless', 'fabric cutter', 'battery powered', 'portable', 'cutting tool', 'tailoring', 'leather cutting'],
    },

    {
      name: 'Rechargeable Electric Scissors',
      slug: 'rechargeable-electric-scissors',
      brand: 'Generic',
      categoryId: catCutting.id,
      subcategory: 'Electric Scissors',
      price: 0,
      images: [PH],
      shortDescription: 'Battery-powered electric scissors for effortlessly cutting fabric, leather, packaging material, and other sheet materials. Reduces hand fatigue during prolonged cutting tasks.',
      description: `Hand Rechargeable Scissors are electric scissors powered by a built-in rechargeable battery, designed to cut through fabric, leather, paper, thin foam, and packaging materials with minimal hand effort. Unlike manual scissors, the motorised blades do the cutting work, significantly reducing hand fatigue during extended cutting sessions.

They are particularly useful for tailors, crafters, and packaging professionals who cut large quantities of material daily. The compact handheld design allows precise control along cutting lines, and the rechargeable battery provides sufficient run time for typical workshop cutting tasks.

These scissors are a practical and affordable cutting tool upgrade for any tailoring or craft workshop.`,
      features: [
        'Battery-powered motorised blades for effortless fabric and leather cutting',
        'Rechargeable via USB or standard charger for convenient recharging',
        'Significantly reduces hand fatigue compared to manual scissors',
        'Suitable for fabric, leather, paper, foam, and packaging materials',
        'Compact handheld design for precise cutting control',
        'Safety blade guard for safe storage when not in use',
      ],
      specifications: {
        'Power': 'Built-in rechargeable battery',
        'Operation': 'Motorised blades',
        'Materials': 'Fabric, leather, paper, foam, packaging',
        'Charging': 'USB or standard charger',
        'Safety': 'Blade guard included',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['rechargeable scissors', 'electric scissors', 'battery powered', 'fabric cutting', 'leather cutting', 'hand tool', 'cordless', 'tailoring'],
    },

    {
      name: 'Professional Tailor Scissors (Original)',
      slug: 'professional-tailor-scissors',
      brand: 'Generic',
      categoryId: catCutting.id,
      subcategory: 'Hand Scissors',
      price: 0,
      images: [PH],
      shortDescription: 'Professional-grade tailor\'s scissors crafted from high-quality steel for precise, clean fabric cutting. An essential hand tool for every tailor, seamstress, and fashion designer.',
      description: `Original Scissors refers to high-quality professional tailoring scissors made from hardened steel with precision-ground blades for clean, accurate fabric cutting. Unlike cheaper imitations, professional tailor's scissors maintain their sharpness over extended use and provide the leverage and balance needed for cutting multiple fabric layers cleanly.

They typically feature one serrated or micro-toothed blade to grip fabric and prevent slipping during cutting. The ergonomic handle design reduces hand strain during prolonged cutting tasks, and the heavy-weight construction provides the downward pressure needed for cutting through thick or layered fabrics.

Investing in quality scissors is fundamental to achieving clean seam allowances and accurate pattern cutting in professional garment making.`,
      features: [
        'High-quality hardened steel blades for long-lasting sharpness',
        'Professional tailor\'s design with precision-ground cutting edges',
        'Ergonomic handle for reduced hand fatigue during prolonged cutting',
        'One serrated or micro-toothed blade to prevent fabric slipping',
        'Suitable for all fabric types from silk to denim and leather',
        'Balanced weight distribution for precise and controlled cutting',
      ],
      specifications: {
        'Material': 'Hardened steel',
        'Blade Design': 'Precision-ground, one serrated blade',
        'Handle': 'Ergonomic',
        'Fabric Range': 'All types — silk to leather',
        'Use': 'Professional tailoring and garment making',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: null,
      tags: ['tailor scissors', 'fabric scissors', 'professional scissors', 'cutting tools', 'tailoring', 'garment making', 'hand tool', 'hardened steel'],
    },

    // ═══════════════════════════════════════════════════════════════════════
    //  STEAMING & PRESSING — BATCH 2 ADDITIONS
    // ═══════════════════════════════════════════════════════════════════════
    {
      name: 'Two Lion 1600W Industrial Gravity-Feed Steam Iron',
      slug: 'two-lion-1600w-industrial-steam-iron',
      brand: 'Two Lion',
      categoryId: catSteaming.id,
      subcategory: 'Industrial Iron',
      price: 0,
      images: [PH],
      shortDescription: 'A Two Lion brand 1600W industrial gravity-feed steam iron for professional garment pressing and finishing. Delivers powerful, consistent steam output for crisp, wrinkle-free results.',
      description: `The Two Lion Industrial Steaming Iron operates at 1600W on a 220V supply with a gravity-feed water tank that supplies continuous steam to the iron during pressing. This setup allows extended pressing sessions without the need to refill a small onboard tank frequently.

Industrial steam irons deliver far more steam volume than domestic irons, enabling professional-quality pressing results on thick fabrics, tailored seams, and structured garments. The Two Lion brand is a recognised supplier of industrial sewing and pressing equipment in Nigerian markets.

This iron is used in tailoring workshops, garment factories, and dry-cleaning businesses for efficient and consistent garment finishing.`,
      features: [
        '1600W heating element for powerful industrial pressing performance',
        '220V power supply compatible with Nigerian workshop electrical standards',
        'Gravity-feed water tank for continuous steam output during pressing',
        'Professional-grade steam volume for pressing thick fabrics and seams',
        'Non-stick or stainless steel soleplate for smooth fabric contact',
        'Suitable for tailoring, garment factories, and dry-cleaning finishing',
      ],
      specifications: {
        'Power': '1600W',
        'Voltage': '220V',
        'Water Supply': 'Gravity-feed external tank',
        'Steam Output': 'Continuous industrial-grade',
        'Soleplate': 'Non-stick or stainless steel',
        'Brand': 'Two Lion',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['two lion', 'industrial iron', 'steam iron', '1600w', 'gravity feed', 'garment pressing', 'finishing', 'tailoring', '220v'],
    },

    {
      name: 'Juki 750W Industrial Steam Iron',
      slug: 'juki-750w-industrial-steam-iron',
      brand: 'Juki',
      categoryId: catSteaming.id,
      subcategory: 'Industrial Iron',
      price: 0,
      images: [PH],
      shortDescription: 'A Juki brand 750W industrial steam iron for professional garment pressing and seam finishing. Juki is a globally respected brand known for precise, reliable sewing and pressing equipment.',
      description: `The 750W Juki Industrial Steaming Iron is a professional pressing tool from Juki, one of Japan's most respected sewing and industrial equipment manufacturers. At 750W, this iron delivers focused, consistent steam heat suitable for precise seam pressing, lapel shaping, and garment finishing in tailoring workshops.

Juki industrial irons are designed for durability and consistent performance under daily workshop use. The steam output and soleplate temperature are carefully calibrated for professional garment work across wool, cotton, polyester, and blended fabrics.

Its association with the Juki brand provides tailors with confidence in build quality and after-sale support.`,
      features: [
        '750W industrial iron from Juki, a globally trusted sewing equipment brand',
        'Consistent, focused steam output for professional seam and garment pressing',
        'Suitable for wool, cotton, polyester, silk, and blended fabric types',
        'Precision soleplate temperature for delicate and heavy fabric pressing',
        'Durable construction for sustained daily workshop use',
        'Compatible with gravity-feed or steam boiler station setups',
      ],
      specifications: {
        'Power': '750W',
        'Brand': 'Juki',
        'Fabric Compatibility': 'Wool, cotton, polyester, silk, blended',
        'Setup': 'Compatible with gravity-feed or steam boiler',
        'Use': 'Professional tailoring and garment finishing',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['juki', 'industrial iron', 'steam iron', '750w', 'garment pressing', 'seam finishing', 'tailoring', 'professional'],
    },

    {
      name: 'Solar-Powered Pressing Iron',
      slug: 'solar-powered-pressing-iron',
      brand: 'Generic',
      categoryId: catSteaming.id,
      subcategory: 'Solar Iron',
      price: 0,
      images: [PH],
      shortDescription: 'A solar-powered electric iron that operates using energy from solar panels, offering a sustainable pressing solution for areas with unreliable grid electricity. Practical for off-grid tailoring operations.',
      description: `The Solar Iron is designed to operate on DC power generated by solar panels, making it an ideal pressing tool for Nigerian tailors and garment workers in locations where grid electricity is unreliable or unavailable. It connects to a solar power setup or battery storage system and heats to pressing temperatures comparable to standard domestic irons.

Solar irons are particularly valuable during frequent power outages that disrupt tailoring operations, allowing work to continue uninterrupted. The iron is typically lightweight with adjustable temperature settings for use on different fabric types.

It represents an eco-friendly and practical alternative to gas irons for tailors transitioning to sustainable energy solutions.`,
      features: [
        'Operates on DC solar power for off-grid and power-outage resilience',
        'Adjustable temperature control for different fabric types',
        'Comparable pressing performance to standard domestic electric irons',
        'Sustainable, low-cost energy solution for Nigerian tailoring workshops',
        'Lightweight design suitable for field and remote use',
        'Compatible with solar battery storage systems for cloudy day use',
      ],
      specifications: {
        'Power Source': 'DC solar power',
        'Temperature': 'Adjustable',
        'Ideal For': 'Off-grid workshops, power outage areas',
        'Compatibility': 'Solar panels and battery storage systems',
        'Advantage': 'Electricity-free pressing',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['solar iron', 'solar powered', 'electric iron', 'off-grid', 'garment pressing', 'sustainable', 'power outage', 'tailoring'],
    },

    {
      name: 'Gas Pressing Iron',
      slug: 'gas-pressing-iron',
      brand: 'Generic',
      categoryId: catSteaming.id,
      subcategory: 'Gas Iron',
      price: 0,
      images: [PH],
      shortDescription: 'A gas-heated pressing iron that operates on bottled gas without requiring any electricity. An essential backup pressing tool for tailors in areas with frequent power outages.',
      description: `The Gas Iron is a traditional pressing iron heated by a small gas flame from a butane or propane canister, requiring no electricity to operate. It has been used for decades in Nigerian tailoring workshops as a reliable backup to electric irons during power outages.

The iron heats quickly to pressing temperature and maintains consistent heat during use, making it effective for pressing seams, hems, and garment panels on cotton, linen, and blended fabrics. The iron is self-contained with a gas canister attached directly to the iron body.

It is simple to operate and widely available in Nigerian markets. While requiring care in handling the gas supply, it provides dependable pressing capability in any environment.`,
      features: [
        'Gas-flame heating operates completely without electricity',
        'Quick heat-up time for efficient pressing during power outages',
        'Compatible with standard butane or propane gas canisters',
        'Suitable for pressing cotton, linen, wool, and blended fabrics',
        'Self-contained design with integrated gas attachment',
        'Proven and widely used pressing solution in Nigerian tailoring workshops',
      ],
      specifications: {
        'Fuel': 'Butane or propane gas canister',
        'Electricity Required': 'None',
        'Heat-Up Time': 'Quick',
        'Fabric Suitability': 'Cotton, linen, wool, blended',
        'Ideal For': 'Power outage backup pressing',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: null,
      tags: ['gas iron', 'gas powered', 'pressing iron', 'no electricity', 'power outage', 'tailoring', 'garment pressing', 'butane'],
    },

    {
      name: 'Heavy Industrial Gas Iron (2.6kg / 3kg)',
      slug: 'industrial-gas-iron-heavy',
      brand: 'Generic',
      categoryId: catSteaming.id,
      subcategory: 'Gas Iron',
      price: 0,
      images: [PH],
      shortDescription: 'Heavy-duty industrial gas irons available in 2.6kg and 3kg weights for professional garment pressing and fabric smoothing. Greater mass provides superior pressing force on thick and structured fabrics.',
      description: `These heavy-duty industrial gas irons are available in 2.6kg and 3kg weight options, providing the pressing force needed to handle thick fabrics, structured tailored garments, and multi-layer seams effectively. The greater mass of industrial gas irons means less physical effort is needed from the operator to achieve smooth, crisp pressing results, as the iron's own weight contributes to the pressing pressure.

They are gas-powered for electricity-free operation and are particularly valued in Nigerian workshops for use during power outages. Industrial gas irons are commonly used by professional tailors working on suits, thick linen, denim, and traditional Nigerian fabrics such as aso-oke and guinea brocade.

The heavier weight also helps in shaping structured garment components.`,
      features: [
        'Available in 2.6kg and 3kg weight options for different pressing needs',
        'Heavy mass provides superior pressing force without extra operator effort',
        'Gas-powered for electricity-free operation during power outages',
        'Effective on thick fabrics: suits, denim, aso-oke, and guinea brocade',
        'Cast iron or heavy-duty soleplate for maximum heat retention',
        'Standard gas canister connection for easy refueling',
      ],
      specifications: {
        'Available Weights': '2.6kg and 3kg',
        'Fuel': 'Butane or propane gas canister',
        'Electricity Required': 'None',
        'Soleplate': 'Cast iron or heavy-duty steel',
        'Ideal For': 'Suits, structured garments, traditional fabrics',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: null,
      tags: ['industrial gas iron', 'gas iron', '2.6kg', '3kg', 'heavy duty', 'pressing iron', 'no electricity', 'suit pressing', 'tailoring'],
    },

    {
      name: 'Sokany Professional Industrial Steam Iron',
      slug: 'sokany-industrial-steam-iron',
      brand: 'Sokany',
      categoryId: catSteaming.id,
      subcategory: 'Industrial Iron',
      price: 0,
      images: [PH],
      shortDescription: 'A Sokany brand industrial electric steam iron built for professional garment pressing and finishing. Sokany offers affordable industrial-grade pressing tools popular in Nigerian markets.',
      description: `The Sokany Industrial Iron is an electrically powered professional steam iron from the Sokany brand, which offers a range of affordable industrial-quality home and workshop appliances in Nigerian and West African markets. It delivers substantial steam output and pressing temperature for professional garment finishing, including seam pressing, collar and cuff shaping, and full garment smoothing.

The soleplate is designed for even heat distribution to prevent scorching, and the steam vents provide consistent moisture delivery during pressing. Sokany's industrial irons are popular with tailors looking for a cost-effective electric pressing solution.

The iron is suitable for regular workshop use on cotton, polyester, silk, and blended fabrics.`,
      features: [
        'Sokany brand industrial-grade electric steam iron for professional pressing',
        'High wattage for fast heat-up and sustained pressing temperature',
        'Even heat distribution soleplate to prevent fabric scorching',
        'Multiple steam vent design for consistent moisture delivery',
        'Suitable for cotton, polyester, silk, linen, and blended fabrics',
        'Affordable professional pressing solution widely available in Nigeria',
      ],
      specifications: {
        'Brand': 'Sokany',
        'Operation': 'Electric steam iron',
        'Soleplate': 'Even heat distribution design',
        'Steam Vents': 'Multiple',
        'Fabric Range': 'Cotton, polyester, silk, linen, blended',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['sokany', 'industrial iron', 'steam iron', 'electric iron', 'garment pressing', 'finishing', 'tailoring', 'affordable'],
    },

    {
      name: 'Double Pipe Standing Garment Steamer',
      slug: 'double-pipe-standing-garment-steamer',
      brand: 'Generic',
      categoryId: catSteaming.id,
      subcategory: 'Garment Steamer',
      price: 0,
      images: [PH],
      shortDescription: 'A dual-pipe upright garment steamer that delivers steam from two steam heads simultaneously for faster garment steaming and de-wrinkling. Ideal for high-volume garment finishing in fashion boutiques and production rooms.',
      description: `The Double Pipe Standing Garment Steamer is an upright garment care appliance featuring two steam hoses and steam heads that operate simultaneously, allowing faster steaming of garments compared to single-head units. The standing design includes a vertical garment hanging pole so clothes can be steamed in place without a separate hanger or ironing board.

The dual steam heads allow two areas of a garment to be steamed at once, or two operators to work on different garments from the same steam generator. It is used in fashion boutiques, garment finishing rooms, and textile retail stores for removing wrinkles, refreshing fabric, and preparing garments for display or delivery.

The large water reservoir supports extended steaming sessions.`,
      features: [
        'Dual steam pipes and steam heads for simultaneous two-point steaming',
        'Upright standing design with integrated garment hanging pole',
        'Large water reservoir for extended steaming sessions without refilling',
        'Faster garment finishing compared to single-pipe steamers',
        'Gentle steam suitable for delicate fabrics, suits, and structured garments',
        'Suitable for boutiques, finishing rooms, and garment retail display preparation',
      ],
      specifications: {
        'Steam Heads': '2 (dual pipe)',
        'Design': 'Upright standing with hanging pole',
        'Water Reservoir': 'Large capacity',
        'Ideal For': 'Fashion boutiques, finishing rooms',
        'Fabric Suitability': 'Delicate fabrics, suits, structured garments',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['garment steamer', 'double pipe', 'standing steamer', 'upright steamer', 'steam', 'garment finishing', 'de-wrinkling', 'boutique', 'fashion'],
    },

    {
      name: 'Standing Garment Steamer',
      slug: 'standing-garment-steamer',
      brand: 'Generic',
      categoryId: catSteaming.id,
      subcategory: 'Garment Steamer',
      price: 0,
      images: [PH],
      shortDescription: 'A single upright garment steamer for quickly removing wrinkles from clothing without an ironing board. Gentle on delicate fabrics and convenient for boutiques, tailoring shops, and home use.',
      description: `The Standing Garment Steamer is a vertical steam appliance designed to hang and steam garments in an upright position, removing wrinkles and refreshing fabric without the need for an ironing board. It is gentler than pressing irons on delicate fabrics such as silk, chiffon, and beaded garments, making it ideal for finishing tailored outfits and boutique display pieces.

The standing frame holds the steam hose and wand at working height, while the integrated hanging pole keeps the garment in place during steaming. It heats up quickly and is easy to use, requiring only water and a power outlet.

This is a standard finishing tool in Nigerian fashion boutiques, event halls, and tailoring workshops.`,
      features: [
        'Upright standing design with integrated garment hanging pole',
        'Gentle steam removes wrinkles without pressing or ironing board',
        'Safe for delicate fabrics including silk, chiffon, and beaded garments',
        'Quick heat-up time for efficient garment finishing',
        'Suitable for tailoring workshops, boutiques, and home use',
        'Continuous steam from handheld steam wand for targeted wrinkle removal',
      ],
      specifications: {
        'Design': 'Upright standing with hanging pole',
        'Steam Delivery': 'Handheld steam wand',
        'Fabric Safety': 'Gentle — suitable for delicate fabrics',
        'Heat-Up': 'Quick',
        'Ideal For': 'Boutiques, tailoring workshops, home use',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['garment steamer', 'standing steamer', 'upright steamer', 'steam', 'wrinkle removal', 'garment finishing', 'boutique', 'tailoring', 'delicate fabric'],
    },

    // ═══════════════════════════════════════════════════════════════════════
    //  DISPLAY & ACCESSORIES — BATCH 2 ADDITIONS
    // ═══════════════════════════════════════════════════════════════════════
    {
      name: 'BBL Full Pinnable Female Mannequin',
      slug: 'bbl-pinnable-female-mannequin',
      brand: 'Generic',
      categoryId: catDisplay.id,
      subcategory: 'Full Body',
      price: 0,
      images: [PH],
      shortDescription: 'A BBL-style full-body female mannequin with enhanced curves for displaying fashion garments. Fully pinnable surface allows tailors to pin garments directly onto the form for fitting and adjustment.',
      description: `The BBL Full Pinnable Female Mannequin is a full-body dress form designed with Brazilian Butt Lift (BBL) enhanced curves — including a fuller bust, narrow waist, pronounced hips, and rounded buttocks — reflecting the body proportions popular in contemporary Nigerian and West African fashion.

The mannequin is constructed with a pinnable foam or padded surface, allowing tailors to pin garments, seams, and adjustments directly onto the form during pattern fitting and garment construction. It is used in fashion boutiques for garment display and in tailoring workshops for fitting and draping.

The enhanced proportions make it ideal for designing and fitting form-fitting dresses, ankara outfits, and evening wear tailored to curvier body types.`,
      features: [
        'BBL enhanced curves: full bust, narrow waist, pronounced hips, and rounded buttocks',
        'Fully pinnable surface for attaching and adjusting garments during fitting',
        'Suitable for displaying and fitting form-fitting dresses and fashion garments',
        'Ideal for Nigerian and West African fashion styles reflecting curvier proportions',
        'Sturdy base for stable standing in boutique and workshop environments',
        'Used for draping, pattern adjustment, garment display, and retail presentation',
      ],
      specifications: {
        'Style': 'BBL (enhanced curves)',
        'Surface': 'Fully pinnable foam/padded',
        'Use Cases': 'Garment fitting, draping, retail display',
        'Base': 'Sturdy standing base',
        'Ideal For': 'Nigerian/West African fashion proportions',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: null,
      tags: ['mannequin', 'bbl', 'female mannequin', 'pinnable', 'dress form', 'fashion display', 'tailoring', 'boutique', 'curvy mannequin'],
    },

    {
      name: 'Garment Cloth Rack / Hanging Rail',
      slug: 'garment-cloth-rack-hanging-rail',
      brand: 'Generic',
      categoryId: catDisplay.id,
      subcategory: 'Display Fixture',
      price: 0,
      images: [PH],
      shortDescription: 'A garment hanging rail for organizing and displaying clothing in tailoring workshops, boutiques, and storage rooms. Available in freestanding configuration for flexible use.',
      description: `The Cloth Rack, also known as a garment hanging rail, is a practical storage and display fixture used in tailoring workshops, fashion boutiques, and clothing stores to hang finished garments, work-in-progress pieces, and inventory. It keeps garments off the floor, wrinkle-free, and easily accessible.

Freestanding rails on wheels are popular for flexibility in boutique layouts and market display setups. The rail is typically made from metal tubing with adjustable height options and a hanging bar for standard hangers.

In Nigerian fashion businesses, garment racks are essential for managing multiple client orders simultaneously and maintaining an organised, professional workspace.`,
      features: [
        'Sturdy metal construction for hanging multiple garments without sagging',
        'Freestanding design with optional wheels for mobility',
        'Adjustable height to accommodate different garment lengths',
        'Compatible with standard wire, wooden, and velvet hangers',
        'Essential for organising tailoring orders and boutique inventory',
        'Easy assembly and disassembly for transport and market display',
      ],
      specifications: {
        'Material': 'Metal tubing',
        'Design': 'Freestanding (wheeled option)',
        'Height': 'Adjustable',
        'Hanger Compatibility': 'Wire, wooden, velvet',
        'Ideal For': 'Tailoring workshops, boutiques, market display',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: null,
      tags: ['cloth rack', 'garment rack', 'hanging rail', 'display rail', 'boutique', 'tailoring', 'storage', 'clothing display', 'workshop organization'],
    },

    {
      name: 'Wooden Clothes Hangers (1 Pack)',
      slug: 'wooden-hangers-pack',
      brand: 'Generic',
      categoryId: catDisplay.id,
      subcategory: 'Display Accessories',
      price: 0,
      images: [PH],
      shortDescription: 'A pack of quality wooden clothes hangers for hanging and displaying garments in tailoring workshops and boutiques. Wooden hangers preserve garment shape better than wire alternatives.',
      description: `This pack of wooden clothes hangers provides an essential organisational and display tool for tailoring workshops, fashion boutiques, and clothing stores. Wooden hangers are preferred over wire or plastic alternatives because their contoured shoulders support and preserve the natural shape of garments, particularly structured jackets, suits, and dresses.

They add a professional and premium aesthetic to boutique displays, signalling quality to clients viewing displayed garments. The hangers in this pack are typically made from solid or engineered wood with a smooth finish and a chrome or natural wood hook.

They are suitable for all fabric types and garment weights, from lightweight silk to heavy winter coats.`,
      features: [
        'Solid or engineered wood construction for durability and garment support',
        'Contoured shoulder design preserves natural garment shape',
        'Chrome or natural wood hook for smooth rail hanging',
        'Professional appearance suitable for boutique client display',
        'Suitable for all fabric types from lightweight to heavy garments',
        'Pack quantity provides sufficient supply for workshop or boutique use',
      ],
      specifications: {
        'Material': 'Solid or engineered wood',
        'Hook': 'Chrome or natural wood',
        'Shoulder Design': 'Contoured for garment shape',
        'Sold As': '1 pack',
        'Ideal For': 'Boutiques, tailoring workshops, garment display',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: null,
      tags: ['wooden hangers', 'clothes hangers', 'garment display', 'boutique', 'tailoring', 'workshop organization', 'clothing storage', 'pack'],
    },

    // ═══════════════════════════════════════════════════════════════════════
    //  ACCESSORIES & TOOLS
    // ═══════════════════════════════════════════════════════════════════════
    {
      name: 'Electric Carving Machine for Fabric & Leather',
      slug: 'electric-carving-machine',
      brand: 'Generic',
      categoryId: catTools.id,
      subcategory: 'Workshop Tool',
      price: 0,
      images: [PH],
      shortDescription: 'An electric carving machine used in the Nigerian garment and leathercraft industry to create textured, embossed, or decorative patterns on fabric and leather surfaces. Adds artistic depth and design to finished products.',
      description: `The Carving Machine is an electrically powered tool used in garment making and leather crafting to engrave, carve, or texture surfaces with decorative patterns. In the Nigerian tailoring industry, it is commonly used to create raised or recessed designs on leather bags, shoes, belts, and fabric panels for fashion garments.

The machine uses interchangeable carving tips or dies and applies controlled heat or pressure to transfer designs into the material surface. It is widely used by fashion designers seeking to differentiate their products with unique surface treatments.

The carving machine bridges the gap between functional sewing and decorative artistry in professional workshops.`,
      features: [
        'Electric-powered carving mechanism for fabric and leather surface decoration',
        'Interchangeable carving tips for different design patterns',
        'Suitable for leather, PU, fabric, and some synthetic materials',
        'Controlled heat or pressure application for precise pattern transfer',
        'Used for creating embossed, textured, and engraved surface designs',
        'Compact design suitable for professional workshop and studio use',
      ],
      specifications: {
        'Operation': 'Electric',
        'Tips': 'Interchangeable carving tips',
        'Materials': 'Leather, PU, fabric, synthetic',
        'Output': 'Embossed, textured, engraved patterns',
        'Ideal For': 'Fashion designers, leathercraft workshops',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['carving machine', 'leather carving', 'fabric carving', 'embossing', 'decorative', 'leathercraft', 'fashion design', 'texture', 'workshop tool'],
    },

    {
      name: 'Industrial Sewing Machine LED Lamp',
      slug: 'industrial-machine-led-lamp',
      brand: 'Generic',
      categoryId: catTools.id,
      subcategory: 'Machine Accessory',
      price: 0,
      images: [PH],
      shortDescription: 'An LED lamp designed to mount on industrial sewing machines to illuminate the needle and sewing area. Improves stitch accuracy and reduces eye strain during prolonged sewing sessions.',
      description: `The Industrial Machine Lamp is a purpose-built LED light fixture designed to attach directly to industrial sewing machine heads, providing bright, focused illumination of the needle area, presser foot, and fabric during sewing. Good task lighting is critical in tailoring workshops where detailed stitching accuracy is required, and overhead workshop lights rarely provide sufficient illumination directly at the sewing point.

The LED design is energy-efficient, generates minimal heat, and provides a long service life. Most models attach via a magnetic base or clamp and connect to the machine's power supply or a separate socket.

Bright, consistent needle-area lighting significantly improves stitch quality and reduces operator eye strain during long production runs.`,
      features: [
        'LED illumination focused on the needle and sewing area for precision work',
        'Magnetic or clamp-mount attachment compatible with industrial machine heads',
        'Energy-efficient LED technology with long service life',
        'Minimal heat generation compared to traditional incandescent machine lamps',
        'Reduces eye strain during prolonged sewing sessions',
        'Compatible with most industrial lockstitch and overlock machines',
      ],
      specifications: {
        'Light Type': 'LED',
        'Mounting': 'Magnetic or clamp',
        'Power': 'Machine supply or separate socket',
        'Compatibility': 'Industrial lockstitch and overlock machines',
        'Benefit': 'Reduces eye strain, improves stitch accuracy',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['machine lamp', 'industrial lamp', 'led', 'sewing machine light', 'needle light', 'tailoring', 'workshop lighting', 'sewing accessories'],
    },

    {
      name: 'Industrial Sewing Machine Presser Foot',
      slug: 'industrial-presser-foot',
      brand: 'Generic',
      categoryId: catTools.id,
      subcategory: 'Machine Accessory',
      price: 0,
      images: [PH],
      shortDescription: 'An industrial sewing machine presser foot attachment for specialised sewing tasks. Presser feet control fabric feeding and enable specific stitch types and techniques on industrial machines.',
      description: `The Industrial Machine Foot, also called a presser foot, is a metal attachment that clamps below the needle on an industrial sewing machine to hold fabric in position during sewing and guide it through the feed mechanism. Different presser foot designs are used for different sewing tasks: zipper feet for inserting zippers, roller feet for sewing leather or vinyl without sticking, binding feet for attaching bias tape, and walking feet for even advancement of thick or layered materials.

Having the correct presser foot for a specific sewing application significantly improves stitch quality, fabric control, and production speed. Industrial presser feet are made from hardened metal for durability under continuous production conditions.`,
      features: [
        'Industrial-grade metal construction for durability under continuous use',
        'Compatible with standard industrial sewing machine foot attachment systems',
        'Available in various configurations for different sewing applications',
        'Improves stitch quality and fabric control for specialised sewing tasks',
        'Examples include zipper, roller, walking, and binding foot types',
        'Essential accessory for expanding industrial machine sewing capabilities',
      ],
      specifications: {
        'Material': 'Hardened metal',
        'Compatibility': 'Standard industrial machine foot attachment',
        'Types Available': 'Zipper, roller, walking, binding, and more',
        'Ideal For': 'Specialised sewing tasks on industrial machines',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: null,
      tags: ['presser foot', 'machine foot', 'industrial sewing machine', 'sewing accessory', 'zipper foot', 'walking foot', 'roller foot', 'tailoring', 'sewing tools'],
    },

    {
      name: 'Pattern Making Rulers Set',
      slug: 'pattern-making-rulers-set',
      brand: 'Generic',
      categoryId: catTools.id,
      subcategory: 'Pattern Making',
      price: 0,
      images: [PH],
      shortDescription: 'A professional set of pattern-making rulers and curved guides for accurate garment pattern construction and alteration. Essential tools for tailors, fashion designers, and dressmakers.',
      description: `The Set of Rulers for pattern making typically includes a combination of straight rulers, L-squares, curved hip curves, French curves, and tailor's measuring rulers used in garment pattern drafting and alteration. These tools allow tailors and fashion designers to accurately draw and transfer garment patterns, measure seam allowances, create curved seams, and alter existing patterns to different sizes.

The rulers are commonly made from transparent acrylic or durable plastic with clear printed measurements in centimetres and inches. Pattern making rulers are foundational tools in fashion design education and professional tailoring practice.

A complete set ensures the tailor has the right curve or straight edge for every pattern drafting need.`,
      features: [
        'Complete set including straight ruler, L-square, hip curve, and French curves',
        'Transparent acrylic or durable plastic construction with clear measurement markings',
        'Dual-unit measurements in centimetres and inches',
        'Essential for pattern drafting, seam allowance marking, and garment alteration',
        'Curved guides for accurate bodice, sleeve, and trouser pattern curves',
        'Suitable for tailoring students, fashion designers, and professional dressmakers',
      ],
      specifications: {
        'Set Contents': 'Straight ruler, L-square, hip curve, French curves',
        'Material': 'Transparent acrylic or durable plastic',
        'Measurements': 'Centimetres and inches',
        'Ideal For': 'Pattern drafting, garment alteration, fashion design',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: null,
      tags: ['ruler set', 'pattern making', 'tailoring rulers', 'french curve', 'l-square', 'hip curve', 'garment pattern', 'fashion design', 'sewing tools'],
    },

    {
      name: 'Sewing Tool Cover / Organizer',
      slug: 'sewing-tool-cover-organizer',
      brand: 'Generic',
      categoryId: catTools.id,
      subcategory: 'Workshop Organizer',
      price: 0,
      images: [PH],
      shortDescription: 'A cover or organizer designed to protect and store sewing tools and accessories neatly in a tailoring workshop. Keeps essential tools organized and within easy reach during sewing sessions.',
      description: `The TV Guide or Sewing Tool Cover is a fabric or plastic organiser used in tailoring workshops to store and protect frequently used sewing tools such as scissors, measuring tape, seam rippers, thimbles, pins, and other small accessories.

The term 'TV Guide cover' in the Nigerian tailoring trade refers to a slim, multi-pocket organiser that resembles the format of a small booklet or guide, offering multiple compartments for different tool types. Keeping tools organised in a designated cover reduces time lost searching for tools and protects delicate instruments from damage.

It is a simple but practical accessory that contributes to a more efficient and organised sewing workspace.`,
      features: [
        'Multiple pockets and compartments for organised sewing tool storage',
        'Protects scissors, measuring tape, seam rippers, and small accessories',
        'Compact design that keeps essential tools within easy reach',
        'Fabric or durable plastic construction for workshop longevity',
        'Reduces time lost searching for tools during sewing sessions',
        'Lightweight and portable for use at different workstations',
      ],
      specifications: {
        'Material': 'Fabric or durable plastic',
        'Storage': 'Multiple pockets and compartments',
        'Tools Accommodated': 'Scissors, tape measure, seam ripper, thimble, pins',
        'Design': 'Compact, portable',
        'Ideal For': 'Tailoring workshops, sewing stations',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: null,
      tags: ['sewing tool cover', 'tool organizer', 'tailoring accessories', 'workshop organization', 'scissor holder', 'sewing tools', 'storage', 'sewing kit'],
    },

    {
      name: 'LED Track Light Set (3 Units)',
      slug: 'led-track-light-3-set',
      brand: 'Generic',
      categoryId: catTools.id,
      subcategory: 'Workshop Lighting',
      price: 0,
      images: [PH],
      shortDescription: 'A set of three LED track lighting units for professionally illuminating tailoring workshops, fashion boutiques, and retail display areas. Provides bright, directional light to improve workspace visibility and product presentation.',
      description: `The Full Set Track Light consists of three LED track lighting units mounted on a track rail system, designed to provide bright, directional, and adjustable illumination in tailoring workshops, fashion showrooms, and retail boutiques. Track lighting allows each light head to be independently angled to illuminate specific work areas, display racks, mannequins, or sewing stations as needed.

LED technology ensures energy efficiency, long bulb life, and minimal heat output compared to traditional halogen track lights. Good workshop and display lighting is essential for accurate colour matching in fabric selection, precise stitch quality inspection, and an attractive retail presentation environment.

Three track light sets provide sufficient coverage for a standard-size tailoring workshop or boutique floor.`,
      features: [
        '3-set LED track light system for comprehensive workshop or boutique illumination',
        'Adjustable and rotatable light heads for directional lighting control',
        'Energy-efficient LED technology with long service life',
        'Bright, consistent light output for accurate colour matching and stitch inspection',
        'Suitable for workshops, showrooms, display areas, and retail boutiques',
        'Track rail system for flexible positioning along ceiling or wall mounts',
      ],
      specifications: {
        'Units': '3 LED track lights',
        'Light Type': 'LED',
        'Mounting': 'Track rail system (ceiling or wall)',
        'Adjustment': 'Rotatable light heads',
        'Ideal For': 'Workshops, boutiques, showrooms',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['track light', 'led track lighting', 'workshop lighting', 'boutique lighting', 'tailoring', 'fashion showroom', 'display lighting', '3 sets', 'energy efficient'],
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

  console.log(`\n✅ Upserted ${products.length} products across 13 categories.\n`);

  // ── PRICE UPDATES (existing products) ─────────────────────────────────────
  console.log('Updating prices on existing products...\n');
  await prisma.product.update({
    where: { slug: 'emel-m2-direct-drive' },
    data: { price: 440000 },
  });
  console.log('  ✅ Emel M2 → ₦440,000');

  await prisma.product.update({
    where: { slug: 'two-lion-747-four-thread-overlock' },
    data: { price: 430000 },
  });
  console.log('  ✅ Two Lion 747 Four Thread → ₦430,000');

  console.log('\n🎉 Seeding complete!\n');

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
