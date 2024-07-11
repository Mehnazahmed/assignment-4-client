import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
const CategoryCard = ({ category }) => {
  return (
    <Card className="bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <Link to="">
        <CardHeader className="p-2">
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
          <CardTitle className="mt-2 text-3xl font-extrabold">
            {category?.category}
          </CardTitle>
        </CardContent>
      </Link>
      {/* <CardFooter>
        <RatingModal movie={movie} />
      </CardFooter> */}
    </Card>
  );
};

export default CategoryCard;
