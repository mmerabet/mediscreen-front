import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PatientService} from "../../../service/patient.service";
import {Patient} from "../../../../model/patient";
import {MatTable} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {DialogService} from "primeng/dynamicdialog";
import {FormPatientComponent} from "../form-patient/form-patient.component";
import {StorePatientService} from "../../../service/store-patient.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-table-patient',
  templateUrl: './table-patient.component.html',
  styleUrls: ['./table-patient.component.scss']
})
export class TablePatientComponent implements OnInit, AfterViewInit {
  patients: Patient[] = [];
  patient: Patient;
  displayedColumns: string[] = ['firstName', 'lastName', 'birthdate', 'gender', 'address', 'phone', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable, {static:false}) table: MatTable<Patient>;

  constructor(private ps: PatientService,
              public dialogService: DialogService,
              private sp: StorePatientService,
              private route: Router
  ) {
  }

  ngOnInit(): void {
    //je m'abonne behaviorsubject
    this.sp.observe().subscribe(data => {
      this.patients = data;
      //permet de mettre a jour la table material en async
      this.table?.renderRows();
    });
    // je recupere dans le back les données
    this.ps.getAllPatients().subscribe(data => {
      //j'envoie les données a tous ceux qui ont souscrits
      this.sp.addPatients(data)
    });
  }

  ngAfterViewInit() {
  }

  deletePatient(idPatient: number) {
    this.ps.deletePatient(idPatient).subscribe(() => {
    const newTable = this.patients.filter(p => p.id !== idPatient);
      this.sp.addPatients(newTable);
    });
  }

  updatePatient(patient: Patient) {
    this.dialogService.open(FormPatientComponent, {
      header: 'Modifier un patient',
      data: {patient}
    }).onClose.subscribe(patient => this.sp.updatePatient(patient));
  }

  patientInfo(patient: Patient) {
    this.route.navigate([`/patientInfo/${patient.id}`]);
  }
}
