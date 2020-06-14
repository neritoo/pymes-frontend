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

  // Getters que serviran para las validaciones.

  get nombreNoValido() {
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }

  get precioNoValido() {
    return this.form.get('precio').invalid && this.form.get('precio').touched;
  }

  get codigoBarraNoValido() {
    return this.form.get('codigoBarra').invalid && this.form.get('codigoBarra').touched;
  }

  get familiaNoValido() {
    return this.form.get('articulosFamilia').invalid && this.form.get('articulosFamilia').touched;
  }

  get stockNoValido() {
    return this.form.get('stock').invalid && this.form.get('stock').touched;
  }

  getFamilias() {
    this.familiaService.getArticulosFamilias().subscribe(familias => this.familias = familias)
  }
  
  crearFormulario() {
    this.form = this.fb.group({
      id: [null],
      nombre: [null, [Validators.required, Validators.minLength(4)]],
      precio: [null, [Validators.required]],
      codigoBarra: [null, [Validators.required]],
      articulosFamilia: [null, [Validators.required]],
      stock: [null, [Validators.required]],
      fechaAlta: [null],
      activo: [true]
    });
    
  }
  
  cargarFormulario() {
    this.waitAlert();
    this.activatedRoute.params.subscribe( params => {
      let id = params['id'];
      if (id){
        this.articuloService.getArticulo(id).subscribe((articulo: any) => {
          this.articulo = articulo;
          this.form.reset(this.articulo);
          console.log(this.form.value.articulosFamilia.id);
          Swal.close();
        });
      } else {
        return;
      }
    });
  }

  marcarControles() {
    Object.values(this.form.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  guardar() {

    this.articulo = this.form.value;
    //this.articulo.IdArticuloFamilia = this.articulo.ArticulosFamilia.IdArticuloFamilia;

    if(this.form.invalid) {
      this.marcarControles();
      return;
    }
    
    this.articuloService.crearArticulo(this.articulo).subscribe(
      articulo => {
        this.router.navigate(['/articulos']);
        Swal.fire({
          icon: 'success',
          title: 'Articulo creado',
          text: `Articulo ${this.articulo.nombre} creado con éxito!`,
          timer: 3000
        });

      }
    );

    console.log(this.articulo);

    //alert(`Articulo ${this.articulo.Nombre} creado con éxito!`);
    
  }


  update() {

    this.articulo = this.form.value;
    // this.articulo.IdArticuloFamilia = this.articulo.ArticulosFamilia.IdArticuloFamilia;

    if (this.form.invalid) {
      this.marcarControles();
      return;
    }

    this.articuloService.actualizarArticulo(this.articulo).subscribe(articulo => {
      this.router.navigate(['/articulo', this.articulo.id]);
      Swal.fire({
        icon: 'success',
        title: 'Articulo actualizado',
        text: `Articulo ${this.articulo.nombre} actualizado con éxito!`,
        timer: 3000
      });
    });

    console.log(this.articulo);

    this.router.navigateByUrl(`/articulo/${this.articulo.id}`);

    //alert(`Articulo ${this.articulo.Nombre} actualizado!`);

  }

  comparar(familia: ArticuloFamilia, familiaArticulo: ArticuloFamilia): boolean {
    if (familia === undefined && familiaArticulo === undefined) {
      return true;
    }

    return familia === null || familiaArticulo === null? false: familia.id === familiaArticulo.id;
  }

  waitAlert() {
    Swal.fire({
      allowOutsideClick: false,
      showConfirmButton: false,
      icon: 'info',
      text: 'Espere porfavor',
      timer: 3000
    });
  }

}
