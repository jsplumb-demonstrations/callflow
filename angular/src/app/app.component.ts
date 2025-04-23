import {Component, inject, ViewChild} from '@angular/core'
import {
  AngularRenderOptions,
  AngularViewOptions,
  BrowserUIAngular,
  jsPlumbService,
  SurfaceComponent
} from "@jsplumbtoolkit/browser-ui-angular"
import {
  AnchorLocations,
  EVENT_TAP,
  PlainArrowOverlay,
  Surface,
  Base,
  OrthogonalConnector,
  OVERLAY_VISIBILITY_HOVER,
  DEFAULT,
} from "@jsplumbtoolkit/browser-ui"
import {
  SELECTABLE,
  TYPE_CALL_FORWARD,
  TYPE_CONDITIONS,
  TYPE_KEYPAD_ENTRY,
  TYPE_REQUEST,
  TYPE_SET_VARIABLES
} from "../constants"

import {RequestNodeComponent} from "./components/request.node.component"
import {SetVariablesComponent} from "./components/set.variables.component"
import {ConditionsComponent} from "./components/conditions.component"
import {CallForwardingComponent} from "./components/call.forwarding.component"
import {KeypadEntryComponent} from "./components/keypad.entry.component"
import {NODE_TYPES} from "../node-types"
import {BaseCallFlowNodeComponent} from "./components/base.node.component"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  @ViewChild(SurfaceComponent) surfaceComponent!: SurfaceComponent

  toolkit!: BrowserUIAngular
  surface!: Surface

  $jsplumb = inject(jsPlumbService)

  /**
   * Store NODE_TYPES on this class so the template can access it.
   */
  nodeTypes = NODE_TYPES

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
  toolkitParams = {
    portDataProperty:"conditions",
    portOrderProperty:"order"
  }

  /**
   * Options for the render.
   */
  renderParams:AngularRenderOptions = {
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
  view:AngularViewOptions = {
    nodes:{
      // abstract parent mapping with an event binding to the TAP event - user taps a node
      // and it is set as the Toolkit's current selection.
      [SELECTABLE]:{
        events:{
          [EVENT_TAP]:(p:{obj:Base, toolkit:BrowserUIAngular}) => {
            p.toolkit.setSelection(p.obj)
          }
        }
      },
      [DEFAULT]:{
        // The default mapping uses `BasicNodeComponent`, which shows a label and
        // optionally some text. If there is no other mapping found for a node this
        // one is used.
        parent:SELECTABLE,
        component:BaseCallFlowNodeComponent
      },
      // Some more complex nodes have their own components...
      [TYPE_REQUEST]:{
        parent:SELECTABLE,
        component:RequestNodeComponent
      },
      [TYPE_SET_VARIABLES]:{
        parent:SELECTABLE,
        component:SetVariablesComponent
      },
      [TYPE_CONDITIONS]:{
        parent:SELECTABLE,
        component:ConditionsComponent
      },
      [TYPE_CALL_FORWARD]:{
        parent:SELECTABLE,
        component:CallForwardingComponent
      },
      [TYPE_KEYPAD_ENTRY]:{
        parent:SELECTABLE,
        component:KeypadEntryComponent
      }
    },
    edges:{
      default:{
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

  /**
   * Payload generator for nodes dragged from the palette.
   * @param el
   */
  dataGenerator(el:Element) {
    const type = el.getAttribute("data-jtk-type")
    const nodeType = NODE_TYPES.find(nt => nt.type === type)
    const base:any = Object.assign({ type }, Object.assign({}, nodeType?.payload || {}) )
    return base
  }

}
