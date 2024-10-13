export type CreateOrderSaleRequest = {
  buyerId: number;
  voucherCode: string;
  fishesOrder: {
    uniqueFishes: [
      {
        fishId: number; // A
        quantity: 1;
      },
      {
        fishId: number; // B
        quantity: 1;
      },
      {
        fishId: number; // C
        quantity: 1;
      }
    ];
    packageFishes: [
      {
        fishId: number; // E
        quantity: number; // 12
      },
      {
        fishId: number; // F
        quantity: number; // 8
      }
    ];
  };
};

/**
 * User mua:
 * - Cá thể: A, B, C (number cá thể luôn = 1)
 * - Cá lô: E (12 con), F (8 con)
 */
