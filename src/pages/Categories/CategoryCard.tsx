import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TCategory } from "@/types/intex";
import { Link } from "react-router-dom";
const CategoryCard = ({ category }: { category: TCategory }) => {
  return (
    <Card className="bg-gray-900 text-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <Link to="">
        <CardHeader className="p-3">
          <img
            src={category?.image}
            className="h-[400px] w-full object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
            alt={category?.category}
          />
        </CardHeader>
        <CardContent className="grid p-4">
          {/* <div className="flex items-center gap-2">
            <Star color="orange" fill="orange" />
            <p className="text-2xl font-bold">{movie?.totalRating}</p>
          </div> */}
          <CardTitle className=" text-3xl font-bold text-center">
            {category?.category}
          </CardTitle>
        </CardContent>
      </Link>
    </Card>
  );
};

export default CategoryCard;
