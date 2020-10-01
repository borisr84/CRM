import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list.component';
import { RouterModule } from '@angular/router';
import { QuantityPipe } from './quantity.pipe';
import { ProductDetailsComponent } from './product-details.component';



@NgModule({
  declarations: [ProductsListComponent, QuantityPipe, ProductDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        {path: 'products', component: ProductsListComponent},
        {path: 'products/:id', component: ProductDetailsComponent}
      ]
    )
  ]
})
export class ProductsModule { }
