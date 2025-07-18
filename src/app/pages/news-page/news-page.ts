import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  debounceTime,
  defaultIfEmpty,
  distinctUntilChanged,
  firstValueFrom,
  map,
  Subscription,
  tap,
} from 'rxjs';
import { AddNew } from '../add-new/add-new';
import { DataService } from '@services/data-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DEFAULT_IMAGE, newsApi } from '@constants/constants';

@Component({
  selector: 'app-news',
  imports: [CommonModule, RouterModule],
  templateUrl: './news-page.html',
})
export class NewsPage implements OnInit, OnDestroy {
  allNews: any[] = [];
  newsList: any[] = [];
  archivedNewsList: any[] = [];
  subs: Subscription[] = [];
  defaultImage = DEFAULT_IMAGE;

  modalService = inject(NgbModal);
  dataService = inject(DataService);
  spinner = inject(NgxSpinnerService);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    firstValueFrom(
      this.route.data.pipe(
        map((res) => res['news']),
        tap((res) => {
          if (res.length) {
            this.setDate(res);
          }
        })
      )
    );
    this.subs.push(
      this.dataService.searchTerm$
        .pipe(distinctUntilChanged(), debounceTime(300))
        .subscribe((term) => {
          this.setDate(this.allNews, term);
        })
    );
  }

  getNews(): void {
    this.spinner.show();
    let params: any = {
      sortBy: 'publishDate',
      order: 'desc',
    };
    firstValueFrom(
      this.dataService.get(`${newsApi}`, { params }).pipe(
        defaultIfEmpty([]),
        tap((res) => {
          this.spinner.hide();
          if (res.length) {
            this.setDate(res);
          }
        })
      )
    );
  }

  setDate(res: any[], term: string = '') {
    this.allNews = res;
    this.newsList = this.allNews.filter(
      (obj: any) =>
        !this.checkArchivedNews(obj.publishDate) &&
        this.newMatchSearch(obj, term)
    );
    this.archivedNewsList = this.allNews.filter(
      (obj: any) =>
        this.checkArchivedNews(obj.publishDate) &&
        this.newMatchSearch(obj, term)
    );
  }

  newMatchSearch(item: any, term: string = ''): boolean {
    if (!term) return true;
    term = term.toLowerCase().trim();
    const title = item.title?.toLowerCase();
    const content = item.content?.toLowerCase();
    return title.includes(term) || content.includes(term);
  }

  checkArchivedNews(publishDate: string | null): boolean | null {
    if (!publishDate) return null;
    const today = new Date();
    const publish = new Date(publishDate);
    const diffTime = today.getTime() - publish.getTime();
    const daysSincePublished = diffTime / (1000 * 60 * 60 * 24);
    return daysSincePublished > 30;
  }

  addArticleNew(): void {
    const modelRef = this.modalService.open(AddNew, {
      centered: true,
    });
    modelRef.result.then((res) => {
      if (res) {
        this.getNews();
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
