import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { registerLocaleData } from "@angular/common";
import locales from "@angular/common/locales/es-AR";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { DetalleArticuloComponent } from './components/articulos/detalle-articulo.component';
import { ArticulosFamiliasComponent } from './components/articulos-familias/articulos-familias.component';
import { FormArticuloComponent } from './components/articulos/form-articulo/form-articulo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmpresasComponent } from './components/empresas/empresas.component';

registerLocaleData(locales, 'es-AR');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ArticulosComponent,
    DetalleArticuloComponent,
    ArticulosFamiliasComponent,
    FormArticuloComponent,
    EmpresasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-AR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
