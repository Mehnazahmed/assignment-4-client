import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { RootState } from "@/redux/store";

// import { Link } from "@radix-ui/react-navigation-menu";
import { GiFruitTree } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navbar() {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <div className="mx-auto container  ">
      <div className="flex  items-center justify-between border-b-2 py-3 ">
        <Link to="/" className="flex items-center">
          <div className=" bg-yellow-400 p-2 rounded-md flex">
            {" "}
            <h3 className="font-extrabold pr-2">Breath Natural</h3>
            <GiFruitTree />
          </div>{" "}
        </Link>
        <NavigationMenu className="">
          <NavigationMenuList>
            <div className="flex justify-end">
              <NavigationMenuItem>
                <Link to="/aboutUs">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About Us
                  </NavigationMenuLink>
                </Link>
                <Link to="/products">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Products
                  </NavigationMenuLink>
                </Link>
                <Link to="/cart">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-shopping-cart"
                    >
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    {cartItemCount > 0 && (
                      <span className="badge">{cartItemCount}</span>
                    )}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
