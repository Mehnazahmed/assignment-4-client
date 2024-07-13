import { useState, useEffect } from "react";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { removeProduct } from "@/redux/features/productSlice";
import AddProductModal from "./AddProduct/AddProductModal";
import UpdateProductModal from "./UpdateProduct/UpdateProductModal";
import { TProduct } from "@/types";

const Products = () => {
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [sortType, setSortType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  const { data: products, isLoading, refetch } = useGetProductsQuery({});
  const [deleteProduct] = useDeleteProductMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    refetch();
  }, [category, debouncedSearchTerm, sortType, currentPage]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleDelete = (id: string) => {
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

  const handleSort = (type: string) => {
    setSortType(type);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const filteredAndSortedProducts = products?.data
    ?.filter((product: TProduct) =>
      product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    )
    .filter((product: TProduct) =>
      category ? product.category === category : true
    )
    .sort((a, b) => {
      if (sortType === "title") {
        return a.title.localeCompare(b.title);
      }
      if (sortType === "price") {
        return a.price - b.price;
      }
      return 0;
    });

  const currentProducts = filteredAndSortedProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const tableRows = currentProducts?.map((product: TProduct) => (
    <TableRow key={product._id}>
      <TableCell>
        <Avatar>
          <AvatarImage src={product.image} alt={product.title} />
          <AvatarFallback>{product.title.charAt(0)}</AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell>{product.title}</TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell>${product.price}</TableCell>
      <TableRow>
        <TableCell>
          <Button
            onClick={() => handleDelete(product._id)}
            className="bg-red-500 rounded-lg mr-0 "
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
          <UpdateProductModal product={product} refetch={refetch} />
        </TableCell>
      </TableRow>
    </TableRow>
  ));

  if (isLoading) {
    return (
      <p className="text-3xl text-center text-black-500 my-2 font-bold">
        Loading....
      </p>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mt-4 mb-6 border-l-4 p-2 text-center">
        Available Plants
      </h1>
      <div className="flex justify-around">
        <AddProductModal refetch={refetch} />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-2 border-gray-400 rounded-lg px-4 py-2"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border-2 border-gray-400 rounded-lg px-4 py-2"
        >
          <option value="">All Categories</option>
          <option value="Trees">Trees</option>
          <option value="Shrubs">Shrubs</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Herbs">Herbs</option>
          <option value="Flowering Plants">Flowering Plants</option>
          <option value="Indoor Plants">Indoor Plants</option>
        </select>
        <select
          onChange={(e) => handleSort(e.target.value)}
          className="border-2 border-gray-400 rounded-lg px-4 py-2"
        >
          <option value="">Sort By</option>
          <option value="title">Title</option>
          <option value="price">Price</option>
        </select>
      </div>
      <div className="mx-auto py-2 px-36">
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
          <TableBody>{tableRows}</TableBody>
        </Table>
        <div className="flex justify-center mt-4">
          {Array.from(
            {
              length: Math.ceil(
                filteredAndSortedProducts.length / productsPerPage
              ),
            },
            (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`mx-1 px-3 py-1 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
