import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";

import { Articulo } from 'src/app/clases/articulo';
import { ArticulosService } from 'src/app/services/articulos.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

  articulos: Articulo[];
  pagina: number = 1;
  totalArticulos: number;

  constructor(private articulosService: ArticulosService) {
    this.articulos = [];
  }

  ngOnInit(): void {
    this.getArticulos();    
  }

  
  
  getArticulos() {
    let nombre: string = '';
    let activo: boolean;
    this.articulosService.getArticulos(this.pagina, nombre, activo).subscribe((resp: any) => {
      this.articulos = resp.content as Articulo[];
      this.totalArticulos = resp.totalElements;
      console.log(this.totalArticulos);
    });
  }

  cambiarEstadoArticulo(articulo: Articulo) {
    Swal.fire({
      icon: 'warning',
      title: `¿${articulo.activo? 'Desactivar' : 'Activar'} artículo?`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then((resp) => {
      if (resp.value) {
        this.articulosService.cambiarEstadoArticulo(articulo).subscribe(res => {
          this.getArticulos();
          // articulo.activo = !articulo.activo;
        });
      } else {
        return;
      }
    });
  
  }

}
