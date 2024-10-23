import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  filtered: Product[] = [];
  sortOrder: string = "";

  constructor(
    private productService: ProductService, 
    private cartService: CartService,
    private snackBar: MatSnackBar
  ){

  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe( data => {
      this.products = data;
      this.filtered = data;
    })
  }

  addTocart(product: Product): void{
    this.cartService.addToCart(product).subscribe({
      next: () => {
        this.snackBar.open("product added to cart!", "");
      }
    });
  }

  applyFilter(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLowerCase();

    this.filtered = this.products.filter(
      product => product.name.toLowerCase().includes(searchTerm)
    )
    this.sortProducts(this.sortOrder);
  }

  sortProducts(sortValue: string)
  {
    this.sortOrder = sortValue;
    if(this.sortOrder === "priceLowHigh")
    {
        this.filtered.sort((a,b) => a.price-b.price);
    }else if(this.sortOrder === "priceHighLow")
      {
        this.filtered.sort((a,b) => b.price-a.price);
      }
  }


}
