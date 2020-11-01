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

import { ControlErrorsDirective } from '../forms/reactive-forms/validations/control-errors.directive';
import { ControlErrorComponent } from '../forms/reactive-forms/validations/control-error.component';
import { ControlErrorContainerDirective } from '../forms/reactive-forms/validations/control-error-container.directive';
import { FormSubmitDirective } from '../forms/reactive-forms/validations/form-submit.directive';

@NgModule({
  declarations: [ProductsListComponent, QuantityPipe, ProductDetailsComponent, TemplateFormsComponent, ReactiveFormsComponent, 
    ControlErrorsDirective, ControlErrorComponent, ControlErrorContainerDirective, FormSubmitDirective],
  entryComponents: [ControlErrorComponent],
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
