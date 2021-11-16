import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Patient} from "../../model/patient";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiServerUrl = environment.apiBase;

  constructor(private http: HttpClient) {
  }

  public getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiServerUrl}/patient/patients`);
  }

  public getPatientById(idPatient: String): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiServerUrl}/patient/id?id=${idPatient}`)
  }

  public createPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiServerUrl}/patient/add`, patient);
  }

  public updatePatient(patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiServerUrl}/patient`, patient);
  }

  public deletePatient(idPatient: number): Observable<string> {
    return this.http.delete<string>(`${this.apiServerUrl}/patient/${idPatient}`);
  }
}
