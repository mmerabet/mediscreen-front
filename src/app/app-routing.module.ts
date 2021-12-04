import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DefaultComponent} from "./layouts/default/default.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PatientInfoComponent} from "./modules/patient-info/patient-info.component";

const routes: Routes = [{
  path: '', component: DefaultComponent,
  children: [
    {path: '', component: DashboardComponent },
    {path: 'patientInfo/:id', component: PatientInfoComponent }
  ]
}];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
