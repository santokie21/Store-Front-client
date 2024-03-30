import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { Product, Products } from '../../types';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ProductComponent } from '../components/product/product.component';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule, EditPopupComponent, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'

})
export class HomeComponent {
  constructor(
    private productsService: ProductsService
  ) { }

  @ViewChild('paginator') paginator: Paginator | undefined;

  products: Product[] = [];

  totalRecords: number = 0;
  rows: number = 5;

  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  toggleEditPopup(product: Product): void {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  toggleAddPopup(): void {
    this.displayAddPopup = true;
  }

  toggleDeletePopup(product: Product): void {
    if (!product._id) {
      return;
    }
    this.deleteProduct(product._id);
  }

  selectedProduct: Product = {
    _id: '',
    name: '',
    image: '',
    price: '',
    rating: 0
  }

  onConfirmAdd(product: Product): void {
    this.addProduct(product);
    this.displayAddPopup = false;
  }

  onConfirmEdit(product: Product): void {
    if (!this.selectedProduct._id) {
      return;
    }
    this.updateProduct(product, this.selectedProduct._id);
    this.displayEditPopup = false;
  }

  baseUrl = 'http://localhost:3000/api/clothes';

  onProductOutput(product: Product): void {
    console.log(product, "output");
  }

  onPageChange(event: any): void {
    this.fetchProducts(event.page + 1, event.rows);
  }

  resetPaginator(): void {
    this.paginator?.changePage(1);
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
        this.resetPaginator();
      },
      error: (error) => {
        console.error(error)
      }
    });
  }

  deleteProduct(id: string): void {
    this.productsService.deleteProduct(`${this.baseUrl}/${id}`).subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(1, this.rows);
        this.resetPaginator();
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
          this.resetPaginator();
        },
        error: (error) => {
          console.error(error)
        }
      });
  }
}
