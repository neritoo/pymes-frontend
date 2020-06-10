import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import Swal from 'sweetalert2';

import { Articulo } from '../clases/articulo';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  url: string;

  constructor(private http: HttpClient) {
    // Servidor facu
    //this.url = 'http://labsys.frc.utn.edu.ar:8080/api';

    // Local host
    this.url = 'http://localhost:8080/api';
  }

  getArticulos(pagina: number): Observable<Articulo[]> {
    let parametros = new HttpParams();
    //parametros = parametros.append('Pagina', pagina.toString());

    return this.http.get(`${this.url}/articulos/page/${pagina-1}`).pipe(
      map((resp: any) => {
        return resp.Lista;
      })
    );
  }

  getArticulo(IdArticulo: number): Observable<Articulo> {
    return this.http.get(`${this.url}/articulos/${IdArticulo}`).pipe(
      map((resp: any) => {
        return resp.articulo as Articulo;
      })
    )
  }

  crearArticulo(articulo: Articulo): Observable<Articulo> {
    return this.http.post(`${this.url}/articulos`, articulo).pipe(
      map((resp: any) => resp.articulo as Articulo),
      catchError(e => {
        Swal.fire({
          icon: 'warning',
          title: e.error.mensaje
        });
        return throwError(e);
      })
    );
    // console.log(`Articulo ${articulo.nombre} creado con éxito!`);
  }

  actualizarArticulo(articulo: Articulo): Observable<Articulo> {
    return this.http.put(`${this.url}/articulos/${articulo.id}`, articulo).pipe(
      map((resp: any) => resp.articulo as Articulo)
    );
    // console.log(`Articulo ${articulo.nombre} editado con éxito!`);
  }

  cambiarEstadoArticulo(articulo: Articulo) {
    return this.http.put<Articulo>(`${this.url}/articulos/estado/${articulo.id}`, articulo);
  }

}
