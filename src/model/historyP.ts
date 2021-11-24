import {Consultation} from "./consultation";

export interface HistoryP {
  id?: string,
  consultations?: Consultation[],
  // recommendations: string,
  // observations: string,
  // medecin: string,
  // date: string,
}
