import { httpResource } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { newsApi } from '@constants/constants';
import { DataService } from '@services/data-service';

export const newsListResolver: ResolveFn<any> = () => {
  const dataService = inject(DataService);
  let params: any = {
    sortBy: 'publishDate',
    order: 'desc',
  };
  return dataService.get(`${newsApi}`, { params });
};

export const newResolver: ResolveFn<any> = (route) => {
  const dataService = inject(DataService);
  return dataService.get(`${newsApi}/${route.params['id']}`);
};
