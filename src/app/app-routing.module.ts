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
<<<<<<< HEAD
  { path: '**', pathMatch: 'full', redirectTo: 'articulos'}
=======
  { path:'articulos-familias', component: ArticulosFamiliasComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
>>>>>>> 2d22bf97aa8d083d06b3aad2f26832ce95b4e319
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
