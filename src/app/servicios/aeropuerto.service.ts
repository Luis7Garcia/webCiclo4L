import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SeguridadService } from './seguridad.service';
import { AeropuertoModelo } from '../modelos/aeropuerto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AeropuertoService {

  url = "http://localhost:3000"
  token: string = ''

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) {
      this.token = this.seguridadService.getToken();      
    }

    store(aeropuerto: AeropuertoModelo): Observable<AeropuertoModelo> {
      return this.http.post<AeropuertoModelo>(`${this.url}/aeropuertos`, {
        nombre: aeropuerto.nombre,
        ciudad: aeropuerto.ciudad,
        pais: aeropuerto.pais,
        coord_x: aeropuerto.coord_x,
        coord_y: aeropuerto.coord_y,
        siglas: aeropuerto.siglas,
        tipo: aeropuerto.tipo
      });
    }

    getAll(): Observable<AeropuertoModelo[]>{
      return this.http.get<AeropuertoModelo[]>(`${this.url}/aeropuertos`, {
        // Le paso el token a la solicitud
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    update(aeropuerto: AeropuertoModelo): Observable<AeropuertoModelo> {
      return this.http.patch<AeropuertoModelo>(`${this.url}/aeropuertos/${aeropuerto.id}`, {
        nombre: aeropuerto.nombre,
        ciudad: aeropuerto.ciudad,
        pais: aeropuerto.pais,
        coord_x: aeropuerto.coord_x,
        coord_y: aeropuerto.coord_y,
        siglas: aeropuerto.siglas,
        tipo: aeropuerto.tipo
      }, {
        // Le paso el token a la solicitud
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
    }

    delete(id: string): Observable<AeropuertoModelo[]>{
      return this.http.delete<AeropuertoModelo[]>(`${this.url}/aeropuertos/${id}`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    getWithId(id: string): Observable<AeropuertoModelo>{
      return this.http.get<AeropuertoModelo>(`${this.url}/aeropuertos/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }   

    getCount(): Observable<AeropuertoModelo[]>{
      return this.http.get<AeropuertoModelo[]>(`${this.url}/aeropuertos/count`, {
        // Le paso el token a la solicitud
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
 
}
