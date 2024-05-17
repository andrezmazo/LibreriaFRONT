import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { FilterComponent } from '../filter/filter.component';
import { Filter } from '../../models/filter';
import { Product } from '../../models/product';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { PaginatorOptions } from '../../models/paginator-options';
import { AlertComponent } from '../alert/alert.component';
import { DialogData } from '../../models/dialog-data';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    FilterComponent,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  @ViewChild(MatPaginator) paginador!: MatPaginator;
  filters?: Filter;
  products: Product[] = [];
  searchControl = new FormControl('');
  rowsPerPage = 5;
  page = 1;
  totalElements: number = 0;
  expandedElement: Product | null = null;

  columnasParaMostrar: string[] = [
    'handle',
    'title',
    'sku',
    'grams',
    'stock',
    'price',
    'comparePrice',
    'barcode',
    'actions',
  ];

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getFilters(filterData: Filter) {
    this.filters = filterData;
    this.page = 1;
    this.getProducts();
  }

  getProducts() {
    try {
      const paginatorOptions: PaginatorOptions = {
        rowsPerPage: this.rowsPerPage,
        page: this.page,
      };
      this.productService
        .list({ filters: this.filters, paginatorOptions })
        .subscribe((productResponse) => {
          this.products = productResponse.content;
          this.totalElements = productResponse.totalElements;
        });
    } catch (error) {
      console.error('Error al cargar productos:', error);
      this.snackBar.open('Error al cargar productos', 'Cerrar');
    }
  }

  askToDelete(product: Product) {
    const dialog = this.dialog.open(AlertComponent, {
      data: {
        message: `¿Está seguro que desea eliminar el producto con título "${product.title}"?`,
        showCancelButton: true,
        confirmButtonText: 'Sí',
        type: 'warn',
      } as DialogData,
    });

    dialog.afterClosed().subscribe(({ isConfirmed }) => {
      if (isConfirmed) {
        this.deleteProduct(product);
      }
    });
  }

  private deleteProduct(product: Product) {
    this.productService.delete(product.id).subscribe({
      next: () =>
        this.snackBar.open(
          `El producto "${product.title}" fue eliminado exitosamente`,
          'Cerrar'
        ),
      error: () =>
        this.snackBar.open(
          `Error al borrar el producto "${product.title}"`,
          'Cerrar'
        ),
    });
  }

  toggleRow(product: Product) {
    this.expandedElement = this.expandedElement === product ? null : product;
  }

  handlePaginator(paginacion: PageEvent) {
    this.rowsPerPage = paginacion.pageSize;
    this.page = paginacion.pageIndex + 1;
    this.getProducts();
  }
}
