import { Component, OnInit } from '@angular/core';
import { VueloService } from '../../../servicios/vuelo.service';
import { VueloModelo } from '../../../modelos/vuelo.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(private vueloService: VueloService) { }

  listado: VueloModelo[] = []

  ngOnInit(): void {
    this.getALL()
  }

  getALL(){
    this.vueloService.getAll().subscribe((data: VueloModelo[])=>{
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
    }).then((result)=>{
      if(result.isConfirmed){
        this.vueloService.delete(id).subscribe((data: any)=>{
          Swal.fire('Eliminado Correctamente!', '', 'success')
          this.getALL();
        })
      }
    })
  }

}
