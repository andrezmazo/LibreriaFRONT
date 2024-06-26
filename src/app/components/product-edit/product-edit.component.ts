import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../models/product';
import { MatButtonModule } from '@angular/material/button';
import {
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],

  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  editForm: FormGroup = new FormGroup({});
  product?: Product | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product },
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadProductData();
  }

  createForm(): void {
    this.editForm = this.fb.group({
      handle: ['', Validators.required],
      title: ['', Validators.required],
      sku: [0, Validators.required],
      grams: [0, Validators.required],
      stock: [0, Validators.required],
      price: [0, Validators.required],
      comparePrice: [0, Validators.required],
      barcode: [0, Validators.required],
      description: ['', Validators.required],
    });
  }

  loadProductData(): void {
    if (this.data && this.data.product) {
      this.editForm.patchValue(this.data.product);
    }
  }

  onSave(): void {
    if (this.editForm.valid) {
      this.productService.update(this.data.product.id, this.editForm.value).subscribe({
        next: () => {
          this.snackBar.open('Producto actualizado exitosamente', 'Cerrar', {
            duration: 3000,
          });
          this.dialogRef.close(true);
        },
        error: (error) => {
          if (error.status === 400 && error.error && error.error.message === "El SKU del producto ya está en uso") {
            this.snackBar.open('El SKU del producto ya está en uso intenta uno que no exista', 'Cerrar', {
              duration: 8000,
            });
          } else {
            this.snackBar.open('Error al actualizar el producto', 'Cerrar', {
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
    this.dialogRef.close(false);
    this.snackBar.open('Edición cancelada', 'Cerrar', {
      duration: 3000,
    });
  }
}
