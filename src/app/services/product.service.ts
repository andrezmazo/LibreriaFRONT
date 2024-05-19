import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { environment } from '../environments/environment';
import { Observable, map } from 'rxjs';
import { QueryStringService } from './query-string-service';
import { PaginatorResponse } from '../models/paginator-response';
import { FilterPaginator } from '../models/filter-paginator';
import { Filter } from '../models/filter';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl: string;

  constructor(
    private http: HttpClient,
    private queryStringService: QueryStringService
  ) {
    this.baseUrl = `${environment.apiBaseRoute}/product`;
  }

  getById(idProduct: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${idProduct}`);
  }

  create(product: Product) {
    const newProduct = this.prepareBody(product);
    return this.http
      .post<Product>(`${this.baseUrl}/`, newProduct)
      .pipe(map(this.prepareResponse));
  }

  delete(idProduct: number): Observable<null> {
    return this.http.delete<null>(`${this.baseUrl}/${idProduct}`);
  }

  update(product: Product) {
    return this.http
      .put<Product>(`${this.baseUrl}/${product.id}`, product)
      .pipe(map(this.prepareResponse));
  }

  list({ filters, paginatorOptions }: FilterPaginator<Filter> = {}) {
    const queryStrings = [
      this.queryStringService.convertirDesdeObjeto(filters || {}),
      this.queryStringService.convertirDesdeObjeto(paginatorOptions || {}),
    ];
    console.log('dentro de service', filters, paginatorOptions)

    return this.http.get<PaginatorResponse<Product>>(
      `${this.baseUrl}/list?${queryStrings.join('&')}`
      // `${this.baseUrl}/list?rowsPerPage=10&page=5`

    );
  }

  //Funcion para crear el objeto de usuario
  private prepareBody(product: Product) {
    return {
      handle: product.handle,
      title: product.title,
      description: product.description,
      sku: product.sku,
      grams: product.barcode,
      stock: product.stock,
      price: product.price,
      comparePrice: product.comparePrice,
      barcode: product.barcode,
    };
  }

  //Funcion para mapear la respuesta
  private prepareResponse(product: Product) {
    return product;
  }
}
