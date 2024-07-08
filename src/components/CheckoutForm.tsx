import { useCart } from "@/store/useCart";
import useOrderStore from "@/store/useOrderStore";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

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

const CheckoutForm = ({ total }: { total: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const createOrder = useOrderStore((state) => state.createOrder);

  const { items, clearCart } = useCart();
  const { data } = useSession();
  const user = data?.user;

  const [checkoutData, setCheckoutData] = useState<OrderData>({
    products: [],
    buyer: {
      _id: user?.id || "",
      email: user?.email || "",
    },
    totalAmount: total,
  });

  useEffect(() => {
    if (items.length > 0) {
      const products = items.map((item) => ({
        _id: item.product._id,
        title: item.product.title,
        quantity: item.qty,
      }));
      setCheckoutData((prevData) => ({
        ...prevData,
        products,
      }));
    }
  }, [items]);

  const handleSubmit = async (event: any) => {
    setLoading(true);
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw new Error(submitError.message);
      }

      const res = await fetch("api/create-intent", {
        method: "POST",
        body: JSON.stringify({
          amount: Number(total),
        }),
      });
      const clientSecret = await res.json();

      await handleSendEMail();
      await handleCreateOrder();
      await clearCart();

      const result = await stripe.confirmPayment({
        clientSecret,
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/payment-confirm",
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      }
    } catch (error) {
      console.error("Error during payment:", error);
      toast.error("Failed to process payment");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrder = async () => {
    try {
      await createOrder(checkoutData);
      toast.success("Order created successfully!");
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const handleSendEMail = async () => {
    const res = await fetch("api/send", {
      method: "POST",
      body: JSON.stringify({
        amount: total,
        fullName: user?.name,
      }),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {loading ? (
        <Loader2 className="animate-spin mx-auto mt-5 h-8 w-8 text-muted-background" />
      ) : (
        <Button className="w-full mt-5" disabled={!stripe}>
          Submit
        </Button>
      )}
    </form>
  );
};

export default CheckoutForm;
