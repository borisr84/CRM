import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ProductsListComponent],
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
