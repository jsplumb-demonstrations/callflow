import { ObjectData } from "@jsplumbtoolkit/browser-ui"

export type CallFlowVariable = {name:string, value:string, id:string}

export type CallFlowNodeTypeDef = {
  type:string,
  label:string,
  payload?:ObjectData
}
