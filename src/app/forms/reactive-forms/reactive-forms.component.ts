import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduct } from 'src/app/products/IProduct';
import { Product } from 'src/app/products/Product';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent {

    form: FormGroup;
    @Output() addProductEvent = new EventEmitter<IProduct>();
    
    constructor(fb: FormBuilder) {
        this.form = fb.group({
            id: new FormControl("", Validators.required),
            prodName: new FormControl("", Validators.required),
            prodQuantity: new FormControl(""),
            prodPrice: new FormControl("", Validators.required),
            prodDescription: new FormControl("", Validators.required),
            prodLocation: new FormControl("", Validators.required),
        });
    }

    onSubmit() {
      let prod = new Product(this.form.get('id').value, 
      this.form.get('prodName').value, 
      this.form.get('prodDescription').value, 
      this.form.get('prodQuantity').value, 
      this.form.get('prodPrice').value, 
      this.form.get('prodLocation').value);
      this.addProductEvent.emit(prod);

      console.log(`Product to add: ID=${prod.id}, Name=${prod.name}, Description=${prod.description},
        Quantity=${prod.quantity}, Price=${prod.price}, Location=${prod.location}`);
      this.onClear();
    }
  
    onClear() {
      this.form.reset();
    }

}
