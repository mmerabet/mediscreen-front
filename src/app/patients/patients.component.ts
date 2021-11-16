import {Component, OnInit} from '@angular/core';
import {Patient} from "../../model/patient";
import {PatientService} from "../service/patient.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  patients: Patient[] = [];
  patient: Patient;

  constructor(private ps: PatientService, private fb: FormBuilder) { }


  ngOnInit(): void {
    this.ps.getAllPatients().subscribe(data => this.patients = data);
  }
}
