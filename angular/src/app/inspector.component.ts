import {Component, inject} from "@angular/core"
import {Base, isPort, Node } from "@jsplumbtoolkit/browser-ui"
import {
  PROPERTY_TEXT, PROPERTY_URL, TYPE_CONDITIONS,
  PROPERTY_VALUE, PROPERTY_NUMBER
} from "../constants"

import {InspectorComponent, jsPlumbService} from "@jsplumbtoolkit/browser-ui-angular"
import {CallFlowVariable} from "../definitions"

@Component({
  template:`
        
    @if(currentType === 'play-audio') {
      <div class="jtk-callflow-inspector">
          <span>Text:</span>
          <textarea rows="10" cols="10" jtk-att="${PROPERTY_TEXT}" jtk-focus placeholder="enter text to speak..."></textarea>
      </div>
    }
    
    @if(currentType === 'request') {
      <div class="jtk-callflow-inspector">
          <span>URL:</span>
          <input type="text" jtk-att="${PROPERTY_URL}" jtk-focus placeholder="enter request URL..."/>
      </div>
    }  
    
    @if(currentType === 'condition') {
      <div class="jtk-callflow-inspector">
          <span>Condition:</span>
          <input type="text" jtk-att="${PROPERTY_VALUE}" jtk-focus placeholder="enter condition"/>
      </div>
    }
    
    @if(currentType === 'set-variables') {
      <div class="jtk-callflow-inspector">
        <app-set-values [obj]="currentObj" (save)="updateVariables($event)" (cancel)="cancel()"></app-set-values>
      </div>
    }  
    
    @if(currentType === 'call-forward') {
      <div class="jtk-callflow-inspector">
        <input type="text" jtk-att="${PROPERTY_NUMBER}" jtk-focus placeholder="enter number to forward to"/>
      </div>
    }  
    
  `,
  selector:"app-inspector"
})
export class CallFlowInspectorComponent extends InspectorComponent<Node>  {

  $jsplumb = inject(jsPlumbService)

  cancel() {
    this.$jsplumb.getToolkit().clearSelection()
  }

  updateVariables(variables:Array<CallFlowVariable>) {
    const tk = this.$jsplumb.getToolkit()
    tk.updateNode(this.currentObj, {variables})
    tk.clearSelection()
  }

  portTypeMap:Record<string, string> = {
    [TYPE_CONDITIONS]:"condition"
  }

  refresh(obj: Base) {
    if (isPort(obj)) {
      this.currentType = this.portTypeMap[obj.getParent().type]
    } else {
      super.refresh(obj)
    }
  }
}
