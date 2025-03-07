import { IProductCategory } from "./productCategoryInterface";
import { IProductBrand } from "./productBrandInterface";
import { IProductAttr } from "./productAttribute";
import { IProductRating } from "./productRatingInterface";
export interface IProduct {
  _id?: string;
  productName: string;
  productDesc: string;
  productShortDesc: string;
  productPrice: number;
  productCurr: string;
  productImages: string[];
  productAttr: IProductAttr[];
  productBrand: IProductBrand;
  productCategory: IProductCategory[];
  productTag: string[];
  productDimensions: {
    length: number;
    breath: number;
    height: number;
    measurement: string;
  };
  productWeight: {
    weight: number;
    measurement: string;
  };
  productRating: IProductRating[];
  stock: number;
  isStockAvailable: boolean;
  isActive: boolean;
}
