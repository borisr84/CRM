import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { IProduct } from './IProduct';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) { }
  productId : number;
  productDetails : IProduct;
  errorDetails : string;

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get("id"));
    this.productService.getProductById(this.productId).subscribe(
      {
        next: prod => this.productDetails = prod,
        error: err => this.errorDetails = err
      }
    )
  }

  backEvent() {
    this.router.navigate(['./products']);
  }

}
