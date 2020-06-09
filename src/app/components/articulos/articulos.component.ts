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
  totalPaginas: number;
  pagina: number = 1;

  constructor(private articulosService: ArticulosService) {
    this.articulos = [];
  }

  ngOnInit(): void {
    this.getArticulos();
  }

  getArticulos() {
    this.articulosService.getArticulos(this.pagina).subscribe(res => {
      this.articulos = res.Lista;
      this.totalPaginas = res.RegistrosTotal;
    });
  }

  // getArticulos() {

  // }

  cambiarEstadoArticulo(articulo: Articulo) {
    Swal.fire({
      icon: 'warning',
      text: `${articulo.Activo? 'Desactivar' : 'Activar'} articulo`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar'
    })
    .then((resp) => {
      if (resp.value) {
        articulo.Activo = !articulo.Activo;
      } else {
        return;
      }
    });

  }

}
