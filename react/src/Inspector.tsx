import {RefObject, useRef, useState} from "react"
import {InspectorComponent, InspectorComponentRef} from "@jsplumbtoolkit/browser-ui-react"

import {Base, isNode, isPort} from "@jsplumbtoolkit/browser-ui"
import {PROPERTY_TEXT, PROPERTY_URL, TYPE_CONDITIONS, PROPERTY_NUMBER, TYPE_CALL_FORWARD, TYPE_PLAY_AUDIO, TYPE_REQUEST, TYPE_SET_VARIABLES} from "./constants"

import SetValuesInspectorComponent from "./SetValuesInspectorComponent"

const portTypeMap:Record<string, string> = {
    [TYPE_CONDITIONS]:"condition"
}

export default function CallflowInspector({toolkit}) {

    const [currentObj, setCurrentObj] = useState(null)
    const [currentType, setCurrentType] = useState('')
    const inspector:RefObject<InspectorComponentRef> = useRef(null as InspectorComponentRef)

    const renderEmptyContainer = () => { setCurrentType('') }
    const refresh = (obj:Base) => {

       if (isNode(obj)) {
            setCurrentType(obj.type)
        } else if (isPort(obj)) {
            setCurrentType(portTypeMap[obj.getParent().type])
        }

        setCurrentObj(obj)
    }

    function updateVariables(variables:Array<any>) {
        toolkit.updateNode(currentObj, {variables})
        toolkit.clearSelection()
    }

    function cancel() {
        toolkit.clearSelection()
    }

    return <InspectorComponent className="jtk-callflow-inspector"
                               refresh={refresh}
                               renderEmptyContainer={renderEmptyContainer}
                               ref={inspector}
                               showCloseButton={true}>

        {currentType === TYPE_PLAY_AUDIO && <>
            <span>Text:</span>
            <textarea rows="10" cols="10" jtk-att={PROPERTY_TEXT} jtk-focus="true" placeholder="enter text to speak..."/>
            </>}

        {currentType === TYPE_REQUEST && <>
        <span>URL:</span>
        <input type="text" jtk-att={PROPERTY_URL} jtk-focus="true" placeholder="enter request URL..."/>
        </>}

        {currentType === TYPE_CALL_FORWARD && <>
            <span>Phone Number:</span>
            <input type="text" jtk-att={PROPERTY_NUMBER} jtk-focus="true" placeholder="enter phone number..."/>
        </>}

        {currentType === TYPE_SET_VARIABLES && <>
            <SetValuesInspectorComponent toolkit={toolkit} obj={currentObj} save={updateVariables} cancel={cancel}/>
        </>}

        {currentType === "condition" && <>
            <span>Condition:</span>
            <input jtk-att="value" placeholder="enter condition..." jtk-focus="true"/>
        </>}


    </InspectorComponent>


}
