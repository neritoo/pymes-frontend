import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Articulo } from 'src/app/clases/articulo';
import { ArticuloFamilia } from 'src/app/clases/articulo-familia';
import { ArticulosService } from 'src/app/services/articulos.service';
import { ArticulosFamiliasService } from 'src/app/services/articulos-familias.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  getFamilias() {
    this.familiaService.getArticulosFamilias().subscribe(familias => this.familias = familias)
  }
  
  crearFormulario() {
    this.form = this.fb.group({
      IdArticulo: [null],
      Nombre: [null],
      Precio: [null],
      CodigoDeBarra: [null],
      ArticulosFamilia: [null],
      Stock: [null],
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

    this.articulo = this.form.value;
    this.articulo.IdArticuloFamilia = this.articulo.ArticulosFamilia.IdArticuloFamilia;

    this.articuloService.crearArticulo(this.articulo);
    
    console.log(this.articulo);
    
    this.router.navigate(['/articulos']);

    alert(`Articulo ${this.articulo.Nombre} creado con éxito!`);
    
  }


  update() {

    this.articulo = this.form.value;
    this.articulo.IdArticuloFamilia = this.articulo.ArticulosFamilia.IdArticuloFamilia;

    this.articuloService.actualizarArticulo(this.articulo);

    console.log(this.articulo);

    this.router.navigateByUrl(`/articulo/${this.articulo.IdArticulo}`);

    alert(`Articulo ${this.articulo.Nombre} actualizado!`);

  }

  comparar(familia: ArticuloFamilia, familiaArticulo: ArticuloFamilia): boolean {
    if (familia === undefined && familiaArticulo === undefined) {
      return true;
    }

    return familia === null || familiaArticulo === null? false: familia.IdArticuloFamilia === familiaArticulo.IdArticuloFamilia;
  }

}
