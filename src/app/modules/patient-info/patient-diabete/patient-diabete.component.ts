import {Component, Input, OnInit} from '@angular/core';
import {Rapport} from "../../../../model/rapport";
import {StorePatientService} from "../../../service/store-patient.service";
import {StoreConsultationService} from "../../../service/store-consultation.service";

@Component({
  selector: 'app-patient-diabete',
  templateUrl: './patient-diabete.component.html',
  styleUrls: ['./patient-diabete.component.scss'],

})
export class PatientDiabeteComponent implements OnInit {
  @Input()
  rapport: Rapport;
  probaDiabete: string;

  constructor(private storePatientService: StorePatientService, private storeConsultationService: StoreConsultationService) {
  }

  ngOnInit(): void {
    this.storeConsultationService.observe().subscribe();
    this.storeConsultationService.observe().subscribe();
  }

  proba() {
    let color = {};
    if (this.rapport && this.rapport.diabetePatientRiskLevel === 'NONE') {
      return color = {color : '#2364e3'};
    }
    else if (this.rapport && this.rapport.diabetePatientRiskLevel === 'BORDELINE') {
      return color = color = {color : '#7d851a'};
    }
    else if (this.rapport && this.rapport.diabetePatientRiskLevel === 'IN_DANGER') {
      return color = color = {color : '#9f4c29'};
    }

    else if (this.rapport && this.rapport.diabetePatientRiskLevel === 'EARLY_ONSET') {
      return color = color = {color : 'rgb(195 27 27)'};
    }
    return null;
  }
}
