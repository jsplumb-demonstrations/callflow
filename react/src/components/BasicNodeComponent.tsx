import { Node } from "@jsplumbtoolkit/browser-ui"
import { JsxWrapperProps } from "@jsplumbtoolkit/browser-ui-react"
import {getNodeLabel} from "../node-types"

/**
 * Default component to use for nodes. Node types that do not have custom UI use this one.
 * @param props
 * @constructor
 */
export default function BasicNodeComponent(props:{ctx:JsxWrapperProps<Node>}) {

    const vertex = props.ctx.vertex
    const label = getNodeLabel(vertex.type)
    const data = props.ctx.data

    return <div className="jtk-callflow-node" data-jtk-target="true">
                <div className="jtk-callflow-label">
                    <div className="jtk-callflow-node-icon"/>
                    {label}
                </div>
                {data.text && <div className="jtk-callflow-node-text">{data.text}</div>}
                <div className="jtk-callflow-connect" data-jtk-source="true"/>
            </div>
}
