import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect, FormEvent } from "react";
import { useUpdateProductMutation } from "@/redux/api/baseApi";
import Swal from "sweetalert2";
import { TProduct } from "@/types";

const UpdateProductModal = ({ product, refetch }: { product: TProduct }) => {
  const [title, setTitle] = useState(product?.title || "");
  const [brand, setBrand] = useState(product?.brand || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [image, setImage] = useState(product?.image || "");
  const [description, setDescription] = useState(product?.description || "");
  const [category, setCategory] = useState(product?.category || "");
  const [rating, setRating] = useState(product?.rating || 0);
  const [stock, setStock] = useState(product?.stock || 0);

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  if (isLoading) {
    <h1>Loading.....</h1>;
  }

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setBrand(product.brand);
      setPrice(product.price);
      setImage(product.image);
      setDescription(product.description);
      setCategory(product.category);
      setRating(product.rating);
      setStock(product.stock);
    }
  }, [product]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const updatedProduct = {
      _id: product._id,
      title,
      brand,
      price,
      image,
      description,
      category,
      rating,
      stock,
    };
    console.log(updatedProduct);
    try {
      await updateProduct({ id: product._id, ...updatedProduct });
      refetch();

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Product Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire("Error", "Failed to update product", "error");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#5C53FE] rounded-lg ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-yellow-100">
        <DialogHeader>
          <DialogTitle className="text-center">Update Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="brand" className="text-right">
                Brand
              </Label>
              <Input
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <Input
                id="image"
                type="text"
                onChange={(e) => setImage(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rating" className="text-right">
                Rating
              </Label>
              <Input
                id="rating"
                type="number"
                value={rating}
                onChange={(e) => setRating(parseFloat(e.target.value))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                Stock
              </Label>
              <Input
                id="stock"
                type="number"
                value={stock}
                onChange={(e) => setStock(parseInt(e.target.value))}
                className="col-span-3"
              />
            </div>
          </div>
          <Button className="ml-36 bg-yellow-600 rounded-lg" type="submit">
            Update Product
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProductModal;
