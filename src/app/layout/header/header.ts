import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataService } from '@services/data-service';

@Component({
  selector: 'app-header',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './header.html',
})
export class Header {
  isDarkMode = localStorage.getItem('theme-Mood') === 'dark';

  dataService = inject(DataService);

  toggleThemeMode(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme-Mood', this.isDarkMode ? 'dark' : 'light');
  }

  search(ev: any): void {
    this.dataService.searchTerm$.next(ev?.target?.value);
  }
}
