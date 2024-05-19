
export interface DialogData {
  type?: 'error' | 'warn' | 'info' | 'success';
  message: string;
  confirmButtonText?: string;
  showCancelButton?: boolean;
}
