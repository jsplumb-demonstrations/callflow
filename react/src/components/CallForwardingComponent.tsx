import { Node } from "@jsplumbtoolkit/browser-ui"
import { JsxWrapperProps } from "@jsplumbtoolkit/browser-ui-react"

export default function CallForwardingComponent(props:{ctx:JsxWrapperProps<Node>}) {

    const {data} = props.ctx

    return <div className="jtk-callflow-node" data-jtk-target="true">
        <div className="jtk-callflow-label">
            <div className="jtk-callflow-node-icon"/>
            Forward to Phone
        </div>
        {data.number != null && <div className="jtk-callflow-node-text">
            {data.number}
        </div>}
        <div className="jtk-callflow-condition" data-jtk-port="success">
            Success
            <div className="jtk-callflow-connect" data-jtk-source="true"/>
        </div>
        <div className="jtk-callflow-condition" data-jtk-port="no-answer">
            No Answer
            <div className="jtk-callflow-connect jtk-callflow-fail-path" data-jtk-source="true"/>
        </div>
        <div className="jtk-callflow-condition" data-jtk-port="busy">
            Busy
            <div className="jtk-callflow-connect jtk-callflow-fail-path" data-jtk-source="true"/>
        </div>
        <div className="jtk-callflow-condition" data-jtk-port="decline">
            Decline
            <div className="jtk-callflow-connect jtk-callflow-fail-path" data-jtk-source="true"/>
        </div>
        <div className="jtk-callflow-condition" data-jtk-port="error">
            Error
            <div className="jtk-callflow-connect jtk-callflow-fail-path" data-jtk-source="true"/>
        </div>
    </div>

}
