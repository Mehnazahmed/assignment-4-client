import { useGetProductsQuery } from "@/redux/api/baseApi";

const Products = () => {
  const { data, isLoading } = useGetProductsQuery({});
  if (!isLoading) {
    <p>Loading......</p>;
  }
  console.log(data);
  return (
    <div>
      <p>products</p>
      <p>{data?.data?.length}</p>
    </div>
  );
};

export default Products;
