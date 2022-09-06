import { Component, OnInit } from '@angular/core';
import {Product} from "../product";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {CartItem} from "../../cart/cart-item";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();
  productDescription!: String[];
  imgHeight = "900";
  showButton: boolean = false;
  isClicked: boolean = false;
  totalQ!: number;
  totalP!: number;

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: () => {this.handleProductDetails()}
    })

  }


  private handleProductDetails() {
    const productId: number = +this.route.snapshot.paramMap.get("id")!;

    this.productService.getProduct(productId).subscribe({
      next: value => {
        this.product = value;

        this.productDescription = this.product.description.split(/[.!]/);

        for (let i = 0; i < this.productDescription.length; i++)
        {
          // console.log(this.productDescription[i])
          if (this.productDescription[i] == "")
          {
            // console.log("This is null")
            this.productDescription.splice(i, 1);
          }
        }

      }
    })
  }

  selectChange() {
    console.log("value changed")
  }


  /**
   * Testing
   */
  // Clicked image on details page
  zoom(): boolean{
    console.log("clicked")
    return true;
  }

  hoverOn(): boolean{

    console.log("hovered over image")

    return false;
  }

  hoverOff(): boolean {
    console.log("hovered off image")


    return true
  }

  addToCart(addProduct: Product) {
    console.log(`adding to cart: ${addProduct.name}, ${addProduct.unitPrice}`)

    const theCartItem = new CartItem(addProduct);

    this.cartService.addToCart(theCartItem);


  }
}
