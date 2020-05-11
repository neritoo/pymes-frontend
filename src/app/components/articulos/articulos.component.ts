import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/clases/articulo';
import { ArticulosService } from 'src/app/services/articulos.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

  articulos: Articulo[];
  valor: boolean;

  constructor(private articulosService: ArticulosService) {
    this.valor = true;
  }

  ngOnInit(): void {
    this.articulos = this.articulosService.getArticulos();
  }

  mostrarOcultar() {
    this.valor = !this.valor;
  }

}
