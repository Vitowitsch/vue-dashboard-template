export class TableData {
  objectid: string;
  origin: string;
  carnumber: string;
  bogie: string;
  axis: String;
  comp: String;
  diagid: string;
  lastResult_HS: number;
  lastExecTime?: string;
  lastResultTime?: string;

  constructor(
    objectid: string,
    origin: string,
    carnumber: string,
    bogie: string,
    axis: string,
    comp: string,
    diagid: string,
    lastResult_HS: number,
    lastExecTime: string = "",
    lastResultTime: string = ""
  ) {
    this.objectid = objectid;
    this.origin = origin;
    this.carnumber = carnumber;
    this.bogie = bogie;
    this.axis = axis;
    this.comp = comp;
    this.diagid = diagid;
    this.lastResult_HS = lastResult_HS;
    this.lastExecTime = lastExecTime;
    this.lastResultTime = lastResultTime;
  }
}
