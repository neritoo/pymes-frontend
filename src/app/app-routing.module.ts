import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { DetalleArticuloComponent } from './components/articulos/detalle-articulo.component';
import { ArticulosFamiliasComponent } from './components/articulos-familias/articulos-familias.component';
import { FormArticuloComponent } from './components/articulos/form-articulo/form-articulo.component';
import { EmpresasComponent } from './components/empresas/empresas.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'articulos/form/:id', component: FormArticuloComponent },
  { path: 'articulos-familias', component: ArticulosFamiliasComponent },
  { path: 'articulos', component: ArticulosComponent },
  { path: 'articulos/form', component: FormArticuloComponent },
  { path: 'articulo/:id', component: DetalleArticuloComponent },
  { path: 'empresas', component: EmpresasComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
