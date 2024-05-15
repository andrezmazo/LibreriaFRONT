import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MatDialog } from '@angular/material/dialog';
// import { ProductFormComponent } from '../product-form/product-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { FilterComponent } from '../filter/filter.component';
import { Filter } from '../../models/filter';
import { Product } from '../../models/product';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { PaginatorOptions } from '../../models/paginator-options';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FilterComponent, MatCardModule, MatTableModule, MatPaginatorModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  @ViewChild(MatPaginator) paginador!: MatPaginator;
  filters?: Filter;
  products: Product[] = [];
  searchControl = new FormControl('');
  rowsPerPage = 20;
  page = 1;
  totalElements: number = 0;

  columnasParaMostrar: string[] = ['handle', 'title'];

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    this.getProducts();
    // Escuchar cambios en el campo de búsqueda
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.getProducts();
    });
  }
  getFilters(filterData: Filter) {
    this.filters = filterData;
    this.page = 1;
    this.getProducts();
  }

  getProducts() {
    const paginatorOptions: PaginatorOptions = {
      rowsPerPage: this.rowsPerPage,
      page: this.page,
    };
    // if (!this.filters) {
    //   this.filters = {};
    // }
    // if (this.filters) {
      this.productService
        .list({ filters: this.filters, paginatorOptions })
        .subscribe((productResponse) => {
          this.products = productResponse.content;
          this.totalElements = productResponse.totalElements;

        });
    // }

    // try {
    //   if (this.filters) {
    //     this.productService
    //       .list({ filters: this.filters })
    //       .subscribe((productResponse) => {
    //         this.products = productResponse.content;
    //       });
    //   }
    // } catch (error) {
    //   console.error('Error al cargar productos:', error);
    //   this.snackBar.open('Error al cargar productos', 'Cerrar');
    // }
  }

  handlePaginator(paginacion: PageEvent) {
    this.rowsPerPage = paginacion.pageSize;
    this.page = paginacion.pageIndex +1 ;
    this.getProducts();
  }
}
