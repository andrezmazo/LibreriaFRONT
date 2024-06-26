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
import { MatExpansionModule } from '@angular/material/expansion';
import { ProductCreateComponent } from '../product-create/product-create.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NgFor, NgIf } from '@angular/common';
import { debounceTime } from 'rxjs/operators';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NavbarComponent,
    ProductCreateComponent,
    FilterComponent,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    NgFor,
    NgIf,
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
    trigger('toggleHeight', [
      state('void', style({ height: '0px', opacity: 0 })),
      state('*', style({ height: '*', opacity: 1 })),
      transition('void <=> *', animate('200ms ease-in-out')),
    ]),
  ],
})
export class MainComponent implements OnInit {
  @ViewChild(MatPaginator) paginador!: MatPaginator;
  filters?: Filter;
  products: Product[] = [];
  expandedProduct: Product | null = null;
  searchControl = new FormControl('');
  rowsPerPage = 5;
  page = 1;
  totalElements: number = 0;
  expandedElement: Product | null = null;
  showCreateProductSection: boolean = false;
  columnsToDisplay = [
    'id',
    'handle',
    'title',
    'sku',
    'grams',
    'stock',
    'price',
    'comparePrice',
    'barcode',
  ];

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getProducts();
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

  openDeleteDialog(product: Product) {
    const dialog = this.dialog.open(AlertComponent, {
      data: {
        message: `¿Está seguro que desea eliminar el producto con título "${product.title}"?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        type: 'warn',
      } as DialogData,
    });

    dialog.afterClosed().subscribe((isConfirmed) => {
      if (isConfirmed) {
        console.log("dialog ", isConfirmed);

        this.deleteProduct(product);
      } else {
        this.snackBar.open(
          `Eliminación del producto cancelada`,
          'Cerrar',
          { duration: 3000 } // Agrega duración para que se cierre automáticamente
        );
      }
    });
  }

  openEditDialog(product: Product) {
    const dialogRef = this.dialog.open(ProductEditComponent, {
      width: '600px',
      data: { product },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getProducts(); // Obtiene productos
      }
    });
  }

  private deleteProduct(product: Product) {
    this.productService.delete(product.id).subscribe({
      next: () => {
        this.snackBar.open(
          `El producto "${product.title}" fue eliminado exitosamente`,
          'Cerrar',
          { duration: 3000 } // Agrega duración para que se cierre automáticamente
        );
        this.getProducts(); // Llama a getProducts() para actualizar la lista
      },
      error: () => {
        this.snackBar.open(
          `Error al borrar el producto "${product.title}"`,
          'Cerrar',
          { duration: 3000 } // Agrega duración para que se cierre automáticamente
        );
      },
    });
  }

  toggleRow(product: Product) {
    this.expandedElement = this.expandedElement === product ? null : product;
  }

  toggleCreateProductSection() {
    this.showCreateProductSection = !this.showCreateProductSection;
  }
  handleCancelCreateProduct() {
    this.showCreateProductSection = false;
  }
  handleCreateProduct() {
    this.getProducts()
  }

  handlePaginator(paginacion: PageEvent) {
    this.rowsPerPage = paginacion.pageSize;
    this.page = paginacion.pageIndex + 1;
    this.getProducts();
  }
}
