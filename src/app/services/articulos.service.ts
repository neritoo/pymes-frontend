import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Articulo } from '../clases/articulo';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://labsys.frc.utn.edu.ar:8080/api';
  }

  getArticulos(): Observable<Articulo[]> {
    return this.http.get(`${this.url}/articulos`).pipe(
      map((resp: any) => {
        return resp.Lista as Articulo[];
      })
    );
  }

  getArticulo(IdArticulo: number): Observable<Articulo> {
    return this.http.get<Articulo>(`${this.url}/articulos/${IdArticulo}`);
  }


}
