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
  products : IProduct[];
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
      }
    )
  }

  private getFiltered(filterBy : string) : IProduct[]
  {
    if (filterBy === null || filterBy === undefined)
      return this.filteredProducts;

    return this.products.filter((p : IProduct) => this.isFilterByStartsWith ? 
    p.name.toLowerCase().startsWith(filterBy.toLowerCase()) : 
    p.name.toLowerCase().includes(filterBy.toLowerCase()))
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
    this.products = this.products.filter(x => x.id !== prodId);
    this.filteredProducts =  this.getFiltered(this._filterBy);

    console.log(`Product ID = ${prodId} is deleted`);
  }

  addProductHandler(newProd: IProduct)
  {
    console.log("New product event is received");

    this.products.push(newProd);
    this.filteredProducts =  this.getFiltered(this._filterBy);
  }

}
