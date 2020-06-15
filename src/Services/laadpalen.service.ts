import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IRootObject } from 'src/Models/rootObject';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { map , catchError, retry, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LaadpalenService {

  private _url: string = "https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek5/MapServer/572/query?where=1%3D1&outFields=*&outSR=4326&f=json"

  constructor(private http: HttpClient) { }

  getLaadpalen(): Observable<IRootObject>{
    return this.http.get<IRootObject>(this._url).pipe(retry(3), map((data: IRootObject) => data), catchError(this.errorHandler));
    // return this.http.get<ILaadpaal>(this._url).pipe(tap(data => alert(JSON.stringify(data))), catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    return observableThrowError(error.message || "Server Error")
  }
}