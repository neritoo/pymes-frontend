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

  constructor(private articulosService: ArticulosService) {
    this.articulos = [];
  }

  ngOnInit(): void {
    this.getArticulos();    
  }

  getArticulos() {
    this.articulosService.getArticulos(this.pagina).subscribe(articulos => this.articulos = articulos);
  }

  cambiarEstadoArticulo(articulo: Articulo) {
    Swal.fire({
      icon: 'warning',
      title: `Che toga denserio queres ${articulo.activo? 'desactivar' : 'activar'}`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Pues si mi ciela'
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
