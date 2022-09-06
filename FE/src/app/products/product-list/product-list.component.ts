import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../product";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  currentCategoryName!: string;
  previousCategoryId: number = 1;


  //pagination
  pageNumber = 1;
  pageSize = 20;
  totalElements = 0;

  // infinite scroll pagination
  start = 0;
  productArr: Product[] = [];



  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void
  {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });

  }

  listProducts() {

    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has("id");

    if (hasCategoryId)
    {
      this.currentCategoryId = +this.route.snapshot.paramMap.get("id")!;

      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;

    } else {
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }

    // Check category Id

    if (this.previousCategoryId != this.currentCategoryId)
    {
      this.pageNumber = 1;

    }
    this.previousCategoryId = this.currentCategoryId;
    console.log("current Category Id = " + this.currentCategoryId + ": page number = " + this.pageNumber);

    this.paginate();
    // this.infinitePagination()
  }

  paginate()
  {
    this.productService.getProductListPaginate(this.currentCategoryId, this.pageNumber - 1, this.pageSize).subscribe({
      next: value => {
        this.products = value._embedded.products;
        this.pageNumber = value.page.number + 1;
        this.pageSize = value.page.size;
        this.totalElements = value.page.totalElements;
        console.log(this.products);
      },
      error: err => {console.log(err)}
    });
  }


  infinitePagination()
  {
    this.productService.getProductListPaginate(this.currentCategoryId, this.pageNumber - 1, this.pageSize).subscribe({
      next: value => {
        this.products = value._embedded.products;
        this.productArr = this.products.slice(0, 20);
        this.pageSize = value.page.size;
        this.pageNumber = value.page.number + 1;
        this.totalElements = value.page.totalElements;
        console.log(this.products);
      },
      error: err => {console.log(err)}
    });
  }

  // addItems(index: number, sum: number) {
  //   for (let i = index; i < sum; ++i) {
  //     // debugger
  //     this.productArr.push(this.products[i])
  //     console.log(this.productArr);
  //   }
  // }

  onScroll() {
    // pagination

    // this.listProducts();
    // this.pageSize += 20;
    // this.pageNumber++;
    // console.log(this.pageNumber)

    //infinite pagination
    // this.start = this.pageSize;
    // this.pageNumber++;
    // this.pageSize += 20;
    // this.infinitePagination();

    console.log("Scrolled down")

  }

  scrollTop() {
    // window.scroll({ top: 0, behavior: 'smooth' });


  }
}
