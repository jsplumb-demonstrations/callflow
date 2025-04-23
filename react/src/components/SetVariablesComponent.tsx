import {Node} from "@jsplumbtoolkit/browser-ui"
import { JsxWrapperProps } from "@jsplumbtoolkit/browser-ui-react"

export default function SetVariablesComponent(props:{ctx:JsxWrapperProps<Node>}) {

    const {vertex} = props.ctx

    return <div className="jtk-callflow-node" data-jtk-target="true">
        <div className="jtk-callflow-label">
            <div className="jtk-callflow-node-icon"/>
            Set Variables
        </div>

        {vertex.data.variables.map(variable => <div className="jtk-callflow-variable" key={variable.id}>
            <span className="jtk-callflow-variable-name">{variable.name}</span>
            =
            <span className="jtk-callflow-variable-value">{variable.value}</span>
        </div>)}


        <div className="jtk-callflow-connect" data-jtk-source="true"/>


</div>
}
