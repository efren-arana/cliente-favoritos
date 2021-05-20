import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable,throwError  } from 'rxjs';
import { Favorito } from '../models/favorito';
import { catchError, map, tap } from "rxjs/operators";


// Set the http options
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json", "Authorization": "c31z" })
};
@Injectable({
  providedIn: 'root'
})

/**
 * Service to call all the API
 */
export class FavoritoService {

  public url:String;
  constructor( private _http: HttpClient) { 
    this.url = 'http://localhost:3678/api/';
  }

  /**
   * Function to handle error when the server return an error
   *
   * @param error
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code. The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }
  
  /**
   * Metodo el cual hacemos nos permite hacer  un peticion ajax para traer los favoritos
   */
  getFavoritos(): Observable<any> {
    return this._http.get(this.url+'favoritos').pipe(
      tap( (fetchJSON) => JSON.stringify(fetchJSON) ),catchError(this.handleError));
  }

  getFavorito(id:String): Observable<any>{
    return this._http.get(this.url+'favorito/'+id).pipe(
      tap( (fetchJSON) => JSON.stringify(fetchJSON) ),catchError(this.handleError));
  }

  addFavorito(favorito:Favorito):Observable<any>{
    let json = JSON.stringify(favorito);
    let params = json; //body
    let headers =  new HttpHeaders({"Content-Type": "application/json"});
    return this._http.post(this.url+'favorito',params,{headers:headers}).pipe(
      tap( (fetchJSON) => JSON.stringify(fetchJSON) ),catchError(this.handleError));
  }

  editFavorito(id:String,favorito:Favorito):Observable<any>{
    let json = JSON.stringify(favorito);
    let params = json; //body
    let headers =  new HttpHeaders({"Content-Type": "application/json"});
    return this._http.put(this.url+'favorito/'+id,params,{headers:headers}).pipe(
      tap( (fetchJSON) => JSON.stringify(fetchJSON) ),catchError(this.handleError));
  }

  deleteFavorito(id:String): Observable<any>{
    return this._http.delete(this.url+'favorito/'+id).pipe(
      tap( (fetchJSON) => JSON.stringify(fetchJSON) ),catchError(this.handleError));
  }

}
