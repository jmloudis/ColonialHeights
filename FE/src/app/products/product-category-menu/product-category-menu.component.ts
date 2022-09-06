import { Component, OnInit } from '@angular/core';
import {ProductCategory} from "../product-category";
import {ProductService} from "../../services/product.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories!: ProductCategory[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProductCategories();
  }

  private listProductCategories() {
    this.productService.getProductCategories().subscribe({
      next: value => {
        console.log("Product Categories = " + JSON.stringify(value));
        this.productCategories = value;
      },
      error: err => {console.log(err)}
    });
  }
}
