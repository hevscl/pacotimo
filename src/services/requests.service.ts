import { Injectable } from "@angular/core"
import { HttpClient, HttpParams } from "@angular/common/http"
import { HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-handle-error.service';

@Injectable()
export class Requests {
    apiUrl = "https://5f637566363f0000162d8b16.mockapi.io/milhas321/api/v1/"

    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('AuthService');
    }

    public get(endpoint: string): Observable<Object | null> {
        return this.http.get<any>(`${this.apiUrl}${endpoint}`)
            .pipe(
                catchError(this.handleError('get', null))
            )
    }

}