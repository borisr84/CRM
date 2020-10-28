import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IProduct } from './../..//products/IProduct';
import { Product } from './../../products/Product';

@Component({
  selector: 'app-template-forms',
  templateUrl: './template-forms.component.html',
  styleUrls: ['./template-forms.component.css']
})
export class TemplateFormsComponent implements OnInit {
  @Output() addProductEvent = new EventEmitter<IProduct>();

  ngOnInit(): void {
  }

  @ViewChild('f') courseForm: NgForm;

  //ToDo - Add verification that all fields are filled in
  onSubmit(form: NgForm) {
    let curProdFormDetails = form.value;

    this.addProductEvent.emit(new Product
      (curProdFormDetails.prodId, curProdFormDetails.prodName, curProdFormDetails.prodDescription, curProdFormDetails.prodQuantity,
        curProdFormDetails.prodPrice, curProdFormDetails.prodLocation));

    console.log("New product add event is sent");
    this.onClear();
  }

  onClear() {
    // Now that we have access to the form via the 'ViewChild', we can access the form and clear it.
    this.courseForm.reset();
  }
}
