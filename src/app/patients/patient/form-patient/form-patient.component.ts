import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "../../../service/patient.service";
import {Patient} from "../../../../model/patient";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-form-patient',
  templateUrl: './form-patient.component.html',
  styleUrls: ['./form-patient.component.scss'],
})
export class FormPatientComponent implements OnInit {
  form: FormGroup;
  patient: Patient = this.config.data?.patient;
  genres = ['Feminin', 'Masculin'];
  constructor(private ps: PatientService, private fb: FormBuilder, public ref: DynamicDialogRef, public config: DynamicDialogConfig, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.initPatientForm();
  }

  initPatientForm() {
    this.form = this.fb.group({
      id: [this.patient?.id],
      firstName: [this.patient?.firstName, [Validators.required]],
      lastName: [this.patient?.lastName, [Validators.required]],
      birthdate: [this.patient?.birthdate],
      gender: [this.patient?.gender],
      address: [this.patient?.address],
      phone: [this.patient?.phone],
    });
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (['Escape', 'Esc'].includes(event.code)) this.ref?.close()
  }

  patientForm() {
    if (this.patient) {
      this.ps.updatePatient(this.form.value).subscribe(patient => {
        this.ref.close(patient);
        this.messageService.add({severity: 'success', summary: 'Ajout réussi', detail: 'Le patient à bien été ajouté'})
      });
    } else this.ps.createPatient(this.form.value).subscribe(patient => this.ref.close(patient));
  }

  genreChoose({value}) {

    console.log(value.genre);
  }
}
