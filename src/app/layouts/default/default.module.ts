import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DefaultComponent} from "./default.component";
import {DashboardComponent} from "../../dashboard/dashboard.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from "@angular/material/divider";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {PatientsModule} from "../../patients/patients.module";
import {MatButtonModule} from "@angular/material/button";
import {DialogService, DynamicDialogModule, DynamicDialogRef} from "primeng/dynamicdialog";
import {PatientInfoComponent} from "../../modules/patient-info/patient-info.component";
import {ToastModule} from "primeng/toast";
import {MatIconModule} from "@angular/material/icon";
import {TableConsultationComponent} from "../../modules/patient-info/table-consultation/table-consultation.component";
import {IdentiteComponent} from "../../modules/patient-info/identite/identite.component";
import {FormConsultationComponent} from "../../modules/patient-info/form-consultation/form-consultation.component";
import {ReactiveFormsModule} from "@angular/forms";
import {PatientDiabeteComponent} from "../../modules/patient-info/patient-diabete/patient-diabete.component";


@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PatientInfoComponent,
    TableConsultationComponent,
    IdentiteComponent,
    FormConsultationComponent,
    PatientDiabeteComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    PatientsModule,
    MatButtonModule,
    DynamicDialogModule,
    MatDividerModule,
    MatCardModule,
    ToastModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  providers: [
    DialogService,
  ]
})
export class DefaultModule {
}
