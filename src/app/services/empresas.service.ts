import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../clases/empresa';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = 'https://pymes-apirest.herokuapp.com/api';
  }

  getEmpresas(): Observable<Empresa[]> {
    return this.http.get(`${this.url}/empresas`).pipe(
      map( (response: any ) => response as Empresa[])
    );
  }

}
