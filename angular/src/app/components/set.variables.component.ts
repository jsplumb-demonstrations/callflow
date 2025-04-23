import {BaseNodeComponent} from "@jsplumbtoolkit/browser-ui-angular"
import {Component} from "@angular/core"

@Component({
  template:`<div class="jtk-callflow-node" data-jtk-target="true">
    <div class="jtk-callflow-label">
      <div class="jtk-callflow-node-icon"></div>
      {{label}}
    </div>
    @for(v of obj.variables;track v) {
      <div class="jtk-callflow-variable">
        <span class="jtk-callflow-variable-name">{{v.name}}</span>
        =
        <span class="jtk-callflow-variable-value">{{v.value}}</span>
       
      </div>
    }
    <div class="jtk-callflow-connect" data-jtk-source="true"></div>
    
  </div>`
})
export class SetVariablesComponent extends BaseNodeComponent {

  label = "Set Variables"

}
