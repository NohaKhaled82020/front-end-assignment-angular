import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  searchTerm = signal<string>('');
  debouncedSearchTerm = toSignal(
    toObservable(this.searchTerm).pipe(
      distinctUntilChanged(),
      debounceTime(300)
    )
  );
  defaultImage = signal<string>(
    'https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  );

  constructor(private http: HttpClient) {}

  post(apiUrl: string, body: any): Observable<any> {
    return this.http.post(apiUrl, body);
  }

  get(apiUrl: string, options?: any): Observable<any> {
    return this.http.get(apiUrl, options);
  }
}
