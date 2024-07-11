import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { TProduct } from "@/types";

import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: TProduct }) => {
  return (
    <Card className="bg-gray-900 text-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <Link to={`/products/${product?._id}`}>
        <CardHeader className="p-3">
          <img
            src={product?.image}
            className="h-[400px] w-full object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
            alt={product?.category}
          />
        </CardHeader>
        <CardContent className="grid p-4">
          <CardTitle className=" text-3xl font-bold text-center">
            {product?.title}
          </CardTitle>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;
