export class HeatmapFilter {
  public x;
  public y;
  filterX;
  filterY;
  startDate;

  constructor(filterX, xs: Set<any>, filterY, ys: Set<any>, startDate = "") {
    this.x = xs;
    this.y = ys;
    this.filterX = filterX;
    this.filterY = filterY;
    this.startDate = startDate;
  }

  public getStartDate() {
    return this.startDate;
  }

  public getXKey(_this = this) {
    let keys = ["objectid"];
    if (_this.filterX) {
      keys.push("carnumber");
    }
    return keys;
  }

  public getYKey(_this = this) {
    let keys = ["origin"];
    if (_this.filterY) {
      keys.push("module", "submodule");
    }
    return keys;
  }
}
