import 'dotenv/config';
import { prisma } from '../lib/prisma';

const PH = 'https://placehold.co/800x600/111827/FFFFFF?text=Image+Coming+Soon';

async function main() {
  const catSteaming = await prisma.category.findUniqueOrThrow({ where: { slug: 'steaming-pressing' } });
  const catEmbroidery = await prisma.category.findUniqueOrThrow({ where: { slug: 'embroidery-machines' } });
  const catIndustrial = await prisma.category.findUniqueOrThrow({ where: { slug: 'industrial-straight' } });

  const products = [
    {
      name: 'Jukae Industrial Steaming Iron',
      slug: 'jukae-1300w-industrial-steaming-iron',
      brand: 'Jukae',
      categoryId: catSteaming.id,
      subcategory: 'Steam Iron',
      price: 70000,
      images: [PH],
      shortDescription:
        'Jukae 1300W industrial steaming iron for fast, reliable garment pressing in tailoring shops and garment factories.',
      description: `The Jukae Industrial Steaming Iron is a heavy-duty pressing tool built for tailoring shops, garment factories, and laundry services that need dependable, all-day steam output. Its 1300W element heats quickly and recovers heat fast between passes, keeping production moving on busy work days.

Running on standard 220V mains power, it is compatible with the electrical setup found in virtually every Nigerian workshop. The larger soleplate and steady steam output make it well suited to setting seams, shaping collars, and pressing a wide range of fabrics.

Ideal for tailors, garment factories, and finishing rooms who need a rugged everyday iron without the added cost of a separate boiler system.`,
      features: [
        '1300W heating element for fast heat-up and steady recovery',
        'Runs on standard 220V mains power',
        'Large soleplate for even heat distribution',
        'Steady steam output for continuous professional pressing',
        'Suitable for cotton, wool, polyester, and blended fabrics',
        'Rugged construction built for daily workshop use',
      ],
      specifications: {
        'Brand': 'Jukae',
        'Power': '1300W',
        'Voltage': '220V',
        'Fabric Compatibility': 'Cotton, wool, polyester, blended fabrics',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['jukae', 'steam iron', 'industrial iron', '1300w', 'garment finishing', 'pressing', 'tailoring equipment'],
    },
    {
      name: 'Jukae 500/800 Monogram Machine',
      slug: 'jukae-500-800-monogram',
      brand: 'Jukae',
      categoryId: catEmbroidery.id,
      subcategory: 'Monogram',
      price: 0,
      images: [PH],
      shortDescription:
        'Jukae 500/800 single-head industrial monogram (embroidery) machine for producing logos, monograms, and decorative embroidery designs. Price on request.',
      description: `The Jukae 500/800 Monogram Machine is a single-head computerized embroidery machine with a 500mm × 800mm embroidery field — providing a generous working area for large logos, full garment-back designs, and multi-placement embroidery work.

With computer-controlled needle movement and a large hoop capacity, it suits fashion designers, school uniform businesses, and garment decorators producing branded clothing, personalised items, and embroidered workwear. The Jukae brand brings dependable industrial performance at a competitive price point.

Contact us for current pricing and availability.`,
      features: [
        '500×800mm embroidery field — large format for back designs and logos',
        'Single-head computerized embroidery for logos, monograms, and motifs',
        'Suitable for fashion designers, uniform businesses, and garment decorators',
        'Jukae brand industrial reliability in embroidery',
        'Compatible with standard embroidery design file formats',
      ],
      specifications: {
        'Brand': 'Jukae',
        'Embroidery Area': '500mm × 800mm',
        'Machine Type': 'Single-Head Computerized Monogram Machine',
        'Best For': 'Logos, monograms, garment decoration, uniform branding',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['jukae', '500/800', 'monogram', 'embroidery machine', 'industrial', 'logo', 'uniform branding'],
    },
    {
      name: 'Feed-off-the-arm chain stitch machine 927',
      slug: 'feed-off-the-arm-chain-stitch-927',
      brand: 'Generic',
      categoryId: catIndustrial.id,
      subcategory: 'Chain Stitch',
      price: 1750000,
      images: [PH],
      shortDescription:
        'Industrial double-needle feed-off-the-arm chain stitch machine (927 series) for creating strong, elastic lap seams on cylindrical garments.',
      description: `The 927 series Feed-off-the-arm Chain Stitch Machine is purpose-built for sewing tubular and cylindrical items like sleeves, pant legs, and armholes. Featuring a double-needle setup that produces two parallel rows of strong, elastic chain stitches, it ensures exceptional seam durability for shirts, jeans, and workwear.\n\nEquipped with a cantilever tubular arm, this machine prevents fabric twisting during sewing. The specialized tension mechanism reduces puckering, making it a reliable workhorse for any high-volume garment manufacturing facility.`,
      features: [
        'Feed-off-the-arm design for tubular garments',
        'Double-needle chain stitch (typically TVx5 or TVx64)',
        'High speed sewing (up to 4,000 SPM)',
        'Pucker prevention technology',
        'Ideal for shirts, jeans, and workwear',
      ],
      specifications: {
        'Machine Type': 'Feed-off-the-arm chain stitch',
        'Needles': '2',
        'Max Speed': '4,000 SPM',
        'Stitch Length': '1.2mm - 4.2mm',
      },
      inStock: true,
      stockCount: 5,
      isFeatured: false,
      isBestSeller: false,
      isNew: true,
      badge: 'New',
      warranty: '1 Year Warranty',
      tags: ['feed-off-the-arm', 'chain stitch', '927', 'industrial', 'garment manufacturing'],
    },
    {
      name: 'Yamata Single-Head Monogram Machine (SD-B1201)',
      slug: 'yamata-single-head-monogram-sdb1201',
      brand: 'Yamata',
      categoryId: catEmbroidery.id,
      subcategory: 'Monogram',
      price: 0,
      images: [PH],
      shortDescription:
        'Professional Yamata SD-B1201 12-needle, single-head computerized embroidery machine. Ideal for caps, shirts, and large-format designs. Price on request.',
      description: `The Yamata SD-B1201 is a highly efficient 12-needle, single-head computerized embroidery machine designed to bring professional textile customization to your business. Offering a versatile embroidery field, it easily accommodates large-format designs, making it perfect for jackets, uniform branding, caps, and shirts.\n\nFeaturing an intelligent 10-inch color touchscreen display, it supports automatic thread cutting, color change, and thread break detection. Its versatility allows seamless transitioning between flat, tubular, and cap embroidery.`,
      features: [
        '12 needles for multi-color embroidery without manual swaps',
        'Large embroidery area accommodating up to 500x1200mm frames',
        'High-definition 10-inch color touchscreen',
        'Automatic thread trimming and color change',
        'Suitable for flat, tubular, and cap embroidery',
      ],
      specifications: {
        'Brand': 'Yamata',
        'Model': 'SD-B1201',
        'Needles': '12',
        'Max Speed': '1,200 SPM',
        'Display': '10-inch Touchscreen',
      },
      inStock: true,
      stockCount: 1,
      isFeatured: false,
      isBestSeller: true,
      isNew: false,
      warranty: '1 Year Warranty',
      tags: ['yamata', 'monogram', 'embroidery machine', 'single-head', '12-needle', 'industrial'],
    },
    {
      name: 'Viola Single Head Monogram 500x800 mm',
      slug: 'viola-single-head-monogram-500x800',
      brand: 'Viola',
      categoryId: catEmbroidery.id,
      subcategory: 'Monogram',
      price: 0,
      images: [PH],
      shortDescription:
        'Heavy-duty Viola single-head monogram machine featuring a massive 500x800mm embroidery area, perfect for agbadas and large garments. Price on request.',
      description: `The Viola Single Head Monogram Machine is an industrial-grade computerized embroidery powerhouse built for large-format designs. With an impressive 500x800mm working area, it is the machine of choice for intricate embroidery on agbadas, oversized garments, and bulk uniform orders in Nigerian fashion hubs.\n\nOperating at speeds up to 1,200 stitches per minute, it maximizes production efficiency. It boasts automatic thread trimming, smart thread break detection, and a user-friendly touchscreen interface for precise design control.`,
      features: [
        'Massive 500x800mm working area ideal for agbada embroidery',
        'High-speed operation up to 1,200 SPM',
        'Multi-needle configuration for complex designs',
        'Automatic thread trimming and color changing',
        'Heavy-duty steel stand with mobility wheels',
      ],
      specifications: {
        'Brand': 'Viola',
        'Embroidery Area': '500mm x 800mm',
        'Machine Type': 'Single Head Computerized',
        'Best For': 'Agbadas, large garments, uniform branding',
      },
      inStock: true,
      stockCount: 2,
      isFeatured: true,
      isBestSeller: false,
      isNew: true,
      badge: 'Featured',
      warranty: '1 Year Warranty',
      tags: ['viola', 'monogram', 'embroidery machine', '500x800mm', 'agbada', 'single-head'],
    },
  ];

  for (const p of products) {
    const saved = await prisma.product.upsert({
      where: { slug: p.slug },
      update: { ...p },
      create: { ...p },
    });
    console.log(`  ✅ ${saved.name} (${saved.slug})`);
  }

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  prisma.$disconnect();
  process.exit(1);
});
