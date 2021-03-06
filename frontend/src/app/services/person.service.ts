import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, pipe } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
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
        shareReplay(),
        catchError(this.errorHandler)
      )
  }

  public getPerson(id: string): Observable<IPerson> {
    return this.http.get<IPerson>(`${this.url}/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  public getCountryStats(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/country`)
      .pipe(
        shareReplay(),
        catchError(this.errorHandler)
      )
  }

  public addPerson(person: IPerson): Observable<IPerson> {
    return this.http.post<IPerson>(`${this.url}`, person, {})
      .pipe(catchError(this.errorHandler));
  }

  public deletePerson(id: string): Observable<IPerson> {
    return this.http.delete<IPerson>(`${this.url}/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  public errorHandler(err: HttpErrorResponse)  {
    return throwError(err.message || 'Server Error');
  }
}
