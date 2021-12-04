import {Component, OnInit, ViewChild} from '@angular/core';
import {PatientService} from "../../../service/patient.service";
import {Patient} from "../../../../model/patient";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {DialogService} from "primeng/dynamicdialog";
import {FormPatientComponent} from "../form-patient/form-patient.component";
import {StorePatientService} from "../../../service/store-patient.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-table-patient',
  templateUrl: './table-patient.component.html',
  styleUrls: ['./table-patient.component.scss']
})
export class TablePatientComponent implements OnInit {
  patients: Patient[] = [];
  patient: Patient;
  dataSource: MatTableDataSource<Patient> = new MatTableDataSource<Patient>();
  displayedColumns: string[] = ['firstName', 'lastName', 'birthdate', 'gender', 'address', 'phone', 'actions'];
  pageSize = 10;
  totalSize  = 0;
  currentPage = 0;
  private array: any;
  pageEvent: PageEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable, {static:false}) table: MatTable<Patient>;

  constructor(private ps: PatientService,
              public dialogService: DialogService,
              private sp: StorePatientService,
              private route: Router,
              private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    //je m'abonne behaviorsubject
    this.sp.observe().subscribe(data => {

      this.patients = data;
      //permet de mettre a jour la table material en async
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      // this.table?.renderRows();
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    });
    // je recupere dans le back les données
    this.ps.getAllPatients().subscribe(data => {
      //j'envoie les données a tous ceux qui ont souscrits
      this.sp.addPatients(data)
    });
  }

  deletePatient(idPatient: number) {
    this.ps.deletePatient(idPatient).subscribe(
      () => {
        const newTable = this.patients.filter(p => p.id !== idPatient);
        this.sp.addPatients(newTable);
        this.messageService.add({severity:'success',  summary:'Suppression réussi', detail:'Le patient à bien été supprimé'})
      },
      error => this.messageService.add({severity:'success',  summary:'Ajout réussi', detail:'Le patient à bien été ajouté'})
    );
  }

  updatePatient(patient: Patient) {
    this.dialogService.open(FormPatientComponent, {
      width: '40rem',
      header: 'Modifier un patient',
      data: {patient}
    }).onClose.subscribe(patient => {
      this.sp.updatePatient(patient)
    },
      (error) =>{
        this.messageService.add({severity:'success',  summary:'Suppression réussi', detail:'Le patient à bien été supprimé'})
      });
  }

  patientInfo(patient: Patient) {
    this.route.navigate([`/patientInfo/${patient.id}`]);
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

  showInfo(element) {
    this.route.navigate(['patientInfo', element.id]);
  }
}
