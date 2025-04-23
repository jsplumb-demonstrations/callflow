import { Node } from "@jsplumbtoolkit/browser-ui"
import { JsxWrapperProps } from "@jsplumbtoolkit/browser-ui-react"
import {ALL_KEYS} from "../constants"

export default function KeypadEntryComponent(props:{ctx:JsxWrapperProps<Node>, keys?:Array<string>}) {

    const keys = props.keys || ALL_KEYS

    return <div className="jtk-callflow-node" data-jtk-target="true">
        <div className="jtk-callflow-label">
            <div className="jtk-callflow-node-icon"/>
            Keypad Entry
        </div>
        <div className="jtk-callflow-keypad">
            {keys.map(key =>
                <div className="jtk-callflow-keypad-key" data-jtk-port={key} key={key}>
                    <span>{key}</span>
                    <div className="jtk-callflow-connect" data-jtk-source="true"/>
                </div>
            )}
        </div>
    </div>
}
