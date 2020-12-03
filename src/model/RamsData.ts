export class RamsData {
  objectid: string;
  origin: string;
  car: string;
  time: string;
  value: number;
  op?: string;
  cost?: string;
  system_function?: boolean;

  constructor(
    objectid: string,
    car: string,
    origin: string,
    time: string,
    value: number
  ) {
    this.objectid = objectid;
    this.origin = origin;
    this.car = car;
    this.time = time;
    this.value = value;
  }

  disp(): void {
    console.log(
      "objectid: %s, origin: %s, time: %s, value: %i ",
      this.objectid,
      this.origin,
      this.time,
      this.value
    );
  }
}
