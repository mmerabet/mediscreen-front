import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {HistoryP} from "../../../../model/historyP";
import {ActivatedRoute, Router} from "@angular/router";
import {PatientService} from "../../../service/patient.service";
import {DialogService} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {StorePatientService} from "../../../service/store-patient.service";
import {HistoryService} from "../../../service/history.service";
import {Consultation} from "../../../../model/consultation";
import {FormConsultationComponent} from "../form-consultation/form-consultation.component";
import {Patient} from "../../../../model/patient";

@Component({
  selector: 'app-table-consultation',
  templateUrl: './table-consultation.component.html',
  styleUrls: ['./table-consultation.component.scss']
})
export class TableConsultationComponent implements OnInit {
  displayedColumns: string[] = ['recommendations', 'observations', 'date', 'actions'];
  pageSize = 5;
  totalSize = 0;
  currentPage = 0;
  private array: any;
  pageEvent: PageEvent;
  dataSource: MatTableDataSource<Consultation>;
  historys: HistoryP;
  id: string;
  empty = false;
  consultationDetail: Consultation;
  patient: Patient;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable, {static: false}) table: MatTable<HistoryP>;

  constructor(private route: ActivatedRoute,
              private ps: PatientService,
              private dialogService: DialogService,
              private messageService: MessageService,
              private storePatientService: StorePatientService,
              private router: Router,
              private hs: HistoryService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.ps.getPatientById(this.id).subscribe(p => {
      return this.patient = p;
    });
    this.hs.getHistoryById(this.id).subscribe(
      data => {
        this.historys = data;
        this.dataSource = new MatTableDataSource<Consultation>(data.consultations);
        this.dataSource.paginator = this.paginator;
        this.array = data.consultations;
        this.totalSize = this.array.length;
        this.iterator();
        // this.table?.renderRows();
      },
      () => {
        console.error("Historique non trouvé");
        this.empty = true;
      }
    );
  }

  showInfo(element) {
    this.consultationDetail = element;
  }

  updateConsultation(consultation) {
    this.dialogService.open(FormConsultationComponent, {
      data: {id: this.id, consultation},
      width: '45rem',
      contentStyle: {"display": "block"},
      closeOnEscape: true,
      closable: true,
      dismissableMask: true,
      showHeader: true,
    })
  }

  deleteConsultation(idConsultation) {
    console.log(idConsultation);
    this.hs.deleteConsultation(this.id, idConsultation).subscribe();
  }

  getPagination(e: PageEvent): any {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    return this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  }

  createRapport() {
    this.ps.createRapport({patient: this.patient, history: this.historys}).subscribe(r => console.log(r))
  }
}
