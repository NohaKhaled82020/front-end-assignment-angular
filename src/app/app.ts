import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { ToastComponent } from './shared/components/toast/toast';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    Header,
    RouterOutlet,
    ToastComponent,
    NgxSpinnerModule,
    LoadingBarRouterModule,
  ],
})
export class App implements OnInit {
  ngOnInit(): void {
    const themeMood = localStorage.getItem('theme-Mood');
    if (themeMood) {
      document.body.classList.add(themeMood);
    }
  }
}
