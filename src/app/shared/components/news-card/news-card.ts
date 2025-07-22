import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from '@services/data-service';

@Component({
  selector: 'app-news-card',
  imports: [RouterModule, CommonModule],
  templateUrl: './news-card.html',
})
export class NewsCard {
  dataService = inject(DataService);

  card = input<any>();
  selectedCrd = input<any>();
  @Output() newSelectedEmit = new EventEmitter();

  changedSelectedNew(card: any) {
    this.newSelectedEmit.emit(card);
  }
}
