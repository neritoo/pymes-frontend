import { Injectable } from '@angular/core';
import { ARTICULOS_FAMILIAS} from '../../assets/static/articulos-familias';
import { ArticuloFamilia } from '../clases/articulo-familia';

@Injectable({
  providedIn: 'root'
})
export class MockArticulosFamiliasService {

  constructor() { }

  getArticulosFamilias(): ArticuloFamilia[] {
    return ARTICULOS_FAMILIAS;
  }

}
