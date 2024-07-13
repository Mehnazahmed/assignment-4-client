import { useGetPlantsCategoriesQuery } from "@/redux/api/baseApi";
import CategoryCard from "./CategoryCard";
import { TCategory } from "@/types";

const Categories = () => {
  const { data: categories, isLoading } = useGetPlantsCategoriesQuery({});
  console.log(categories?.data);
  if (isLoading)
    return (
      <p className="text-3xl text-center text-yellow-500 my-2 font-bold">
        Loading....
      </p>
    );
  return (
    <div className="my-5 mt-12">
      <h2 className="text-3xl font-bold my-8 border-l-4 px-1 text-center">
        All Categories
      </h2>
      <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-4 mx-auto my-5">
        {categories?.data?.map((category: TCategory) => (
          <CategoryCard key={category?._id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
