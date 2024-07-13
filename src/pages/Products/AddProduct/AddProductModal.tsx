import { Button } from "@/components/ui/button";
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
import { FormEvent, useState } from "react";
import { useAddProductMutation } from "@/redux/api/baseApi";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { createProduct } from "@/redux/features/productSlice";

const AddProductModal = ({ refetch }) => {
  const [title, setTitle] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [rating, setRating] = useState<number>(0); // Add rating state
  const [stock, setStock] = useState<number>(0); // Add stock state

  const [addProduct, { isLoading }] = useAddProductMutation();

  const dispatch = useDispatch();

  if (isLoading) {
    return <h1>Loading......</h1>;
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const productDetails = {
      title,
      brand,
      price,
      image,
      description,
      category,
      rating, // Include rating
      stock, // Include stock
      isDeleted: false,
    };
    try {
      console.log("Submitting Product:", productDetails); // Debugging log
      await addProduct(productDetails);
      await dispatch(createProduct(productDetails));
      refetch();
      Swal.fire("Success", "Product added successfully!", "success");
      // Reset form fields
      setTitle("");
      setBrand("");
      setPrice(0);
      setImage("");
      setDescription("");
      setCategory("");
      setRating(0); // Reset rating
      setStock(0); // Reset stock
    } catch (error) {
      console.error("Error adding product:", error); // Debugging log
      Swal.fire("Error", "Failed to add product", "error");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary-gradient text-xl font-semibold bg-yellow-500">
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-yellow-100">
        <DialogHeader>
          <DialogTitle className="text-center">Add Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <Input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                id="image"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="brand" className="text-right">
                Brand
              </Label>
              <Input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                id="brand"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                id="price"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rating" className="text-right">
                Rating
              </Label>
              <Input
                type="number"
                value={rating}
                onChange={(e) => setRating(parseFloat(e.target.value))}
                id="rating"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                Stock
              </Label>
              <Input
                type="number"
                value={stock}
                onChange={(e) => setStock(parseFloat(e.target.value))}
                id="stock"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="category" className="text-right">
                Category
              </label>
              <Select onValueChange={(value) => setCategory(value)}>
                <SelectTrigger className="col-span-3">
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
          </div>
          <DialogClose>
            <Button className="ml-36 bg-yellow-600 rounded-lg" type="submit">
              Add Product
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
