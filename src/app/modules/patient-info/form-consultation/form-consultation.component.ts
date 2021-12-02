import {Component, HostListener, OnInit} from '@angular/core';
import {PatientService} from "../../../service/patient.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Consultation} from "../../../../model/consultation";
import {HistoryService} from "../../../service/history.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HistoryP} from "../../../../model/historyP";

@Component({
  selector: 'app-form-consultation',
  templateUrl: './form-consultation.component.html',
  styleUrls: ['./form-consultation.component.scss']
})
export class FormConsultationComponent implements OnInit {
  form1: FormGroup;
  // patient: Patient = this.config.data?.patient;
  history: HistoryP;
  consultation: Consultation = this.config.data.consultation;
  idHistory: string = this.config.data.id;

  constructor(
    private ps: PatientService,
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService,
    private hs: HistoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.initConsultationForm();
  }

  initConsultationForm() {
    console.log(this.consultation?.id, ' formulaire modif consultation');
    console.log(this.idHistory);
    this.form1 = this.fb.group({
      idHistory: [this.idHistory],
      idConsultation: [this.consultation?.id],
      recommendations: [this.consultation?.recommendations, [Validators.required]],
      observations: [this.consultation?.observations, [Validators.required]],
    });
    // this.form1.statusChanges.subscribe(status => console.log(status));
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (['Escape', 'Esc'].includes(event.code)) this.ref?.close()
  }

  consultationForm() {
    console.log(this.form1.value);
    if (this.consultation) {
      this.hs.updateHistory(this.form1.value).subscribe();
    } else {
      this.hs.createHistory(this.form1.value).subscribe();
    }
    this.ref.close();
  }
}
