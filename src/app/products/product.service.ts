import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IProduct } from './IProduct';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Product } from './Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products/products.json';
  private readonly rootURL = 'https://localhost:5001/api/products';
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };
  constructor(private http: HttpClient) { 
  }

  getProducts() : Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.rootURL}/`).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getProductById(id: number) : Observable<IProduct> {
    return this.http.get<IProduct>(`${this.rootURL}/getProductById?prodId=${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addProduct(prod : IProduct) : Observable<IProduct> {
    return this.http.post<IProduct>(`${this.rootURL}`, prod).pipe(
      catchError(this.handleError));
  }

  deleteProduct(prodId : number) : Observable<boolean> {
    return this.http.delete<boolean>(`${this.rootURL}/${prodId}`).pipe(
      catchError(this.handleError));
  }

  //ToDo - Add feature to edit item in UI
  updateProduct(prodId : number, updatedData : IProduct)
  {
    return this.http.put(`${this.rootURL}/${prodId}`, updatedData).pipe(
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
