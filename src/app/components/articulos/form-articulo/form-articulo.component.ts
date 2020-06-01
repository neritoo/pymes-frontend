import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Articulo } from 'src/app/clases/articulo';
import { ArticuloFamilia } from 'src/app/clases/articulo-familia';
import { ArticulosService } from 'src/app/services/articulos.service';
import { ArticulosFamiliasService } from 'src/app/services/articulos-familias.service';
import { ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
    private familiaService: ArticulosFamiliasService,
    private activatedRoute: ActivatedRoute) {
      this.articulo = new Articulo();
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
      ArticulosFamilia: [null],
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
    // Explicar que cambiamos.
    this.articulo.ArticulosFamilia = this.form.value.ArticulosFamilia;
    this.articulo.IdArticuloFamilia = this.articulo.ArticulosFamilia.IdArticuloFamilia;
    this.articulo.Stock = this.form.value.Stock;
    this.articulo.FechaAlta = this.form.value.FechaAlta;
    this.articulo.Activo = this.form.value.Activo;

    console.log(this.articulo);

    this.articuloService.crearArticulo(this.articulo);

    this.form.reset({Activo: true});
    
  }

  cargarFormulario() {
    this.activatedRoute.params.subscribe( params => {
      let id = params['id'];
      if (id){
        this.articuloService.getArticulo(id).subscribe((articulo: any) => {
          this.articulo = articulo;
          this.form.reset(this.articulo);
          //console.log(this.articulo);
          console.log(this.form.value.ArticulosFamilia.IdArticuloFamilia);
        });
      } else {
        return;
      }
    });
  }

  update() {
    
  }

  comparar(familia: ArticuloFamilia, familiaArticulo: ArticuloFamilia): boolean {
    if (familia == undefined && familiaArticulo == undefined) {
      return true;
    }

    return familia == null || familiaArticulo == null? false: familia.IdArticuloFamilia === familiaArticulo.IdArticuloFamilia;
  }

}
