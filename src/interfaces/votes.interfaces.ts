import type { candidatecard } from "./candidate.interfaces";

export type overviewInterface = [
  { label: 'Total Posts'; value: number },
  { label: 'Total Candidates'; value: number },
  { label: 'Registered Voters'; value: number },
  { label: 'Voters Turn Up'; value: number }
];

export interface PostInterface{
  position:string;
  candidates: Array<candidatecard>;

}

