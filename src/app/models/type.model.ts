import { ISelect } from "../interfaces/select.interface";

export class SelectModel {
  public viewValue: string;
  public value: string | null;

  constructor(select: ISelect) {
    this.viewValue = select.viewValue;
    this.value = select.value;
  }
}
