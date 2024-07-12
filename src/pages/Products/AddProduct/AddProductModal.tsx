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
import { useState } from "react";

const AddProductModal = () => {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary-gradient text-xl  font-semibold bg-yellow-500">
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-yellow-100 ">
        <DialogHeader>
          <DialogTitle className="text-center">Add Product</DialogTitle>
        </DialogHeader>
        <form>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <Input
                // onBlur={(e) => setTask(e.target.value)}
                id="image"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                onBlur={(e) => setTitle(e.target.value)}
                id="task"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="brand" className="text-right">
                Brand
              </Label>
              <Input
                onBlur={(e) => setBrand(e.target.value)}
                id="brand"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                onBlur={(e) => setPrice(e.target.value)}
                id="price"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                onBlur={(e) => setDescription(e.target.value)}
                id="description"
                className="col-span-3"
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
                <SelectContent className=" bg-yellow-100">
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="trees">Trees</SelectItem>
                    <SelectItem value="medium">Shrubs</SelectItem>
                    <SelectItem value="vagetables">Vagetables</SelectItem>
                    <SelectItem value="fruits">Fruits</SelectItem>
                    <SelectItem value="herbs">Herbs</SelectItem>
                    <SelectItem value="flowering platns">
                      Flowering Platns
                    </SelectItem>
                    <SelectItem value="indoor plants">Indoor Plants</SelectItem>
                    <SelectItem value="specialty plants">
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
