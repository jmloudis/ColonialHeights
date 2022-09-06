import { Component, OnInit } from '@angular/core';
import {CartItem} from "../cart-item";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;


  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  private listCartDetails() {

    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe({
      next: value => {
        this.totalPrice = value;
        console.log(this.totalPrice)
      },
      error: err => {
        console.log(err)}
    });

    this.cartService.totalQuantity.subscribe({
      next: value => {
        this.totalQuantity = value;
        console.log(this.totalQuantity)
      },
      error: err => {
        console.log(err)
      }
    });

    this.cartService.computeCartTotal();

  }


  remove(item: CartItem) {

    this.cartService.remove(item);

  }
}
