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
      .subscribe({
        next: (data: Products) => {
          this.products = data.items;
          this.totalRecords = data.total;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  ngOnInit(): void {
    this.fetchProducts(1, this.rows);
  }

  addProduct(product: Product): void {
    this.productsService.addProduct(this.baseUrl, product).subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(1, this.rows);
      },
      error: (error) => {
        console.error(error)
      }
    });
  }

  deleteProduct(product: Product, id: string): void {
    this.productsService.deleteProduct(`${this.baseUrl}/${id}`).subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(1, this.rows);
      },
      error: (error) => {
        console.error(error)
      }
    });
  }

  updateProduct(product: Product, id: string): void {
    this.productsService.updateProduct(`${this.baseUrl}/${id}`, product).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.fetchProducts(1, this.rows);
        },
        error: (error) => {
          console.error(error)
        }
      });
  }
}
