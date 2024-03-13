import { HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable()
export class InterceptorService {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401 && error.statusText === "Unauthorized") {
          this.router.navigate(['/login']);
          localStorage.clear();
        }

        return throwError(error);
      }),
      finalize(() => {
        // Este bloco de código será executado independentemente se a solicitação for bem-sucedida ou resultar em erro
        debugger;
      })
    );
  }
}
