import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AddNew } from '../add-new/add-new';
import { DataService } from '@services/data-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { newsApi } from '@constants/constants';
import { httpResource } from '@angular/common/http';
import { NewsCard } from '@components/news-card/news-card';

@Component({
  selector: 'app-news',
  imports: [CommonModule, RouterModule, NewsCard],
  templateUrl: './news-page.html',
})
export class NewsPage {
  route = inject(ActivatedRoute);
  modalService = inject(NgbModal);
  dataService = inject(DataService);
  spinner = inject(NgxSpinnerService);

  newsSignal = httpResource<any[]>(() => ({
    url: newsApi,
    method: 'GET',
    params: {
      sortBy: 'publishDate',
      order: 'desc',
    },
  }));

  allNews = computed(() => this.newsSignal.value() ?? []);
  postedNewsList = computed(() =>
    this.allNews().filter(
      (obj: any) =>
        !this.checkArchivedNews(obj.publishDate) &&
        this.newMatchSearch(obj, this.dataService.debouncedSearchTerm())
    )
  );
  selectedPostedNew = linkedSignal(() => this.postedNewsList()[0]);
  archivedNewsList = computed(() =>
    this.allNews().filter(
      (obj: any) =>
        this.checkArchivedNews(obj.publishDate) &&
        this.newMatchSearch(obj, this.dataService.debouncedSearchTerm())
    )
  );
  clientEffect = effect(() => {
    if (this.newsSignal.status() === 'loading') {
      this.spinner.show();
    } else {
      this.spinner.hide();
    }
  });

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
        this.newsSignal.reload();
      }
    });
  }

  changedSelectedNew(card: any) {
    this.selectedPostedNew.set(card);
  }
}
