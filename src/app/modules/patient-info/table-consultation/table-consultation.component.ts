import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {HistoryP} from "../../../../model/historyP";
import {ActivatedRoute, Router} from "@angular/router";
import {PatientService} from "../../../service/patient.service";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {StorePatientService} from "../../../service/store-patient.service";
import {HistoryService} from "../../../service/history.service";
import {Consultation} from "../../../../model/consultation";
import {FormConsultationComponent} from "../form-consultation/form-consultation.component";
import {Patient} from "../../../../model/patient";
import {StoreConsultationService} from "../../../service/store-consultation.service";
import {Rapport} from "../../../../model/rapport";

@Component({
  selector: 'app-table-consultation',
  templateUrl: './table-consultation.component.html',
  styleUrls: ['./table-consultation.component.scss'],
  providers: [DynamicDialogRef, DynamicDialogConfig]

})
export class TableConsultationComponent implements OnInit {
  historys: Consultation[];
  consultationDetail: Consultation;
  patient: Patient;
  dataSource: MatTableDataSource<Consultation> = new MatTableDataSource<Consultation>();
  displayedColumns: string[] = ['recommendations', 'observations', 'date', 'actions'];
  pageSize = 10;
  totalSize = 0;
  currentPage = 0;
  private array: any;
  pageEvent: PageEvent;
  id: string;
  empty = false;
  rapport: Rapport

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable, {static: false}) table: MatTable<HistoryP>;
  showRapport: boolean = false;

  constructor(private route: ActivatedRoute,
              private ps: PatientService,
              private dialogService: DialogService,
              private messageService: MessageService,
              private storePatientService: StorePatientService,
              private router: Router,
              private hs: HistoryService,
              private storeConsultationService: StoreConsultationService,
              public ref: DynamicDialogRef
  ) {
  }

  ngOnInit(): void {
    this.storeConsultationService.observe().subscribe((data: Consultation[]) => {
      this.historys = data;
      this.table?.renderRows();
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    });
    this.id = this.route.snapshot.params['id'];

    this.ps.getPatientById(this.id).subscribe(p => {
      return this.patient = p;
    });

    this.hs.getHistoryById(this.id).subscribe(
      data => this.storeConsultationService.addConsultations(data.consultations),
      () => {
        console.error("Historique non trouvé");
        this.empty = true;
      }
    );
  }

  showInfo(element) {
    this.consultationDetail = element;
  }

  updateConsultation(consultation: Consultation) {
    this.dialogService.open(FormConsultationComponent, {
      data: {id: this.id, consultation},
      width: '45rem',
      contentStyle: {"display": "block"},
      closeOnEscape: true,
      closable: true,
      dismissableMask: true,
      showHeader: true,
    }).onClose.subscribe(c => {
      this.storeConsultationService.updateConsultation(c)
    });
  }

  deleteConsultation(idConsultation): void {
    console.log(idConsultation);
    this.hs.deleteConsultation(this.id, idConsultation).subscribe(consultation => {
      this.storeConsultationService.deleteConsultation(idConsultation);
    });
  }

  getPagination(e: PageEvent): any {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    return this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    if (this.array.consultations > 0) {
      const part = this.array.consultations.slice(start, end);
      this.dataSource = part;
    }
  }

  createRapport(el: HTMLElement) {
    const trueHistory: HistoryP = {id: this.patient.id.toString(), consultations: [...this.historys]}
    this.ps.createRapport({patient: this.patient, history: trueHistory}).subscribe(r => {
      this.rapport = r;
      this.showRapport = true;
      setTimeout(()=> {
      el.scrollIntoView({behavior: "smooth", block: "end", inline: "end"});
      },700);

      // this.dialogService.open(PatientDiabeteComponent, {
      //   data: {rapport: r},
      //   width: '45rem',
      //   contentStyle: {"display": "block"},
      //   closeOnEscape: true,
      //   closable: true,
      //   dismissableMask: true,
      //   showHeader: true,
      // })
    })
  }
}
