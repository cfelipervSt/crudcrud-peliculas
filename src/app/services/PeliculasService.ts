import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/enviroments';
import { Pelicula } from '../models/pelicula';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
   private apiUrl = `${environment.apiBaseUrl}/peliculas`;

  constructor(private http: HttpClient) { }


  getPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.apiUrl);
  }

  
  crearPelicula(pelicula: Pelicula): Observable<Pelicula> {
    return this.http.post<Pelicula>(this.apiUrl, pelicula);
  }

   
  actualizarPelicula(id: string, pelicula: Pelicula): Observable<any> {
    const { _id, ...peliculaId } = pelicula;
    return this.http.put(`${this.apiUrl}/${id}`, peliculaId);
  }

  
  eliminarPelicula(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
