import {Component, OnInit} from '@angular/core';
import {Patient} from "../../../model/patient";
import {PatientService} from "../../../service/patient.service";
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
  public onOpenModal(patient: Patient, mode:string):void {
    console.log("totot")
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type= "button";
  button.style.display = "none";
  button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addPatientModal');
    }
    if (mode === 'delete') {
      button.setAttribute('data-target', '#deletePatientModal');
    }
    container.appendChild(button);
    button.click();
  }

}
