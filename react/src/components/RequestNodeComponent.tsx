
import { Node } from "@jsplumbtoolkit/browser-ui"
import { JsxWrapperProps } from "@jsplumbtoolkit/browser-ui-react"

export default function RequestNodeComponent(props:{ctx:JsxWrapperProps<Node>}) {


    return <div className="jtk-callflow-node" data-jtk-target="true">
        <div className="jtk-callflow-label">
            <div className="jtk-callflow-node-icon"/>
            Request
        </div>
        <div className="jtk-callflow-request-url">
            {props.ctx.data.url}
        </div>
        <div className="jtk-callflow-request-port" data-jtk-port="condition">
            <span>condition</span>
            <div className="jtk-callflow-connect" data-jtk-source="true"/>
        </div>
        <div className="jtk-callflow-request-port" data-jtk-port="else">
            <span>Else</span>
            <div className="jtk-callflow-connect jtk-callflow-fail-path" data-jtk-source="true"/>
        </div>
        <div className="jtk-callflow-request-port" data-jtk-port="failure">
            <span>Failure</span>
            <div className="jtk-callflow-connect jtk-callflow-fail-path" data-jtk-source="true"/>
        </div>
    </div>
}
