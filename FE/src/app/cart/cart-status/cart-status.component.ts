import { Component, OnInit } from '@angular/core';
import {CartService} from "../../services/cart.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
    console.log(this.totalQuantity)
    console.log(this.totalPrice)
    console.log(this.cartService.numberOfItems())

  }

  updateCartStatus() {

    this.cartService.totalPrice.subscribe({
      next: value => {
        this.totalPrice = value;
        console.log(value);
      },
      error: err => {console.log(err)}
    });

    this.cartService.totalQuantity.subscribe({
      next: value => {
        this.totalQuantity = value;
        console.log(this.totalQuantity);
      },
      error: err => {
        console.log(err)}
    });



  }
}
