import { Component,EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  createForm: FormGroup = new FormGroup({});
  @Output() cancel = new EventEmitter<void>();
  @Output() createdProduct = new EventEmitter<void>();
  showCreateProductSection: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      handle: ['', Validators.required],
      title: ['', Validators.required],
      sku: [0, Validators.required],
      grams: [0, Validators.required],
      stock: [0, Validators.required],
      price: [0, Validators.required],
      comparePrice: [0, Validators.required],
      barcode: [0, Validators.required],
      description: ['', Validators.required]
    });
  }

  onSave(): void {
    if (this.createForm.valid) {
      this.productService.create(this.createForm.value).subscribe({
        next: () => {
          this.snackBar.open('Producto creado exitosamente', 'Cerrar', {
            duration: 3000,
          });
          this.createdProduct.emit();
          this.createForm.reset()
        },
        error: (error) => {
          if (error.status === 400 && error.error && error.error.message === "El SKU del producto ya está en uso") {
            this.snackBar.open('El SKU del producto ya está en uso. Intente uno que no exista.', 'Cerrar', {
              duration: 8000,
            });
          } else {
            this.snackBar.open('Error al crear el producto', 'Cerrar', {
              duration: 3000,
            });
          }
        },
      });
    } else {
      this.snackBar.open(
        'Por favor, complete todos los campos requeridos',
        'Cerrar',
        {
          duration: 3000,
        }
      );
    }
  }

  onCancel(): void {
    this.cancel.emit();
    this.snackBar.open('Creación de producto cancelada', 'Cerrar', {
      duration: 3000,
    });
  }

}
