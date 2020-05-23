import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ArticuloFamilia } from '../clases/articulo-familia';

@Injectable({
  providedIn: 'root'
})
export class ArticulosFamiliasService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://labsys.frc.utn.edu.ar:8080/api';
  }

  //params: n/a.
  //retorno: observable del array ArticuloFamilia[] proveniente del servidor
  getArticulosFamilias(): Observable<ArticuloFamilia[]> {

    //Retornar la respuesta HTTP GET, haciendo previamente el casteo a nuestro array ArticuloFamilia[].
    //return this.http.get<ArticuloFamilia[]>(`${this.url}/articulosFamilias`);
    

    //Retornar la respuesta HTTP GET, haciendo pasar la respuesta por el operador map, creando un
    //array auxiliar donde insertaremos tantos objetos ArticuloFamilia vacios como tenga la respuesta
    //para luego asignarles el id y nombre que vienen de la respuesta HTTP evitando que haya problemas
    //con las propieades creadas y declaradas en nuestra Clase ArticuloFamilia.
    return this.http.get(`${this.url}/articulosFamilias`).pipe(
      map( (resp: any) => {
        let articulosFamilias: ArticuloFamilia[] = [];        
        for (let i = 0; i < resp.length; i++) {
          let artFam = new ArticuloFamilia;
          articulosFamilias.push(artFam);
          articulosFamilias[i].id = resp[i].IdArticuloFamilia;
          articulosFamilias[i].nombre = resp[i].Nombre;
        }
        console.log(articulosFamilias);
        return articulosFamilias;
        //return resp as ArticuloFamilia[];
    }));
  }

}
