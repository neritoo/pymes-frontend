import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { DetalleArticuloComponent } from './components/articulos/detalle-articulo.component';
import { ArticulosFamiliasComponent } from './components/articulos-familias/articulos-familias.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'articulos', component: ArticulosComponent },
  { path: 'articulo/:id', component: DetalleArticuloComponent },
  { path:'articulos-familias', component: ArticulosFamiliasComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
