import { Injectable } from '@angular/core';
import { ARTICULOS } from 'src/assets/static/articulos';
import { Articulo } from '../clases/articulo';


@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  constructor() { }

  getArticulos(): Articulo[] {
    return ARTICULOS;
  }

  getArticulo(id: number): Articulo {
    return ARTICULOS[id - 1];
  }

}
