import { Component, OnInit } from '@angular/core';
import { IProduct } from './IProduct';
import { ProductService } from './product.service'

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products : IProduct[] = [];
  errorMsg : string;

  constructor(private prodService : ProductService) { }

  ngOnInit(): void {
    this.prodService.getProducts().subscribe(
      {
        next: prods => this.products = prods,
        error: err => this.errorMsg = err
      }
    )
  }

}
