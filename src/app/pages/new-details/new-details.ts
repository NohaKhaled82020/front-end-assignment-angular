import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DEFAULT_IMAGE } from '@constants/constants';
import { DataService } from '@services/data-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { firstValueFrom, map, tap } from 'rxjs';

@Component({
  selector: 'app-new-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './new-details.html',
})
export class NewDetailsPage implements OnInit {
  articleNew: any;
  defaultImage = DEFAULT_IMAGE;

  dataService = inject(DataService);
  spinner = inject(NgxSpinnerService);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    firstValueFrom(
      this.route.data.pipe(
        map((res) => res['new']),
        tap((res) => {
          if (res) {
            this.articleNew = res;
          }
        })
      )
    );
  }
}
