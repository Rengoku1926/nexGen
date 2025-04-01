"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { productFormSchema } from "@/schemas/productSchema";
import { z } from "zod";

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productFormSchema),
  });

  const [images, setImages] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const handleImageUpload = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) =>
          prev.map((img, i) => (i === index ? (reader.result as string) : img))
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    console.log("Uploaded Images:", images);
  };
  return (
    <form
  onSubmit={handleSubmit(onSubmit)}
  className="flex flex-wrap gap-4 w-full md:flex-nowrap lg:flex-nowrap"
>
      {/* Left Section - Product Form */}
      <Card className="lg:w-1/2 md:w-1/2 sm:w-full bg-[3D3D3D] text-white p-6">
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
          <p className="text-sm text-gray-400">
            Lorem ipsum dolor sit amet consectetur.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="mb-2">SKU</Label>
              <Input placeholder="Input no SKU" {...register("sku")} />
              {errors.sku && (
                <p className="text-red-500 text-sm">{errors.sku.message}</p>
              )}
            </div>
            <div>
              <Label className="mb-2">Product Name</Label>
              <Input
                placeholder="Input product name"
                {...register("productName")}
              />
              {errors.productName && (
                <p className="text-red-500 text-sm">
                  {errors.productName.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2">Size</Label>
                <Input placeholder="Input Size" {...register("size")} />
                {errors.size && (
                  <p className="text-red-500 text-sm">{errors.size.message}</p>
                )}
              </div>
              <div>
                <Label className="mb-2">Color</Label>
                <Input placeholder="Color" {...register("color")} />
                {errors.color && (
                  <p className="text-red-500 text-sm">{errors.color.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2">Product Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="home">Home</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-2">Price</Label>
                <Input placeholder="Input Price" {...register("price")} />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>
            </div>
            <div>
              <Label className="mb-2">Quantity</Label>
              <Input placeholder="Input stock" {...register("quantity")} />
              {errors.quantity && (
                <p className="text-red-500 text-sm">
                  {errors.quantity.message}
                </p>
              )}
            </div>
            <div>
              <Label className="mb-2">Status Product</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select status product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Right Section - Image Upload & Submit */}
      <Card className="lg:w-1/2 md:w-1/2 sm:w-full bg-[3D3D3D] text-white p-6 flex flex-col justify-between">
        <CardHeader>
          <CardTitle>Image Product</CardTitle>
          <p className="text-xs text-blue-400">
            Note: Format photos SVG, PNG, or JPG (Max size 4mb)
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mt-2">
            {["Photo 1", "Photo 2", "Photo 3", "Photo 4"].map(
              (label, index) => (
                <label
                  key={index}
                  className="border-2 border-dashed border-gray-500 p-2 flex flex-col items-center cursor-pointer w-[94px] h-[98px] justify-center"
                >
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/svg+xml"
                    className="hidden"
                    onChange={(e) => handleImageUpload(index, e)}
                  />
                  {images[index] ? (
                    <img
                      src={images[index]!}
                      alt={label}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <span className="text-gray-400">🖼</span>
                      <p className="text-sm text-gray-300 text-center">
                        {label}
                      </p>
                    </>
                  )}
                </label>
              )
            )}
          </div>
        </CardContent>
        <div className="p-4">
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            Save Product
          </Button>
        </div>
      </Card>
    </form>
  );
}
