import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
 
  baseUri:string = 'https://dry-inlet-26415.herokuapp.com';
  //baseUri:string = 'http://localhost:8000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
 

  constructor(private http: HttpClient) { }

  /*createEmployee(data): Observable<any> {
    let url = `${this.baseUri}/create`;
    return this.http
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
          "X-auth-header": JSON.parse(
            window.localStorage.getItem("currentUser")
          ),
        },
      })
      .pipe(catchError(this.errorMgmt));
  }*/

  // Create
  createEmployee(data): Observable<any> {
    let url = `${this.baseUri}/create`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  createAsset(data): Observable<any> {
    let url = `${this.baseUri}/createAsset`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  createLinks(data): Observable<any> {
    let url = `${this.baseUri}/createSocialNetwork`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  
  /*getEmployees() {
    return this.http.get(`${this.baseUri}`, {
      headers: {
        "Content-Type": "application/json",
        "X-auth-header": JSON.parse(window.localStorage.getItem("currentUser"))
      }
    }).pipe(catchError(this.errorMgmt));
  }*/

  // Get all employees
  getEmployees() {
    return this.http.get(`${this.baseUri}/getAll`);
  }
  getAsset() {
    return this.http.get(`${this.baseUri}/getAllAsset`);
  }

  getEmployee(empid): Observable<any> {
    let url = `${this.baseUri}/getOne/${empid}`;
    console.log("url value is:::" + url);
    return this.http
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          // "X-auth-header": JSON.parse(
          //   window.localStorage.getItem("currentUser")
          // ),
        },
      })
      .pipe(
        map((res: Response) => {
          console.log("response from get by id:::" + JSON.stringify(res));
          return res;
        }),
        catchError(this.errorMgmt)
      );
  }
  getLink(empid): Observable<any> {
    let url = `${this.baseUri}/getById/${empid}`;
    console.log("url value is:::" + url);
    return this.http
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          // "X-auth-header": JSON.parse(
          //   window.localStorage.getItem("currentUser")
          // ),
        },
      })
      .pipe(
        map((res: Response) => {
          console.log("response from get by id:::" + JSON.stringify(res));
          return res;
        }),
        catchError(this.errorMgmt)
      );
  }

  // Get employee
  // getEmployee(id): Observable<any> {
  //   let url = `${this.baseUri}${id}`;
  //   return this.http.get(url, {headers: this.headers}).pipe(
  //     map((res: Response) => {
  //       return res || {}
  //     }),
  //     catchError(this.errorMgmt)
  //   )
  // }

  updateEmployee(empid, data): Observable<any> {
    let url = `${this.baseUri}/edit/${empid}`;
    return this.http
      .put(url, data, {
        headers: {
          // "Content-Type": "application/json",
          // "X-auth-header": JSON.parse(
          //   window.localStorage.getItem("currentUser")
          // ),
        },
      })
      .pipe(catchError(this.errorMgmt));
  }

  // Update employee
  /*updateEmployee(id, data): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }*/

  deleteEmployee(id): Observable<any> {
    let url = `${this.baseUri}${id}`;
    return this.http
      .delete(url, {
        headers: {
          "Content-Type": "application/json",
          // "X-auth-header": JSON.parse(
          //   window.localStorage.getItem("currentUser")
          // ),
        },
      })
      .pipe(catchError(this.errorMgmt));
  }

  // Delete employee
  /*deleteEmployee(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }*/

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}