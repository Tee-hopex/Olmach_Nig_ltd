import 'dotenv/config';
import { prisma } from '../lib/prisma';

const PH = 'https://placehold.co/800x600/111827/FFFFFF?text=Image+Coming+Soon';

async function main() {
  const catSteaming = await prisma.category.findUniqueOrThrow({ where: { slug: 'steaming-pressing' } });
  const catEmbroidery = await prisma.category.findUniqueOrThrow({ where: { slug: 'embroidery-machines' } });

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
