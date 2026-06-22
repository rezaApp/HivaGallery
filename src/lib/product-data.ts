import type { ProductSpec, ProductReview } from "@/types";

export type { ProductSpec, ProductReview };

export interface ProductDetail {
  id: string;
  priceUsd: number;
  categoryKey: string;
  subcategoryKey: string;
  longDescription: string;
  specs: ProductSpec[];
  reviews: ProductReview[];
  relatedIds: string[];
}

export const PRODUCTS: ProductDetail[] = [
  {
    id: "1",
    priceUsd: 59.99,
    categoryKey: "electronics",
    subcategoryKey: "audio",
    longDescription:
      "Engineered for audiophiles and everyday listeners alike, these over-ear headphones deliver rich, room-filling sound with a wide 20Hz–20kHz frequency range. The active noise cancellation system uses dual microphones to block out ambient noise, letting you focus entirely on your music. The plush protein-leather ear cushions and adjustable headband distribute weight evenly, so even marathon listening sessions remain comfortable. A single charge over USB-C delivers up to 30 hours of playback, and the 3.5mm jack keeps them usable when the battery runs low.",
    specs: [
      { key: "noiseCancelling", value: "Active Noise Cancellation" },
      { key: "driver", value: "40mm Dynamic Driver" },
      { key: "frequency", value: "20Hz – 20kHz" },
      { key: "battery", value: "30 hours" },
      { key: "connectivity", value: "Bluetooth 5.0 / 3.5mm Jack" },
      { key: "weight", value: "250 g" },
    ],
    reviews: [
      {
        id: "r1-1",
        author: "Alex M.",
        rating: 5,
        date: "2025-11-12",
        body: "Incredible sound quality and the noise cancelling is superb. Battery lasts forever.",
      },
      {
        id: "r1-2",
        author: "Sarah K.",
        rating: 4,
        date: "2025-10-05",
        body: "Very comfortable for long sessions. Slightly heavy but absolutely worth it.",
      },
      {
        id: "r1-3",
        author: "James R.",
        rating: 5,
        date: "2025-09-20",
        body: "Best headphones I've owned. Highly recommend to anyone who values audio quality.",
      },
    ],
    relatedIds: ["2", "10", "9"],
  },
  {
    id: "2",
    priceUsd: 24.5,
    categoryKey: "electronics",
    subcategoryKey: "wearables",
    longDescription:
      "This slim fitness tracker packs serious technology into an elegant package. The always-on 1.4-inch AMOLED display is sharp and readable even in direct sunlight, while the built-in GPS logs your routes with precision so you can leave your phone behind. The 5 ATM water resistance rating means it handles swimming and heavy rain without issue. Heart-rate and SpO2 sensors provide continuous health monitoring, and the 7-day battery ensures you only need to charge once a week. Switch between silicone and leather straps to match any occasion.",
    specs: [
      { key: "display", value: "1.4-inch AMOLED" },
      { key: "battery", value: "7 days" },
      { key: "waterResistance", value: "5 ATM" },
      { key: "gps", value: "Built-in GPS" },
      { key: "strap", value: "Silicone / Leather" },
      { key: "weight", value: "38 g" },
    ],
    reviews: [
      {
        id: "r2-1",
        author: "Maria L.",
        rating: 5,
        date: "2025-12-01",
        body: "Tracks everything accurately. The GPS lock is impressively fast.",
      },
      {
        id: "r2-2",
        author: "Tom B.",
        rating: 4,
        date: "2025-11-18",
        body: "Great watch for the price. Battery life is exactly as advertised.",
      },
    ],
    relatedIds: ["1", "10", "8"],
  },
  {
    id: "3",
    priceUsd: 89.99,
    categoryKey: "sports",
    subcategoryKey: "running",
    longDescription:
      "Designed in collaboration with long-distance runners, these shoes strike the perfect balance between cushioning and ground feel. The engineered mesh upper wraps your foot in a breathable, sock-like fit while remaining durable enough for high-mileage training. The responsive foam midsole returns energy with every stride, reducing fatigue on longer efforts. An 8 mm heel-to-toe drop suits a natural mid-foot strike, and the durable outsole provides reliable grip on both road and light trail. At just 270 g per shoe, they disappear on your feet so you can focus on the run.",
    specs: [
      { key: "material", value: "Engineered Mesh Upper" },
      { key: "sole", value: "Responsive Foam Midsole" },
      { key: "closure", value: "Lace-up" },
      { key: "drop", value: "8 mm" },
      { key: "weight", value: "270 g (size 42)" },
    ],
    reviews: [
      {
        id: "r3-1",
        author: "Chris P.",
        rating: 5,
        date: "2025-10-30",
        body: "Incredibly light and breathable. My long run times improved after switching to these.",
      },
      {
        id: "r3-2",
        author: "Dana W.",
        rating: 4,
        date: "2025-09-15",
        body: "Comfortable from the first wear. Cushioning is excellent for half-marathon distances.",
      },
    ],
    relatedIds: ["4", "8", "2"],
  },
  {
    id: "4",
    priceUsd: 35.0,
    categoryKey: "sports",
    subcategoryKey: "yoga",
    longDescription:
      "Made from a blend of natural rubber and TPE, this mat provides a stable, grippy surface that stays put during even the most demanding flows. At 6 mm thick, it cushions joints without sacrificing the firm feedback needed for balance poses. Laser-etched alignment lines guide hand and foot placement for beginners and advanced practitioners alike. The closed-cell surface repels moisture, making it easy to wipe clean after hot yoga, and the included carry strap folds the mat compactly for your commute to the studio.",
    specs: [
      { key: "material", value: "Natural Rubber & TPE" },
      { key: "thickness", value: "6 mm" },
      { key: "dimensions", value: "183 × 61 cm" },
      { key: "texture", value: "Non-slip dual surface" },
      { key: "weight", value: "1.5 kg" },
    ],
    reviews: [
      {
        id: "r4-1",
        author: "Yuki T.",
        rating: 5,
        date: "2025-11-25",
        body: "Best mat I've used. The alignment lines are super helpful for beginners.",
      },
      {
        id: "r4-2",
        author: "Elena S.",
        rating: 5,
        date: "2025-10-10",
        body: "Eco-friendly and very grippy. Doesn't slip even during hot yoga.",
      },
    ],
    relatedIds: ["3", "8", "6"],
  },
  {
    id: "5",
    priceUsd: 149.99,
    categoryKey: "kitchen",
    subcategoryKey: "coffee",
    longDescription:
      "This 12-cup drip coffee maker elevates your morning routine with a built-in conical burr grinder that grinds beans fresh for every brew. The 24-hour programmable timer means coffee is ready the moment you wake up. Brewing at the optimal 92–96 °C water temperature, it extracts maximum flavour without bitterness. The double-walled thermal carafe keeps coffee hot for hours without a warming plate that scorches the brew. A pause-and-pour feature lets you steal a cup mid-cycle, and the removable water reservoir makes refilling effortless.",
    specs: [
      { key: "capacity", value: "12 cups" },
      { key: "grinder", value: "Built-in Burr Grinder" },
      { key: "programmable", value: "24-hour programmable" },
      { key: "carafeType", value: "Thermal Carafe" },
      { key: "power", value: "1000 W" },
    ],
    reviews: [
      {
        id: "r5-1",
        author: "Marco V.",
        rating: 5,
        date: "2025-12-05",
        body: "The built-in grinder makes a huge difference. Fresh-ground every morning.",
      },
      {
        id: "r5-2",
        author: "Susan H.",
        rating: 4,
        date: "2025-11-02",
        body: "Easy to program and clean. The thermal carafe keeps coffee hot for hours.",
      },
      {
        id: "r5-3",
        author: "Leo D.",
        rating: 5,
        date: "2025-09-28",
        body: "Worth every cent. Better coffee than most cafés.",
      },
    ],
    relatedIds: ["9", "6", "7"],
  },
  {
    id: "6",
    priceUsd: 45.0,
    categoryKey: "accessories",
    subcategoryKey: "wallets",
    longDescription:
      "Handcrafted from full-grain leather that develops a rich patina over time, this bi-fold wallet is built to last a decade. The slim profile holds eight cards across four double-stitched slots without the unsightly bulge of traditional wallets. An RFID-blocking lining shields your contactless cards from electronic skimming. A full-length bill compartment keeps notes flat and unfolded. At just 65 g and 11 × 9 cm folded, it slips effortlessly into a front trouser pocket — exactly where a wallet should be.",
    specs: [
      { key: "material", value: "Full-grain Leather" },
      { key: "slots", value: "8 Card Slots" },
      { key: "protection", value: "RFID Blocking" },
      { key: "dimensions", value: "11 × 9 cm" },
      { key: "closure", value: "Bi-fold" },
      { key: "weight", value: "65 g" },
    ],
    reviews: [
      {
        id: "r6-1",
        author: "Ahmed K.",
        rating: 5,
        date: "2025-10-20",
        body: "Premium leather and very slim. Fits perfectly in a front pocket.",
      },
      {
        id: "r6-2",
        author: "Nina R.",
        rating: 4,
        date: "2025-09-08",
        body: "Great quality for the price. The RFID protection is a bonus.",
      },
    ],
    relatedIds: ["7", "4", "5"],
  },
  {
    id: "7",
    priceUsd: 75.0,
    categoryKey: "accessories",
    subcategoryKey: "eyewear",
    longDescription:
      "These aviator sunglasses combine classic style with modern optical engineering. The polarized polycarbonate lenses eliminate horizontal glare from reflective surfaces — ideal for driving, water sports, and alpine environments. UV400 coating blocks 100% of UVA and UVB radiation. The aerospace-grade titanium frame weighs just 20 g, making it one of the lightest full-metal frames available, while spring-loaded hinges adapt to any face shape. Scratch-resistant lens coating and an included hard case ensure they stay pristine for years.",
    specs: [
      { key: "lens", value: "Polarized Polycarbonate" },
      { key: "frame", value: "Titanium" },
      { key: "uv", value: "UV400 Protection" },
      { key: "style", value: "Aviator" },
      { key: "weight", value: "20 g" },
    ],
    reviews: [
      {
        id: "r7-1",
        author: "Carlos M.",
        rating: 5,
        date: "2025-11-08",
        body: "Incredibly light and the polarization is top-notch. No glare on water.",
      },
      {
        id: "r7-2",
        author: "Priya N.",
        rating: 4,
        date: "2025-10-14",
        body: "Stylish and durable. The titanium frame feels very premium.",
      },
    ],
    relatedIds: ["6", "3", "8"],
  },
  {
    id: "8",
    priceUsd: 22.0,
    categoryKey: "sports",
    subcategoryKey: "hydration",
    longDescription:
      "Built from food-grade 18/8 stainless steel and featuring a double-wall vacuum insulation chamber, this 750 ml bottle keeps drinks cold for 24 hours and hot for 12. The powder-coated exterior provides a secure grip even with wet hands and resists dents better than bare metal. A wide-mouth opening fits ice cubes and makes cleaning with a bottle brush straightforward. The leak-proof lid with carrying loop doubles as a travel mug lid. BPA-free and condensation-free — the outer surface stays dry so it won't soak your bag.",
    specs: [
      { key: "material", value: "18/8 Stainless Steel" },
      { key: "insulation", value: "Double-wall Vacuum" },
      { key: "cold", value: "24 hours" },
      { key: "hot", value: "12 hours" },
      { key: "volume", value: "750 ml" },
      { key: "weight", value: "320 g (empty)" },
    ],
    reviews: [
      {
        id: "r8-1",
        author: "Finn O.",
        rating: 5,
        date: "2025-12-10",
        body: "Ice stays frozen for 24 hours even in summer. Totally worth it.",
      },
      {
        id: "r8-2",
        author: "Laura G.",
        rating: 5,
        date: "2025-10-22",
        body: "The perfect size for the gym. No leaks and very easy to clean.",
      },
    ],
    relatedIds: ["3", "4", "7"],
  },
  {
    id: "9",
    priceUsd: 38.99,
    categoryKey: "homeOffice",
    subcategoryKey: "lighting",
    longDescription:
      "This architect-style LED desk lamp is engineered for all-day work. The high-CRI LEDs render colours accurately, reducing eye strain during long screen sessions, while the stepless touch dimmer lets you dial brightness from a gentle 10% nightlight to a full 450 lm task beam. Colour temperature adjusts from warm 2700 K for relaxed evenings to cool 6500 K for sharp focus. A built-in USB-A port on the base charges your phone or tablet without occupying a wall socket. The articulating arm swings and tilts freely, directing light exactly where you need it.",
    specs: [
      { key: "technology", value: "LED" },
      { key: "brightness", value: "450 lm" },
      { key: "colorTemp", value: "2700K – 6500K adjustable" },
      { key: "usbPort", value: "USB-A 5W Charging" },
      { key: "control", value: "Touch dimmer" },
      { key: "power", value: "12 W" },
    ],
    reviews: [
      {
        id: "r9-1",
        author: "Oliver T.",
        rating: 5,
        date: "2025-11-29",
        body: "The adjustable color temperature is a game-changer for late-night work.",
      },
      {
        id: "r9-2",
        author: "Hana M.",
        rating: 4,
        date: "2025-10-17",
        body: "Great build quality. The USB port on the base is super convenient.",
      },
    ],
    relatedIds: ["10", "5", "1"],
  },
  {
    id: "10",
    priceUsd: 129.0,
    categoryKey: "electronics",
    subcategoryKey: "peripherals",
    longDescription:
      "The 80% tenkeyless layout removes the numpad while keeping every key a touch-typist needs, freeing up desk space for a wider mouse range. Tactile brown switches deliver a satisfying bump on actuation without the loud click of blue switches — professional enough for open-plan offices, satisfying enough for marathon gaming sessions. Per-key RGB backlighting is configurable via onboard memory, so your lighting profile follows the keyboard to any machine. Connect via USB-C for zero-latency wired use or switch to Bluetooth 5.1 for cable-free productivity across up to three paired devices.",
    specs: [
      { key: "layout", value: "80% TKL (87-key)" },
      { key: "switches", value: "Tactile Brown" },
      { key: "backlighting", value: "Per-key RGB" },
      { key: "connectivity", value: "USB-C / Bluetooth 5.1" },
      { key: "weight", value: "850 g" },
    ],
    reviews: [
      {
        id: "r10-1",
        author: "Dev S.",
        rating: 5,
        date: "2025-12-03",
        body: "Tactile feedback is perfect for typing. The RGB is gorgeous.",
      },
      {
        id: "r10-2",
        author: "Rachel B.",
        rating: 4,
        date: "2025-11-14",
        body: "Solid build. The Bluetooth connection is reliable across all my devices.",
      },
      {
        id: "r10-3",
        author: "Kai L.",
        rating: 5,
        date: "2025-10-01",
        body: "Best keyboard I've ever used. The compact layout frees up a lot of desk space.",
      },
    ],
    relatedIds: ["1", "9", "2"],
  },
];

export function getProduct(id: string): ProductDetail | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getRelatedProducts(ids: string[]): ProductDetail[] {
  return ids
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as ProductDetail[];
}
