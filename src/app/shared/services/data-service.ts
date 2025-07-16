import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  searchTerm$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  post(apiUrl: string, body: any): Observable<any> {
    return this.http.post(apiUrl, body);
  }

  get(apiUrl: string, options?: any): Observable<any> {
    return this.http.get(apiUrl, options);
  }
}
