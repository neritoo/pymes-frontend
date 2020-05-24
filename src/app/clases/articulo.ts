import { ArticuloFamilia } from './articulo-familia';

export class Articulo {
    IdArticulo: number;
    Nombre: string;
    Precio: number;
    CodigoDeBarra: string;
    IdArticuloFamilia: number;
    ArticulosFamilia: ArticuloFamilia;
    Stock: number;
    FechaAlta: string;
    Activo: boolean;
}
