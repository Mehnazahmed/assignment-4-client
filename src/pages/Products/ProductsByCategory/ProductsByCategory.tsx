import { useGetProductsByCategoryNameQuery } from "@/redux/api/baseApi";
import { TProduct } from "@/types";
import { useParams } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
const ProductsByCategory = () => {
  const { category } = useParams();
  const { data: products, isLoading } = useGetProductsByCategoryNameQuery(
    category as string
  );
  if (isLoading) {
    <p className="text-3xl text-center text-black-500 my-2 font-bold">
      Loading....
    </p>;
  }
  console.log(products);
  return (
    <div className="my-5 mt-12">
      <h2 className="text-3xl font-bold my-2 border-l-4 px-1 text-center">
        Available Plants For You
      </h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4 mx-auto my-8 px-8">
        {products?.data?.map((product: TProduct) => (
          <ProductCard key={product?._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsByCategory;
