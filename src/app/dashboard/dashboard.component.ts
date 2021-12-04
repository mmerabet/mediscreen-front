import {Component, ViewEncapsulation} from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {FormPatientComponent} from "../patients/patient/form-patient/form-patient.component";
import {StorePatientService} from "../service/store-patient.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  encapsulation: ViewEncapsulation.None
  constructor(public dialogService: DialogService, private sps: StorePatientService) {
  }

  showForm() {
    this.dialogService.open(FormPatientComponent, {
      width: '40rem',
      contentStyle: {"max-height": "600px", "display": "block"},
      closeOnEscape: true,
      closable: true,
      dismissableMask: true,
      showHeader: true,
      // a la fermeture de la modal on ajoute le patient mis dans data de la modale dans addPatient
    }).onClose.subscribe(patient => {
      if (patient) this.sps.addPatient(patient);
    })
  }
}
