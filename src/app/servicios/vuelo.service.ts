import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SeguridadService } from './seguridad.service';
import { VueloModelo } from '../modelos/vuelo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VueloService {

  url = "http://localhost:3000"
  token: string = ''

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) {
      this.token = this.seguridadService.getToken();      
    }

    store(vuelo: VueloModelo): Observable<VueloModelo> {
      return this.http.post<VueloModelo>(`${this.url}/vuelos`, {
        fecha_inicio: vuelo.fecha_inicio,
        hora_inicio: vuelo.hora_inicio,
        fecha_fin: vuelo.fecha_fin,
        hora_fin: vuelo.hora_fin,
        asientos_vendidos: vuelo.asientos_vendidos, 
        nombre_piloto: vuelo.nombre_piloto, 
        ruta: vuelo.ruta 
      },{
        // Le paso el token a la solicitud
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
    });
  }

    getAll(): Observable<VueloModelo[]>{
      return this.http.get<VueloModelo[]>(`${this.url}/vuelos`, {
        // Le paso el token a la solicitud
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    update(vuelo: VueloModelo): Observable<VueloModelo> {
      return this.http.patch<VueloModelo>(`${this.url}/vuelos/${vuelo.id}`, {
        fecha_inicio: vuelo.fecha_inicio,
        hora_inicio: vuelo.hora_inicio,
        fecha_fin: vuelo.fecha_fin,
        hora_fin: vuelo.hora_fin,
        asientos_vendidos: vuelo.asientos_vendidos, 
        nombre_piloto: vuelo.nombre_piloto, 
        ruta: vuelo.ruta 
      }, {
        // Le paso el token a la solicitud
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
    }

    delete(id: string): Observable<VueloModelo[]>{
      return this.http.delete<VueloModelo[]>(`${this.url}/vuelos/${id}`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    getWithId(id: string): Observable<VueloModelo>{
      return this.http.get<VueloModelo>(`${this.url}/vuelos/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }   

    getCount(): Observable<VueloModelo[]>{
      return this.http.get<VueloModelo[]>(`${this.url}/vuelos/count`, {
        // Le paso el token a la solicitud
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
 
}