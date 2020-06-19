import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

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

  opcionesActivo = [
    { id: null, nombre: ''},
    { id: true, nombre: 'Si'},
    { id: false, nombre: 'No'}
  ];

  form: FormGroup;

  constructor(private articulosService: ArticulosService, private fb: FormBuilder) {
    this.articulos = [];
  }

  ngOnInit(): void {
    this.crearFormulario();
    this.getArticulos();
  }

  getArticulos() {
    this.waitAlert();
    const nombre = this.form.value.articulo;
    const activo = this.form.value.activo;
    this.articulosService.getArticulos(this.pagina, nombre, activo).subscribe((resp: any) => {
      this.articulos = resp.content as Articulo[];
      this.totalArticulos = resp.totalElements;
      Swal.close();
      console.log(this.totalArticulos);
    });
  }

  cambiarEstadoArticulo(articulo: Articulo) {
    Swal.fire({
      icon: 'warning',
      title: `¿${articulo.activo ? 'Desactivar' : 'Activar'} artículo?`,
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

  waitAlert() {
    Swal.fire({
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info',
      text: 'Espere porfavor'
    });
  }

  // Formulario de filtrado

  crearFormulario() {
    this.form = this.fb.group({
      articulo: [''],
      activo: ['']
    });
  }

}
