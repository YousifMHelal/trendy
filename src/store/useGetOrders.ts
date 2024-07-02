import { create } from "zustand";

export interface IOrder {
  _id: string;
  totalAmount: number;
  products: {
    _id: string;
    title: string;
    quantity: number;
  }[];
  buyer: {
    _id: string;
    email: string;
  };
  createdAt: string;
}

interface OrdersData {
  orders: IOrder[];
  count: number;
}

interface OrderState {
  ordersData: OrdersData;
  fetchOrders: (page?: number) => void;
  loading: boolean;
  error: string | null;
}

const useOrdersStore = create<OrderState>((set) => ({
  ordersData: { orders: [], count: 0 },
  loading: true,
  error: null,
  fetchOrders: async (page?: number) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/orders/?page=${page}`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error(
          `Failed to fetch orders: ${res.status} ${res.statusText}`
        );
      }

      const data: { orders: IOrder[]; count: number } = await res.json();
      set({ ordersData: data, loading: false });
    } catch (error) {
      console.error("Error fetching orders:", error);
      set({
        error: `Failed to fetch orders: ${error}`,
        loading: false,
      });
    }
  },
}));

export default useOrdersStore;
