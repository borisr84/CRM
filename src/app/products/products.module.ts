import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list.component';
import { RouterModule } from '@angular/router';
import { QuantityPipe } from './quantity.pipe';
import { ProductDetailsComponent } from './product-details.component';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from "@angular/forms";

import { TemplateFormsComponent } from '../forms/template-forms/template-forms.component';
import { ReactiveFormsComponent } from '../forms/reactive-forms/reactive-forms.component';

@NgModule({
  declarations: [ProductsListComponent, QuantityPipe, ProductDetailsComponent, TemplateFormsComponent, ReactiveFormsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(
      [
        {path: 'products', component: ProductsListComponent},
        {path: 'products/:id', component: ProductDetailsComponent}
      ]
    )
  ]
})
export class ProductsModule { }
