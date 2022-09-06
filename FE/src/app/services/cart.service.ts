import { Injectable } from '@angular/core';
import {CartItem} from "../cart/cart-item";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<any> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<any> = new BehaviorSubject<number>(0);



  storage: Storage = sessionStorage;

  constructor() {

    let data = JSON.parse(this.storage.getItem('cartItems')!);

    if (data != null)
    {
      this.cartItems = data;

      this.computeCartTotal();
    }

  }

  addToCart(cartItem: CartItem)
  {
    // check if item is in cart

    let alreadyExistsInCart: boolean = false;
    let existingCartItem!: CartItem;

    if(this.cartItems.length > 0)
    {
      // find the item in the cart based on item id

      // existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === cartItem.id)!;


      for(let tempCartItem of this.cartItems)
      {
        if (tempCartItem.id === cartItem.id)
        {
          existingCartItem = tempCartItem;
          break;
        }
      }

      //check that we found the item

      alreadyExistsInCart = (existingCartItem != undefined);


    }

    if (alreadyExistsInCart) {
      existingCartItem.quantity++;
    }
    else{
      this.cartItems.push(cartItem);
    }


    this.computeCartTotal();




  }

  computeCartTotal() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItems of this.cartItems)
    {
      totalPriceValue += currentCartItems.unitPrice * currentCartItems.quantity;
      totalQuantityValue += currentCartItems.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //log cart data
    this.logCartData(totalPriceValue, totalQuantityValue);

    // invoke persistCartData()
    this.persistCartItems();

  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log("Contents of the cart: ");
    for (let cartItems of this.cartItems)
    {
      const subTotalPrice = cartItems.quantity * cartItems.unitPrice;
      console.log(`name: ${cartItems.name}, Quantity: ${cartItems.quantity}, Price: ${cartItems.unitPrice}, total price: ${subTotalPrice}`);

    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log("-----")

  }

  persistCartItems() {
    // this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  numberOfItems(): number{
    let itemsInCart = JSON.parse(sessionStorage.getItem('cartItems')|| '{}');
    return itemsInCart.totalQuantity;
  }

  remove(item: CartItem) {

    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === item.id);

    if (itemIndex > -1)
    {
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotal();
    }

  }
}
