import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../clases/articulo';
import { ActivatedRoute } from '@angular/router';

import { ArticulosService } from '../../services/articulos.service';

@Component({
  selector: 'app-detalle-articulo',
  templateUrl: './detalle-articulo.component.html',
  styleUrls: ['./detalle-articulo.component.css']
})
export class DetalleArticuloComponent implements OnInit {

  articulo: Articulo;

  constructor(private activatedRoute: ActivatedRoute,
              private articuloService: ArticulosService) { }

  ngOnInit(): void {
    this.cargarArticulo();
    console.log(this.articulo);
  }

  cargarArticulo() {
    this.activatedRoute.params.subscribe( params => {
      let idArticulo = params['id'];
      this.articuloService.getArticulo(idArticulo).subscribe(articulo => this.articulo = articulo);
    });
  }

}
