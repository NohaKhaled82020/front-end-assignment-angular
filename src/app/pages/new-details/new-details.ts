import { CommonModule } from '@angular/common';
import { newsApi } from '@constants/constants';
import { NgxSpinnerService } from 'ngx-spinner';
import { httpResource } from '@angular/common/http';
import { DataService } from '@services/data-service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Component, computed, effect, inject, Signal } from '@angular/core';

@Component({
  selector: 'app-new-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './new-details.html',
})
export class NewDetailsPage {
  dataService = inject(DataService);
  spinner = inject(NgxSpinnerService);
  route = inject(ActivatedRoute);

  article = httpResource(
    () => ({
      url: `${newsApi}/${this.route.snapshot.paramMap.get('id')}`,
      method: 'get',
    }),
    {
      defaultValue: {},
    }
  );

  articleNew: Signal<any> = computed(() => this.article.value());

  customEffect = effect(() => {
    if (this.article.isLoading()) {
      this.spinner.show();
    } else {
      this.spinner.hide();
    }
  });
}
