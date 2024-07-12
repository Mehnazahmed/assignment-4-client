import { Button } from "@/components/ui/button";
import { useGetProductsByIdQuery } from "@/redux/api/baseApi";
import { addToCart } from "@/redux/features/cartSlice";
import { Star, StarIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductsByIdQuery(id);
  if (isLoading) {
    <p>Loading......</p>;
  }
  console.log(product);

  const dispatch = useDispatch();
  // add to cart

  const handleAddToCart = () => {
    if (product?.data?.stock > 0) {
      dispatch(addToCart(product?.data));
    } else {
      Swal.fire("This product is out of stock!");
    }
  };
  //stars
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <Star key={i} className="text-yellow-500" />
        ) : (
          <StarIcon key={i} className="text-gray-500" />
        )
      );
    }
    return stars;
  };
  return (
    <div className="flex flex-col items-center p-4 bg-gray-500 text-white min-h-screen">
      <div className="max-w-6xl w-full bg-gray-800 rounded-lg shadow-lg p-8 m-10 animate__animated animate__fadeIn">
        <h1 className="text-4xl font-extrabold mb-4 text-center">
          {product?.data?.title}
        </h1>
        <div className="flex flex-col md:flex-row">
          <img
            src={product?.data.image}
            alt="Movie Poster"
            className="w-full md:w-1/3 h-auto mb-4 rounded-lg shadow-lg md:mr-6 transform hover:scale-105 transition-transform duration-300"
          />
          <div className="flex flex-col justify-between mt-6">
            <div className="text-gray-400 mb-4">
              <div className="mb-3 flex items-center  ">
                <span className="font-semibold text-yellow-500">Rating:</span>
                <div className="ml-3 flex">
                  {renderStars(product?.data?.rating)}
                </div>
              </div>

              <p className="mb-3">
                <span className="font-semibold text-yellow-500">Brand:</span>{" "}
                {product?.data?.brand}
              </p>
              <p className="mb-3">
                <span className="font-semibold text-yellow-500">Category:</span>{" "}
                {product?.data?.category}
              </p>
              <p className="mb-3">
                <span className="font-semibold text-yellow-500">
                  Description:
                </span>{" "}
                {product?.data?.description}
              </p>
              <p className="mb-3">
                <span className="font-semibold text-yellow-500">Stock:</span>{" "}
                {product?.data?.stock}
              </p>
              <p className="mb-3s">
                <span className="font-semibold text-yellow-500">Price:</span>{" "}
                {product?.data?.price}
              </p>
            </div>
            <p className="text-justify mb-4">{product?.description}</p>
            <div className="mb-4">
              <Button
                onClick={handleAddToCart}
                className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg font-bold hover:bg-yellow-400"
              >
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
