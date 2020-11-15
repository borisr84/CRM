import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { filter, map, reduce } from 'rxjs/operators';
import { IProduct } from './IProduct';
import { ProductService } from './product.service'

//ToDo:
//1. Change new product form to be in a popup window
//2. Add login information: Only admin will be able to manage products
//4. Add following controls: Combobox, Radiobuttons, Checkboxes, Toggle buttons

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products : IProduct[]; //ToDo - Move this to products service
  filteredProducts : IProduct[];
  errorMsg : string;
  isFilterByStartsWith : boolean = true;
  isAdding : boolean = false;
  submitStatus : string;

  constructor(private prodService : ProductService) { }

  ngOnInit(): void {
    this.prodService.getProducts().subscribe(
      {
        next: prods => {
          this.products = prods;
          this.filteredProducts = prods;
        },
        error: err => this.errorMsg = err
      })
  }

  private getFiltered(filterBy : string) : IProduct[]
  {
    if (filterBy === null || filterBy === undefined)
      return this.products;

    return this.products.filter((p : IProduct) => this.isFilterByStartsWith ? 
    p.Name.toLowerCase().startsWith(filterBy.toLowerCase()) : 
    p.Name.toLowerCase().includes(filterBy.toLowerCase()))
  }

  private _filterBy : string;
  get filterBy() : string{
    return this._filterBy;
  }

  set filterBy(value: string){
    this._filterBy = value;
    this.filteredProducts =  this.getFiltered(value);
  }

  onFilterByToggle() {
    this.isFilterByStartsWith = !this.isFilterByStartsWith;
    this.filterBy = this._filterBy;
  }

  onAddProductToggle() {
    this.isAdding = !this.isAdding;
  }

  onDelete(prodId : number) {
    this.prodService.deleteProduct(prodId).subscribe(
      prods => this.prodService.getProducts().subscribe(
          {
            next: prods => {
              this.products = prods;
              this.filteredProducts =  this.getFiltered(this._filterBy);
            },
            error: err => this.errorMsg = err
          }),
      err => console.log(`Failed to delete product with Id = ${prodId}. Error=${err}`)
    )

    console.log(`Product ID = ${prodId} is deleted`);
  }

  addProductHandler(newProd: IProduct)
  {
    console.log("New product event is received");

    this.prodService.addProduct(newProd).subscribe(
      res => {
        this.products.push(res);
        this.filteredProducts =  this.getFiltered(this._filterBy);
      },
      err => console.log(`Error adding item ${JSON.stringify(newProd)}`)
    )  

    console.log(`Product = ${JSON.stringify(newProd)} is added`);
  }

}
