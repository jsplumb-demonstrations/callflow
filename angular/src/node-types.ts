import {
  TYPE_ANSWER_CALL,
  TYPE_CALL_FORWARD,
  TYPE_CONDITIONS,
  TYPE_HANDLE_CALL,
  TYPE_HANGUP_CALL,
  TYPE_KEYPAD_ENTRY,
  TYPE_PLAY_AUDIO,
  TYPE_REQUEST,
  TYPE_SET_VARIABLES,
  TYPE_START_RECORDING,
  TYPE_STOP_RECORDING,
  TYPE_VOICEMAIL_RECORDING
} from "./constants"
import {CallFlowNodeTypeDef} from "./definitions"

/**
 * Definitions of available node types, with optional
 * default payload.
 */
export const NODE_TYPES:Array<CallFlowNodeTypeDef> = [

  {
    type:TYPE_ANSWER_CALL,
    label:"Answer Call"
  },
  {
    type:TYPE_CALL_FORWARD,
    label:"Forward to phone",
    payload:{
      number:"222-2222"
    }
  },
  {
    type:TYPE_CONDITIONS,
    label:"Conditions",
    payload:{
      conditions:[
        { value:"Else", id:"else", "order":10000}
      ]
    }
  },
  {
    type:TYPE_HANDLE_CALL,
    label:"Handle Call"
  },
  {
    type:TYPE_HANGUP_CALL,
    label:"Hangup Call"
  },
  {
    type:TYPE_KEYPAD_ENTRY,
    label:"Keypad Entry"
  },
  {
    type:TYPE_PLAY_AUDIO,
    label:"Play Audio",
    payload:{
      text:"Play this text to speech"
    }
  },
  {
    type:TYPE_REQUEST,
    label:"Request",
    payload:{
      url:"https://google.com"
    }
  },
  {
    type:TYPE_SET_VARIABLES,
    label:"Set Variables",
    payload:{
      variables:[]
    }
  },
  {
    type:TYPE_START_RECORDING,
    label:"Start Recording"
  },
  {
    type:TYPE_VOICEMAIL_RECORDING,
    label:"Voicemail"
  },
  {
    type:TYPE_STOP_RECORDING,
    label:"Stop Recording"
  }
]

export function getNodeLabel(type:string):string {
  return NODE_TYPES.find(t => t.type === type)?.label || "Unknown"
}
