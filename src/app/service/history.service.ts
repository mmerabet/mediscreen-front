import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {HistoryP} from "../../model/historyP";
import {HistoryDTO} from "../../dto/historyDTO";


@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private apiServerUrl = environment.apiBaseHistory;

  constructor(private http: HttpClient) {
  }

  public getHistoryById(idHistory: string): Observable<HistoryP> {
    return this.http.get<HistoryP>(`${this.apiServerUrl}/id?id=${idHistory}`)
  }

  public createHistory(historyDTO: HistoryDTO): Observable<HistoryP> {
    return this.http.post<HistoryP>(`${this.apiServerUrl}/add`, historyDTO);
  }

  public updateHistory(history: HistoryDTO): Observable<HistoryP> {
    return this.http.put<HistoryP>(`${this.apiServerUrl}`, history);
  }

  public deleteConsultation(idHistory, idConsultation): Observable<any> {
    let httpPArams = new HttpParams().set('idConsultation', idConsultation);
    let options = { params: httpPArams };
    return this.http.delete<any>(`${this.apiServerUrl}/${idHistory}`, options);
  }
}
