import {Patient} from "./patient";
import {HistoryP} from "./historyP";

export interface PatientWithHistory {
  patient?: Patient,
  history?: HistoryP
}
