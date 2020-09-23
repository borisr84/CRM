import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list.component';
import { RouterModule } from '@angular/router';
import { QuantityPipe } from './quantity.pipe';



@NgModule({
  declarations: [ProductsListComponent, QuantityPipe],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        {path: 'products', component: ProductsListComponent}
      ]
    )
  ]
})
export class ProductsModule { }
