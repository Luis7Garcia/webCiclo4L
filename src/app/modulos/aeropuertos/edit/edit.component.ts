import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AeropuertoService } from '../../../servicios/aeropuerto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AeropuertoModelo } from '../../../modelos/aeropuerto.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private aeropuertoService: AeropuertoService,
    private router: Router,
    private route: ActivatedRoute) { }

    fgValidacionn = this.fb.group({
      id: ['',[Validators.required]],
      nombre: ['',[Validators.required]],
      ciudad: ['',[Validators.required]],
      pais: ['',[Validators.required]],
      coord_x: ['',[Validators.required]],
      coord_y: ['',[Validators.required]],
      siglas: ['',[Validators.required]],
      tipo: ['',[Validators.required]],
    });

    id: string = ''

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);
  }

  buscarRegistro(id: string){
    this.aeropuertoService.getWithId(id).subscribe((data: AeropuertoModelo) =>{
      console.log(data)
      this.fgValidacionn.controls["id"].setValue(id)
      this.fgValidacionn.controls["nombre"].setValue(data.nombre as string)
      this.fgValidacionn.controls['ciudad'].setValue(data.ciudad as string)
      this.fgValidacionn.controls['pais'].setValue(data.pais as string)
      this.fgValidacionn.controls['coord_x'].setValue(data.coord_x as string)
      this.fgValidacionn.controls['coord_y'].setValue(data.coord_y as string)
      this.fgValidacionn.controls['siglas'].setValue(data.siglas as string)
      this.fgValidacionn.controls['tipo'].setValue(data.tipo as string)
    })
  }

  edit(){
    let  aeropuerto = new AeropuertoModelo();
    aeropuerto.id = this.fgValidacionn.controls['id'].value as string;
    aeropuerto.nombre = this.fgValidacionn.controls['nombre'].value as string;
    aeropuerto.ciudad = this.fgValidacionn.controls['ciudad'].value as string;
    aeropuerto.pais = this.fgValidacionn.controls['pais'].value as string;
    aeropuerto.coord_x = this.fgValidacionn.controls['coord_x'].value as string;
    aeropuerto.coord_y = this.fgValidacionn.controls['coord_y'].value as string;
    aeropuerto.siglas = this.fgValidacionn.controls['siglas'].value as string;
    aeropuerto.tipo = this.fgValidacionn.controls['tipo'].value as string;

    this.aeropuertoService.update(aeropuerto).subscribe((data: AeropuertoModelo) =>{
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/aeropuertos/get']);
    },
    (error: any)=>{
      console.log(error)
      alert('Error en el envio')
    })
  }

}
