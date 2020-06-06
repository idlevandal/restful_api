import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IPerson } from '../interfaces/person.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private url: string = 'http://localhost:5000/persons';

  constructor(private http: HttpClient) { }

  public getPeople(): Observable<IPerson[]> {
    return this.http.get<IPerson[]>(this.url)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  public getCountryStats(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/country`)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  public errorHandler(err: HttpErrorResponse)  {
    return throwError(err.message || 'Server Error')
  }
}
