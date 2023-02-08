import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Product} from "../products/product";
import {ProductCategory} from "../products/product-category";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = "http://localhost:8081/products";

  private categoryUrl = "http://localhost:8081/product-category"

  private size = "&size=100";

  constructor(private http: HttpClient) { }

  getProducts(categoryId: number): Observable<Product[]>
  {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&${this.size}`;

    return this.http.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductListPaginate(categoryId: number, page: number, pageSize: number): Observable<GetResponseProducts>
  {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${page}&size=${pageSize}`;

    return this.http.get<GetResponseProducts>(searchUrl);
  }


  getProductCategories(): Observable<ProductCategory[]> {

    return this.http.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(value => value._embedded.productCategory)
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
