import { Component, OnInit } from '@angular/core';
import { ArticuloFamilia } from 'src/app/clases/articulo-familia';
import { MockArticulosFamiliasService } from 'src/app/services/mock-articulos-familias.service';
import { ArticulosFamiliasService } from 'src/app/services/articulos-familias.service';

@Component({
  selector: 'app-articulos-familias',
  templateUrl: './articulos-familias.component.html',
  styleUrls: ['./articulos-familias.component.css']
})
export class ArticulosFamiliasComponent implements OnInit {

  articulosFamilias: ArticuloFamilia[];

  constructor(private articulosFamiliasService: ArticulosFamiliasService ) { }

  ngOnInit(): void {
    this.getArticulosFamilias();
  }

  /*getArticulosFamilias() {
    this.articulosFamilias = this.mockArticulosFamiliasService.getArticulosFamilias();
  }*/

  getArticulosFamilias() {
    this.articulosFamiliasService.getArticulosFamilias().subscribe(articulosFamilias => {
      this.articulosFamilias = articulosFamilias;
    });
  }

}
