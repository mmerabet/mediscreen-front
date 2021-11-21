import {consultation} from "./consultation";

export interface HistoryP {
  _id?: number,
  consultations?: consultation[],
  // recommendations: string,
  // observations: string,
  // medecin: string,
  // date: string,
}
