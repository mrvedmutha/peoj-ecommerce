import { IProductCategory } from "@/types/product/productCategoryInterface";
import { IProductBrand } from "@/types/product/productBrandInterface";
import { IProductAttr } from "@/types/product/productAttribute";
import { IProductReview } from "@/types/product/productReviewInterface";
import { ITax } from "@/types/store/taxSetting";
import { IProductPriceDetails } from "@/types/product/productPriceDetailsInterface";
import { IProductDimension } from "@/types/product/productDimension";
import { IProductSEODetails } from "@/types/product/productSEODetails";
export interface IProduct {
  _id?: string;
  title: string;
  alias?: string;
  description: string;
  shortDescription: string;
  sku?: string;
  images?: string[];
  priceDetails?: IProductPriceDetails[];
  taxDetails?: {
    isTax: boolean;
    tax: ITax;
  };
  cogs?: number;
  profit?: number;
  margin?: number;
  package?: IProductDimension;
  metafields?: IProductSEODetails;
  stock: {
    isAvailable: boolean;
    quantity: number;
  };
  category: IProductCategory;
  brand: IProductBrand;
  slug: string;
  reviews?: IProductReview[];
  attributes?: IProductAttr[];
  tags?: string[];
  vendor?: string;
  createdAt: Date;
  updatedAt: Date;
}
