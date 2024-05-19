import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';


@Component({
  selector: 'app-product-edit',
  standalone: true,
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
  imports: [
    MatFormFieldModule,
    MatFormField,
    MatLabel
  ]
})
export class ProductEditComponent implements OnInit {
  editForm: FormGroup= new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product },
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadProductData();
  }

  createForm(): void {
    this.editForm = this.fb.group({
      handle: ['', Validators.required],
      title: ['', Validators.required],
      sku: ['', Validators.required],
      grams: [0, Validators.required],
      stock: [0, Validators.required],
      price: [0, Validators.required],
      comparePrice: [0, Validators.required],
      barcode: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  loadProductData(): void {
    if (this.data && this.data.product) {
      this.editForm.patchValue(this.data.product);
    }
  }

  onSave(): void {
    if (this.editForm.valid) {
      this.productService.update(this.data.product.id, this.editForm.value).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
