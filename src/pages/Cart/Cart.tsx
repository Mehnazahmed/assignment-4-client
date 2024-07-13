import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { removeFromCart } from "@/redux/features/cartSlice";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();

  const handleRemove = (_id: string) => {
    const swalWithCustomButtons = Swal.mixin({
      customClass: {
        confirmButton: "custom-confirm-btn",
        cancelButton: "custom-cancel-btn",
      },
      buttonsStyling: false,
    });

    swalWithCustomButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(removeFromCart(_id));
          swalWithCustomButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithCustomButtons.fire({
            title: "Cancelled",
            text: "Your file is safe :)",
            icon: "error",
          });
        }
      });
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (cart.length > 0) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [cart]);

  if (cart.length === 0) {
    return (
      <div className="container h-screen mx-auto flex justify-center my-6">
        <div>
          <h1 className="text-3xl my-4">Your Cart Is Empty!!</h1>
          <Link to="/">
            <Button className="bg-primary-gradient text-xl ml-10 font-semibold bg-yellow-500">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-20">
      <h2 className="text-3xl mb-8 mt-8 text-center">Your Shopping Cart </h2>
      <ul className="space-y-4">
        {cart.map((item) => (
          <li key={item._id} className="border p-4 rounded-md shadow-sm flex">
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-24 object-cover mr-4"
            />
            <div className="flex-1 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white rounded-lg"
                onClick={() => handleRemove(item._id!)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <h3 className="text-2xl font-bold">
          Total: $
          {cart
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}
        </h3>
        <Link to="/checkout">
          <Button className="bg-green-500 hover:bg-green-600 text-white mt-4 mb-8">
            Proceed to Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
