import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import Swal from "sweetalert2";

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
    private familiaService: ArticulosFamiliasService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
      this.articulo = new Articulo();
  }
  
  ngOnInit(): void {
    this.getFamilias();
    this.crearFormulario();
    this.cargarFormulario();
  }

  get nombreNoValido() {
    return this.form.get('Nombre').invalid && this.form.get('Nombre').touched;
  }

  get precioNoValido() {
    return this.form.get('Precio').invalid && this.form.get('Precio').touched;
  }

  get codigoBarraNoValido() {
    return this.form.get('CodigoDeBarra').invalid && this.form.get('CodigoDeBarra').touched;
  }

  get familiaNoValido() {
    return this.form.get('ArticulosFamilia').invalid && this.form.get('ArticulosFamilia').touched;
  }

  get stockNoValido() {
    return this.form.get('Stock').invalid && this.form.get('Stock').touched;
  }


  getFamilias() {
    this.familiaService.getArticulosFamilias().subscribe(familias => this.familias = familias)
  }
  
  crearFormulario() {
    this.form = this.fb.group({
      IdArticulo: [null],
      Nombre: [null, [Validators.required, Validators.minLength(4)]],
      Precio: [null, [Validators.required]],
      CodigoDeBarra: [null, [Validators.required]],
      ArticulosFamilia: [null, [Validators.required]],
      Stock: [null, [Validators.required]],
      FechaAlta: [null],
      Activo: [true]
    });
    
  }
  
  cargarFormulario() {
    this.activatedRoute.params.subscribe( params => {
      let id = params['id'];
      if (id){
        this.articuloService.getArticulo(id).subscribe((articulo: any) => {
          this.articulo = articulo;
          this.form.reset(this.articulo);
          console.log(this.form.value.ArticulosFamilia.IdArticuloFamilia);
        });
      } else {
        return;
      }
    });
  }

  guardar() {

    this.articulo = this.form.value
    
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(ctrl => {
        ctrl.markAsTouched();
      });
    } else {
      this.articulo.IdArticuloFamilia = this.articulo.ArticulosFamilia.IdArticuloFamilia;
    }

    this.articuloService.crearArticulo(this.articulo);
    
    console.log(this.form);
    
    this.router.navigate(['/articulos']);

    Swal.fire({
      icon: 'success',
      title: 'Articulo creado',
      text: `Articulo ${this.articulo.Nombre} creado con éxito!`,
      timer: 3000
    });

    // alert(`Articulo ${this.articulo.Nombre} creado con éxito!`);
    
  }


  update() {

    this.articulo = this.form.value;
    this.articulo.IdArticuloFamilia = this.articulo.ArticulosFamilia.IdArticuloFamilia;

    this.articuloService.actualizarArticulo(this.articulo);

    console.log(this.articulo);

    this.router.navigateByUrl(`/articulo/${this.articulo.IdArticulo}`);

    Swal.fire({
      icon: 'success',
      title: 'Articulo actualizado',
      text: `Articulo ${this.articulo.Nombre} actualizado con éxito!`,
      timer: 3000
    });

    //alert(`Articulo ${this.articulo.Nombre} actualizado!`);

  }

  waitAlert() {
    Swal.fire({
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info',
      text: 'Espere porfavor',
      timer: 3000
    })
  }

  comparar(familia: ArticuloFamilia, familiaArticulo: ArticuloFamilia): boolean {
    if (familia === undefined && familiaArticulo === undefined) {
      return true;
    }

    return familia === null || familiaArticulo === null? false: familia.IdArticuloFamilia === familiaArticulo.IdArticuloFamilia;
  }

}
