export const MOCK_ORDERS = [
  {
    id: "HVA-1001",
    date: "2026-08-12",
    status: "processing",
    items: [
      { productId: "1", quantity: 1 },
      { productId: "2", quantity: 1 },
    ],
  },
  {
    id: "HVA-0987",
    date: "2026-07-28",
    status: "delivered",
    items: [{ productId: "6", quantity: 1 }],
  },
];

export const MOCK_ADDRESSES = [
  {
    title: "خانه",
    recipient: "کاربر هیوا",
    detail: "تهران، خیابان ولیعصر، کوچه بهار، پلاک ۲۴",
  },
  {
    title: "محل کار",
    recipient: "کاربر هیوا",
    detail: "تهران، خیابان مطهری، ساختمان هیوا",
  },
];
