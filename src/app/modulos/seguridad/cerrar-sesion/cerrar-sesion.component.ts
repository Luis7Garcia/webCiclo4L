import { Component, OnInit } from '@angular/core';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.css']
})
export class CerrarSesionComponent implements OnInit {

  constructor(private seguridadService: SeguridadService,
    private router: Router) { }

  ngOnInit(): void {
    this.seguridadService.eliminarSesion();
    this.router.navigate(['/seguridad/login']);
  }

}
