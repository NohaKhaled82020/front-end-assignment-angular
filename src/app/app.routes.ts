import { Route } from '@angular/router';
import { newResolver, newsListResolver } from './pages/news-resolver';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/news-page/news-page').then((com) => com.NewsPage),
    resolve: {
      news: newsListResolver,
    },
  },
  {
    path: 'news/:id',
    loadComponent: () =>
      import('./pages/new-details/new-details').then(
        (com) => com.NewDetailsPage
      ),
    resolve: {
      new: newResolver,
    },
  },
];
