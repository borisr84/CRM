import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { stringify } from 'querystring';

import { IProduct } from './../..//products/IProduct';
import { Product } from './../../products/Product';

@Component({
  selector: 'app-template-forms',
  templateUrl: './template-forms.component.html',
  styleUrls: ['./template-forms.component.css']
})
export class TemplateFormsComponent {
  id : number = 1; //Add validation that id does not repeat itself
  name : string = "";
  desc : string = "something";
  price : number; //Add validation for correct price representation
  quantity : number; //Add validation that number is actually an integer
  location : string; //ToDo - Change this to combo

  @Output() addProductEvent = new EventEmitter<IProduct>();

  onSubmit(form : NgForm) {
    let prod = new Product(this.id, this.name, this.desc, this.quantity, this.price, this.location);
    this.addProductEvent.emit(prod);

    console.log("New product add event is sent");
    this.onClear(form);
  }

  onClear(form : NgForm) {
    // Now that we have access to the form via the 'ViewChild', we can access the form and clear it.
    form.reset();
  }
}
