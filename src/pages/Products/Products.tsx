import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/redux/api/baseApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TProduct } from "@/types";
import AddProductModal from "./AddProduct/AddProductModal";
import ProductFilter from "./ProductFilter/ProductFilter";
import { useState } from "react";
import UpdateProductModal from "./UpdateProduct/UpdateProductModal";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { removeProduct } from "@/redux/features/productSlice";

const Products = () => {
  const [category, setCategory] = useState("");

  const { data: products, isLoading, refetch } = useGetProductsQuery({});
  const dispatch = useDispatch();
  const [deleteProduct] = useDeleteProductMutation();

  if (isLoading) {
    <p>Loading......</p>;
  }
  console.log(products);

  //delete product
  const handleDelete = (id) => {
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
          deleteProduct(id);
          dispatch(removeProduct(id));
          refetch();
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
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold mt-4 mb-6 border-l-4 p-2 text-center">
          Available Plants
        </h1>
        <div className="flex justify-around  ">
          <AddProductModal />
          <ProductFilter category={category} setCategory={setCategory} />
        </div>

        <div className="mx-auto py-2 px-36 ">
          <Table className="px-40 border-4 rounded-2xl w-full mx-auto">
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.data?.map((product: TProduct) => (
                <TableRow key={product._id}>
                  <TableCell className="font-medium">
                    <Avatar>
                      <AvatarImage src={product.image} alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableRow>
                    <TableCell>
                      <Button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-500 rounded-lg"
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
                    </TableCell>
                    <TableCell>
                      <UpdateProductModal product={product} />
                    </TableCell>
                  </TableRow>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Products;
