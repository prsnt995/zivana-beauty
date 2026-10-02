// ZIVANA — Premium Beauty & Cosmetics Mock Database
// Parent Company: NOEUL ENTERPRISES

export const INITIAL_PRODUCTS = [
  {
    id: "ziv-001",
    sku: "ZIV-SK-001",
    name: "Kashmiri Saffron & Kumkumadi Glow Serum",
    brand: "ZIVANA",
    category: "Skincare",
    price: 2450,
    originalPrice: 2950,
    discountPercent: 17,
    rating: 4.9,
    reviewsCount: 142,
    stock: 45,
    isBestSeller: true,
    isNewArrival: false,
    isLimited: true,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1608248597261-125916056b6b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800"
    ],
    description: "An elixir of pure Kashmiri Saffron (Kesar), 26 potent Ayurvedic herbs, and pure Rosehip seed oil. Formulated specifically to brighten hyperpigmentation, smooth fine lines, and impart a radiant glass-skin glow for Indian skin tones.",
    keyBenefits: [
      "Visibly reduces dark spots & pigmentation in 14 days",
      "Enhances natural skin luminosity and texture",
      "Deeply hydrates without feeling greasy or heavy",
      "Non-comedogenic, 100% dermatologically tested"
    ],
    ingredients: [
      "Pure Kashmiri Saffron (Crocus Sativus)",
      "Kumkumadi Tailam Extract",
      "Cold-pressed Rosehip Oil",
      "Licorice Root Extract",
      "Vitamin C (3-O-Ethyl Ascorbic Acid)",
      "Bakuchiol Natural Retinol Alternative"
    ],
    howToUse: "Apply 3-4 drops onto clean, damp skin after cleansing. Gently press into face and neck using upward circular motions. Use morning and night prior to moisturizer.",
    productDetails: "Volume: 30 ml / 1.0 fl. oz. | Shelf Life: 24 Months | Formulated in India | Cruelty Free | Paraben & Sulfate Free",
    shippingInfo: "Ships within 24 hours. Free Express Pan-India Delivery on orders above ₹999. Estimated delivery 2-4 business days.",
    returnInfo: "Hassle-free 15-day easy returns & replacements for unopened products.",
    reviews: [
      {
        id: "rev-1",
        customerName: "Dr. Ananya Roy",
        rating: 5,
        date: "2026-08-14",
        comment: "Absolute holy grail! The texture is divine and the saffron aroma feels like a royal spa. My pigmentation faded significantly after 3 weeks.",
        productPurchased: "Kashmiri Saffron & Kumkumadi Glow Serum",
        verified: true
      },
      {
        id: "rev-2",
        customerName: "Priya Malhotra",
        rating: 5,
        date: "2026-09-02",
        comment: "Worth every single rupee! ZIVANA really delivered on luxury. Delivered to Mumbai in just 2 days.",
        productPurchased: "Kashmiri Saffron & Kumkumadi Glow Serum",
        verified: true
      }
    ]
  },
  {
    id: "ziv-002",
    sku: "ZIV-MK-002",
    name: "Velvet Matte Silk Lipstick — Royal Rose Wood",
    brand: "ZIVANA",
    category: "Makeup",
    price: 1290,
    originalPrice: 1550,
    discountPercent: 17,
    rating: 4.8,
    reviewsCount: 98,
    stock: 60,
    isBestSeller: true,
    isNewArrival: false,
    isLimited: false,
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A weightless velvet-matte formula infused with Hyaluronic Acid and Argan Oil. Provides intense 12-hour color payoff customized to complement warm Indian undertones.",
    keyBenefits: [
      "12-hour smudge-proof & transfer-resistant wear",
      "Hydrating core prevents lip feathering or drying",
      "One-swipe rich pigment pay-off",
      "Enriched with Vitamin E & Argan Oil"
    ],
    ingredients: [
      "Argania Spinosa (Argan) Kernel Oil",
      "Hyaluronic Acid Spheres",
      "Vitamin E Tocopherol",
      "Wild Rosehip Extract"
    ],
    howToUse: "Apply starting from the center of your upper lip towards the outer corners. Repeat on the bottom lip. Layer for deeper intensity.",
    productDetails: "Weight: 3.8g | Shade: Royal Rose Wood (Warm Nude Pink) | Cruelty-Free & Vegan",
    shippingInfo: "Pan-India delivery in 2-4 days. Free shipping above ₹999.",
    returnInfo: "15-Day unopened return guarantee.",
    reviews: [
      {
        id: "rev-3",
        customerName: "Meera Sen",
        rating: 5,
        date: "2026-09-10",
        comment: "This shade is perfection for Wheatish Indian skin tones! Doesn't dry out lips at all.",
        productPurchased: "Velvet Matte Silk Lipstick — Royal Rose Wood",
        verified: true
      }
    ]
  },
  {
    id: "ziv-003",
    sku: "ZIV-HC-003",
    name: "Bhringraj & Cold-Pressed Brahmi Hair Elixir",
    brand: "ZIVANA",
    category: "Haircare",
    price: 1850,
    originalPrice: 2200,
    discountPercent: 16,
    rating: 4.9,
    reviewsCount: 115,
    stock: 30,
    isBestSeller: true,
    isNewArrival: false,
    isLimited: false,
    images: [
      "https://images.unsplash.com/photo-1608248597261-125916056b6b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Traditional slow-brewed scalp therapy oil made with organic Bhringraj, Brahmi, Amla, and Coconut nectar. Strengthens hair roots, curbs hair fall, and restores scalp vitality.",
    keyBenefits: [
      "Reduces hair fall up to 85% with regular use",
      "Soothes dry, itchy scalp and controls dandruff",
      "Promotes thicker, lustrous hair growth",
      "100% natural, chemical-free cold-pressed oil"
    ],
    ingredients: [
      "Eclipta Alba (Bhringraj) Extract",
      "Bacopa Monnieri (Brahmi)",
      "Phyllanthus Emblica (Amla)",
      "Virgin Cold-Pressed Coconut Oil",
      "Sesame Seed Oil & Neem Leaf"
    ],
    howToUse: "Warm a small portion in your palms. Massage into hair roots using circular fingertip motions. Leave on for at least 1 hour or overnight before washing.",
    productDetails: "Volume: 200 ml / 6.76 fl. oz. | 100% Botanical Oil",
    shippingInfo: "Ships within 24 hours.",
    returnInfo: "15-day return policy.",
    reviews: [
      {
        id: "rev-4",
        customerName: "Kavita Reddy",
        rating: 5,
        date: "2026-08-28",
        comment: "My hair fall reduced after 4 uses. Smells so relaxing like authentic herbal therapies.",
        productPurchased: "Bhringraj & Cold-Pressed Brahmi Hair Elixir",
        verified: true
      }
    ]
  },
  {
    id: "ziv-004",
    sku: "ZIV-FG-004",
    name: "Oudh Royale & Royal Amber Eau de Parfum",
    brand: "ZIVANA",
    category: "Fragrance",
    price: 3800,
    originalPrice: 4500,
    discountPercent: 15,
    rating: 5.0,
    reviewsCount: 76,
    stock: 20,
    isBestSeller: false,
    isNewArrival: true,
    isLimited: true,
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A rich, regal fragrance blending Assam Agarwood Oudh, warm Amber, Kashmiri Cardamom, and Damask Rose. Designed to last over 16 hours with unforgettable sillage.",
    keyBenefits: [
      "Extrait de Parfum concentration (28% perfume oils)",
      "16+ hour long-lasting projection",
      "Handcrafted by French & Indian master perfumers",
      "Hypoallergenic on skin"
    ],
    ingredients: [
      "Assam Oudh Oil (Aquilaria Agallocha)",
      "Golden Amber Resin",
      "Kashmiri Green Cardamom",
      "Bulgarian & Damask Rose Absolute"
    ],
    howToUse: "Spray on pulse points: wrists, inner elbows, base of neck, and behind ears.",
    productDetails: "Volume: 100 ml / 3.4 fl. oz. | Gender Neutral Luxury Scent",
    shippingInfo: "Pan-India express shipping with protective gift packaging.",
    returnInfo: "15-day guarantee.",
    reviews: [
      {
        id: "rev-5",
        customerName: "Siddharth Verma",
        rating: 5,
        date: "2026-09-18",
        comment: "Extremely rich scent! People literally ask me what perfume I'm wearing everywhere I go.",
        productPurchased: "Oudh Royale & Royal Amber Eau de Parfum",
        verified: true
      }
    ]
  },
  {
    id: "ziv-005",
    sku: "ZIV-BC-005",
    name: "Kashmiri Rose & Sandalwood Body Butter",
    brand: "ZIVANA",
    category: "Body Care",
    price: 1450,
    originalPrice: 1790,
    discountPercent: 19,
    rating: 4.8,
    reviewsCount: 64,
    stock: 50,
    isBestSeller: true,
    isNewArrival: false,
    isLimited: false,
    images: [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Decadent whipping of Shea Butter, Mysore Sandalwood extract, and steam-distilled Rose water. Provides 48-hour deep nourishment without greasiness.",
    keyBenefits: [
      "48-Hour intensive moisture lock",
      "Smooths rough knees, elbows, and dry patches",
      "Leaves skin feeling velvety soft and scented with fresh rose",
      "Free of silicones, mineral oil, and parabens"
    ],
    ingredients: [
      "Raw African Shea Butter",
      "Pure Mysore Sandalwood Oil",
      "Steam-Distilled Damask Rose Hydrosol",
      "Sweet Almond Oil"
    ],
    howToUse: "Massage generously onto damp body after bath or shower. Pay special attention to dry areas like heels and elbows.",
    productDetails: "Net Wt: 200g / 7.05 oz.",
    shippingInfo: "Ships within 24 hours.",
    returnInfo: "15-day return policy.",
    reviews: []
  },
  {
    id: "ziv-006",
    sku: "ZIV-TL-006",
    name: "Rose Quartz Gua Sha & Facial Roller Set",
    brand: "ZIVANA",
    category: "Beauty Tools",
    price: 1990,
    originalPrice: 2490,
    discountPercent: 20,
    rating: 4.9,
    reviewsCount: 82,
    stock: 25,
    isBestSeller: false,
    isNewArrival: true,
    isLimited: true,
    images: [
      "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1608248597261-125916056b6b?auto=format&fit=crop&q=80&w=800"
    ],
    description: "100% authentic hand-carved Grade A Brazilian Rose Quartz stone set. Designed to boost lymphatic drainage, contour cheekbones, and relieve facial tension.",
    keyBenefits: [
      "Promotes circulation & natural skin glow",
      "Helps contour jawline and reduce puffiness",
      "Enhances absorption of serums & face oils",
      "Includes velvet storage pouch & instructional guide"
    ],
    ingredients: ["100% Natural Grade-A Rose Quartz Stone"],
    howToUse: "Apply facial oil or serum first. Gently sweep Gua Sha tool outwards from center of face toward hairline. Use roller under eyes and neck.",
    productDetails: "Set Includes: Heart Gua Sha + Dual Roller + Silk Storage Case",
    shippingInfo: "Pan-India delivery in 2-4 days.",
    returnInfo: "15-day return policy.",
    reviews: []
  },
  {
    id: "ziv-007",
    sku: "ZIV-SK-007",
    name: "Bakuchiol Age-Defying Night Cream",
    brand: "ZIVANA",
    category: "Skincare",
    price: 2150,
    originalPrice: 2600,
    discountPercent: 17,
    rating: 4.7,
    reviewsCount: 53,
    stock: 40,
    isBestSeller: false,
    isNewArrival: true,
    isLimited: false,
    images: [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Natural plant-based retinol alternative with Bakuchiol, Niacinamide (5%), and Peptides. Restores skin elasticity overnight without redness or peeling.",
    keyBenefits: [
      "Fights fine lines, wrinkles and sagging",
      "Gentle on sensitive Indian skin types",
      "Strengthens skin barrier while you sleep",
      "Non-comedogenic and non-greasy"
    ],
    ingredients: [
      "100% Natural Bakuchiol",
      "Niacinamide (Vitamin B3) 5%",
      "Quad-Peptide Complex",
      "Gotu Kola (Centella Asiatica)"
    ],
    howToUse: "Apply every evening onto cleansed face and neck after serum.",
    productDetails: "Volume: 50 ml",
    shippingInfo: "Pan-India delivery.",
    returnInfo: "15-day easy returns.",
    reviews: []
  },
  {
    id: "ziv-008",
    sku: "ZIV-MK-008",
    name: "Golden Hour Baked Highlighter — Champagne Gold",
    brand: "ZIVANA",
    category: "Makeup",
    price: 1590,
    originalPrice: 1890,
    discountPercent: 15,
    rating: 4.9,
    reviewsCount: 88,
    stock: 35,
    isBestSeller: true,
    isNewArrival: false,
    isLimited: false,
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Micro-milled baked powder highlighter that gives a seamless wet-look glow without chunkiness or glitter fallback. Compliments warm, golden undertones.",
    keyBenefits: [
      "Melts seamlessly into skin",
      "Buildable radiance from subtle shimmer to high impact glow",
      "Long-wearing 10-hour formula",
      "Mirror compact included"
    ],
    ingredients: ["Micro-milled Mineral Pearls", "Jojoba Seed Oil", "Vitamin E"],
    howToUse: "Dust onto high points of face: cheekbones, brow bone, bridge of nose, and cupid's bow.",
    productDetails: "Net Wt: 8g",
    shippingInfo: "Pan-India express shipping.",
    returnInfo: "15-day return policy.",
    reviews: []
  },
  {
    id: "ziv-009",
    sku: "ZIV-HC-009",
    name: "Keratin & Onion Root Repair Shampoo",
    brand: "ZIVANA",
    category: "Haircare",
    price: 990,
    originalPrice: 1250,
    discountPercent: 20,
    rating: 4.6,
    reviewsCount: 110,
    stock: 75,
    isBestSeller: false,
    isNewArrival: false,
    isLimited: false,
    images: [
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Sulfate-free cleansing therapy with Red Onion Extract and Plant Keratin. Rebuilds damaged hair bonds and protects against heat styling and humidity.",
    keyBenefits: [
      "Sulfate & Paraben Free",
      "Smooths frizz & repairs hair breakage",
      "Safe for color-treated & chemically treated hair"
    ],
    ingredients: ["Red Onion Bulb Extract", "Wheat & Soy Keratin Peptides", "Aloe Vera Juice"],
    howToUse: "Lather into wet hair and scalp. Rinse thoroughly. Follow with ZIVANA Repair Conditioner.",
    productDetails: "Volume: 300 ml",
    shippingInfo: "Ships within 24 hours.",
    returnInfo: "15-day return policy.",
    reviews: []
  },
  {
    id: "ziv-010",
    sku: "ZIV-FG-010",
    name: "Jasmine Blossom & Nectarine Eau De Parfum",
    brand: "ZIVANA",
    category: "Fragrance",
    price: 3200,
    originalPrice: 3800,
    discountPercent: 15,
    rating: 4.9,
    reviewsCount: 42,
    stock: 18,
    isBestSeller: false,
    isNewArrival: true,
    isLimited: true,
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Freshly blooming Madurai Jasmine (Mogra) intertwined with juicy nectarine peaches, vanilla blossom, and sheer musk.",
    keyBenefits: ["Fresh, floral yet romantic scent profile", "12-hour projection", "Elegant glass vessel"],
    ingredients: ["Madurai Mogra Absolute", "White Peach Nectar", "Creamy Vanilla"],
    howToUse: "Spray on pulse points.",
    productDetails: "Volume: 100 ml",
    shippingInfo: "Pan-India delivery.",
    returnInfo: "15-day return policy.",
    reviews: []
  },
  {
    id: "ziv-011",
    sku: "ZIV-BC-011",
    name: "Exfoliating Walnut & Spiced Cinnamon Scrub",
    brand: "ZIVANA",
    category: "Body Care",
    price: 1190,
    originalPrice: 1450,
    discountPercent: 17,
    rating: 4.8,
    reviewsCount: 39,
    stock: 45,
    isBestSeller: false,
    isNewArrival: false,
    isLimited: false,
    images: [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Fine walnut shell granules blended with Ceylon Cinnamon, Cane Sugar, and Raw Honey to buff away dead skin cells and reveal smooth skin.",
    keyBenefits: ["Polishes skin texture", "Controls Strawberry skin / Keratosis pilaris", "Invigorating spice scent"],
    ingredients: ["Crushed Walnut Shell", "Ceylon Cinnamon Powder", "Wild Forest Honey"],
    howToUse: "Gently scrub in circular motions on wet body twice a week. Rinse thoroughly.",
    productDetails: "Net Wt: 250g",
    shippingInfo: "Pan-India delivery.",
    returnInfo: "15-day return policy.",
    reviews: []
  },
  {
    id: "ziv-012",
    sku: "ZIV-SK-012",
    name: "Pure Kashmiri Rose Water Hydrosol",
    brand: "ZIVANA",
    category: "Skincare",
    price: 850,
    originalPrice: 1050,
    discountPercent: 19,
    rating: 4.9,
    reviewsCount: 165,
    stock: 100,
    isBestSeller: true,
    isNewArrival: false,
    isLimited: false,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800"
    ],
    description: "100% steam-distilled Kannauj Rose water. Balances skin pH, tightens pores, and hydrates instantly throughout the day.",
    keyBenefits: ["Instant hydration & refresh mist", "Alcohol-free & preservative-free", "Can be used as toner or makeup setting mist"],
    ingredients: ["100% Pure Rosa Damascena Flower Water"],
    howToUse: "Mist directly onto face with eyes closed or apply with cotton pad.",
    productDetails: "Volume: 200 ml fine spray bottle",
    shippingInfo: "Pan-India express delivery.",
    returnInfo: "15-day return policy.",
    reviews: []
  }
];

export const CATEGORIES = [
  {
    id: "skincare",
    name: "Skincare",
    subtitle: "Ayurvedic Potency & Modern Science",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800",
    itemCount: "42 Products"
  },
  {
    id: "makeup",
    name: "Makeup",
    subtitle: "High-Pigment Silk & Velvet Formulations",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800",
    itemCount: "35 Products"
  },
  {
    id: "haircare",
    name: "Haircare",
    subtitle: "Cold-Pressed Herbs & Root Strength",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800",
    itemCount: "28 Products"
  },
  {
    id: "body-care",
    name: "Body Care",
    subtitle: "Decadent Butters & Botanical Oils",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800",
    itemCount: "24 Products"
  },
  {
    id: "fragrance",
    name: "Fragrance",
    subtitle: "Assam Oudh, Amber & Indian Jasmine",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
    itemCount: "16 Products"
  },
  {
    id: "beauty-tools",
    name: "Beauty Tools",
    subtitle: "Rose Quartz & Gua Sha Sculpting",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=800",
    itemCount: "12 Products"
  }
];

export const INITIAL_COUPONS = [
  { code: "ZIVANA10", discountPercent: 10, minSpend: 999, active: true, usageLimit: 1000, expiry: "2026-12-31" },
  { code: "NOEULFIRST", fixedDiscount: 500, minSpend: 1999, active: true, usageLimit: 500, expiry: "2026-12-31" },
  { code: "GLOW20", discountPercent: 20, minSpend: 2999, active: true, usageLimit: 300, expiry: "2026-11-30" }
];

export const INITIAL_CUSTOMERS = [
  {
    id: "cust-001",
    name: "Dr. Ananya Roy",
    email: "ananya.roy@example.com",
    phone: "+91 98765 43210",
    city: "Mumbai",
    state: "Maharashtra",
    tier: "Privé Gold VIP",
    glowPoints: 450,
    totalSpent: 18450,
    ordersCount: 6,
    joinedDate: "2025-11-12",
    lastActive: "Today",
    favoriteCategory: "Skincare"
  },
  {
    id: "cust-002",
    name: "Priya Malhotra",
    email: "priya.malhotra@example.com",
    phone: "+91 99112 33445",
    city: "Bengaluru",
    state: "Karnataka",
    tier: "Privé Platinum",
    glowPoints: 820,
    totalSpent: 34200,
    ordersCount: 11,
    joinedDate: "2025-08-04",
    lastActive: "Yesterday",
    favoriteCategory: "Makeup"
  },
  {
    id: "cust-003",
    name: "Vikramaditya Rao",
    email: "vikram.rao@example.com",
    phone: "+91 99887 76655",
    city: "Mumbai",
    state: "Maharashtra",
    tier: "Privé Member",
    glowPoints: 120,
    totalSpent: 8284,
    ordersCount: 2,
    joinedDate: "2026-02-18",
    lastActive: "3 days ago",
    favoriteCategory: "Fragrance"
  },
  {
    id: "cust-004",
    name: "Meera Sen",
    email: "meera.sen@example.com",
    phone: "+91 98450 12345",
    city: "Kolkata",
    state: "West Bengal",
    tier: "Privé Gold VIP",
    glowPoints: 390,
    totalSpent: 14200,
    ordersCount: 5,
    joinedDate: "2026-01-10",
    lastActive: "1 week ago",
    favoriteCategory: "Haircare"
  },
  {
    id: "cust-005",
    name: "Siddharth Kapoor",
    email: "siddharth.k@example.com",
    phone: "+91 98100 55667",
    city: "New Delhi",
    state: "Delhi",
    tier: "Privé Member",
    glowPoints: 100,
    totalSpent: 4950,
    ordersCount: 1,
    joinedDate: "2026-09-15",
    lastActive: "2 days ago",
    favoriteCategory: "Skincare"
  }
];

export const INITIAL_ORDERS = [
  {
    id: "ORD-2026-8819",
    date: "2026-09-27",
    customer: {
      name: "Ananya Sharma",
      email: "ananya.sharma@example.com",
      phone: "+91 98765 43210",
      address: "B-402, Green Glen Layout, Bellandur",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560103"
    },
    items: [
      { id: "ziv-001", name: "Kashmiri Saffron & Kumkumadi Glow Serum", price: 2450, quantity: 1, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800" },
      { id: "ziv-002", name: "Velvet Matte Silk Lipstick — Royal Rose Wood", price: 1290, quantity: 1, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800" }
    ],
    subtotal: 3740,
    discount: 374,
    deliveryFee: 0,
    gst: 605,
    total: 3971,
    paymentMethod: "UPI (Google Pay)",
    paymentStatus: "Paid",
    orderStatus: "Out for Delivery",
    trackingId: "AWB-IN-994812",
    courier: "Bluedart Express"
  },
  {
    id: "ORD-2026-8742",
    date: "2026-09-24",
    customer: {
      name: "Vikramaditya Rao",
      email: "vikram.rao@example.com",
      phone: "+91 99887 76655",
      address: "Flat 12, Regency Heights, Bandra West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400050"
    },
    items: [
      { id: "ziv-004", name: "Oudh Royale & Royal Amber Eau de Parfum", price: 3800, quantity: 1, image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800" }
    ],
    subtotal: 3800,
    discount: 0,
    deliveryFee: 0,
    gst: 684,
    total: 4484,
    paymentMethod: "Credit Card (HDFC)",
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    trackingId: "AWB-IN-772910",
    courier: "Delhivery Surface"
  },
  {
    id: "ORD-2026-8950",
    date: "2026-09-29",
    customer: {
      name: "Priya Malhotra",
      email: "priya.malhotra@example.com",
      phone: "+91 99112 33445",
      address: "Villa 14, Palm Meadows, Whitefield",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560066"
    },
    items: [
      { id: "ziv-003", name: "Bhringraj & Rosemary Root Revive Hair Oil", price: 1650, quantity: 2, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800" }
    ],
    subtotal: 3300,
    discount: 500,
    deliveryFee: 0,
    gst: 504,
    total: 3304,
    paymentMethod: "Google Pay (UPI)",
    paymentStatus: "Paid",
    orderStatus: "Processing",
    trackingId: "AWB-IN-883921",
    courier: "Bluedart Express"
  },
  {
    id: "ORD-2026-8975",
    date: "2026-09-29",
    customer: {
      name: "Meera Sen",
      email: "meera.sen@example.com",
      phone: "+91 98450 12345",
      address: "88 Ballygunge Circular Road",
      city: "Kolkata",
      state: "West Bengal",
      pincode: "700019"
    },
    items: [
      { id: "ziv-005", name: "24K Gold & Saffron Radiance Face Polish", price: 1890, quantity: 1, image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800" }
    ],
    subtotal: 1890,
    discount: 189,
    deliveryFee: 0,
    gst: 306,
    total: 2007,
    paymentMethod: "Cash on Delivery (COD)",
    paymentStatus: "Pending (COD)",
    orderStatus: "Order Placed",
    trackingId: "AWB-IN-662109",
    courier: "Delhivery Surface"
  }
];

export const INITIAL_USER = {
  name: "Ananya Sharma",
  email: "ananya.sharma@example.com",
  phone: "+91 98765 43210",
  addresses: [
    {
      id: "addr-1",
      title: "Home",
      fullName: "Ananya Sharma",
      phone: "+91 98765 43210",
      street: "B-402, Green Glen Layout, Bellandur",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560103",
      isDefault: true
    }
  ]
};

export const INITIAL_CMS = {
  announcementBar: "Premium Beauty Essentials — Delivered Across India | Complimentary Saffron Serum Sample on Orders Above ₹1,999",
  heroHeading: "YOUR BEAUTY. YOUR GLOW. YOUR ZIVANA.",
  heroSubtitle: "Discover beauty essentials curated for your everyday glow. Crafted with pure Indian botanicals and modern skin science.",
  heroBannerImg: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1920",
  featuredCollectionTitle: "EVERYDAY GLOW COLLECTION",
  featuredCollectionSubtitle: "Everything you need for your daily beauty ritual. Handpicked formulas for radiant, healthy Indian skin.",
  storyTitle: "Beauty, Reimagined.",
  storyQuote: "ZIVANA brings together modern beauty, thoughtful care and timeless Indian inspiration. Discover products designed to become part of your everyday beauty ritual.",
  storyImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1000"
};

export const ANALYTICS_DATA = {
  today: {
    orders: 42,
    productsSold: 68,
    revenue: 148500,
    expenses: 42000,
    profit: 106500
  },
  monthly: {
    totalSales: 3420000,
    totalOrders: 980,
    productsSold: 1650,
    expenses: 980000,
    gst: 521640,
    netProfit: 1918360
  },
  yearlyRevenueChart: [
    { month: "Jan", revenue: 2100000, expenses: 750000, profit: 1350000, orders: 620 },
    { month: "Feb", revenue: 2450000, expenses: 820000, profit: 1630000, orders: 710 },
    { month: "Mar", revenue: 2800000, expenses: 900000, profit: 1900000, orders: 830 },
    { month: "Apr", revenue: 3100000, expenses: 950000, profit: 2150000, orders: 900 },
    { month: "May", revenue: 2950000, expenses: 910000, profit: 2040000, orders: 860 },
    { month: "Jun", revenue: 3300000, expenses: 990000, profit: 2310000, orders: 950 },
    { month: "Jul", revenue: 3600000, expenses: 1050000, profit: 2550000, orders: 1020 },
    { month: "Aug", revenue: 3900000, expenses: 1100000, profit: 2800000, orders: 1150 },
    { month: "Sep", revenue: 4200000, expenses: 1180000, profit: 3020000, orders: 1240 }
  ]
};
