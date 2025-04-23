import {
    SurfaceProvider,
    SurfaceComponent,
    ControlsComponent,
    MiniviewComponent,
    newInstance, BrowserUIReact, JsxWrapperProps
} from "@jsplumbtoolkit/browser-ui-react"

import { AnchorLocations,
    OrthogonalConnector,
    OVERLAY_VISIBILITY_HOVER,
    PlainArrowOverlay,
    EVENT_TAP,
    Base,
    DEFAULT,
    Node
} from "@jsplumbtoolkit/browser-ui"

import BasicNodeComponent from "./components/BasicNodeComponent"
import {
    TYPE_CALL_FORWARD, TYPE_CONDITIONS, TYPE_KEYPAD_ENTRY,
    TYPE_REQUEST, TYPE_SET_VARIABLES,
    SELECTABLE
} from "./constants"

import ConditionsComponent from "./components/ConditionsComponent"
import CallflowInspector from "./Inspector"
import RequestNodeComponent from "./components/RequestNodeComponent"
import SetVariablesComponent from "./components/SetVariablesComponent"
import CallForwardingComponent from "./components/CallForwardingComponent"
import KeypadEntryComponent from "./components/KeypadEntryComponent"
import CallFlowPalette from "./CallFlowPalette"

function App() {

    /**
     * These parameters are used to tell JsPlumb which property identifies the ports on our nodes. In this demo
     * there is only one node type - `TYPE_CONDITIONS` - that has ports, so we can set these properties and we know that in
     * all node types except `TYPE_CONDITIONS` they're going to be ignored.  `portDataProperty` instructs JsPlumb to look
     * for ports inside the node data via the key `conditions`. The value is expected to be an array of port data. With this
     * setup, we can then edit/remove ports individually (see the `editCondition` and `removeCondition` methods of the
     * `ConditionsComponent`), and we can also add new ports to the model via the Toolkit's `addNewPort` method - see the
     * `addCondition` method of `ConditionsComponent`.
     *
     * portOrderProperty is an optional extra piece of functionality we're taking advantage of - it tells JsPlumb what order
     * to draw the ports in. We store `order` as in integer against each condition, and our `Else` condition is assigned
     * an order of 10000 - ensuring it is always last in the list. Unless you have 10000 other conditions of course ;)
     */
    const toolkit = newInstance({
        portDataProperty:"conditions",
        portOrderProperty:"order"
    })

    /**
     * Options for the render.
     */
    const renderOptions = {
        // zoom content to fit on load
        zoomToFit:true,
        // allow user to right-click to inspect (in prod you probably want to leave this out)
        consumeRightClick:false,
        defaults:{
            // paint a transparent outline around connectors, to make it easier to hover
            // to see the delete button.
            paintConnectorOutline:true,
            // anchors are always on the right edge of the source and the left edge of the target
            anchors:[AnchorLocations.Right, AnchorLocations.Left],
            // use an orthogonal connector with a 5px corner radius
            connector:{
                type:OrthogonalConnector.type,
                options:{
                    cornerRadius:5
                }
            }
        }
    }

    /**
     * The view maps node types to components.
     */
    const view = {
        nodes:{
            // abstract parent mapping with an event binding to the TAP event - user taps a node
            // and it is set as the Toolkit's current selection.
            [SELECTABLE]:{
                events:{
                    [EVENT_TAP]:(p:{obj:Base, toolkit:BrowserUIReact}) => {
                        toolkit.setSelection(p.obj)
                    }
                }
            },
            [DEFAULT]:{
                // The default mapping uses `BasicNodeComponent`, which shows a label and
                // optionally some text. If there is no other mapping found for a node this
                // one is used.
                parent:SELECTABLE,
                jsx:(ctx:JsxWrapperProps<Node>) => <BasicNodeComponent ctx={ctx}/>
            },
            // Some more complex nodes have their own components...
            [TYPE_SET_VARIABLES]:{
                parent:SELECTABLE,
                jsx:(ctx:JsxWrapperProps<Node>) => <SetVariablesComponent ctx={ctx}/>
            },
            [TYPE_REQUEST]:{
                parent:SELECTABLE,
                jsx:(ctx:JsxWrapperProps<Node>) => <RequestNodeComponent ctx={ctx}/>
            },
            [TYPE_KEYPAD_ENTRY]:{
                parent:SELECTABLE,
                jsx:(ctx:JsxWrapperProps<Node>) => <KeypadEntryComponent ctx={ctx}/>
            },
            [TYPE_CONDITIONS]:{
                parent:SELECTABLE,
                jsx:(ctx:JsxWrapperProps<Node>) => <ConditionsComponent ctx={ctx}/>
            },
            [TYPE_CALL_FORWARD]:{
                parent:SELECTABLE,
                jsx:(ctx:JsxWrapperProps<Node>) => <CallForwardingComponent ctx={ctx}/>
            }
        },
        edges:{
            [DEFAULT]:{
                // edges have a delete button that is visible on hover (although on
                // a touch device JsPlumb will ensure it is always visible)
                deleteButton:OVERLAY_VISIBILITY_HOVER,
                overlays:[
                    {
                        // show a plain arrow at the end of each edge.
                        type:PlainArrowOverlay.type,
                        options:{
                            location:1,
                            width:10,
                            length:10
                        }
                    }
                ]
            }
        }
    }

  return (<div className="jtk-demo-main" id="jtk-demo-callflow">
            <SurfaceProvider>
                <div className="jtk-demo-canvas">
                    <SurfaceComponent toolkit={toolkit}
                        renderOptions={renderOptions}
                        viewOptions={view}
                        url="/callflow.json"/>

                    <ControlsComponent/>
                    <MiniviewComponent/>
                </div>
                <CallFlowPalette/>

                <CallflowInspector toolkit={toolkit}/>

            </SurfaceProvider>
        </div>)
}

export default App
