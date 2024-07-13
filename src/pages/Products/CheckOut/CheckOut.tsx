import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { decreaseStock, clearCart } from "@/redux/features/cartSlice";
import { useCreateOrderMutation } from "@/redux/api/baseApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

const Checkout = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();

  // Calculate total amount
  const totalAmount = useMemo(() => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }, [cart]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "COD", // Default to Cash on Delivery
  });

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (!formData.name || !formData.phone || !formData.address) {
      Swal.fire("Please fill in all required fields.");
      return;
    }

    // Check stock availability
    const outOfStockItems = cart.filter((item) => item.quantity > item.stock);
    if (outOfStockItems.length > 0) {
      Swal.fire("Some items are out of stock. Please adjust your cart.");
      return;
    }

    // Create order with COD payment method
    createOrder({
      ...formData,
      totalAmount,
      items: cart.map((item) => ({
        _id: item._id,
        quantity: item.quantity,
      })),
    })
      .unwrap()
      .then((response) => {
        if (response.success) {
          // Reduce stock quantities
          cart.forEach((item) => {
            dispatch(decreaseStock({ id: item._id!, quantity: item.quantity }));
          });

          // Clear cart
          dispatch(clearCart());

          Swal.fire("Order placed successfully!");
        } else {
          Swal.fire("Failed to place order. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        Swal.fire(
          "An error occurred while placing the order. Please try again."
        );
      });
  };

  return (
    <div className="container mx-auto p-10 m-8 w-[400px] border-2 bg-slate-100">
      <h2 className="text-3xl mb-4 text-center">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Name:</label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Phone:</label>
          <Input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Address:</label>
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Total Amount:</label>
          <div className="text-lg font-bold">${totalAmount.toFixed(2)}</div>
        </div>
        <Button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white"
          disabled={isLoading || totalAmount === 0}
        >
          {isLoading ? "Placing Order..." : "Place Order"}
        </Button>
      </form>
    </div>
  );
};

export default Checkout;
