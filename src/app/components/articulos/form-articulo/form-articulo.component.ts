import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Articulo } from 'src/app/clases/articulo';
import { ArticuloFamilia } from 'src/app/clases/articulo-familia';
import { ArticulosService } from 'src/app/services/articulos.service';
import { ArticulosFamiliasService } from 'src/app/services/articulos-familias.service';

@Component({
  selector: 'app-form-articulo',
  templateUrl: './form-articulo.component.html',
  styleUrls: ['./form-articulo.component.css']
})
export class FormArticuloComponent implements OnInit {

  form: FormGroup;
  articulo: Articulo;
  familias: ArticuloFamilia[];

  opcionesActivo = [
    { id: true, nombre: "Si"},
    { id: false, nombre: "No"}
  ];

  constructor(private fb: FormBuilder,
    private articuloService: ArticulosService,
    private familiaService: ArticulosFamiliasService) {

  }
  
  ngOnInit(): void {
    
    this.getFamilias();
    this.crearFormulario();
    this.cargarFormulario();
  }

  getFamilias() {
    this.familiaService.getArticulosFamilias().subscribe(familias => this.familias = familias)
  }
  
  crearFormulario() {
    this.form = this.fb.group({
      Nombre: [''],
      Precio: [''],
      CodigoDeBarra: [''],
      Familia: [],
      Stock: [''],
      FechaAlta: [''],
      Activo: [true]
    });
  }

  guardar() {
    this.articulo = new Articulo();

    this.articulo.Nombre = this.form.value.Nombre;
    this.articulo.Precio = this.form.value.Precio;
    this.articulo.CodigoDeBarra = this.form.value.CodigoDeBarra;
    this.articulo.IdArticuloFamilia = this.form.value.Familia.IdArticuloFamilia;
    this.articulo.ArticulosFamilia = this.form.value.Familia;
    this.articulo.Stock = this.form.value.Stock;
    this.articulo.FechaAlta = this.form.value.FechaAlta;
    this.articulo.Activo = this.form.value.Activo;

    this.articuloService.crearArticulo(this.articulo);

    console.log(this.articulo);

    this.form.reset({Activo: true});
    
  }

  cargarFormulario() {
    //this.form.reset();
  }

  getArticulo() {

  }

}
