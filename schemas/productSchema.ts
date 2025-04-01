import { z } from "zod";

export const productFormSchema = z.object({
  sku: z.string().min(1, "SKU is required"),
  productName: z.string().min(1, "Product name is required"),
  size: z.string().min(1, "Size is required"),
  color: z.string().min(1, "Color is required"),
  category: z.string().min(1, "Category is required"),
  price: z.string().min(1, "Price is required"),
  quantity: z.string().min(1, "Stock quantity is required"),
  status: z.string().min(1, "Status is required"),
  images: z.array(z.instanceof(File)).min(1, "At least one image is required").max(4, "You can upload up to 4 images"),
});