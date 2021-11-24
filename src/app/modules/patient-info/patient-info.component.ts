import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PatientService} from "../../service/patient.service";
import {DialogService} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {StorePatientService} from "../../service/store-patient.service";
import {HistoryService} from "../../service/history.service";
import {HistoryP} from "../../../model/historyP";
import {FormConsultationComponent} from "./form-consultation/form-consultation.component";

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit {


  history: HistoryP;

  constructor(private route: ActivatedRoute,
              private ps: PatientService,
              private dialogService: DialogService,
              private messageService: MessageService,
              private storePatientService: StorePatientService,
              private router: Router,
              private hs: HistoryService
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
    })

    //   this.dialogService.open(FormPatientComponent, {
    //     width: '40rem',
    //     contentStyle: {"max-height": "600px", "display": "block"},
    //     closeOnEscape: true,
    //     closable: true,
    //     dismissableMask: true,
    //     showHeader: true,
    //     // a la fermeture de la modal on ajoute le patient mis dans data de la modale dans addPatient
    //   }).onClose.subscribe(patient => {
    //     if (patient) this.sps.addPatient(patient);
    //   })
  }
}
