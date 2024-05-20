import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Filter } from '../../models/filter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements OnInit {
  @Output() filterSubmit = new EventEmitter<Filter>();
  @Output() filterChanged = new EventEmitter<Filter>();

  form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [null],
    });
  }

  setFilter() {
    if (this.form.invalid) {
      return;
    }
    const filterData = this.form.value as Filter;
    this.filterSubmit.emit(filterData);
  }

  resetForm() {
    this.form.reset();
    this.filterSubmit.emit();
    this.snackBar.open('Filtros eliminados', 'Cerrar', { duration: 3000 });
  }
}
