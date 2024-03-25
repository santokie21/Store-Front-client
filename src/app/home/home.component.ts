import { Component } from '@angular/core';
import { Products } from '../../types';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    private productsService: ProductsService
  ) { }

  baseUrl = 'http://localhost:3000/api/clothes';

  ngOnInit(): void {
    this.productsService
      .getProducts(this.baseUrl, { page: 1, perPage: 5 })
      .subscribe((products: Products) => {
        console.log(products.items);
      });
  }
}
