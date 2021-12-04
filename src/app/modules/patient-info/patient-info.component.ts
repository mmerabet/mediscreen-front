import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PatientService} from "../../service/patient.service";
import {DialogService} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {StorePatientService} from "../../service/store-patient.service";
import {HistoryService} from "../../service/history.service";
import {FormConsultationComponent} from "./form-consultation/form-consultation.component";
import {StoreConsultationService} from "../../service/store-consultation.service";

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private ps: PatientService,
              private dialogService: DialogService,
              private messageService: MessageService,
              private storePatientService: StorePatientService,
              private router: Router,
              private hs: HistoryService,
              private storeConsultationService: StoreConsultationService
  ) {
  }

  ngOnInit(): void {
  }

  showForm() {
    const id = this.route.snapshot.params['id'];
    this.dialogService.open(FormConsultationComponent, {
      data: {id},
      width: '45rem',
      contentStyle: {"display": "block"},
      closeOnEscape: true,
      closable: true,
      dismissableMask: true,
      showHeader: true,
      // a la fermeture de la modal on ajoute le patient mis dans data de la modale dans addPatient
    }).onClose.subscribe(history => {
      if (history) this.storeConsultationService.addConsultations(history.consultations);
    })
  }
}
