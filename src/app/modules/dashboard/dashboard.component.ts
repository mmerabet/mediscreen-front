import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {DialogService} from "primeng/dynamicdialog";
import {FormPatientComponent} from "../../patients/patient/form-patient/form-patient.component";
import {StorePatientService} from "../../service/store-patient.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(public dialogService: DialogService, private sps: StorePatientService) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }

  showForm() {
    this.dialogService.open(FormPatientComponent, {
      header: "Ajouter un Patient",
      // width: '500px',
      closeOnEscape: true,
      closable: true,
      dismissableMask: true,
      showHeader: true,
      // a la fermeture de la modal on ajoute le patient mis dans data de la modale dans addPatient
    }).onClose.subscribe(patient => this.sps.addPatient(patient))
  }
}
