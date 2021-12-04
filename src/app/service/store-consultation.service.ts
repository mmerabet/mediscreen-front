import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Consultation} from "../../model/consultation";

@Injectable({
  providedIn: 'root'
})
export class StoreConsultationService {
  private behaviorSubject = new BehaviorSubject<Consultation []>([]);

  constructor() {
  }

  observe(): Observable<any> {
    return this.behaviorSubject.asObservable();
  }

  addConsultations(consultation: Consultation[]): void {
    this.behaviorSubject.next(consultation);
  }

  deleteConsultation(idConsultation: string): void {
    const currentValue = this.behaviorSubject.value;
    const consultations = currentValue.filter(c => c.id !== idConsultation);
    this.behaviorSubject.next(consultations);
  }

  updateConsultation(consultation: Consultation) {
    const consultations = this.behaviorSubject.value.map(c => {
      if (c.id === consultation.id) c = consultation;
      return c;
    });
    this.behaviorSubject.next(consultations);
  }
}
