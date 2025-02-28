export interface IProduct {
  _id?: string;
  productName: string;
  productDesc: string;
  productShortDesc: string;
  productPrice: number;
  productCurr: string;
  productAttr: IProductAttr[];
  productBrand: IBrand;
  productCategory: ICategory[];
  productTag: IProductTag[];
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
  stock: number;
  isStockAvailable: boolean;
  isActive: boolean;
}
