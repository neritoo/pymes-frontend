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
  pagina: number = 1;

  constructor(private articulosService: ArticulosService) { }

  ngOnInit(): void {
    this.getArticulos();
  }

  getArticulos() {
    this.articulosService.getArticulos(this.pagina).subscribe(articulos => this.articulos = articulos);
  }

}
