import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AeropuertosRoutingModule } from './aeropuertos-routing.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { GetComponent } from './get/get.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    GetComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AeropuertosRoutingModule
  ]
})
export class AeropuertosModule { }
