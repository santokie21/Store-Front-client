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

  totalRecords: number = 0;
  rows: number = 5;

  baseUrl = 'http://localhost:3000/api/clothes';

  onProductOutput(product: Product): void {
    console.log(product, "output");
  }

  onPageChange(event: any): void {
    this.fetchProducts(event.page + 1, event.rows);
  }

  fetchProducts(page: number, perPage: number): void {
    this.productsService
      .getProducts(this.baseUrl, { page, perPage })
      .subscribe((products: Products) => {
        this.products = products.items;
        this.totalRecords = products.total;
      });
  }

  ngOnInit(): void {
    this.fetchProducts(1, this.rows);
  }

}
