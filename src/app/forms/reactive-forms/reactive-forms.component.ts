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
    control: FormControl;

    //Experimenting with sharing data from child to parent
    //Alternatively, we could use prdoucts service to store the data there
    @Output() addProductEvent = new EventEmitter<IProduct>();
    
    constructor(fb: FormBuilder) {
        
        this.control = fb.control('', Validators.required);

        this.form = fb.group({
            id: new FormControl(""),
            prodName: new FormControl("", Validators.required),
            prodQuantity: new FormControl("", Validators.required),
            prodPrice: new FormControl("", Validators.required),
            prodDescription: new FormControl("", Validators.required),
            prodLocation: new FormControl("", Validators.required),
        });
    }

    onSubmit() {
      let prod = new Product( 
      this.form.get('prodName').value, 
      this.form.get('prodDescription').value, 
      this.form.get('prodQuantity').value, 
      this.form.get('prodPrice').value, 
      this.form.get('prodLocation').value);
      this.addProductEvent.emit(prod);

      console.log(`Product to add: Name=${prod.Name}, Description=${prod.Description},
        Quantity=${prod.Quantity}, Price=${prod.Price}, Location=${prod.Location}`);
      //this.onClear(); //ToDo - Clear only upon success from back-end, hence this should be moved to a different locationnpm
    }
  
    onClear() {
      this.form.reset();
    }

}
