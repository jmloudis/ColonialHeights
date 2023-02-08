import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Purchase} from "../model/purchase";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseurl = "http://localhost:8081/api/checkout/purchase";

  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<any>
  {
    return this.httpClient.post<Purchase>(this.purchaseurl, purchase);
  }



}
