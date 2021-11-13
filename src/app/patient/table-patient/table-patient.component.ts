import { Component, OnInit } from '@angular/core';
import {PatientService} from "../../../service/patient.service";
import {Patient} from "../../../model/patient";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-table-patient',
  templateUrl: './table-patient.component.html',
  styleUrls: ['./table-patient.component.scss']
})
export class TablePatientComponent implements OnInit {
  patients: Patient[] = [];
  form: FormGroup;
  patient: Patient;

  constructor(private ps: PatientService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.ps.getAllPatients().subscribe(data => this.patients = data);
    this.initPatientForm();
  }
  initPatientForm() {
    this.form = this.fb.group({
      firstName: ['',  [Validators.required]],
      lastName: ['', [Validators.required]],
      birthdate: [''],
      gender: [''],
      address: [''],
      phone:[''],
    });
  }
  onSubmitNurseForm() {
    this.patient = this.form.value;
    console.log(typeof this.form.value);
    this.ps.addPatient(this.patient).subscribe(patient => console.log(patient));
  }

  deletePatient(idPatient: number) {
    console.log(idPatient);
    this.ps.deletePatient(idPatient);
  }
}
