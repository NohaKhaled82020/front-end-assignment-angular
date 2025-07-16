import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  NgbActiveModal,
  NgbDatepickerModule,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { firstValueFrom, tap } from 'rxjs';
import { DataService } from '../../shared/services/data-service';
import { ToastService } from '../../shared/services/toast-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { newsApi } from '@constants/constants';

@Component({
  selector: 'app-add-new',
  imports: [ReactiveFormsModule, NgbDatepickerModule, NgSelectModule],
  templateUrl: './add-new.html',
})
export class AddNew implements OnInit {
  articleNewForm!: FormGroup;

  fb = inject(FormBuilder);
  activeModal = inject(NgbActiveModal);
  dataService = inject(DataService);
  toastService = inject(ToastService);
  spinner = inject(NgxSpinnerService);

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    let imageUrl;
    let title;
    let summary;
    let content;
    let publishDate = this.convertToNgbDate(new Date());
    let tags;
    this.articleNewForm = this.fb.group({
      title: [title, Validators.required],
      content: [content],
      publishDate: [publishDate],
      tags: [tags],
      summary: [summary],
      imageUrl: [imageUrl],
    });
  }

  convertToNgbDate(data: Date): any {
    return {
      year: data.getFullYear(),
      month: data.getMonth() + 1,
      day: data.getDate(),
    };
  }

  convertToDate(dateStruct: NgbDateStruct | null): string {
    if (!dateStruct) return '';
    const year = dateStruct.year;
    const month = dateStruct.month.toString().padStart(2, '0');
    const day = dateStruct.day.toString().padStart(2, '0');
    return `${year}-${month}-${day}T00:00:00z`;
  }

  save(): void {
    let formValue = {
      ...this.articleNewForm.value,
      tags: this.articleNewForm.value.tags?.map((obj: any) => obj.label),
      publishDate: this.convertToDate(this.articleNewForm.value.publishDate),
    };

    this.spinner.show();
    firstValueFrom(
      this.dataService.post(`${newsApi}`, formValue).pipe(
        tap((res) => {
          if (res) {
            this.spinner.hide();
            this.toastService.show('Added Successfully', {
              classname: 'bg-success text-light',
            });
            this.activeModal.close(true);
          }
        })
      )
    );
  }
}
