import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface ApiRequestOptions {
  headers?: HttpHeaders | Record<string, string | string[]>;
  params?: HttpParams | Record<string, string | number | boolean | readonly (string | number | boolean)[]>;
  observe?: 'body';
  responseType?: 'json';
  withCredentials?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);

  get<T>(url: string, options?: ApiRequestOptions): Observable<T> {
    return this.http.get<T>(url, options).pipe(
      catchError(err => this.handleError(err))
    );
  }

  post<T>(url: string, body: unknown, options?: ApiRequestOptions): Observable<T> {
    return this.http.post<T>(url, body, options).pipe(
      catchError(err => this.handleError(err))
    );
  }

  put<T>(url: string, body: unknown, options?: ApiRequestOptions): Observable<T> {
    return this.http.put<T>(url, body, options).pipe(
      catchError(err => this.handleError(err))
    );
  }

  patch<T>(url: string, body: unknown, options?: ApiRequestOptions): Observable<T> {
    return this.http.patch<T>(url, body, options).pipe(
      catchError(err => this.handleError(err))
    );
  }

  delete<T>(url: string, options?: ApiRequestOptions): Observable<T> {
    return this.http.delete<T>(url, options).pipe(
      catchError(err => this.handleError(err))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ein unbekannter Fehler ist aufgetreten';

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client Error: ${error.error.message}`;
      console.error('Client-side error:', error.error.message);
    } else {
      // Backend returned an unsuccessful response code
      errorMessage = `Server Error (${error.status}): ${error.message}`;
      console.error(`Backend returned code ${error.status}, body was:`, error.error);

      // Log specific error details for debugging
      if (error.status === 0) {
        console.error('Network error or CORS issue - Backend nicht erreichbar');
      } else if (error.status >= 500) {
        console.error('Server error - Backend internal error');
      } else if (error.status >= 400) {
        console.error('Client error - Invalid request or unauthorized');
      }
    }

    // Return user-friendly error
    return throwError(() => new Error(errorMessage));
  }
}
