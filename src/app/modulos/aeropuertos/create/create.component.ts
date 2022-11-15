import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AeropuertoService } from '../../../servicios/aeropuerto.service';
import { Router } from '@angular/router';
import { AeropuertoModelo } from '../../../modelos/aeropuerto.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private aeropuertoService: AeropuertoService,
    private router: Router) { }

    fgValidacionn = this.fb.group({
      nombre: ['',[Validators.required]],
      ciudad: ['',[Validators.required]],
      pais: ['',[Validators.required]],
      coord_x: ['',[Validators.required]],
      coord_y: ['',[Validators.required]],
      siglas: ['',[Validators.required]],
      tipo: ['',[Validators.required]],
    });
  ngOnInit(): void {
  }

  store(){
        let aeropuerto = new AeropuertoModelo();
        aeropuerto.nombre = this.fgValidacionn.controls['nombre'].value as string;
        aeropuerto.ciudad = this.fgValidacionn.controls['ciudad'].value as string;
        aeropuerto.pais = this.fgValidacionn.controls['pais'].value as string;
        aeropuerto.coord_x = this.fgValidacionn.controls['coord_x'].value as string;
        aeropuerto.coord_y = this.fgValidacionn.controls['coord_y'].value as string;
        aeropuerto.siglas = this.fgValidacionn.controls['siglas'].value as string;
        aeropuerto.tipo = this.fgValidacionn.controls['tipo'].value as string;

        this.aeropuertoService.store(aeropuerto).subscribe((data: AeropuertoModelo) =>{
          Swal.fire('Creado correctamente!', '', 'success')
          this.router.navigate(['/aeropuertos/get']);
        },
        (error: any) =>{
          console.log(error)
          alert("Error en el envio");
        })
  }

  

}
