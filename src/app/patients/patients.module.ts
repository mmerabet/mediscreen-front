import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TablePatientComponent} from "./patient/table-patient/table-patient.component";
import {FormPatientComponent} from './patient/form-patient/form-patient.component';
import {TableModule} from "primeng/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatPaginatorModule} from "@angular/material/paginator";
import {DynamicDialogModule} from "primeng/dynamicdialog";
import {MatIconModule} from "@angular/material/icon";
import {DropdownModule} from "primeng/dropdown";


@NgModule({
  declarations: [
    TablePatientComponent,
    FormPatientComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ReactiveFormsModule,
    MatTableModule,
    FlexLayoutModule,
    MatPaginatorModule,
    DynamicDialogModule,
    MatIconModule,
    DropdownModule,
    FormsModule,
    CommonModule
  ],
  exports: [
    TablePatientComponent
  ]
})
export class PatientsModule { }
