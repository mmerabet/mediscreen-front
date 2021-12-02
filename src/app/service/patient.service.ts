import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Patient} from "../../model/patient";
import {environment} from "../../environments/environment";
import {PatientWithHistory} from "../../model/patientWithHistory";
import {Rapport} from "../../model/rapport";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiServerUrl = environment.apiBasePatient;
  private apiServerUrlRapport = environment.apiBaseRapport;

  constructor(private http: HttpClient) {
  }

  public getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiServerUrl}/patient/patients`);
  }

  public getPatientById(idPatient: String): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiServerUrl}/patient/${idPatient}`)
  }

  public createPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiServerUrl}/patient/add`, patient);
  }

  public updatePatient(patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiServerUrl}/patient`, patient);
  }

  public deletePatient(idPatient: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/patient/${idPatient}`);
  }

  // Service Rapport
  public createRapport(patientWithHistory: PatientWithHistory): Observable<any> {
    return this.http.post<Rapport>(`${this.apiServerUrlRapport}`, patientWithHistory);
  }
}
