import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeguridadService } from '../../servicios/seguridad.service';
import { UsuarioModel } from '../../modelos/usuario.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private seguridadService: SeguridadService) { }

  activeSession?: boolean = false;
    subs: Subscription = new Subscription();

  ngOnInit(): void {
    this.subs = this.seguridadService.datosUsuarioSesion().subscribe((data: UsuarioModel) => {
      console.log(data)
        this.activeSession = data.isLoggedIn;
    })
  }

}
