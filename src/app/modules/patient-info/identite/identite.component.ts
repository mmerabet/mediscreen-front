import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PatientService} from "../../../service/patient.service";
import {DialogService} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {StorePatientService} from "../../../service/store-patient.service";
import {Patient} from "../../../../model/patient";
import {FormPatientComponent} from "../../../patients/patient/form-patient/form-patient.component";

@Component({
  selector: 'app-identite',
  templateUrl: './identite.component.html',
  styleUrls: ['./identite.component.scss']
})
export class IdentiteComponent implements OnInit {

  patient: Patient;
  patients: Patient[] = [];

  constructor(private route: ActivatedRoute,
              private ps: PatientService,
              private dialogService: DialogService,
              private messageService: MessageService,
              private storePatientService: StorePatientService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.ps.getPatientById(id).subscribe(patient => this.patient = patient);
    this.storePatientService.observe().subscribe(patients => {
      this.patients = patients
    });
    this.ps.getAllPatients().subscribe(patients => this.storePatientService.addPatients(patients));
  }

  updatePatient(patient: Patient) {
    this.dialogService.open(FormPatientComponent, {
      width: '40rem',
      header: 'Modifier un patient',
      data: {patient}
    }).onClose.subscribe(patient => {
        this.storePatientService.updatePatient(patient);
        this.ps.getPatientById(patient.id).subscribe(patient => this.patient = patient);
      },
      (error) => {
        this.messageService.add({severity: 'error', summary: 'modification réussi', detail: 'Le patient n\'à pas été modifié'})
      });
  }

  deletePatient(idPatient: number) {
    this.ps.deletePatient(idPatient).subscribe(
      () => {
        const newTable = this.patients.filter(p => p.id !== idPatient);
        this.storePatientService.addPatients(newTable);
        this.router.navigate([``]);
        this.messageService.add({severity: 'success', summary: 'Suppression réussi', detail: 'Le patient à bien été supprimé'})
      },
      error => this.messageService.add({severity: 'success', summary: 'Ajout réussi', detail: 'Le patient à bien été ajouté'})
    );
  }
}
