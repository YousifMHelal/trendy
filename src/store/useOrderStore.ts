import { create } from "zustand";

type OrderData = {
  products: {
    _id: string;
    title: string;
    quantity: number;
  }[];
  buyer: {
    _id: string;
    email: string;
  };
  totalAmount: number;
};

type OrderStore = {
  createOrder: (orderData: OrderData) => Promise<void>;
};

const useOrderStore = create<OrderStore>((set) => ({
  createOrder: async (orderData: OrderData) => {
    try {
      console.log(orderData);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const data = await response.json();
      console.log(data);
      console.log("Order created:", data);
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },
}));

export default useOrderStore;
