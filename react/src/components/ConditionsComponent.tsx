import { Node } from "@jsplumbtoolkit/browser-ui"
import { JsxWrapperProps } from "@jsplumbtoolkit/browser-ui-react"

export default function ConditionsComponent(props:{ctx:JsxWrapperProps<Node>}) {

    const {vertex, toolkit} = props.ctx

    function editCondition(id:string) {
        const port = vertex.getPort(id)
        if (port != null) {
            toolkit.setSelection(port)
        }
    }

    function removeCondition(id:string) {
        const port = vertex.getPort(id)
        toolkit.removePort(port)
    }

    function addCondition() {
        const order = vertex.data.conditions.length,
            id = `${order}`

        toolkit.addNewPort(vertex, "condition", {
            id,
            order,
            value:"New Condition"
        })

            setTimeout(() => toolkit.setSelection(vertex.getPort(id)) )
    }

    return <div className="jtk-callflow-node" data-jtk-target="true">
        <div className="jtk-callflow-label">
            <div className="jtk-callflow-node-icon"/>
            Conditions
            <div className="jtk-callflow-add-condition" onClick={() => addCondition()}>+</div>
        </div>
        {vertex.data.conditions.map(condition =>  <div key={condition.id} className="jtk-callflow-condition" data-jtk-port={condition.id}>
                <span onClick={() => editCondition(condition.id)} title={condition.value}>{condition.value}</span>
                <div className=" jtk-callflow-connect" data-jtk-source="true"/>
                {condition.value !== "Else" && <div className="jtk-edge-delete" onClick={() => removeCondition(condition.id)}/>}
            </div>
        )}


  </div>
}
