import { Component, OnInit } from '@angular/core';
import { RutaService } from '../../../servicios/ruta.service';
import { RutaModelo } from '../../../modelos/ruta.model';
import Swal from 'sweetalert2';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(private rutaService: RutaService) { }
  listado: RutaModelo[] = []

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.rutaService.getAll().subscribe((data: RutaModelo[]) =>{
      this.listado = data
      console.log(data)
    })

  }
  delete(id?: any){
    console.log(id)
    Swal.fire({
      title: '¿Esta seguro que deseas eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) =>{
      if(result.isConfirmed){
        this.rutaService.delete(id).subscribe((data: any)=>{
          Swal.fire('Eliminado Correctamente!', '', 'success')
          this.getAll();
        })
      }
    })
  }

}
