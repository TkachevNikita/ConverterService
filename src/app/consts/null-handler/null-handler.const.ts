import { SelectModel } from "src/app/models/type.model"

export const nullList: SelectModel[] = [
  {
      value: null,
      viewValue: 'null --> null'
  },
  {
      value: '',
      viewValue: 'null --> ""'
  },
  {
      value: ' ',
      viewValue: 'null --> " "'
  },
  {
      value: 'null',
      viewValue: 'null --> "null"'
  },
]
