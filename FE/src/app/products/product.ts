export class Product {
  id!: number;
  sku!: string;
  name!: string;
  description!: string;
  unitPrice!: number;
  imageUrl!: string;
  active!: boolean;
  unitsInStock!: number;
  dateCreated!: Date;
  lastUpdated!: Date;

  constructor() {
  }

  // constructor(public id: number,
  //             sku: string;
  //             name : string;
  //             description: string;
  //             unitPrice: number;
  //             imageUrl: string;
  //             active: boolean;
  //             unitsInStock: number;
  //             dateCreated: Date;
  //             lastUpdated: Date;) {
  // }
}
