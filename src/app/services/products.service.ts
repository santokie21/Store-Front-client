import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationParams, Product, Products } from '../../types';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiService: ApiService) { }

  getProducts = (url: string, params: PaginationParams): Observable<Products> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  }

  addProduct = (url: string, product: Product): Observable<any> => {
    return this.apiService.post(url, product, {
      responseType: 'json',
    });
  }

  deleteProduct = (url: string): Observable<any> => {
    return this.apiService.delete(url, {
      responseType: 'json',
    });
  }

  updateProduct = (url: string, product: Product): Observable<any> => {
    return this.apiService.put(url, product, {
      responseType: 'json',
    });
  }
}
