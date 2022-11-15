import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RutaService } from '../../../servicios/ruta.service';
import { Router } from '@angular/router';
import { RutaModelo } from '../../../modelos/ruta.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private rutaService: RutaService,
    private router: Router) { }

    fgValidacion = this.fb.group({
      origen: ['',[Validators.required]],
      destino: ['',[Validators.required]],
      tiempo_Estimado: ['',[Validators.required]]
    });

  ngOnInit(): void {
  }

  store(){
    let ruta = new RutaModelo();
    ruta.origen = this.fgValidacion.controls['origen'].value as string;
    ruta.destino = this.fgValidacion.controls['destino'].value as string;
    ruta.tiempo_Estimado = this.fgValidacion.controls['tiempo_Estimado'].value as string;

    this.rutaService.store(ruta).subscribe((data: RutaModelo)=>{
      Swal.fire('Creado Correctamente!', '', 'success')
      this.router.navigate(['/rutas/get']);
    },
    (error: any)=>{
      console.log(error)
      alert("Error en el envio");
    })
  }
}
