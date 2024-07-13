import React, { useState } from "react";

import { useAddProductMutation } from "@/redux/api/baseApi";
import Swal from "sweetalert2";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddProductModal = ({ refetch }) => {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0); // Add rating state
  const [stock, setStock] = useState(0); // Add stock state

  const [addProduct, { isLoading }] = useAddProductMutation();
  if (isLoading) {
    <p className="text-3xl text-center text-black-500 my-2 font-bold">
      Loading....
    </p>;
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productDetails = {
      title,
      brand,
      price,
      image,
      description,
      category,
      rating,
      stock,
      isDeleted: false,
    };
    try {
      await addProduct(productDetails);
      refetch();
      Swal.fire("Success", "Product added successfully!", "success");
      setTitle("");
      setBrand("");
      setPrice(0);
      setImage("");
      setDescription("");
      setCategory("");
      setRating(0);
      setStock(0);
    } catch (error) {
      console.error("Error adding product:", error);
      Swal.fire("Error", "Failed to add product", "error");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-primary-gradient text-xl font-bold bg-yellow-400 hover:bg-yellow-300 py-2 px-4 rounded-lg">
          Add Product
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md mx-auto p-4 sm:p-8 bg-yellow-100">
        <DialogHeader>
          <DialogTitle className="text-center">Add Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <Input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                id="image"
                className="col-span-3 w-full p-2 border rounded"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                className="col-span-3 w-full p-2 border rounded"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="brand" className="text-right">
                Brand
              </Label>
              <Input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                id="brand"
                className="col-span-3 w-full p-2 border rounded"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                id="price"
                className="col-span-3 w-full p-2 border rounded"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
                className="col-span-3 w-full p-2 border rounded"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="rating" className="text-right">
                Rating
              </Label>
              <Input
                type="number"
                value={rating}
                onChange={(e) => setRating(parseFloat(e.target.value))}
                id="rating"
                className="col-span-3 w-full p-2 border rounded"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                Stock
              </Label>
              <Input
                type="number"
                value={stock}
                onChange={(e) => setStock(parseFloat(e.target.value))}
                id="stock"
                className="col-span-3 w-full p-2 border rounded"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select
                onValueChange={(value) => setCategory(value)}
                className="col-span-3"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-yellow-100">
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="Trees">Trees</SelectItem>
                    <SelectItem value="Shrubs">Shrubs</SelectItem>
                    <SelectItem value="Vegetables">Vegetables</SelectItem>
                    <SelectItem value="Fruits">Fruits</SelectItem>
                    <SelectItem value="Herbs">Herbs</SelectItem>
                    <SelectItem value="Flowering Plants">
                      Flowering Plants
                    </SelectItem>
                    <SelectItem value="Indoor Plants">Indoor Plants</SelectItem>
                    <SelectItem value="Specialty Plants">
                      Specialty Plants
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="text-center mt-4">
              <DialogClose>
                <button
                  className="bg-yellow-600 text-white hover:bg-yellow-700 py-2 px-4 rounded-lg"
                  type="submit"
                >
                  Add Product
                </button>
              </DialogClose>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
