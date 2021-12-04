import {Injectable} from '@angular/core';
import {Patient} from "../../model/patient";
import {PatientService} from "./patient.service";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorePatientService {

  private behaviorSubject = new BehaviorSubject<Patient[]>([]);

  constructor() {
  }

  observe(): Observable<Patient[]> {
    return this.behaviorSubject.asObservable();
  }

  addPatient(patient: Patient) {
    //recuere la valeur de l'observable
    const currentVal = this.behaviorSubject.value;
    currentVal.push(patient);
    this.behaviorSubject.next(currentVal);
  }

  updatePatient(patient: Patient) {
    const newTable = this.behaviorSubject.value.map(p => {
      if (p.id === patient.id) p = patient;
      return p;
    });
    this.addPatients(newTable);
  }

  addPatients(patients: Patient[]) {
    //il pousse une nouvelle valuer dans l'observable
    this.behaviorSubject.next(patients);
  }


}
