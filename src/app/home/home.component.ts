import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'

})
export class HomeComponent {
  constructor(
    private productsService: ProductsService
  ) { }

  products: Product[] = [];

  baseUrl = 'http://localhost:3000/api/clothes';

  ngOnInit(): void {
    this.productsService
      .getProducts(this.baseUrl, { page: 1, perPage: 5 })
      .subscribe((products: Products) => {
        this.products = products.items;
      });
  }

  onProductOutput(product: Product): void {
    console.log(product, "output");
  }
}
