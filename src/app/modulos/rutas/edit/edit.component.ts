import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RutaService } from '../../../servicios/ruta.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RutaModelo } from '../../../modelos/ruta.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private rutaService: RutaService,
    private router: Router,
    private route: ActivatedRoute) { }

    fgValidacion = this.fb.group({

      id: ['',[Validators.required]],
      origen: ['',[Validators.required]],
      destino: ['',[Validators.required]],
      tiempo_Estimado: ['',[Validators.required]]
    });

    id: string= ''

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id)
  }

  buscarRegistro(id: string){
    this.rutaService.getWithId(id).subscribe((data: RutaModelo)=>{
      console.log(data)
      this.fgValidacion.controls['id'].setValue(id)
      this.fgValidacion.controls['origen'].setValue(data.origen as string)
      this.fgValidacion.controls['destino'].setValue(data.destino as string)
      this.fgValidacion.controls['tiempo_Estimado'].setValue(data.tiempo_Estimado as string)
    })
  }

  edit(){
    let ruta = new RutaModelo();
    ruta.id = this.fgValidacion.controls['id'].value as string;
    ruta.origen = this.fgValidacion.controls['origen'].value as string;
    ruta.destino = this.fgValidacion.controls['destino'].value as string;
    ruta.tiempo_Estimado = this.fgValidacion.controls['tiempo_Estimado'].value as string;

    this.rutaService.update(ruta).subscribe((data: RutaModelo) =>{
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/rutas/get']);
    },
    (error: any) => {
      console.log(error)
      alert('Error en el envio');
    })
    
  }

}
